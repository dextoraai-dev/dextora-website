export interface MasterChapterCTA {
  label: string;
  labelHi: string;
  href: string;
  variant?: "primary" | "secondary";
}

export interface MasterChapter {
  id: string;
  number: string;
  category: "Edu Journey" | "AI Products";
  categoryHi: string;
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
  posterDesktop: string;
  posterMobile: string;
  frameBasePath: string; // e.g. "/edu-world/frames/scene_01" or "/cinematic/dextora-learn/frames"
  totalFrames: number;
  primaryCTA: MasterChapterCTA;
  secondaryCTA: MasterChapterCTA;
}

export const MASTER_CHAPTERS: MasterChapter[] = [
  // ───────────────────────────────────────────────────────────────────────────
  // PART 1: DEXTORA EDU — STUDENT DAY FLIGHT (BEATS 01 - 06)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "hero",
    number: "01",
    category: "Edu Journey",
    categoryHi: "एडु यात्रा",
    shortLabel: "Hero",
    shortLabelHi: "शुरुआत",
    eyebrow: "01 / 09 · PRIVATE TUTOR",
    eyebrowHi: "०१ / ०९ · निजी ट्यूटर",
    title: "Your private tutor, in every pocket.",
    titleHi: "हर जेब में, आपका निजी ट्यूटर।",
    subtext:
      "AI-driven academic companion for Classes 1–12 and competitive aspirants preparing for IIT-JEE, NEET, and UPSC.",
    subtextHi:
      "कक्षा 1–12 के विद्यार्थियों और आईआईटी-जेईई, नीट व यूपीएससी अभ्यर्थियों के लिए समर्पित AI अध्ययन साथी।",
    accent: "#E05A38",
    tags: ["Classes 1–12", "IIT-JEE / NEET", "UPSC"],
    tagsHi: ["कक्षा १–१२", "जेईई / नीट", "यूपीएससी"],
    posterDesktop: "/edu-world/stills/scene_01.webp",
    posterMobile: "/edu-world/stills/scene_01-m.webp",
    frameBasePath: "/edu-world/frames/scene_01",
    totalFrames: 72,
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
    category: "Edu Journey",
    categoryHi: "एडु यात्रा",
    shortLabel: "Doubts",
    shortLabelHi: "डाउट्स",
    eyebrow: "02 / 09 · PHOTO DOUBT RESOLUTION",
    eyebrowHi: "०२ / ०९ · तत्काल प्रश्न समाधान",
    title: "Snap. Solve. Under 3 seconds.",
    titleHi: "फोटो खींचें। ३ सेकंड में हल।",
    subtext:
      "Instant photo doubt resolution: photograph any textbook problem and watch the step-by-step reasoning unfold under 3 seconds.",
    subtextHi:
      "किताब के किसी भी कठिन प्रश्न की तस्वीर लें और ३ सेकंड के भीतर स्पष्ट चरणबद्ध समाधान प्राप्त करें।",
    accent: "#3B82F6",
    tags: ["Under 3s Speed", "Step-by-Step", "All Subjects"],
    tagsHi: ["३ सेकंड में", "चरणबद्ध हल", "सभी विषय"],
    posterDesktop: "/edu-world/stills/scene_02.webp",
    posterMobile: "/edu-world/stills/scene_02-m.webp",
    frameBasePath: "/edu-world/frames/scene_02",
    totalFrames: 72,
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
    category: "Edu Journey",
    categoryHi: "एडु यात्रा",
    shortLabel: "Practice",
    shortLabelHi: "अभ्यास",
    eyebrow: "03 / 09 · ADAPTIVE TESTING",
    eyebrowHi: "०३ / ०९ · अनुकूलित अभ्यास",
    title: "Adaptive tests that pinpoint gaps.",
    titleHi: "अनुकूलित टेस्ट, जो कमज़ोरी पहचानें।",
    subtext:
      "Dynamic practice sets recalibrate question difficulty in real time based on your accuracy, turning weak spots into strong holds.",
    subtextHi:
      "आपकी सटीकता के आधार पर प्रश्न कठिनाई को स्वतः ढालने वाले टेस्ट, जो कमज़ोर अध्यायों को सुदृढ़ बनाते हैं।",
    accent: "#10B981",
    tags: ["Dynamic Difficulty", "Weakness Heatmaps", "Speed Tracking"],
    tagsHi: ["कठिनाई स्तर", "कमजोरी विश्लेषण", "गति मापन"],
    posterDesktop: "/edu-world/stills/scene_03.webp",
    posterMobile: "/edu-world/stills/scene_03-m.webp",
    frameBasePath: "/edu-world/frames/scene_03",
    totalFrames: 72,
    primaryCTA: {
      label: "Start Mock Test",
      labelHi: "मॉक टेस्ट दें",
      href: "/products",
      variant: "primary",
    },
    secondaryCTA: {
      label: "See Analytics",
      labelHi: "एनालिटिक्स देखें",
      href: "/products",
      variant: "secondary",
    },
  },
  {
    id: "notes",
    number: "04",
    category: "Edu Journey",
    categoryHi: "एडु यात्रा",
    shortLabel: "Notes",
    shortLabelHi: "नोट्स",
    eyebrow: "04 / 09 · SMART CONCEPT NOTES",
    eyebrowHi: "०४ / ०९ · स्मार्ट नोट्स",
    title: "Smart notes built from your study sessions.",
    titleHi: "आपके अध्ययन से स्वतः निर्मित नोट्स।",
    subtext:
      "Auto-generated revision sheets, atomic formula cards, and concept mind-maps synthesized from your doubts and test performance.",
    subtextHi:
      "आपके हल किए गए प्रश्नों और टेस्ट प्रदर्शन से स्वतः तैयार रिवीज़न शीट, सूत्र कार्ड और माइंड-मैप।",
    accent: "#8B5CF6",
    tags: ["Formula Cards", "Concept Mind-Maps", "One-Click Export"],
    tagsHi: ["सूत्र कार्ड", "माइंड-मैप", "पीडीएफ एक्सपोर्ट"],
    posterDesktop: "/edu-world/stills/scene_04.webp",
    posterMobile: "/edu-world/stills/scene_04-m.webp",
    frameBasePath: "/edu-world/frames/scene_04",
    totalFrames: 72,
    primaryCTA: {
      label: "Explore Smart Notes",
      labelHi: "स्मार्ट नोट्स देखें",
      href: "/products",
      variant: "primary",
    },
    secondaryCTA: {
      label: "Download Sample PDF",
      labelHi: "सैंपल पीडीएफ",
      href: "/resources",
      variant: "secondary",
    },
  },
  {
    id: "languages",
    number: "05",
    category: "Edu Journey",
    categoryHi: "एडु यात्रा",
    shortLabel: "Languages",
    shortLabelHi: "भाषाएं",
    eyebrow: "05 / 09 · REGIONAL LANGUAGE MASTERY",
    eyebrowHi: "०५ / ०९ · मातृभाषा में अध्ययन",
    title: "Learn in your language, think in your voice.",
    titleHi: "अपनी भाषा में सीखें, अपनी आवाज़ में सोचें।",
    subtext:
      "Full academic tutoring in Hindi, Hinglish, Tamil, Telugu, Marathi, and Bengali without losing mathematical or scientific rigor.",
    subtextHi:
      "हिंदी, हिंग्लिश, तमिल, तेलुगु, मराठी और बांग्ला में संपूर्ण शिक्षण — बिना वैज्ञानिक शुद्धता खोए।",
    accent: "#F59E0B",
    tags: ["Hindi & Hinglish", "Tamil & Telugu", "Marathi & Bengali"],
    tagsHi: ["हिंदी व हिंग्लिश", "तमिल व तेलुगु", "मराठी व बांग्ला"],
    posterDesktop: "/edu-world/stills/scene_05.webp",
    posterMobile: "/edu-world/stills/scene_05-m.webp",
    frameBasePath: "/edu-world/frames/scene_05",
    totalFrames: 72,
    primaryCTA: {
      label: "Choose Your Language",
      labelHi: "अपनी भाषा चुनें",
      href: "/products",
      variant: "primary",
    },
    secondaryCTA: {
      label: "Meet the AI Tutor",
      labelHi: "AI ट्यूटर से मिलें",
      href: "/about",
      variant: "secondary",
    },
  },
  {
    id: "exams",
    number: "06",
    category: "Edu Journey",
    categoryHi: "एडु यात्रा",
    shortLabel: "Exams",
    shortLabelHi: "परीक्षाएं",
    eyebrow: "06 / 09 · COMPETITIVE ASPIRANTS",
    eyebrowHi: "०६ / ०९ · प्रतियोगी परीक्षाएं",
    title: "Targeted for IIT-JEE, NEET, and UPSC aspirants.",
    titleHi: "आईआईटी-जेईई, नीट और यूपीएससी के लिए समर्पित।",
    subtext:
      "Exam-specific countdown trackers, previous years' question banks, and precision syllabus coverage calibrated to national toppers.",
    subtextHi:
      "परीक्षा-विशिष्ट काउंटडाउन, पिछले वर्षों के प्रश्न पत्र और टॉपर्स के अनुरूप सटीक पाठ्यक्रम तैयारी।",
    accent: "#EC4899",
    tags: ["PYQs 2010–2025", "All-India Ranks", "Deep Syllabus"],
    tagsHi: ["विगत वर्ष प्रश्न", "अखिल भारतीय रैंक", "विस्तृत पाठ्यक्रम"],
    posterDesktop: "/edu-world/stills/scene_06.webp",
    posterMobile: "/edu-world/stills/scene_06-m.webp",
    frameBasePath: "/edu-world/frames/scene_06",
    totalFrames: 72,
    primaryCTA: {
      label: "Join Aspirant Cohort",
      labelHi: "अभ्यर्थी बैच में जुड़ें",
      href: "/products",
      variant: "primary",
    },
    secondaryCTA: {
      label: "View Exam Blueprints",
      labelHi: "परीक्षा ब्लूप्रिंट देखें",
      href: "/resources",
      variant: "secondary",
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // PART 2: DEXTORA PRODUCT ECOSYSTEM (BEATS 07 - 09)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "dextora-learn",
    number: "07",
    category: "AI Products",
    categoryHi: "AI उत्पाद",
    shortLabel: "Learn",
    shortLabelHi: "लर्न",
    eyebrow: "07 / 09 · PRODUCT ECOSYSTEM",
    eyebrowHi: "०७ / ०९ · उत्पाद पारिस्थितिकी",
    title: "Learn Every Chapter, Your Way.",
    titleHi: "हर अध्याय सीखें, अपनी गति से।",
    subtext:
      "Personalised, chapter-wise AI mastery across school and collegiate curricula with adaptive pacing and continuous concept diagnostics.",
    subtextHi:
      "स्कूल और कॉलेज के पाठ्यक्रम के लिए अनुकूलित AI अध्ययन — सजीव अभ्यास और अवधारणात्मक स्पष्टता के साथ।",
    accent: "#D9532F",
    tags: ["Adaptive Pacing", "Socratic Hints", "Knowledge Heatmaps"],
    tagsHi: ["अनुकूलित गति", "सुक्राती संकेत", "ज्ञान विश्लेषण"],
    posterDesktop: "/cinematic/dextora-learn/scene.png",
    posterMobile: "/cinematic/dextora-learn/poster.jpg",
    frameBasePath: "/cinematic/dextora-learn/frames",
    totalFrames: 120,
    primaryCTA: {
      label: "Explore Dextora Learn",
      labelHi: "डेक्सटोरा लर्न देखें",
      href: "https://dextora.org",
      variant: "primary",
    },
    secondaryCTA: {
      label: "View Curriculum",
      labelHi: "पाठ्यक्रम देखें",
      href: "/products#dextora-learn",
      variant: "secondary",
    },
  },
  {
    id: "dhyeya-ias",
    number: "08",
    category: "AI Products",
    categoryHi: "AI उत्पाद",
    shortLabel: "Dhyeya IAS",
    shortLabelHi: "ध्येय आईएएस",
    eyebrow: "08 / 09 · UPSC CIVIL SERVICES AI",
    eyebrowHi: "०८ / ०९ · सिविल सेवा AI",
    title: "Current Affairs, Simplified for UPSC.",
    titleHi: "समसामयिकी, यूपीएससी के लिए सहज।",
    subtext:
      "Daily bilingual editorial breakdowns, GS 1–4 syllabus linkages, and instant answer-evaluation bots developed with Dhyeya IAS pedagogues.",
    subtextHi:
      "दैनिक द्विभाषी संपादकीय विश्लेषण, सामान्य अध्ययन पाठ्यक्रम मैपिंग और तात्कालिक उत्तर मूल्यांकन।",
    accent: "#10B981",
    tags: ["Daily Editorials", "GS 1–4 Mapping", "Mains Evaluation"],
    tagsHi: ["दैनिक संपादकीय", "जीएस १-४ मैपिंग", "मुख्य परीक्षा मूल्यांकन"],
    posterDesktop: "/cinematic/dhyeya-ias/scene.png",
    posterMobile: "/cinematic/dhyeya-ias/poster.jpg",
    frameBasePath: "/cinematic/dhyeya-ias/frames",
    totalFrames: 120,
    primaryCTA: {
      label: "Access Dhyeya IAS AI",
      labelHi: "ध्येय आईएएस AI खोलें",
      href: "https://dhyeyaias.com",
      variant: "primary",
    },
    secondaryCTA: {
      label: "View UPSC Modules",
      labelHi: "यूपीएससी मॉड्यूल",
      href: "/products#dhyeya-ias",
      variant: "secondary",
    },
  },
  {
    id: "dextora-crm",
    number: "09",
    category: "AI Products",
    categoryHi: "AI उत्पाद",
    shortLabel: "CRM & WhatsApp",
    shortLabelHi: "सीआरएम व व्हाट्सएप",
    eyebrow: "09 / 09 · INSTITUTIONAL INTELLIGENCE",
    eyebrowHi: "०९ / ०९ · संस्थागत बुद्धिमत्ता",
    title: "Student CRM & WhatsApp Intelligence.",
    titleHi: "विद्यार्थी सीआरएम और व्हाट्सएप एआई।",
    subtext:
      "Enterprise lead nurturing, automated fee & parent communications, and 24/7 AI-driven doubt support delivered directly on WhatsApp.",
    subtextHi:
      "संस्थानों के लिए विद्यार्थी प्रवेश प्रबंधन, अभिभावक सूचनाएं और व्हाट्सएप पर २४/७ तत्काल अध्ययन सहायता।",
    accent: "#25D366",
    tags: ["WhatsApp AI Bots", "Parent Alerts", "Enrollment CRM"],
    tagsHi: ["व्हाट्सएप बॉट", "अभिभावक सूचना", "प्रवेश सीआरएम"],
    posterDesktop: "/cinematic/dextora-crm/scene.png",
    posterMobile: "/cinematic/dextora-crm/poster.jpg",
    frameBasePath: "/cinematic/dextora-crm/frames",
    totalFrames: 120,
    primaryCTA: {
      label: "Connect WhatsApp Bot",
      labelHi: "व्हाट्सएप बॉट जोड़ें",
      href: "/contact",
      variant: "primary",
    },
    secondaryCTA: {
      label: "Schedule Demo",
      labelHi: "डेमो बुक करें",
      href: "/contact",
      variant: "secondary",
    },
  },
];
