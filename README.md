# Dextora AI — Central Corporate Hub

> **Dextora** is an AI-powered EdTech company building precision learning platforms for academic curriculum and civil services excellence in India.

This repository contains the central corporate parent hub that unifies all Dextora products, including **Dextora Learn** (`https://dextora.org`) and **Dhyeya IAS Current Affairs by Dextora AI** (`https://upscnews.dextora.org`).

---

## 🚀 Technology Stack

- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 + Custom Design Tokens (Warm cream `#F8F5EE` light base, refined dark mode, terracotta `#E05A38` and emerald accents)
- **Icons & Animation**: Lucide React + Framer Motion
- **Validation**: Zod schema validation (Forms & API route handlers)
- **SEO & Structured Data**: JSON-LD schemas (`Organization`, `WebSite`, `Product`, `FAQPage`, `BlogPosting`)
- **i18n Readiness**: English (`en`) active + Hindi (`hi`) bilingual dictionary & language toggle
- **Analytics**: Provider-agnostic wrapper (GA4 / Plausible / PostHog ready)
- **Email Service**: Stubbed provider interface with Resend API integration

---

## 📂 Site Structure

| Route | Purpose |
| :--- | :--- |
| `/` | **Home**: Hero, Product Showcase, 4 Pillars, How it Works, Stats, Blog, Testimonials, FAQ, CTA |
| `/products` | **All Products**: Overview, feature comparison, unified AI engine architecture |
| `/products/[slug]` | **Product Detail**: Deep feature breakdown, target audience, stats, live launch link |
| `/about` | **About Dextora**: Mission, founding story (Bloom's 2-Sigma Problem), values, leadership team |
| `/vision` | **Vision**: 5-year technology roadmap, 3 tenets of cognitive EdTech, Bharat inclusion |
| `/blog` | **Research & Blog**: Pedagogical AI dispatches, vision OCR breakdown, bilingual architecture |
| `/blog/[slug]` | **Article Page**: Full article text, author bio, reading time, related articles |
| `/careers` | **Careers**: Open positions, culture & perks, direct job application form |
| `/contact` | **Contact**: Categorized inquiry form, Bengaluru HQ & Delhi operations hubs |
| `/privacy` | **Privacy Policy**: DPDP Act compliance, student data isolation guarantee |
| `/terms` | **Terms of Service**: Educational disclaimers and usage terms |
| `/sitemap.xml` | **Dynamic XML Sitemap**: Generated automatically from product & blog registries |
| `/robots.txt` | **Search Crawler Directives** |

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 18.18+ or 20+ (Node v24 supported)
- npm, pnpm, or yarn

### 2. Installation
```bash
# Clone the repository
git clone <repo-url>
cd maindextora

# Install dependencies
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your variables:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=your_resend_api_key_here # Optional: logs in dev if empty
EMAIL_FROM="Dextora Notifications <notifications@dextora.org>"
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build & Verification
```bash
npm run build
npm run start
```

---

## 📦 How to Add a New Product to the Registry

The site is **100% data-driven**. You can add a new product or modify existing products in **one single file** without changing any page layouts:

1. Open [`src/data/products.ts`](./src/data/products.ts).
2. Add a new product object to the `products` array:

```typescript
{
  slug: "dextora-pulse",
  name: "Dextora Pulse",
  shortName: "Pulse",
  tagline: "Adaptive Homework & Retention Tracker",
  oneLiner: "Daily concept micro-assessments for CBSE schools.",
  description: "AI diagnostic companion detecting learning gaps before term exams.",
  longDescription: "Detailed multi-paragraph description of the platform...",
  url: "https://pulse.dextora.org", // or "#coming-soon"
  status: "live", // "live" | "beta" | "coming-soon"
  statusBadge: "Live Platform",
  features: [
    "5-minute daily diagnostic drills",
    "Instant conceptual remediation hints",
    "Classroom comprehension heatmap for teachers"
  ],
  deepFeatures: [
    {
      title: "Micro-Paced Retention",
      description: "Spaced repetition algorithms tuned to school syllabi.",
      iconName: "BrainCircuit"
    }
  ],
  audience: "K-12 Students & School Teachers",
  targetUsers: ["Grade 6-10 CBSE Students", "Science & Math Educators"],
  icon: "GraduationCap",
  accentColor: "#059669",
  accentBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
  accentBorder: "border-emerald-500/30 hover:border-emerald-500",
  stats: [
    { value: "20,000+", label: "Active Students" },
    { value: "98%", label: "Curriculum Accuracy" }
  ],
  screenshots: [],
  highlights: ["NCERT Aligned", "DPDP Compliant"],
  bilingualSupport: true,
  languages: ["English", "Hindi"],
  launchYear: "2026"
}
```

3. The new product will **automatically appear** in:
   - The Sticky Navbar "Products" dropdown
   - The Home Page Product Showcase
   - The `/products` directory page
   - A dedicated dynamic detail page at `/products/dextora-pulse`
   - The Footer product links
   - The dynamic `/sitemap.xml`
   - The SEO `SoftwareApplication` JSON-LD schema

---

## 🔗 Cross-Site Consistency: "Part of Dextora" Bar

To embed the top Dextora ecosystem bar on separate product subdomains (`dextora.org`, `upscnews.dextora.org`), import or replicate the config from [`src/data/site-config.ts`](./src/data/site-config.ts):

```typescript
import { sharedSubdomainBarConfig } from "@/data/site-config";
```

Or embed [`src/components/layout/DextoraBar.tsx`](./src/components/layout/DextoraBar.tsx) as a shared component.

---

## 🛡️ Form Validation & Spam Protection

All user forms (Contact, Careers, Newsletter) include:
- **Client & Server-side Zod validation**
- **Invisible Honeypot (`_gotcha`) bot traps**
- **Pluggable email dispatch** via [`src/lib/email-service.ts`](./src/lib/email-service.ts)

---

## 🎨 3D Visual Explainers & Remotion Video Studio

Dextora explains pedagogical concepts through interactive procedural 3D visuals and code-generated Remotion videos, avoiding walls of text.

### 1. Procedural 3D Objects (`src/components/3d/objects/`)
- **`KnowledgeBook.tsx`**: Layered pages fanning open and releasing floating glowing chapter tokens (Dextora Learn &bull; Emerald `#059669`).
- **`NewsStack.tsx`**: Translucent news slates peeling off into question bubbles and score telemetry (Dhyeya IAS &bull; Amber `#D97706`).
- **`AnswerSheet.tsx`**: Handwritten paper sheet scanned by a sweeping laser plane with rubric highlights and score badges (Mains Evaluation &bull; Terracotta `#E05A38`).
- **`CampusGrid.tsx`**: Modular architectural campus blocks assembling dynamically with live telemetry pulses (Dextora Campus &bull; Indigo `#6366F1`).
- **`DataFlowNetwork.tsx`**: Cognitive nucleus with satellite nodes and traveling data light pulses (Shared AI Engine).

*All 3D objects feature PBR materials, dark/light theme awareness, gentle idle float, progress scrubbing (`progress: 0..1`), and full WebGL resource disposal on unmount.*

### 2. Scroll-Driven 3D Explainers (`src/components/explainers/`)
- **`ScrollExplainer.tsx`**: Sticky interactive pedagogical explainer cross-fading through learning stages alongside synchronized 3D object state animations.
- **`Product3DGallery.tsx`**: Keyboard-accessible (`←`/`→`), interactive 3D model viewer with screen-reader DOM descriptions and animation scrubbers.

### 3. Remotion Video Studio (`/video`)
An isolated Remotion studio generating high-definition, silent kinetic typography and 3D videos into `public/videos/`.

#### Running the Video Studio:
```bash
# Open Remotion Studio Preview
cd video
npm run preview

# Render all video compositions to public/videos/
npm run render:all
```

#### Re-generating Optimized Videos via FFmpeg:
```bash
node scripts/build-optimized-videos.mjs
```

#### Outputs generated:
- `.mp4` (1080p H.264, WebM fallback VP9, and 720p mobile variants)
- `.jpg` high-quality poster stills
- `.vtt` WebVTT accessibility subtitle tracks

### 4. Accessible Video Components (`src/components/shared/`)
- **`VideoPlayer.tsx`**: Supports ambient Hero background mode and full accessible interactive player with keyboard controls, caption toggles, fullscreen, and `prefers-reduced-motion` compliance.
- **`VideoModal.tsx`**: "Watch the Story" modal dialog on the home page.
- **`VideoObject` JSON-LD**: Generated in `src/lib/seo.ts` for search engine rich snippets.

---

## 📄 License
© 2026 Dextora AI Technologies Private Limited. All Rights Reserved.
