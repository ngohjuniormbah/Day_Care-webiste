import { programSeed, type Program } from "./programs";

// ---------------------------------------------------------------------------
// Editable site content, organised by page. Everything here can be changed
// from the /admin dashboard (tabbed by page).
// ---------------------------------------------------------------------------

export type { Program };
export type Item = { title: string; text: string };
export type Stat = { n: string; l: string };
export type Plan = { name: string; price: string; unit: string; hours: string; ages: string; featured: boolean };
export type Testimonial = { av: string; n: string; r: string; t: string };
export type Faq = { q: string; a: string };
export type Member = { name: string; role: string };
export type Slot = { time: string; title: string; text: string };
export type Post = { img: string; meta: string; title: string; text: string };
export type Photo = { src: string; cap: string };
export type Hours = { day: string; time: string };
export type Journey = { title: string; text: string };

export type SiteContent = {
  banner: { enabled: boolean; text: string };
  site: {
    name: string;
    tagline: string;
    address: string;
    phones: string[];
    email: string;
    hours: string;
    mapEmbed: string;
    mapLink: string;
  };
  faqs: Faq[];
  home: {
    hero: { badge: string; title: string; titleAccent: string; lead: string; stats: Stat[] };
    approach: Item[];
    plans: Plan[];
    schedule: Slot[];
    why: { title: string; text: string; bullets: string[] };
    safety: Item[];
    team: Member[];
    testimonials: Testimonial[];
    journal: Post[];
  };
  about: {
    title: string;
    intro: string;
    storyTitle: string;
    storyParagraphs: string[];
    storyBullets: string[];
    mv: Item[];
    values: Item[];
    facility: Item[];
    journey: Journey[];
    partnership: { title: string; text: string; bullets: string[] };
  };
  gallery: {
    title: string;
    intro: string;
    spaces: Item[];
    photos: Photo[];
    whatYoullSee: Item[];
  };
  program: {
    title: string;
    intro: string;
    programs: Program[];
    curriculum: Item[];
    included: string[];
  };
  contact: {
    title: string;
    intro: string;
    hours: Hours[];
    findUs: string[];
  };
};

export const defaultContent: SiteContent = {
  banner: {
    enabled: true,
    text: "Now enrolling for the new term — book a free visit today!",
  },
  site: {
    name: "Granny's Daycare Center",
    tagline: "Nurturing young minds for a brighter future",
    address: "Shell Obili, Yaoundé, Cameroon",
    phones: ["+237 677 172 979", "+237 654 448 959"],
    email: "grannysdaycare@gmail.com",
    hours: "Monday – Friday · 07:00 – 18:00",
    mapEmbed:
      "https://www.google.com/maps?q=Shell%20Obili%2C%20Yaound%C3%A9%2C%20Cameroon&z=15&output=embed",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Shell+Obili+Yaound%C3%A9+Cameroon",
  },
  faqs: [
    { q: "What ages do you care for?", a: "We welcome children from 0 to 5 years across our infant, toddler and preschool programmes, plus after-school care for older children." },
    { q: "What are your opening hours?", a: "We are open Monday to Friday from 07:00 to 18:00, all year round. Flexible full-day, half-day and weekly options are available." },
    { q: "Do you provide meals?", a: "Yes. Nutritious, freshly prepared meals and snacks are included in our full-day and weekly plans, with a morning snack on half-day plans." },
    { q: "How do I enrol my child?", a: "Simply fill in the enrollment form on our Contact page or call us. We'll confirm availability and next steps within one business day." },
    { q: "Is the centre secure?", a: "Absolutely. We operate from a secure, gated home with controlled entry, an enclosed veranda and yard, and caring, trained staff supervising at all times." },
  ],
  home: {
    hero: {
      badge: "Trusted childcare in Yaoundé",
      title: "A Safe & Loving Place for Your Child to Learn,",
      titleAccent: "Play & Grow",
      lead: "At Granny's Daycare Center we provide a warm, secure and nurturing environment where your little ones grow with confidence — every day is a blend of fun and learning.",
      stats: [
        { n: "150+", l: "Happy children" },
        { n: "12+", l: "Caring educators" },
        { n: "8+", l: "Years of care" },
      ],
    },
    approach: [
      { title: "Playful Learning", text: "Fun, curiosity-led play that builds early literacy, numeracy and imagination." },
      { title: "Outdoor Learning", text: "Fresh air, movement and nature-based exploration every single day." },
      { title: "Creative Discovery", text: "Hands-on arts, music and sensory activities that spark creativity." },
      { title: "Enriching Activities", text: "A rich programme built for social, emotional and physical growth." },
      { title: "Modern Resources", text: "Age-appropriate books, toys and tools that grow with your child." },
      { title: "Active Playtime", text: "Guided movement and play that supports healthy development." },
    ],
    plans: [
      { name: "Full Day", price: "30,000", unit: "FCFA / month", hours: "07:00–18:00", ages: "1–5 yrs", featured: false },
      { name: "Half Day", price: "18,000", unit: "FCFA / month", hours: "08:00–13:00", ages: "2–4 yrs", featured: true },
      { name: "Weekly", price: "9,000", unit: "FCFA / week", hours: "Mon–Fri", ages: "1–5 yrs", featured: false },
    ],
    schedule: [
      { time: "07:00 – 08:30", title: "Warm Welcome & Free Play", text: "Gentle drop-off, hugs and open play as friends arrive." },
      { time: "08:30 – 09:00", title: "Morning Snack", text: "A healthy snack to fuel a busy morning of learning." },
      { time: "09:00 – 10:30", title: "Learning Circle", text: "Stories, songs, letters, numbers and show-and-tell." },
      { time: "10:30 – 12:00", title: "Creative & Outdoor Play", text: "Arts, crafts and fresh-air play in the enclosed yard." },
      { time: "12:00 – 13:00", title: "Lunch Time", text: "A warm, nutritious meal shared together." },
      { time: "13:00 – 15:00", title: "Rest & Nap", text: "Quiet, cosy nap time in our dedicated rest area." },
      { time: "15:00 – 16:30", title: "Discovery & Games", text: "Puzzles, building blocks and small-group activities." },
      { time: "16:30 – 18:00", title: "Wind-down & Pick-up", text: "Calm play, a daily recap and happy goodbyes." },
    ],
    why: {
      title: "Why Parents Choose Granny's",
      text: "For years, families across Yaoundé have trusted us with their most precious little ones. Here's what makes Granny's different.",
      bullets: [
        "Warm, loving care that treats every child like family",
        "Small groups for real, personal attention",
        "A safe, secure and spotless environment",
        "Daily updates so you always know how your child is doing",
        "Flexible plans that fit around your work and budget",
      ],
    },
    safety: [
      { title: "Secure Access", text: "Gated premises with controlled entry and constant supervision." },
      { title: "Clean & Hygienic", text: "Daily cleaning routines and healthy hygiene habits for all." },
      { title: "First-Aid Ready", text: "Staff trained in child first-aid and emergency procedures." },
      { title: "Balanced Nutrition", text: "Freshly prepared, balanced meals and allergy-aware menus." },
    ],
    team: [
      { name: "Granny Hancy", role: "Founder & Lead Caregiver" },
      { name: "Mama Rose", role: "Toddler Room Teacher" },
      { name: "Aunty Estelle", role: "Preschool Teacher" },
      { name: "Aunty Brenda", role: "Infant Care Specialist" },
    ],
    testimonials: [
      { av: "A", n: "Aïcha N.", r: "Parent, Obili", t: "Granny's Daycare feels like a second home for my daughter. The staff are warm, attentive and truly caring. I never worry when she's here." },
      { av: "P", n: "Paul M.", r: "Parent, Yaoundé", t: "The learning programme is wonderful. My son has grown so confident and comes home excited to share what he learned each day." },
      { av: "S", n: "Sandrine K.", r: "Parent, Efoulan", t: "Clean, safe and full of love. The flexible hours are perfect for our family. I recommend Granny's to every parent I know." },
    ],
    journal: [
      { img: "/images/gallery/g4.jpg", meta: "Development · Mar 2026", title: "Developing independence through simple self-care routines", text: "Small daily habits build confidence and self-reliance in young children." },
      { img: "/images/gallery/g5.jpg", meta: "Play · Mar 2026", title: "Building confidence in young children through guided play", text: "How structured play helps children take healthy social and emotional risks." },
      { img: "/images/gallery/g6.jpg", meta: "Values · Mar 2026", title: "Encouraging kindness and sharing through group experiences", text: "Everyday moments that nurture empathy and cooperation in early years." },
    ],
  },
  about: {
    title: "Caring for Little Hearts & Curious Minds",
    intro: "Get to know the people, values and warm environment behind Granny's Daycare Center in Yaoundé.",
    storyTitle: "A Home Away From Home in Shell Obili",
    storyParagraphs: [
      "Granny's Daycare Center is located in a secure, gated apartment in Shell Obili, Yaoundé, complete with a toilet, kitchen, office, and a spacious hall with an enclosed veranda and grass yard. The hall includes sleeping, storage, dining, indoor play and study areas for children's comfort daily.",
      "What began as one grandmother's love for children has grown into a trusted center where families across Yaoundé feel confident leaving their little ones. Every corner is designed to feel warm, safe and full of joy.",
    ],
    storyBullets: [
      "Secure, gated premises with dedicated indoor & outdoor spaces",
      "Small groups with caring, attentive supervision",
      "Nutritious meals and a cozy rest area",
    ],
    mv: [
      { title: "Our Mission", text: "To provide a safe, loving and stimulating environment where every child feels valued, secure and inspired to explore, learn and grow at their own pace." },
      { title: "Our Vision", text: "To be Yaoundé's most trusted daycare — nurturing confident, kind and curious children who are ready for a bright future." },
      { title: "Our Promise", text: "Warm, professional care you can count on, clear communication with parents, and a joyful space your child will love coming back to." },
    ],
    values: [
      { title: "Love & Warmth", text: "Every child is treated with genuine affection and patience." },
      { title: "Safety First", text: "A secure, clean and closely supervised environment at all times." },
      { title: "Growth", text: "Play-based learning that grows social, emotional and cognitive skills." },
      { title: "Respect", text: "We honour each child's pace, personality and unique needs." },
    ],
    facility: [
      { title: "Sleeping & Rest", text: "A calm, dedicated space with comfortable bedding for naps and quiet time." },
      { title: "Dining Area", text: "Clean dining space where nutritious meals and snacks are served daily." },
      { title: "Indoor Play", text: "Safe, age-appropriate toys, books and learning corners for every stage." },
      { title: "Enclosed Veranda & Yard", text: "A secure grass yard and veranda for fresh-air play and outdoor discovery." },
    ],
    journey: [
      { title: "A grandmother's love", text: "Granny's started as a warm home welcoming a handful of neighbourhood children with open arms." },
      { title: "A real learning space", text: "We added a play-based programme, learning corners and a dedicated, caring team." },
      { title: "A trusted centre", text: "Families across Yaoundé trust us daily with safe, loving, developmental childcare." },
      { title: "Always improving", text: "We keep enriching our spaces, activities and care so every child can thrive." },
    ],
    partnership: {
      title: "A True Partnership With Parents",
      text: "You know your child best. We keep you close to their day with open, honest communication so you always feel connected — even when you're apart.",
      bullets: [
        "Friendly daily updates on how your child is doing",
        "An open-door policy — visit and chat any time",
        "Regular check-ins on progress and milestones",
        "We listen, adapt and care around your family's needs",
      ],
    },
  },
  gallery: {
    title: "Granny's Daycare Center Gallery",
    intro: "A safe, warm and thoughtfully designed environment where every child is nurtured, cared for and guided through joyful learning experiences. Take a peek into our happy days.",
    spaces: [
      { title: "Secure & Playful", text: "A safe, gated home full of colour, comfort and joyful learning corners." },
      { title: "Essential Care", text: "Everyday routines that build independence, comfort and confidence." },
      { title: "Enclosed Veranda", text: "A protected outdoor space for fresh air, movement and discovery." },
      { title: "Learning & Play Hall", text: "A spacious hall for creative activities, group play and story time." },
    ],
    photos: [
      { src: "/images/gallery/g1.jpg", cap: "Outdoor play in the grass yard" },
      { src: "/images/gallery/g2.jpg", cap: "Story time together" },
      { src: "/images/gallery/g3.jpg", cap: "Arts & crafts" },
      { src: "/images/gallery/g4.jpg", cap: "Learning through play" },
      { src: "/images/gallery/g5.jpg", cap: "Group activities" },
      { src: "/images/gallery/g6.jpg", cap: "Music & movement" },
      { src: "/images/gallery/g7.jpg", cap: "Snack & nutrition time" },
      { src: "/images/gallery/g8.jpg", cap: "Rest & cozy corner" },
      { src: "/images/gallery/g9.jpg", cap: "Nature exploration" },
    ],
    whatYoullSee: [
      { title: "Creative Corners", text: "Art, crafts and messy-play stations that spark imagination." },
      { title: "Reading Nooks", text: "Cosy spaces filled with picture books and story time." },
      { title: "Play Zones", text: "Ride-ons, blocks and toys for active, happy play." },
      { title: "Rest Area", text: "A calm, comfortable space for naps and quiet time." },
      { title: "Dining Space", text: "A clean, cheerful spot for healthy meals together." },
      { title: "Outdoor Yard", text: "A secure, enclosed yard for fresh-air fun." },
    ],
  },
  program: {
    title: "Our Amazing Programs",
    intro: "Our caring approach and thoughtfully designed programmes set us apart, with small age steps that ensure precious attention for every child.",
    programs: programSeed,
    curriculum: [
      { title: "Early Literacy", text: "Letters, sounds, stories and vocabulary that build a love of language." },
      { title: "Numeracy & Logic", text: "Counting, shapes, patterns and simple problem-solving through play." },
      { title: "Social & Emotional", text: "Sharing, kindness, feelings and friendship in a caring community." },
      { title: "Creative Expression", text: "Art, music, dance and pretend-play that spark imagination." },
    ],
    included: [
      "Warm, qualified caregivers",
      "Nutritious meals & snacks",
      "Daily learning activities",
      "Indoor & outdoor play",
      "Rest & nap time",
      "Daily parent updates",
      "Arts, crafts & music",
      "A safe, secure environment",
    ],
  },
  contact: {
    title: "Contact Us — We'd Love to Hear From You",
    intro: "Have a question or ready to enroll your child? Reach out and a member of our team will get back to you promptly.",
    hours: [
      { day: "Monday – Friday", time: "07:00 – 18:00" },
      { day: "Saturday", time: "By appointment" },
      { day: "Sunday & public holidays", time: "Closed" },
    ],
    findUs: [
      "We're located near Shell Obili, easy to reach from across Yaoundé.",
      "Look out for our secure, gated premises with the Granny's sign.",
      "Free, safe drop-off and pick-up right at the entrance.",
      "Call us on arrival and a caregiver will welcome you in.",
    ],
  },
};
