import { FEATURED_PRICE_FLOOR, FEATURED_ROTATION_HOURS, LUXURY_FLOOR } from "@/data/network";

export type ListingStatus =
  | "For Sale"
  | "New"
  | "Active Under Contract"
  | "Sold"
  | "For Sale · LUXE";

export type PropertyType = "Single Family" | "Condo/Loft" | "Estate" | "Commercial";

/** KW division badge (R2-Q4): Luxury is derived from price; Commercial is flagged. */
export type ListingDivision = "KW Luxury" | "KW Commercial";

export interface Listing {
  id: number;
  slug: string;
  price: number;
  address: string;
  city: string;
  state: string;
  beds: number;
  baths: number;
  sqft: number;
  status: ListingStatus;
  image: string;
  type: PropertyType;
  /** Short editorial line in the Monogram voice */
  story: string;
  /** Originating office slug (spec H6/P1) — assigned by city until the IDX feed lands */
  office: string;
  /** Commercial listing (R2-Q4) — badge on the card; from the IDX feed at launch */
  commercial?: boolean;
}

/**
 * NOTE (spec Q4/H14): every record in this file is MOCKUP DATA — nothing
 * syndicates from anywhere yet. At launch, listings come from the IDX feed
 * across all four offices and this file goes away.
 */

const officeByCity: Record<string, string> = {
  Aurora: "kw-innovate",
  Geneva: "kw-innovate",
  "St. Charles": "kw-innovate",
  "Downers Grove": "kw-experience",
  Elmhurst: "kw-premiere-properties",
  "Glen Ellyn": "kw-premiere-properties",
  Wheaton: "kw-premiere-properties",
  Naperville: "kw-infinity",
  Plainfield: "kw-infinity",
};

const rawListings: Omit<Listing, "office">[] = [
  {
    id: 1,
    slug: "farmhouse-on-fox-bend",
    price: 689000,
    address: "1420 Fox Bend Ln",
    city: "Aurora",
    state: "IL",
    beds: 4,
    baths: 3.5,
    sqft: 3120,
    status: "New",
    image: "/listing-01.jpg",
    type: "Single Family",
    story:
      "A modern farmhouse where black-framed windows pour morning light across white oak floors — built for slow Sundays and full tables.",
  },
  {
    id: 2,
    slug: "georgian-on-river-street",
    price: 565000,
    address: "88 River St",
    city: "Geneva",
    state: "IL",
    beds: 4,
    baths: 2.5,
    sqft: 2860,
    status: "For Sale",
    image: "/listing-02.jpg",
    type: "Single Family",
    story:
      "Classic Georgian symmetry a short walk from the river — a home that has hosted generations and is ready for yours.",
  },
  {
    id: 3,
    slug: "craftsman-on-prairie-ave",
    price: 385000,
    address: "412 Prairie Ave",
    city: "Downers Grove",
    state: "IL",
    beds: 3,
    baths: 2,
    sqft: 1740,
    status: "For Sale",
    image: "/listing-03.jpg",
    type: "Single Family",
    story:
      "A sage-sided craftsman bungalow with a porch made for evening conversations — honest bones, warmly kept.",
  },
  {
    id: 4,
    slug: "french-country-estate",
    price: 925000,
    address: "27W310 Stonebridge Ct",
    city: "Naperville",
    state: "IL",
    beds: 5,
    baths: 4.5,
    sqft: 4650,
    status: "For Sale",
    image: "/listing-04.jpg",
    type: "Single Family",
    story:
      "Stone and stucco beneath climbing ivy — French country calm on one of Naperville's quietest cul-de-sacs.",
  },
  {
    id: 5,
    slug: "midcentury-ranch",
    price: 429000,
    address: "1550 Nantucket Dr",
    city: "Wheaton",
    state: "IL",
    beds: 3,
    baths: 2,
    sqft: 1980,
    status: "Active Under Contract",
    image: "/listing-05.jpg",
    type: "Single Family",
    story:
      "Low roofline, long sightlines — a mid-century ranch that proves good design never stops feeling current.",
  },
  {
    id: 6,
    slug: "cedar-modern-new-build",
    price: 745000,
    address: "900 Innovation Pkwy",
    city: "Aurora",
    state: "IL",
    beds: 4,
    baths: 3,
    sqft: 2940,
    status: "New",
    image: "/listing-06.jpg",
    type: "Single Family",
    story:
      "Warm cedar against crisp modern lines — new construction with nothing left to do but move in and begin.",
  },
  {
    id: 7,
    slug: "victorian-on-walnut",
    price: 495000,
    address: "33 Walnut St",
    city: "St. Charles",
    state: "IL",
    beds: 4,
    baths: 2.5,
    sqft: 2610,
    status: "For Sale",
    image: "/listing-07.jpg",
    type: "Single Family",
    story:
      "A wraparound porch Victorian in the heart of St. Charles — the kind of home the whole street is proud of.",
  },
  {
    id: 8,
    slug: "tudor-on-crescent",
    price: 610000,
    address: "7 Crescent Blvd",
    city: "Elmhurst",
    state: "IL",
    beds: 4,
    baths: 3,
    sqft: 2780,
    status: "For Sale",
    image: "/listing-08.jpg",
    type: "Single Family",
    story:
      "Steep gables and storybook brick — a Tudor with gravitas, updated where it matters most.",
  },
  {
    id: 9,
    slug: "prairie-contemporary",
    price: 538000,
    address: "2210 Meadowbrook Ln",
    city: "Plainfield",
    state: "IL",
    beds: 4,
    baths: 2.5,
    sqft: 2540,
    status: "Active Under Contract",
    image: "/listing-09.jpg",
    type: "Single Family",
    story:
      "Prairie-inspired horizontals in smooth stucco — calm, composed, and quietly confident.",
  },
  {
    id: 10,
    slug: "updated-split-level",
    price: 349000,
    address: "660 Kimberly Dr",
    city: "Aurora",
    state: "IL",
    beds: 3,
    baths: 2,
    sqft: 1690,
    status: "For Sale",
    image: "/listing-10.jpg",
    type: "Single Family",
    story:
      "A classic split-level, thoughtfully renewed — the smartest first chapter on the market today.",
  },
  {
    id: 11,
    slug: "downtown-loft",
    price: 285000,
    address: "14 Downer Pl #3B",
    city: "Aurora",
    state: "IL",
    beds: 1,
    baths: 1,
    sqft: 980,
    status: "For Sale",
    image: "/listing-11.jpg",
    type: "Condo/Loft",
    story:
      "Brick, timber, and downtown energy — a loft that puts the Fox River at the end of your street.",
  },
  {
    id: 12,
    slug: "the-stonebridge-estate",
    price: 1450000,
    address: "1 Stonebridge Estate Dr",
    city: "Naperville",
    state: "IL",
    beds: 6,
    baths: 7,
    sqft: 8900,
    status: "For Sale · LUXE",
    image: "/luxe-estate.jpg",
    type: "Estate",
    story:
      "The Stonebridge Estate — stone and glass at twilight, an infinity edge catching the last of the light. For homes that ask for something more.",
  },
  {
    id: 13,
    slug: "main-street-mixed-use",
    price: 1195000,
    address: "5210 Main St",
    city: "Downers Grove",
    state: "IL",
    beds: 0,
    baths: 2,
    sqft: 6400,
    status: "For Sale",
    image: "/interior-c.jpg",
    type: "Commercial",
    commercial: true,
    story:
      "A brick storefront with two flats above, a block from the Metra — the kind of Main Street address that anchors a neighborhood for decades.",
  },
];

export const listings: Listing[] = rawListings.map((l) => ({
  ...l,
  office: officeByCity[l.city] ?? "kw-innovate",
}));

export const listingsByOffice = (officeSlug: string): Listing[] =>
  listings.filter((l) => l.office === officeSlug);

/* ------------------------------------------------------------------ */
/* Round two — badges and the featured rotation                        */
/* ------------------------------------------------------------------ */

/** KW Luxury at $750K+ (Maria: "in our market, luxury is $750,000 and above"); KW Commercial by flag. */
export const listingDivision = (l: Listing): ListingDivision | null =>
  l.commercial ? "KW Commercial" : l.price >= LUXURY_FLOOR ? "KW Luxury" : null;

/**
 * Featured rotation (Q2, answered R2-Q5): the eligible pool is every active
 * listing at or above the $550K floor; each office is guaranteed one slot;
 * the rest of the slots rotate randomly within the pool on a fixed cadence
 * (FEATURED_ROTATION_HOURS). Deterministic within a window so every
 * visitor sees the same set, and nobody cherry-picks.
 */
export function featuredListings(count = 6, now = Date.now()): Listing[] {
  const pool = listings.filter(
    (l) => l.price >= FEATURED_PRICE_FLOOR && l.status !== "Sold"
  );
  const window = Math.floor(now / (FEATURED_ROTATION_HOURS * 3_600_000));
  const rng = mulberry32(window);
  const shuffled = [...pool].sort(() => rng() - 0.5);

  const picked: Listing[] = [];
  const seenOffice = new Set<string>();
  // Pass 1 — one guaranteed slot per office
  for (const l of shuffled) {
    if (!seenOffice.has(l.office)) {
      seenOffice.add(l.office);
      picked.push(l);
    }
  }
  // Pass 2 — fill the remaining slots from the pool
  for (const l of shuffled) {
    if (picked.length >= count) break;
    if (!picked.includes(l)) picked.push(l);
  }
  return picked.slice(0, count);
}

/** Small seeded PRNG so the rotation is stable within a window. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const formatPrice = (n: number): string =>
  "$" + n.toLocaleString("en-US");

export const formatBaths = (n: number): string =>
  n % 1 === 0 ? String(n) : n.toFixed(1);

export const getListingBySlug = (slug: string): Listing | undefined =>
  listings.find((l) => l.slug === slug);
