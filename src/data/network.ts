/**
 * Single source of truth for the Monogram Network structure (spec item S9).
 * Adding an office or service here propagates to the nav, footer, offices
 * page, service pages, and capture routing.
 */

export interface Office {
  slug: string;
  name: string;
  /** Cities for the footer KW Locations column (all seven, spec G11) */
  cities: string[];
  /** Display line under the name */
  localities: string;
  /** Emotional/geographic tagline (pending N1 direction from client) */
  tagline: string;
  /** External brokerage site — pending real URLs */
  siteUrl?: string;
  /** distinct crop/hue treatment of the shared aerial */
  imgClass: string;
  /**
   * Round two (R2-Q15 / Pete): Illinois compliance does not apply to the
   * umbrella site, but one click in — every office page — must show the
   * brokerage name, address and designated managing broker, near the top.
   * Filled 2026-10-05 from the client's "Market Center Stats" doc.
   */
  address?: string[];
  broker?: string;
  /** Lifetime units closed (client doc, Oct 2026) — equals families served */
  units?: number;
  /** Lifetime volume, display form, as supplied by the client */
  volume?: string;
}

export const offices: Office[] = [
  {
    slug: "kw-innovate",
    name: "KW Innovate",
    cities: ["Aurora"],
    localities: "Aurora",
    tagline: "Where new chapters begin in the Fox Valley.",
    imgClass: "object-[center_30%]",
    address: ["2430 W Indian Trail Rd, Ste 203", "Aurora, IL 60506"],
    broker: "Amy Fichtel-Schwartz",
    units: 3260,
    volume: "$970M",
  },
  {
    slug: "kw-experience",
    name: "KW Experience",
    cities: ["Downers Grove"],
    localities: "Downers Grove",
    tagline: "Guidance earned one family at a time.",
    imgClass: "object-[center_70%] hue-rotate-15",
    address: ["5122 Main St, Ste A", "Downers Grove, IL 60515"],
    broker: "Kathy Nosek",
    units: 6313,
    volume: "$2.4B",
  },
  {
    slug: "kw-premiere-properties",
    name: "KW Premiere Properties",
    cities: ["Elmhurst", "Glen Ellyn", "Wheaton"],
    localities: "Elmhurst · Glen Ellyn · Wheaton",
    tagline: "The western suburbs' premier addresses.",
    imgClass: "object-[left_center] saturate-[0.75]",
    address: ["218 W Willow Ave", "Wheaton, IL 60187"],
    broker: "Cynthia Windeler",
    // Client doc: all three business centers combined
    units: 14096,
    volume: "$5.5B",
  },
  {
    slug: "kw-infinity",
    name: "KW Infinity",
    cities: ["Naperville", "Plainfield"],
    localities: "Naperville · Plainfield",
    tagline: "Boundless care across Naperville & Plainfield.",
    imgClass: "object-[right_center] hue-rotate-[340deg]",
    address: ["608 S Washington St, Ste 100", "Naperville, IL 60540"],
    broker: "Jack Kelley",
    // Client doc: both business centers combined
    units: 27590,
    volume: "$8.7B",
  },
];

/**
 * Network lifetime totals — client's "Market Center Stats" doc (Oct 2026).
 * Families served 51,259 (client asked to show "over 50k"); combined
 * volume stated as "over $20B". Note for the client: the four offices'
 * volumes sum to ~$17.6B, so the $20B figure is theirs to stand behind.
 */
export const NETWORK_STATS = {
  familiesServed: 51259,
  familiesServedDisplay: "50,000+",
  combinedVolume: 20,
  combinedVolumeDisplay: "$20B+",
} as const;

export const getOfficeBySlug = (slug: string): Office | undefined =>
  offices.find((o) => o.slug === slug);

/* ------------------------------------------------------------------ */

export interface Service {
  slug: string;
  /** Generic label shown in nav/top bar (spec G2) */
  navLabel: string;
  /** The Monogram company behind the service — revealed on the page */
  partner: string;
  /** One-line description used across pages */
  line: string;
  /** External partner website, opened in a new tab (spec S2/S3) */
  externalUrl?: string;
  externalLabel?: string;
  comingSoon?: boolean;
  image?: string;
  /** Capture intent options (S6: mortgage gains Refinance) */
  intents?: string[];
  /** Where this service's leads go (R2-Q13) — also the displayed main contact */
  leadEmail?: string;
}

export const services: Service[] = [
  {
    slug: "home-services",
    navLabel: "Home Services",
    partner: "Monogram Home Services",
    line: "A full home-services program is in development — arriving soon.",
    comingSoon: true,
  },
  {
    slug: "title",
    navLabel: "Title",
    partner: "Summit Title",
    line: "Title search, insurance, escrow and settlement — a closing table that feels like a milestone, not a hurdle.",
    externalUrl: "https://summittitleillinois.com",
    externalLabel: "summittitleillinois.com",
    image: "/service-title.jpg",
    leadEmail: "title@monogram.network",
  },
  {
    slug: "insurance",
    navLabel: "Home & Auto Insurance",
    partner: "Prairie Home & Auto",
    line: "Home, auto, and the life between them — protected by advisors who already know your story.",
    externalUrl: "https://prairieha.com",
    externalLabel: "prairieha.com",
    image: "/service-insurance.jpg",
    leadEmail: "insurance@monogram.network",
  },
  {
    slug: "mortgage",
    navLabel: "Mortgage Solutions",
    partner: "Mutual of Omaha Mortgage",
    line: "Financing shaped around your life, not a rate sheet — with a human on the phone.",
    image: "/service-mortgage.jpg",
    intents: ["Buying", "Selling", "Both", "Refinance", "Just exploring"],
    leadEmail: "mortgage@monogram.network",
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

/* ------------------------------------------------------------------ */

/**
 * Round two (R2-Q10): every Monogram address lives on monogram.network —
 * monogramnetwork.com is not available to the client. The generic mailbox's
 * local part ("hello@") is still ours; Maria is sending the real one.
 */
export const NETWORK_DOMAIN = "monogram.network";
export const NETWORK_EMAIL = `hello@${NETWORK_DOMAIN}`;
export const NETWORK_EMAIL_CONFIRMED = false;

/**
 * Round two (R2-Q13): captured leads for the ancillary services route by
 * email to the service mailbox. Agent / recruiting leads should sync to
 * KW Command — approach pending (see the round-two questions doc).
 */
export const LEAD_ROUTING = {
  title: `title@${NETWORK_DOMAIN}`,
  insurance: `insurance@${NETWORK_DOMAIN}`,
  mortgage: `mortgage@${NETWORK_DOMAIN}`,
  agent: "KW Command (sync method pending)",
} as const;

/** Round two (Pete): parent-company line in the footer crawl. */
export const PARENT_COMPANY = "Onward Management, LLC";

/**
 * Round two (R2-Q15): Jack Kelly's answer — the umbrella site does NOT need
 * to display a brokerage name or address, so the header co-brand (G4) and
 * footer street address (G14) are both off. Office pages carry them.
 */
export const SHOW_UMBRELLA_KW_COBRAND = false;

/** Round two (R2-Q4/Q5): listing thresholds as dictated by Maria. */
export const LUXURY_FLOOR = 750_000;
export const FEATURED_PRICE_FLOOR = 550_000;
export const FEATURED_ROTATION_HOURS = 6;

/**
 * Footer street address is held behind this flag pending the Illinois
 * compliance answer (spec Q5 / G14). Flip to true and fill the address
 * when Jack Kelly's answer comes back.
 */
export const SHOW_FOOTER_ADDRESS = false;
export const FOOTER_ADDRESS: string[] = [];

/** Careers page lives in-app until careers.monogram.network DNS is pointed (N2 / R2-Q16). */
export const CAREERS_PATH = "/careers";
export const CAREERS_HOST = `careers.${NETWORK_DOMAIN}`;
/** Low-key secondary link for people who want the Keller Williams story (R2-Q16). */
export const EXPLORE_KW_URL = "https://thrive.kw.com";
