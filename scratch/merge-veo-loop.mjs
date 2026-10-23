import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const FFMPEG = 'D:/ffmpeg-9.0.1-essentials_build/bin/ffmpeg.exe';
const RAW_DIR = 'd:/maindextora/scratch/veo_raw';
const DEST_DIR = 'd:/maindextora/public/experience/vid';

if (!fs.existsSync(DEST_DIR)) fs.mkdirSync(DEST_DIR, { recursive: true });

console.log('Copying individual Veo scene clips to public/experience/vid...');
fs.copyFileSync(`${RAW_DIR}/scene_01_hub.mp4`, `${DEST_DIR}/hub.mp4`);
fs.copyFileSync(`${RAW_DIR}/scene_02_learn.mp4`, `${DEST_DIR}/learn.mp4`);
fs.copyFileSync(`${RAW_DIR}/scene_03_dhyeya.mp4`, `${DEST_DIR}/dhyeya.mp4`);
fs.copyFileSync(`${RAW_DIR}/scene_04_crm.mp4`, `${DEST_DIR}/crm.mp4`);
fs.copyFileSync(`${RAW_DIR}/scene_05_convergence.mp4`, `${DEST_DIR}/finale.mp4`);

console.log('Building seamless continuous looping 3D video with ffmpeg xfade...');

// Filter complex to chain 5 clips with 0.8s crossfade transitions
// Input 0: hub (4s)
// Input 1: learn (4s) -> offset 3.2s -> total 6.4s
// Input 2: dhyeya (4s) -> offset 5.6s -> total 8.8s
// Input 3: crm (4s) -> offset 8.0s -> total 11.2s
// Input 4: finale (4s) -> offset 10.4s -> total 13.6s
// Input 5: loop back to hub (first 1s of hub) -> offset 12.8s -> total 13.6s (infinite seamless loop!)

const filter = [
  '[0:v][1:v]xfade=transition=fade:duration=0.8:offset=3.2[v01]',
  '[v01][2:v]xfade=transition=fade:duration=0.8:offset=5.6[v02]',
  '[v02][3:v]xfade=transition=fade:duration=0.8:offset=8.0[v03]',
  '[v03][4:v]xfade=transition=fade:duration=0.8:offset=10.4[v04]',
  '[v04][5:v]xfade=transition=fade:duration=0.8:offset=12.8[outv]'
].join(';');

const desktopOut = `${DEST_DIR}/continuous-loop.mp4`;
const mobileOut = `${DEST_DIR}/continuous-loop-m.mp4`;

try {
  execFileSync(FFMPEG, [
    '-y',
    '-i', `${RAW_DIR}/scene_01_hub.mp4`,
    '-i', `${RAW_DIR}/scene_02_learn.mp4`,
    '-i', `${RAW_DIR}/scene_03_dhyeya.mp4`,
    '-i', `${RAW_DIR}/scene_04_crm.mp4`,
    '-i', `${RAW_DIR}/scene_05_convergence.mp4`,
    '-i', `${RAW_DIR}/scene_01_hub.mp4`,
    '-filter_complex', filter,
    '-map', '[outv]',
    '-c:v', 'libx264',
    '-crf', '19',
    '-preset', 'fast',
    '-g', '8',
    '-keyint_min', '8',
    '-sc_threshold', '0',
    '-movflags', '+faststart',
    '-an',
    desktopOut
  ], { stdio: 'inherit' });
  console.log('Desktop continuous loop video built at:', desktopOut);
} catch (e) {
  console.error('Desktop build failed:', e);
}

try {
  execFileSync(FFMPEG, [
    '-y',
    '-i', desktopOut,
    '-vf', 'scale=720:406',
    '-c:v', 'libx264',
    '-crf', '22',
    '-preset', 'fast',
    '-g', '8',
    '-keyint_min', '8',
    '-sc_threshold', '0',
    '-movflags', '+faststart',
    '-an',
    mobileOut
  ], { stdio: 'inherit' });
  console.log('Mobile continuous loop video built at:', mobileOut);
} catch (e) {
  console.error('Mobile build failed:', e);
}
