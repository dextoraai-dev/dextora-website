import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Error: Missing GEMINI_API_KEY in .env.local");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });
const SCRATCH = path.resolve("scratch/edu-world");
const STILLS = path.resolve("public/edu-world/stills");
const VID = path.resolve("public/edu-world/vid");

fs.mkdirSync(SCRATCH, { recursive: true });
fs.mkdirSync(STILLS, { recursive: true });
fs.mkdirSync(VID, { recursive: true });

export const scenes = [
  {
    id: "scene_01",
    name: "01 · Hero — Private Tutor in Every Pocket",
    prompt:
      "Ultra-photorealistic cinematic photograph of an authentic Indian student's study desk at dawn, soft warm golden-hour sunlight streaming through an open bedroom window overlooking rooftops of an Indian city at sunrise, a clean wooden study desk with open NCERT physics and mathematics textbooks, a neat ruled notebook, a brass reading lamp with a warm glow, pens in a clay holder, authentic Indian residential atmosphere, tranquil aspirational morning mood, believable interior details, shot on a full-frame 35mm lens, warm amber and terracotta lighting #D9532F, natural material textures, dark charcoal surroundings #0C0E12 with a gentle vignette, centered composition with generous breathing room, 3:2 landscape. No cartoon elements, no low-poly diorama, no floating fantasy objects, no text overlays, no logos, no watermarks.",
    divePan: "x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)+18*(1-1/zoom)'",
  },
  {
    id: "scene_02",
    name: "02 · Doubts — Snap & Solve Under 3 Seconds",
    prompt:
      "Photorealistic cinematic macro-editorial photograph of a modern smartphone resting gently angled over a printed Indian science textbook, the phone's high-resolution screen displaying a crisp, illuminated AI interface showing an instant step-by-step solution to a complex formula, believable phone reflections, natural desk lighting, open notebook with student's handwritten equations nearby, soft depth of field focusing on the phone screen and problem, sophisticated Learning technology feel, electric blue #3B82F6 and cyan interface highlights, authentic Indian study desk background with dark charcoal vignette #0C0E12, shot on 50mm macro lens, 3:2 landscape. No floating holograms, no fake neon sci-fi graphics, no illegible gibberish text, no logos, no watermarks.",
    divePan: "x='iw/2-(iw/zoom/2)-15*(1-1/zoom)':y='ih/2-(ih/zoom/2)+10*(1-1/zoom)'",
  },
  {
    id: "scene_03",
    name: "03 · Practice — Dynamic Adaptive Engine",
    prompt:
      "Cinematic photorealistic photograph of a modern Indian educational assessment workspace, a student's wooden study table seamlessly transitioning into neatly arranged diagnostic test papers and practice scorecards, question cards organized cleanly by difficulty with subtle green mastery indicators, a digital tablet displaying adaptive performance analytics, realistic paper textures, soft studio lighting with emerald green #059669 and warm amber accents, serene focused academic atmosphere, full-frame camera depth of field, seamless dark charcoal background #0C0E12 with natural grounding contact shadows, centered composition, 3:2 landscape. No fantasy portal, no floating glowing magical objects, no cartoon drawings, no fake logos, no watermarks.",
    divePan: "x='iw/2-(iw/zoom/2)+12*(1-1/zoom)':y='ih/2-(ih/zoom/2)-10*(1-1/zoom)'",
  },
  {
    id: "scene_04",
    name: "04 · Notes — Intelligent Mind Map Synthesis",
    prompt:
      "Photorealistic cinematic editorial photograph of an organized Indian student's revision desk, several handwritten formula notes and sticky tabs elegantly synthesized and bound into a premium structured leather notebook and a clear visual concept mind map, high-lighters, sharp graphite pencils, natural paper grain and ink texture, warm practical desk lamp illumination, subtle amber gold #D97706 and terracotta details, scholarly and deeply satisfying organization, shot on 35mm lens, seamless charcoal vignette #0C0E12 with soft realistic contact shadows, 3:2 landscape. No chaotic fantasy vortex, no artificial neon laser trails, no fake logos, no watermarks.",
    divePan: "x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)-16*(1-1/zoom)'",
  },
  {
    id: "scene_05",
    name: "05 · Languages — Bharat-First Multilingual AI",
    prompt:
      "Cinematic ultra-realistic aerial architectural view of an illuminated 3D topographical relief map of India resting on a refined dark stone exhibition plinth, glowing artistic calligraphy ribbons gracefully representing major Indian regional scripts—Devanagari, Tamil, Telugu, and Bengali—flowing harmoniously across the states, soft warm saffron and violet #8B5CF6 ambient illumination, sophisticated national educational technology showcase, physically accurate stone and light reflections, deep charcoal atmosphere #0C0E12, shot on tilt-shift full frame lens, centered composition, 3:2 landscape. No distorted borders, no political flags, no cartoon characters, no harsh neon glare, no logos, no watermarks.",
    divePan: "x='iw/2-(iw/zoom/2)-10*(1-1/zoom)':y='ih/2-(ih/zoom/2)+15*(1-1/zoom)'",
  },
  {
    id: "scene_06",
    name: "06 · Exams — Library to the Exam Hall",
    prompt:
      "Ultra-photorealistic cinematic photograph inside a magnificent contemporary Indian academic library corridor, soaring warm oak bookshelves lined with reference volumes, warm recessed lighting along a polished sandstone hallway leading forward toward three elegant architectural portals labeled with understated brass signage for 'JEE', 'NEET', and 'UPSC', morning light pouring through majestic arched windows at the far end of the hall, aspirational atmosphere of focus, discipline, and triumph, full-frame 35mm lens, rich terracotta #D9532F and deep forest green #0E2922 accents, seamless dark charcoal edges #0C0E12, centered perspective, 3:2 landscape. No fantasy dungeon, no magical floating books, no cartoon characters, no logos, no watermarks.",
    divePan: "x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'",
  },
];

async function generateStillWithGemini(scene) {
  console.log(`\n-----------------------------------------------------------`);
  console.log(`[1/3] Generating Scene Still with Gemini API: "${scene.id}"...`);
  console.log(`-----------------------------------------------------------`);

  const rawPng = path.join(SCRATCH, `still_${scene.id}.png`);

  const response = await ai.models.generateContent({
    model: "models/gemini-2.5-flash-image",
    contents: scene.prompt,
  });

  const parts = response.candidates?.[0]?.content?.parts || [];
  let imageSaved = false;

  for (const part of parts) {
    if (part.inlineData && part.inlineData.data) {
      fs.writeFileSync(rawPng, Buffer.from(part.inlineData.data, "base64"));
      imageSaved = true;
      break;
    }
  }

  if (!imageSaved) {
    throw new Error(`Failed to receive inline image data for ${scene.id}`);
  }

  console.log(`  ✓ Raw still saved: ${rawPng}`);

  // Convert to high-res WebP posters (1920px desktop and 1080px mobile)
  const destWebp = path.join(STILLS, `${scene.id}.webp`);
  const destWebpM = path.join(STILLS, `${scene.id}-m.webp`);

  console.log(`[2/3] Encoding WebP posters (${scene.id}.webp & ${scene.id}-m.webp)...`);
  execSync(`ffmpeg -v error -y -i "${rawPng}" -vf "scale=1920:-2" -q:v 85 "${destWebp}"`);
  execSync(`ffmpeg -v error -y -i "${rawPng}" -vf "scale=1080:-2" -q:v 82 "${destWebpM}"`);
  console.log(`  ✓ WebP posters written to public/edu-world/stills/`);

  // Render 60fps seekable camera flight
  const diveMp4 = path.join(VID, `${scene.id}.mp4`);
  const diveMp4M = path.join(VID, `${scene.id}-m.mp4`);

  console.log(`[3/3] Encoding 60fps seekable flight clip (${scene.id}.mp4)...`);
  execSync(
    `ffmpeg -v error -y -loop 1 -i "${destWebp}" -vf "zoompan=z='min(zoom+0.0010,1.36)':${scene.divePan}:d=480:s=1920x1080:fps=60,unsharp=5:5:0.8:5:5:0.0" -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart -t 8 "${diveMp4}"`
  );
  execSync(
    `ffmpeg -v error -y -i "${diveMp4}" -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280" -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart "${diveMp4M}"`
  );
  console.log(`  ✓ Flight clips written to public/edu-world/vid/`);
}

async function main() {
  console.log("=======================================================");
  console.log("Dextora Edu: Gemini API Generation Pipeline");
  console.log("Generating 6 scene stills + 12 seekable flight clips");
  console.log("=======================================================");

  for (const scene of scenes) {
    await generateStillWithGemini(scene);
  }

  console.log("\n=======================================================");
  console.log("✓ All 6 Dextora Edu scenes and video clips generated successfully!");
  console.log("=======================================================");
}

main().catch((err) => {
  console.error("Pipeline execution failed:", err);
  process.exit(1);
});
