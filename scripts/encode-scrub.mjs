import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "public", "cinematic");

for (const slug of fs.readdirSync(root)) {
    const dir = path.join(root, slug);
    const input = path.join(dir, "raw.mp4");
    if (!fs.existsSync(input)) continue;

    console.log(`encoding ${slug}`);
    const run = (args) => execFileSync("ffmpeg", ["-y", "-i", input, ...args], { stdio: "ignore" });

    // Desktop: every frame is a keyframe, so scrubbing is smooth
    run(["-an", "-vf", "scale=1920:-2,fps=24", "-c:v", "libx264", "-g", "1",
        "-crf", "24", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
        path.join(dir, "scrub.mp4")]);

    // Mobile: smaller
    run(["-an", "-vf", "scale=960:-2,fps=24", "-c:v", "libx264", "-g", "1",
        "-crf", "26", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
        path.join(dir, "scrub-mobile.mp4")]);

    // Poster
    run(["-vframes", "1", "-vf", "scale=1920:-2", path.join(dir, "poster.jpg")]);
}
console.log("done");