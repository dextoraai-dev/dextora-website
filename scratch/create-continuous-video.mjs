import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const FFMPEG = 'D:/ffmpeg-9.0.1-essentials_build/bin/ffmpeg.exe';
const VID_DIR = 'd:/maindextora/public/experience/vid';
const SCRATCH_DIR = 'd:/maindextora/scratch';

if (!fs.existsSync(SCRATCH_DIR)) {
  fs.mkdirSync(SCRATCH_DIR, { recursive: true });
}

// 1. Desktop clips
const desktopClips = [
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

// 2. Mobile clips
const mobileClips = [
  'hub-m.mp4',
  'conn1-m.mp4',
  'learn-m.mp4',
  'conn2-m.mp4',
  'dhyeya-m.mp4',
  'conn3-m.mp4',
  'crm-m.mp4',
  'conn4-m.mp4',
  'finale-m.mp4'
];

function buildConcatFile(clips, filename) {
  const content = clips.map(c => `file '${VID_DIR}/${c}'`).join('\n');
  const filePath = path.join(SCRATCH_DIR, filename);
  fs.writeFileSync(filePath, content, 'utf8');
  return filePath;
}

const desktopList = buildConcatFile(desktopClips, 'concat_desktop.txt');
const mobileList = buildConcatFile(mobileClips, 'concat_mobile.txt');

console.log('Building merged continuous desktop video...');
const desktopOut = `${VID_DIR}/continuous-world.mp4`;

// We encode with fast seeking keyframes (-g 15 or -g 12) and faststart so it scrubs effortlessly in the browser
try {
  execFileSync(FFMPEG, [
    '-y',
    '-f', 'concat',
    '-safe', '0',
    '-i', desktopList,
    '-c:v', 'libx264',
    '-crf', '20',
    '-preset', 'fast',
    '-g', '15',
    '-keyint_min', '15',
    '-sc_threshold', '0',
    '-movflags', '+faststart',
    '-an',
    desktopOut
  ], { stdio: 'inherit' });
  console.log('Desktop continuous video generated at:', desktopOut);
} catch (err) {
  console.error('Failed generating desktop video:', err);
}

console.log('Building merged continuous mobile video...');
const mobileOut = `${VID_DIR}/continuous-world-m.mp4`;

try {
  execFileSync(FFMPEG, [
    '-y',
    '-f', 'concat',
    '-safe', '0',
    '-i', mobileList,
    '-c:v', 'libx264',
    '-crf', '22',
    '-preset', 'fast',
    '-g', '15',
    '-keyint_min', '15',
    '-sc_threshold', '0',
    '-movflags', '+faststart',
    '-an',
    mobileOut
  ], { stdio: 'inherit' });
  console.log('Mobile continuous video generated at:', mobileOut);
} catch (err) {
  console.error('Failed generating mobile video:', err);
}
