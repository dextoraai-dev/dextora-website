import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('ERROR: GEMINI_API_KEY missing');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });
const OUT_DIR = 'd:/maindextora/scratch/veo_enhanced';
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// 5 long 6-second scene flights + 4 dedicated sky connector flights
const jobs = [
  {
    id: 'scene_01_hub_long',
    prompt:
      'Cinematic 6-second 3D isometric diorama camera flight of an Indian dawn observatory floating in the clouds, soft golden mist, glowing warm lanterns, camera slowly swoops forward and orbits smoothly around the central observatory dome, photorealistic 4k, fluid continuous forward motion, no text, no logos',
  },
  {
    id: 'conn_01_clouds',
    prompt:
      'Continuous first-person camera flight swooping through fluffy white morning clouds and golden sunlight, fast forward motion diving through cloud bank, cinematic 4k, seamless sky fly-through, no text, no logos',
  },
  {
    id: 'scene_02_learn_long',
    prompt:
      'Cinematic 6-second 3D camera flight diving into a student study desk diorama, open maths textbook, glowing tablet with diagrams, warm desk lamp, camera glides smoothly through open window down toward the desk, photorealistic 4k, fluid continuous forward motion, no text, no logos',
  },
  {
    id: 'conn_02_clouds',
    prompt:
      'Continuous camera flight bursting out of a cozy room into open sky and soaring forward above morning clouds toward distant floating classical architecture, cinematic 4k, seamless fly-through, no text, no logos',
  },
  {
    id: 'scene_03_dhyeya_long',
    prompt:
      'Cinematic 6-second 3D camera flight across a grand Civil Services study library diorama, dark mahogany bookshelves, stacks of law books and newspapers on oak table, camera swoops smoothly down through arched stained-glass windows, photorealistic 4k, fluid continuous forward motion, no text, no logos',
  },
  {
    id: 'conn_03_clouds',
    prompt:
      'Continuous high-speed camera flight through glowing twilight mist and digital fiber-optic light trails into modern glass architecture, cinematic 4k, seamless fly-through, no text, no logos',
  },
  {
    id: 'scene_04_crm_long',
    prompt:
      'Cinematic 6-second 3D camera flight through an intelligent glass enterprise office diorama, glowing visual deal pipeline charts and messaging streams, camera glides smoothly forward through glass corridors, photorealistic 4k, fluid continuous forward motion, no text, no logos',
  },
  {
    id: 'conn_04_loop',
    prompt:
      'Continuous camera flight pulling back out through glass atrium into expansive golden dawn sky, flying forward through clouds toward distant observatory island, cinematic 4k, seamless loop connector, no text, no logos',
  },
  {
    id: 'scene_05_convergence_long',
    prompt:
      'Cinematic 6-second 3D camera flight over an interconnected AI ecosystem diorama, glowing crystal nodes and golden data streams linking all education islands, camera smoothly ascending into the bright morning sky, photorealistic 4k, fluid continuous forward motion, no text, no logos',
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
    console.log(`Polling ${opName}... pending`);
    await new Promise((r) => setTimeout(r, 6000));
  }
}

async function downloadVideo(uri, destPath) {
  const downloadUrl = `${uri}&key=${apiKey}`;
  const res = await fetch(downloadUrl);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const buf = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(buf));
  console.log(`Saved: ${destPath} (${buf.byteLength} bytes)`);
}

async function main() {
  console.log('Generating Enhanced 6-Second 3D Scene Flights & Sky Connectors with Veo 3.1...');

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const outPath = path.join(OUT_DIR, `${job.id}.mp4`);

    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 500000) {
      console.log(`[${i + 1}/${jobs.length}] ${job.id} already exists, skipping.`);
      continue;
    }

    console.log(`\n[${i + 1}/${jobs.length}] Generating: ${job.id} (6s)...`);
    try {
      const op = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: job.prompt,
        config: {
          aspectRatio: '16:9',
          durationSeconds: 6,
        },
      });

      console.log(`Operation started: ${op.name}`);
      const videoUri = await pollOperation(op.name);
      await downloadVideo(videoUri, outPath);
    } catch (err) {
      console.error(`Error generating ${job.id}:`, err.message);
    }
  }

  console.log('\nAll enhanced clips generated!');
}

main().catch(console.error);
