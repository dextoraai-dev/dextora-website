"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FadeInUp, ScaleIn } from "@/components/shared/ScrollAnimation";
import {
  Sparkles,
  Bot,
  User,
  Send,
  BookOpen,
  Compass,
  CheckCircle2,
  Atom,
  Scale,
  Brain,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DemoSubject {
  id: string;
  name: { en: string; hi: string };
  icon: React.ComponentType<{ className?: string }>;
  badge: { en: string; hi: string };
  studentQuery: { en: string; hi: string };
  studentContext: { en: string; hi: string };
  tutorReply: {
    coreConcept: { en: string; hi: string };
    firstPrinciples: { en: string; hi: string };
    diagramVisual: {
      type: "trig" | "lens" | "biology" | "polity";
      caption: { en: string; hi: string };
    };
    socraticQuestion: { en: string; hi: string };
  };
}

const DEMO_SUBJECTS: DemoSubject[] = [
  {
    id: "math",
    name: { en: "Mathematics", hi: "गणित" },
    icon: Compass,
    badge: { en: "NCERT Class 10", hi: "एनसीईआरटी कक्षा १०" },
    studentQuery: {
      en: "Why is sin²θ + cos²θ = 1? Everyone tells me to memorize it, but why is it always exactly 1?",
      hi: "sin²θ + cos²θ = 1 क्यों होता है? सब इसे रटने को कहते हैं, पर यह हमेशा १ ही क्यों आता है?",
    },
    studentContext: {
      en: "Aarav Sharma · Class 10 CBSE, Varanasi",
      hi: "आरव शर्मा · कक्षा १० सीबीएसई, वाराणसी",
    },
    tutorReply: {
      coreConcept: {
        en: "It is simply Pythagoras' Theorem rephrased as fractions of the Hypotenuse.",
        hi: "यह केवल समकोण त्रिभुज के पाइथागोरस प्रमेय का अनुपात के रूप में पुनर्कथन है।",
      },
      firstPrinciples: {
        en: "In any right triangle with perpendicular (P), base (B), and hypotenuse (H):\nBy Pythagoras theorem: P² + B² = H².\nIf you divide the entire equation by H²:\n(P/H)² + (B/H)² = H²/H²  ➜  (sin θ)² + (cos θ)² = 1.\nNo matter how big or small the triangle is, the proportion is immutable.",
        hi: "लम्ब (P), आधार (B) और कर्ण (H) वाले किसी भी समकोण त्रिभुज में:\nपाइथागोरस प्रमेय से: P² + B² = H²\nयदि दोनों पक्षों को H² से भाग दें:\n(P/H)² + (B/H)² = H²/H²  ➜  sin²θ + cos²θ = 1\nत्रिभुज कितना भी बड़ा या छोटा हो, यह अनुपात कभी नहीं बदलता।",
      },
      diagramVisual: {
        type: "trig",
        caption: {
          en: "Geometric Proof: (Opposite / Hypotenuse)² + (Adjacent / Hypotenuse)² = 1",
          hi: "ज्यामितीय प्रमाण: (लम्ब/कर्ण)² + (आधार/कर्ण)² = १",
        },
      },
      socraticQuestion: {
        en: "Now, what happens if angle θ approaches 90°? What happens to the Base (B) and Perpendicular (P)?",
        hi: "अब सोचिए: यदि कोण θ बढ़कर ९०° हो जाए, तो आधार (B) और लम्ब (P) का क्या होगा?",
      },
    },
  },
  {
    id: "science",
    name: { en: "Physics / Optics", hi: "भौतिकी" },
    icon: Atom,
    badge: { en: "NCERT Class 12", hi: "एनसीईआरटी कक्षा १२" },
    studentQuery: {
      en: "Why does a convex lens form an inverted real image when an object is placed beyond 2F?",
      hi: "जब किसी वस्तु को 2F से परे रखा जाता है, तो उत्तल लेंस उल्टा वास्तविक प्रतिबिम्ब क्यों बनाता है?",
    },
    studentContext: {
      en: "Priya Nair · Class 12 CBSE, Kochi",
      hi: "प्रिया नायर · कक्षा १२ सीबीएसई, कोच्चि",
    },
    tutorReply: {
      coreConcept: {
        en: "Light rays converge after refraction: top rays cross downward, bottom rays cross upward.",
        hi: "अपवर्तन के बाद प्रकाश किरणें अभिसरित होती हैं: ऊपर की किरणें नीचे और नीचे की ऊपर चली जाती हैं।",
      },
      firstPrinciples: {
        en: "Think of two rays from the object's top tip:\n1. Ray parallel to the axis bends through the principal focus (F).\n2. Ray passing through the optical center continues straight.\nBecause the rays physically intersect below the principal axis, the resulting image is inverted and real.",
        hi: "वस्तु के शीर्ष से निकलने वाली दो किरणों पर विचार करें:\n१. मुख्य अक्ष के समानांतर किरण फोकस (F) से होकर गुजरती है।\n२. प्रकाशिक केंद्र से जाने वाली किरण बिना मुड़े सीधी निकलती है।\nचूंकि किरणें मुख्य अक्ष के नीचे वास्तव में मिलती हैं, इसलिए प्रतिबिम्ब वास्तविक और उल्टा बनता है।",
      },
      diagramVisual: {
        type: "lens",
        caption: {
          en: "Ray Diagram: Real, Inverted & Diminished Image between F and 2F",
          hi: "किरण आरेख: F और 2F के बीच वास्तविक, उल्टा और छोटा प्रतिबिम्ब",
        },
      },
      socraticQuestion: {
        en: "If you slide the object closer until it is right at 2F, how will the image size compare to the object?",
        hi: "यदि आप वस्तु को आगे खिसकाकर ठीक 2F पर रख दें, तो प्रतिबिम्ब का आकार कैसा होगा?",
      },
    },
  },
  {
    id: "biology",
    name: { en: "Biology", hi: "जीव विज्ञान" },
    icon: Brain,
    badge: { en: "NCERT Class 11", hi: "एनसीईआरटी कक्षा ११" },
    studentQuery: {
      en: "In photosynthesis, why is water split (photolysis) if plants just need CO₂ to make sugar?",
      hi: "प्रकाश संश्लेषण में जल का प्रकाशिक अपघटन (Photolysis) क्यों होता है, जबकि पौधे को भोजन के लिए केवल CO₂ चाहिए?",
    },
    studentContext: {
      en: "Devendra Verma · Class 11, Lucknow",
      hi: "देवेन्द्र वर्मा · कक्षा ११, लखनऊ",
    },
    tutorReply: {
      coreConcept: {
        en: "Water is the essential donor of electrons and protons (H⁺) needed to convert CO₂ into glucose.",
        hi: "जल इलेक्ट्रॉनों और प्रोटॉनों (H⁺) का आवश्यक दाता है, जो CO₂ को ग्लूकोज में अपचयित करने के लिए चाहिए।",
      },
      firstPrinciples: {
        en: "To turn CO₂ (low energy) into C₆H₁₂O₆ (high energy), electrons are required.\nWhen sunlight excites Chlorophyll P680 in Photosystem II, it ejects electrons.\nTo refill that deficit, an enzyme splits H₂O: 2H₂O ➜ 4H⁺ + 4e⁻ + O₂.\nThe released oxygen is a byproduct; the electrons power the ATP/NADPH energy factory.",
        hi: "CO₂ को C₆H₁₂O₆ (ग्लूकोज) में बदलने के लिए इलेक्ट्रॉनों और हाइड्रोजन की आवश्यकता होती है।\nक्लोरोफिल जब प्रकाश अवशोषित करता है, तो इलेक्ट्रॉन मुक्त होते हैं। इस कमी को पूरा करने के लिए जल टूटता है:\n2H₂O ➜ 4H⁺ + 4e⁻ + O₂\nऑक्सीजन केवल एक उपोत्पाद है; इलेक्ट्रॉन ही ऊर्जा निर्माण करते हैं।",
      },
      diagramVisual: {
        type: "biology",
        caption: {
          en: "Z-Scheme: Water photolysis replenishing Photosystem II electrons",
          hi: "Z-स्कीम: जल का अपघटन फोटोसिस्टम II को इलेक्ट्रॉन प्रदान करता है",
        },
      },
      socraticQuestion: {
        en: "If a plant is grown in an atmosphere with normal air but water containing radioactive Oxygen-18, where will that Oxygen-18 appear?",
        hi: "यदि किसी पौधे को भारी ऑक्सीजन (O-18) युक्त जल दिया जाए, तो वह O-18 ग्लूकोज में मिलेगा या हवा में मुक्त ऑक्सीजन में?",
      },
    },
  },
  {
    id: "upsc",
    name: { en: "UPSC GS-2 Polity", hi: "यूपीएससी राजव्यवस्था" },
    icon: Scale,
    badge: { en: "Civil Services Mains", hi: "सिविल सेवा मुख्य परीक्षा" },
    studentQuery: {
      en: "Can Parliament amend any part of the Constitution under Article 368, including Fundamental Rights?",
      hi: "क्या संसद अनुच्छेद ३६८ के तहत मूल अधिकारों सहित संविधान के किसी भी हिस्से में संशोधन कर सकती है?",
    },
    studentContext: {
      en: "Ananya Saxena · UPSC Aspirant, Delhi",
      hi: "अनन्या सक्सेना · यूपीएससी अभ्यर्थी, दिल्ली",
    },
    tutorReply: {
      coreConcept: {
        en: "Yes, Parliament can amend any provision, but it cannot damage or destroy the 'Basic Structure' of the Constitution.",
        hi: "हाँ, संसद संशोधन कर सकती है, परंतु वह संविधान के 'मूल ढांचे' (Basic Structure) को नष्ट नहीं कर सकती।",
      },
      firstPrinciples: {
        en: "The historic Kesavananda Bharati case (1973) established the principle of harmonious balance:\n• Article 368 gives Parliament amending power, not the power to rewrite or destroy the identity of the Constitution.\n• Essential pillars like Judicial Review, Secularism, Federalism, and Free & Fair Elections form the bedrock that no constitutional amendment can violate.",
        hi: "केशवानंद भारती मामला (१९७३) ने एक ऐतिहासिक संतुलन स्थापित किया:\n• अनुच्छेद ३६८ संसद को संशोधन की शक्ति देता है, संविधान को नष्ट करने की नहीं।\n• न्यायिक समीक्षा, धर्मनिरपेक्षता, संघवाद और स्वतंत्र निष्पक्ष चुनाव संविधान के आधार स्तम्भ हैं जिन्हें हटाया नहीं जा सकता।",
      },
      diagramVisual: {
        type: "polity",
        caption: {
          en: "Constitutional Balance: Amending Power (Art 368) vs. Inviolable Basic Structure",
          hi: "संवैधानिक संतुलन: संशोधन शक्ति (अनु. ३६८) बनाम अनुलंघनीय मूल ढांचा",
        },
      },
      socraticQuestion: {
        en: "What landmark amendment was struck down by the Supreme Court in 2015 for violating the Basic Structure (Independence of Judiciary)?",
        hi: "वर्ष २०१५ में सर्वोच्च न्यायालय ने न्यायपालिका की स्वतंत्रता के उल्लंघन के आधार पर किस संशोधन को असंवैधानिक घोषित किया था?",
      },
    },
  },
];

export function LiveClassroomDemo() {
  const { locale } = useI18n();
  const [activeSubjectId, setActiveSubjectId] = useState("math");
  const [customInput, setCustomInput] = useState("");
  const [customResponse, setCustomResponse] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);
  const isHi = locale === "hi";

  const activeSubject =
    DEMO_SUBJECTS.find((s) => s.id === activeSubjectId) || DEMO_SUBJECTS[0];

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim() || isAsking) return;

    setIsAsking(true);
    setCustomResponse(null);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: customInput,
          language: isHi ? "hi" : "en",
        }),
      });
      const data = await res.json();
      setCustomResponse(data.reply || "Let's unpack this concept step by step.");
    } catch {
      setCustomResponse(
        "Let's explore this from first principles: What is the primary definition you are working from?"
      );
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <section
      id="classroom-demo"
      className="py-20 sm:py-28 bg-[var(--bg-base)] transition-colors relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Section Heading */}
        <FadeInUp>
          <SectionHeading
            badge={isHi ? "इंटरैक्टिव कक्षा प्रदर्शन" : "Live Socratic Classroom"}
            badgeVariant="terracotta"
            title={
              isHi
                ? "देखें डेक्सटोरा का AI ट्यूटर कैसे सिखाता है"
                : "Experience How Dextora Educates in Real-Time"
            }
            subtitle={
              isHi
                ? "रटने की जगह मौलिक सिद्धांतों से सीखना — देखें कैसे हमारा AI छात्र के संशयों को चरणबद्ध ढंग से स्पष्ट करता है।"
                : "No rote memorization. Watch our Learning AI guide learners through first principles, intuitive analogies, and Socratic questioning."
            }
          />
        </FadeInUp>

        {/* Subject Navigation Tabs */}
        <FadeInUp delay={0.1} className="mt-10 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {DEMO_SUBJECTS.map((sub) => {
            const Icon = sub.icon;
            const isSelected = sub.id === activeSubjectId;
            return (
              <motion.button
                key={sub.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setActiveSubjectId(sub.id);
                  setCustomResponse(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${isSelected
                  ? "bg-[#0E2922] text-[#F8F5EE] border-[#0E2922] shadow-md ring-2 ring-[#E05A38]/30 font-bold"
                  : "bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
                  }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-[#E05A38]" : ""}`} />
                <span>{sub.name[isHi ? "hi" : "en"]}</span>
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${isSelected
                    ? "bg-[#18453A] text-[#F8F5EE]"
                    : "bg-[var(--bg-subtle)] text-[var(--text-muted)]"
                    }`}
                >
                  {sub.badge[isHi ? "hi" : "en"]}
                </span>
              </motion.button>
            );
          })}
        </FadeInUp>

        {/* Interactive Classroom Stage */}
        <ScaleIn delay={0.2} className="mt-12 max-w-5xl mx-auto">
          <div className="rounded-3xl bg-[var(--bg-surface)] dark:bg-[#141720] border border-[var(--border-subtle)] shadow-2xl overflow-hidden">
            {/* Top Blackboard / Header Bar */}
            <div className="px-6 py-4 bg-[#0E2922] text-[#F8F5EE] border-b border-[#1A3F35] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#18453A] text-[#E05A38] flex items-center justify-center font-bold">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold flex items-center gap-2">
                    <span>Dextora Socratic Classroom</span>
                    <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded-full">
                      Zero Hallucination
                    </span>
                  </div>
                  <div className="text-[11px] text-[#A3B8B2]">
                    {activeSubject.name[isHi ? "hi" : "en"]} · {activeSubject.badge[isHi ? "hi" : "en"]}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[#A3B8B2] font-mono">Pedagogy Mode: Active</span>
              </div>
            </div>

            {/* Stage Body */}
            <div className="p-6 sm:p-10 space-y-8">
              {/* 1. Student Doubt Bubble */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="text-xs font-semibold text-[var(--text-muted)] flex items-center gap-2">
                    <span>{activeSubject.studentContext[isHi ? "hi" : "en"]}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold">
                      Student Doubt
                    </span>
                  </div>
                  <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] text-sm sm:text-base leading-relaxed font-medium">
                    &quot;{activeSubject.studentQuery[isHi ? "hi" : "en"]}&quot;
                  </div>
                </div>
              </div>

              {/* 2. Socratic AI Tutor Response */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#E05A38] text-white flex items-center justify-center shrink-0 mt-1 shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="text-xs font-semibold text-[var(--text-muted)] flex items-center gap-2">
                    <span className="font-bold text-[var(--brand-terracotta)]">Dextora AI Socratic Tutor</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold">
                      1-on-1 Personalized
                    </span>
                  </div>

                  {/* Core Concept Banner */}
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
                    <span className="font-bold uppercase tracking-wider text-[11px] block mb-1 text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isHi ? "मुख्य अवधारणा" : "Core Concept"}</span>
                    </span>
                    {activeSubject.tutorReply.coreConcept[isHi ? "hi" : "en"]}
                  </div>

                  {/* First Principles Explanation */}
                  <div className="p-5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] space-y-3">
                    <div className="text-[11px] uppercase tracking-wider font-bold text-[var(--brand-terracotta)] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isHi ? "मौलिक सिद्धांतों से स्पष्टीकरण" : "First-Principles Breakdown"}</span>
                    </div>
                    <div className="text-xs sm:text-sm text-[var(--text-primary)] whitespace-pre-line leading-relaxed font-mono">
                      {activeSubject.tutorReply.firstPrinciples[isHi ? "hi" : "en"]}
                    </div>
                  </div>

                  {/* Diagram / Visual Card */}
                  <div className="p-4 rounded-2xl bg-[#0E2922] text-[#F8F5EE] border border-[#1A3F35] flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#E05A38]">
                        {isHi ? "दृश्य व्याख्या आरेख" : "Visual Proof / Diagram"}
                      </span>
                      <p className="text-xs sm:text-sm text-[#F8F5EE] font-medium">
                        {activeSubject.tutorReply.diagramVisual.caption[isHi ? "hi" : "en"]}
                      </p>
                    </div>
                    <span className="px-3 py-1.5 rounded-xl bg-[#18453A] text-[#F8F5EE] text-xs font-mono font-bold shrink-0">
                      Step-by-Step
                    </span>
                  </div>

                  {/* Socratic Check Follow-up Question */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--brand-terracotta)]/30 space-y-2 shadow-xs">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[var(--brand-terracotta)] flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5" />
                      <span>{isHi ? "सुकराती चिंतन प्रश्न" : "Socratic Check: Test Your Intuition"}</span>
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] leading-relaxed">
                      {activeSubject.tutorReply.socraticQuestion[isHi ? "hi" : "en"]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Custom Live Response If Asked */}
              {customResponse && (
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2 animate-in fade-in duration-300">
                  <div className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Live Socratic Analysis for your Question</span>
                  </div>
                  <div className="text-xs sm:text-sm text-[var(--text-primary)] whitespace-pre-line leading-relaxed">
                    {customResponse}
                  </div>
                </div>
              )}

              {/* Live Interactive Prompt Bar */}
              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <form
                  onSubmit={handleCustomSubmit}
                  className="flex flex-col sm:flex-row items-center gap-3"
                >
                  <div className="relative flex-1 w-full">
                    <input
                      type="text"
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder={
                        isHi
                          ? "डेक्सटोरा ट्यूटर से कोई भी प्रश्न पूछें (उदा. 'लेंस का सूत्र समझाएं')..."
                          : "Ask the Socratic Tutor any question from NCERT or UPSC..."
                      }
                      className="w-full px-5 py-3 text-xs sm:text-sm rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] focus:border-[#E05A38] text-[var(--text-primary)] outline-none transition"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    disabled={!customInput.trim() || isAsking}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#E05A38] hover:bg-[#d04a29] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition shrink-0 shadow-sm"
                  >
                    <span>{isAsking ? (isHi ? "विश्लेषण जारी..." : "Analyzing...") : (isHi ? "पूछें" : "Test Doubt")}</span>
                    <Send className="w-4 h-4" />
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
}
