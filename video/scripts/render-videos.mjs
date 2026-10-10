import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.resolve(__dirname, "../../public/videos");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log(`[Video Renderer] Target output directory: ${outDir}`);

const compositions = [
  { id: "HeroLoop", name: "hero-loop", crf: 26 },
  { id: "DextoraExplainer", name: "dextora-explainer", crf: 24 },
  { id: "DhyeyaIasExplainer", name: "dhyeya-ias-explainer", crf: 24 },
  { id: "DextoraLearnExplainer", name: "dextora-learn-explainer", crf: 24 },
];

for (const comp of compositions) {
  console.log(`\nRendering composition: ${comp.id} -> ${comp.name}...`);
  try {
    // 1. Render MP4 (H.264)
    const mp4Path = path.join(outDir, `${comp.name}.mp4`);
    console.log(`Rendering ${mp4Path}...`);
    execSync(
      `npx remotion render src/index.ts ${comp.id} "${mp4Path}" --codec=h264 --crf=${comp.crf}`,
      { cwd: path.resolve(__dirname, ".."), stdio: "inherit" }
    );

    // 2. Render WebM (VP9)
    const webmPath = path.join(outDir, `${comp.name}.webm`);
    console.log(`Rendering ${webmPath}...`);
    execSync(
      `npx remotion render src/index.ts ${comp.id} "${webmPath}" --codec=vp9`,
      { cwd: path.resolve(__dirname, ".."), stdio: "inherit" }
    );

    // 3. Render 720p Mobile MP4 variant
    const mobileMp4Path = path.join(outDir, `${comp.name}-mobile.mp4`);
    console.log(`Rendering ${mobileMp4Path}...`);
    execSync(
      `npx remotion render src/index.ts ${comp.id} "${mobileMp4Path}" --codec=h264 --scale=0.6667 --crf=28`,
      { cwd: path.resolve(__dirname, ".."), stdio: "inherit" }
    );

    // 4. Render Poster frame
    const posterPath = path.join(outDir, `${comp.name}-poster.jpg`);
    console.log(`Rendering poster ${posterPath}...`);
    execSync(
      `npx remotion still src/index.ts ${comp.id} "${posterPath}" --frame=30`,
      { cwd: path.resolve(__dirname, ".."), stdio: "inherit" }
    );
  } catch (err) {
    console.error(`Error rendering ${comp.id}:`, err.message);
  }
}

console.log("\n[Video Renderer] Render sequence finished!");
