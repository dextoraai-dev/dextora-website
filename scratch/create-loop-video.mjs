import fs from 'fs';
import { execFileSync } from 'child_process';

const FFMPEG = 'D:/ffmpeg-9.0.1-essentials_build/bin/ffmpeg.exe';
const VID_DIR = 'd:/maindextora/public/experience/vid';

console.log('Generating seamless loop desktop video with return transition...');
// We take continuous-world.mp4 and append a smooth 2-second crossfade transition back into hub's first frames
// so that when looping back to time 0, there is zero jump!
try {
  execFileSync(FFMPEG, [
    '-y',
    '-i', `${VID_DIR}/continuous-world.mp4`,
    '-i', `${VID_DIR}/hub.mp4`,
    '-filter_complex',
    '[0:v][1:v]xfade=transition=fade:duration=1.5:offset=40.5[v]',
    '-map', '[v]',
    '-c:v', 'libx264',
    '-crf', '20',
    '-preset', 'fast',
    '-g', '15',
    '-keyint_min', '15',
    '-sc_threshold', '0',
    '-movflags', '+faststart',
    '-an',
    `${VID_DIR}/continuous-loop.mp4`
  ], { stdio: 'inherit' });
  console.log('Generated continuous-loop.mp4');
} catch (e) {
  console.error('Desktop loop error:', e);
}

console.log('Generating seamless loop mobile video with return transition...');
try {
  execFileSync(FFMPEG, [
    '-y',
    '-i', `${VID_DIR}/continuous-world-m.mp4`,
    '-i', `${VID_DIR}/hub-m.mp4`,
    '-filter_complex',
    '[0:v][1:v]xfade=transition=fade:duration=1.5:offset=40.5[v]',
    '-map', '[v]',
    '-c:v', 'libx264',
    '-crf', '22',
    '-preset', 'fast',
    '-g', '15',
    '-keyint_min', '15',
    '-sc_threshold', '0',
    '-movflags', '+faststart',
    '-an',
    `${VID_DIR}/continuous-loop-m.mp4`
  ], { stdio: 'inherit' });
  console.log('Generated continuous-loop-m.mp4');
} catch (e) {
  console.error('Mobile loop error:', e);
}
