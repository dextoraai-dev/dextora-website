import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("ERROR: GEMINI_API_KEY missing");
  process.exit(1);
}

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
    prompt: "Cinematic 6-second photorealistic camera glide of a teenage Indian student sitting at a wooden school desk, open maths textbook with handwritten notes, a tablet propped beside the book showing a clean AI tutoring chat interface explaining a problem step by step, warm desk lamp, afternoon sunlight through the window, camera smoothly tracks forward towards the student and desk, everything on a solid desk, no floating objects, no sparkles, no buildings in air, 4K, no text visible, no logos."
  },
  {
    id: "conn_02_classroom",
    prompt: "Smooth camera dolly from a student desk out through an open classroom window across a quiet school library reading room, rows of wooden desks and bookshelves with students reading, warm afternoon light through tall windows, camera glides forward calmly along the reading aisle, grounded interior scene, no floating elements, no sparkles, no futuristic effects, 4K, no text, no logos."
  },
  {
    id: "scene_03_dhyeya_long",
    prompt: "Cinematic 6-second photorealistic camera sweep through a traditional Indian civil-services study room, large mahogany reading table covered with stacks of UPSC books, printed newspapers, hand-drawn maps of India, highlighted notes on sheets, a brass desk lamp, camera tracks slowly from wide room shot to close-up of the spread of books and notes, solid ground floor throughout, everything grounded, no floating buildings, no sparkles, no glowing crystals, quiet focused atmosphere, 4K, no readable text, no logos."
  },
  {
    id: "conn_03_library",
    prompt: "Continuous smooth camera glide along a long library shelf row filled with reference books and study material, warm amber reading lights above each shelf, a student browsing spines of books in the background, camera moves steadily down the corridor between shelves, fully grounded indoor scene, no floating objects, no sparkles, no sci-fi, 4K, no text, no logos."
  },
  {
    id: "scene_04_chatbot_long",
    prompt: "Cinematic 6-second photorealistic close-up camera push-in on an open laptop screen in a tidy school study room, the laptop screen displays an interactive AI education tutor chatbot teaching a student, showing step-by-step guidance and formulas, a student's hands resting on the keyboard in front of the laptop, warm desk lamp, quiet study room, camera steadily pushes forward towards the screen, everything grounded on solid desk, no floating objects, no sparkles, no skyscrapers, no office buildings, 4K, no readable text, no logos."
  },
  {
    id: "conn_04_schooldesk",
    prompt: "Smooth camera pull-back from a laptop and notebook on a study desk, revealing a tidy study room with bookshelves, a globe, framed motivational posters on the wall, warm lamp light, camera eases back slowly uncovering the full study environment, entirely grounded interior, no floating elements, no sparkles, no futuristic glow, 4K, no text, no logos."
  },
  {
    id: "scene_05_convergence_long",
    prompt: "Cinematic 6-second photorealistic wide-angle slow-arc camera move across a sunlit Indian school campus courtyard at golden hour, students sitting in small groups on grass discussing books and notes, a teacher standing near a notice board, large spreading banyan tree at the center, warm orange sunlight casting long shadows across the courtyard, school building with arched verandah in the background, camera arcs gently left to right capturing the full peaceful campus scene, everything grounded, no floating buildings, no sparkles, no sci-fi effects, calm inspiring atmosphere, 4K, no text, no logos."
  }
];

async function generateWithRetry(job, maxRetries = 3) {
  const outPath = path.join(OUT_DIR, `${job.id}.mp4`);
  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 500000) {
    console.log(`[EXISTS] ${job.id} already exists (${fs.statSync(outPath).size} bytes), skipping.`);
    return true;
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`\nGenerating ${job.id} (Attempt ${attempt}/${maxRetries})...`);
      const result = await ai.interactions.create({
        model: "gemini-omni-1.1-flash",
        input: job.prompt
      });

      if (result && result.output_video && result.output_video.data) {
        const buf = Buffer.from(result.output_video.data, "base64");
        fs.writeFileSync(outPath, buf);
        console.log(`[SUCCESS] Saved ${job.id}.mp4 (${buf.byteLength} bytes)`);
        return true;
      } else {
        console.warn(`[WARN] No output_video in result for ${job.id}, keys:`, Object.keys(result || {}));
      }
    } catch (err) {
      console.error(`[ERROR] Attempt ${attempt} failed for ${job.id}:`, err.message);
      if (attempt < maxRetries) {
        console.log("Waiting 5s before retry...");
        await new Promise((r) => setTimeout(r, 5000));
      }
    }
  }
  return false;
}

async function main() {
  console.log("==================================================");
  console.log("Starting Grounded Education Video Generation (Omni 1.1 Flash)");
  console.log(`Total clips: ${jobs.length}`);
  console.log("==================================================");

  let successCount = 0;
  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    console.log(`\n--- Clip [${i + 1}/${jobs.length}]: ${job.id} ---`);
    const ok = await generateWithRetry(job);
    if (ok) successCount++;
  }

  console.log("\n==================================================");
  console.log(`Generation completed: ${successCount}/${jobs.length} clips ready.`);
  console.log("==================================================");
}

main().catch(console.error);
