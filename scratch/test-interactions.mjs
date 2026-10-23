import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
console.log("SDK version:", (await import("@google/genai")).version || "unknown");
console.log("ai.interactions:", typeof ai.interactions);
console.log("ai keys:", Object.keys(ai));
if (ai.interactions) {
  console.log("interactions keys:", Object.keys(ai.interactions));
}
