export interface ExperienceCTA {
  label: string;
  labelHi: string;
  href: string;
}

export interface ExperienceSection {
  id: string;
  label: string;
  labelHi: string;
  // Exterior video & mobile clip
  clip: string;
  clipMobile: string;
  // Interior: photoreal scrub clip played during "hold" phase
  interiorClip?: string;
  interiorClipMobile?: string;
  // Continuous timeline positions (in seconds)
  startTime: number;
  holdTime: number;
  endTime: number;
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
  continuousVideo: string;
  continuousVideoMobile: string;
  continuousLoopVideo: string;
  continuousLoopVideoMobile: string;
  totalDuration: number;
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
  continuousVideo: "/experience/vid/continuous-loop.mp4",
  continuousVideoMobile: "/experience/vid/continuous-loop-m.mp4",
  continuousLoopVideo: "/experience/vid/continuous-loop.mp4",
  continuousLoopVideoMobile: "/experience/vid/continuous-loop-m.mp4",
  totalDuration: 70.0,
  sections: [
    // ── 0 · Hub Intro ────────────────────────────────────────────────────
    {
      id: "hub",
      label: "Dextora Hub",
      labelHi: "डेक्सटोरा हब",
      clip: "/experience/vid/hub.mp4",
      clipMobile: "/experience/vid/hub-m.mp4",
      startTime: 0,
      holdTime: 3.0,
      endTime: 6.0,
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
      clip: "/experience/vid/learn.mp4",
      clipMobile: "/experience/vid/learn-m.mp4",
      interiorClip: "/cinematic/dextora-learn/scrub.mp4",
      interiorClipMobile: "/cinematic/dextora-learn/scrub-mobile.mp4",
      startTime: 16.0,
      holdTime: 19.0,
      endTime: 22.0,
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
      clip: "/experience/vid/dhyeya.mp4",
      clipMobile: "/experience/vid/dhyeya-m.mp4",
      interiorClip: "/cinematic/dhyeya-ias/scrub.mp4",
      interiorClipMobile: "/cinematic/dhyeya-ias/scrub-mobile.mp4",
      startTime: 32.0,
      holdTime: 35.0,
      endTime: 38.0,
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

    // ── 3 · AI Tutor Chatbot Demo ─────────────────────────────────────────────
    {
      id: "crm",
      label: "AI Tutor",
      labelHi: "AI ट्यूटर",
      clip: "/experience/vid/crm.mp4",
      clipMobile: "/experience/vid/crm-m.mp4",
      interiorClip: "/cinematic/dextora-crm/scrub.mp4",
      interiorClipMobile: "/cinematic/dextora-crm/scrub-mobile.mp4",
      startTime: 48.0,
      holdTime: 51.0,
      endTime: 54.0,
      accent: "#2563EB",
      scroll: 2.2,
      linger: 0.35,
      productSlug: "dextora-crm",
      eyebrow: "04 · AI Tutor Chatbot",
      eyebrowHi: "०४ · AI ट्यूटर चैटबॉट",
      title: "Your Personal AI Tutor, Available 24/7",
      titleHi: "आपका निजी AI ट्यूटर, हमेशा उपलब्ध",
      body: "Ask any question, get instant step-by-step explanations with diagrams, personalized to your pace — just like a one-on-one tutor sitting beside you.",
      bodyHi:
        "कोई भी सवाल पूछें, तुरंत चरण-दर-चरण उत्तर पाएं — बिल्कुल वैसे जैसे एक व्यक्तिगत शिक्षक आपके साथ बैठा हो।",
      tags: ["Instant Explanations", "Step-by-Step Guidance", "Personalized Pace"],
      tagsHi: ["त्वरित व्याख्या", "चरण-दर-चरण मार्गदर्शन", "व्यक्तिगत गति"],
      cta: {
        primary: {
          label: "Try AI Tutor",
          labelHi: "AI ट्यूटर आज़माएं",
          href: "https://dextora.org",
        },
        secondary: { label: "Deep Dive", labelHi: "विस्तार से जानें", href: "/products/dextora-crm" },
      },
    },

    // ── 4 · Finale / Closing CTA ─────────────────────────────────────────
    {
      id: "finale",
      label: "Convergence",
      labelHi: "संगम",
      clip: "/experience/vid/finale.mp4",
      clipMobile: "/experience/vid/finale-m.mp4",
      startTime: 64.0,
      holdTime: 67.0,
      endTime: 70.0,
      accent: "#E05A38",
      scroll: 1.8,
      linger: 0.45,
      eyebrow: "05 · Learning AI",
      eyebrowHi: "०५ · शैक्षणिक AI",
      title: "Ready to Experience Learning AI?",
      titleHi: "क्या आप शैक्षणिक AI का अनुभव करने के लिए तैयार हैं?",
      body: "All three pathways converge on precision Learning intelligence. Built with rigorous cognitive design, zero generic hallucinations, and deep bilingual mastery.",
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
