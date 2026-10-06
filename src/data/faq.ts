export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "products" | "pedagogy" | "security";
}

export const faqs: FAQItem[] = [
  {
    id: "what-is-dextora",
    category: "general",
    question: "What is Dextora and what products are in its family?",
    answer:
      "Dextora is an AI-powered EdTech company headquartered in India. We develop specialized learning platforms built on pedagogical AI. Currently, our active product family includes 'Dextora Learn' (chapter-wise personalized learning for academic excellence) and 'Dhyeya IAS Current Affairs' (specialized UPSC/UPPCS current affairs, MCQs, and AI Mains answer evaluation in Hindi & English). More products like 'Dextora Campus' are on our immediate roadmap.",
  },
  {
    id: "how-is-dextora-different",
    category: "pedagogy",
    question: "How does Dextora's AI differ from generic chatbots like ChatGPT?",
    answer:
      "Generic chatbots provide direct, often unverified answers without pedagogical guardrails. Dextora's AI engines are fine-tuned on verified Indian curriculum frameworks (NCERT, CBSE, UPSC CSE GS syllabi) and utilize Socratic prompting. Instead of simply generating answers, our models guide students to think critically, evaluate handwritten answers according to standard exam rubrics, and deliver targeted practice sets.",
  },
  {
    id: "bilingual-support",
    category: "pedagogy",
    question: "Is Dextora truly bilingual in Hindi and English?",
    answer:
      "Yes. Dextora is engineered Bharat-first. In Dhyeya IAS, current affairs syntheses, editorial analyses, MCQs, and Mains answer evaluation are natively available in high-standard Hindi as well as English. Dextora Learn also supports bilingual concept definitions and audio walkthroughs.",
  },
  {
    id: "dhyeya-ias-mains-eval",
    category: "products",
    question: "How does Dhyeya IAS evaluate handwritten UPSC Mains answer copies?",
    answer:
      "Aspirants take a clear photo or upload a PDF of their handwritten answer sheet. Our vision OCR extracts the text in Hindi or English, and our UPSC evaluation engine scores it against an official rubric: introduction context, core argument points, diagram inclusion, factual accuracy, and conclusion. You receive detailed paragraph-level feedback and a score within seconds.",
  },
  {
    id: "pricing-access",
    category: "general",
    question: "Are Dextora products free or subscription-based?",
    answer:
      "Our products offer generous free tiers with daily practice sets, current affairs briefings, and sample evaluations. Premium subscriptions provide unlimited AI answer sheet evaluations, custom revision plans, and deep performance analytics.",
  },
  {
    id: "data-privacy-security",
    category: "security",
    question: "How is student data and answer submission protected?",
    answer:
      "We adhere to strict data privacy and Indian IT regulations. Student data is encrypted in transit and at rest. We never sell student information or use private student submissions to train public models without explicit consent.",
  },
  {
    id: "institution-partnerships",
    category: "general",
    question: "Can schools, universities, or coaching institutes partner with Dextora?",
    answer:
      "Yes! We partner with leading schools, civil service coaching institutions, and state education boards. Through 'Dextora Campus' and custom institutional integrations, faculties can deploy our AI evaluation and test generation engines. Reach out via our Contact page for partnership demos.",
  },
];
