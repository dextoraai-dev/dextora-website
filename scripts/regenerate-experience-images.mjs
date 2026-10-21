import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Missing GEMINI_API_KEY in .env.local");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });
const SCRATCH = path.resolve("scratch/experience");
const ASSETS = path.resolve("public/experience");
const VID = path.resolve("public/experience/vid");

fs.mkdirSync(SCRATCH, { recursive: true });
fs.mkdirSync(ASSETS, { recursive: true });
fs.mkdirSync(VID, { recursive: true });
const scenes = [
  {
    name: "hub",
    prompt:
      "Ultra-realistic cinematic architectural photograph of a contemporary Indian technology and education campus at blue hour, a striking modern glass-and-concrete central pavilion with warm light spilling through floor-to-ceiling windows, landscaped stone pathways branching toward three distinct modern buildings in the distance, subtle Indian architectural influences expressed through sandstone textures and elegant geometric screens, realistic trees and planted terraces, physically accurate glass reflections, natural material imperfections, sophisticated architectural digest photography, shot on a full-frame camera with a 35mm tilt-shift lens, realistic global illumination, deep charcoal atmosphere, warm terracotta and amber practical lighting, restrained emerald accents, premium real-world architecture, believable scale and construction, the complete campus isolated against a seamless solid charcoal background #0C0E12 with natural contact shadows and no visible horizon, centered composition, generous negative space around the structure, 3:2 landscape. Absolutely no miniature models, no low-poly geometry, no cartoon rendering, no toy-like buildings, no holograms, no floating objects, no text, no letters, no logos, no watermarks, no color swatches.",
    divePan: "x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)+15*(1-1/zoom)'",
  },
  {
    name: "learn",
    prompt:
      "Photorealistic interior architectural photograph of a premium contemporary Indian learning studio designed for school students, real students in the background naturally collaborating around a large wooden table with notebooks, open textbooks, a physical science model and a laptop displaying a subtle educational interface, a teacher guiding a small group, floor-to-ceiling windows with soft natural daylight, warm oak furniture, textured plaster walls, a few indoor plants, muted emerald green and terracotta accents, authentic classroom details, believable human proportions, candid editorial photography, natural skin textures, realistic shadows and lens depth of field, shot on a full-frame camera with a 35mm lens, sophisticated educational design magazine aesthetic, dark charcoal surroundings #0C0E12 with a controlled vignette and realistic grounding shadows, composition focused on the actual learning environment, 3:2 landscape. No miniature diorama, no low-poly art, no toy-like furniture, no holographic projections, no floating UI, no exaggerated neon glow, no text overlays, no logos, no watermarks, no color swatches.",
    divePan: "x='iw/2-(iw/zoom/2)-20*(1-1/zoom)':y='ih/2-(ih/zoom/2)'",
  },
  {
    name: "dhyeya",
    prompt:
      "Photorealistic cinematic architectural photograph of a serious Indian civil services examination preparation library, inspired by a premium New Delhi study centre, rows of real wooden study desks, comfortable individual reading lamps, shelves filled with reference books, printed current-affairs newspapers and neatly organized exam preparation notes, a few Indian aspirants studying quietly in the background, one student reviewing handwritten Mains answer sheets beside a laptop, tall windows, sandstone and dark wood finishes, subtle saffron and warm amber lighting, realistic paper textures and everyday study objects, documentary-style editorial photography, naturally composed human subjects, full-frame 35mm lens, believable modern Indian academic environment, warm practical lighting balanced with deep charcoal shadows, restrained emerald and terracotta details, seamless charcoal background #0C0E12 beyond the architectural scene with realistic contact shadows, centered composition, 3:2 landscape. No fantasy examination hall, no floating books, no holograms, no glowing magical scanners, no low-poly geometry, no artificial miniature buildings, no fake legible text, no logos, no watermarks, no color swatches.",
    divePan: "x='iw/2-(iw/zoom/2)+15*(1-1/zoom)':y='ih/2-(ih/zoom/2)+10*(1-1/zoom)'",
  },
  {
    name: "crm",
    prompt:
      "Photorealistic cinematic photograph of a modern Indian SaaS company's sales operations office, a real professional seated at a clean desk using two large monitors displaying believable CRM software interfaces with a sales pipeline of deal cards, customer records, conversion charts and lead activity, a smartphone beside the keyboard showing a generic business messaging conversation inspired by WhatsApp without any recognizable trademark or readable text, natural desk accessories, notebooks, subtle glass partitions and blurred colleagues collaborating in the background, realistic monitor reflections, accurate screen illumination on the desk and hands, understated electric blue and emerald interface accents, charcoal walls, warm practical office lighting, candid premium business editorial photography, shot on a full-frame camera with a 35mm lens, sophisticated enterprise software brand aesthetic, realistic proportions and natural materials, deep charcoal background #0C0E12 with a seamless studio-style edge and natural contact shadows, centered composition, 3:2 landscape. No futuristic sci-fi control room, no floating dashboards, no holograms, no glowing Kanban structures, no miniature diorama, no toy-like computers, no exaggerated neon, no gibberish text overlays, no logos, no watermarks, no color swatches.",
    divePan: "x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)-15*(1-1/zoom)'",
  },
  {
    name: "finale",
    prompt:
      "Ultra-realistic cinematic architectural photograph of a beautiful contemporary Indian campus courtyard at golden hour, a welcoming central glass pavilion connecting three visible real-world environments: a modern learning studio, a quiet civil services preparation library and a professional technology office, warm sunlight passing through architectural glass, natural sandstone paving, elegant terracotta architectural accents, subtle emerald landscaping, a few real people walking naturally between the spaces, realistic trees and shadows, refined modern Indian architecture, physically accurate reflections, premium architectural magazine photography, shot on a full-frame camera with a 35mm tilt-shift lens, natural warm amber light balanced with deep charcoal tones, aspirational but believable real-world design, all architecture grounded on a continuous realistic courtyard with natural contact shadows, seamless dark charcoal background #0C0E12 around the overall composition, centered composition with a clear central focal point and breathing room, 3:2 landscape. No fantasy portal, no magical glowing gateway, no miniature diorama, no low-poly buildings, no floating structures, no holograms, no artificial neon trails, no text, no letters, no logos, no watermarks, no color swatches.",
    divePan: "x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'",
  },
];

async function generateStill(scene) {
  console.log(`\n[1/3] Generating AI diorama still for "${scene.name}"...`);
  const rawPng = path.join(SCRATCH, `still_${scene.name}.png`);

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
    throw new Error(`Failed to receive inline image data for ${scene.name}`);
  }

  console.log(`  ✓ Raw still saved: ${rawPng}`);

  // Convert to high-res WebP (1800px desktop and 1080px mobile)
  const destWebp = path.join(ASSETS, `${scene.name}.webp`);
  const destWebpM = path.join(ASSETS, `${scene.name}-m.webp`);

  console.log(`[2/3] Encoding WebP posters (${scene.name}.webp & ${scene.name}-m.webp)...`);
  execSync(
    `ffmpeg -v error -y -i "${rawPng}" -vf "scale=1800:-2" -q:v 85 "${destWebp}"`
  );
  execSync(
    `ffmpeg -v error -y -i "${rawPng}" -vf "scale=1080:-2" -q:v 82 "${destWebpM}"`
  );
  console.log(`  ✓ WebP posters written to public/experience/`);

  // Render 60fps seekable camera flight
  const diveMp4 = path.join(VID, `${scene.name}.mp4`);
  const diveMp4M = path.join(VID, `${scene.name}-m.mp4`);

  console.log(`[3/3] Encoding 60fps seekable dive clip (${scene.name}.mp4)...`);
  execSync(
    `ffmpeg -v error -y -loop 1 -i "${destWebp}" -vf "zoompan=z='min(zoom+0.0012,1.38)':${scene.divePan}:d=360:s=1280x720:fps=60,unsharp=5:5:0.8:5:5:0.0" -c:v libx264 -preset fast -crf 19 -pix_fmt yuv420p -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart -t 6 "${diveMp4}"`
  );
  execSync(
    `ffmpeg -v error -y -i "${diveMp4}" -vf "scale=720:-2" -c:v libx264 -preset fast -crf 22 -pix_fmt yuv420p -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart "${diveMp4M}"`
  );
  console.log(`  ✓ Dive video written to public/experience/vid/`);
}

function generateConnectors() {
  console.log("\n=======================================================");
  console.log("Generating 4 seamless crossfade connector clips...");
  console.log("=======================================================");

  const pairs = [
    { idx: 1, from: "hub", to: "learn" },
    { idx: 2, from: "learn", to: "dhyeya" },
    { idx: 3, from: "dhyeya", to: "crm" },
    { idx: 4, from: "crm", to: "finale" },
  ];

  for (const pair of pairs) {
    const fromMp4 = path.join(VID, `${pair.from}.mp4`);
    const toMp4 = path.join(VID, `${pair.to}.mp4`);
    const connMp4 = path.join(VID, `conn${pair.idx}.mp4`);
    const connMp4M = path.join(VID, `conn${pair.idx}-m.mp4`);

    console.log(`\nEncoding connector ${pair.idx}: ${pair.from} -> ${pair.to}...`);
    execSync(
      `ffmpeg -v error -y -ss 4 -i "${fromMp4}" -to 2.5 -i "${toMp4}" -filter_complex "[0:v][1:v]xfade=transition=fade:duration=1.0:offset=1.2,format=yuv420p,unsharp=5:5:0.6:5:5:0.0" -c:v libx264 -preset fast -crf 19 -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart -t 3 "${connMp4}"`
    );
    execSync(
      `ffmpeg -v error -y -i "${connMp4}" -vf "scale=720:-2" -c:v libx264 -preset fast -crf 22 -pix_fmt yuv420p -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart "${connMp4M}"`
    );
    console.log(`  ✓ conn${pair.idx}.mp4 and conn${pair.idx}-m.mp4 complete.`);
  }
}

async function main() {
  console.log("=======================================================");
  console.log("Dextora Scroll World: Complete Media Regeneration");
  console.log("Model: gemini-2.5-flash-image via GoogleGenAI");
  console.log("=======================================================");

  for (const scene of scenes) {
    await generateStill(scene);
  }

  generateConnectors();

  console.log("\n=======================================================");
  console.log("✓ All 5 scene stills, 5 dives, and 4 connectors regenerated successfully!");
  console.log("=======================================================");
}

main().catch((err) => {
  console.error("Regeneration failed:", err);
  process.exit(1);
});
