// Concrete, service-specific detail used to generate genuinely different copy per
// service family instead of dropping one keyword into an otherwise identical template.
// Everything here is written to read like a crew explaining the work to a customer,
// not like keyword filler.
export type ServiceMeta = {
  audiences: string[];
  items: string[];
  differentiator: string;
  painPoint: string;
  synonym: string;
};

export const SERVICE_META: Record<string, ServiceMeta> = {
  "/commercial-door-repair": {
    audiences: ["retail storefronts", "restaurants and cafés", "offices and medical clinics", "strip malls and plazas"],
    items: ["the door hardware and hinges", "the frame and threshold", "the auto-opener and access controls"],
    differentiator: "we repair the frame, hardware and auto-opener as one system so nothing drags or binds afterwards",
    painPoint: "a door that drags, binds, or fails to close and lock",
    synonym: "the door service",
  },
  "/storefront-glass-replacement": {
    audiences: ["retail storefronts", "restaurants and cafés", "banks and credit unions", "office and medical buildings"],
    items: ["the shattered pane and frame", "the glazing bead and seal", "the laminated or tempered unit"],
    differentiator: "we match the glass type and finish the install so it clears inspection the first time",
    painPoint: "a broken or crazed storefront window",
    synonym: "the glass replacement",
  },
  "/graffiti-vandalism-cleanup": {
    audiences: ["retail storefronts", "banks and ATMs", "transit stops and municipal buildings", "apartment and condo entrances"],
    items: ["the paint and ink from the surface", "the staining and etch marks", "the protective coating afterwards"],
    differentiator: "we test the surface first and use the right chemistry so tags lift without etching the substrate",
    painPoint: "a tagged storefront that makes your property look neglected",
    synonym: "the cleanup",
  },
  "/emergency-board-up": {
    audiences: ["storefront owners", "property managers", "landlords", "security and insurance contacts"],
    items: ["the broken door or window", "the frame damage around it", "the temporary barrier"],
    differentiator: "we measure, cut and fasten a proper plywood barrier and log it for your insurance",
    painPoint: "a break-in or storm leaving your property open to the street",
    synonym: "the board-up",
  },
  "/emergency-commercial-door-repair": {
    audiences: ["retail storefronts", "restaurants and cafés", "office buildings", "banks and pharmacies"],
    items: ["a door that will not close or lock", "a sprung or damaged frame", "an auto-opener that is down"],
    differentiator: "we roll a technician the same night so your storefront is locked and secure before you leave",
    painPoint: "a door stuck open with your site unsecured right now",
    synonym: "the emergency door fix",
  },
  "/emergency-storefront-glass-replacement": {
    audiences: ["retail storefronts", "restaurants and cafés", "banks and credit unions", "office buildings"],
    items: ["a shattered storefront pane", "a cracked frame or sill", "glass blocking a public walkway"],
    differentiator: "we secure the opening immediately and install the replacement pane so you are back in business fast",
    painPoint: "a broken window leaving your store open to the street",
    synonym: "the emergency glass response",
  },
  "/emergency-vandalism-cleanup": {
    audiences: ["retail storefronts", "banks and ATMs", "transit and municipal buildings", "apartment and condo entrances"],
    items: ["fresh paint and tagging", "litter and debris from the incident", "the stained surface"],
    differentiator: "we arrive with the right chemistry for the surface and get the tag off before it sets",
    painPoint: "a fresh tag on your storefront at the worst possible time",
    synonym: "the urgent cleanup",
  },
};

const FALLBACK_META: ServiceMeta = SERVICE_META["/commercial-door-repair"];

export function serviceMetaFor(key: string): ServiceMeta {
  return SERVICE_META[key] || FALLBACK_META;
}

export function hashIndex(value: string, mod: number) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash % mod;
}
