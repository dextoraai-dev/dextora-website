import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are "Dextora Socratic AI Tutor", an intelligent, empathetic Learning educator built specifically for Indian students (CBSE/NCERT Class 9-12 and UPSC/State PSC aspirants).
Your goal is to educate the student using first-principles thinking and the Socratic method.

Follow these strict Learning rules:
1. Speak with warmth, clarity, and precision.
2. Structure your response into clear educational blocks:
   - 🎯 **Core Concept**: 1-2 concise sentences defining the main idea.
   - 💡 **First-Principles Breakdown**: Step-by-step intuitive explanation using real-world analogies (e.g. Indian context like cricket, trains, river flows, daily life).
   - 🔍 **Socratic Check / Follow-up Question**: Ask the student a gentle thought-provoking question to test their understanding.
3. If the user asks in Hindi or asks for Hindi, provide a bilingual explanation with English terminology in brackets (e.g., प्रकाश संश्लेषण [Photosynthesis]).
4. Keep the tone encouraging, intellectual, and grounded in academic rigor. Zero hallucinations.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history, language = "en" } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback Learning response if key not available
      return NextResponse.json({
        reply: `🎯 **Core Concept**: Let's break this down together step-by-step.\n\n💡 **First-Principles Breakdown**: When studying "${message}", the fundamental principle connects directly to the core axioms of the topic.\n\n🔍 **Socratic Question**: What do you think happens when we apply this in a real-world scenario?`,
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const contents = [
      ...(Array.isArray(history) ? history.slice(-6) : []),
      { role: "user", parts: [{ text: message }] },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + (language === "hi" ? "\nAnswer primarily in Hindi (Hinglish/Devanagari) with key technical terms in English." : ""),
        temperature: 0.6,
        maxOutputTokens: 800,
      },
    });

    const reply = response.text || "I am analyzing your question. Let's explore the core concept together.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Tutor API error:", error);
    return NextResponse.json(
      {
        reply: "I am your Dextora AI Tutor. I'm here to guide you step-by-step. Could you rephrase your question so we can unpack the core concept together?",
      },
      { status: 200 }
    );
  }
}
