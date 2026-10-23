import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Test Gemini Omni 1.1 Flash for video generation via generateContent
// The Interactions API for video uses a different approach
const result = await ai.models.generateContent({
  model: "gemini-omni-1.1-flash",
  contents: [{
    parts: [{
      text: "Generate a 6-second photorealistic video of a student studying at a desk with a textbook. Cinematic camera slow dolly. No text."
    }]
  }],
  config: {
    responseModalities: ["video"]
  }
});
console.log("Result:", JSON.stringify(result, null, 2).slice(0, 2000));
