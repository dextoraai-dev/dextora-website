import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const FFMPEG = 'D:/ffmpeg-9.0.1-essentials_build/bin/ffmpeg.exe';
const IN_DIR = 'd:/maindextora/scratch/veo_education';
const OUT_DIR = 'd:/maindextora/public/experience/vid';

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const clips = [
  { file: 'scene_01_hub_long.mp4', baseName: 'hub' },
  { file: 'conn_01_campus.mp4', baseName: 'conn1' },
  { file: 'scene_02_learn_long.mp4', baseName: 'learn' },
  { file: 'conn_02_classroom.mp4', baseName: 'conn2' },
  { file: 'scene_03_dhyeya_long.mp4', baseName: 'dhyeya' },
  { file: 'conn_03_library.mp4', baseName: 'conn3' },
  { file: 'scene_04_chatbot_long.mp4', baseName: 'crm' },
  { file: 'conn_04_schooldesk.mp4', baseName: 'conn4' },
  { file: 'scene_05_convergence_long.mp4', baseName: 'finale' }
];

console.log('Checking generated enhanced education clips...');
const available = clips.filter(c => fs.existsSync(path.join(IN_DIR, c.file)));
console.log(`Found ${available.length}/${clips.length} clips.`);

if (available.length < clips.length) {
  console.log('Waiting: only found:');
  available.forEach(a => console.log(' -', a.file));
  process.exit(1);
}

// 1. Export individual section clips with scrub-optimized keyframes
console.log('\n--- Exporting individual section clips for /experience/vid/ ---');
for (const item of clips) {
  const inPath = path.join(IN_DIR, item.file);
  const outDesktop = path.join(OUT_DIR, `${item.baseName}.mp4`);
  const outMobile = path.join(OUT_DIR, `${item.baseName}-m.mp4`);

  console.log(`Optimizing ${item.file} -> ${item.baseName}.mp4...`);
  try {
    execFileSync(FFMPEG, [
      '-y',
      '-i', inPath,
      '-vf', 'scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2',
      '-c:v', 'libx264',
      '-crf', '19',
      '-preset', 'fast',
      '-g', '12',
      '-keyint_min', '12',
      '-sc_threshold', '0',
      '-movflags', '+faststart',
      '-an',
      outDesktop
    ], { stdio: 'inherit' });

    execFileSync(FFMPEG, [
      '-y',
      '-i', outDesktop,
      '-vf', 'scale=720:406',
      '-c:v', 'libx264',
      '-crf', '22',
      '-preset', 'fast',
      '-g', '12',
      '-keyint_min', '12',
      '-sc_threshold', '0',
      '-movflags', '+faststart',
      '-an',
      outMobile
    ], { stdio: 'inherit' });
  } catch (err) {
    console.error(`Error processing ${item.file}:`, err.message);
  }
}

// 2. Build master continuous loop video
console.log('\n--- Stitching master continuous loop video (54 seconds unbroken flight) ---');
const concatListPath = 'd:/maindextora/scratch/enhanced_concat.txt';
// Concat from the optimized individual desktop clips in OUT_DIR
const concatContent = clips.map(c => `file '${OUT_DIR}/${c.baseName}.mp4'`).join('\n');
fs.writeFileSync(concatListPath, concatContent, 'utf8');

const desktopLoop = `${OUT_DIR}/continuous-loop.mp4`;
const mobileLoop = `${OUT_DIR}/continuous-loop-m.mp4`;

try {
  execFileSync(FFMPEG, [
    '-y',
    '-f', 'concat',
    '-safe', '0',
    '-i', concatListPath,
    '-c', 'copy',
    '-movflags', '+faststart',
    desktopLoop
  ], { stdio: 'inherit' });
  console.log('[SUCCESS] Master Desktop continuous loop built at:', desktopLoop);
} catch (e) {
  console.error('Desktop stitch failed, fallback re-encode:', e);
  execFileSync(FFMPEG, [
    '-y',
    '-f', 'concat',
    '-safe', '0',
    '-i', concatListPath,
    '-c:v', 'libx264',
    '-crf', '19',
    '-preset', 'fast',
    '-g', '12',
    '-keyint_min', '12',
    '-sc_threshold', '0',
    '-movflags', '+faststart',
    '-an',
    desktopLoop
  ], { stdio: 'inherit' });
}

// Mobile loop
try {
  execFileSync(FFMPEG, [
    '-y',
    '-i', desktopLoop,
    '-vf', 'scale=720:406',
    '-c:v', 'libx264',
    '-crf', '22',
    '-preset', 'fast',
    '-g', '12',
    '-keyint_min', '12',
    '-sc_threshold', '0',
    '-movflags', '+faststart',
    '-an',
    mobileLoop
  ], { stdio: 'inherit' });
  console.log('[SUCCESS] Master Mobile continuous loop built at:', mobileLoop);
} catch (e) {
  console.error('Mobile stitch failed:', e);
}

// Also duplicate to continuous-world.mp4 for any legacy refs
fs.copyFileSync(desktopLoop, `${OUT_DIR}/continuous-world.mp4`);
fs.copyFileSync(mobileLoop, `${OUT_DIR}/continuous-world-m.mp4`);

console.log('\n==================================================');
console.log('ALL GROUNDED EDUCATION VIDEOS & MASTER CONTINUOUS LOOP STITCHED!');
console.log('==================================================');
