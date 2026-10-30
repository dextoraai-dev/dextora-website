import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

const FFMPEG = "D:/ffmpeg-9.0.1-essentials_build/bin/ffmpeg.exe";
const RAW_NEW = "d:/maindextora/scratch/hub_regen/scene_01_hub_omni.mp4";
const VID_DIR = "d:/maindextora/public/experience/vid";
const SCRATCH_DIR = "d:/maindextora/scratch";

// 1. Backup old hub.mp4 just in case
if (fs.existsSync(`${VID_DIR}/hub.mp4`)) {
  fs.copyFileSync(`${VID_DIR}/hub.mp4`, `${SCRATCH_DIR}/hub.mp4.backup`);
  console.log("Backed up old hub.mp4 to hub.mp4.backup");
}

// 2. Encode optimized desktop hub.mp4
console.log("Encoding desktop hub.mp4...");
execFileSync(FFMPEG, [
  "-y",
  "-i", RAW_NEW,
  "-vf", "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2",
  "-c:v", "libx264",
  "-crf", "19",
  "-preset", "fast",
  "-g", "12",
  "-keyint_min", "12",
  "-sc_threshold", "0",
  "-movflags", "+faststart",
  "-an",
  `${VID_DIR}/hub.mp4`
], { stdio: "inherit" });

// 3. Encode mobile hub-m.mp4
console.log("Encoding mobile hub-m.mp4...");
execFileSync(FFMPEG, [
  "-y",
  "-i", `${VID_DIR}/hub.mp4`,
  "-vf", "scale=720:406",
  "-c:v", "libx264",
  "-crf", "22",
  "-preset", "fast",
  "-g", "12",
  "-keyint_min", "12",
  "-sc_threshold", "0",
  "-movflags", "+faststart",
  "-an",
  `${VID_DIR}/hub-m.mp4`
], { stdio: "inherit" });

// Sync scratch paths
fs.copyFileSync(`${VID_DIR}/hub.mp4`, `${SCRATCH_DIR}/veo_education/scene_01_hub_long.mp4`);
if (fs.existsSync(`${SCRATCH_DIR}/edu_clean`)) {
  fs.copyFileSync(`${VID_DIR}/hub.mp4`, `${SCRATCH_DIR}/edu_clean/scene_01_hub.mp4`);
}

// 4. Re-stitch continuous videos
console.log("Rebuilding continuous loop videos...");
const clips = [
  'hub.mp4',
  'conn1.mp4',
  'learn.mp4',
  'conn2.mp4',
  'dhyeya.mp4',
  'conn3.mp4',
  'crm.mp4',
  'conn4.mp4',
  'finale.mp4'
];

const concatListPath = path.join(SCRATCH_DIR, "rebuild_concat.txt");
const concatContent = clips.map(c => `file '${VID_DIR}/${c}'`).join("\n");
fs.writeFileSync(concatListPath, concatContent, "utf8");

const desktopLoop = `${VID_DIR}/continuous-loop.mp4`;
const mobileLoop = `${VID_DIR}/continuous-loop-m.mp4`;

console.log("Re-encoding continuous desktop loop with new hub video...");
execFileSync(FFMPEG, [
  "-y",
  "-f", "concat",
  "-safe", "0",
  "-i", concatListPath,
  "-c:v", "libx264",
  "-crf", "19",
  "-preset", "fast",
  "-g", "12",
  "-keyint_min", "12",
  "-sc_threshold", "0",
  "-movflags", "+faststart",
  "-an",
  desktopLoop
], { stdio: "inherit" });

console.log("Re-encoding continuous mobile loop...");
execFileSync(FFMPEG, [
  "-y",
  "-i", desktopLoop,
  "-vf", "scale=720:406",
  "-c:v", "libx264",
  "-crf", "22",
  "-preset", "fast",
  "-g", "12",
  "-keyint_min", "12",
  "-sc_threshold", "0",
  "-movflags", "+faststart",
  "-an",
  mobileLoop
], { stdio: "inherit" });

fs.copyFileSync(desktopLoop, `${VID_DIR}/continuous-world.mp4`);
fs.copyFileSync(mobileLoop, `${VID_DIR}/continuous-world-m.mp4`);

console.log("ALL ASSETS SUCCESSFULLY ENCODED AND REBUILT!");

