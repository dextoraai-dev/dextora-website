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

async function pollOperation(opName) {
  const url = `https://generativelanguage.googleapis.com/v1beta/${opName}?key=${apiKey}`;
  while (true) {
    const res = await fetch(url);
    const data = await res.json();
    if (data.done) {
      if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
      const sample = data.response?.generateVideoResponse?.generatedSamples?.[0];
      if (!sample?.video?.uri) throw new Error("No video URI in response: " + JSON.stringify(data));
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
  const prompt = "Cinematic photorealistic 6-second video in a warm sunlit Indian school corridor at golden-hour dawn. Terracotta tile floor and soft morning light through arched windows. Two Indian schoolchildren wearing neat school uniforms with backpacks walk steadily and continuously forward in one straight direction towards the camera and screen, approaching the viewer with natural steady steps. No sudden turns, no changing directions, no walking sideways, walking strictly forward toward the camera. Calm hopeful atmosphere, 4K, 24fps, no text, no logos.";

  console.log("Submitting Veo 3.1 video generation...");
  console.log("Prompt:", prompt);

  const op = await ai.models.generateVideos({
    model: "veo-3.1-fast-generate-preview",
    prompt: prompt,
    config: {
      aspectRatio: "16:9",
      durationSeconds: 6,
    },
  });

  console.log("Operation started:", op.name);
  const videoUri = await pollOperation(op.name);
  const outPath = path.join(OUT_DIR, "scene_01_hub_new.mp4");
  await downloadVideo(videoUri, outPath);
  console.log("Finished generating hub video!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

