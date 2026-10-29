export interface Testimonial {
  id: string;
  name: string;
  role: string;
  institution: string;
  product: "Dextora Learn" | "Dhyeya IAS" | "Dextora Ecosystem";
  quote: string;
  location: string;
  rating: number;
  initials: string;
}

// Staged testimonials structure — no stock photos.
// Will only render when features.showTestimonials is explicitly set to true.
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rohan Tripathi",
    role: "Civil Services Aspirant",
    institution: "UPSC CSE Examination Track",
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
];
