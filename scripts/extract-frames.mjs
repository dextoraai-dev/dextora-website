import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const FRAMES = Number(process.env.FRAMES || 120); // frames per product
const root = path.join(process.cwd(), "public", "cinematic");

const duration = (file) =>
    parseFloat(
        execFileSync("ffprobe", [
            "-v", "error", "-show_entries", "format=duration",
            "-of", "default=nw=1:nk=1", file,
        ]).toString()
    );

const variants = [
    { name: "desktop", w: 1920, h: 1080, q: 82 },
    { name: "mobile", w: 960, h: 540, q: 76 },
];

for (const slug of fs.readdirSync(root)) {
    const dir = path.join(root, slug);
    const input = path.join(dir, "raw.mp4");
    if (!fs.existsSync(input)) continue;

    const fps = FRAMES / duration(input);
    console.log(`▶ ${slug} (${FRAMES} frames @ ${fps.toFixed(2)} fps)`);

    for (const v of variants) {
        const out = path.join(dir, "frames", v.name);
        fs.rmSync(out, { recursive: true, force: true });
        fs.mkdirSync(out, { recursive: true });

        execFileSync("ffmpeg", [
            "-y", "-loglevel", "error", "-i", input,
            "-vf",
            `fps=${fps},scale=${v.w}:${v.h}:flags=lanczos,unsharp=5:5:0.5:5:5:0.0`,
            "-c:v", "libwebp", "-quality", String(v.q), "-compression_level", "6",
            path.join(out, "%04d.webp"),
        ]);
        const count = fs.readdirSync(out).length;
        fs.writeFileSync(path.join(out, "meta.json"), JSON.stringify({ frames: count }));
        console.log(`  ✔ ${v.name}: ${count} frames`);
    }
}