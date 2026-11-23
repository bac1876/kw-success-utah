import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ExternalLink, RotateCcw, Search, X } from "lucide-react";
import { brokerage } from "@/brokerages";
import {
  CONTEXT_COUNTY_PATHS,
  MAP_HEIGHT,
  MAP_WIDTH,
  SERVED_COUNTY_SHAPES,
  UTAH_LAKE_SHAPES,
  projectLatLng,
} from "@/data/utahMapGeometry";
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
    note: "Weber Canyon Communities",
    communities: ["Morgan", "Mountain Green", "Croydon"],
  },
  {
    county: "Salt Lake County",
    note: "Greater Salt Lake Metro",
    communities: [
      "Salt Lake City",
      "Sandy",
      "West Jordan",
      "South Jordan",
      "Draper",
      "Murray",
      "Herriman",
      "West Valley City",
      "Riverton",
      "Cottonwood Heights",
      "Millcreek",
      "Holladay",
      "Taylorsville",
      "South Salt Lake",
    ],
  },
  {
    county: "Tooele County",
    note: "West of Salt Lake Valley",
    communities: ["Tooele", "Grantsville", "Stansbury Park"],
  },
  {
    county: "Summit County",
    note: "Park City & Wasatch Back",
    communities: ["Park City", "Kamas", "Coalville", "Francis", "Oakley"],
  },
  {
    county: "Box Elder County",
    note: "Northern Utah Gateway",
    communities: [
      "Brigham City",
      "Tremonton",
      "Perry",
      "Willard",
      "Bear River City",
      "Mantua",
    ],
  },
  {
    county: "Cache County",
    note: "Logan & Cache Valley",
    communities: [
      "Logan",
      "North Logan",
      "Smithfield",
      "Hyde Park",
      "Nibley",
      "Providence",
      "Millville",
      "River Heights",
    ],
  },
  {
    county: "Rich County",
    note: "Bear Lake Gateway",
    communities: ["Garden City", "Randolph", "Laketown"],
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
  Croydon: [41.0644, -111.565],
  // Salt Lake County
  "Salt Lake City": [40.7608, -111.891],
  Sandy: [40.5649, -111.8389],
  "West Jordan": [40.6097, -111.9391],
  "South Jordan": [40.5622, -111.9296],
  Draper: [40.5246, -111.8638],
  Murray: [40.6669, -111.8879],
  Herriman: [40.5141, -112.0333],
  "West Valley City": [40.6916, -112.0011],
  Riverton: [40.521, -111.9391],
  "Cottonwood Heights": [40.6197, -111.8102],
  Millcreek: [40.6869, -111.8757],
  Holladay: [40.6688, -111.8243],
  Taylorsville: [40.6677, -111.9388],
  "South Salt Lake": [40.7188, -111.8882],
  // Tooele County
  Tooele: [40.5308, -112.2983],
  Grantsville: [40.5999, -112.4644],
  "Stansbury Park": [40.6377, -112.2961],
  // Summit County
  "Park City": [40.6461, -111.498],
  Kamas: [40.643, -111.2807],
  Coalville: [40.9177, -111.3999],
  Francis: [40.6108, -111.2816],
  Oakley: [40.7152, -111.3002],
  // Box Elder County
  "Brigham City": [41.5102, -112.0155],
  Tremonton: [41.7116, -112.1655],
  Perry: [41.4647, -112.0325],
  Willard: [41.4091, -112.0366],
  "Bear River City": [41.6166, -112.123],
  Mantua: [41.4969, -111.9447],
  // Cache County
  Logan: [41.7369, -111.8338],
  "North Logan": [41.7694, -111.8047],
  Smithfield: [41.8386, -111.8313],
  "Hyde Park": [41.7991, -111.8188],
  Nibley: [41.6747, -111.8327],
  Providence: [41.7064, -111.8166],
  Millville: [41.6808, -111.8191],
  "River Heights": [41.7194, -111.8216],
  // Rich County
  "Garden City": [41.9472, -111.398],
  Randolph: [41.6647, -111.1819],
  Laketown: [41.8294, -111.3177],
};

interface LabelPlacement {
  dx: number;
  dy: number;
  anchor: "start" | "end" | "middle";
  featured?: boolean;
}

// Primary city labels positioned with guaranteed separation across all 9 counties
const PRIORITY_LABELS: Record<string, LabelPlacement> = {
  "Garden City": { dx: -9, dy: 4, anchor: "end" },
  Tremonton: { dx: -9, dy: 4, anchor: "end" },
  Logan: { dx: 9, dy: 4, anchor: "start" },
  Randolph: { dx: 9, dy: 4, anchor: "start" },
  "Brigham City": { dx: -9, dy: 4, anchor: "end" },
  Ogden: { dx: 9, dy: 4, anchor: "start" },
  Layton: { dx: -12, dy: 4, anchor: "end", featured: true },
  Morgan: { dx: 9, dy: 4, anchor: "start" },
  "Salt Lake City": { dx: -9, dy: 4, anchor: "end" },
  "Park City": { dx: 0, dy: 16, anchor: "middle" },
  Sandy: { dx: 9, dy: 5, anchor: "start" },
  Tooele: { dx: -9, dy: 4, anchor: "end" },
};

const KW_RED = "#B40101";
const KW_RED_BRIGHT = "#D11919";
const INK = "#1F2326";
const CHARCOAL = "#4D4D4D";

interface TownPoint {
  name: string;
  county: string;
  x: number;
  y: number;
  isPrimary: boolean;
  isMarketCenter: boolean;
  searchUrl: string;
}

function buildTownPoints(): TownPoint[] {
  const towns: TownPoint[] = [];
  const seen = new Set<string>();

  for (const group of UTAH_AREA_GROUPS) {
    for (const comm of group.communities) {
      const coord = COORDS[comm];
      if (!coord || seen.has(comm)) continue;
      seen.add(comm);
      const [x, y] = projectLatLng(coord);
      towns.push({
        name: comm,
        county: group.county,
        x,
        y,
        isPrimary: Boolean(PRIORITY_LABELS[comm]),
        isMarketCenter: comm === "Layton",
        searchUrl: `${brokerage.search.buyUrl}?q=${encodeURIComponent(
          `${comm}, UT`
        )}`,
      });
    }
  }

  // Secondary towns first, primary cities on top, Market Center (Layton) last
  return towns.sort(
    (a, b) =>
      Number(a.isPrimary) - Number(b.isPrimary) ||
      Number(a.isMarketCenter) - Number(b.isMarketCenter)
  );
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
  const towns = useMemo(() => buildTownPoints(), []);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "-8% 0px -8% 0px" });

  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null);
  const [hoveredTown, setHoveredTown] = useState<TownPoint | null>(null);
  const [query, setQuery] = useState("");

  const qClean = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!qClean) return [];
    return towns
      .filter(
        (t) =>
          t.name.toLowerCase().includes(qClean) ||
          t.county.toLowerCase().includes(qClean)
      )
      .sort(
        (a, b) =>
          Number(!a.name.toLowerCase().startsWith(qClean)) -
            Number(!b.name.toLowerCase().startsWith(qClean)) ||
          a.name.localeCompare(b.name)
      );
  }, [qClean, towns]);

  const matchSet = useMemo(
    () => new Set(matches.map((t) => t.name)),
    [matches]
  );

  // Active county drives map highlight (hover previews, click pins selection)
  const activeCounty =
    hoveredTown?.county ?? hoveredCounty ?? selectedCounty ?? null;

  const isTownActive = (t: TownPoint) => {
    if (qClean) return matchSet.has(t.name);
    if (activeCounty) return t.county === activeCounty;
    return true;
  };

  const openTownSearch = (t: TownPoint) => {
    window.open(t.searchUrl, "_blank", "noopener,noreferrer");
  };

  const toggleCounty = (county: string) => {
    setSelectedCounty((cur) => (cur === county ? null : county));
  };

  const activeTooltipTown =
    hoveredTown ?? (matches.length === 1 ? matches[0] : null);

  const selectedGroup = selectedCounty
    ? UTAH_AREA_GROUPS.find((g) => g.county === selectedCounty) ?? null
    : null;

  // Render active county's dots on top of dimmed dots so tightly clustered areas are easy to pick
  const orderedTowns = useMemo(() => {
    return [...towns].sort((a, b) => {
      const aSelected = activeTooltipTown?.name === a.name ? 1 : 0;
      const bSelected = activeTooltipTown?.name === b.name ? 1 : 0;
      if (aSelected !== bSelected) return aSelected - bSelected;
      const aActive =
        (qClean ? matchSet.has(a.name) : !activeCounty || a.county === activeCounty)
          ? 1
          : 0;
      const bActive =
        (qClean ? matchSet.has(b.name) : !activeCounty || b.county === activeCounty)
          ? 1
          : 0;
      if (aActive !== bActive) return aActive - bActive;
      return (
        Number(a.isPrimary) - Number(b.isPrimary) ||
        Number(a.isMarketCenter) - Number(b.isMarketCenter)
      );
    });
  }, [towns, activeTooltipTown, qClean, matchSet, activeCounty]);

  const headerBlock = (
    <div>
      <div className="flex items-center gap-3.5">
        <span className="h-px w-8 bg-kw-red" />
        <span className="type-label text-kw-red">Northern Utah Coverage</span>
      </div>
      <h2 className="mt-4 text-[clamp(1.55rem,2.3vw,2.05rem)] font-semibold leading-tight tracking-tight text-ink">
        Every dot is a Utah community we serve.
      </h2>
      <p className="type-body-sm mt-3.5 max-w-sm text-charcoal">
        Anchored in Layton — {UTAH_AREA_COUNT} communities across 9 Northern
        Utah counties, from the Great Salt Lake to Bear Lake and the Wasatch
        Back. Licensed to serve the entire state.
      </p>

      <label className="mt-6 flex items-center gap-3 border-b border-ink/20 pb-2.5 focus-within:border-kw-red">
        <Search className="h-4 w-4 shrink-0 text-kw-red" strokeWidth={1.75} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && matches[0]) openTownSearch(matches[0]);
            if (e.key === "Escape") setQuery("");
          }}
          placeholder="Find your town (e.g. Layton, Logan)…"
          aria-label="Find your town"
          className="w-full bg-transparent text-[0.92rem] text-ink placeholder:text-charcoal/50 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
            className="text-charcoal transition-colors hover:text-ink"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        )}
      </label>

      {qClean && (
        <ul className="mt-2 divide-y divide-ink/10">
          {matches.slice(0, 6).map((t) => (
            <li key={t.name}>
              <a
                href={t.searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredTown(t)}
                onMouseLeave={() => setHoveredTown(null)}
                className="group flex w-full items-center justify-between gap-4 py-2 text-left"
              >
                <span className="text-[0.9rem] font-medium text-ink transition-colors group-hover:text-kw-red">
                  {t.name}
                </span>
                <span className="type-body-sm flex items-center gap-2 text-charcoal">
                  {t.county.replace(" County", "")}
                  <ArrowRight
                    className="h-3.5 w-3.5 text-kw-red transition-transform group-hover:translate-x-1"
                    strokeWidth={1.75}
                  />
                </span>
              </a>
            </li>
          ))}
          {matches.length === 0 && (
            <li className="type-body-sm py-2.5 text-charcoal">
              Not on the primary list yet —{" "}
              <Link to="/contact" className="font-medium text-kw-red hover:underline">
                ask us
              </Link>
              , our advisors serve all of Northern Utah.
            </li>
          )}
          {matches.length > 6 && (
            <li className="type-body-sm py-2 text-charcoal">
              + {matches.length - 6} more — keep typing
            </li>
          )}
        </ul>
      )}
    </div>
  );

  const countyListBlock = (
    <div>
      <div className="mt-7 flex items-center justify-between">
        <p className="type-label text-charcoal">9 Northern Utah Counties</p>
        {selectedCounty && (
          <button
            type="button"
            onClick={() => setSelectedCounty(null)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-kw-red transition-opacity hover:opacity-80"
          >
            <RotateCcw className="h-3 w-3" />
            All
          </button>
        )}
      </div>

      <ul className="mt-3 flex flex-wrap gap-2 lg:block lg:border-t lg:border-ink/10">
        {UTAH_AREA_GROUPS.map((g) => {
          const isHighlighted = activeCounty === g.county;
          const isSelected = selectedCounty === g.county;
          const isDimmed = Boolean(activeCounty && !isHighlighted);

          return (
            <li key={g.county} className="lg:border-b lg:border-ink/10">
              <button
                type="button"
                aria-pressed={isSelected}
                onMouseEnter={() => setHoveredCounty(g.county)}
                onMouseLeave={() => setHoveredCounty(null)}
                onClick={() => toggleCounty(g.county)}
                className={cn(
                  "group flex w-full items-center justify-between gap-3 rounded-full border px-3.5 py-1.5 text-left transition-all duration-200 lg:rounded-none lg:border-0 lg:px-1.5 lg:py-2",
                  isHighlighted
                    ? "border-kw-red bg-kw-red/10 text-kw-red lg:bg-kw-red/[0.06]"
                    : "border-ink/15 bg-white/80 text-ink hover:border-kw-red/40 lg:bg-transparent",
                  isDimmed && "opacity-45 hover:opacity-90"
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full transition-colors",
                      isHighlighted
                        ? "bg-kw-red"
                        : "bg-ink/25 group-hover:bg-kw-red/60"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[0.86rem] transition-colors",
                      isHighlighted
                        ? "font-semibold text-kw-red"
                        : "font-medium text-ink"
                    )}
                  >
                    {g.county}
                  </span>
                </span>
                <span
                  className={cn(
                    "type-body-sm tabular-nums",
                    isHighlighted ? "font-semibold text-kw-red" : "text-charcoal"
                  )}
                >
                  {g.communities.length}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="type-body-sm mt-4 text-charcoal">
        Hover or tap any county on the map or list to highlight its communities.
        Select any dot to search active homes there.
      </p>
    </div>
  );

  // Clamp tooltip position horizontally/vertically so it never clips outside map bounds
  const tooltipStyle = activeTooltipTown
    ? {
        left: `${Math.min(
          86,
          Math.max(14, (activeTooltipTown.x / MAP_WIDTH) * 100)
        )}%`,
        top: `${(activeTooltipTown.y / MAP_HEIGHT) * 100}%`,
        placeBelow: activeTooltipTown.y < 110,
      }
    : null;

  const mapCanvas = (
    <div className="flex flex-col gap-3">
      {/* Subtle Legend & Active County Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-charcoal">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute h-3 w-3 rounded-full border border-kw-red/50" />
              <span className="h-1.5 w-1.5 rounded-full bg-kw-red" />
            </span>
            <span className="font-medium text-ink">Layton Market Center</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-kw-red" />
            <span>Served Communities ({UTAH_AREA_COUNT})</span>
          </span>
        </div>

        {selectedGroup ? (
          <button
            type="button"
            onClick={() => setSelectedCounty(null)}
            className="inline-flex items-center gap-1.5 rounded-full border border-kw-red/30 bg-kw-red/10 px-3 py-1 text-[0.72rem] font-semibold text-kw-red transition-colors hover:bg-kw-red hover:text-white"
          >
            <span>
              {selectedGroup.county} ({selectedGroup.communities.length})
            </span>
            <X className="h-3 w-3" />
          </button>
        ) : (
          <span className="text-[0.72rem] text-charcoal/80">
            Click a county to focus · Click a dot to search homes
          </span>
        )}
      </div>

      {/* Interactive Cartographic SVG Frame */}
      <div
        className="relative mx-auto w-full overflow-hidden rounded-2xl border border-ink/12 bg-[#ECEAE4] shadow-sm"
        style={{ aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}` }}
      >
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="block h-full w-full select-none"
          role="img"
          aria-label={`Interactive Northern Utah coverage map showing 9 counties and ${UTAH_AREA_COUNT} communities served by KW Success`}
        >
          {/* Subtle geographic backdrop for bordering states (ID, NV, WY) */}
          <rect
            x={0}
            y={0}
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            fill="#E4E0D8"
          />

          {/* Neighboring state labels outside Utah borders */}
          <g
            fill="#847E75"
            fontSize={10.5}
            fontWeight={600}
            letterSpacing={3.2}
            style={{ pointerEvents: "none" }}
          >
            <text x={360} y={26} textAnchor="middle">
              IDAHO
            </text>
            <text x={855} y={195} textAnchor="middle">
              WYOMING
            </text>
          </g>

          {/* Neighboring Utah context counties (quiet muted stone) */}
          <g style={{ pointerEvents: "none" }}>
            {CONTEXT_COUNTY_PATHS.map((c) => (
              <path
                key={c.county}
                d={c.d}
                fill="#ECE8E1"
                stroke="#D8D3C9"
                strokeWidth={0.9}
                strokeLinejoin="round"
              />
            ))}
          </g>

          {/* 9 Served Northern Utah Counties — base fills & interactive hit regions */}
          <g>
            {SERVED_COUNTY_SHAPES.map((shape) => {
              const isHighlighted = activeCounty === shape.county;
              const isDimmed = Boolean(activeCounty && !isHighlighted);

              return (
                <path
                  key={shape.county}
                  d={shape.d}
                  fill={isHighlighted ? "#F6E2E2" : shape.tone}
                  fillOpacity={isDimmed ? 0.55 : 1}
                  stroke={isHighlighted ? KW_RED : "#B2AA9D"}
                  strokeWidth={isHighlighted ? 2.1 : 1.2}
                  strokeLinejoin="round"
                  className="cursor-pointer transition-colors duration-200 focus:outline-none"
                  role="button"
                  tabIndex={0}
                  aria-label={`${shape.county} — tap to ${
                    selectedCounty === shape.county ? "clear" : "highlight"
                  } communities`}
                  aria-pressed={selectedCounty === shape.county}
                  onMouseEnter={() => setHoveredCounty(shape.county)}
                  onMouseLeave={() => setHoveredCounty(null)}
                  onClick={() => toggleCounty(shape.county)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleCounty(shape.county);
                    }
                  }}
                />
              );
            })}
          </g>

          {/* Subtle Water Shapes: Great Salt Lake (w/ island cutouts), Utah Lake, Bear Lake */}
          <g style={{ pointerEvents: "none" }}>
            {UTAH_LAKE_SHAPES.map((lake) => (
              <path
                key={lake.name}
                d={lake.d}
                fill="#D4E2EC"
                fillOpacity={0.88}
                fillRule="evenodd"
                stroke="#96AFC4"
                strokeWidth={0.95}
                strokeLinejoin="round"
              />
            ))}
          </g>

          {/* Re-stroke active county boundary cleanly on top of lake water so Davis/Weber/Box Elder borders remain crisp */}
          {activeCounty &&
            SERVED_COUNTY_SHAPES.filter((s) => s.county === activeCounty).map(
              (shape) => (
                <path
                  key={`active-outline-${shape.county}`}
                  d={shape.d}
                  fill={KW_RED}
                  fillOpacity={0.07}
                  stroke={KW_RED}
                  strokeWidth={2.2}
                  strokeLinejoin="round"
                  style={{ pointerEvents: "none" }}
                />
              )
            )}

          {/* Water body labels */}
          <g
            fill="#5C7A93"
            fontSize={9.5}
            fontStyle="italic"
            fontWeight={600}
            letterSpacing={1.8}
            textAnchor="middle"
            style={{ pointerEvents: "none" }}
          >
            {UTAH_LAKE_SHAPES.map((lake) => (
              <text key={`lbl-${lake.name}`} x={lake.labelX} y={lake.labelY}>
                {lake.labelLines.map((line, i) => (
                  <tspan
                    key={line}
                    x={lake.labelX}
                    dy={i === 0 ? 0 : 12}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            ))}
          </g>

          {/* County Name Labels */}
          <g style={{ pointerEvents: "none" }}>
            {SERVED_COUNTY_SHAPES.map((shape) => {
              const isHighlighted = activeCounty === shape.county;
              const isDimmed = Boolean(activeCounty && !isHighlighted);
              return (
                <text
                  key={`county-lbl-${shape.county}`}
                  x={shape.labelX}
                  y={shape.labelY}
                  textAnchor="middle"
                  fontSize={isHighlighted ? 11.5 : 10.5}
                  fontWeight={isHighlighted ? 700 : 600}
                  letterSpacing={2.2}
                  fill={isHighlighted ? KW_RED : "#6B655C"}
                  fillOpacity={isDimmed ? 0.35 : 0.9}
                  stroke="#F7F5F0"
                  strokeWidth={3.2}
                  strokeLinejoin="round"
                  style={{ paintOrder: "stroke" }}
                >
                  {shape.shortLabel}
                </text>
              );
            })}
          </g>

          {/* Community Dots (all 74 communities at exact true lat/lng) */}
          <g>
            {orderedTowns.map((town, idx) => {
              const active = isTownActive(town);
              const selected = activeTooltipTown?.name === town.name;
              const baseRadius = town.isMarketCenter
                ? 5.8
                : town.isPrimary
                  ? 4.7
                  : activeCounty && active
                    ? 4.4
                    : 3.4;

              return (
                <a
                  key={town.name}
                  href={town.searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Search homes in ${town.name}, ${town.county}`}
                  className="cursor-pointer focus:outline-none"
                  onMouseEnter={() => setHoveredTown(town)}
                  onMouseLeave={() => setHoveredTown(null)}
                  onFocus={() => setHoveredTown(town)}
                  onBlur={() => setHoveredTown(null)}
                >
                  {/* Generous invisible hit area for effortless click/tap */}
                  <circle
                    cx={town.x}
                    cy={town.y}
                    r={town.isPrimary ? 9 : 6.5}
                    fill="transparent"
                  />

                  {/* Signature outer ring for Layton Market Center */}
                  {town.isMarketCenter && (
                    <circle
                      cx={town.x}
                      cy={town.y}
                      r={10.5}
                      fill="none"
                      stroke={KW_RED}
                      strokeWidth={1.35}
                      strokeOpacity={active ? 0.7 : 0.2}
                    />
                  )}

                  {/* Hover / active focus ring */}
                  {selected && (
                    <circle
                      cx={town.x}
                      cy={town.y}
                      r={11.5}
                      fill={KW_RED_BRIGHT}
                      fillOpacity={0.14}
                      stroke={KW_RED_BRIGHT}
                      strokeWidth={1.4}
                    />
                  )}

                  {/* Visible Community Marker */}
                  <motion.circle
                    cx={town.x}
                    cy={town.y}
                    r={selected ? baseRadius + 1.6 : baseRadius}
                    fill={
                      selected
                        ? KW_RED_BRIGHT
                        : town.isPrimary
                          ? KW_RED
                          : activeCounty && active
                            ? KW_RED
                            : "#8F1E1E"
                    }
                    stroke="#FFFFFF"
                    strokeWidth={town.isPrimary || selected ? 1.6 : 1.1}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{
                      opacity: inView ? (active ? 1 : 0.22) : 0,
                      scale: inView ? 1 : 0.4,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: inView ? Math.min(idx * 0.006, 0.35) : 0,
                    }}
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                    }}
                  />
                </a>
              );
            })}
          </g>

          {/* Priority City Labels (always legible on desktop & mobile, non-colliding) */}
          <g style={{ pointerEvents: "none" }}>
            {towns
              .filter((t) => PRIORITY_LABELS[t.name])
              .map((t) => {
                const pos = PRIORITY_LABELS[t.name];
                const active = isTownActive(t);
                const selected = activeTooltipTown?.name === t.name;
                return (
                  <text
                    key={`city-lbl-${t.name}`}
                    x={t.x + pos.dx}
                    y={t.y + pos.dy}
                    textAnchor={pos.anchor}
                    fontSize={pos.featured ? 13 : 11.5}
                    fontWeight={pos.featured || selected ? 700 : 600}
                    fill={
                      selected || pos.featured
                        ? KW_RED
                        : active
                          ? INK
                          : CHARCOAL
                    }
                    fillOpacity={active ? 1 : 0.28}
                    stroke="#F8F6F2"
                    strokeWidth={3.6}
                    strokeLinejoin="round"
                    style={{ paintOrder: "stroke" }}
                  >
                    {t.name}
                  </text>
                );
              })}
          </g>
        </svg>

        {/* Floating Hover / Search Tooltip */}
        {activeTooltipTown && tooltipStyle && (
          <div
            className={cn(
              "pointer-events-none absolute z-20 -translate-x-1/2 rounded-xl border border-ink/15 bg-ink-deep/95 px-3.5 py-2 text-center shadow-lift backdrop-blur-sm",
              tooltipStyle.placeBelow
                ? "translate-y-4"
                : "-translate-y-[calc(100%_+_14px)]"
            )}
            style={{ left: tooltipStyle.left, top: tooltipStyle.top }}
          >
            <span className="block whitespace-nowrap text-sm font-semibold text-white">
              {activeTooltipTown.name}
              {activeTooltipTown.isMarketCenter && (
                <span className="ml-1.5 rounded bg-kw-red px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white">
                  HQ
                </span>
              )}
            </span>
            <span className="block whitespace-nowrap text-[0.65rem] font-medium uppercase tracking-[0.16em] text-stone-dark">
              {activeTooltipTown.county} · Search homes →
            </span>
          </div>
        )}
      </div>

      {/* Selected County Quick Community Links (great for mobile & dense counties) */}
      {selectedGroup && (
        <div className="rounded-xl border border-ink/10 bg-[#FAF8F4] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-ink">
                {selectedGroup.county}
              </p>
              {selectedGroup.note && (
                <p className="text-xs text-charcoal">{selectedGroup.note}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedCounty(null)}
              className="text-xs font-semibold text-kw-red hover:underline"
            >
              Show all 9 counties
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {selectedGroup.communities.map((comm) => {
              const town = towns.find((t) => t.name === comm);
              if (!town) return null;
              return (
                <a
                  key={comm}
                  href={town.searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredTown(town)}
                  onMouseLeave={() => setHoveredTown(null)}
                  className="group inline-flex items-center gap-1 rounded-full border border-ink/12 bg-white px-3 py-1 text-xs font-medium text-ink transition-colors hover:border-kw-red hover:bg-kw-red hover:text-white"
                >
                  <span>{comm}</span>
                  <ExternalLink className="h-2.5 w-2.5 opacity-55 group-hover:opacity-100" />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  return wide ? (
    <div
      ref={rootRef}
      className="grid grid-cols-[minmax(0,3.6fr)_minmax(0,8.4fr)] items-start gap-10 xl:grid-cols-[minmax(0,3.2fr)_minmax(0,8.8fr)] xl:gap-12"
    >
      <div className="sticky top-24 self-start">
        {headerBlock}
        {countyListBlock}
      </div>
      {mapCanvas}
    </div>
  ) : (
    <div ref={rootRef} className="flex flex-col gap-7">
      {headerBlock}
      {mapCanvas}
      {countyListBlock}
    </div>
  );
}
