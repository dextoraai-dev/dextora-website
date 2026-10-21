export interface EduChapterCTA {
  label: string;
  labelHi: string;
  href: string;
  variant?: "primary" | "secondary";
}

export interface EduChapter {
  id: string;
  number: string;
  shortLabel: string;
  shortLabelHi: string;
  eyebrow: string;
  eyebrowHi: string;
  title: string;
  titleHi: string;
  subtext: string;
  subtextHi: string;
  accent: string;
  tags: string[];
  tagsHi: string[];
  still: string;
  stillMobile: string;
  clip: string;
  clipMobile: string;
  primaryCTA: EduChapterCTA;
  secondaryCTA: EduChapterCTA;
}

export const EDU_CHAPTERS: EduChapter[] = [
  {
    id: "hero",
    number: "01",
    shortLabel: "Hero",
    shortLabelHi: "शुरुआत",
    eyebrow: "01 / 06 · PRIVATE TUTOR",
    eyebrowHi: "०१ / ०६ · निजी ट्यूटर",
    title: "Your private tutor, in every pocket.",
    titleHi: "हर जेब में, आपका निजी ट्यूटर।",
    subtext:
      "AI-driven academic companion for Classes 1–12 and competitive aspirants preparing for IIT-JEE, NEET, and UPSC.",
    subtextHi:
      "कक्षा 1–12 के विद्यार्थियों और आईआईटी-जेईई, नीट व यूपीएससी अभ्यर्थियों के लिए समर्पित AI अध्ययन साथी।",
    accent: "#E05A38",
    tags: ["Classes 1–12", "IIT-JEE / NEET", "UPSC"],
    tagsHi: ["कक्षा १–१२", "जेईई / नीट", "यूपीएससी"],
    still: "/edu-world/stills/scene_01.webp",
    stillMobile: "/edu-world/stills/scene_01-m.webp",
    clip: "/edu-world/vid/scene_01.mp4",
    clipMobile: "/edu-world/vid/scene_01-m.mp4",
    primaryCTA: {
      label: "Get Dextora Edu",
      labelHi: "डेक्सटोरा एडु शुरू करें",
      href: "/products",
      variant: "primary",
    },
    secondaryCTA: {
      label: "Talk to Us",
      labelHi: "संपर्क करें",
      href: "/contact",
      variant: "secondary",
    },
  },
  {
    id: "doubts",
    number: "02",
    shortLabel: "Doubts",
    shortLabelHi: "डाउट्स",
    eyebrow: "02 / 06 · PHOTO DOUBT RESOLUTION",
    eyebrowHi: "०२ / ०६ · तत्काल प्रश्न समाधान",
    title: "Snap. Solve. Under 3 seconds.",
    titleHi: "फोटो खींचें। ३ सेकंड में हल।",
    subtext:
      "Instant photo doubt resolution: photograph any textbook problem and watch the step-by-step reasoning unfold under 3 seconds.",
    subtextHi:
      "किताब के किसी भी कठिन प्रश्न की तस्वीर लें और ३ सेकंड के भीतर स्पष्ट चरणबद्ध समाधान प्राप्त करें।",
    accent: "#3B82F6",
    tags: ["Under 3s Speed", "Step-by-Step", "All Subjects"],
    tagsHi: ["३ सेकंड में", "चरणबद्ध हल", "सभी विषय"],
    still: "/edu-world/stills/scene_02.webp",
    stillMobile: "/edu-world/stills/scene_02-m.webp",
    clip: "/edu-world/vid/scene_02.mp4",
    clipMobile: "/edu-world/vid/scene_02-m.mp4",
    primaryCTA: {
      label: "Try Doubt Solver",
      labelHi: "डाउट सॉल्वर आज़माएं",
      href: "/products",
      variant: "primary",
    },
    secondaryCTA: {
      label: "Learn How It Works",
      labelHi: "कार्यप्रणाली समझें",
      href: "#how-it-works",
      variant: "secondary",
    },
  },
  {
    id: "practice",
    number: "03",
    shortLabel: "Practice",
    shortLabelHi: "अभ्यास",
    eyebrow: "03 / 06 · ADAPTIVE PRACTICE",
    eyebrowHi: "०३ / ०६ · अनुकूलित अभ्यास",
    title: "Tests that adapt to you.",
    titleHi: "अभ्यास जो आपकी गति के अनुसार ढले।",
    subtext:
      "Adaptive practice tests with questions that dynamically calibrate to your strengths, isolating and eliminating knowledge gaps.",
    subtextHi:
      "अनुकूलित अभ्यास टेस्ट जो विद्यार्थी की क्षमता अनुसार प्रश्नों को पुनर्व्यवस्थित कर ज्ञान के अंतर को समाप्त करते हैं।",
    accent: "#059669",
    tags: ["Adaptive Pacing", "Diagnostic Sets", "Concept Mastery"],
    tagsHi: ["व्यक्तिगत गति", "निदानात्मक टेस्ट", "संकल्पना स्पष्टता"],
    still: "/edu-world/stills/scene_03.webp",
    stillMobile: "/edu-world/stills/scene_03-m.webp",
    clip: "/edu-world/vid/scene_03.mp4",
    clipMobile: "/edu-world/vid/scene_03-m.mp4",
    primaryCTA: {
      label: "Start Adaptive Test",
      labelHi: "अनुकूलित टेस्ट शुरू करें",
      href: "/products",
      variant: "primary",
    },
    secondaryCTA: {
      label: "View Syllabus Coverage",
      labelHi: "पाठ्यक्रम देखें",
      href: "/products",
      variant: "secondary",
    },
  },
  {
    id: "notes",
    number: "04",
    shortLabel: "Notes",
    shortLabelHi: "नोट्स",
    eyebrow: "04 / 06 · SMART NOTES",
    eyebrowHi: "०४ / ०६ · स्मार्ट नोट्स",
    title: "Smart notes, made for you.",
    titleHi: "स्मार्ट नोट्स, केवल आपके लिए।",
    subtext:
      "Scattered revision points and textbook chapters organize into clean, personalized summaries and structured visual mind maps.",
    subtextHi:
      "बिखरे हुए अध्याय और सूत्र स्वतः व्यवस्थित होकर संक्षिप्त और प्रभावी माइंड मैप और स्मार्ट नोट्स में बदल जाते हैं।",
    accent: "#D97706",
    tags: ["Auto Synthesis", "Mind Maps", "Rapid Revision"],
    tagsHi: ["स्वतः संश्लेषण", "माइंड मैप्स", "त्वरित दोहराव"],
    still: "/edu-world/stills/scene_04.webp",
    stillMobile: "/edu-world/stills/scene_04-m.webp",
    clip: "/edu-world/vid/scene_04.mp4",
    clipMobile: "/edu-world/vid/scene_04-m.mp4",
    primaryCTA: {
      label: "Explore Smart Notes",
      labelHi: "स्मार्ट नोट्स देखें",
      href: "/products",
      variant: "primary",
    },
    secondaryCTA: {
      label: "Sample Chapters",
      labelHi: "नमूना अध्याय",
      href: "/products",
      variant: "secondary",
    },
  },
  {
    id: "languages",
    number: "05",
    shortLabel: "Languages",
    shortLabelHi: "भाषाएं",
    eyebrow: "05 / 06 · REGIONAL LANGUAGE SUPPORT",
    eyebrowHi: "०५ / ०६ · क्षेत्रीय भाषा समर्थन",
    title: "Learn in your language.",
    titleHi: "अपनी भाषा में सीखें।",
    subtext:
      "Regional language support enabling students to master school syllabus and competitive exams in Hindi, English, and regional Indian scripts.",
    subtextHi:
      "हिंदी, अंग्रेजी और क्षेत्रीय भारतीय भाषाओं में स्कूली और प्रतियोगी पाठ्यक्रम की सहज और गहरी समझ।",
    accent: "#8B5CF6",
    tags: ["Hindi & English", "Regional Scripts", "Bharat-First"],
    tagsHi: ["हिंदी व अंग्रेजी", "क्षेत्रीय भाषाएं", "भारत-प्रथम"],
    still: "/edu-world/stills/scene_05.webp",
    stillMobile: "/edu-world/stills/scene_05-m.webp",
    clip: "/edu-world/vid/scene_05.mp4",
    clipMobile: "/edu-world/vid/scene_05-m.mp4",
    primaryCTA: {
      label: "Choose Your Language",
      labelHi: "अपनी भाषा चुनें",
      href: "/products",
      variant: "primary",
    },
    secondaryCTA: {
      label: "Why Bilingual Matters",
      labelHi: "द्विभाषी क्यों आवश्यक",
      href: "/vision",
      variant: "secondary",
    },
  },
  {
    id: "exams",
    number: "06",
    shortLabel: "Exams",
    shortLabelHi: "परीक्षाएं",
    eyebrow: "06 / 06 · EXAM HALL READINESS",
    eyebrowHi: "०६ / ०६ · परीक्षा हॉल तक",
    title: "From Class 1 to the exam hall.",
    titleHi: "कक्षा १ से परीक्षा हॉल तक।",
    subtext:
      "Guiding students from primary foundational concepts all the way to rigorous IIT-JEE, NEET, and UPSC competitive success.",
    subtextHi:
      "प्राथमिक शिक्षा की मजबूत नींव से लेकर आईआईटी-जेईई, नीट और यूपीएससी की अंतिम सफलता तक हर कदम पर साथ।",
    accent: "#D9532F",
    tags: ["School (1–12)", "JEE & NEET", "UPSC Mains"],
    tagsHi: ["स्कूली शिक्षा (१-१२)", "जेईई और नीट", "यूपीएससी"],
    still: "/edu-world/stills/scene_06.webp",
    stillMobile: "/edu-world/stills/scene_06-m.webp",
    clip: "/edu-world/vid/scene_06.mp4",
    clipMobile: "/edu-world/vid/scene_06-m.mp4",
    primaryCTA: {
      label: "Get Dextora Edu",
      labelHi: "डेक्सटोरा एडु शुरू करें",
      href: "/products",
      variant: "primary",
    },
    secondaryCTA: {
      label: "Talk to Us",
      labelHi: "संपर्क करें",
      href: "/contact",
      variant: "secondary",
    },
  },
];
