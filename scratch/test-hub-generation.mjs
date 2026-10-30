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
const OUT_DIR = "d:/maindextora/scratch/hub_regen";
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function main() {
  const prompt = "Cinematic 6-second photorealistic video of an Indian school corridor at golden-hour dawn with warm terracotta floor and sunlight streaming through open arched doors. Two Indian school students in neat school uniforms carrying backpacks walk continuously and steadily forward in a straight line directly towards the camera and screen, approaching the viewer. They keep walking towards the camera throughout the entire shot. No sudden turns, no walking to the side, no changing directions. Smooth slow camera backward dolly in front of them as they walk forward towards the viewer. 4K, 24fps, photorealistic, no text, no logos.";

  console.log("Requesting video from gemini-omni-1.1-flash via Interactions API...");
  console.log("Prompt:", prompt);

  const result = await ai.interactions.create({
    model: "gemini-omni-1.1-flash",
    input: prompt
  });

  console.log("Received result, checking output_video...");
  if (result && result.output_video && result.output_video.data) {
    const buf = Buffer.from(result.output_video.data, "base64");
    const outPath = path.join(OUT_DIR, "scene_01_hub_omni.mp4");
    fs.writeFileSync(outPath, buf);
    console.log(`SUCCESS! Saved to ${outPath} (${buf.byteLength} bytes)`);
  } else {
    console.error("No output_video found in response. Keys:", Object.keys(result || {}));
    fs.writeFileSync(path.join(OUT_DIR, "result-debug.json"), JSON.stringify(result, null, 2));
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

