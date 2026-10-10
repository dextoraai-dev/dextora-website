export type ExplainerObjectType =
  | "book"
  | "news"
  | "answersheet"
  | "campus"
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
    en: "Pedagogical Architecture",
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

export const dextoraCampusExplainer: ExplainerData = {
  id: "dextora-campus-explainer",
  badge: {
    en: "Institutional OS",
    hi: "संस्थागत ऑपरेटिंग सिस्टम",
  },
  title: {
    en: "The Operating System for AI Classrooms",
    hi: "एआई-संवर्धित कक्षाओं के लिए ऑपरेटिंग सिस्टम",
  },
  subtitle: {
    en: "How Dextora Campus automates examination authoring and student telemetry.",
    hi: "डेक्सटोरा कैंपस कैसे परीक्षा निर्माण और छात्र विश्लेषण को स्वचालित करता है।",
  },
  steps: [
    {
      stepNumber: "01",
      badge: { en: "Blueprint Authoring", hi: "परीक्षा ब्लूप्रिंट निर्माण" },
      title: {
        en: "Automated Question Paper Authoring",
        hi: "स्वचालित प्रश्न पत्र निर्माण",
      },
      subtitle: {
        en: "CBSE & State board standard papers in 60s",
        hi: "60 सेकंड में सीबीएसई व राज्य बोर्ड स्तरीय प्रश्न पत्र",
      },
      description: {
        en: "Faculty configure difficulty curves, Bloom's taxonomy tags, and chapter weightage. Campus generates balanced, verified question papers with complete marking schemes.",
        hi: "शिक्षक कठिनाई स्तर, ब्लूम्स टैक्सोनॉमी और अध्याय भारांक तय करते हैं। कैंपस पूर्ण अंकन योजना के साथ संतुलित प्रश्न पत्र तैयार करता है।",
      },
      highlights: {
        en: [
          "Saves 15+ hours per teacher each exam cycle",
          "Complete marking key and answer rationales included",
          "Export to print-ready PDF and editable Word formats",
        ],
        hi: [
          "प्रति परीक्षा चक्र में शिक्षक के 15+ घंटे की बचत",
          "पूर्ण उत्तर कुंजी और विस्तृत तर्क शामिल",
          "प्रिंट-योग्य पीडीएफ और वर्ड प्रारूप में निर्यात",
        ],
      },
      objectType: "campus",
      accentColor: "#6366F1",
    },
    {
      stepNumber: "02",
      badge: { en: "Cohort Telemetry", hi: "समूह विश्लेषण" },
      title: {
        en: "Real-Time Classroom Telemetry",
        hi: "कक्षा की वास्तविक समय टेलीमेट्री",
      },
      subtitle: {
        en: "Early detection of at-risk students",
        hi: "कमजोर प्रदर्शन करने वाले छात्रों की समय पूर्व पहचान",
      },
      description: {
        en: "Classroom-level diagnostic dashboards aggregate homework and quiz data to identify common misconceptions across sections before high-stakes exams.",
        hi: "कक्षा स्तरीय डैशबोर्ड गृहकार्य और क्विज़ डेटा को एकत्रित कर परीक्षा से पूर्व सामूहिक कमियों को स्पष्ट करता है।",
      },
      highlights: {
        en: [
          "Aggregated concept mastery across all school sections",
          "Proactive alerts for students falling behind",
          "Actionable recommendations for revision classes",
        ],
        hi: [
          "विद्यालय के सभी वर्गों में समग्र अवधारणा निपुणता",
          "पिछड़ रहे छात्रों के लिए समय पर चेतावनी",
          "पुनरावृत्ति कक्षाओं के लिए व्यावहारिक सुझाव",
        ],
      },
      objectType: "network",
      accentColor: "#818CF8",
    },
    {
      stepNumber: "03",
      badge: { en: "Institutional Sandbox", hi: "सुरक्षित एआई वातावरण" },
      title: {
        en: "Secure & Compliant AI Sandbox",
        hi: "सुरक्षित और अनुपालनयुक्त एआई सैंडबॉक्स",
      },
      subtitle: {
        en: "Zero student data leakage or model training",
        hi: "छात्र डेटा की पूर्ण सुरक्षा और गोपनीयता",
      },
      description: {
        en: "Enterprise-grade data protection aligned with Indian data protection laws and NEP 2020 competency frameworks.",
        hi: "भारतीय डेटा संरक्षण कानूनों और नई राष्ट्रीय शिक्षा नीति 2020 के अनुरूप उद्यम-स्तरीय डेटा सुरक्षा।",
      },
      highlights: {
        en: [
          "Full student privacy with zero LLM retraining on user data",
          "Role-based access control for Principals, HODs, and Teachers",
          "Seamless integration with existing school ERP/LMS systems",
        ],
        hi: [
          "छात्रों की पूर्ण गोपनीयता और डेटा सुरक्षा",
          "प्रधानाचार्य, विभागाध्यक्ष व शिक्षकों के लिए भूमिका-आधारित पहुंच",
          "मौजूदा स्कूल ईआरपी/एलएमएस प्रणालियों के साथ सहज एकीकरण",
        ],
      },
      objectType: "campus",
      accentColor: "#6366F1",
    },
  ],
};
