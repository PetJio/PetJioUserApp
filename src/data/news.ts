export interface NewsArticle {
  id: number;
  title: string;
  description: string;
  source: string;
  publishedAt: string;
  url: string;
  image: string;
  category: string;
}

// Helper function to generate recent dates dynamically
const getRecentDate = (daysAgo: number, hoursAgo: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
};

export const petNews: NewsArticle[] = [
  {
    id: 1,
    title: "New Study Reveals Dogs Can Detect Early Signs of Cancer",
    description: "Researchers have found that specially trained dogs can detect cancer with up to 97% accuracy, potentially revolutionizing early diagnosis.",
    source: "Pet Health Journal",
    publishedAt: getRecentDate(0, 3), // 3 hours ago
    url: "https://www.pethealthjournal.com/cancer-detection-dogs",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
    category: "Health"
  },
  {
    id: 2,
    title: "India Launches First Pet-Friendly Metro Service",
    description: "Major cities introduce pet-friendly metro compartments, making public transportation accessible for pet owners during off-peak hours.",
    source: "India Today Pets",
    publishedAt: getRecentDate(1), // Yesterday
    url: "https://www.indiatoday.in/pets/metro-service",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800",
    category: "News"
  },
  {
    id: 3,
    title: "Veterinary Telemedicine Adoption Grows 250% in 2025",
    description: "Virtual vet consultations have seen massive growth as pet parents embrace technology for convenient healthcare access.",
    source: "Veterinary Times",
    publishedAt: getRecentDate(2), // 2 days ago
    url: "https://www.vettimes.com/telemedicine-growth",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800",
    category: "Technology"
  },
  {
    id: 4,
    title: "New Regulations Tighten Pet Food Safety Standards",
    description: "Government introduces stricter quality controls for pet food manufacturers to ensure nutritional standards and safety compliance.",
    source: "Pet Food Institute",
    publishedAt: getRecentDate(3), // 3 days ago
    url: "https://www.petfoodinstitute.org/regulations-2025",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800",
    category: "Regulations"
  },
  {
    id: 5,
    title: "Breakthrough in Feline Diabetes Treatment Announced",
    description: "Veterinary scientists develop new insulin treatment that reduces injection frequency for diabetic cats from daily to weekly doses.",
    source: "Feline Medical Journal",
    publishedAt: getRecentDate(4), // 4 days ago
    url: "https://www.felinemedicaljournal.com/diabetes-treatment",
    image: "https://images.unsplash.com/photo-1573865526739-10c1dd7adaa7?w=800",
    category: "Health"
  },
  {
    id: 6,
    title: "Pet Adoption Rates Hit Record High in Indian Cities",
    description: "Animal shelters report highest adoption rates in history as awareness campaigns and improved facilities encourage pet parenthood.",
    source: "Animal Welfare Board",
    publishedAt: getRecentDate(5), // 5 days ago
    url: "https://www.awbi.org/adoption-rates-2025",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800",
    category: "Adoption"
  }
];
