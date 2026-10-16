import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Heart,
  LayoutGrid,
  Map as MapIcon,

  Search,
  X,
} from "lucide-react";
import ListingCard, {
  getSavedHomes,
  statusColor,
} from "@/components/ListingCard";
import Reveal, { SplitWords } from "@/components/Reveal";
import type { Listing, ListingStatus, PropertyType } from "@/data/listings";
import { listings, formatPrice, formatBaths } from "@/data/listings";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const PRICE_MIN = 250000;
const PRICE_MAX = 1500000;
const PRICE_STEP = 5000;

const ALL_CITIES = Array.from(new Set(listings.map((l) => l.city))).sort();
const ALL_TYPES: PropertyType[] = ["Single Family", "Condo/Loft", "Estate"];
const ALL_STATUSES: ListingStatus[] = [
  "For Sale",
  "New",
  "Active Under Contract",
  "Sold",
];

type SortKey = "featured" | "price-desc" | "price-asc" | "newest" | "sqft";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "newest", label: "Newest" },
  { value: "sqft", label: "Sq Ft: High → Low" },
];

interface Filters {
  q: string;
  cities: string[];
  min: number;
  max: number;
  beds: number; // 0 = any
  baths: number; // 0 = any
  type: "" | PropertyType;
  status: "" | ListingStatus;
  sort: SortKey;
  view: "grid" | "map";
}

const DEFAULT_FILTERS: Filters = {
  q: "",
  cities: [],
  min: PRICE_MIN,
  max: PRICE_MAX,
  beds: 0,
  baths: 0,
  type: "",
  status: "",
  sort: "featured",
  view: "grid",
};

/* Deterministic map pin positions (percent x/y over the stylized map) */
const PIN_POS: Record<number, { x: number; y: number }> = {
  1: { x: 30, y: 38 },
  2: { x: 16, y: 20 },
  3: { x: 66, y: 72 },
  4: { x: 46, y: 56 },
  5: { x: 36, y: 64 },
  6: { x: 56, y: 28 },
  7: { x: 20, y: 48 },
  8: { x: 72, y: 24 },
  9: { x: 34, y: 80 },
  10: { x: 44, y: 40 },
  11: { x: 52, y: 60 },
  12: { x: 62, y: 48 },
};

const shortPrice = (n: number) =>
  n >= 1000000 ? `$${(n / 1000000).toFixed(2)}M` : `$${Math.round(n / 1000)}K`;

/* ------------------------------------------------------------------ */
/* Query-string <-> filters                                            */
/* ------------------------------------------------------------------ */

function filtersFromParams(params: URLSearchParams): Filters {
  const f = { ...DEFAULT_FILTERS };
  const q = params.get("q");
  if (q) f.q = q;
  const city = params.get("city");
  if (city)
    f.cities = city
      .split(",")
      .map((c) => c.trim())
      .filter((c) => ALL_CITIES.includes(c));
  const min = Number(params.get("min"));
  if (Number.isFinite(min) && min >= PRICE_MIN && min < PRICE_MAX)
    f.min = Math.round(min / PRICE_STEP) * PRICE_STEP;
  const max = Number(params.get("max"));
  if (Number.isFinite(max) && max <= PRICE_MAX && max > PRICE_MIN)
    f.max = Math.round(max / PRICE_STEP) * PRICE_STEP;
  if (f.min > f.max) [f.min, f.max] = [f.max, f.min];
  const beds = Number(params.get("beds"));
  if (beds >= 1 && beds <= 5) f.beds = beds;
  const baths = Number(params.get("baths"));
  if (baths >= 1 && baths <= 5) f.baths = baths;
  const type = params.get("type") as PropertyType | null;
  if (type && ALL_TYPES.includes(type)) f.type = type;
  const status = params.get("status") as ListingStatus | null;
  if (status) {
    if (ALL_STATUSES.includes(status)) f.status = status;
    else if (status === "For Sale · LUXE") f.status = "For Sale";
  }
  const sort = params.get("sort") as SortKey | null;
  if (sort && SORT_OPTIONS.some((o) => o.value === sort)) f.sort = sort;
  if (params.get("view") === "map") f.view = "map";
  return f;
}

function paramsFromFilters(f: Filters): URLSearchParams {
  const p = new URLSearchParams();
  if (f.q) p.set("q", f.q);
  if (f.cities.length) p.set("city", f.cities.join(","));
  if (f.min !== PRICE_MIN) p.set("min", String(f.min));
  if (f.max !== PRICE_MAX) p.set("max", String(f.max));
  if (f.beds) p.set("beds", String(f.beds));
  if (f.baths) p.set("baths", String(f.baths));
  if (f.type) p.set("type", f.type);
  if (f.status) p.set("status", f.status);
  if (f.sort !== "featured") p.set("sort", f.sort);
  if (f.view === "map") p.set("view", "map");
  return p;
}

function applyFilters(f: Filters): Listing[] {
  const q = f.q.trim().toLowerCase();
  let out = listings.filter((l) => {
    if (
      q &&
      !`${l.address} ${l.city} ${l.state} ${l.type} ${l.status}`
        .toLowerCase()
        .includes(q)
    )
      return false;
    if (f.cities.length && !f.cities.includes(l.city)) return false;
    if (l.price < f.min || l.price > f.max) return false;
    if (f.beds && l.beds < f.beds) return false;
    if (f.baths && l.baths < f.baths) return false;
    if (f.type && l.type !== f.type) return false;
    if (f.status) {
      if (f.status === "For Sale") {
        if (l.status !== "For Sale" && l.status !== "For Sale · LUXE")
          return false;
      } else if (l.status !== f.status) return false;
    }
    return true;
  });
  switch (f.sort) {
    case "price-desc":
      out = [...out].sort((a, b) => b.price - a.price);
      break;
    case "price-asc":
      out = [...out].sort((a, b) => a.price - b.price);
      break;
    case "newest":
      out = [...out].sort(
        (a, b) =>
          (b.status === "New" ? 1 : 0) - (a.status === "New" ? 1 : 0) ||
          b.id - a.id
      );
      break;
    case "sqft":
      out = [...out].sort((a, b) => b.sqft - a.sqft);
      break;
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Section 1 — Header band                                             */
/* ------------------------------------------------------------------ */

function HeaderBand({ count }: { count: number }) {
  return (
    <section className="relative flex min-h-[45dvh] flex-col justify-end overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
      >
        <motion.img
          src="/hero-buy.jpg"
          alt="Aerial twilight view of a western-suburbs street grid"
          className="h-full w-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        />
      </motion.div>
      <div className="overlay-hero absolute inset-0" />
      <div className="container-monogram relative z-10 pb-14 pt-24">
        <div className="flex items-center gap-4">
          <motion.span
            className="h-px w-12 origin-left bg-copper"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
          />
          <span className="type-label text-copper">F I N D&nbsp; Y O U R&nbsp; H O M E</span>
        </div>
        <h1 className="type-display-lg mt-6 max-w-4xl text-ivory">
          <SplitWords
            text="Every Search Begins With a Relationship."
            stagger={0.05}
            delay={0.35}
          />
        </h1>
        <motion.p
          className="type-serif-accent mt-4 text-stone-dark"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
        >
          Tell us where your next chapter lives.
        </motion.p>
        <motion.p
          className="type-body-sm mt-6 text-stone-dark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={count}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="inline-block font-medium text-copper"
            >
              {count}
            </motion.span>
          </AnimatePresence>{" "}
          {count === 1 ? "residence" : "residences"} currently represented
          across the Western Suburbs
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 2 — Filter bar                                              */
/* ------------------------------------------------------------------ */

interface FilterBarProps {
  filters: Filters;
  patch: (p: Partial<Filters>) => void;
  clearAll: () => void;
  activeChips: { key: string; label: string; clear: () => void }[];
}

function FilterBar({ filters, patch, clearAll, activeChips }: FilterBarProps) {
  const [visible, setVisible] = useState(true);
  const [cityOpen, setCityOpen] = useState(false);
  const [qInput, setQInput] = useState(filters.q);
  const lastY = useRef(0);
  const cityRef = useRef<HTMLDivElement>(null);

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 140) setVisible(true);
      else if (y > lastY.current + 6) setVisible(false);
      else if (y < lastY.current - 6) setVisible(true);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep local search text in sync when deep links change q (render-time adjust)
  const [prevQ, setPrevQ] = useState(filters.q);
  if (prevQ !== filters.q) {
    setPrevQ(filters.q);
    setQInput(filters.q);
  }

  // Debounced search
  useEffect(() => {
    if (qInput === filters.q) return;
    const t = window.setTimeout(() => patch({ q: qInput }), 300);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qInput]);

  // Close city dropdown on outside click
  useEffect(() => {
    if (!cityOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!cityRef.current?.contains(e.target as Node)) setCityOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [cityOpen]);

  const toggleCity = (c: string) => {
    const has = filters.cities.includes(c);
    patch({
      cities: has
        ? filters.cities.filter((x) => x !== c)
        : [...filters.cities, c],
    });
  };

  const minPct = ((filters.min - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;
  const maxPct = ((filters.max - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

  const controlCls =
    "h-10 border hairline-dark bg-ink px-3 type-body-sm text-ivory outline-none transition-colors focus:border-copper";
  const segBtn = (active: boolean) =>
    cn(
      "flex h-9 min-w-10 items-center justify-center border px-2.5 type-body-sm transition-colors",
      active
        ? "border-copper bg-copper text-ink"
        : "hairline-dark text-stone-dark hover:border-copper hover:text-copper"
    );

  return (
    <motion.div
      className="sticky top-[72px] z-40 border-b hairline-dark bg-ink/95 backdrop-blur-md"
      animate={{ y: visible ? 0 : "-110%" }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      <div className="container-monogram py-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Keyword search */}
          <div className="relative min-w-[200px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-dark" />
            <input
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              placeholder="Address, city, or keyword…"
              aria-label="Search listings"
              className={cn(controlCls, "w-full pl-9")}
            />
          </div>

          {/* City multi-select */}
          <div ref={cityRef} className="relative">
            <button
              type="button"
              onClick={() => setCityOpen((v) => !v)}
              className={cn(
                controlCls,
                "flex items-center gap-2",
                filters.cities.length > 0 && "border-copper text-copper"
              )}
            >
              {filters.cities.length
                ? `${filters.cities.length} ${filters.cities.length === 1 ? "city" : "cities"}`
                : "City"}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  cityOpen && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence>
              {cityOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full z-50 mt-2 w-56 border hairline-dark bg-ink shadow-lift"
                >
                  {ALL_CITIES.map((c) => {
                    const active = filters.cities.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggleCity(c)}
                        className={cn(
                          "flex w-full items-center justify-between px-4 py-2.5 text-left type-body-sm transition-colors hover:bg-white/5",
                          active ? "text-copper" : "text-ivory"
                        )}
                      >
                        {c}
                        <span
                          className={cn(
                            "flex h-4 w-4 items-center justify-center border",
                            active ? "border-copper bg-copper text-ink" : "hairline-dark"
                          )}
                        >
                          {active && <X className="h-3 w-3 rotate-45" strokeWidth={2} />}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Price dual slider */}
          <div className="flex items-center gap-3 border hairline-dark px-4 py-2">
            <div className="type-body-sm w-16 text-copper">{shortPrice(filters.min)}</div>
            <div className="relative h-6 w-40 md:w-48">
              <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-stone-dark/40" />
              <div
                className="absolute top-1/2 h-[3px] -translate-y-1/2 bg-copper"
                style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }}
              />
              <input
                type="range"
                aria-label="Minimum price"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={filters.min}
                onChange={(e) =>
                  patch({ min: Math.min(Number(e.target.value), filters.max - PRICE_STEP) })
                }
                className="range-thumb absolute inset-0 h-full w-full appearance-none bg-transparent"
              />
              <input
                type="range"
                aria-label="Maximum price"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={filters.max}
                onChange={(e) =>
                  patch({ max: Math.max(Number(e.target.value), filters.min + PRICE_STEP) })
                }
                className="range-thumb absolute inset-0 h-full w-full appearance-none bg-transparent"
              />
            </div>
            <div className="type-body-sm w-16 text-right text-copper">
              {shortPrice(filters.max)}
            </div>
          </div>

          {/* Beds */}
          <div className="flex items-center" role="group" aria-label="Bedrooms">
            <span className="type-label mr-2 hidden text-stone-dark xl:inline">Beds</span>
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => patch({ beds: n })}
                className={cn(segBtn(filters.beds === n), "-ml-px first:ml-0")}
              >
                {n === 0 ? "Any" : `${n}+`}
              </button>
            ))}
          </div>

          {/* Baths */}
          <div className="flex items-center" role="group" aria-label="Bathrooms">
            <span className="type-label mr-2 hidden text-stone-dark xl:inline">Baths</span>
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => patch({ baths: n })}
                className={cn(segBtn(filters.baths === n), "-ml-px first:ml-0")}
              >
                {n === 0 ? "Any" : `${n}+`}
              </button>
            ))}
          </div>

          {/* Type */}
          <select
            aria-label="Property type"
            value={filters.type}
            onChange={(e) => patch({ type: e.target.value as Filters["type"] })}
            className={cn(controlCls, filters.type && "border-copper text-copper")}
          >
            <option value="">All Types</option>
            {ALL_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            aria-label="Status"
            value={filters.status}
            onChange={(e) =>
              patch({ status: e.target.value as Filters["status"] })
            }
            className={cn(controlCls, filters.status && "border-copper text-copper")}
          >
            <option value="">Any Status</option>
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            aria-label="Sort results"
            value={filters.sort}
            onChange={(e) => patch({ sort: e.target.value as SortKey })}
            className={controlCls}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {/* Grid / Map toggle */}
          <div className="flex items-center">
            <button
              type="button"
              aria-label="Grid view"
              onClick={() => patch({ view: "grid" })}
              className={cn(
                "flex h-10 w-10 items-center justify-center border transition-colors",
                filters.view === "grid"
                  ? "border-copper bg-copper text-ink"
                  : "hairline-dark text-stone-dark hover:text-copper"
              )}
            >
              <LayoutGrid className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Map view"
              onClick={() => patch({ view: "map" })}
              className={cn(
                "-ml-px flex h-10 w-10 items-center justify-center border transition-colors",
                filters.view === "map"
                  ? "border-copper bg-copper text-ink"
                  : "hairline-dark text-stone-dark hover:text-copper"
              )}
            >
              <MapIcon className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Clear */}
          {activeChips.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="type-body-sm text-copper underline-offset-4 transition-colors hover:text-copper-bright hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        {/* Active filter chips */}
        <AnimatePresence>
          {activeChips.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap items-center gap-2 pt-3">
                {activeChips.map((chip) => (
                  <motion.button
                    layout
                    key={chip.key}
                    type="button"
                    onClick={chip.clear}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    className="flex items-center gap-2 rounded-full border border-copper/50 px-3.5 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-copper transition-colors hover:bg-copper hover:text-ink"
                  >
                    {chip.label}
                    <X className="h-3 w-3" strokeWidth={2} />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section 3 — Results grid                                            */
/* ------------------------------------------------------------------ */

function ResultsGrid({
  results,
  onBroaden,
}: {
  results: Listing[];
  onBroaden: () => void;
}) {
  if (results.length === 0) {
    return (
      <div className="container-monogram flex flex-col items-center py-32 text-center">
        <p className="type-serif-accent text-ivory">No residences match — yet.</p>
        <p className="type-body mt-4 max-w-md text-stone-dark">
          The right home may be just outside these lines. Broaden the search,
          or tell us what you're looking for.
        </p>
        <button
          type="button"
          onClick={onBroaden}
          className="btn-sweep mt-8 rounded-full border border-copper px-8 py-3 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-copper transition-colors duration-300 hover:text-ink"
        >
          Broaden Your Search
        </button>
      </div>
    );
  }

  return (
    <div className="container-monogram grid gap-8 pb-8 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {results.map((l, i) => (
          <motion.div
            layout
            key={l.slug}
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
            transition={{ duration: 0.6, delay: Math.min(i * 0.06, 0.5), ease: EASE }}
          >
            <ListingCard listing={l} tone="dark" />
            <p className="type-body-sm mt-3 text-stone-dark">
              Listed by Monogram Network
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section 4 — Map split view                                          */
/* ------------------------------------------------------------------ */

function MapSplitView({ results }: { results: Listing[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const select = (slug: string, scrollRow = false) => {
    setSelected(slug);
    if (scrollRow) {
      rowRefs.current[slug]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const selectedListing = results.find((l) => l.slug === selected) ?? null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
      className="container-monogram pb-8"
    >
      <div className="grid gap-0 border hairline-dark lg:grid-cols-[55fr_45fr]">
        {/* Compact list */}
        <div className="order-2 max-h-[640px] overflow-y-auto border-t hairline-dark lg:order-1 lg:border-r lg:border-t-0">
          {results.length === 0 && (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center p-10 text-center">
              <p className="type-serif-accent text-ivory">No residences match — yet.</p>
              <p className="type-body-sm mt-3 text-stone-dark">
                Adjust the filters to see homes on the map.
              </p>
            </div>
          )}
          {results.map((l) => {
            const active = selected === l.slug;
            return (
              <div
                key={l.slug}
                ref={(el) => {
                  rowRefs.current[l.slug] = el;
                }}
                onMouseEnter={() => setHovered(l.slug)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "flex cursor-pointer border-b transition-colors hairline-dark",
                  active ? "bg-white/5" : "hover:bg-white/[0.03]"
                )}
                style={{
                  borderLeft: active ? "3px solid var(--copper)" : "3px solid transparent",
                }}
                onClick={() => select(l.slug)}
              >
                <Link
                  to={`/listing/${l.slug}`}
                  className="block h-[120px] w-[160px] shrink-0 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={l.image}
                    alt={l.address}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="font-sans text-[1.15rem] font-medium text-ivory">
                      {formatPrice(l.price)}
                    </p>
                    <p className="type-body-sm truncate text-ivory">{l.address}</p>
                    <p className="type-body-sm text-stone-dark">
                      {l.city}, {l.state}
                    </p>
                    <p className="mt-1 text-[0.66rem] font-medium uppercase tracking-[0.2em] text-stone-dark">
                      {l.beds} BD · {formatBaths(l.baths)} BA ·{" "}
                      {l.sqft.toLocaleString("en-US")} SQFT
                    </p>
                  </div>
                  <span
                    className={cn(
                      "hidden shrink-0 px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.24em] sm:block",
                      statusColor[l.status]
                    )}
                  >
                    {l.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Map */}
        <div className="relative order-1 h-[380px] overflow-hidden lg:order-2 lg:h-[640px]">
          <img
            src="/map-placeholder.jpg"
            alt="Stylized map of the Chicagoland area"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/20" />
          {results.map((l, i) => {
            const pos = PIN_POS[l.id] ?? { x: 50, y: 50 };
            const isHot = hovered === l.slug || selected === l.slug;
            return (
              <motion.button
                key={l.slug}
                type="button"
                aria-label={`${formatPrice(l.price)} — ${l.address}`}
                initial={{ opacity: 0, y: -18, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: isHot ? 1.25 : 1,
                }}
                transition={{
                  delay: 0.3 + i * 0.04,
                  type: "spring",
                  stiffness: 380,
                  damping: 20,
                }}
                onClick={() => select(l.slug, true)}
                onMouseEnter={() => setHovered(l.slug)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "absolute z-10 -translate-x-1/2 -translate-y-1/2 border px-2 py-1 text-[0.62rem] font-medium tracking-[0.08em] transition-colors",
                  isHot
                    ? "border-copper-bright bg-copper-bright text-ink"
                    : "border-copper bg-ink/85 text-copper"
                )}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                {shortPrice(l.price)}
              </motion.button>
            );
          })}

          {/* Selected pin mini-card */}
          <AnimatePresence>
            {selectedListing && (
              <motion.div
                key={selectedListing.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="absolute bottom-4 left-4 right-4 z-20 flex items-center gap-4 border hairline-dark bg-ink/95 p-3 shadow-lift backdrop-blur sm:right-auto sm:w-[340px]"
              >
                <img
                  src={selectedListing.image}
                  alt=""
                  className="h-16 w-20 shrink-0 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-[1.05rem] font-medium text-copper">
                    {formatPrice(selectedListing.price)}
                  </p>
                  <p className="type-body-sm truncate text-ivory">
                    {selectedListing.address}, {selectedListing.city}
                  </p>
                </div>
                <Link
                  to={`/listing/${selectedListing.slug}`}
                  className="shrink-0 text-[0.7rem] font-medium uppercase tracking-[0.26em] text-copper transition-colors hover:text-copper-bright"
                >
                  View →
                </Link>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setSelected(null)}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center border hairline-dark bg-ink text-stone-dark transition-colors hover:text-copper"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section 5 — Can't find it band                                      */
/* ------------------------------------------------------------------ */

function CantFindBand() {
  return (
    <section className="bg-ivory py-24 text-ink md:py-32">
      <div className="container-monogram flex flex-col items-center text-center">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-copper" />
            <span className="type-label text-copper">T R U S T E D&nbsp; A C C E S S</span>
            <span className="h-px w-10 bg-copper" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="type-display-md mt-6 max-w-2xl">
            The right home isn't always listed.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="type-body mt-6 max-w-xl text-stone">
            Trusted Access means we often know what's coming before it hits the
            market. Tell us what you're looking for.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            className="btn-sweep inline-block rounded-full border border-copper px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-copper transition-colors duration-300 hover:text-ink"
          >
            Start the Conversation →
          </Link>
          <Link
            to="/contact/real-estate"
            className="inline-block rounded-full border border-copper px-6 py-3 text-[0.78rem] font-medium uppercase tracking-[0.22em] text-copper transition-colors duration-300 hover:bg-copper hover:text-ink"
          >
            Contact Us
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Buy() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo(() => filtersFromParams(searchParams), [searchParams]);
  const results = useMemo(() => applyFilters(filters), [filters]);
  // Touch saved homes so the nav badge state is warm on this page
  const [, setSavedTick] = useState(0);
  useEffect(() => {
    const onSaved = () => setSavedTick((t) => t + 1);
    window.addEventListener("mn-saved-changed", onSaved);
    getSavedHomes();
    return () => window.removeEventListener("mn-saved-changed", onSaved);
  }, []);

  const patch = (p: Partial<Filters>) => {
    setSearchParams(paramsFromFilters({ ...filters, ...p }), { replace: true });
  };
  const clearAll = () => setSearchParams(new URLSearchParams(), { replace: true });

  const activeChips: { key: string; label: string; clear: () => void }[] = [];
  if (filters.q)
    activeChips.push({
      key: "q",
      label: `“${filters.q}”`,
      clear: () => patch({ q: "" }),
    });
  filters.cities.forEach((c) =>
    activeChips.push({
      key: `city-${c}`,
      label: c,
      clear: () => patch({ cities: filters.cities.filter((x) => x !== c) }),
    })
  );
  if (filters.min !== PRICE_MIN || filters.max !== PRICE_MAX)
    activeChips.push({
      key: "price",
      label: `${shortPrice(filters.min)} – ${shortPrice(filters.max)}`,
      clear: () => patch({ min: PRICE_MIN, max: PRICE_MAX }),
    });
  if (filters.beds)
    activeChips.push({
      key: "beds",
      label: `${filters.beds}+ Beds`,
      clear: () => patch({ beds: 0 }),
    });
  if (filters.baths)
    activeChips.push({
      key: "baths",
      label: `${filters.baths}+ Baths`,
      clear: () => patch({ baths: 0 }),
    });
  if (filters.type)
    activeChips.push({
      key: "type",
      label: filters.type,
      clear: () => patch({ type: "" }),
    });
  if (filters.status)
    activeChips.push({
      key: "status",
      label: filters.status,
      clear: () => patch({ status: "" }),
    });

  // Empty-state "broaden": relax one filter at a time
  const broaden = () => {
    if (filters.q) return patch({ q: "" });
    if (filters.cities.length) return patch({ cities: [] });
    if (filters.min !== PRICE_MIN || filters.max !== PRICE_MAX)
      return patch({ min: PRICE_MIN, max: PRICE_MAX });
    if (filters.beds) return patch({ beds: 0 });
    if (filters.baths) return patch({ baths: 0 });
    if (filters.type) return patch({ type: "" });
    if (filters.status) return patch({ status: "" });
    clearAll();
  };

  return (
    <div className="bg-ink">
      {/* Scoped styles for the dual-thumb price slider (index.css is shared) */}
      <style>{`
        .range-thumb { pointer-events: none; margin: 0; }
        .range-thumb::-webkit-slider-thumb {
          pointer-events: auto; appearance: none; -webkit-appearance: none;
          width: 14px; height: 14px; border-radius: 0;
          background: var(--copper); border: 1px solid var(--copper-bright);
          cursor: pointer;
        }
        .range-thumb::-moz-range-thumb {
          pointer-events: auto; width: 14px; height: 14px; border-radius: 0;
          background: var(--copper); border: 1px solid var(--copper-bright);
          cursor: pointer;
        }
      `}</style>

      <HeaderBand count={results.length} />
      <FilterBar
        filters={filters}
        patch={patch}
        clearAll={clearAll}
        activeChips={activeChips}
      />

      <section className="py-10">
        <div className="container-monogram mb-6 flex items-center justify-between">
          <p className="type-body-sm text-stone-dark">
            Showing{" "}
            <span className="text-copper">{results.length}</span> of{" "}
            {listings.length} residences
            {filters.view === "map" ? " · Map view" : ""}
          </p>
          <p className="type-body-sm hidden items-center gap-2 text-stone-dark sm:flex">
            <Heart className="h-3.5 w-3.5 text-copper" strokeWidth={1.5} />
            Tap the heart to save a home
          </p>
        </div>
        {filters.view === "grid" ? (
          <ResultsGrid results={results} onBroaden={broaden} />
        ) : (
          <MapSplitView results={results} />
        )}
      </section>

      <CantFindBand />
    </div>
  );
}
