import { LangProvider, type Lang } from "@/lib/i18n";
import { site, SITE_URL } from "@/lib/site";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { RevealObserver } from "./RevealObserver";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { About } from "./sections/About";
import { Clubs } from "./sections/Clubs";
import { Contacts } from "./sections/Contacts";
import { Documents } from "./sections/Documents";
import { Food } from "./sections/Food";
import { Gallery } from "./sections/Gallery";
import { Groups } from "./sections/Groups";
import { Hero } from "./sections/Hero";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  name: "Детский ясли-сад «Тұмар»",
  alternateName: "«Тұмар» бөбекжай-балабақшасы",
  legalName: site.legalName,
  url: `${SITE_URL}/`,
  telephone: site.phone.e164,
  sameAs: [site.instagram.url],
  openingHours: "Mo-Fr 07:00-18:00",
  availableLanguage: ["kk", "ru"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "микрорайон Карасу, улица Ынтымак, 35",
    addressLocality: "село Отеген Батыр",
    addressRegion: "Алматинская область, Илийский район",
    addressCountry: "KZ",
  },
};

/** Вся страница сайта. Русская версия — `/`, казахская — `/kk/`. */
export function SiteHome({ lang }: { lang: Lang }) {
  return (
    <LangProvider initial={lang}>
      <div id="top" />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Groups />
        <Food />
        <Clubs />
        <Gallery />
        <Documents />
        <Contacts />
      </main>
      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </LangProvider>
  );
}
