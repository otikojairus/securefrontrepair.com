import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { SERVICES_HERO, pillarCardImage } from "@/lib/images";
import {
  EMERGENCY_PAGES,
  PHONE_DISPLAY,
  PHONE_E164,
  SEO_PAGES,
  SERVICE_PAGES,
  SERVICE_PILLARS,
  SITE_NAME,
  SUPPORT_PAGES,
  absoluteUrl,
  anchorText,
  indexLabel,
  linkLabel,
  pageListLabel,
  pillarTagline,
  serviceShortLabel,
  toPath,
  uniqueCityPages,
} from "@/lib/site-data";
import { breadcrumbSchema } from "@/lib/schema";

const serviceFaqs = [
  {
    q: "Should I start with a service or my city?",
    a: "If you want the full picture of how a service works, start with the service page. If you already know your location and just need a crew out, jump straight to your city.",
  },
  {
    q: "Do you cover emergencies?",
    a: "Yes. The emergency pages cover same-day and after-hours door, glass, and vandalism response. Call and we will give you a real arrival window.",
  },
  {
    q: "Can I just call instead of picking a page?",
    a: "Yes. Call us, tell us your site type and what is damaged, and we will point you to the right service and get a crew moving.",
  },
];

export const metadata: Metadata = {
  title: `${SITE_NAME} Services`,
  description: "Browse commercial door repair, storefront glass replacement, graffiti & vandalism cleanup, emergency, and city coverage in one place.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `${SITE_NAME} Services`,
    description: "Browse services, emergency response, and city coverage for SecureFront Repair.",
    url: absoluteUrl("/services"),
  },
};

export default function ServicesPage() {
  return (
    <main className="sfr-main sfr-page">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: serviceFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          },
        ]}
      />
      <section className="sfr-wrap sfr-page-head sfr-split sfr-split-media">
        <div>
          <p className="sfr-kicker">Every service in one place</p>
          <h1>Services</h1>
          <p>
            Find exactly what you need in one place. Whether it is a storefront door that will not lock, a shattered
            window, or a fresh tag on your facade, start with the service that fits and drill down to your city. If you
            would rather skip the browsing, call and we will get you to the right crew.
          </p>
          <div className="sfr-actions">
            <a className="sfr-call sfr-call-large" href={`tel:${PHONE_E164}`}>
              Call {PHONE_DISPLAY}
            </a>
            <Link className="sfr-secondary" href="/">
              Back to Home
            </Link>
          </div>
        </div>
        <div className="sfr-media-frame">
          <Image
            src={SERVICES_HERO.image.src}
            alt={SERVICES_HERO.alt}
            width={SERVICES_HERO.image.width}
            height={SERVICES_HERO.image.height}
            priority
            sizes="(max-width: 1020px) 100vw, 46vw"
            className="sfr-media-image"
          />
        </div>
      </section>

      <section className="sfr-section">
        <div className="sfr-wrap">
          <h2>Core Services</h2>
          <div className="sfr-grid sfr-grid-3">
            {SERVICE_PILLARS.map((page) => {
              const card = pillarCardImage(page.pageSlug);
              return (
                <Link className="sfr-media-card" href={toPath(page.pageSlug)} key={page.pageSlug}>
                  <div className="sfr-media-card-thumb">
                    <Image
                      src={card.image.src}
                      alt={card.alt}
                      width={card.image.width}
                      height={card.image.height}
                      loading="lazy"
                      sizes="(max-width: 1020px) 100vw, 33vw"
                    />
                  </div>
                  <div className="sfr-media-card-body">
                    <span>{serviceShortLabel(page)}</span>
                    <h3>{pageListLabel(page)}</h3>
                    <p>{pillarTagline(page)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sfr-section sfr-soft">
        <div className="sfr-wrap">
          <h2>Emergency & Same-Day</h2>
          <div className="sfr-grid sfr-grid-3">
            {EMERGENCY_PAGES.map((page) => (
              <Link className="sfr-chip" href={toPath(page.pageSlug)} key={page.pageSlug}>
                {anchorText(page)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sfr-section">
        <div className="sfr-wrap">
          <h2>Near Me Pages</h2>
          <div className="sfr-grid sfr-grid-4">
            {SERVICE_PAGES.map((page) => (
              <Link className="sfr-chip" href={toPath(page.pageSlug)} key={page.pageSlug}>
                {pageListLabel(page)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sfr-section sfr-band">
        <div className="sfr-wrap">
          <h2>Local Pages</h2>
          <div className="sfr-grid sfr-grid-4">
            {uniqueCityPages().map((page) => (
              <Link className="sfr-chip" href={toPath(page.pageSlug)} key={page.pageSlug}>
                {linkLabel(page)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sfr-section">
        <div className="sfr-wrap">
          <h2>More Pages</h2>
          <div className="sfr-grid sfr-grid-4">
            {SUPPORT_PAGES.map((page) => (
              <Link className="sfr-chip" href={toPath(page.pageSlug)} key={page.pageSlug}>
                {pageListLabel(page)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sfr-section sfr-soft">
        <div className="sfr-wrap">
          <h2>Browse All</h2>
          <div className="sfr-index-list">
            {SEO_PAGES.map((page) => (
              <Link href={toPath(page.pageSlug)} key={page.pageSlug} aria-label={pageListLabel(page)}>
                {indexLabel(page)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sfr-section sfr-band">
        <div className="sfr-wrap">
          <h2>Common Questions</h2>
          <div className="sfr-grid sfr-grid-3">
            {serviceFaqs.map((faq) => (
              <article className="sfr-card" key={faq.q}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
