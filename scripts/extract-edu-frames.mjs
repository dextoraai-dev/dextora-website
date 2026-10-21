import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const scenes = ["scene_01", "scene_02", "scene_03", "scene_04", "scene_05", "scene_06"];
const baseDir = path.resolve(process.cwd(), "public", "edu-world");
const framesBaseDir = path.join(baseDir, "frames");

const TOTAL_FRAMES = 72; // 9 fps for 8 seconds - snappy, lightweight, fast to decode

for (const scene of scenes) {
  const sceneFramesDir = path.join(framesBaseDir, scene);
  const desktopDir = path.join(sceneFramesDir, "desktop");
  const mobileDir = path.join(sceneFramesDir, "mobile");

  fs.mkdirSync(desktopDir, { recursive: true });
  fs.mkdirSync(mobileDir, { recursive: true });

  const desktopVideo = path.join(baseDir, "vid", `${scene}.mp4`);
  const mobileVideo = path.join(baseDir, "vid", `${scene}-m.mp4`);

  console.log(`Extracting ${scene} desktop frames...`);
  // Desktop: 960x540, quality 75
  const desktopCmd = `ffmpeg -y -i "${desktopVideo}" -vf "fps=${TOTAL_FRAMES}/8,scale=960:540" -c:v libwebp -quality 75 "${path.join(desktopDir, "%04d.webp")}"`;
  execSync(desktopCmd, { stdio: "inherit" });

  console.log(`Extracting ${scene} mobile frames...`);
  // Mobile: 480x854, quality 70
  const mobileCmd = `ffmpeg -y -i "${mobileVideo}" -vf "fps=${TOTAL_FRAMES}/8,scale=480:854" -c:v libwebp -quality 70 "${path.join(mobileDir, "%04d.webp")}"`;
  execSync(mobileCmd, { stdio: "inherit" });

  fs.writeFileSync(
    path.join(sceneFramesDir, "meta.json"),
    JSON.stringify({ frames: TOTAL_FRAMES, duration: 8 }, null, 2)
  );
}

console.log("All frame sequences extracted successfully!");
