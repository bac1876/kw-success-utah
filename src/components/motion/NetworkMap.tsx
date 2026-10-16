import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { brokerage } from "@/brokerages";
import { cn } from "@/lib/utils";

export interface AreaGroup {
  county: string;
  note?: string;
  communities: string[];
}

export const UTAH_AREA_GROUPS: AreaGroup[] = [
  {
    county: "Davis County",
    note: "Home to KW Success Market Center (Layton)",
    communities: [
      "Bountiful",
      "Centerville",
      "Clearfield",
      "Clinton",
      "Farmington",
      "Fruit Heights",
      "Kaysville",
      "Layton",
      "North Salt Lake",
      "South Weber",
      "Sunset",
      "Syracuse",
      "West Bountiful",
      "West Point",
      "Woods Cross",
    ],
  },
  {
    county: "Weber County",
    note: "Ogden Metro & Ogden Valley Communities",
    communities: [
      "Eden",
      "Farr West",
      "Harrisville",
      "Hooper",
      "Huntsville",
      "Liberty",
      "Marriott-Slaterville",
      "North Ogden",
      "Ogden",
      "Plain City",
      "Pleasant View",
      "Riverdale",
      "Roy",
      "South Ogden",
      "Uintah",
      "Washington Terrace",
      "West Haven",
    ],
  },
  {
    county: "Morgan County",
    note: "Wasatch Back & Weber Canyon Communities",
    communities: [
      "Morgan",
      "Mountain Green",
      "Croydon",
    ],
  },
];

export const UTAH_AREA_COUNT = UTAH_AREA_GROUPS.reduce(
  (sum, g) => sum + g.communities.length,
  0
);

const COORDS: Record<string, [number, number]> = {
  // Davis County
  Layton: [41.0602, -111.9711],
  Kaysville: [41.0352, -111.9385],
  Farmington: [40.9805, -111.8874],
  FruitHeights: [41.0227, -111.9052],
  "Fruit Heights": [41.0227, -111.9052],
  Centerville: [40.918, -111.8722],
  Bountiful: [40.8894, -111.8808],
  "West Bountiful": [40.8969, -111.9022],
  "Woods Cross": [40.8719, -111.9069],
  "North Salt Lake": [40.8486, -111.9069],
  Clearfield: [41.1108, -112.0261],
  Syracuse: [41.0894, -112.0647],
  "West Point": [41.1277, -112.0919],
  Clinton: [41.1397, -112.0508],
  Sunset: [41.1408, -112.0305],
  "South Weber": [41.1322, -111.9297],
  // Weber County
  Ogden: [41.223, -111.9738],
  "South Ogden": [41.193, -111.9713],
  "Washington Terrace": [41.1694, -111.9819],
  Riverdale: [41.1769, -112.0033],
  Roy: [41.1616, -112.0263],
  Hooper: [41.1638, -112.1224],
  "Plain City": [41.2983, -112.0869],
  "Farr West": [41.2933, -112.0294],
  Harrisville: [41.283, -111.9883],
  "North Ogden": [41.3072, -111.9602],
  "Pleasant View": [41.3219, -111.9922],
  Eden: [41.3005, -111.8124],
  Huntsville: [41.2608, -111.7705],
  Liberty: [41.3316, -111.8638],
  "Marriott-Slaterville": [41.2533, -112.0169],
  Uintah: [41.1444, -111.9249],
  "West Haven": [41.2038, -112.053],
  // Morgan County
  Morgan: [41.0361, -111.6766],
  "Mountain Green": [41.1458, -111.7927],
  Peterson: [41.1136, -111.758],
  Milton: [41.0711, -111.7202],
  Enterprise: [41.0886, -111.7347],
  Porterville: [40.9855, -111.6788],
  Croydon: [41.0644, -111.565],
  // Regional Gateway
  "Salt Lake City": [40.7608, -111.891],
  "Park City": [40.755, -111.565],
};

interface HubDef {
  slug: string;
  name: string;
  homeCity: string;
  subtitle: string;
  communities: string[];
}

const HUB_DEFS: HubDef[] = [
  {
    slug: "kw-success-layton",
    name: "KW Success Market Center",
    homeCity: "Layton",
    subtitle: "Layton HQ · Davis County",
    communities: [
      "Layton",
      "Kaysville",
      "Farmington",
      "Fruit Heights",
      "Clearfield",
      "Syracuse",
      "West Point",
      "Clinton",
      "Sunset",
      "South Weber",
      "Ogden",
      "Morgan",
      "Bountiful",
    ],
  },
  {
    slug: "weber-corridor",
    name: "Weber & Ogden Valley Hub",
    homeCity: "Ogden",
    subtitle: "Ogden · Weber County & Ogden Valley",
    communities: [
      "Ogden",
      "South Ogden",
      "Washington Terrace",
      "Riverdale",
      "Roy",
      "Hooper",
      "Plain City",
      "Farr West",
      "Harrisville",
      "North Ogden",
      "Pleasant View",
      "Eden",
      "Huntsville",
      "Liberty",
      "Marriott-Slaterville",
      "Uintah",
      "West Haven",
    ],
  },
  {
    slug: "morgan-wasatch-back",
    name: "Wasatch Back & Morgan Hub",
    homeCity: "Morgan",
    subtitle: "Morgan · Mountain Green & Croydon",
    communities: [
      "Morgan",
      "Mountain Green",
      "Croydon",
      "Huntsville",
    ],
  },
  {
    slug: "south-davis-slc",
    name: "South Davis Corridor",
    homeCity: "Bountiful",
    subtitle: "Bountiful · Farmington to North Salt Lake",
    communities: [
      "Bountiful",
      "Centerville",
      "Farmington",
      "West Bountiful",
      "Woods Cross",
      "North Salt Lake",
    ],
  },
];

// Great Salt Lake eastern shoreline coordinates (North to South)
const SHORE_COORDS: [number, number][] = [
  [41.36, -112.16],
  [41.28, -112.15],
  [41.2, -112.16],
  [41.14, -112.13],
  [41.07, -112.11],
  [41.01, -112.06],
  [40.95, -111.96],
  [40.89, -111.95],
  [40.82, -111.96],
  [40.74, -112.04],
];

// Wasatch Range ridgeline spine (North to South)
const WASATCH_RIDGE_COORDS: [number, number][] = [
  [41.36, -111.91],
  [41.28, -111.89],
  [41.21, -111.88],
  [41.14, -111.87],
  [41.06, -111.86],
  [40.98, -111.83],
  [40.9, -111.81],
  [40.82, -111.8],
  [40.74, -111.78],
];

const BOUNDS = {
  latMin: 40.72,
  latMax: 41.37,
  lngMin: -112.22,
  lngMax: -111.51,
};

const W = 1000;
const COS_LAT = Math.cos((41.05 * Math.PI) / 180);
const H = Math.round(
  (W * (BOUNDS.latMax - BOUNDS.latMin)) /
    ((BOUNDS.lngMax - BOUNDS.lngMin) * COS_LAT)
);

function project([lat, lng]: [number, number]): [number, number] {
  const x = ((lng - BOUNDS.lngMin) / (BOUNDS.lngMax - BOUNDS.lngMin)) * W;
  const y = ((BOUNDS.latMax - lat) / (BOUNDS.latMax - BOUNDS.latMin)) * H;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

const COPPER = "#B40101";
const COPPER_BRIGHT = "#D11919";
const IVORY = "#F7F8FA";

const HUB_LABEL_POS: Record<string, string> = {
  b: "-translate-x-1/2 mt-4 text-center",
  "kw-success-layton": "-translate-y-1/2 ml-4 text-left",
  "weber-corridor": "-translate-x-1/2 -translate-y-full -mt-4 text-center",
  "morgan-wasatch-back": "-translate-x-1/2 mt-4 text-center",
  "south-davis-slc": "-translate-y-1/2 ml-4 text-left",
};

const ANCHOR_POS: Record<"l" | "r" | "t" | "b", string> = {
  l: "-translate-x-full -translate-y-1/2 -ml-2.5 text-right",
  r: "-translate-y-1/2 ml-2.5 text-left",
  t: "-translate-x-1/2 -translate-y-full -mt-2 text-center",
  b: "-translate-x-1/2 mt-2 text-center",
};

const ANCHOR_TOWNS: Record<string, "l" | "r" | "t" | "b"> = {
  "Pleasant View": "t",
  "Plain City": "l",
  Hooper: "l",
  Syracuse: "l",
  Clearfield: "l",
  Kaysville: "r",
  Farmington: "r",
  Centerville: "r",
  "North Salt Lake": "l",
  "Salt Lake City": "b",
  Eden: "t",
  Huntsville: "r",
  "Mountain Green": "t",
  Croydon: "r",
  Porterville: "b",
  "Park City": "r",
};

function buildNetworkData() {
  const hubs = HUB_DEFS.map((h) => {
    const [hx, hy] = project(COORDS[h.homeCity]);
    const links = h.communities
      .filter((c) => COORDS[c] && c !== h.homeCity)
      .map((c) => {
        const [tx, ty] = project(COORDS[c]);
        return {
          id: `${h.slug}-${c}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          town: c,
          x: tx,
          y: ty,
          d: `M${hx} ${hy} L${tx} ${ty}`,
          len: Math.hypot(tx - hx, ty - hy),
        };
      });
    return {
      slug: h.slug,
      name: h.name,
      city: h.homeCity,
      subtitle: h.subtitle,
      x: hx,
      y: hy,
      links,
    };
  });

  const towns: {
    name: string;
    county: string;
    x: number;
    y: number;
    delay: number;
  }[] = [];
  const seen = new Set<string>();

  for (const group of UTAH_AREA_GROUPS) {
    for (const comm of group.communities) {
      const coord = COORDS[comm];
      if (!coord || seen.has(comm)) continue;
      seen.add(comm);
      const [x, y] = project(coord);
      const minDist = Math.min(
        ...hubs.map((h) => Math.hypot(h.x - x, h.y - y))
      );
      towns.push({
        name: comm,
        county: group.county,
        x,
        y,
        delay: 0.35 + (Math.min(minDist, 700) / 700) * 1.4,
      });
    }
  }

  const shoreD = SHORE_COORDS.map(project)
    .map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`)
    .join(" ");
  const lakeD = `${shoreD} L -60 ${H + 60} L -60 -60 Z`;

  const ridgeD = WASATCH_RIDGE_COORDS.map(project)
    .map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`)
    .join(" ");

  const linkedBy: Record<string, string[]> = {};
  hubs.forEach((h) => {
    linkedBy[h.city] = [...(linkedBy[h.city] ?? []), h.slug];
    h.links.forEach((l) => {
      linkedBy[l.town] = [...(linkedBy[l.town] ?? []), h.slug];
    });
  });

  const countyOf: Record<string, string> = {};
  towns.forEach((t) => {
    countyOf[t.name] = t.county;
  });

  return { hubs, towns, shoreD, lakeD, ridgeD, linkedBy, countyOf };
}

function useWide() {
  const [wide, setWide] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches
  );
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setWide(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return wide;
}

export default function NetworkMap() {
  const wide = useWide();
  const { hubs, towns, shoreD, lakeD, ridgeD, linkedBy, countyOf } = useMemo(
    () => buildNetworkData(),
    []
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "-10% 0px -10% 0px" });
  const [filter, setFilter] = useState<{
    kind: "office" | "county";
    key: string;
  } | null>(null);
  const [hoveredTown, setHoveredTown] = useState<(typeof towns)[number] | null>(
    null
  );
  const [query, setQuery] = useState("");
  const [showPulses, setShowPulses] = useState(false);

  useEffect(() => {
    if (
      !inView ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const t = window.setTimeout(() => setShowPulses(true), 1800);
    return () => window.clearTimeout(t);
  }, [inView]);

  const qClean = query.trim().toLowerCase();
  const matches = qClean
    ? towns
        .filter((t) => t.name.toLowerCase().includes(qClean))
        .sort(
          (a, b) =>
            Number(!a.name.toLowerCase().startsWith(qClean)) -
              Number(!b.name.toLowerCase().startsWith(qClean)) ||
            a.name.localeCompare(b.name)
        )
    : [];
  const matchSet = new Set(matches.map((t) => t.name));
  const isIdle = !filter && !hoveredTown && !qClean;

  const isTownActive = (t: (typeof towns)[number]) => {
    if (qClean) return matchSet.has(t.name);
    if (filter) {
      return filter.kind === "county"
        ? t.county === filter.key
        : (linkedBy[t.name] ?? []).includes(filter.key);
    }
    return true;
  };

  const isLinkActive = (
    hub: (typeof hubs)[number],
    link: (typeof hubs)[number]["links"][number]
  ) => {
    if (hoveredTown) {
      return hoveredTown.name === link.town || hoveredTown.name === hub.city;
    }
    if (qClean) {
      return matchSet.has(link.town) || matchSet.has(hub.city);
    }
    if (filter) {
      return filter.kind === "county"
        ? countyOf[link.town] === filter.key
        : hub.slug === filter.key;
    }
    return true;
  };

  const isHubActive = (hub: (typeof hubs)[number]) => {
    if (qClean) {
      return (
        matchSet.has(hub.city) || hub.links.some((l) => matchSet.has(l.town))
      );
    }
    if (filter) {
      return filter.kind === "office"
        ? hub.slug === filter.key
        : countyOf[hub.city] === filter.key;
    }
    return true;
  };

  const openTownSearch = (t: { name: string }) => {
    window.open(
      `${brokerage.search.buyUrl}?q=${encodeURIComponent(t.name + ", UT")}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const toggleFilter = (next: { kind: "office" | "county"; key: string }) => {
    setFilter((cur) =>
      cur && cur.kind === next.kind && cur.key === next.key ? null : next
    );
  };

  const pctPos = (x: number, y: number) => ({
    left: `${(x / W) * 100}%`,
    top: `${(y / H) * 100}%`,
  });

  const activeTooltipTown =
    hoveredTown ?? (matches.length === 1 ? matches[0] : null);

  const headerBlock = (
    <div>
      <div className="flex items-center gap-4">
        <span className="h-px w-10 bg-copper" />
        <span className="type-label text-copper">The Wasatch Front, to Scale</span>
      </div>
      <h2 className="mt-5 text-[clamp(1.6rem,2.4vw,2.1rem)] font-light leading-tight text-ivory">
        Every dot is a Utah community we serve.
      </h2>
      <p className="type-body-sm mt-4 max-w-sm text-white/65">
        Anchored in Layton — {UTAH_AREA_COUNT}+ communities across Davis, Weber,
        and Morgan Counties, plus the greater Salt Lake Metro. The copper
        threads trace our advisors&apos; daily reach from the Great Salt Lake to
        the Wasatch Back.
      </p>

      <label className="mt-8 flex items-center gap-3 border-b hairline-dark pb-3 focus-within:border-copper">
        <Search className="h-4 w-4 shrink-0 text-copper" strokeWidth={1.5} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && matches[0]) openTownSearch(matches[0]);
            if (e.key === "Escape") setQuery("");
          }}
          placeholder="Find your town (e.g. Layton, Ogden, Kaysville)…"
          aria-label="Find your town"
          className="w-full bg-transparent text-[0.95rem] text-ivory placeholder:text-stone-dark focus:outline-none"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear"
            onClick={() => setQuery("")}
            className="text-stone-dark transition-colors hover:text-ivory"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        )}
      </label>

      {qClean && (
        <ul className="mt-2">
          {matches.slice(0, 6).map((t) => (
            <li key={t.name}>
              <button
                type="button"
                onClick={() => openTownSearch(t)}
                onMouseEnter={() => setHoveredTown(t)}
                onMouseLeave={() => setHoveredTown(null)}
                className="group flex w-full items-center justify-between gap-4 py-2 text-left"
                data-cursor="Explore"
              >
                <span className="text-[0.9rem] text-ivory transition-colors group-hover:text-copper">
                  {t.name}
                </span>
                <span className="type-body-sm flex items-center gap-2 text-stone-dark">
                  {t.county.replace(" County", "")}
                  <ArrowRight
                    className="h-3.5 w-3.5 text-copper transition-transform group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </span>
              </button>
            </li>
          ))}
          {matches.length === 0 && (
            <li className="type-body-sm py-2 text-stone-dark">
              Not on the primary list yet —{" "}
              <Link to="/contact" className="text-copper">
                ask us
              </Link>
              , our advisors serve the entire Wasatch Front.
            </li>
          )}
          {matches.length > 6 && (
            <li className="type-body-sm py-2 text-stone-dark">
              + {matches.length - 6} more — keep typing
            </li>
          )}
        </ul>
      )}
    </div>
  );

  const filterListBlock = (
    <div>
      <p className="type-label mt-9 text-stone-dark">Coverage Hubs</p>
      <ul className="mt-3 border-t hairline-dark">
        {hubs.map((h) => {
          const active =
            !filter ||
            (filter.kind === "office" && filter.key === h.slug) ||
            (filter.kind === "county" && countyOf[h.city] === filter.key);
          return (
            <li key={h.slug} className="border-b hairline-dark">
              <button
                type="button"
                onMouseEnter={() => setFilter({ kind: "office", key: h.slug })}
                onMouseLeave={() => setFilter(null)}
                onClick={() => toggleFilter({ kind: "office", key: h.slug })}
                className={cn(
                  "group flex w-full items-center justify-between gap-4 py-2.5 text-left transition-opacity duration-300",
                  active ? "opacity-100" : "opacity-35"
                )}
                data-cursor="Trace"
              >
                <span className="flex items-center gap-3">
                  <span className="block h-2 w-2 rotate-45 bg-copper" />
                  <span className="text-[0.88rem] font-medium text-ivory transition-colors group-hover:text-copper">
                    {h.name}
                  </span>
                </span>
                <span className="type-body-sm text-stone-dark">{h.city}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="type-label mt-7 text-stone-dark">Counties</p>
      <ul className="mt-3 flex flex-wrap gap-2 lg:block lg:border-t lg:hairline-dark">
        {UTAH_AREA_GROUPS.map((g) => {
          const active =
            !filter ||
            (filter.kind === "county" && filter.key === g.county) ||
            (filter.kind === "office" &&
              g.communities.some((c) =>
                (linkedBy[c] ?? []).includes(filter.key)
              ));
          return (
            <li key={g.county} className="lg:border-b lg:hairline-dark">
              <button
                type="button"
                onMouseEnter={() =>
                  setFilter({ kind: "county", key: g.county })
                }
                onMouseLeave={() => setFilter(null)}
                onClick={() => toggleFilter({ kind: "county", key: g.county })}
                className={cn(
                  "flex w-full items-center justify-between gap-4 rounded-full border px-4 py-2 text-left transition-all duration-300 hairline-dark lg:rounded-none lg:border-0 lg:px-0 lg:py-2",
                  active ? "opacity-100" : "opacity-35",
                  filter?.kind === "county" &&
                    filter.key === g.county &&
                    "text-copper"
                )}
              >
                <span className="text-[0.86rem] font-light text-ivory">
                  {g.county}
                </span>
                <span className="type-body-sm tabular-nums text-stone-dark">
                  {g.communities.length}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="type-body-sm mt-5 text-stone-dark">
        Hover or tap a hub or county to trace its reach across the Wasatch
        Front. Click any community dot to search homes there.
      </p>
    </div>
  );

  const mapCanvas = (
    <div
      className="relative mx-auto w-full max-w-[960px]"
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="kws-lake" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor={COPPER} stopOpacity="0.03" />
            <stop offset="1" stopColor={COPPER} stopOpacity="0.16" />
          </linearGradient>
          <radialGradient id="kws-hub-glow">
            <stop offset="0" stopColor={COPPER} stopOpacity="0.55" />
            <stop offset="1" stopColor={COPPER} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Great Salt Lake water fill */}
        <motion.path
          d={lakeD}
          fill="url(#kws-lake)"
          style={{ pointerEvents: "none" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1.4, delay: 0.2 }}
        />

        {/* Great Salt Lake shoreline */}
        <motion.path
          d={shoreD}
          fill="none"
          stroke={COPPER}
          strokeWidth={1}
          strokeOpacity={0.5}
          style={{ pointerEvents: "none" }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />

        {/* Wasatch Front ridgeline */}
        <motion.path
          d={ridgeD}
          fill="none"
          stroke={COPPER}
          strokeWidth={0.9}
          strokeDasharray="4 6"
          strokeOpacity={0.32}
          style={{ pointerEvents: "none" }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 2.0, delay: 0.3, ease: "easeInOut" }}
        />

        {/* Great Salt Lake vertical label */}
        <motion.text
          x={28}
          y={H * 0.42}
          fill={COPPER}
          fillOpacity={0.6}
          fontSize={13}
          letterSpacing={4}
          style={{ writingMode: "vertical-rl", pointerEvents: "none" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          GREAT SALT LAKE
        </motion.text>

        {/* Wasatch Range vertical label */}
        <motion.text
          x={W - 22}
          y={H * 0.28}
          fill={COPPER}
          fillOpacity={0.45}
          fontSize={12}
          letterSpacing={4}
          style={{ writingMode: "vertical-rl", pointerEvents: "none" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          WASATCH BACK
        </motion.text>

        {/* Network threads connecting hubs to towns */}
        {hubs.map((hub) =>
          hub.links.map((link, lIdx) => (
            <motion.path
              key={link.id}
              d={link.d}
              fill="none"
              stroke={COPPER}
              strokeWidth={0.95}
              strokeLinecap="round"
              style={{ pointerEvents: "none" }}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: inView ? 1 : 0,
                opacity: inView
                  ? isLinkActive(hub, link)
                    ? 0.48
                    : hoveredTown
                      ? 0.14
                      : 0.08
                  : 0,
              }}
              transition={{
                pathLength: {
                  duration: 0.9,
                  delay: 0.45 + lIdx * 0.04,
                  ease: "easeOut",
                },
                opacity: { duration: 0.35 },
              }}
            />
          ))
        )}

        {/* Traveling light pulses along threads */}
        {showPulses &&
          hubs.map((hub) =>
            hub.links
              .filter((_, idx) => idx % 2 === 0)
              .map((link, idx) => (
                <circle
                  key={`pulse-${link.id}`}
                  r={2.5}
                  fill={COPPER_BRIGHT}
                  className="mn-travel"
                  style={
                    {
                      pointerEvents: "none",
                      offsetPath: `path('${link.d}')`,
                      animationDuration: `${3.2 + link.len / 120}s`,
                      animationDelay: `${-(idx * 1.4 + hub.x / 400)}s`,
                    } as React.CSSProperties
                  }
                />
              ))
          )}

        {/* Community Dots */}
        {towns.map((town) => {
          const active = isTownActive(town);
          const selected = activeTooltipTown?.name === town.name;
          return (
            <g
              key={town.name}
              role="link"
              tabIndex={0}
              aria-label={`Search homes in ${town.name}`}
              data-cursor="Explore"
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHoveredTown(town)}
              onMouseLeave={() => setHoveredTown(null)}
              onFocus={() => setHoveredTown(town)}
              onBlur={() => setHoveredTown(null)}
              onClick={() => openTownSearch(town)}
              onKeyDown={(e) => e.key === "Enter" && openTownSearch(town)}
            >
              <circle cx={town.x} cy={town.y} r={14} fill="transparent" />
              <motion.circle
                cx={town.x}
                cy={town.y}
                r={10}
                fill="none"
                stroke={COPPER_BRIGHT}
                strokeWidth={0.9}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{
                  opacity: selected ? 0.95 : 0,
                  scale: selected ? 1 : 0.4,
                }}
                transition={{ duration: 0.35 }}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              />
              <motion.circle
                cx={town.x}
                cy={town.y}
                r={4.2}
                fill={selected ? COPPER_BRIGHT : IVORY}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: inView ? (active ? (selected ? 1 : 0.88) : 0.16) : 0,
                  scale: inView ? (selected ? 1.45 : 1) : 0,
                }}
                transition={{
                  opacity: {
                    duration: 0.4,
                    delay: inView && isIdle ? town.delay : 0,
                  },
                  scale: {
                    duration: 0.5,
                    delay: inView && isIdle ? town.delay : 0,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              />
            </g>
          );
        })}

        {/* Diamond Hub Markers */}
        {hubs.map((hub, idx) => {
          const active = isHubActive(hub);
          return (
            <motion.g
              key={hub.slug}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{
                opacity: inView ? (active ? 1 : 0.3) : 0,
                scale: inView ? 1 : 0.6,
              }}
              transition={{
                duration: 0.8,
                delay: 0.25 + idx * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                pointerEvents: "none",
              }}
            >
              <circle
                cx={hub.x}
                cy={hub.y}
                r={32}
                fill="url(#kws-hub-glow)"
                className="mn-halo"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              />
              <rect
                x={hub.x - 6}
                y={hub.y - 6}
                width={12}
                height={12}
                fill={COPPER}
                transform={`rotate(45 ${hub.x} ${hub.y})`}
              />
              <rect
                x={hub.x - 10}
                y={hub.y - 10}
                width={20}
                height={20}
                fill="none"
                stroke={COPPER}
                strokeOpacity={0.55}
                strokeWidth={0.85}
                transform={`rotate(45 ${hub.x} ${hub.y})`}
              />
            </motion.g>
          );
        })}
      </svg>

      {/* Town anchor labels */}
      {towns
        .filter((t) => ANCHOR_TOWNS[t.name])
        .map((t) => (
          <motion.span
            key={`lbl-${t.name}`}
            className={cn(
              "pointer-events-none absolute hidden whitespace-nowrap text-[0.58rem] uppercase tracking-[0.16em] transition-colors duration-300 md:block",
              ANCHOR_POS[ANCHOR_TOWNS[t.name]],
              activeTooltipTown?.name === t.name
                ? "text-copper"
                : "text-stone-dark",
              isTownActive(t) ? "" : "opacity-30"
            )}
            style={pctPos(t.x, t.y)}
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 1.5 + t.delay * 0.35, duration: 0.6 }}
          >
            {t.name}
          </motion.span>
        ))}

      {/* Hub labels */}
      {hubs.map((hub, idx) => (
        <motion.div
          key={`hub-lbl-${hub.slug}`}
          className={cn(
            "pointer-events-none absolute whitespace-nowrap transition-opacity duration-300",
            HUB_LABEL_POS[hub.slug] ?? HUB_LABEL_POS.b,
            isHubActive(hub) ? "opacity-100" : "opacity-30"
          )}
          style={pctPos(hub.x, hub.y)}
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 0.6 + idx * 0.12, duration: 0.7 }}
        >
          <span className="block text-[0.64rem] font-medium uppercase tracking-[0.28em] text-ivory">
            {hub.name}
          </span>
          <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-copper">
            {hub.city}
          </span>
        </motion.div>
      ))}

      {/* Floating Tooltip */}
      {activeTooltipTown && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%_+_16px)] border hairline-dark bg-ink/95 px-4 py-2.5 text-center shadow-lift backdrop-blur"
          style={pctPos(activeTooltipTown.x, activeTooltipTown.y)}
        >
          <span className="block whitespace-nowrap text-[0.95rem] font-medium text-ivory">
            {activeTooltipTown.name}
          </span>
          <span className="block whitespace-nowrap text-[0.6rem] uppercase tracking-[0.24em] text-stone-dark">
            {activeTooltipTown.county} · Explore homes →
          </span>
        </div>
      )}
    </div>
  );

  return wide ? (
    <div
      ref={rootRef}
      className="grid grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-14 xl:grid-cols-[minmax(0,3.2fr)_minmax(0,6.8fr)]"
    >
      <div className="sticky top-24 self-start">
        {headerBlock}
        {filterListBlock}
      </div>
      {mapCanvas}
    </div>
  ) : (
    <div ref={rootRef} className="flex flex-col gap-10">
      {headerBlock}
      {mapCanvas}
      {filterListBlock}
    </div>
  );
}
