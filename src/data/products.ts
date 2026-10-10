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
      "Dextora Learn redefines academic preparation by turning static textbooks into interactive, multi-modal learning journeys. Powered by custom pedagogically aligned LLMs, Dextora Learn diagnoses knowledge gaps at the atomic concept level, guides students with Socratic hints, and personalises practice sets to guarantee retention.",
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
    slug: "dextora-campus",
    name: "Dextora Campus",
    shortName: "Campus OS",
    tagline: "The Operating System for AI-Augmented Classrooms.",
    oneLiner: "Institutional AI infrastructure for schools, colleges, and coaching networks.",
    description:
      "Enterprise pedagogical intelligence platform empowering institutions with automated question paper authoring, student performance telemetry, and AI-assisted teacher copilot.",
    longDescription:
      "Dextora Campus delivers a secure, compliant AI layer for educational institutions. It empowers faculty to generate balanced examination papers in seconds, auto-grade homework with meaningful feedback, and detect at-risk students before exams through predictive cohort analytics.",
    url: "#coming-soon",
    status: "coming-soon",
    statusBadge: "In Development",
    features: [
      "Institutional Exam & Worksheet Generator with Bloom's taxonomy tags",
      "Teacher Copilot for instant lesson planning and differentiated tasks",
      "Cohort Performance Telemetry & proactive retention alerts",
    ],
    deepFeatures: [
      {
        title: "Automated Blueprint Authoring",
        description:
          "Generate CBSE/ICSE standard question papers with balanced difficulty weightage and complete marking keys in under 60 seconds.",
        iconName: "FileSpreadsheet",
      },
      {
        title: "Classroom Analytics Copilot",
        description:
          "Real-time visibility into student comprehension patterns to help teachers personalize their lecture pacing.",
        iconName: "BarChart3",
      },
      {
        title: "Secure Institutional AI Sandbox",
        description:
          "Enterprise data residency with strict student privacy protection and zero unauthorized model training.",
        iconName: "Lock",
      },
    ],
    audience: "Schools, Junior Colleges, Coaching Institutes, and University Departments",
    targetUsers: [
      "School Principals and Academic Directors",
      "Educators seeking to reduce grading overhead",
      "Coaching networks managing multi-branch cohorts",
    ],
    icon: "Building2",
    accentColor: "#6366F1", // Indigo / Violet
    accentBg: "bg-indigo-500/10 dark:bg-indigo-500/15",
    accentBorder: "border-indigo-500/30 hover:border-indigo-500",
    stats: [
      { value: "Q3 2026", label: "Target Launch" },
      { value: "15+", label: "Pilot Partner Schools" },
      { value: "10x", label: "Assessment Creation Speed" },
    ],
    screenshots: [],
    highlights: [
      "Integrates seamlessly with existing LMS via LTI 1.3",
      "Compliant with Indian NEP 2020 competency framework",
      "Teacher-in-the-loop validation for all AI content",
    ],
    bilingualSupport: true,
    languages: ["English", "Hindi", "Regional Languages (Roadmap)"],
    launchYear: "2026",
    nameHi: "डेक्सटोरा कैंपस",
    taglineHi: "AI-संवर्धित कक्षाओं के लिए संचालन प्रणाली।",
    oneLinerHi: "स्कूलों, कॉलेजों और कोचिंग संस्थानों के लिए संस्थागत AI अवसंरचना।",
    featuresHi: [
      "ब्लूम्स टैक्सोनॉमी पर आधारित स्वचालित परीक्षा एवं वर्कशीट लेखक",
      "पाठ योजना और अंतर-स्तरीय शिक्षण के लिए शिक्षक कोपायलट",
      "संस्थागत समूह प्रदर्शन विश्लेषण और सक्रिय शैक्षणिक चेतावनियाँ",
    ],
    statusBadgeHi: "विकासाधीन",
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
