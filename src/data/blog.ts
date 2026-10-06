export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  coverImage: string;
  category: "AI & Pedagogy" | "Civil Services" | "Engineering" | "Vision";
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-generic-llms-fail-indian-edtech",
    title: "Why Generic LLMs Fail Indian Classrooms — And How We Built Pedagogical AI",
    excerpt:
      "Direct answers cultivate cognitive dependency. Here is why domain-fine-tuned Socratic AI models are the only sustainable path for Indian education.",
    content: [
      "When standard large language models entered the mainstream, the immediate temptation was to use them as automated homework solvers. A student asks for the proof of Fermat's Little Theorem or the causes of the Revolt of 1857, and the model instantly produces a pristine response.",
      "In education, however, immediate answers without struggle lead to cognitive dependency and shallow retention. True learning happens in the 'Zone of Proximal Development'—where a learner is challenged just enough to stretch their cognitive ability.",
      "At Dextora, we engineered our core learning engines around three non-negotiable principles:",
      "1. Socratic Scaffolding: Rather than outputting the final formula or conclusion, Dextora identifies the specific misconception and poses a guiding question.",
      "2. Curricular Grounding: Every concept is tied to the exact NCERT/State Board syllabus node, preventing hallucinated or off-syllabus diversions.",
      "3. Bilingual Parity: Concepts are natively explained with culturally resonant analogies and authentic Hindi vocabulary alongside English.",
      "As we scale across India, our goal remains clear: to give every learner a personalized tutor that builds critical thinking rather than mere memorization.",
    ],
    coverImage: "/images/blog/pedagogical-ai.webp",
    category: "AI & Pedagogy",
    author: {
      name: "Dr. Ananya Sharma",
      role: "Head of AI Pedagogy, Dextora",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    },
    publishedAt: "2026-09-18",
    readTime: "5 min read",
    tags: ["Pedagogical AI", "Socratic Method", "NCERT", "EdTech Architecture"],
    featured: true,
  },
  {
    slug: "evaluating-handwritten-upsc-mains-with-vision-ai",
    title: "Evaluating Handwritten UPSC Mains Copies: Behind the Dhyeya IAS Vision Engine",
    excerpt:
      "How we solved complex Hindi & English handwriting OCR and built a rubric-based grading engine matching UPSC examiner standards.",
    content: [
      "The UPSC Civil Services Examination Mains stage is notoriously difficult to prepare for in isolation. Aspirants write thousands of words across GS Papers 1 to 4 and optional subjects. Traditionally, receiving structured feedback required either expensive coaching test series or weeks of waiting for manual corrections.",
      "When building Dhyeya IAS Current Affairs by Dextora AI, our core engineering challenge was: How do we provide instant, examiner-grade evaluation for handwritten sheets in both Devanagari and English scripts?",
      "Our multi-stage pipeline works as follows:",
      "1. Vision Pre-processing & OCR: We clean perspective distortions, segment paragraphs, and identify diagrams, flowcharts, and maps drawn by aspirants.",
      "2. Rubric Alignment: The response is evaluated against the specific GS paper rubric: Introduction context (15%), Keyword density & core arguments (45%), Multidimensional coverage (Economic, Social, Geopolitical, Environmental) (25%), and Balanced Conclusion (15%).",
      "3. Constructive Feedback: The model highlights missing government committees, constitutional articles, and relevant Supreme Court judgments.",
      "Over 250,000 answer submissions have now been evaluated, empowering aspirants from remote districts to compete on an equal footing with peers in premier metropolitan institutes.",
    ],
    coverImage: "/images/blog/upsc-vision-ai.webp",
    category: "Civil Services",
    author: {
      name: "Vikramaditya Roy",
      role: "VP of Product, Dhyeya IAS by Dextora",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    publishedAt: "2026-09-28",
    readTime: "6 min read",
    tags: ["UPSC CSE", "Vision AI", "Handwriting OCR", "Mains Evaluation"],
    featured: false,
  },
  {
    slug: "bilingual-first-edtech-for-bharat",
    title: "Why Bharat Needs Bilingual-First EdTech, Not Just Translated Interfaces",
    excerpt:
      "Machine translating English educational content creates disjointed terminology. Why native bilingual architecture is essential for India's 250M students.",
    content: [
      "Most global technology platforms treat multilingualism as an afterthought: build the system in English, then run a bulk translation pass. In education, this produces catastrophic results—complex scientific and constitutional terms become awkward and unintelligible.",
      "In the Hindi heartland and across state education boards, students frequently use 'Hinglish' in conceptual discussions while requiring formal Hindi (Shuddh Hindi) or English for exam papers.",
      "At Dextora, bilingualism is baked into our foundational embeddings:",
      "1. Authentic Terminology: Whether it is 'Fiscal Deficit' (राजकोषीय घाटा) or 'Mitosis' (समसूत्री विभाजन), our models retain precision across languages.",
      "2. Dual-mode Voice: Students can listen to audio concept explanations in colloquial, conversational Hindi and view the formal notes simultaneously.",
      "By eliminating the language penalty, Dextora ensures that brilliance across tier-2, tier-3, and rural India finds its rightful platform.",
    ],
    coverImage: "/images/blog/bilingual-bharat.webp",
    category: "Vision",
    author: {
      name: "Aditya Verma",
      role: "Co-Founder & CEO, Dextora",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    publishedAt: "2026-10-02",
    readTime: "4 min read",
    tags: ["Bharat First", "Bilingual EdTech", "NEP 2020", "Inclusion"],
    featured: false,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getLatestBlogPosts(count = 3): BlogPost[] {
  return blogPosts.slice(0, count);
}
