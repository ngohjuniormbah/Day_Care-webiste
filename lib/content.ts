import { programSeed, type Program } from "./programs";

// ---------------------------------------------------------------------------
// Editable site content. Everything here can be changed from the /admin panel.
// ---------------------------------------------------------------------------

export type Stat = { n: string; l: string };
export type Plan = {
  ic: string;
  tint: string;
  name: string;
  price: string;
  unit: string;
  hours: string;
  ages: string;
  featured: boolean;
};
export type Testimonial = { av: string; n: string; r: string; t: string };
export type Faq = { q: string; a: string };

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
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    lead: string;
    stats: Stat[];
  };
  plans: Plan[];
  programs: Program[];
  testimonials: Testimonial[];
  faqs: Faq[];
};

export const defaultContent: SiteContent = {
  banner: {
    enabled: true,
    text: "🎉 Now enrolling for the new term — book a free visit today!",
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
  hero: {
    badge: "🌟 Trusted childcare in Yaoundé",
    title: "A Safe & Loving Place for Your Child to Learn,",
    titleAccent: "Play & Grow",
    lead: "At Granny's Daycare Center we provide a warm, secure and nurturing environment where your little ones grow with confidence — every day is a blend of fun and learning.",
    stats: [
      { n: "150+", l: "Happy children" },
      { n: "12+", l: "Caring educators" },
      { n: "8+", l: "Years of care" },
    ],
  },
  plans: [
    { ic: "🌤️", tint: "tint-yellow", name: "Full Day", price: "30,000", unit: "FCFA / month", hours: "07:00–18:00", ages: "1–5 yrs", featured: false },
    { ic: "☀️", tint: "tint-purple", name: "Half Day", price: "18,000", unit: "FCFA / month", hours: "08:00–13:00", ages: "2–4 yrs", featured: true },
    { ic: "📅", tint: "tint-green", name: "Weekly", price: "9,000", unit: "FCFA / week", hours: "Mon–Fri", ages: "1–5 yrs", featured: false },
  ],
  programs: programSeed,
  testimonials: [
    { av: "A", n: "Aïcha N.", r: "Parent, Obili", t: "Granny's Daycare feels like a second home for my daughter. The staff are warm, attentive and truly caring. I never worry when she's here." },
    { av: "P", n: "Paul M.", r: "Parent, Yaoundé", t: "The learning programme is wonderful. My son has grown so confident and comes home excited to share what he learned each day." },
    { av: "S", n: "Sandrine K.", r: "Parent, Efoulan", t: "Clean, safe and full of love. The flexible hours are perfect for our family. I recommend Granny's to every parent I know." },
  ],
  faqs: [
    { q: "What ages do you care for?", a: "We welcome children from 0 to 5 years across our infant, toddler and preschool programmes, plus after-school care for older children." },
    { q: "What are your opening hours?", a: "We are open Monday to Friday from 07:00 to 18:00, all year round. Flexible full-day, half-day and weekly options are available." },
    { q: "Do you provide meals?", a: "Yes. Nutritious, freshly prepared meals and snacks are included in our full-day and weekly plans, with a morning snack on half-day plans." },
    { q: "How do I enrol my child?", a: "Simply fill in the enrollment form on our Contact page or call us. We'll confirm availability and next steps within one business day." },
    { q: "Is the centre secure?", a: "Absolutely. We operate from a secure, gated home with controlled entry, an enclosed veranda and yard, and caring, trained staff supervising at all times." },
  ],
};
