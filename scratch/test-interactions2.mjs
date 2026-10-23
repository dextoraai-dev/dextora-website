import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// Inspect _interactions prototype
const inter = ai._interactions;
console.log("proto methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(inter)));
