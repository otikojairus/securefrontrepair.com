import Image from "next/image";
import Link from "next/link";
import {
  CITY_PAGES,
  PHONE_DISPLAY,
  PHONE_E164,
  SERVICE_PILLARS,
  SITE_NAME,
  SUPPORT_PAGES,
  SeoPage,
  cityFromTargetArea,
  linkLabel,
  pageListLabel,
  serviceShortLabel,
  toPath,
} from "@/lib/site-data";

const SERVICE_LOCATIONS = Array.from(
  CITY_PAGES.reduce((map, page) => {
    const city = cityFromTargetArea(page.targetArea);
    if (!map.has(city)) map.set(city, page);
    return map;
  }, new Map<string, SeoPage>()).values(),
).slice(0, 16);

function footerLinkLabel(page: SeoPage) {
  if (page.pageType === "City Service Page") return linkLabel(page);
  if (page.pageType === "Service Pillar") return serviceShortLabel(page);
  return pageListLabel(page);
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="sfr-footer">
      <div className="sfr-wrap sfr-footer-grid">
        <div>
          <div className="sfr-footer-brand">
            <Image src="/logo.svg" alt="SecureFront Repair logo" width={34} height={34} />
            <p>{SITE_NAME}</p>
          </div>
          <p className="sfr-footer-copy">
            Emergency property response crews for commercial doors, storefront glass and graffiti & vandalism cleanup
            across Canada.
          </p>
          <a className="sfr-call sfr-footer-call" href={`tel:${PHONE_E164}`}>
            Call {PHONE_DISPLAY}
          </a>
        </div>
        <div>
          <h2>Services</h2>
          <nav className="sfr-footer-links" aria-label="Footer services">
            {SERVICE_PILLARS.map((page) => (
              <Link key={page.pageSlug} href={toPath(page.pageSlug)}>
                {footerLinkLabel(page)}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2>More Pages</h2>
          <nav className="sfr-footer-links" aria-label="Footer more pages">
            {SUPPORT_PAGES.slice(0, 8).map((page) => (
              <Link key={page.pageSlug} href={toPath(page.pageSlug)}>
                {footerLinkLabel(page)}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h2>Where We Work</h2>
          <nav className="sfr-footer-links sfr-footer-cities" aria-label="Footer locations we serve">
            {SERVICE_LOCATIONS.map((page) => (
              <Link key={cityFromTargetArea(page.targetArea)} href={toPath(page.pageSlug)} aria-label={linkLabel(page)}>
                {cityFromTargetArea(page.targetArea)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="sfr-wrap sfr-footer-base">
        © {year} {SITE_NAME}. Licensed door, glass and vandalism response crews across Canada. Call {PHONE_DISPLAY} for
        24/7 dispatch.
      </div>
    </footer>
  );
}
