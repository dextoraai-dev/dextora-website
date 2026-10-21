import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const STILLS_DIR = path.resolve("public/edu-world/stills");
const VID_DIR = path.resolve("public/edu-world/vid");

const scenes = [
  { id: "scene_01", color: "#E05A38", title: "01 HERO: Study Desk at Dawn" },
  { id: "scene_02", color: "#2563EB", title: "02 DOUBTS: Instant Photo Resolution" },
  { id: "scene_03", color: "#059669", title: "03 PRACTICE: Adaptive Diagnostic Engine" },
  { id: "scene_04", color: "#D97706", title: "04 NOTES: Smart Notes & Mind Maps" },
  { id: "scene_05", color: "#7C3AED", title: "05 LANGUAGES: Bharat-First Multilingual AI" },
  { id: "scene_06", color: "#D9532F", title: "06 EXAMS: Library to Exam Hall" },
];

console.log("Generating placeholder stills and seekable MP4 video clips...");

for (const s of scenes) {
  const stillWebp = path.join(STILLS_DIR, `${s.id}.webp`);
  const stillMobileWebp = path.join(STILLS_DIR, `${s.id}-m.webp`);
  const vidMp4 = path.join(VID_DIR, `${s.id}.mp4`);
  const vidMobileMp4 = path.join(VID_DIR, `${s.id}-m.mp4`);

  console.log(`Generating placeholders for ${s.id}...`);

  // Desktop poster (1920x1080)
  execSync(
    `ffmpeg -v error -y -f lavfi -i "color=c=${s.color}:s=1920x1080:d=1" -vframes 1 "${stillWebp}"`
  );

  // Mobile poster (1080x1920)
  execSync(
    `ffmpeg -v error -y -f lavfi -i "color=c=${s.color}:s=1080x1920:d=1" -vframes 1 "${stillMobileWebp}"`
  );

  // Desktop 8s seekable video (1920x1080, GOP 8, faststart, crf 22)
  execSync(
    `ffmpeg -v error -y -f lavfi -i "color=c=${s.color}:s=1920x1080:d=8" -c:v libx264 -preset ultrafast -crf 22 -pix_fmt yuv420p -g 8 -keyint_min 8 -movflags +faststart "${vidMp4}"`
  );

  // Mobile 8s seekable video (720x1280, GOP 4, faststart, crf 24)
  execSync(
    `ffmpeg -v error -y -f lavfi -i "color=c=${s.color}:s=720x1280:d=8" -c:v libx264 -preset ultrafast -crf 24 -pix_fmt yuv420p -g 4 -keyint_min 4 -movflags +faststart "${vidMobileMp4}"`
  );
}

console.log("All placeholder assets generated successfully!");
