// Site Configuration & Brand Constants
// Single point of configuration for Dextora Hub and Subdomain headers

export const siteConfig = {
  name: "Dextora",
  legalName: "Dextora AI Technologies Private Limited", // TODO: REPLACE with exact registered entity if needed
  tagline: "AI-Powered Learning for Every Learner in India",
  description:
    "Dextora is the parent AI EdTech company building precision learning platforms for academic excellence and competitive civil services exams across India.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dextora.com",
  contactEmail: "contact@dextora.org", // TODO: REPLACE with official mailbox
  supportEmail: "support@dextora.org",
  careersEmail: "careers@dextora.org",
  pressEmail: "press@dextora.org",
  phone: "+91 (80) 4120-DEXT", // TODO: REPLACE
  addresses: [
    {
      city: "Bengaluru (HQ)",
      title: "Technology & AI Research Hub",
      address: "Indiranagar 100ft Road, Bengaluru, Karnataka 560038, India", // TODO: REPLACE
    },
    {
      city: "New Delhi",
      title: "Content & Civil Services Operations",
      address: "Mukherjee Nagar / Karol Bagh, New Delhi 110009, India", // TODO: REPLACE
    },
  ],
  socials: {
    twitter: "https://twitter.com/dextora_ai",
    linkedin: "https://linkedin.com/company/dextora-ai",
    youtube: "https://youtube.com/@dextora_ai",
    telegram: "https://t.me/dextora_ias",
    github: "https://github.com/dextora",
  },
  stats: [
    { value: "85,000+", label: "Active Learners Across India", suffix: "" },
    { value: "1.45M+", label: "AI Practice Questions Generated", suffix: "" },
    { value: "250,000+", label: "Civil Services Mains Answers Evaluated", suffix: "" },
    { value: "99.4%", label: "Curricular Accuracy Benchmark", suffix: "" },
  ],
  fourPillars: [
    {
      title: "Hyper-Personalised",
      tag: "Adaptive Learning",
      description:
        "Every student follows a unique cognitive path. Our AI adapts to your pacing, identifies micro-gaps, and customises practice drills.",
      icon: "Sparkles",
    },
    {
      title: "AI-First Pedagogy",
      tag: "Socratic Foundation",
      description:
        "Not just answers—deep understanding. Socratic guidance, step-by-step reasoning, and instant multimodal feedback that stick.",
      icon: "Bot",
    },
    {
      title: "Exam & Syllabus Ready",
      tag: "Targeted Rigour",
      description:
        "Strictly aligned with official NCERT, CBSE, UPSC CSE, and State PSC frameworks. Zero fluff, 100% exam relevance.",
      icon: "Target",
    },
    {
      title: "Deeply Bilingual",
      tag: "Bharat First",
      description:
        "Engineered with first-class Hindi and English support so language is never a barrier to top-tier education.",
      icon: "Languages",
    },
  ],
  navItems: [
    { label: "Products", href: "/products", hasDropdown: true },
    { label: "About", href: "/about" },
    { label: "Vision", href: "/vision" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
};

// Exportable unified navigation config for product subdomains ("Part of Dextora" bar)
export interface SubdomainBarConfig {
  parentHubUrl: string;
  brandName: string;
  siblingProducts: { name: string; url: string; badge?: string }[];
}

export const sharedSubdomainBarConfig: SubdomainBarConfig = {
  parentHubUrl: siteConfig.url,
  brandName: "Dextora",
  siblingProducts: [
    { name: "Dextora Learn", url: "https://dextora.org", badge: "K-12" },
    { name: "Dhyeya IAS", url: "https://upscnews.dextora.org", badge: "UPSC" },
    { name: "Dextora Hub", url: siteConfig.url },
  ],
};
