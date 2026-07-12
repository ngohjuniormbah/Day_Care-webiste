import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Banner } from "@/components/Banner";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";
import { getContent } from "@/lib/content-store";

// Public marketing pages read editable content at request time.
export const dynamic = "force-dynamic";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  name: site.name,
  description: site.description,
  image: `${site.url}/images/og.jpg`,
  url: site.url,
  telephone: site.phones[0].replace(/\s/g, ""),
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shell Nsimeyong",
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

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  return (
    <>
      <Script id="ld-json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {content.banner.enabled && content.banner.text && <Banner text={content.banner.text} />}
      <Header />
      <main>{children}</main>
      <Footer info={content.site} />
      <WhatsAppButton />
    </>
  );
}
