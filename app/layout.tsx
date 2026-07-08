import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Safe & Loving Childcare in Yaoundé, Cameroon`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "daycare Yaoundé",
    "childcare Cameroon",
    "garderie Yaoundé",
    "preschool Obili",
    "kindergarten Yaoundé",
    "Granny's Daycare Center",
  ],
  authors: [{ name: site.name }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    icon: "/images/favicon.svg",
    apple: "/images/favicon.svg",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    title: `${site.name} | Safe & Loving Childcare in Yaoundé`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [{ url: "/images/hero.svg", width: 520, height: 640, alt: site.name }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Childcare in Yaoundé`,
    description: site.description,
    images: ["/images/hero.svg"],
  },
};

export const viewport = { themeColor: "#7c5cff" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  name: site.name,
  description: site.description,
  image: `${site.url}/images/hero.svg`,
  url: site.url,
  telephone: site.phones[0].replace(/\s/g, ""),
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shell Obili",
    addressLocality: site.locality,
    addressCountry: site.country,
  },
  areaServed: "Yaoundé, Cameroon",
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
