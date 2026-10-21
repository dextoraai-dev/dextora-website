export interface ExperienceCTA {
  label: string;
  labelHi: string;
  href: string;
}

export interface ExperienceSection {
  id: string;
  label: string;
  labelHi: string;
  // Exterior: isometric still + fly-in dive clip
  still: string;
  stillMobile: string;
  clip: string;
  clipMobile: string;
  // Interior: photoreal scrub clip played during "hold" phase
  // If present, the dive clip transitions into this interior clip
  interiorClip?: string;
  interiorClipMobile?: string;
  // Optional fallback still for interior (shown when interiorClip not yet loaded)
  interiorStill?: string;
  accent: string;
  scroll?: number;
  linger?: number;
  eyebrow: string;
  eyebrowHi: string;
  title: string;
  titleHi: string;
  body: string;
  bodyHi: string;
  tags: string[];
  tagsHi: string[];
  // Product slug used to pull JourneyText data from products.ts
  productSlug?: string;
  cta?: {
    primary: ExperienceCTA;
    secondary?: ExperienceCTA;
  };
}

export interface ExperienceConfig {
  brand: {
    name: string;
    href: string;
  };
  diveScroll: number;
  connScroll: number;
  crossfade: number;
  sections: ExperienceSection[];
  connectors: string[];
  connectorsMobile: string[];
}

export const experienceData: ExperienceConfig = {
  brand: {
    name: "Dextora",
    href: "/",
  },
  diveScroll: 1.4,
  connScroll: 0.9,
  crossfade: 0.12,
  sections: [
    // ── 0 · Hub Intro ────────────────────────────────────────────────────
    {
      id: "hub",
      label: "Dextora Hub",
      labelHi: "डेक्सटोरा हब",
      still: "/experience/hub.webp",
      stillMobile: "/experience/hub-m.webp",
      clip: "/experience/vid/hub.mp4",
      clipMobile: "/experience/vid/hub-m.mp4",
      accent: "#E05A38",
      scroll: 1.5,
      linger: 0.35,
      eyebrow: "01 · Arrival & Foundation",
      eyebrowHi: "०१ · आगमन एवं आधारशिला",
      title: "AI-Powered Learning for Every Learner in India",
      titleHi: "भारत के हर विद्यार्थी के लिए AI-संचालित शिक्षा",
      body: "A unified cognitive learning ecosystem bridging foundational K-12 academic mastery, Civil Services excellence, and automated institutional workflows.",
      bodyHi:
        "स्कूली पाठ्यक्रम, सिविल सेवा परीक्षा और संस्थागत कार्यप्रणालियों को एक सूत्र में पिरोने वाला एकीकृत शैक्षणिक मंच।",
      tags: ["Bilingual Intelligence", "NCERT & UPSC Aligned", "Socratic Guidance"],
      tagsHi: ["द्विभाषी बुद्धिमत्ता", "एनसीईआरटी एवं यूपीएससी आधारित", "सुकराती मार्गदर्शन"],
    },

    // ── 1 · Dextora Learn ────────────────────────────────────────────────
    {
      id: "learn",
      label: "Dextora Learn",
      labelHi: "डेक्सटोरा लर्न",
      // Exterior: isometric clay still + existing dive clip
      still: "/experience/learn.webp",
      stillMobile: "/experience/learn-m.webp",
      clip: "/experience/vid/learn.mp4",
      clipMobile: "/experience/vid/learn-m.mp4",
      // Interior: photoreal scene scrub clip
      interiorClip: "/cinematic/dextora-learn/scrub.mp4",
      interiorClipMobile: "/cinematic/dextora-learn/scrub-mobile.mp4",
      interiorStill: "/cinematic/dextora-learn/scene.png",
      accent: "#059669",
      scroll: 2.2,
      linger: 0.4,
      productSlug: "dextora-learn",
      eyebrow: "02 · K-12 Deep Mastery",
      eyebrowHi: "०२ · स्कूली पाठ्यक्रम गहन महारत",
      title: "Learn Every Chapter, Your Way",
      titleHi: "हर अध्याय सीखें, अपनी गति से",
      body: "Adaptive chapter pacing calibrated to individual speed, instant Socratic hints for first-principles thinking, and granular knowledge-gap heatmaps.",
      bodyHi:
        "विद्यार्थी की गति के अनुसार अनुकूली अध्याय गति, मौलिक सोच विकसित करने वाले सुकराती संकेत और ज्ञान अंतराल का सूक्ष्म विश्लेषण।",
      tags: ["Adaptive Chapter Pacing", "Socratic Hints", "Knowledge Heatmaps"],
      tagsHi: ["अनुकूली अध्याय गति", "सुकराती संकेत", "निदानात्मक हीटमैप"],
      cta: {
        primary: { label: "Launch Platform", labelHi: "प्लेटफ़ॉर्म खोलें", href: "https://dextora.org" },
        secondary: { label: "Deep Dive", labelHi: "विस्तार से जानें", href: "/products/dextora-learn" },
      },
    },

    // ── 2 · Dhyeya IAS ───────────────────────────────────────────────────
    {
      id: "dhyeya",
      label: "Dhyeya IAS",
      labelHi: "ध्येय IAS",
      still: "/experience/dhyeya.webp",
      stillMobile: "/experience/dhyeya-m.webp",
      clip: "/experience/vid/dhyeya.mp4",
      clipMobile: "/experience/vid/dhyeya-m.mp4",
      interiorClip: "/cinematic/dhyeya-ias/scrub.mp4",
      interiorClipMobile: "/cinematic/dhyeya-ias/scrub-mobile.mp4",
      interiorStill: "/cinematic/dhyeya-ias/scene.png",
      accent: "#D97706",
      scroll: 2.2,
      linger: 0.4,
      productSlug: "dhyeya-ias",
      eyebrow: "03 · UPSC & UPPCS Excellence",
      eyebrowHi: "०३ · सिविल सेवा उत्कृष्टता",
      title: "Current Affairs & AI Mains Evaluation",
      titleHi: "समसामयिकी और AI मुख्य परीक्षा उत्तर मूल्यांकन",
      body: "Daily national news synthesized into syllabus-mapped briefs, rapid Prelims MCQs, and instant vision-based rubric scoring for handwritten Mains answers in Hindi & English.",
      bodyHi:
        "दैनिक राष्ट्रीय समाचारों का जीएस १-४ में वर्गीकरण, त्वरित प्रीलिम्स अभ्यास और हिंदी व अंग्रेजी में हस्तलिखित मेन्स उत्तरों का रूब्रिक आधारित मूल्यांकन।",
      tags: ["GS 1-4 Syllabus Mapping", "Handwritten Answer OCR", "Bilingual Rubric Scoring"],
      tagsHi: ["जीएस १-४ पाठ्यक्रम मैपिंग", "हस्तलिखित उत्तर ओसीआर", "द्विभाषी रूब्रिक मूल्यांकन"],
      cta: {
        primary: {
          label: "Launch Platform",
          labelHi: "प्लेटफ़ॉर्म खोलें",
          href: "https://upscnews.dextora.org",
        },
        secondary: { label: "Deep Dive", labelHi: "विस्तार से जानें", href: "/products/dhyeya-ias" },
      },
    },

    // ── 3 · Dextora CRM ──────────────────────────────────────────────────
    {
      id: "crm",
      label: "Dextora CRM",
      labelHi: "डेक्सटोरा CRM",
      still: "/experience/crm.webp",
      stillMobile: "/experience/crm-m.webp",
      clip: "/experience/vid/crm.mp4",
      clipMobile: "/experience/vid/crm-m.mp4",
      interiorClip: "/cinematic/dextora-crm/scrub.mp4",
      interiorClipMobile: "/cinematic/dextora-crm/scrub-mobile.mp4",
      interiorStill: "/cinematic/dextora-crm/scene.png",
      accent: "#2563EB",
      scroll: 2.2,
      linger: 0.35,
      productSlug: "dextora-crm",
      eyebrow: "04 · Institutional Growth",
      eyebrowHi: "०४ · संस्थागत विकास",
      title: "Turning Conversations Into Acquisitions",
      titleHi: "संवाद को वास्तविक ग्राहकों में बदलें",
      body: "All-in-one sales control room featuring Official WhatsApp Cloud API broadcasts, visual deal pipelines, sub-5-second lead sync, and predictive lead scoring.",
      bodyHi:
        "आधिकारिक व्हाट्सएप क्लाउड एपीआई प्रसारण, दृश्यमान बिक्री पाइपलाइन, ५ सेकंड से तेज लीड सिंक और प्रेडिक्टिव स्कोरिंग के साथ सम्पूर्ण समाधान।",
      tags: ["WhatsApp Cloud API", "Visual Pipeline", "Sub-5s Lead Sync"],
      tagsHi: ["व्हाट्सएप क्लाउड एपीआई", "विजुअल पाइपलाइन", "त्वरित लीड सिंक"],
      cta: {
        primary: {
          label: "Launch Platform",
          labelHi: "प्लेटफ़ॉर्म खोलें",
          href: "https://crm-iota-sandy-13.vercel.app/",
        },
        secondary: { label: "Deep Dive", labelHi: "विस्तार से जानें", href: "/products/dextora-crm" },
      },
    },

    // ── 4 · Finale / Closing CTA ─────────────────────────────────────────
    {
      id: "finale",
      label: "Convergence",
      labelHi: "संगम",
      still: "/experience/finale.webp",
      stillMobile: "/experience/finale-m.webp",
      clip: "/experience/vid/finale.mp4",
      clipMobile: "/experience/vid/finale-m.mp4",
      accent: "#E05A38",
      scroll: 1.8,
      linger: 0.45,
      eyebrow: "05 · Pedagogical AI",
      eyebrowHi: "०५ · शैक्षणिक AI",
      title: "Ready to Experience Pedagogical AI?",
      titleHi: "क्या आप शैक्षणिक AI का अनुभव करने के लिए तैयार हैं?",
      body: "All three pathways converge on precision pedagogical intelligence. Built with rigorous cognitive design, zero generic hallucinations, and deep bilingual mastery.",
      bodyHi:
        "सभी मार्ग भारत के महत्वाकांक्षी विद्यार्थियों के लिए निर्मित प्रामाणिक शैक्षणिक AI पर केंद्रित हैं। शून्य भ्रांति और गहन द्विभाषी बुद्धिमत्ता।",
      tags: ["Bharat-First", "Rigorous Pedagogy", "Zero Hallucination"],
      tagsHi: ["भारत-प्रथम", "प्रामाणिक शिक्षाशास्त्र", "शून्य भ्रांति"],
      cta: {
        primary: {
          label: "Explore Products",
          labelHi: "उत्पाद देखें",
          href: "/products",
        },
        secondary: {
          label: "Talk to Us",
          labelHi: "संपर्क करें",
          href: "/contact",
        },
      },
    },
  ],
  connectors: [
    "/experience/vid/conn1.mp4",
    "/experience/vid/conn2.mp4",
    "/experience/vid/conn3.mp4",
    "/experience/vid/conn4.mp4",
  ],
  connectorsMobile: [
    "/experience/vid/conn1-m.mp4",
    "/experience/vid/conn2-m.mp4",
    "/experience/vid/conn3-m.mp4",
    "/experience/vid/conn4-m.mp4",
  ],
};
