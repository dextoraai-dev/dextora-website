import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "public", "cinematic");
const trimConfigFile = path.join(root, "trim.json");

let trimConfig = {};
if (fs.existsSync(trimConfigFile)) {
  try {
    trimConfig = JSON.parse(fs.readFileSync(trimConfigFile, "utf8"));
  } catch (e) {
    console.warn(`[WARN] Failed to parse ${trimConfigFile}, using defaults.`, e.message);
  }
}

const variants = [
  { name: "desktop", w: 1600, h: 900, q: 80 },
  { name: "mobile", w: 854, h: 480, q: 74 },
];

function getFolderSizeMb(dirPath) {
  if (!fs.existsSync(dirPath)) return 0;
  let totalBytes = 0;
  for (const file of fs.readdirSync(dirPath)) {
    if (file.endsWith(".webp") || file.endsWith(".json")) {
      totalBytes += fs.statSync(path.join(dirPath, file)).size;
    }
  }
  return totalBytes / (1024 * 1024);
}

function probeVideo(filePath) {
  const probeStr = execFileSync("ffprobe", [
    "-v", "error",
    "-select_streams", "v:0",
    "-show_entries", "stream=r_frame_rate,duration:format=duration",
    "-of", "json",
    filePath,
  ]).toString();

  const probe = JSON.parse(probeStr);
  const stream = probe.streams?.[0] || {};
  const rFrameRate = stream.r_frame_rate || "24/1";
  const [num, den] = rFrameRate.split("/").map(Number);
  const nativeFps = den ? num / den : 24;
  const duration = parseFloat(stream.duration || probe.format?.duration || "8.0");

  return { nativeFps, duration };
}

let totalDesktopMb = 0;
const results = [];

const dirs = fs.readdirSync(root).filter((name) => {
  const p = path.join(root, name);
  return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, "raw.mp4"));
});

console.log(`🎬 Extracting cinematic frames for ${dirs.length} product(s) at native frame rate...`);

for (const slug of dirs) {
  const dir = path.join(root, slug);
  const input = path.join(dir, "raw.mp4");

  const { nativeFps, duration } = probeVideo(input);
  const targetFps = process.env.FPS ? parseFloat(process.env.FPS) : nativeFps;

  const trim = trimConfig[slug] || { start: 0, end: 1 };
  const startFrac = Math.max(0, Math.min(1, trim.start ?? 0));
  const endFrac = Math.max(startFrac, Math.min(1, trim.end ?? 1));
  const isTrimmed = startFrac > 0 || endFrac < 1;

  console.log(`\n▶ [${slug}] duration: ${duration.toFixed(2)}s | native fps: ${nativeFps.toFixed(2)} | target fps: ${targetFps.toFixed(2)}${isTrimmed ? ` | trim: [${startFrac.toFixed(2)} - ${endFrac.toFixed(2)}]` : ""}`);

  const productResult = { slug, variants: {} };

  for (const v of variants) {
    const out = path.join(dir, "frames", v.name);
    fs.rmSync(out, { recursive: true, force: true });
    fs.mkdirSync(out, { recursive: true });

    // Build filter chain
    const vfParts = [];
    if (isTrimmed) {
      const startSec = (startFrac * duration).toFixed(3);
      const endSec = (endFrac * duration).toFixed(3);
      vfParts.push(`trim=start=${startSec}:end=${endSec},setpts=PTS-STARTPTS`);
    }

    if (process.env.FPS || Math.abs(targetFps - nativeFps) > 0.05) {
      vfParts.push(`fps=${targetFps}`);
    }

    vfParts.push(`scale=${v.w}:${v.h}:flags=lanczos`);
    vfParts.push(`unsharp=5:5:0.4:5:5:0.0`);

    const vf = vfParts.join(",");

    execFileSync("ffmpeg", [
      "-y",
      "-loglevel", "error",
      "-i", input,
      "-vf", vf,
      "-c:v", "libwebp",
      "-quality", String(v.q),
      "-compression_level", "6",
      path.join(out, "%04d.webp"),
    ]);

    const extractedFiles = fs.readdirSync(out).filter((f) => f.endsWith(".webp"));
    const count = extractedFiles.length;

    const meta = {
      frames: count,
      fps: targetFps,
      trim: { start: startFrac, end: endFrac },
    };

    fs.writeFileSync(path.join(out, "meta.json"), JSON.stringify(meta, null, 2));

    const sizeMb = getFolderSizeMb(out);
    if (v.name === "desktop") {
      totalDesktopMb += sizeMb;
    }

    productResult.variants[v.name] = {
      frames: count,
      sizeMb: sizeMb.toFixed(2),
    };

    console.log(`   ✔ ${v.name.padEnd(8)}: ${count} frames (${sizeMb.toFixed(2)} MB)`);
  }

  // Also write top-level frames/meta.json pointing to desktop metadata
  const topMetaPath = path.join(dir, "frames", "meta.json");
  const desktopMeta = JSON.parse(fs.readFileSync(path.join(dir, "frames", "desktop", "meta.json"), "utf8"));
  fs.writeFileSync(topMetaPath, JSON.stringify(desktopMeta, null, 2));

  results.push(productResult);
}

console.log("\n========================================");
console.log(`TOTAL DESKTOP FRAMES SIZE: ${totalDesktopMb.toFixed(2)} MB`);
if (totalDesktopMb > 60 && !process.env.FPS) {
  console.warn("⚠️  Total desktop frames exceed 60 MB. You can downsample to 18 FPS using: FPS=18 npm run cinematic:frames");
} else {
  console.log("✅ Frame size within optimal performance budget (<= 60 MB).");
}
console.log("========================================\n");
