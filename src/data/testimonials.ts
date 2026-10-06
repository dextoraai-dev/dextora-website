export interface Testimonial {
  id: string;
  name: string;
  role: string;
  institution: string;
  product: "Dextora Learn" | "Dhyeya IAS" | "Dextora Ecosystem";
  quote: string;
  location: string;
  avatar: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rohan Tripathi",
    role: "UPSC CSE 2025 Mains Qualified",
    institution: "Self-Study Aspirant",
    product: "Dhyeya IAS",
    quote:
      "The Mains answer evaluation on Dhyeya IAS is remarkable. Getting feedback in under 20 seconds highlighting missed constitutional articles and structural flaws in my Hindi answers gave me the confidence to write full 3-hour tests every single day.",
    location: "Prayagraj, Uttar Pradesh",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: "t2",
    name: "Priyanka Nair",
    role: "Grade 12 CBSE Student (96.4% in Pre-Boards)",
    institution: "Delhi Public School",
    product: "Dextora Learn",
    quote:
      "Dextora Learn completely changed how I prepare Physics and Chemistry. It doesn't just give answers like a generic bot; it gives me hints that force me to derive the answer myself. My conceptual clarity has skyrocketed.",
    location: "Bengaluru, Karnataka",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: "t3",
    name: "Dr. K. S. Ramanathan",
    role: "Senior Academic Coordinator",
    institution: "Vidyashram Group of Institutions",
    product: "Dextora Ecosystem",
    quote:
      "Dextora brings serious pedagogy to AI. Unlike other tools that distract students with generic chat, Dextora's products maintain strict syllabus discipline and help our faculty focus on high-touch mentoring.",
    location: "Hyderabad, Telangana",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: "t4",
    name: "Saurabh Deshmukh",
    role: "UPPCS 2024 Ranker",
    institution: "State PSC Aspirant",
    product: "Dhyeya IAS",
    quote:
      "Finding high-yield, syllabus-mapped daily current affairs in Hindi was always a struggle until Dhyeya IAS. The daily MCQs and editorial breakdown save 3 hours of newspaper reading every morning.",
    location: "Varanasi, Uttar Pradesh",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    rating: 5,
  },
];
