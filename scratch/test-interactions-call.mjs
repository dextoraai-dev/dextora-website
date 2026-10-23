import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

console.log("Calling interactions.create...");
try {
  const result = await ai.interactions.create({
    model: "gemini-omni-1.1-flash",
    input: "A 6-second cinematic shot of an Indian student sitting at a wooden desk reading a textbook with a warm desk lamp. Camera slowly dollies forward. Photorealistic. No floating objects."
  });
  console.log("Type:", typeof result);
  console.log("Keys:", Object.keys(result || {}));
  if (result) {
    const str = JSON.stringify(result, null, 2);
    fs.writeFileSync("d:/maindextora/scratch/omni-result.json", str);
    console.log("Result saved. First 1000 chars:", str.slice(0, 1000));
  }
} catch (e) {
  console.error("Error:", e.message);
  console.error("Full:", JSON.stringify(e, null, 2).slice(0, 2000));
}
