import { SeoPage, isCityPage, pageLocation, serviceFamily, serviceTopicLabel } from "@/lib/site-data";

export type SiteImage = {
  src: string;
  width: number;
  height: number;
};

// Pexels CDN URLs. Each photo was verified against its description so the imagery
// matches the service context (doors, storefront glass, graffiti cleanup, night
// response) instead of generic or unrelated stock.
const pexels = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1000&fit=crop&dpr=1`;

const IMG = {
  storefront: { src: pexels("11077632"), width: 1600, height: 1000 },
  crewFacade: { src: pexels("18479261"), width: 1600, height: 1000 },
  glassMetalDoors: { src: pexels("7638806"), width: 1600, height: 1000 },
  securityDoor: { src: pexels("6206426"), width: 1600, height: 1000 },
  glassCleaner: { src: pexels("37440103"), width: 1600, height: 1000 },
  glassEntrance: { src: pexels("33903294"), width: 1600, height: 1000 },
  graffitiCleanup: { src: pexels("10133570"), width: 1600, height: 1000 },
  graffitiWall: { src: pexels("26424724"), width: 1600, height: 1000 },
  nightAlley: { src: pexels("26732100"), width: 1600, height: 1000 },
  boardedWindow: { src: pexels("29127440"), width: 1600, height: 1000 },
} as const;

type FamilyImageSet = { hero: SiteImage; secondary: SiteImage; subject: string };

const FAMILY_IMAGES: Record<string, FamilyImageSet> = {
  "/commercial-door-repair": { hero: IMG.glassMetalDoors, secondary: IMG.securityDoor, subject: "glass and metal commercial doors of an urban building" },
  "/storefront-glass-replacement": { hero: IMG.glassCleaner, secondary: IMG.glassEntrance, subject: "a storefront window being serviced" },
  "/graffiti-vandalism-cleanup": { hero: IMG.graffitiCleanup, secondary: IMG.graffitiWall, subject: "workers cleaning graffiti off a storefront facade" },
};

const EMERGENCY_IMAGES: Record<string, FamilyImageSet> = {
  "/emergency-board-up": { hero: IMG.nightAlley, secondary: IMG.boardedWindow, subject: "a boarded-up storefront window secured after damage" },
  "/emergency-commercial-door-repair": { hero: IMG.nightAlley, secondary: IMG.securityDoor, subject: "an emergency commercial door repair crew responding" },
  "/emergency-storefront-glass-replacement": { hero: IMG.nightAlley, secondary: IMG.glassCleaner, subject: "an emergency storefront glass replacement at night" },
  "/emergency-vandalism-cleanup": { hero: IMG.nightAlley, secondary: IMG.graffitiCleanup, subject: "an emergency vandalism cleanup crew on site" },
};

const FALLBACK_SET: FamilyImageSet = FAMILY_IMAGES["/commercial-door-repair"];

function baseSetFor(page: SeoPage): FamilyImageSet {
  if (EMERGENCY_IMAGES[page.pageSlug]) return EMERGENCY_IMAGES[page.pageSlug];
  const family = serviceFamily(page);
  return FAMILY_IMAGES[family] || FALLBACK_SET;
}

export function heroImageFor(page: SeoPage): { image: SiteImage; alt: string } {
  const set = baseSetFor(page);
  const topic = serviceTopicLabel(page);
  const location = pageLocation(page);
  const alt = isCityPage(page)
    ? `${set.subject}, representing ${topic.toLowerCase()} service in ${location}`
    : `${set.subject}, representing ${topic.toLowerCase()} service across ${location}`;
  return { image: set.hero, alt };
}

export function secondaryImageFor(page: SeoPage): { image: SiteImage; alt: string } {
  const set = baseSetFor(page);
  const location = pageLocation(page);
  const alt = `${set.subject}, on a service call in ${location}`;
  return { image: set.secondary, alt };
}

/** Hero image for the homepage. */
export const HOME_HERO: { image: SiteImage; alt: string } = {
  image: IMG.storefront,
  alt: "An elegant storefront with large glass panels, ready for door, glass and vandalism response in Canada",
};

/** Banner image for the services index page. */
export const SERVICES_HERO: { image: SiteImage; alt: string } = {
  image: IMG.crewFacade,
  alt: "A SecureFront Repair crew working on a commercial building facade",
};

/** Small card image for a service pillar, used in listing grids. */
export function pillarCardImage(slug: string): { image: SiteImage; alt: string } {
  const set = FAMILY_IMAGES[slug] || FALLBACK_SET;
  return { image: set.hero, alt: `${set.subject}, illustrating the service` };
}
