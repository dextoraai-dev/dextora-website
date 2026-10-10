import { GoogleGenAI } from "@google/genai";
import fs from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const IMAGE_MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";
const VIDEO_MODEL =
    process.env.GEMINI_VIDEO_MODEL || "veo-3.1-fast-generate-preview";
const OUT_ROOT = path.join(process.cwd(), "public", "cinematic");

// Shared look so all three products feel like one family
const DIORAMA_STYLE =
    "Isometric 3D miniature diorama on a thick round cream pedestal, soft clay-like " +
    "PBR materials, pastel palette of warm cream, soft sage and one accent colour, " +
    "tiny glass bubbles and a thin copper ring floating around it, seamless pale " +
    "cream-to-blush gradient background, soft studio lighting, subject centred and " +
    "filling about 90 percent of the frame, 16:9, ultra-detailed. No text, no " +
    "logos, no watermarks, no people.";

const SCENE_STYLE =
    "Photorealistic cinematic photograph, warm natural window light, soft cream and " +
    "blush colour grade, shallow depth of field, premium editorial look, subject " +
    "placed on the right half with clean softly blurred space on the left third for " +
    "text, 16:9. No text, no logos, no watermarks, no UI screens.";

const NEGATIVE =
    "text, captions, logos, watermark, flicker, jitter, warped faces, distorted " +
    "hands, warped geometry, sudden camera moves, oversaturated, plastic look";

const SCENES = [
    {
        slug: "dextora-learn",
        accent: "warm amber",
        diorama:
            "a cozy miniature study room with a small desk, bookshelf, reading lamp, a " +
            "tiny open book, and a few glowing chapter cards floating above it",
        scene:
            "a young Indian student studying at a wooden desk by a bright window, " +
            "writing in a notebook with an open tablet beside, calm focused mood",
        motion:
            "Smooth cinematic push-in: the camera glides down into the miniature room, " +
            "the pedestal falls away and the scene transforms into a real, lifelike " +
            "version with the student at the desk. Continuous, elegant, no cuts.",
    },
    {
        slug: "dhyeya-ias",
        accent: "deep blue",
        diorama:
            "a miniature newsroom-style study desk with stacked newspapers, a tiny " +
            "clock, a globe, and translucent glass news cards and question-mark shapes " +
            "floating above it",
        scene:
            "a determined young Indian aspirant at a table reading a newspaper with a " +
            "cup of tea, morning light through a window, books stacked nearby",
        motion:
            "Smooth cinematic push-in: the camera glides down into the miniature desk, " +
            "the newspapers and glass cards dissolve into a real, lifelike scene of " +
            "the aspirant reading. Continuous, elegant, no cuts.",
    },
    {
        slug: "dextora-campus",
        accent: "emerald green",
        diorama:
            "a miniature modular campus building with arched windows, tiny trees, a " +
            "small courtyard and glowing windows",
        scene:
            "a sunny modern university courtyard with a few students walking and " +
            "chatting, greenery, warm afternoon light, architectural glass building",
        motion:
            "Smooth cinematic push-in: the camera glides down toward the miniature " +
            "campus and it transforms into a real, lifelike campus courtyard with " +
            "students. Continuous, elegant, no cuts.",
    },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const exists = (p) => fs.access(p).then(() => true, () => false);

async function generateImage(prompt, file, refFile) {
    const parts = [];
    if (refFile) {
        parts.push({
            inlineData: { mimeType: "image/png", data: await fs.readFile(refFile, "base64") },
        });
        parts.push({
            text: "Use the attached image ONLY as a reference for colour palette, mood and lighting. Do not copy its layout.",
        });
    }
    parts.push({ text: prompt });

    const res = await ai.models.generateContent({
        model: IMAGE_MODEL,
        contents: [{ role: "user", parts }],
        config: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: "16:9" } },
    });
    const part = res.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
    if (!part) throw new Error("No image returned (prompt may have been blocked).");
    await fs.writeFile(file, Buffer.from(part.inlineData.data, "base64"));
}

async function generateVideo(scene, dioramaFile, sceneFile, outFile) {
    const [a, b] = await Promise.all([
        fs.readFile(dioramaFile, "base64"),
        fs.readFile(sceneFile, "base64"),
    ]);

    const baseConfig = { aspectRatio: "16:9", durationSeconds: 8, negativePrompt: NEGATIVE };
    const request = (withLastFrame) => ({
        model: VIDEO_MODEL,
        prompt: scene.motion,
        image: { imageBytes: a, mimeType: "image/png" },
        config: withLastFrame
            ? { ...baseConfig, lastFrame: { imageBytes: b, mimeType: "image/png" } }
            : baseConfig,
    });

    let op;
    try {
        op = await ai.models.generateVideos(request(true));
    } catch (e) {
        console.log("  (last-frame mode unavailable, retrying without it)");
        op = await ai.models.generateVideos(request(false));
    }

    process.stdout.write(`  rendering ${scene.slug}`);
    while (!op.done) {
        await sleep(10_000);
        process.stdout.write(".");
        op = await ai.operations.getVideosOperation({ operation: op });
    }
    console.log();

    const video = op.response?.generatedVideos?.[0]?.video;
    if (!video) throw new Error("Veo returned no video (may have been filtered).");
    await ai.files.download({ file: video, downloadPath: outFile });
}

async function main() {
    if (!process.env.GEMINI_API_KEY) throw new Error("Missing GEMINI_API_KEY");
    const args = process.argv.slice(2);
    const force = args.includes("--force");
    const imagesOnly = args.includes("--images-only");
    const only = args.find((a) => !a.startsWith("--"));
    const list = only ? SCENES.filter((s) => s.slug === only) : SCENES;

    for (const s of list) {
        const dir = path.join(OUT_ROOT, s.slug);
        await fs.mkdir(dir, { recursive: true });
        const dioramaFile = path.join(dir, "diorama.png");
        const sceneFile = path.join(dir, "scene.png");
        const rawVideo = path.join(dir, "raw.mp4");

        try {
            console.log(`▶ ${s.slug}`);
            if (force || !(await exists(dioramaFile)))
                await generateImage(
                    `${s.diorama}. ${DIORAMA_STYLE} Accent colour: ${s.accent}.`, dioramaFile);
            if (force || !(await exists(sceneFile)))
                await generateImage(`${s.scene}. ${SCENE_STYLE}`, sceneFile, dioramaFile);
            console.log("  ✔ keyframes");

            if (!imagesOnly && (force || !(await exists(rawVideo)))) {
                await generateVideo(s, dioramaFile, sceneFile, rawVideo);
                console.log(`  ✔ video -> ${path.relative(process.cwd(), rawVideo)}`);
            }
        } catch (err) {
            console.error(`  ✖ ${s.slug}: ${err.message}`);
        }
    }
}
main();