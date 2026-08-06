import { RAW_PAGES } from "@/lib/generated-pages";
import { cityFacts } from "@/lib/city-facts";
import { hashIndex, serviceMetaFor } from "@/lib/service-meta";

export type SeoPage = (typeof RAW_PAGES)[number];

export const SITE_NAME = "SecureFront Repair";
export const DEFAULT_SITE_URL = "https://securefrontrepair.com";
export const PHONE_DISPLAY = "1-888-903-1607";
export const PHONE_E164 = "+18889031607";

export const SEO_PAGES: SeoPage[] = [...RAW_PAGES];
export const SERVICE_PILLARS = SEO_PAGES.filter((page) => page.pageType === "Service Pillar");
export const EMERGENCY_PAGES = SEO_PAGES.filter((page) => page.pageType === "Emergency Landing");
export const SERVICE_PAGES = SEO_PAGES.filter((page) => page.pageType === "Service Page");
export const CITY_PAGES = SEO_PAGES.filter((page) => page.pageType === "City Service Page");
export const SUPPORT_PAGES = SEO_PAGES.filter((page) => page.pageType !== "Service Pillar" && !isCityPage(page));

const PILLAR_SLUGS = new Set(SERVICE_PILLARS.map((page) => page.pageSlug));

// Emergency and near-me pages map to the pillar that best represents their work so
// breadcrumbs and related links stay coherent.
const FAMILY_RULES: Array<[string, string]> = [
  ["/emergency-board-up", "/commercial-door-repair"],
  ["/emergency-commercial-door-repair", "/commercial-door-repair"],
  ["/emergency-storefront-glass-replacement", "/storefront-glass-replacement"],
  ["/emergency-vandalism-cleanup", "/graffiti-vandalism-cleanup"],
];

// City-page slugs come in several keyword flavours. Longest, most specific prefixes
// are listed first so matching stays deterministic.
const CITY_PREFIX_RULES: Array<[string, string]> = [
  ["/commercial-door-repair-", "/commercial-door-repair"],
  ["/storefront-glass-replacement-", "/storefront-glass-replacement"],
  ["/graffiti-vandalism-cleanup-", "/graffiti-vandalism-cleanup"],
];

export function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    DEFAULT_SITE_URL;

  const normalized = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  return normalized.replace(/\/+$/, "");
}

export function toPath(slug: string) {
  return slug.startsWith("/") ? slug : `/${slug}`;
}

export function absoluteUrl(path: string) {
  return `${getSiteUrl()}${toPath(path)}`;
}

export function titleCase(value: string) {
  return value
    .split(/(\s|-|\/)/)
    .map((part) => {
      if (/^\s|-|\/$/.test(part)) return part;
      const upper = part.toUpperCase();
      if (["bc", "ab", "on", "mb", "sk", "nb", "ns", "qc", "nl", "pe", "rv"].includes(part.toLowerCase())) return upper;
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("")
    .replace(/\bAnd\b/g, "and")
    .replace(/\bIn\b/g, "in")
    .replace(/\bNear Me\b/g, "Near Me");
}

export function cityFromTargetArea(targetArea: string) {
  return targetArea.replace(/\s*\([^)]*\)/, "").split(",")[0].trim();
}

export function provinceFromTargetArea(targetArea: string) {
  return targetArea.includes(",") ? targetArea.split(",")[1].trim() : "Canada";
}

export function isCityPage(page: SeoPage) {
  return page.pageType === "City Service Page";
}

export function isEmergencyPage(page: SeoPage) {
  return page.pageType === "Emergency Landing";
}

function stripBrand(value: string) {
  return value.replace(/\s*\|\s*SecureFront Repair$/i, "").trim();
}

/**
 * Cleans the SEO title suffixes from the Excel plan so the rendered H1 and link
 * labels read naturally instead of echoing keyword-stuffed title text verbatim.
 */
function cleanTitle(value: string) {
  return stripBrand(value)
    .replace(/\s*[-–]\s*24\/7\s*Same-Day\s*Canada\s*$/i, "")
    .replace(/\s*[-–]\s*Find\s+Local\s+Crews\s*\(\s*Canada\s*\)\s*$/i, "")
    .replace(/\s*[-–]\s*Canada\s*$/i, "")
    .replace(/\s*\(\s*Canada\s*\)\s*$/i, "")
    .trim();
}

export function pageListLabel(page: SeoPage) {
  return cleanTitle(page.pageTitle) || titleCase(page.primaryKeyword);
}

export function linkLabel(page: SeoPage) {
  return isCityPage(page) ? cityFromTargetArea(page.targetArea) : pageListLabel(page);
}

/**
 * Compact, unique label for flat index lists. City pages become "{City}, {Prov} — {Service}"
 * so multiple pages in one province stay distinct without repeating the full keyword-heavy
 * title on every line.
 */
export function indexLabel(page: SeoPage) {
  if (!isCityPage(page)) return pageListLabel(page);
  const city = cityFromTargetArea(page.targetArea);
  const prov = provinceFromTargetArea(page.targetArea);
  const family = serviceFamily(page);
  const pillar = SEO_PAGES.find((item) => item.pageSlug === family);
  const service = pillar ? serviceShortLabel(pillar) : "Repair";
  return `${city}, ${prov} — ${service}`;
}

/** Short, human service label for a pillar (drops the trailing "Services"/"Repair" noise). */
export function serviceShortLabel(page: SeoPage) {
  switch (page.pageSlug) {
    case "/commercial-door-repair":
      return "Door Repair";
    case "/storefront-glass-replacement":
      return "Glass Replacement";
    case "/graffiti-vandalism-cleanup":
      return "Vandalism Cleanup";
    default:
      return pageListLabel(page);
  }
}

/**
 * One-line, name-free tagline for a pillar card so listing grids never echo the
 * card title back to back (e.g. "Storefront Glass Replacement Storefront Glass
 * Replacement handled...").
 */
export function pillarTagline(page: SeoPage): string {
  switch (page.pageSlug) {
    case "/commercial-door-repair":
      return "Doors that drag, bind, or fail to close and lock, repaired as one system rather than a quick patch.";
    case "/storefront-glass-replacement":
      return "Shattered or crazed storefront panes replaced and finished so the install clears inspection.";
    case "/graffiti-vandalism-cleanup":
      return "Tags and paint removed with the right chemistry, without etching the surface.";
    default:
      return "Property response handled across Canada, with a real crew on the phone.";
  }
}

/** Keyword-rich anchor text for internal links (never a generic "click here"). */
export function anchorText(page: SeoPage) {
  return titleCase(page.primaryKeyword);
}

export function pillarAnchor(page: SeoPage) {
  return pageListLabel(page);
}

export function pageLocation(page: SeoPage) {
  if (isCityPage(page)) return cityFromTargetArea(page.targetArea);
  if (page.targetArea.includes("Canada")) return "Canada";
  return provinceFromTargetArea(page.targetArea);
}

export function serviceFamily(page: SeoPage) {
  const slug = toPath(page.pageSlug).replace(/\/+$/, "");
  if (PILLAR_SLUGS.has(slug)) return slug;
  for (const [prefix, family] of FAMILY_RULES) {
    if (slug === prefix || slug.startsWith(prefix)) return family;
  }
  for (const [prefix, family] of CITY_PREFIX_RULES) {
    if (slug.startsWith(prefix)) return family;
  }
  if (slug.includes("door")) return "/commercial-door-repair";
  if (slug.includes("glass")) return "/storefront-glass-replacement";
  if (slug.includes("graffiti") || slug.includes("vandalism")) return "/graffiti-vandalism-cleanup";
  return "/commercial-door-repair";
}

export function bySlug(slug: string) {
  const clean = toPath(slug).replace(/\/+$/, "");
  return SEO_PAGES.find((page) => page.pageSlug === clean) || fallbackPageFromSlug(clean);
}

export function pillarFor(page: SeoPage) {
  return bySlug(serviceFamily(page)) || SERVICE_PILLARS[0];
}

export function cityPagesForPillar(pillar: SeoPage): SeoPage[] {
  return CITY_PAGES.filter((page) => serviceFamily(page) === pillar.pageSlug);
}

/**
 * One representative city page per location, so "Find Your City"-style grids show
 * each city exactly once instead of repeating it once per service (3×).
 */
export function uniqueCityPages(): SeoPage[] {
  const seen = new Set<string>();
  const out: SeoPage[] = [];
  for (const page of CITY_PAGES) {
    const city = cityFromTargetArea(page.targetArea);
    if (seen.has(city)) continue;
    seen.add(city);
    out.push(page);
  }
  return out;
}

export function sameProvincePages(page: SeoPage) {
  if (!isCityPage(page)) return [];
  const prov = provinceFromTargetArea(page.targetArea);
  return CITY_PAGES.filter(
    (item) => item.pageSlug !== page.pageSlug && provinceFromTargetArea(item.targetArea) === prov,
  );
}

export function sameCityPages(page: SeoPage) {
  if (!isCityPage(page)) return [];
  const city = cityFromTargetArea(page.targetArea);
  return CITY_PAGES.filter((item) => item.pageSlug !== page.pageSlug && cityFromTargetArea(item.targetArea) === city);
}

export function supportCityLinks(page: SeoPage, limit = 5) {
  const family = serviceFamily(page);
  const matches = CITY_PAGES.filter((item) => item.pageSlug !== page.pageSlug && serviceFamily(item) === family);
  if (matches.length >= limit) return matches.slice(0, limit);
  const extras = CITY_PAGES.filter(
    (item) => item.pageSlug !== page.pageSlug && !matches.some((match) => match.pageSlug === item.pageSlug),
  );
  return [...matches, ...extras.slice(0, Math.max(0, limit - matches.length))];
}

export function serviceTopicLabel(page: SeoPage) {
  const target = isCityPage(page) || isEmergencyPage(page) || page.pageType === "Service Page" ? pillarFor(page) : page;
  return pageListLabel(target)
    .replace(/\s+Services?$/i, "")
    .replace(/\s+[-–]\s*Canada$/i, "")
    .replace(/\s+Canada$/i, "")
    .replace(/[-–]\s*$/, "")
    .trim();
}

export function buildH1(page: SeoPage) {
  return pageListLabel(page);
}

/** Ordered Home > Services > Pillar > Page breadcrumb trail, reused for schema + visible UI. */
export function breadcrumbTrail(page: SeoPage): Array<{ name: string; path: string }> {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ];
  if (page.pageType === "Service Pillar") {
    trail.push({ name: buildH1(page), path: toPath(page.pageSlug) });
    return trail;
  }
  const pillar = pillarFor(page);
  trail.push({ name: pillarAnchor(pillar), path: toPath(pillar.pageSlug) });
  trail.push({ name: buildH1(page), path: toPath(page.pageSlug) });
  return trail;
}

function fitTitle(base: string, brandSuffix: string): string {
  const min = 50;
  const max = 60;
  let candidate = `${base}${brandSuffix}`;
  if (candidate.length >= min && candidate.length <= max) return candidate;

  if (candidate.length > max) {
    const words = base.split(" ");
    while (words.length > 1 && `${words.join(" ")}${brandSuffix}`.length > max) {
      words.pop();
    }
    candidate = `${words.join(" ")}${brandSuffix}`;
    if (candidate.length <= max) return candidate;
    const hardCut = max - brandSuffix.length;
    return `${base.slice(0, Math.max(hardCut, 1))}${brandSuffix}`;
  }

  const fillers = ["Service", "Canada", "Experts", "Company"];
  let widened = base;
  for (const filler of fillers) {
    if (widened.toLowerCase().includes(filler.toLowerCase())) continue;
    const attempt = `${widened} ${filler}`;
    if (`${attempt}${brandSuffix}`.length <= max) {
      widened = attempt;
      candidate = `${widened}${brandSuffix}`;
      if (candidate.length >= min) return candidate;
    }
  }
  return candidate;
}

export function buildMetaTitle(page: SeoPage): string {
  const brandSuffix = ` | ${SITE_NAME}`;
  const keyword = titleCase(page.primaryKeyword);
  const lower = keyword.toLowerCase();
  let base = keyword;
  if (!isCityPage(page) && !lower.includes("near me") && !lower.includes("canada")) {
    base = `${keyword} Canada`;
  }
  return fitTitle(base, brandSuffix);
}

const MIN_DESC = 150;
const MAX_DESC = 160;

/**
 * Grows the description word by word from a long "filler pool" sentence until the total
 * lands inside [150,160]. Word-boundary cuts are checked in increasing order, so this
 * reliably lands in the target window without truncating mid-word or dropping the CTA.
 */
function fitDescription(opener: string, pool: string, cta: string): string {
  const fixedOpener = /[.!?]$/.test(opener.trim()) ? opener.trim() : `${opener.trim()}.`;
  const words = pool.trim().split(/\s+/);
  const danglingConnectors = new Set(["a", "an", "the", "and", "or", "plus", "with", "since", "for", "to", "in", "of", "so", "is", "are", "we", "that"]);
  let bestCandidate = "";
  let bestDiff = Infinity;
  let fallbackValidButDangling = "";

  for (let i = 1; i <= words.length; i += 1) {
    const lastWord = words[i - 1].replace(/[.,;:]+$/, "").toLowerCase();
    const dangling = danglingConnectors.has(lastWord) && i < words.length;
    let middle = words.slice(0, i).join(" ").replace(/[,;:\s]+$/, "");
    if (!/[.!?]$/.test(middle)) middle += ".";
    const candidate = `${fixedOpener} ${middle} ${cta}`.replace(/\s+/g, " ").trim();
    const len = candidate.length;
    if (len > MAX_DESC) break;
    if (len >= MIN_DESC) {
      if (!dangling) return candidate;
      fallbackValidButDangling = candidate;
      continue;
    }
    if (dangling) continue;
    const diff = MIN_DESC - len;
    if (diff < bestDiff) {
      bestDiff = diff;
      bestCandidate = candidate;
    }
  }

  return fallbackValidButDangling || bestCandidate || `${fixedOpener} ${cta}`.replace(/\s+/g, " ").trim();
}

export function buildMetaDescription(page: SeoPage): string {
  const location = pageLocation(page);
  const meta = serviceMetaFor(serviceKeyFor(page));
  const opener = isEmergencyPage(page)
    ? `Need ${page.primaryKeyword} in ${location} today? We dispatch fast.`
    : `Book ${page.primaryKeyword} in ${location}.`;
  const cta = `Call ${PHONE_DISPLAY} now.`;
  const pool = `We work with ${meta.audiences[0]}, ${meta.audiences[1]}, ${meta.audiences[2]}, ${meta.audiences[3]} across the region. Fast same-week scheduling stays available through the whole year. Proper removal of damaged materials, inspection and insurance paperwork, recurring maintenance routes, multi-site accounts, and seasonal storm damage are all handled for you from the first call onward.`;
  return fitDescription(opener, pool, cta);
}

function serviceKeyFor(page: SeoPage): string {
  if (page.pageType === "Emergency Landing") return page.pageSlug;
  return serviceFamily(page);
}

/** Deterministic pseudo-random pick so the same page always renders the same variant. */
function pick<T>(list: T[], seed: string, salt: string): T {
  return list[hashIndex(`${seed}:${salt}`, list.length)];
}

export function localFacts(page: SeoPage): Array<{ label: string; value: string }> {
  const city = cityFromTargetArea(page.targetArea);
  const facts = cityFacts(city);
  return [
    { label: "Population", value: facts.population },
    { label: "Local landmark", value: facts.landmark },
    { label: "Area served", value: facts.neighbourhood },
    { label: "Ground conditions", value: facts.climate },
  ];
}

/** True when the authored H1 already contains the exact primary keyword phrase. */
function h1HasKeyword(page: SeoPage): boolean {
  return buildH1(page).toLowerCase().includes(page.primaryKeyword.toLowerCase().trim());
}

export function introText(page: SeoPage): string {
  const meta = serviceMetaFor(serviceKeyFor(page));
  const location = pageLocation(page);
  const keyword = page.primaryKeyword;
  // The exact primary keyword phrase should appear once across the page. If the H1
  // already holds it, the intro opener switches to a keyword-free, location-led variant.
  const needsKeyword = !h1HasKeyword(page);

  if (isCityPage(page)) {
    const city = cityFromTargetArea(page.targetArea);
    const facts = cityFacts(city);
    const pillar = pillarFor(page);
    const scopeLine = `you get ${serviceTopicLabel(pillar).toLowerCase()} handled on a schedule that fits how ${city} actually runs`;
    const opener = needsKeyword ? `With ${titleCase(keyword)}, ${scopeLine}` : `In ${city}, ${scopeLine}`;
    // Vary the middle and closing sentences per city+service so no two city pages
    // read as a copy-paste with the city name swapped in.
    const middle = pick(
      [
        `${city} is home to ${facts.population}, and if your property sits near ${facts.neighbourhood} you already know ${facts.climate} changes how often a door, window or facade needs attention`,
        `Around ${facts.neighbourhood}, ${facts.population} and ${facts.climate} keep door, glass and facade work coming through the year, especially across ${facts.region}`,
        `With ${facts.population} spread through ${facts.region}, ${facts.climate} means doors, glass and storefronts take real punishment near ${facts.neighbourhood}`,
      ],
      `${city}:${serviceFamily(page)}`,
      "intro",
    );
    const closer = pick(
      [
        `Instead of a one-size national route, your visits across ${city} are timed around your access, your opening hours, and the fact that ${meta.differentiator}. You end up with a plan that matches your site, not a template pulled from another market.`,
        `Rather than a generic national schedule, your visits in ${city} are built around your access, your hours, and the fact that ${meta.differentiator}. The result is a plan shaped for your site, not a template pulled from another market.`,
      ],
      `${city}:${serviceFamily(page)}`,
      "closer",
    );
    return `${opener}. ${middle}. ${closer}`;
  }

  if (isEmergencyPage(page)) {
    const opener = needsKeyword
      ? `When you search for ${keyword}, you need one thing: a crew on site now, not a callback next week`
      : `When a door is broken, a window is shattered, or a storefront is tagged, you need one thing: a crew on site now, not a callback next week`;
    return `${opener}. We keep technicians on standby for ${meta.audiences[0]} and ${meta.audiences[1]} across ${location}, and ${meta.differentiator}. Most of the calls we take are about ${meta.painPoint}, so when you reach us we focus on your address, what is damaged, and how fast we can get there. From there, ${meta.synonym} usually happens the same day, with the site secured and any paperwork sorted before we leave.`;
  }

  if (page.pageType === "Service Pillar") {
    const opener = needsKeyword ? `${titleCase(keyword)} is for you if you run` : `You are in the right place if you run`;
    return `${opener} one of ${meta.audiences[0]}, ${meta.audiences[1]}, ${meta.audiences[2]}, or ${meta.audiences[3]} anywhere across Canada. Every visit centres on ${meta.items[0]} and ${meta.items[1]}, and ${meta.differentiator}. Most people call us because ${meta.painPoint} kept happening with a previous contractor, and the fix usually starts with a short conversation about your access, your opening hours, and how soon you need a crew. Below, you will see exactly what a visit covers, how your first appointment gets booked, and how ${meta.synonym} adapts as your site changes through the year.`;
  }

  // Service Page (near-me intent)
  const opener = needsKeyword ? `${titleCase(keyword)} is built around` : `Your service is built around`;
  return `${opener} the day-to-day reality of running ${meta.audiences[0]} and ${meta.audiences[1]}, where ${meta.painPoint} is the exact problem you want gone. Every visit covers ${meta.items[0]} and ${meta.items[1]} on a schedule you control, and ${meta.differentiator}. You will see who this fits, how your first visit gets booked, and what to ask before you sign with any contractor. If you run ${meta.audiences[2]} or ${meta.audiences[3]}, you get the same approach with only small changes to timing and access.`;
}

export function planningText(page: SeoPage): string {
  const meta = serviceMetaFor(serviceKeyFor(page));
  const location = pageLocation(page);
  if (isCityPage(page)) {
    const city = cityFromTargetArea(page.targetArea);
    return `When you book your first visit in ${city}, we start with a quick rundown of your access, what is damaged or overdue, and what is going wrong today. Because ${meta.differentiator}, that first visit usually settles whether you need a straight repair, a full replacement, or a recurring maintenance route. Getting ${meta.painPoint} off your plate is the whole point, and you are almost always quoted before the crew leaves your site.`;
  }
  if (isEmergencyPage(page)) {
    return `On an emergency call, we skip the slow proposal and get to the essentials: your address, how the crew can reach the opening, and what is damaged right now. Because ${meta.differentiator}, dispatch can usually give you a real arrival window on the first call across ${location}. Securing ${meta.painPoint} fast is the only goal, and we handle the barrier, the cleanup, and any required paperwork before we pull away.`;
  }
  return `When you plan your service, we start with your current traffic, how often ${meta.items[0]} needs attention, and whether ${location} access fits a standard crew or needs a ladder or lift. Because ${meta.differentiator}, you are matched to the right crew on the first call instead of waiting on a drawn-out proposal. Expect one quick follow-up after the first visit once your real numbers are clear, and know that small schedule tweaks then are normal, not a sign anything was set up wrong.`;
}

const STEP_TITLES = ["Intake Call", "Site & Access Check", "On-Site Work", "Sign-Off & Paperwork"];

export function processSteps(page: SeoPage) {
  const meta = serviceMetaFor(serviceKeyFor(page));
  const location = pageLocation(page);
  return [
    {
      title: STEP_TITLES[0],
      text: `Tell us your site type, roughly what is happening with ${meta.items[0]}, and whether you need ${location} service today or on a set schedule.`,
    },
    {
      title: STEP_TITLES[1],
      text: `We confirm how the crew can reach the storefront, where the damaged door, window or surface sits, and whether ${meta.painPoint} has been a recurring problem, so the crew arrives with the right gear.`,
    },
    {
      title: STEP_TITLES[2],
      text: `The crew handles ${meta.items[1]} and the rest of the job on site, since ${meta.differentiator}.`,
    },
    {
      title: STEP_TITLES[3],
      text: `We haul away the old materials, hand you any inspection or insurance paperwork you need, and set your next visit if you want one. After that, changes are a quick call, not a new setup.`,
    },
  ];
}

export function keyTakeaways(page: SeoPage): string[] {
  const meta = serviceMetaFor(serviceKeyFor(page));
  const location = pageLocation(page);
  if (isCityPage(page)) {
    const city = cityFromTargetArea(page.targetArea);
    return [
      `Whether you need a one-time visit or a recurring maintenance route in ${city}.`,
      `How your ${meta.items[0]} and ${meta.items[1]} should be handled for your site.`,
      `A visit window that works with your access and your hours.`,
      `What it takes to keep ${meta.painPoint} from coming back once you are set up.`,
      `Which other ${city} sites run the same schedule, and why it works for them.`,
    ];
  }
  return [
    `Whether this fits you better than a general contractor if you run ${meta.audiences[0]} or ${meta.audiences[1]}.`,
    `How ${meta.items[0]} gets handled, secured, and documented across ${location}.`,
    `Why ${meta.differentiator}, and what that means for a cleaner, longer-lasting fix.`,
    `What usually causes ${meta.painPoint}, and how a proper visit keeps it away.`,
    `When it makes sense to move from a one-time call to a recurring schedule.`,
  ];
}

/** Pillar-only deep dive that adds substantive, non-duplicated detail so pillar pages clear an 800-word floor. */
export function pillarDeepDive(page: SeoPage): { heading: string; paragraphs: string[] } | null {
  if (page.pageType !== "Service Pillar") return null;
  const meta = serviceMetaFor(serviceKeyFor(page));
  return {
    heading: "What A Standard Visit Actually Covers",
    paragraphs: [
      `A visit starts with ${meta.items[0]}, then moves to ${meta.items[1]} and ${meta.items[2]}, scaled to your site rather than a generic checklist. If you run ${meta.audiences[0]}, the job looks different than it does for ${meta.audiences[2]}, so what the crew brings and how long they stay reflects the site in front of them, not a flat template.`,
      `${titleCase(meta.differentiator)}. That matters most if you have already dealt with ${meta.painPoint}, because it is usually a scheduling or access problem rather than a one-off fluke. Fixing the routine, not just clearing today's mess, is what tends to keep it solved.`,
      `If you manage more than one location, you can run every site through a single account, with each address on its own visit frequency instead of one blanket schedule. When your traffic or vacancy changes, adjusting a site is a quick call, not a renegotiated contract, and every visit is logged so your records stay clean for inspectors, insurers, or head office.`,
      `You usually get a crew on site the same week you call, since teams already run routes through most regions we cover. When a spike, a storm, or an emergency hits, we can absorb it without reworking your whole account, because ${meta.synonym} is built to flex around your site rather than lock you into a fixed cadence for the year.`,
    ],
  };
}

export function faqsFor(page: SeoPage) {
  const meta = serviceMetaFor(serviceKeyFor(page));
  const location = pageLocation(page);

  if (isCityPage(page)) {
    const city = cityFromTargetArea(page.targetArea);
    const facts = cityFacts(city);
    const seed = `${city}:${serviceFamily(page)}`;
    const first = pick(
      [
        {
          q: `What should I have ready before I call?`,
          a: `Have a rough idea of what is damaged or overdue, where the crew can park or set a ladder, and whether you are near ${facts.neighbourhood} or elsewhere in ${city}. That is enough for us to give you a first quote.`,
        },
        {
          q: `What do I need to know before my first visit?`,
          a: `Roughly what is damaged, how the crew can reach the storefront, and whether you are near ${facts.neighbourhood} or elsewhere in ${city}. That is enough for us to quote the job.`,
        },
      ],
      seed,
      "faq1",
    );
    const second = pick(
      [
        {
          q: `Can you handle more than one site?`,
          a: `Yes. Multi-site accounts across ${location} are common, and we schedule each address on its own frequency instead of forcing every location onto the same route.`,
        },
        {
          q: `Do you service multiple locations on one account?`,
          a: `Yes. We run multi-site accounts across ${location}, scheduling each address on its own frequency rather than one blanket route.`,
        },
      ],
      seed,
      "faq2",
    );
    const third = pick(
      [
        {
          q: `Do the seasons affect scheduling here?`,
          a: `${city} deals with ${facts.climate}, so winter access sometimes needs a little extra lead time. We build that into your visit window up front so you are not left with a missed appointment later.`,
        },
        {
          q: `How do winter conditions affect visits in ${city}?`,
          a: `${city} sees ${facts.climate}, so winter visits can need a little extra lead time for access. We factor that into your window up front so you are never left with a missed appointment.`,
        },
      ],
      seed,
      "faq3",
    );
    return [first, second, third];
  }

  if (isEmergencyPage(page)) {
    return [
      {
        q: `How fast can you actually get here?`,
        a: `On most emergency calls across ${location}, we can give you a real arrival window on the phone and roll a crew the same day, often within hours depending on where you are.`,
      },
      {
        q: `Do you take after-hours and weekend calls?`,
        a: `Yes. ${meta.painPoint.charAt(0).toUpperCase() + meta.painPoint.slice(1)} rarely waits for business hours, so we keep crews available evenings and weekends.`,
      },
      {
        q: `What do you need from me on the call?`,
        a: `Your address, how the crew can reach the opening, and what is damaged. From there we handle ${meta.synonym}, the securing, and any paperwork before we leave.`,
      },
    ];
  }

  if (page.pageType === "Service Pillar") {
    return [
      {
        q: `Is this right for my site?`,
        a: `If you run ${meta.audiences[0]}, ${meta.audiences[1]}, ${meta.audiences[2]}, or ${meta.audiences[3]}, yes. We work with everyone from single storefronts to multi-site operators.`,
      },
      {
        q: `What does a standard visit include?`,
        a: `We handle ${meta.items[0]} and ${meta.items[1]}, sized to your site and documented so your records stay clean.`,
      },
      {
        q: `How are you different from a general contractor?`,
        a: `${titleCase(meta.differentiator)}. That is the real difference versus a contractor who patches the symptom and moves on.`,
      },
      {
        q: `Can you set up a recurring schedule?`,
        a: `Yes. Once we know your volume, we can put you on a visit frequency that keeps ${meta.painPoint} from ever happening again.`,
      },
      {
        q: `Do you handle disposal and paperwork?`,
        a: `Always. We haul away the old materials to the right facility and hand you any inspection or compliance record you need.`,
      },
    ];
  }

  return [
    {
      q: `Is this a good fit for me?`,
      a: `Yes, if you run ${meta.audiences[0]}, ${meta.audiences[1]}, or something similar. The visit is built around ${meta.items[0]}, not a generic once-over.`,
    },
    {
      q: `How is my visit scheduled?`,
      a: `We set your visit around your access and your hours, because ${meta.differentiator}, which works far better than a fixed slot dropped on every site.`,
    },
    {
      q: `What if the problem comes back?`,
      a: `Call us and we will look at the routine, not just the symptom. A proper visit and the right frequency is what keeps ${meta.painPoint} away for good.`,
    },
  ];
}

function fallbackPageType(slug: string) {
  const clean = toPath(slug).replace(/\/+$/, "");
  if (PILLAR_SLUGS.has(clean)) return "Service Pillar";
  if (clean.startsWith("/emergency-")) return "Emergency Landing";
  if (CITY_PREFIX_RULES.some(([prefix]) => clean.startsWith(prefix))) return "City Service Page";
  return "Service Page";
}

function fallbackSearchIntent(pageType: string) {
  if (pageType === "City Service Page" || pageType === "Emergency Landing") return "Local Transactional";
  return "Local Commercial";
}

function fallbackPageFromSlug(slug: string): SeoPage {
  const clean = toPath(slug).replace(/\/+$/, "");
  const pageType = fallbackPageType(clean);
  const keyword = clean.replace(/^\//, "").replace(/-/g, " ");
  const city = cityFromSlug(clean);
  const pageTitle = city
    ? `${titleCase(keyword.replace(new RegExp(`\\b${city.toLowerCase()}\\b`, "g"), "").replace(/\s+/g, " ").trim())} in ${city}`
    : titleCase(keyword);

  return {
    id: clean,
    pageTitle,
    pageSlug: clean,
    primaryKeyword: keyword,
    secondaryKeywords: `${keyword} near me, ${keyword} service, ${keyword} company`,
    targetArea: city ? `${city}, ON` : "Canada (National)",
    pageType,
    searchIntent: fallbackSearchIntent(pageType),
    volumePerMonth: "40.0",
    keywordDifficulty: "0.0",
    cpc: "150.0",
    priority: pageType === "Service Pillar" ? "Top Priority" : "Medium",
    ctaStrategy: `Call ${PHONE_DISPLAY}`,
  } as SeoPage;
}

function cityFromSlug(slug: string) {
  const prefix = CITY_PREFIX_RULES.find(([cityPrefix]) => slug.startsWith(cityPrefix));
  if (!prefix) return null;
  return titleCase(slug.slice(prefix[0].length).replace(/-/g, " "));
}

// Re-exported so callers can vary presentation deterministically per page without
// reaching into the service-meta module directly.
export { pick };
