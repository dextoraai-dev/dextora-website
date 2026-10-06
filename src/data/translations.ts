export type Locale = "en" | "hi";

export interface TranslationDictionary {
  brand: {
    tagline: string;
    hubBadge: string;
  };
  nav: {
    products: string;
    about: string;
    vision: string;
    blog: string;
    careers: string;
    contact: string;
    exploreProducts: string;
    partOfDextora: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    statsLearners: string;
    statsRetention: string;
  };
  products: {
    sectionBadge: string;
    title: string;
    subtitle: string;
    launchProduct: string;
    exploreDetails: string;
    live: string;
    comingSoon: string;
    audienceLabel: string;
  };
  whyDextora: {
    badge: string;
    title: string;
    subtitle: string;
  };
  howItWorks: {
    badge: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  cta: {
    badge: string;
    title: string;
    subtitle: string;
    emailPlaceholder: string;
    subscribeButton: string;
    exploreAll: string;
  };
  footer: {
    description: string;
    productsTitle: string;
    companyTitle: string;
    legalTitle: string;
    rightsReserved: string;
    builtWithPride: string;
  };
}

export const translations: Record<Locale, TranslationDictionary> = {
  en: {
    brand: {
      tagline: "AI-Powered Learning for Every Learner in India",
      hubBadge: "Dextora Ecosystem Hub",
    },
    nav: {
      products: "Products",
      about: "About",
      vision: "Vision",
      blog: "Blog",
      careers: "Careers",
      contact: "Contact",
      exploreProducts: "Explore Products",
      partOfDextora: "Part of the Dextora AI Family",
    },
    hero: {
      badge: "The Next Generation of Indian EdTech",
      titleLine1: "AI-powered learning for",
      titleHighlight: "every learner",
      titleLine2: "in India.",
      subtitle:
        "Dextora unifies specialized AI platforms for academic excellence and Civil Services mastery. Built with rigorous pedagogy, Socratic guidance, and deep bilingual intelligence.",
      ctaPrimary: "Explore Products",
      ctaSecondary: "Talk to Us",
      statsLearners: "85k+ Active Learners",
      statsRetention: "94% Conceptual Retention",
    },
    products: {
      sectionBadge: "The Product Family",
      title: "Engineered for Specific Learning Milestones",
      subtitle:
        "Every Dextora product is designed around a distinct educational journey—from school board exams to UPSC Civil Services.",
      launchProduct: "Launch Platform",
      exploreDetails: "Explore Specs",
      live: "Live Platform",
      comingSoon: "Coming Soon",
      audienceLabel: "Target Audience",
    },
    whyDextora: {
      badge: "The Dextora Standard",
      title: "Why Learners & Institutions Choose Dextora",
      subtitle:
        "We reject one-size-fits-all generic chatbots in favour of fine-tuned, syllabus-grounded cognitive scaffolds.",
    },
    howItWorks: {
      badge: "Learning Methodology",
      title: "The 3-Step Cognitive Mastery Loop",
      subtitle:
        "How our AI engines transform passive content reading into permanent conceptual command.",
      step1Title: "1. Diagnostic Learning",
      step1Desc: "Explore bite-sized chapters with adaptive pacing and Socratic hints tailored to your cognitive speed.",
      step2Title: "2. Precision Practice",
      step2Desc: "Auto-generated syllabus-mapped MCQs and problem sets calibrated to your exact knowledge gaps.",
      step3Title: "3. Evaluative Feedback",
      step3Desc: "Instant rubric-based evaluation for handwritten Mains sheets and complex problem proofs.",
    },
    cta: {
      badge: "Join the Movement",
      title: "Ready to Experience Pedagogical AI?",
      subtitle:
        "Explore our live products or subscribe to our research briefings on the future of Indian education.",
      emailPlaceholder: "Enter your email address...",
      subscribeButton: "Subscribe",
      exploreAll: "Explore All Products",
    },
    footer: {
      description:
        "Dextora is an AI-powered EdTech company building specialized learning engines for academic excellence and civil services preparation across India.",
      productsTitle: "Products",
      companyTitle: "Company",
      legalTitle: "Legal & Trust",
      rightsReserved: "All rights reserved.",
      builtWithPride: "Engineered with pride in Bharat for global learners.",
    },
  },
  hi: {
    brand: {
      tagline: "भारत के हर विद्यार्थी के लिए AI-आधारित शिक्षा",
      hubBadge: "डेक्सटोरा इकोसिस्टम हब",
    },
    nav: {
      products: "उत्पाद",
      about: "हमारे बारे में",
      vision: "दृष्टिकोण",
      blog: "ब्लॉग",
      careers: "करियर",
      contact: "संपर्क करें",
      exploreProducts: "उत्पाद देखें",
      partOfDextora: "डेक्सटोरा AI परिवार का हिस्सा",
    },
    hero: {
      badge: "भारतीय एडटेक की अगली पीढ़ी",
      titleLine1: "भारत के हर विद्यार्थी के लिए",
      titleHighlight: "AI-संचालित",
      titleLine2: "सटीक और सशक्त शिक्षा।",
      subtitle:
        "डेक्सटोरा स्कूली शिक्षा और सिविल सेवा परीक्षा की तैयारी के लिए समर्पित AI प्लेटफॉर्म उपलब्ध कराता है। सुकरात शिक्षण पद्धति और प्रामाणिक द्विभाषी बुद्धिमत्ता के साथ निर्मित।",
      ctaPrimary: "उत्पाद देखें",
      ctaSecondary: "हमसे बात करें",
      statsLearners: "85,000+ सक्रिय शिक्षार्थी",
      statsRetention: "94% अवधारणा प्रतिधारण दर",
    },
    products: {
      sectionBadge: "हमारे उत्पाद",
      title: "विशिष्ट अध्ययन लक्ष्यों के लिए समर्पित समाधान",
      subtitle:
        "डेक्सटोरा का प्रत्येक उत्पाद एक निश्चित शैक्षणिक यात्रा (बोर्ड परीक्षाओं से लेकर UPSC तक) के लिए निर्मित है।",
      launchProduct: "प्लेटफ़ॉर्म खोलें",
      exploreDetails: "विस्तार से देखें",
      live: "लाइव प्लेटफ़ॉर्म",
      comingSoon: "शीघ्र उपलब्ध",
      audienceLabel: "लक्षित शिक्षार्थी",
    },
    whyDextora: {
      badge: "डेक्सटोरा मानक",
      title: "विद्यार्थी और संस्थान डेक्सटोरा क्यों चुनते हैं?",
      subtitle:
        "हम सामान्य चैटबॉट्स के स्थान पर पाठ्यक्रम-आधारित, सुकरात पद्धति वाले AI मॉडल प्रदान करते हैं।",
    },
    howItWorks: {
      badge: "अध्ययन पद्धति",
      title: "3-चरणीय अवधारणा महारत चक्र",
      subtitle: "हमारा AI इंजन सामान्य पठन को स्थायी अवधारणात्मक ज्ञान में कैसे परिवर्तित करता है।",
      step1Title: "१. निदानात्मक अध्ययन",
      step1Desc: "अपनी गति के अनुसार छोटे अध्यायों और सुकरात संकेतों के साथ अध्ययन करें।",
      step2Title: "२. सटीक अभ्यास",
      step2Desc: "आपकी कमजोरियों को लक्षित करने वाले स्वचालित बहुविकल्पीय प्रश्न और अभ्यास सेट।",
      step3Title: "३. मूल्यांकन एवं समीक्षा",
      step3Desc: "हस्तलिखित उत्तर पुस्तिकाओं और निबंधों का तुरंत रूब्रिक-आधारित सटीक मूल्यांकन।",
    },
    cta: {
      badge: "शिक्षा क्रांति से जुड़ें",
      title: "क्या आप शैक्षणिक AI का अनुभव करने के लिए तैयार हैं?",
      subtitle:
        "हमारे लाइव उत्पादों का उपयोग करें या भारतीय शिक्षा के भविष्य पर हमारे शोध पत्र प्राप्त करने के लिए सब्सक्राइब करें।",
      emailPlaceholder: "अपना ईमेल दर्ज करें...",
      subscribeButton: "सब्सक्राइब करें",
      exploreAll: "सभी उत्पाद देखें",
    },
    footer: {
      description:
        "डेक्सटोरा एक AI-संचालित एडटेक कंपनी है जो पूरे भारत में शैक्षणिक उत्कृष्टता और सिविल सेवा की तैयारी के लिए समर्पित शिक्षण इंजन बनाती है।",
      productsTitle: "उत्पाद",
      companyTitle: "कंपनी",
      legalTitle: "कानूनी एवं विश्वास",
      rightsReserved: "सर्वाधिकार सुरक्षित।",
      builtWithPride: "भारत में निर्मित, पूरे विश्व के विद्यार्थियों के लिए।",
    },
  },
};
