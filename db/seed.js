// Seeds the programs table with Granny's Daycare Center age-group offerings.
// Safe to run multiple times — it clears and re-inserts programs only.
import db from './database.js';

const programs = [
  {
    slug: 'infant',
    name: 'Infant Care',
    age_range: '0 – 12 months',
    ratio: 'Full-time & part-time',
    price: '35,000 FCFA / month',
    icon: 'infant',
    description:
      'Loving, attentive care for our youngest ones in a calm, safe and hygienic space — with gentle routines, cuddles and sensory play right from the start.',
    features: JSON.stringify([
      'Personalised nap & feeding routines',
      'Daily updates for parents',
      'Sensory & tummy-time play',
      'Caring 1-to-3 supervision',
    ]),
  },
  {
    slug: 'toddler',
    name: 'Toddler Program',
    age_range: '1 – 2 years',
    ratio: '2 classes daily',
    price: '28,000 FCFA / month',
    icon: 'toddler',
    description:
      'Curious toddlers explore, move and discover through guided play that builds language, motor skills and early independence in a joyful setting.',
    features: JSON.stringify([
      'Guided play & discovery',
      'Story time & songs',
      'Motor-skill activities',
      'Outdoor play daily',
    ]),
  },
  {
    slug: 'preschool',
    name: 'Preschool',
    age_range: '3 – 4 years',
    ratio: 'Full learning day',
    price: '26,000 FCFA / month',
    icon: 'preschool',
    description:
      'A playful, structured programme building early literacy, numeracy, social skills and school readiness so children grow curious and confident.',
    features: JSON.stringify([
      'Early literacy & numeracy',
      'Numbers, shapes & colours',
      'Group projects & sharing',
      'Nature & outdoor learning',
    ]),
  },
  {
    slug: 'prek',
    name: 'Pre-K Readiness',
    age_range: '4 – 5 years',
    ratio: 'School-prep routine',
    price: '25,000 FCFA / month',
    icon: 'pre_k',
    description:
      'Our school-prep year sharpens reading, writing and problem-solving with a structured yet joyful daily routine that builds focus and confidence.',
    features: JSON.stringify([
      'Reading & writing foundations',
      'Numbers & logic games',
      'Confidence & focus building',
      'Smooth school transition',
    ]),
  },
  {
    slug: 'afterschool',
    name: 'After-School Care',
    age_range: '6+ years',
    ratio: 'Afternoons',
    price: '18,000 FCFA / month',
    icon: 'kinder',
    description:
      'A safe, warm space after school for homework help, enrichment activities and plenty of free play with friends until pick-up.',
    features: JSON.stringify([
      'Homework help & support',
      'Arts, games & activities',
      'Healthy afternoon snacks',
      'Flexible pick-up times',
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
