import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) { console.error("ERROR: GEMINI_API_KEY missing"); process.exit(1); }

const ai = new GoogleGenAI({ apiKey });
const OUT_DIR = "d:/maindextora/scratch/veo_education";
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const jobs = [
  {
    id: "scene_01_hub_long",
    prompt: "Cinematic 6-second photorealistic camera dolly down a warm sunlit Indian school corridor at golden-hour dawn, terracotta tile floor, open classroom doors on both sides, bright morning light streaming through tall windows, backpacks and books on benches, a few students arriving in school uniform, camera moves slowly forward along the corridor, everything grounded on solid floor, no floating objects, no sparkles, no buildings in the air, no skyscrapers, calm hopeful atmosphere, 4K, no text, no logos."
  },
  {
    id: "conn_01_campus",
    prompt: "Smooth continuous camera glide from a bright school corridor doorway out onto a sunlit Indian school campus courtyard, green trees, students walking on paved paths, main school building with arched entrance in the background, camera moves steadily forward as if following a student outside, everything grounded, no floating elements, soft morning light, no sparkles, no sci-fi effects, 4K, no text, no logos."
  },
  {
    id: "scene_02_learn_long",
    prompt: "Cinematic 6-second photorealistic close-up camera glide of a teenage Indian student sitting at a wooden school desk, open maths textbook with handwritten notes, a tablet propped beside the book showing a clean AI chat interface with an assistant explaining a geometry problem step by step, warm desk lamp, afternoon sunlight through the window, camera smoothly tracks from wide desk shot to close-up of the glowing tablet screen showing the tutoring chat, everything on a solid desk, no floating objects, no sparkles, no buildings in air, 4K, no text visible, no logos."
  },
  {
    id: "conn_02_classroom",
    prompt: "Smooth camera dolly from a student desk out through an open classroom window across a quiet school library reading room, rows of wooden desks and bookshelves with students reading, warm afternoon light through tall windows, camera glides forward calmly along the reading aisle, grounded interior scene, no floating elements, no sparkles, no futuristic effects, 4K, no text, no logos."
  },
  {
    id: "scene_03_dhyeya_long",
    prompt: "Cinematic 6-second photorealistic camera sweep through a traditional Indian civil-services study room, large mahogany reading table covered with stacks of UPSC books, printed newspapers, hand-drawn maps of India, highlighted notes on foolscap sheets, a brass desk lamp, a wall calendar, camera tracks slowly from wide room shot to close-up of the spread of books and notes, solid ground floor throughout, everything grounded, no floating buildings, no sparkles, no glowing crystals, quiet focused atmosphere, 4K, no readable text, no logos."
  },
  {
    id: "conn_03_library",
    prompt: "Continuous smooth camera glide along a long library shelf row filled with reference books and study material, warm amber reading lights above each shelf, a student browsing spines of books in the background, camera moves steadily down the corridor between shelves, fully grounded indoor scene, no floating objects, no sparkles, no sci-fi, 4K, no text, no logos."
  },
  {
    id: "scene_04_chatbot_long",
    prompt: "Cinematic 6-second photorealistic close-up camera push-in on an open laptop screen in a tidy school study room, the laptop screen shows a clean AI tutor chat conversation where a student asks a physics question and the AI responds with a clear step-by-step explanation and a simple diagram, a hand reaches into frame and types a follow-up question, open notebook and pen beside the laptop, soft desk lamp, evening window light, camera slowly pushes in from laptop-and-desk wide shot to an intimate close-up of the chat screen, everything grounded on solid desk, no floating objects, no sparkles, no skyscrapers, no office buildings, 4K, no readable text, no logos."
  },
  {
    id: "conn_04_schooldesk",
    prompt: "Smooth camera pull-back from a laptop and notebook on a school desk, revealing a tidy study room with bookshelves, a globe, framed motivational posters on the wall, warm lamp light, camera eases back slowly uncovering the full study environment, entirely grounded interior, no floating elements, no sparkles, no futuristic glow, 4K, no text, no logos."
  },
  {
    id: "scene_05_convergence_long",
    prompt: "Cinematic 6-second photorealistic wide-angle slow-arc camera move across a sunlit Indian school campus courtyard at golden hour, students sitting in small groups on grass discussing books and notes, a teacher standing near a notice board, large spreading banyan tree at the center, warm orange sunlight casting long shadows across the courtyard, school building with arched verandah in the background, camera arcs gently left to right capturing the full peaceful campus scene, everything grounded, no floating buildings, no sparkles, no sci-fi effects, calm inspiring atmosphere, 4K, no text, no logos."
  }
];

async function pollOperation(opName) {
  const url = `https://generativelanguage.googleapis.com/v1beta/${opName}?key=${apiKey}`;
  while (true) {
    const res = await fetch(url);
    const data = await res.json();
    if (data.done) {
      if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
      const sample = data.response?.generateVideoResponse?.generatedSamples?.[0];
      if (!sample?.video?.uri) throw new Error("No video URI in response");
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
  console.log("Generating Education-Only Grounded 6-Second Scenes with Veo 3.1...\n");
  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const outPath = path.join(OUT_DIR, `${job.id}.mp4`);
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 500000) {
      console.log(`[${i+1}/${jobs.length}] ${job.id} already exists, skipping.`);
      continue;
    }
    console.log(`\n[${i+1}/${jobs.length}] Generating: ${job.id} (6s)...`);
    try {
      const op = await ai.models.generateVideos({
        model: "veo-3.1-fast-generate-preview",
        prompt: job.prompt,
        config: { aspectRatio: "16:9", durationSeconds: 6 }
      });
      console.log(`Operation started: ${op.name}`);
      const videoUri = await pollOperation(op.name);
      await downloadVideo(videoUri, outPath);
    } catch (err) {
      console.error(`Error generating ${job.id}:`, err.message);
    }
  }
  console.log("\nAll education clips generated!");
}

main().catch(console.error);
