import { GoogleGenAI } from "@google/genai";
import fs from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";
const OUT_DIR = path.join(process.cwd(), "public", "images", "generated");

const STYLE =
    "Premium modern EdTech / AI brand aesthetic, warm cream (#F8F5EE) and deep " +
    "charcoal palette with one refined accent colour, soft cinematic lighting, " +
    "clean composition, photorealistic or high-end 3D render, subtle depth of " +
    "field. No text, no letters, no logos, no watermarks, no UI screenshots.";

// Add or edit entries; each becomes one file.
const IMAGES = [
    {
        name: "hero",
        aspectRatio: "16:9",
        prompt:
            "Abstract hero visual of glowing knowledge nodes connected by thin light " +
            "filaments floating above a soft textured surface, clean negative space " +
            "on the left third for website text.",
    },
    {
        name: "product-dextora-learn",
        aspectRatio: "4:3",
        prompt:
            "A student's desk with an open book transforming into soft glowing " +
            "chapter cards, warm natural light, calm focused mood.",
    },
    {
        name: "product-dhyeya-ias",
        aspectRatio: "4:3",
        prompt:
            "A stack of newspapers dissolving into floating translucent news cards " +
            "and question marks of light, editorial look, deep blue accent.",
    },
    {
        name: "og-image",
        aspectRatio: "16:9",
        prompt:
            "Minimal abstract brand backdrop with layered soft gradients and subtle " +
            "geometric shapes, centered empty space.",
    },
];

async function generate({ name, prompt, aspectRatio }) {
    const response = await ai.models.generateContent({
        model: MODEL,
        contents: `${prompt}\n\nStyle: ${STYLE}`,
        config: {
            responseModalities: ["IMAGE"],
            imageConfig: { aspectRatio },
        },
    });

    const parts = response.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find((p) => p.inlineData?.data);
    if (!imagePart) {
        const text = parts.map((p) => p.text).filter(Boolean).join(" ");
        throw new Error(`No image returned for "${name}". ${text}`);
    }

    const ext = imagePart.inlineData.mimeType?.includes("jpeg") ? "jpg" : "png";
    const file = path.join(OUT_DIR, `${name}.${ext}`);
    await fs.writeFile(file, Buffer.from(imagePart.inlineData.data, "base64"));
    console.log(`✔ ${name} -> ${path.relative(process.cwd(), file)}`);
}

async function main() {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("Missing GEMINI_API_KEY in .env.local");
    }
    await fs.mkdir(OUT_DIR, { recursive: true });

    const only = process.argv[2]; // optional: node scripts/generate-images.mjs hero
    const queue = only ? IMAGES.filter((i) => i.name === only) : IMAGES;

    for (const img of queue) {
        try {
            await generate(img);
        } catch (err) {
            console.error(`✖ ${img.name}: ${err.message}`);
        }
    }
}

main();