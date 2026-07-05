// Seeds the programs table with the daycare's age-group offerings.
// Safe to run multiple times — it clears and re-inserts programs only.
import db from './database.js';

const programs = [
  {
    slug: 'infant',
    name: 'Infant Care',
    age_range: '6 weeks – 12 months',
    ratio: '1:3 teacher ratio',
    price: '$320 / week',
    icon: 'baby',
    description:
      'A calm, nurturing room where our caregivers follow your baby’s own rhythm for feeding, napping, and play, with daily updates sent to you.',
    features: JSON.stringify([
      'Personalized feeding & nap schedules',
      'Daily photo & activity reports',
      'Tummy-time & sensory play',
      'Certified infant-CPR caregivers',
    ]),
  },
  {
    slug: 'toddler',
    name: 'Toddler Program',
    age_range: '1 – 2 years',
    ratio: '1:5 teacher ratio',
    price: '$285 / week',
    icon: 'blocks',
    description:
      'Busy little explorers build independence through movement, music, and messy art in a room designed for safe, hands-on discovery.',
    features: JSON.stringify([
      'Potty-training support',
      'Language & vocabulary building',
      'Music, movement & story time',
      'Outdoor play twice daily',
    ]),
  },
  {
    slug: 'preschool',
    name: 'Preschool',
    age_range: '3 – 4 years',
    ratio: '1:8 teacher ratio',
    price: '$260 / week',
    icon: 'palette',
    description:
      'A play-based curriculum that grows early literacy, numbers, and social skills so children arrive at kindergarten curious and confident.',
    features: JSON.stringify([
      'Early literacy & numeracy',
      'STEM & nature exploration',
      'Social-emotional learning',
      'Weekly show-and-tell',
    ]),
  },
  {
    slug: 'prek',
    name: 'Pre-K Readiness',
    age_range: '4 – 5 years',
    ratio: '1:10 teacher ratio',
    price: '$245 / week',
    icon: 'graduation',
    description:
      'Our kindergarten-prep year sharpens reading, writing, and problem-solving with a structured yet joyful daily routine.',
    features: JSON.stringify([
      'Reading & writing foundations',
      'Math & logic games',
      'Confidence & focus building',
      'Kindergarten transition support',
    ]),
  },
  {
    slug: 'afterschool',
    name: 'After-School Club',
    age_range: '5 – 12 years',
    ratio: '1:12 teacher ratio',
    price: '$160 / week',
    icon: 'backpack',
    description:
      'A safe, energetic space after the school bell for homework help, enrichment clubs, and plenty of free play with friends.',
    features: JSON.stringify([
      'Homework help & tutoring',
      'Art, sports & science clubs',
      'Healthy afternoon snacks',
      'School pick-up available',
    ]),
  },
];

const clear = db.prepare('DELETE FROM programs');
const insert = db.prepare(`
  INSERT INTO programs (slug, name, age_range, ratio, price, description, icon, features)
  VALUES (@slug, @name, @age_range, @ratio, @price, @description, @icon, @features)
`);

const seed = db.transaction((rows) => {
  clear.run();
  for (const row of rows) insert.run(row);
});

seed(programs);
console.log(`✅ Seeded ${programs.length} programs.`);
