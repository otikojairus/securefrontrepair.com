import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { HOME_HERO, pillarCardImage } from "@/lib/images";
import {
  EMERGENCY_PAGES,
  PHONE_DISPLAY,
  PHONE_E164,
  SERVICE_PAGES,
  SERVICE_PILLARS,
  SITE_NAME,
  absoluteUrl,
  anchorText,
  linkLabel,
  pageListLabel,
  pillarTagline,
  serviceShortLabel,
  toPath,
  uniqueCityPages,
} from "@/lib/site-data";
import { breadcrumbSchema } from "@/lib/schema";

const homeFaqs = [
  {
    q: "Do you work with a site like mine?",
    a: "If you run a storefront, a restaurant, a bank, an office, a strip mall, or a condo entrance, yes. You get a crew matched to your door, your glass, and your exposure to vandalism and storm damage.",
  },
  {
    q: "How do I know which service I need?",
    a: "Tell us what is broken, tagged, or overdue. If you know your city, start there; if not, describe the site and we will point you to the right service and quote it.",
  },
  {
    q: "Can I just call before I figure it all out?",
    a: "Yes. Call us, describe your site, what is damaged, and how soon you need a crew. We take it from there and give you a real arrival window.",
  },
];

export const metadata: Metadata = {
  title: `${SITE_NAME} | Commercial Doors, Glass and Vandalism Response`,
  description:
    "Commercial door repair, storefront glass replacement, and graffiti & vandalism cleanup across Canada. 24/7 dispatch.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} | Doors, Glass and Vandalism Response`,
    description: "Emergency property response for doors, storefront glass and vandalism cleanup across Canada. 24/7 dispatch.",
    url: absoluteUrl("/"),
    type: "website",
    siteName: SITE_NAME,
  },
};

export default function HomePage() {
  return (
    <main className="sfr-main">
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Home", path: "/" }]),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: homeFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          },
        ]}
      />

      <section className="sfr-hero">
        <div className="sfr-wrap sfr-hero-content">
          <div>
            <p className="sfr-kicker">Coast to coast · 24/7 dispatch</p>
            <h1>Secured, Repaired and Cleaned — Without the Runaround</h1>
            <p>
              Commercial doors, storefront glass, and graffiti & vandalism cleanup. Tell us what is broken, tagged, or
              overdue and where the crew can park, and a technician shows up sized for the job, with the site secured and
              the paperwork handled before we leave.
            </p>
            <div className="sfr-actions">
              <a className="sfr-call sfr-call-large" href={`tel:${PHONE_E164}`}>
                Call {PHONE_DISPLAY}
              </a>
              <Link className="sfr-secondary" href="/services">
                Browse Services
              </Link>
            </div>
            <div className="sfr-hero-stats">
              <div className="sfr-hero-stat">
                <strong>24/7</strong>
                <span>Emergency dispatch</span>
              </div>
              <div className="sfr-hero-stat">
                <strong>39+</strong>
                <span>Cities served</span>
              </div>
              <div className="sfr-hero-stat">
                <strong>3</strong>
                <span>Core service lines</span>
              </div>
            </div>
          </div>
          <div className="sfr-hero-media">
            <Image
              src={HOME_HERO.image.src}
              alt={HOME_HERO.alt}
              width={HOME_HERO.image.width}
              height={HOME_HERO.image.height}
              priority
              sizes="(max-width: 1020px) 100vw, 46vw"
            />
          </div>
        </div>
      </section>

      <div className="sfr-hazard" aria-hidden="true" />

      <section className="sfr-section sfr-band">
        <div className="sfr-wrap">
          <div className="sfr-alert">
            <div>
              <strong>Secured right now?</strong>
              <p>We keep crews on standby for after-hours door, glass, and vandalism emergencies.</p>
            </div>
            <a className="sfr-call" href={`tel:${PHONE_E164}`}>
              Emergency Line
            </a>
          </div>
        </div>
      </section>

      <section className="sfr-section">
        <div className="sfr-wrap sfr-split">
          <div>
            <p className="sfr-eyebrow">Built around your site</p>
            <h2>The Right Crew, Not a One-Size Route</h2>
          </div>
          <p>
            You do not get a quick patch and a bill. Whether it is a storefront door that will not lock, a shattered
            window replaced before opening, or a fresh tag removed before it sets, you get a crew matched to what is
            actually on your site. Tell us the access and the damage, and we build the visit around you.
          </p>
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
          <h2>Emergency & Near Me Pages</h2>
          <div className="sfr-grid sfr-grid-4">
            {[...EMERGENCY_PAGES, ...SERVICE_PAGES].map((page) => (
              <Link className="sfr-chip" href={toPath(page.pageSlug)} key={page.pageSlug}>
                {anchorText(page)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sfr-section">
        <div className="sfr-wrap">
          <h2>Find Your City</h2>
          <div className="sfr-grid sfr-grid-4">
            {uniqueCityPages()
              .slice(0, 28)
              .map((page) => (
                <Link className="sfr-chip" href={toPath(page.pageSlug)} key={page.pageSlug}>
                  {linkLabel(page)}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section className="sfr-section sfr-band">
        <div className="sfr-wrap">
          <h2>Common Questions</h2>
          <div className="sfr-grid sfr-grid-3">
            {homeFaqs.map((faq) => (
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
