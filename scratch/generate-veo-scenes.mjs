import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('ERROR: GEMINI_API_KEY not found in env!');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });
const OUT_DIR = 'd:/maindextora/scratch/veo_raw';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const scenes = [
  {
    id: 'scene_01_hub',
    prompt:
      'Cinematic 3D isometric diorama camera fly-through of an Indian dawn observatory floating island in golden-hour mist, warm glowing windows, floating academic artifacts, camera slowly dives and orbits around the structure, photorealistic 4k, fluid continuous camera flight, no text, no logos',
  },
  {
    id: 'scene_02_learn',
    prompt:
      'Cinematic 3D camera fly-through into a student study room diorama, an Indian teenager desk with textbooks and glowing tablet, warm desk lamp, dynamic perspective shift gliding through the window into the room, photorealistic 4k, fluid continuous camera flight, no text, no logos',
  },
  {
    id: 'scene_03_dhyeya',
    prompt:
      'Cinematic 3D camera fly-through of a prestigious Civil Services study hall diorama, dark wood library shelves, stacks of open books and newspapers on oak desk, camera swooping smoothly through grand arched windows, photorealistic 4k, fluid continuous camera flight, no text, no logos',
  },
  {
    id: 'scene_04_crm',
    prompt:
      'Cinematic 3D camera fly-through of a futuristic glass enterprise command room diorama, glowing visual pipeline charts and digital communication paths, camera gliding smoothly forward through clean glass corridors, photorealistic 4k, fluid continuous camera flight, no text, no logos',
  },
  {
    id: 'scene_05_convergence',
    prompt:
      'Cinematic 3D camera fly-through pulling back across an illuminated AI cloud observatory diorama, glowing golden conduits and floating crystalline structures merging into dawn sky clouds, photorealistic 4k, fluid continuous camera flight, no text, no logos',
  },
];

async function pollOperation(opName) {
  const url = `https://generativelanguage.googleapis.com/v1beta/${opName}?key=${apiKey}`;
  while (true) {
    const res = await fetch(url);
    const data = await res.json();
    if (data.done) {
      if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
      const sample = data.response?.generateVideoResponse?.generatedSamples?.[0];
      if (!sample?.video?.uri) throw new Error('No video URI in response');
      return sample.video.uri;
    }
    console.log(`Polling ${opName}... status pending`);
    await new Promise((r) => setTimeout(r, 6000));
  }
}

async function downloadVideo(uri, destPath) {
  const downloadUrl = `${uri}&key=${apiKey}`;
  const res = await fetch(downloadUrl);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const buf = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(buf));
  console.log(`Saved video to ${destPath} (${buf.byteLength} bytes)`);
}

async function main() {
  console.log('Starting Veo 3.1 video generation for 5 continuous 3D scenes...');

  for (let i = 0; i < scenes.length; i++) {
    const s = scenes[i];
    const outPath = path.join(OUT_DIR, `${s.id}.mp4`);

    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 500000) {
      console.log(`Scene ${s.id} already exists, skipping.`);
      continue;
    }

    console.log(`\n[${i + 1}/${scenes.length}] Launching Veo job for: ${s.id}`);
    console.log(`Prompt: ${s.prompt}`);

    try {
      const op = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: s.prompt,
        config: {
          aspectRatio: '16:9',
          durationSeconds: 4,
        },
      });

      console.log(`Operation started: ${op.name}`);
      const videoUri = await pollOperation(op.name);
      console.log(`Generation complete! Downloading from: ${videoUri}`);
      await downloadVideo(videoUri, outPath);
    } catch (err) {
      console.error(`Error generating ${s.id}:`, err.message);
    }
  }

  console.log('\nAll scene videos generated successfully!');
}

main().catch(console.error);
