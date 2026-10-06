export interface JobPosition {
  id: string;
  title: string;
  department: "Engineering" | "AI & ML" | "Curriculum & UPSC" | "Product & Design" | "Growth";
  location: string;
  type: "Full-Time" | "Remote (India)" | "Hybrid (Bengaluru / Delhi)";
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export const jobPositions: JobPosition[] = [
  {
    id: "lead-ai-researcher-pedagogy",
    title: "Senior AI / NLP Research Engineer (Multilingual)",
    department: "AI & ML",
    location: "Bengaluru (Hybrid)",
    type: "Full-Time",
    experience: "3-6 years",
    description:
      "Join our core AI team to fine-tune open-weight models for Socratic pedagogical guidance, Devanagari handwriting recognition, and automated rubric scoring.",
    responsibilities: [
      "Design and fine-tune domain-specific LLMs on Indian curricula (NCERT, UPSC).",
      "Develop evaluation pipelines for hallucination mitigation and pedagogical fidelity.",
      "Optimize inference latency and token economics for high-volume student queries.",
      "Collaborate with curriculum experts to encode cognitive scaffolding into models.",
    ],
    requirements: [
      "Strong background in PyTorch, Hugging Face, vLLM / TensorRT-LLM.",
      "Experience with RLHF, DPO, or SFT for specialized domain tasks.",
      "Demonstrated interest in multilingual NLP (Hindi/Devanagari NLP is a major plus).",
      "BS/MS or PhD in Computer Science, Computational Linguistics, or related field.",
    ],
  },
  {
    id: "staff-fullstack-engineer",
    title: "Staff Full-Stack Engineer (Next.js & Distributed Systems)",
    department: "Engineering",
    location: "Bengaluru or Remote",
    type: "Full-Time",
    experience: "4-7 years",
    description:
      "Architect and scale our web client applications, real-time evaluation streams, and high-performance cross-platform APIs.",
    responsibilities: [
      "Own the architecture of Dextora web apps, micro-frontends, and shared design systems.",
      "Build low-latency streaming interfaces for real-time AI tutor interactions.",
      "Maintain 99.99% availability and <100ms P95 latency across distributed edge nodes.",
      "Mentor junior engineers and champion clean, accessible, typed code.",
    ],
    requirements: [
      "Mastery of Next.js (App Router), React 19, TypeScript, and modern CSS architecture.",
      "Deep understanding of Node.js/Go backend services, Redis caching, and Postgres.",
      "Experience with edge computing (Vercel Edge, Cloudflare Workers).",
    ],
  },
  {
    id: "upsc-content-rubric-lead",
    title: "Subject Matter Expert & Rubric Lead (UPSC CSE Mains)",
    department: "Curriculum & UPSC",
    location: "New Delhi (Karol Bagh / Mukherjee Nagar)",
    type: "Full-Time",
    experience: "2-5 years",
    description:
      "Lead our GS 1-4 syllabus mapping, daily editorial breakdown taxonomy, and AI Mains Answer evaluation benchmark creation.",
    responsibilities: [
      "Benchmark and grade model answers across GS Papers 1 to 4 and Essay.",
      "Create high-precision evaluation rubrics for the Dhyeya IAS AI engine.",
      "Review automated feedback for factual correctness, committee citations, and tone.",
      "Curate daily syllabus-relevant current affairs briefs in Hindi and English.",
    ],
    requirements: [
      "Appeared in UPSC Civil Services Mains or Interview (or equivalent State PSC).",
      "Flawless written proficiency in both Hindi and English.",
      "Deep understanding of UPSC question trends and marking conventions.",
    ],
  },
  {
    id: "senior-product-designer",
    title: "Senior Product Designer (Design Systems & Mobile-First)",
    department: "Product & Design",
    location: "Bengaluru (Hybrid)",
    type: "Full-Time",
    experience: "3-6 years",
    description:
      "Design intuitive, distraction-free study interfaces for millions of students across phones, tablets, and desktops.",
    responsibilities: [
      "Craft seamless mobile-first learning experiences that make studying delightful.",
      "Evolve and scale the Dextora design system across web and mobile surfaces.",
      "Conduct user research with students and UPSC aspirants across tier-1 and tier-3 towns.",
      "Prototype micro-interactions and animations that clarify complex data.",
    ],
    requirements: [
      "Outstanding Figma portfolio demonstrating thoughtful typography, systems, and product intuition.",
      "Strong grasp of accessibility (WCAG 2.1 AA) and responsive layout design.",
      "Experience designing for bilingual/Indic typography is a plus.",
    ],
  },
];

export const companyPerks = [
  {
    title: "Competitive Compensation & ESOPs",
    description: "Top-tier salary packages with meaningful equity in a high-growth AI company.",
    icon: "Coins",
  },
  {
    title: "National Educational Impact",
    description: "Your code and models directly improve learning outcomes for thousands of aspirants every day.",
    icon: "Sparkles",
  },
  {
    title: "World-Class AI Compute",
    description: "Access to state-of-the-art GPU clusters, frontier model APIs, and rapid prototyping budgets.",
    icon: "Cpu",
  },
  {
    title: "Comprehensive Health & Wellness",
    description: "Full health insurance for you and your dependents, plus mental health support.",
    icon: "HeartPulse",
  },
  {
    title: "Flexible Work Culture",
    description: "High autonomy, hybrid hubs in Bengaluru & Delhi, and generous remote flexibility.",
    icon: "MapPin",
  },
  {
    title: "Annual Learning Stipend",
    description: "₹1,00,000 yearly allowance for books, conferences, courses, and certifications.",
    icon: "BookOpen",
  },
];
