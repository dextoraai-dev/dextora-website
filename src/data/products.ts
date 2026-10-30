export type ProductStatus = "live" | "beta" | "coming-soon";

export interface ProductFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface ProductStat {
  value: string;
  label: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  oneLiner: string;
  description: string;
  longDescription: string;
  url: string;
  status: ProductStatus;
  statusBadge: string;
  image?: ProductImage;
  features: string[];
  deepFeatures: ProductFeature[];
  audience: string;
  targetUsers: string[];
  icon: string;
  accentColor: string; // Tailwind color or Hex
  accentBg: string;
  accentBorder: string;
  stats: ProductStat[];
  screenshots: string[];
  highlights: string[];
  bilingualSupport: boolean;
  languages: string[];
  launchYear: string;
  nameHi?: string;
  taglineHi?: string;
  oneLinerHi?: string;
  featuresHi?: string[];
  statusBadgeHi?: string;
}

// Single Source of Truth for all Dextora Family Products
export const products: Product[] = [
  {
    slug: "dextora-learn",
    name: "Dextora Learn",
    shortName: "Learn",
    tagline: "Learn Every Chapter, Your Way.",
    oneLiner: "Personalised, chapter-wise AI mastery for academic curriculum.",
    description:
      "AI-powered learning platform designed for deep academic mastery across school and collegiate curricula. Delivers adaptive chapter pacing, instant concept breakdowns, and precision diagnostic quizzes.",
    longDescription:
      "Dextora Learn redefines academic preparation by turning static textbooks into interactive, multi-modal learning journeys. Powered by custom Learningly aligned LLMs, Dextora Learn diagnoses knowledge gaps at the atomic concept level, guides students with Socratic hints, and personalises practice sets to guarantee retention.",
    url: "https://dextora.org",
    status: "live",
    statusBadge: "Live Platform",
    image: {
      src: "/images/generated/product-dextora-learn.webp",
      alt: "Dextora Learn personalized AI learning and concept mastery interface",
    },
    features: [
      "Adaptive Chapter Pacing tailored to individual student speed",
      "Instant Socratic Hint Engine for step-by-step problem resolution",
      "Continuous Mastery Diagnostics with granular knowledge gap heatmaps",
    ],
    deepFeatures: [
      {
        title: "Atomic Concept Breakdown",
        description:
          "Complex syllabus topics decompose into bite-sized cognitive modules with interactive simulations and real-world analogies.",
        iconName: "BrainCircuit",
      },
      {
        title: "Socratic AI Tutor",
        description:
          "Instead of handing out direct answers, the tutor prompts students with guided questions to cultivate first-principles thinking.",
        iconName: "MessageSquareCode",
      },
      {
        title: "Predictive Exam Readiness",
        description:
          "Real-time benchmark modeling estimates student confidence and scores against board and competitive exam standards.",
        iconName: "TrendingUp",
      },
      {
        title: "Bilingual Concept Switcher",
        description:
          "Seamlessly toggle key definitions, summaries, and audio walkthroughs between English and Hindi.",
        iconName: "Languages",
      },
    ],
    audience: "K-12 & Undergraduate Students, CBSE/State Board Aspirants",
    targetUsers: [
      "CBSE & State Board students (Grades 8-12)",
      "Foundational STEM & Humanities Undergraduates",
      "Self-directed learners requiring asynchronous tutoring",
    ],
    icon: "GraduationCap",
    accentColor: "#059669", // Emerald Green
    accentBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500",
    stats: [
      { value: "50,000+", label: "Active Learners" },
      { value: "1.2M+", label: "Practice Questions Answered" },
      { value: "94%", label: "Concept Retention Rate" },
    ],
    screenshots: [
      "/images/products/dextora-learn-1.webp",
      "/images/products/dextora-learn-2.webp",
    ],
    highlights: [
      "Curriculum aligned with NCERT & State frameworks",
      "Zero-latency response via edge AI caching",
      "Comprehensive parent & teacher analytics dashboard",
    ],
    bilingualSupport: true,
    languages: ["English", "Hindi"],
    launchYear: "2024",
    nameHi: "डेक्सटोरा लर्न",
    taglineHi: "हर अध्याय सीखें, अपनी गति से।",
    oneLinerHi: "स्कूली पाठ्यक्रम के लिए व्यक्तिगत, अध्याय-वार AI अध्ययन प्रणाली।",
    featuresHi: [
      "व्यक्तिगत छात्र की गति के अनुकूल अनुकूली अध्याय गति",
      "चरण-दर-चरण समस्या समाधान के लिए त्वरित सुकराती संकेत",
      "सटीक ज्ञान अंतराल विश्लेषण के साथ निरंतर निदानात्मक परीक्षण",
    ],
    statusBadgeHi: "लाइव प्लेटफ़ॉर्म",
  },
  {
    slug: "dhyeya-ias",
    name: "Dhyeya IAS Current Affairs",
    shortName: "Dhyeya IAS",
    tagline: "AI-Powered Current Affairs for UPSC & UPPCS.",
    oneLiner: "Exam-ready news, auto-generated MCQs, & AI Mains answer evaluation in Hindi & English.",
    description:
      "A specialized intelligence platform engineered for Civil Services aspirants. Transforms daily national & international affairs into syllabus-mapped briefs, rapid MCQs, and automated Mains answer evaluation with scoring rubric.",
    longDescription:
      "Dhyeya IAS Current Affairs by Dextora AI bridges the gap between massive daily news cycles and the rigorous UPSC/UPPCS syllabus. Aspirants receive curated daily summaries mapped to GS Papers 1-4, instantaneous MCQ drills with detailed rationales, and an advanced Vision-enabled Mains Answer Evaluation engine that critiques handwritten submissions against model answers.",
    url: "https://upscnews.dextora.org",
    status: "live",
    statusBadge: "Live Platform",
    image: {
      src: "/images/generated/product-dhyeya-ias.webp",
      alt: "Dhyeya IAS AI current affairs and UPSC Mains evaluation interface",
    },
    features: [
      "GS Syllabus-Mapped Daily News & Editorial Syntheses",
      "Instant Prelims MCQ Generation with deep contextual rationale",
      "AI Mains Answer Sheet Evaluation with rubric-based scoring",
    ],
    deepFeatures: [
      {
        title: "Syllabus Micro-Tagging",
        description:
          "Every news item is automatically mapped to specific GS Paper topics (GS 1, 2, 3, 4 & Essay) with past year exam cross-references.",
        iconName: "Tags",
      },
      {
        title: "AI Mains Answer Evaluation",
        description:
          "Upload handwritten answer photos to receive instant feedback on structure, keywords, intro-body-conclusion flow, and rubric scores.",
        iconName: "FileCheck",
      },
      {
        title: "Native Hindi & English Engine",
        description:
          "Pure bilingual architecture with native Hindi terminology, ensuring equal quality for both English and Hindi medium aspirants.",
        iconName: "Globe",
      },
      {
        title: "Daily Prelims MCQ Radar",
        description:
          "Auto-generated high-yield standard MCQs matching UPSC difficulty with statement-based assertions and elimination tips.",
        iconName: "CheckCircle2",
      },
    ],
    audience: "UPSC CSE, UPPCS, State Public Service Commission Aspirants",
    targetUsers: [
      "UPSC Civil Services Aspirants (Prelims & Mains)",
      "UPPCS & State PSC Candidates (Hindi & English Medium)",
      "Faculty & Mentors at Premier Civil Service Institutes",
    ],
    icon: "ShieldAlert",
    accentColor: "#D97706", // Amber / Saffron
    accentBg: "bg-amber-500/10 dark:bg-amber-500/15",
    accentBorder: "border-amber-500/30 hover:border-amber-500",
    stats: [
      { value: "35,000+", label: "Civil Service Aspirants" },
      { value: "250,000+", label: "Mains Answers Scored" },
      { value: "100%", label: "Bilingual Coverage (HI/EN)" },
    ],
    screenshots: [
      "/images/products/dhyeya-ias-1.webp",
      "/images/products/dhyeya-ias-2.webp",
    ],
    highlights: [
      "Strict alignment with UPSC Examination Rubric",
      "OCR handwriting recognition for Hindi and English answers",
      "Daily editorial breakdowns from The Hindu, Indian Express, and PIB",
    ],
    bilingualSupport: true,
    languages: ["Hindi", "English"],
    launchYear: "2024",
    nameHi: "ध्येय IAS समसामयिकी",
    taglineHi: "UPSC और UPPCS के लिए AI-संचालित समसामयिकी।",
    oneLinerHi: "परीक्षा-उन्मुख समाचार, त्वरित MCQs और हिंदी व अंग्रेजी में AI मुख्य परीक्षा उत्तर मूल्यांकन।",
    featuresHi: [
      "GS पाठ्यक्रम से मैप किए गए दैनिक समाचार और संपादकीय सार",
      "विस्तृत व्याख्या के साथ त्वरित प्रीलिम्स MCQ अभ्यास",
      "रूब्रिक-आधारित स्कोरिंग के साथ AI मेन्स उत्तर पुस्तिका मूल्यांकन",
    ],
    statusBadgeHi: "लाइव प्लेटफ़ॉर्म",
  },
  {
    slug: "dextora-crm",
    name: "Dextora CRM",
    shortName: "CRM & WhatsApp",
    tagline: "Turning Conversations Into Customer Acquisitions.",
    oneLiner: "Official WhatsApp Cloud API & AI Sales Pipeline for high-growth businesses.",
    description:
      "Affordable, all-in-one CRM solution to capture, track, and close deals without hidden charges. Supercharge revenue with verified WhatsApp broadcasts and automated lead scoring.",
    longDescription:
      "Dextora CRM delivers a unified sales operating system designed to turn multi-channel conversations into paying customers. Equipped with an Official WhatsApp Cloud API integration, visual drag-and-drop Kanban pipelines, sub-5-second Meta Ads lead sync, and predictive AI lead scoring, Dextora CRM empowers modern sales teams to accelerate deal velocity and close deals faster.",
    url: "https://crm-iota-sandy-13.vercel.app/",
    status: "live",
    statusBadge: "Live Platform",
    image: {
      src: "/images/generated/product-dextora-crm.webp",
      alt: "Dextora CRM visual sales pipeline and WhatsApp Cloud API interface",
    },
    features: [
      "Official WhatsApp Cloud API with verified green-tick broadcast campaigns",
      "Visual Drag-and-Drop Sales Pipeline with stage velocity tracking",
      "AI Predictive Lead Scoring (1-100) & instant Meta Ads lead sync",
    ],
    deepFeatures: [
      {
        title: "Official WhatsApp Cloud API & Broadcasts",
        description:
          "Send bulk promotional campaigns, catalogs, and drip sequences to 100k+ subscribers with 98% open rates and zero ban risk.",
        iconName: "MessageSquareQuote",
      },
      {
        title: "Visual Sales Pipeline & Kanban Funnel",
        description:
          "Build custom multi-stage sales funnels with drag-and-drop ease, stage verification checks, and automated PDF invoice generation.",
        iconName: "Kanban",
      },
      {
        title: "AI Predictive Lead Scoring",
        description:
          "Automatically grade inbound leads from 1 to 100 based on website activity, company size, and purchase intent signals before reps call.",
        iconName: "Target",
      },
      {
        title: "360° Omnichannel Inbox & Meta Sync",
        description:
          "Sync Facebook Ads, Instagram DMs, LinkedIn forms, Gmail, and WhatsApp into a single multi-agent shared team inbox.",
        iconName: "MessagesSquare",
      },
    ],
    audience: "High-Growth Sales Teams, B2B Founders, Marketing Agencies, and Scaling Businesses",
    targetUsers: [
      "Sales Directors & CROs optimizing deal closing velocity",
      "Growth Marketers scaling bulk WhatsApp campaigns with Meta verified API",
      "Founders & Account Executives needing zero-delay lead handoffs",
    ],
    icon: "Kanban",
    accentColor: "#1E5E4B", // Dextora Forest Pine
    accentBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    accentBorder: "border-emerald-500/30 hover:border-emerald-500",
    stats: [
      { value: "$2.4M+", label: "Monthly Deals Processed" },
      { value: "98.8%", label: "WhatsApp Open Rate" },
      { value: "3.8x", label: "Faster Lead Response" },
    ],
    screenshots: [
      "/images/products/dextora-crm-1.webp",
      "/images/products/dextora-crm-2.webp",
    ],
    highlights: [
      "Official Meta Verified WhatsApp Business Cloud API Partner",
      "Sub-5s instant auto-replies with 24/7 AI chatbot workflows",
      "SOC2 Type II audit-ready and GDPR-compliant bank-grade data security",
    ],
    bilingualSupport: true,
    languages: ["English", "Hindi"],
    launchYear: "2026",
    nameHi: "डेक्सटोरा सीआरएम",
    taglineHi: "वार्तालाप को ग्राहक अधिग्रहण में परिवर्तित करें।",
    oneLinerHi: "आधिकारिक व्हाट्सएप क्लाउड एपीआई और आधुनिक सेल्स टीमों के लिए एआई सीआरएम।",
    featuresHi: [
      "98% ओपन रेट के साथ आधिकारिक व्हाट्सएप ग्रीन-टिक ब्रॉडकास्ट",
      "डील चरण और राजस्व गति के साथ विज़ुअल कानबन सेल्स पाइपलाइन",
      "एआई प्रेडिक्टिव लीड स्कोरिंग और मेटा विज्ञापन ऑटो-सिंक",
    ],
    statusBadgeHi: "लाइव प्लेटफ़ॉर्म",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getLiveProducts(): Product[] {
  return products.filter((p) => p.status === "live");
}
