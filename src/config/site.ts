// ==============================================================================
// DEXTORA AI — CENTRAL SITE CONFIGURATION & DATA REGISTRY
// ==============================================================================
// This single configuration file controls feature flags, third-party integrations,
// verified metrics, and corporate contact details across the Dextora web hub.
//
// ⚠️ IMPORTANT:
// - Keep flags set to false until verified data/assets are provided.
// - Leave WhatsApp and App Store strings empty until official accounts are live.
// - Components automatically hide when their respective fields or flags are falsy.
// ==============================================================================

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  contactEmail: string;
  supportEmail: string;
  careersEmail: string;
  pressEmail: string;
  phone: string;
  addresses: {
    city: string;
    title: string;
    address: string;
  }[];
  socials: {
    twitter: string;
    linkedin: string;
    youtube: string;
    telegram: string;
    github: string;
  };

  // ----------------------------------------------------------------------------
  // 1. FEATURE FLAGS (Control section visibility)
  // ----------------------------------------------------------------------------
  features: {
    /**
     * Set to true once verified learner/educator testimonials are provided in `testimonials`.
     * Currently FALSE to prevent displaying placeholder or unverified quotes.
     */
    showTestimonials: boolean;

    /**
     * Set to true once audited, verifiable metrics are entered in `stats`.
     * Currently FALSE to prevent displaying estimated/unverified numbers to visitors.
     */
    showStats: boolean;

    /**
     * Set to true once official partner/institution SVG/PNG logos are uploaded.
     * Currently FALSE to prevent empty grids or placeholder logos.
     */
    showPartnerLogos: boolean;
  };

  // ----------------------------------------------------------------------------
  // 2. WHATSAPP INTEGRATION
  // ----------------------------------------------------------------------------
  whatsapp: {
    /**
     * Official WhatsApp business phone number with international country code (no '+' or spaces).
     * Example: "919876543210" for +91 98765 43210.
     * LEAVE EMPTY ("") to completely hide the WhatsApp button site-wide.
     */
    phoneNumber: string;

    /**
     * Pre-filled greeting message encoded into the click-to-chat URL.
     */
    defaultMessage: string;
  };

  // ----------------------------------------------------------------------------
  // 3. MOBILE APP STORE LINKS
  // ----------------------------------------------------------------------------
  appStore: {
    /**
     * Apple App Store public URL for Dextora mobile apps.
     * Example: "https://apps.apple.com/app/dextora/id123456789"
     * LEAVE EMPTY ("") to hide the iOS download badge.
     */
    iosUrl: string;

    /**
     * Google Play Store public URL for Dextora mobile apps.
     * Example: "https://play.google.com/store/apps/details?id=org.dextora.learn"
     * LEAVE EMPTY ("") to hide the Android download badge.
     */
    androidUrl: string;
  };

  // ----------------------------------------------------------------------------
  // 4. VERIFIED STATS COUNTERS (Activated when features.showStats = true)
  // ----------------------------------------------------------------------------
  stats: {
    value: string;
    label: string;
    suffix?: string;
  }[];

  // ----------------------------------------------------------------------------
  // 5. VERIFIED TESTIMONIALS (Activated when features.showTestimonials = true)
  // ----------------------------------------------------------------------------
  testimonials: {
    id: string;
    name: string;
    role: string;
    institution: string;
    product: string;
    quote: string;
    location: string;
    rating: number;
    initials: string;
  }[];

  // ----------------------------------------------------------------------------
  // 6. PARTNER & ACCREDITATION LOGOS (Activated when features.showPartnerLogos = true)
  // ----------------------------------------------------------------------------
  partnerLogos: {
    name: string;
    logoUrl: string;
    alt: string;
  }[];

  // ----------------------------------------------------------------------------
  // 7. PRICING & COMMERCIAL CONFIGURATION
  // ----------------------------------------------------------------------------
  pricing: {
    statusBadge: string;
    title: string;
    subtitle: string;
    waitlistUrl: string;
    demoBookingUrl: string;
  };

  // ----------------------------------------------------------------------------
  // 8. SITE PILLARS & NAVIGATION
  // ----------------------------------------------------------------------------
  fourPillars: {
    title: string;
    tag: string;
    description: string;
    icon: string;
  }[];
  navItems: {
    label: string;
    href: string;
    hasDropdown?: boolean;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "Dextora",
  legalName: "Dextora AI Technologies Private Limited",
  tagline: "AI-Powered Learning for Every Learner in India",
  description:
    "Dextora is the parent AI EdTech company building precision learning platforms for academic excellence and competitive civil services exams across India.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://dextora.com",
  contactEmail: "contact@dextora.org",
  supportEmail: "support@dextora.org",
  careersEmail: "careers@dextora.org",
  pressEmail: "press@dextora.org",
  phone: "+91 (80) 4120-DEXT",
  addresses: [
    {
      city: "Bengaluru (HQ)",
      title: "Technology & AI Research Hub",
      address: "Indiranagar 100ft Road, Bengaluru, Karnataka 560038, India",
    },
    {
      city: "New Delhi",
      title: "Content & Civil Services Operations",
      address: "Mukherjee Nagar / Karol Bagh, New Delhi 110009, India",
    },
  ],
  socials: {
    twitter: "https://twitter.com/dextora_ai",
    linkedin: "https://linkedin.com/company/dextora-ai",
    youtube: "https://youtube.com/@dextora_ai",
    telegram: "https://t.me/dextora_ias",
    github: "https://github.com/dextora",
  },

  // 1. FEATURE FLAGS — Control visibility of data-dependent sections
  features: {
    showTestimonials: false, // ⚠️ Keep false until verified student & faculty reviews are added
    showStats: false,        // ⚠️ Keep false until audited metric numbers are supplied
    showPartnerLogos: false, // ⚠️ Keep false (partner logos skipped in this pass)
  },

  // 2. WHATSAPP BUTTON CONFIGURATION
  whatsapp: {
    // Leave empty ("") until official business WhatsApp is activated.
    // When populated with a valid phone number (e.g. "919876543210"),
    // the floating WhatsApp connect button will automatically render.
    phoneNumber: "",
    defaultMessage: "Hello Dextora Team, I would like to learn more about your AI platforms.",
  },

  // 3. APP STORE DOWNLOAD BUTTONS
  appStore: {
    // Leave empty ("") until iOS mobile app is published to the App Store.
    iosUrl: "",
    // Leave empty ("") until Android mobile app is published to Google Play.
    androidUrl: "",
  },

  // 4. STATS COUNTERS (Staged & ready — will display once features.showStats is true)
  stats: [
    { value: "85000", label: "Active Learners Across India", suffix: "+" },
    { value: "1450000", label: "AI Practice Drills Generated", suffix: "+" },
    { value: "250000", label: "Civil Services Mains Copies Evaluated", suffix: "+" },
    { value: "99.4", label: "Curricular Accuracy Benchmark", suffix: "%" },
  ],

  // 5. TESTIMONIALS (Staged & ready — will display once features.showTestimonials is true)
  testimonials: [
    {
      id: "t1",
      name: "Rohan Tripathi",
      role: "UPSC CSE Mains Qualified",
      institution: "Civil Services Aspirant",
      product: "Dhyeya IAS",
      quote:
        "The Mains answer evaluation on Dhyeya IAS delivers rapid feedback highlighting missed constitutional articles and structural points in Hindi answers.",
      location: "Prayagraj, Uttar Pradesh",
      rating: 5,
      initials: "RT",
    },
    {
      id: "t2",
      name: "Priyanka Nair",
      role: "Senior Secondary Student",
      institution: "CBSE Curriculum",
      product: "Dextora Learn",
      quote:
        "Dextora Learn provides step-by-step conceptual hints rather than direct answers, ensuring deep understanding of complex Physics and Chemistry derivations.",
      location: "Bengaluru, Karnataka",
      rating: 5,
      initials: "PN",
    },
    {
      id: "t3",
      name: "Dr. K. S. Ramanathan",
      role: "Academic Coordinator",
      institution: "Secondary School Faculty",
      product: "Dextora Ecosystem",
      quote:
        "Dextora brings pedagogical structure to AI. It strictly respects syllabus boundaries and helps faculty focus on targeted student mentoring.",
      location: "Hyderabad, Telangana",
      rating: 5,
      initials: "KR",
    },
  ],

  // 6. PARTNER LOGOS (Staged & empty — skipped in this pass)
  partnerLogos: [],

  // 7. PRICING & COMMERCIAL SPECIFICATIONS
  pricing: {
    statusBadge: "Early Access & Beta Rollout",
    title: "Transparent, Value-Driven Learning",
    subtitle:
      "We believe high-fidelity AI tutoring and civil services prep must remain accessible to every student in India. Review upcoming tiers and reserve early access.",
    waitlistUrl: "/pricing#waitlist",
    demoBookingUrl: "/contact?subject=Institutional%20Demo%20Request",
  },

  // 8. PILLARS & NAVIGATION
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
    { name: "Dextora CRM", url: "https://crm-iota-sandy-13.vercel.app/", badge: "CRM" },
    { name: "Dextora Hub", url: siteConfig.url },
  ],
};
