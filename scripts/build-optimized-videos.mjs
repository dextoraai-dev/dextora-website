import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, "../public/videos");

const videos = [
  {
    name: "hero-loop",
    duration: 9,
    poster: "hero-loop-poster.jpg",
  },
  {
    name: "dextora-explainer",
    duration: 35,
    poster: "dextora-explainer-poster.jpg",
  },
  {
    name: "dhyeya-ias-explainer",
    duration: 24,
    poster: "dhyeya-ias-explainer-poster.jpg",
  },
  {
    name: "dextora-learn-explainer",
    duration: 24,
    poster: "dextora-learn-explainer-poster.jpg",
  },
];

console.log("[Video Builder] Generating MP4 and WebM videos via FFmpeg...");

for (const v of videos) {
  const posterPath = path.join(outDir, v.poster);
  const mp4Path = path.join(outDir, `${v.name}.mp4`);
  const webmPath = path.join(outDir, `${v.name}.webm`);
  const mobileMp4Path = path.join(outDir, `${v.name}-mobile.mp4`);
  const mobileWebmPath = path.join(outDir, `${v.name}-mobile.webm`);

  console.log(`\nBuilding ${v.name} (${v.duration}s)...`);

  // 1. MP4 1080p H.264 (silent loop with subtle zoom animation)
  execSync(
    `ffmpeg -y -loop 1 -i "${posterPath}" -c:v libx264 -t ${v.duration} -pix_fmt yuv420p -vf "scale=1920:1080,zoompan=z='min(zoom+0.0005,1.05)':d=${v.duration * 30}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080" -r 30 "${mp4Path}"`,
    { stdio: "inherit" }
  );

  // 2. WebM 1080p VP9
  execSync(
    `ffmpeg -y -loop 1 -i "${posterPath}" -c:v libvpx -b:v 1M -crf 28 -t ${v.duration} -pix_fmt yuv420p -vf "scale=1920:1080" -r 30 "${webmPath}"`,
    { stdio: "inherit" }
  );

  // 3. Mobile MP4 720p
  execSync(
    `ffmpeg -y -loop 1 -i "${posterPath}" -c:v libx264 -crf 28 -t ${v.duration} -pix_fmt yuv420p -vf "scale=1280:720" -r 30 "${mobileMp4Path}"`,
    { stdio: "inherit" }
  );

  // 4. Mobile WebM 720p
  execSync(
    `ffmpeg -y -loop 1 -i "${posterPath}" -c:v libvpx -b:v 600k -crf 32 -t ${v.duration} -pix_fmt yuv420p -vf "scale=1280:720" -r 30 "${mobileWebmPath}"`,
    { stdio: "inherit" }
  );
}

console.log("\n[Video Builder] All video assets successfully generated in public/videos!");
