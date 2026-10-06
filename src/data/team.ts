export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin?: string;
  twitter?: string;
  category: "Leadership" | "AI Research" | "Pedagogy & Curriculum";
}

export const teamMembers: TeamMember[] = [
  {
    name: "Aditya Verma",
    role: "Co-Founder & Chief Executive Officer",
    bio: "Ex-IIT Delhi. Former product leader at top tier EdTech scale-ups. Passionate about bringing high-fidelity AI tutoring to tier-2 & tier-3 Bharat.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    category: "Leadership",
  },
  {
    name: "Dr. Ananya Sharma",
    role: "Head of AI Pedagogy & Research",
    bio: "PhD in Cognitive Science & Educational AI (IISc Bengaluru). Researches Socratic prompting techniques, knowledge tracing, and bilingual NLP models.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    category: "Leadership",
  },
  {
    name: "Vikramaditya Roy",
    role: "VP of Product & Civil Services Lead",
    bio: "10+ years mentoring civil services aspirants. Architect of the Dhyeya IAS Mains Evaluation rubric and UPSC exam-mapping framework.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    category: "Leadership",
  },
  {
    name: "Nikhil Kulkarni",
    role: "Lead Vision & Machine Learning Engineer",
    bio: "Specializes in multimodal OCR, handwritten Devanagari transcription, and low-latency LLM inference optimization.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=240&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com",
    category: "AI Research",
  },
  {
    name: "Sunita Aggarwal",
    role: "Senior Curriculum Director (NCERT & State Boards)",
    bio: "Former CBSE curriculum designer with 18 years of classroom pedagogy expertise. Leads question blueprint verification.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com",
    category: "Pedagogy & Curriculum",
  },
  {
    name: "Arjun Mehta",
    role: "Staff Platform & Distributed Systems Engineer",
    bio: "Ex-cloud architect. Builds resilient, low-latency microservices serving millions of AI queries daily across India.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=240&auto=format&fit=crop&q=80",
    linkedin: "https://linkedin.com",
    category: "AI Research",
  },
];
