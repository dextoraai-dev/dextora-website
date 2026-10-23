import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const inter = ai.interactions;
if (inter) {
  console.log("interactions type:", typeof inter);
  const proto = Object.getPrototypeOf(inter);
  if (proto) {
    console.log("proto methods:", Object.getOwnPropertyNames(proto));
  }
  console.log("own keys:", Object.getOwnPropertyNames(inter));
}
