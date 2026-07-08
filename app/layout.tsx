import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
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
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: site.name }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Childcare in Yaoundé`,
    description: site.description,
    images: ["/images/og.jpg"],
  },
};

export const viewport = { themeColor: "#7c5cff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
