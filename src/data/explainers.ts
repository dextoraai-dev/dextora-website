export type ExplainerObjectType =
  | "book"
  | "news"
  | "answersheet"
  | "crm"
  | "network";

export interface ExplainerStep {
  stepNumber: string;
  badge: { en: string; hi: string };
  title: { en: string; hi: string };
  subtitle: { en: string; hi: string };
  description: { en: string; hi: string };
  highlights: { en: string[]; hi: string[] };
  objectType: ExplainerObjectType;
  accentColor: string;
}

export interface ExplainerData {
  id: string;
  badge: { en: string; hi: string };
  title: { en: string; hi: string };
  subtitle: { en: string; hi: string };
  steps: ExplainerStep[];
}

export const homeHowItWorksExplainer: ExplainerData = {
  id: "home-how-it-works",
  badge: {
    en: "Learning Architecture",
    hi: "शैक्षणिक आर्किटेक्चर",
  },
  title: {
    en: "How Dextora Powers Precision Learning",
    hi: "डेक्सटोरा सटीक शिक्षण को कैसे सक्षम बनाता है",
  },
  subtitle: {
    en: "A closed-loop AI architecture that diagnoses, practices, and evaluates with zero hallucination.",
    hi: "एक क्लोज्ड-लूप एआई आर्किटेक्चर जो बिना किसी त्रुटि के निदान, अभ्यास और मूल्यांकन करता है।",
  },
  steps: [
    {
      stepNumber: "01",
      badge: { en: "Ingest & Diagnose", hi: "निदान और विश्लेषण" },
      title: {
        en: "Atomic Concept Diagnostics",
        hi: "परमाणु स्तर पर अवधारणा निदान",
      },
      subtitle: {
        en: "Deconstructs curriculum into granular knowledge graphs",
        hi: "पाठ्यक्रम को विस्तृत ज्ञान रेखाचित्रों में विभाजित करता है",
      },
      description: {
        en: "Every textbook chapter is broken down into interconnected cognitive nodes. The system diagnoses prerequisite gaps before moving to advanced topics.",
        hi: "प्रत्येक अध्याय को आपस में जुड़े संज्ञानात्मक नोड्स में विभाजित किया जाता है। उन्नत विषयों पर जाने से पहले प्रणाली पूर्व-आवश्यक कमियों की पहचान करती है।",
      },
      highlights: {
        en: [
          "Curriculum-grounded NCERT & UPSC knowledge graphs",
          "Identifies prerequisite misconceptions instantly",
          "Dynamic cognitive pacing adapted to learner speed",
        ],
        hi: [
          "एनसीईआरटी और यूपीएससी ज्ञान रेखाचित्रों पर आधारित",
          "अवधारणात्मक त्रुटियों की तुरंत पहचान",
          "शिक्षार्थी की गति के अनुसार अनुकूलित गति",
        ],
      },
      objectType: "book",
      accentColor: "#059669",
    },
    {
      stepNumber: "02",
      badge: { en: "Synthesize & Drill", hi: "सटीक प्रश्न निर्माण" },
      title: {
        en: "Blueprint-Aligned Question Synthesis",
        hi: "ब्लूप्रिंट-आधारित प्रश्न निर्माण",
      },
      subtitle: {
        en: "Generates high-yield standard questions in seconds",
        hi: "कुछ ही सेकंड में उच्च-मानक प्रश्न तैयार करता है",
      },
      description: {
        en: "Transforms complex daily current affairs and syllabus chapters into statement-based assertion MCQs and analytical drills with elimination logic.",
        hi: "दैनिक समसामयिकी और पाठ्यक्रम के अध्यायों को कथन-आधारित बहुविकल्पीय प्रश्नों और विश्लेषणात्मक अभ्यासों में बदलता है।",
      },
      highlights: {
        en: [
          "Zero generic hallucinations with strict grounding",
          "UPSC and CBSE official difficulty modeling",
          "Native bilingual parity between Hindi & English",
        ],
        hi: [
          "सटीक संदर्भों के साथ शून्य त्रुटि",
          "यूपीएससी और सीबीएसई आधिकारिक स्तर का मॉडलिंग",
          "हिंदी और अंग्रेजी में पूर्ण भाषाई समानता",
        ],
      },
      objectType: "news",
      accentColor: "#D97706",
    },
    {
      stepNumber: "03",
      badge: { en: "Evaluate & Mentor", hi: "मूल्यांकन और मार्गदर्शन" },
      title: {
        en: "Rubric-Based AI Vision Grading",
        hi: "रूब्रिक-आधारित एआई मूल्यांकन",
      },
      subtitle: {
        en: "Instant OCR grading for handwritten answers",
        hi: "हस्तलिखित उत्तरों का तत्काल ओसीआर मूल्यांकन",
      },
      description: {
        en: "Aspirants upload handwritten answer sheets. Vision models scan paragraphs, verify key terminology, check structural flow, and provide actionable rubric scoring.",
        hi: "अभ्यर्थी अपनी हस्तलिखित उत्तर पुस्तिका अपलोड करते हैं। विज़न मॉडल पैराग्राफ, मुख्य शब्दावली और संरचना की जांच कर विस्तृत अंक प्रदान करता है।",
      },
      highlights: {
        en: [
          "Sub-60s multi-page handwriting OCR processing",
          "Transparent breakdown of intro, body & conclusion",
          "Socratic feedback suggestions for score improvement",
        ],
        hi: [
          "60 सेकंड से कम में हस्तलेखन ओसीआर प्रोसेसिंग",
          "भूमिका, मुख्य भाग और निष्कर्ष का पारदर्शी विश्लेषण",
          "अंक सुधार हेतु सुकराती मार्गदर्शन",
        ],
      },
      objectType: "answersheet",
      accentColor: "#E05A38",
    },
  ],
};

export const dhyeyaIasExplainer: ExplainerData = {
  id: "dhyeya-ias-explainer",
  badge: {
    en: "Civil Services Intelligence",
    hi: "सिविल सेवा बुद्धिमत्ता",
  },
  title: {
    en: "From Daily Editorial to Mains Mastery",
    hi: "दैनिक संपादकीय से मुख्य परीक्षा निपुणता तक",
  },
  subtitle: {
    en: "How Dhyeya IAS transforms 100+ pages of daily news into exam-ready answers.",
    hi: "ध्येय आईएएस कैसे दैनिक समाचारों को परीक्षा-उपयोगी उत्तरों में बदलता है।",
  },
  steps: [
    {
      stepNumber: "01",
      badge: { en: "News Synthesis", hi: "संपादकीय विश्लेषण" },
      title: {
        en: "Syllabus Micro-Tagging & Synthesis",
        hi: "पाठ्यक्रम माइक्रो-टैगिंग और सारांश",
      },
      subtitle: {
        en: "Automated GS Paper 1-4 syllabus mapping",
        hi: "जीएस पेपर 1-4 का स्वचालित पाठ्यक्रम मैपिंग",
      },
      description: {
        en: "Every morning, national editorials and PIB releases are parsed, stripped of partisan noise, and mapped directly to GS Paper 1 to 4 topics.",
        hi: "प्रतिदिन सुबह राष्ट्रीय संपादकीय और पीआईबी विज्ञप्तियों का विश्लेषण कर उन्हें जीएस 1 से 4 के विषयों से सीधे मैप किया जाता है।",
      },
      highlights: {
        en: [
          "Maps to specific UPSC syllabus micro-topics",
          "Filters noise to retain core policy arguments",
          "Available simultaneously in Hindi and English",
        ],
        hi: [
          "यूपीएससी पाठ्यक्रम के विशिष्ट विषयों से मैपिंग",
          "अनावश्यक विवरण हटाकर मुख्य नीतिगत तर्कों को संजोना",
          "हिंदी और अंग्रेजी दोनों माध्यमों में एक साथ उपलब्ध",
        ],
      },
      objectType: "news",
      accentColor: "#D97706",
    },
    {
      stepNumber: "02",
      badge: { en: "Prelims Radar", hi: "प्रारंभिक परीक्षा अभ्यास" },
      title: {
        en: "Dynamic Prelims MCQ Engine",
        hi: "गतिशील प्रारंभिक परीक्षा एमसीक्यू इंजन",
      },
      subtitle: {
        en: "High-yield statement-based questions",
        hi: "कथन-आधारित उच्च स्तरीय प्रश्न",
      },
      description: {
        en: "Test your retention daily with statement-based elimination questions designed to replicate the rigorous standard of UPSC Prelims.",
        hi: "यूपीएससी प्रारंभिक परीक्षा के कड़े मानकों पर आधारित कथन-आधारित प्रश्नों के साथ अपनी तैयारी की दैनिक जांच करें।",
      },
      highlights: {
        en: [
          "Elimination rationale for every option",
          "Historical PYQ trend correlation",
          "Peer accuracy and speed telemetry",
        ],
        hi: [
          "प्रत्येक विकल्प के लिए विस्तृत व्याख्या",
          "विगत वर्षों के प्रश्नों से तुलनात्मक विश्लेषण",
          "सटीकता और गति का वास्तविक समय विश्लेषण",
        ],
      },
      objectType: "network",
      accentColor: "#059669",
    },
    {
      stepNumber: "03",
      badge: { en: "Mains Evaluation", hi: "मुख्य परीक्षा मूल्यांकन" },
      title: {
        en: "Bilingual Handwritten Evaluation",
        hi: "द्विभाषी हस्तलिखित उत्तर मूल्यांकन",
      },
      subtitle: {
        en: "Official UPSC marking rubric applied instantly",
        hi: "आधिकारिक यूपीएससी अंकन रूब्रिक पर त्वरित मूल्यांकन",
      },
      description: {
        en: "Upload photos of your handwritten answers. Our vision model reads Hindi & English handwriting, evaluates keyword density, diagrams, and arguments.",
        hi: "अपनी हस्तलिखित उत्तर पुस्तिका की तस्वीर अपलोड करें। हमारा विज़न मॉडल हिंदी और अंग्रेजी दोनों में हस्तलेखन पढ़कर विस्तृत प्रतिक्रिया देता है।",
      },
      highlights: {
        en: [
          "Comprehensive handwriting OCR in Hindi and English",
          "Diagram, flowchart, and map incorporation checks",
          "Direct suggestions for value-addition points",
        ],
        hi: [
          "हिंदी और अंग्रेजी में पूर्ण हस्तलेखन ओसीआर",
          "चित्र, फ्लोचार्ट और मानचित्रों की गुणवत्ता जांच",
          "उत्तर संवर्धन हेतु विशिष्ट सुझाव",
        ],
      },
      objectType: "answersheet",
      accentColor: "#E05A38",
    },
  ],
};

export const dextoraLearnExplainer: ExplainerData = {
  id: "dextora-learn-explainer",
  badge: {
    en: "Curriculum Mastery",
    hi: "पाठ्यक्रम निपुणता",
  },
  title: {
    en: "Personalized Chapter Mastery",
    hi: "व्यक्तिगत अध्याय निपुणता",
  },
  subtitle: {
    en: "How Dextora Learn adapts to individual student comprehension.",
    hi: "डेक्सटोरा लर्न प्रत्येक विद्यार्थी की समझ के अनुसार कैसे अनुकूलित होता है।",
  },
  steps: [
    {
      stepNumber: "01",
      badge: { en: "Chapter Breakdown", hi: "अध्याय विश्लेषण" },
      title: {
        en: "Atomic Concept Decomposition",
        hi: "परमाणु अवधारणा विघटन",
      },
      subtitle: {
        en: "From monolithic textbooks to bite-sized mastery",
        hi: "भारी पाठ्यपुस्तकों से सरल और सुगम शिक्षण",
      },
      description: {
        en: "Textbooks are organized into bite-sized cognitive modules with interactive simulations, key definitions, and real-world Indian contextual analogies.",
        hi: "पाठ्यपुस्तकों को छोटे-छोटे संज्ञानात्मक मॉड्यूल में व्यवस्थित किया गया है, जिसमें व्यावहारिक उदाहरण और सिमुलेशन शामिल हैं।",
      },
      highlights: {
        en: [
          "NCERT syllabus structured into 10-minute micro-concepts",
          "Visual simulations and interactive definitions",
          "Hindi and English dual-language switch",
        ],
        hi: [
          "एनसीईआरटी पाठ्यक्रम 10 मिनट के सूक्ष्म-अवधारणाओं में संरचित",
          "दृश्य सिमुलेशन और इंटरैक्टिव परिभाषाएं",
          "हिंदी और अंग्रेजी में एक-क्लिक भाषा परिवर्तन",
        ],
      },
      objectType: "book",
      accentColor: "#059669",
    },
    {
      stepNumber: "02",
      badge: { en: "Socratic AI", hi: "सुकराती मार्गदर्शन" },
      title: {
        en: "Guided Problem Resolution",
        hi: "मार्गदर्शित समस्या समाधान",
      },
      subtitle: {
        en: "First-principles hints instead of easy answers",
        hi: "सीधे उत्तर के बजाय सोच को विकसित करने वाले संकेत",
      },
      description: {
        en: "When a student is stuck on a numerical or conceptual question, the tutor asks guiding questions rather than handing out copy-paste solutions.",
        hi: "जब कोई छात्र किसी प्रश्न पर अटकता है, तो एआई शिक्षक सीधे उत्तर देने के बजाय दिशा-निर्देशित प्रश्न पूछकर समाधान तक पहुँचाता है।",
      },
      highlights: {
        en: [
          "Cultivates deep problem-solving intuition",
          "Multi-step hint progression from subtle to direct",
          "Encourages conceptual retention over rote memorization",
        ],
        hi: [
          "समस्या निवारण की गहरी समझ विकसित करता है",
          "चरणबद्ध संकेतों की प्रगति",
          "रटने के बजाय अवधारणात्मक समझ को बढ़ावा",
        ],
      },
      objectType: "network",
      accentColor: "#10B981",
    },
    {
      stepNumber: "03",
      badge: { en: "Predictive Mastery", hi: "सटीक मूल्यांकन" },
      title: {
        en: "Continuous Knowledge Diagnostics",
        hi: "निरंतर ज्ञान निदान और तत्परता",
      },
      subtitle: {
        en: "Real-time board exam readiness heatmap",
        hi: "वास्तविक समय में बोर्ड परीक्षा तत्परता का विश्लेषण",
      },
      description: {
        en: "Real-time mastery tracking highlights weak concepts, predicts board examination confidence, and automatically schedules spaced repetition reviews.",
        hi: "वास्तविक समय का विश्लेषण कमजोर अवधारणाओं को चिन्हित करता है और परीक्षा से पहले स्वतः पुनरावृत्ति सत्र निर्धारित करता है।",
      },
      highlights: {
        en: [
          "Granular concept mastery heatmaps for parents & teachers",
          "Spaced-repetition scheduling for permanent recall",
          "Board exam confidence benchmarking",
        ],
        hi: [
          "अभिभावकों और शिक्षकों के लिए विस्तृत हीटमैप",
          "स्थायी स्मृति के लिए अंतराल-पुनरावृत्ति प्रणाली",
          "बोर्ड परीक्षा तत्परता का सटीक मानक",
        ],
      },
      objectType: "answersheet",
      accentColor: "#E05A38",
    },
  ],
};

export const dextoraCrmExplainer: ExplainerData = {
  id: "dextora-crm-explainer",
  badge: {
    en: "AI Sales Operating System",
    hi: "एआई सेल्स ऑपरेटिंग सिस्टम",
  },
  title: {
    en: "Turning Conversations Into Customer Acquisitions",
    hi: "वार्तालाप को ग्राहक अधिग्रहण में परिवर्तित करें",
  },
  subtitle: {
    en: "How Dextora CRM automates Official WhatsApp broadcasts, lead scoring, and sales pipelines.",
    hi: "डेक्सटोरा सीआरएम कैसे आधिकारिक व्हाट्सएप ब्रॉडकास्ट, लीड स्कोरिंग और सेल्स पाइपलाइन को स्वचालित करता है।",
  },
  steps: [
    {
      stepNumber: "01",
      badge: { en: "Visual Kanban Pipeline", hi: "विज़ुअल कानबन पाइपलाइन" },
      title: {
        en: "Drag-and-Drop Deal Pipeline & Stage Tracking",
        hi: "ड्रैग-एंड-ड्रॉप डील पाइपलाइन और चरण ट्रैकिंग",
      },
      subtitle: {
        en: "Custom funnels with automated stage velocity and PDF invoices",
        hi: "स्वचालित चरण गति और पीडीएफ चालान के साथ कस्टम फनल",
      },
      description: {
        en: "Build multi-stage sales funnels tailored to your exact business model. Move deals with drag-and-drop ease, trigger automated proposal PDFs, and forecast closing revenue with weighted deal probabilities.",
        hi: "अपने विशिष्ट व्यवसाय मॉडल के अनुरूप बहु-चरणीय बिक्री फ़नल बनाएं। ड्रैग-एंड-ड्रॉप की आसानी से सौदों को आगे बढ़ाएं और रीयल-टाइम में राजस्व का पूर्वानुमान लगाएं।",
      },
      highlights: {
        en: [
          "Drag-and-drop Kanban interface with customizable deal stages",
          "Automated PDF proposal and invoice generation on stage movement",
          "Real-time weighted ARR revenue forecasting and velocity analytics",
        ],
        hi: [
          "कस्टमाइज़ करने योग्य डील चरणों के साथ ड्रैग-एंड-ड्रॉप कानबन इंटरफ़ेस",
          "डील चरण बदलने पर स्वचालित पीडीएफ प्रस्ताव व चालान निर्माण",
          "रीयल-टाइम भारित राजस्व पूर्वानुमान और बिक्री गति विश्लेषण",
        ],
      },
      objectType: "crm",
      accentColor: "#00bb7f",
    },
    {
      stepNumber: "02",
      badge: { en: "Official WhatsApp Cloud API", hi: "आधिकारिक व्हाट्सएप क्लाउड एपीआई" },
      title: {
        en: "Bulk Broadcasts & 24/7 AI Chatbot Workflows",
        hi: "बल्क ब्रॉडकास्ट और 24/7 एआई चैटबॉट वर्कफ़्लो",
      },
      subtitle: {
        en: "Green-tick verified messaging with 98% open rates and zero ban risk",
        hi: "98% ओपन रेट और शून्य बैन जोखिम के साथ ग्रीन-टिक संदेश",
      },
      description: {
        en: "Deploy the Official Meta WhatsApp Cloud API to broadcast product launches and promotional catalogs to 100k+ subscribers in one click. 24/7 AI chatbots qualify leads, answer FAQs, and book consultations while your team sleeps.",
        hi: "आधिकारिक मेटा व्हाट्सएप क्लाउड एपीआई के माध्यम से एक क्लिक में 1 लाख से अधिक ग्राहकों को प्रचार अभियान भेजें। 24/7 एआई चैटबॉट लीड्स को स्वचालित रूप से योग्य बनाता है।",
      },
      highlights: {
        en: [
          "Official Meta green-tick badge assistance for maximum brand credibility",
          "98.8% average message open rate with zero phone number ban risk",
          "Multi-agent shared team inbox with round-robin lead assignment",
        ],
        hi: [
          "ब्रांड विश्वसनीयता के लिए आधिकारिक मेटा ग्रीन-टिक बैज सहायता",
          "शून्य नंबर बैन जोखिम के साथ 98.8% औसत संदेश ओपन दर",
          "राउंड-रॉबिन लीड असाइनमेंट के साथ मल्टी-एजेंट साझा टीम इनबॉक्स",
        ],
      },
      objectType: "network",
      accentColor: "#3080ff",
    },
    {
      stepNumber: "03",
      badge: { en: "AI Predictive Scoring", hi: "एआई प्रेडिक्टिव स्कोरिंग" },
      title: {
        en: "Meta Ads Auto-Sync & Sub-5s Lead Capture",
        hi: "मेटा विज्ञापन ऑटो-सिंक और 5s से कम में लीड कैप्चर",
      },
      subtitle: {
        en: "Instant Facebook, Instagram, and LinkedIn ad sync with AI intent grading",
        hi: "फेसबुक, इंस्टाग्राम और लिंक्डइन विज्ञापनों का तत्काल सिंक व एआई ग्रेडिंग",
      },
      description: {
        en: "When prospects click Facebook or Instagram Click-to-WhatsApp ads, Dextora instantly catches the webhook payload, grades buyer intent from 1 to 100, and triggers an automated personalized greeting within 5 seconds.",
        hi: "जब ग्राहक फेसबुक या इंस्टाग्राम विज्ञापनों पर क्लिक करते हैं, तो डेक्सटोरा 5 सेकंड के भीतर लीड विवरण कैप्चर करता है, इरादा स्कोर तय करता है और तुरंत अभिवादन भेजता है।",
      },
      highlights: {
        en: [
          "Instant webhook sync for Facebook Lead Ads and Instagram DMs",
          "Predictive AI intent score (1-100) based on page activity & budget",
          "Bank-grade SOC2 Type II encryption and GDPR compliance",
        ],
        hi: [
          "फेसबुक लीड विज्ञापनों और इंस्टाग्राम संदेशों के लिए तत्काल वेबहुक सिंक",
          "वेबसाइट गतिविधि व बजट के आधार पर प्रेडिक्टिव एआई स्कोर (1-100)",
          "बैंक-स्तरीय SOC2 टाइप II एन्क्रिप्शन और सख्त डेटा गोपनीयता",
        ],
      },
      objectType: "crm",
      accentColor: "#00bb7f",
    },
  ],
};
