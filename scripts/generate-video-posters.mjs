import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.resolve(__dirname, "../public/videos");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const posters = [
  {
    name: "hero-loop-poster.jpg",
    title: "Dextora Knowledge Core",
    subtitle: "Real-Time Pedagogical 3D Visuals",
    badge: "3D AMBIENT LOOP",
    bgGradient: ["#0B0E14", "#1A3F35", "#E05A38"],
    accent: "#E05A38",
  },
  {
    name: "dextora-explainer-poster.jpg",
    title: "The Dextora Story &amp; Platform Family",
    subtitle: "AI-Powered Learning for Every Learner in India",
    badge: "ECOSYSTEM OVERVIEW • 35s",
    bgGradient: ["#0B0E14", "#0E2922", "#E05A38"],
    accent: "#E05A38",
  },
  {
    name: "dhyeya-ias-explainer-poster.jpg",
    title: "Dhyeya IAS Current Affairs",
    subtitle: "From Daily Editorial to Mains Answer Grading",
    badge: "CIVIL SERVICES INTELLIGENCE • 24s",
    bgGradient: ["#0B0E14", "#26190E", "#D97706"],
    accent: "#D97706",
  },
  {
    name: "dextora-learn-explainer-poster.jpg",
    title: "Dextora Learn Mastery Journey",
    subtitle: "Personalized Chapter Breakdown &amp; Socratic AI",
    badge: "CURRICULUM MASTERY • 24s",
    bgGradient: ["#0B0E14", "#0D2E24", "#059669"],
    accent: "#059669",
  },
];

for (const item of posters) {
  const svg = `
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="70%" cy="50%" r="65%">
          <stop offset="0%" stop-color="${item.accent}" stop-opacity="0.25"/>
          <stop offset="50%" stop-color="${item.bgGradient[1]}" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="${item.bgGradient[0]}" stop-opacity="1"/>
        </radialGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#bg)"/>
      <rect x="60" y="60" width="1800" height="960" rx="32" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
      
      <!-- Subtle Decorative Circles -->
      <circle cx="1400" cy="540" r="320" fill="none" stroke="${item.accent}" stroke-width="2" stroke-opacity="0.3" stroke-dasharray="12 8"/>
      <circle cx="1400" cy="540" r="200" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
      <rect x="1310" y="450" width="180" height="180" rx="36" fill="${item.accent}" fill-opacity="0.8" transform="rotate(45 1400 540)"/>
      
      <!-- Play Button Backdrop -->
      <circle cx="960" cy="540" r="64" fill="rgba(14,41,34,0.7)" stroke="${item.accent}" stroke-width="3"/>
      <polygon points="948,515 985,540 948,565" fill="#FAF8F5"/>

      <!-- Typography -->
      <g transform="translate(140, 480)">
        <rect x="0" y="-140" width="380" height="44" rx="22" fill="rgba(255,255,255,0.08)" stroke="${item.accent}" stroke-width="1.5"/>
        <text x="24" y="-112" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="${item.accent}" letter-spacing="2">${item.badge.replace(/&bull;/g, "•")}</text>
        
        <text x="0" y="-30" font-family="'Playfair Display', Georgia, serif" font-size="64" font-weight="700" fill="#F8F5EE">${item.title}</text>
        <text x="0" y="35" font-family="system-ui, sans-serif" font-size="28" font-weight="400" fill="#A3B8B2">${item.subtitle}</text>
      </g>
    </svg>
  `;

  const dest = path.join(outDir, item.name);
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 88 })
    .toFile(dest);
  console.log(`Generated poster: ${dest}`);
}
