export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: "10 Essential Tips for First-Time Dog Owners",
    excerpt: "Bringing home your first dog is an exciting experience. Learn the essential tips to make your journey smooth and enjoyable.",
    content: `Bringing home your first dog is an exciting and rewarding experience, but it also comes with responsibilities. Here are 10 essential tips to help you get started:

1. **Choose the Right Breed**: Research different breeds to find one that matches your lifestyle, living space, and activity level. Consider factors like size, energy level, and temperament.

2. **Prepare Your Home**: Dog-proof your space by removing hazards, securing electrical cords, and setting up a comfortable sleeping area with a bed and toys.

3. **Establish a Routine**: Dogs thrive on routine. Set consistent times for feeding, walks, playtime, and bedtime to help your dog feel secure.

4. **Start Training Early**: Begin basic obedience training as soon as you bring your dog home. Use positive reinforcement techniques and be patient.

5. **Socialize Your Dog**: Expose your puppy to different people, animals, sounds, and environments early on to help them become well-adjusted adults.

6. **Regular Vet Visits**: Schedule regular check-ups, vaccinations, and preventive care. Establish a relationship with a trusted veterinarian.

7. **Proper Nutrition**: Feed your dog high-quality food appropriate for their age, size, and activity level. Avoid overfeeding and maintain a healthy weight.

8. **Exercise Daily**: Provide adequate physical exercise based on your dog's breed and age. Regular walks and playtime are essential for their physical and mental health.

9. **Grooming Matters**: Regular brushing, nail trimming, and dental care are important. Establish a grooming routine early to keep your dog comfortable.

10. **Be Patient and Consistent**: Remember that training and bonding take time. Stay consistent with rules and expectations, and shower your dog with love and attention.

Owning a dog is a long-term commitment that brings immense joy. With proper preparation and care, you'll build a strong, loving bond with your furry companion.`,
    author: "Dr. Sarah Johnson",
    date: "2025-01-15",
    readTime: "5 min read",
    category: "Dog Care",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800"
  },
  {
    id: 2,
    title: "Understanding Cat Behavior: What Your Feline is Trying to Tell You",
    excerpt: "Cats communicate in mysterious ways. Decode your cat's body language and vocalizations to better understand their needs.",
    content: `Cats are fascinating creatures with unique ways of communicating. Understanding their behavior can strengthen your bond and help you meet their needs better. Here's what your cat might be telling you:

**Body Language:**

1. **Tail Positions**:
   - Upright tail: Happy and confident
   - Puffed tail: Scared or agitated
   - Tucked tail: Anxious or submissive
   - Slowly swishing: Content or focused
   - Rapid swishing: Irritated or overstimulated

2. **Ear Movements**:
   - Forward-facing: Alert and interested
   - Flattened back: Scared, defensive, or angry
   - Twitching: Processing sounds or feeling uncertain

3. **Eye Contact**:
   - Slow blinks: "I love you" in cat language
   - Dilated pupils: Excited, playful, or scared
   - Staring: Challenge or intense focus

**Vocalizations:**

1. **Meowing**: Usually directed at humans, not other cats. Can mean anything from "hello" to "feed me" to "play with me."

2. **Purring**: Generally indicates contentment, but cats also purr when stressed or in pain as a self-soothing mechanism.

3. **Hissing/Growling**: Clear warning signs that your cat feels threatened and needs space.

4. **Chirping/Chattering**: Often made when watching birds or prey, indicating excitement or frustration.

**Common Behaviors Explained:**

- **Kneading**: A sign of contentment, inherited from kittenhood when they kneaded their mother while nursing.
- **Head Bunting**: When your cat bumps their head against you, they're marking you with their scent and showing affection.
- **Bringing "Gifts"**: Cats bringing prey is actually showing care and teaching behavior.
- **Zoomies**: Sudden bursts of energy are normal, especially in younger cats. It's their way of burning excess energy.

By paying attention to these signals, you can better understand your cat's needs and create a stronger, more trusting relationship with your feline friend.`,
    author: "Emily Chen, Feline Behaviorist",
    date: "2025-01-10",
    readTime: "6 min read",
    category: "Cat Care",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800"
  },
  {
    id: 3,
    title: "Pet Nutrition 101: Creating a Balanced Diet for Your Furry Friend",
    excerpt: "Good nutrition is the foundation of your pet's health. Learn how to choose the right food and create a balanced diet.",
    content: `Proper nutrition is crucial for your pet's overall health, longevity, and quality of life. Here's everything you need to know about creating a balanced diet for your furry companion:

**Understanding Nutritional Needs:**

Pets require six essential nutrients:
1. **Proteins**: Building blocks for muscles, skin, and organs
2. **Fats**: Energy source and support for cell function
3. **Carbohydrates**: Energy and fiber for digestion
4. **Vitamins**: Support various bodily functions
5. **Minerals**: Essential for bones, teeth, and metabolic processes
6. **Water**: The most important nutrient for all body functions

**Choosing the Right Food:**

1. **Read Labels Carefully**: Look for AAFCO (Association of American Feed Control Officials) approval. The first ingredient should be a named protein source.

2. **Life Stage Matters**: Puppies/kittens, adults, and seniors have different nutritional requirements. Choose food appropriate for your pet's age.

3. **Consider Health Conditions**: Pets with allergies, sensitivities, or medical conditions may need specialized diets. Consult your vet.

4. **Quality Over Price**: While expensive doesn't always mean better, very cheap food often uses low-quality ingredients.

**Feeding Guidelines:**

- **Portion Control**: Follow feeding guidelines on the package, but adjust based on your pet's activity level and body condition.

- **Meal Frequency**:
  - Puppies/Kittens: 3-4 meals per day
  - Adults: 2 meals per day
  - Seniors: 2 meals per day, possibly smaller portions

- **Treats in Moderation**: Treats should make up no more than 10% of daily caloric intake.

**Foods to Avoid:**

Dangerous foods for pets include:
- Chocolate, coffee, caffeine
- Grapes and raisins
- Onions and garlic
- Xylitol (artificial sweetener)
- Alcohol
- Raw meat and eggs (bacteria risk)
- Bones that can splinter

**Signs of Good Nutrition:**

- Healthy, shiny coat
- Clear, bright eyes
- Good energy levels
- Healthy weight and body condition
- Regular, normal bowel movements
- Strong teeth and healthy gums

**When to Consult a Vet:**

Seek professional advice if you notice:
- Sudden weight loss or gain
- Changes in appetite or water consumption
- Digestive issues (vomiting, diarrhea)
- Dull coat or skin problems
- Low energy or behavioral changes

Remember, every pet is unique. What works for one may not work for another. Work with your veterinarian to create a nutrition plan tailored to your pet's specific needs. Good nutrition is an investment in your pet's long, healthy, and happy life.`,
    author: "Dr. Michael Rodriguez, Veterinary Nutritionist",
    date: "2025-01-05",
    readTime: "7 min read",
    category: "Pet Health",
    image: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=800"
  }
];