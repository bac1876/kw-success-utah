import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  Building2,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Expand,
  Heart,

  Share2,
  Store,
  TrainFront,
  Trees,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ListingCard, { getSavedHomes, statusColor } from "@/components/ListingCard";
import Reveal, { SplitWords } from "@/components/Reveal";
import type { Listing } from "@/data/listings";
import {
  listings,
  getListingBySlug,
  formatPrice,
  formatBaths,
} from "@/data/listings";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const SAVED_KEY = "mn-saved-homes";

function toggleSavedHome(slug: string): boolean {
  const saved = getSavedHomes();
  const idx = saved.indexOf(slug);
  if (idx >= 0) saved.splice(idx, 1);
  else saved.push(slug);
  localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  window.dispatchEvent(new Event("mn-saved-changed"));
  return idx < 0;
}

/* ------------------------------------------------------------------ */
/* Per-listing editorial + facts (placeholder IDX data)                */
/* ------------------------------------------------------------------ */

const HEADLINES: Record<string, string> = {
  "farmhouse-on-fox-bend": "A Farmhouse Made for Slow Mornings",
  "georgian-on-river-street": "Georgian Grace by the River",
  "craftsman-on-prairie-ave": "A Porch Built for Conversation",
  "french-country-estate": "French Country Calm, Close to Everything",
  "midcentury-ranch": "Mid-Century Lines, Modern Ease",
  "cedar-modern-new-build": "New Lines, Warm Cedar",
  "victorian-on-walnut": "The Victorian the Street Is Proud Of",
  "tudor-on-crescent": "Storybook Brick, Everyday Gravitas",
  "prairie-contemporary": "Prairie Calm, Quietly Confident",
  "updated-split-level": "A Classic, Thoughtfully Renewed",
  "downtown-loft": "Brick, Timber, and Downtown Energy",
  "the-stonebridge-estate": "An Estate That Asks for Something More",
};

const STORY_OPENERS: Record<string, string> = {
  "farmhouse-on-fox-bend":
    "Set along a quiet bend in Aurora's Fox Valley, 1420 Fox Bend Ln was designed for the life that happens between milestones — Saturday pancakes in the white-oak kitchen, long talks on the wraparound porch, homework spread across the island while the light shifts across black-framed windows.",
};

const YEAR_BUILT: Record<number, number> = {
  1: 2021, 2: 1962, 3: 1948, 4: 2003, 5: 1959, 6: 2024,
  7: 1912, 8: 1936, 9: 2016, 10: 1978, 11: 1928, 12: 2019,
};

const DISTRICTS: Record<string, string> = {
  Aurora: "204",
  Naperville: "203",
  Geneva: "304",
  "Downers Grove": "99",
  Wheaton: "200",
  "St. Charles": "303",
  Elmhurst: "205",
  Plainfield: "202",
};

function lotAcres(l: Listing): string {
  if (l.id === 1) return "0.42";
  if (l.type === "Estate") return "2.10";
  if (l.type === "Condo/Loft") return "—";
  return (0.18 + (l.id % 6) * 0.05).toFixed(2);
}

function garage(l: Listing): string {
  if (l.type === "Condo/Loft") return "1-car";
  if (l.type === "Estate") return "4-car";
  return l.beds >= 5 ? "3-car" : "2-car";
}

function taxes(l: Listing): string {
  return "$" + (Math.round((l.price * 0.021) / 100) * 100).toLocaleString("en-US");
}

function mls(l: Listing): string {
  return `MRN${1204 + (l.id - 1) * 37}`;
}

interface Neighborhood {
  label: string;
  rows: { icon: LucideIcon; text: string }[];
}

const NEIGHBORHOODS: Record<string, Neighborhood> = {
  Aurora: {
    label: "Aurora · Fox Valley",
    rows: [
      { icon: Trees, text: "5 min — Fox River Trail" },
      { icon: Building2, text: "12 min — Downtown Naperville" },
      { icon: TrainFront, text: "35 min — Chicago Union Station (BNSF)" },
    ],
  },
  Naperville: {
    label: "Naperville · Riverwalk",
    rows: [
      { icon: Trees, text: "4 min — The Riverwalk" },
      { icon: Coffee, text: "8 min — Downtown Naperville" },
      { icon: TrainFront, text: "55 min — Chicago Union Station (BNSF)" },
    ],
  },
  Geneva: {
    label: "Geneva · Third Street",
    rows: [
      { icon: Trees, text: "3 min — Fox River Trail" },
      { icon: Store, text: "5 min — Third Street shops" },
      { icon: TrainFront, text: "65 min — Chicago Ogilvie (UP-W)" },
    ],
  },
};

function neighborhood(l: Listing): Neighborhood {
  return (
    NEIGHBORHOODS[l.city] ?? {
      label: `${l.city} · Western Suburbs`,
      rows: [
        { icon: Trees, text: "Minutes — Local forest preserves" },
        { icon: Store, text: `5 min — Downtown ${l.city}` },
        { icon: TrainFront, text: "Under an hour — Downtown Chicago" },
      ],
    }
  );
}

interface Photo {
  src: string;
  label: string;
}

function photosFor(l: Listing): Photo[] {
  return [
    { src: l.image, label: "Exterior" },
    { src: "/interior-a.jpg", label: "Chef's Kitchen" },
    { src: "/interior-b.jpg", label: "Great Room" },
    { src: "/interior-c.jpg", label: "Primary Suite" },
    { src: "/interior-d.jpg", label: "Spa Bath" },
  ];
}

/* ------------------------------------------------------------------ */
/* Accent theming — copper default, gold for the LUXE flagship         */
/* ------------------------------------------------------------------ */

interface Accent {
  text: string;
  textHover: string;
  border: string;
  bg: string;
  bgHover: string;
  ring: string;
  hairline: string;
}

const COPPER_ACCENT: Accent = {
  text: "text-copper",
  textHover: "hover:text-copper-bright",
  border: "border-copper",
  bg: "bg-copper",
  bgHover: "hover:bg-copper",
  ring: "border-copper/50",
  hairline: "hairline-dark",
};

const GOLD_ACCENT: Accent = {
  text: "text-luxe-gold",
  textHover: "hover:text-[#e0c06a]",
  border: "border-luxe-gold",
  bg: "bg-luxe-gold",
  bgHover: "hover:bg-luxe-gold",
  ring: "border-luxe-gold/50",
  hairline: "border-[rgba(201,162,75,0.35)]",
};

/* ------------------------------------------------------------------ */
/* 404 state                                                           */
/* ------------------------------------------------------------------ */

function NotFound() {
  return (
    <section className="bg-ink">
      <div className="container-monogram flex min-h-[70dvh] flex-col items-center justify-center py-28 text-center">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-copper" />
          <span className="type-label text-copper">O F F&nbsp; M A R K E T</span>
          <span className="h-px w-10 bg-copper" />
        </div>
        <p className="type-serif-accent mt-8 max-w-xl text-ivory">
          This residence has found its family.
        </p>
        <p className="type-body mt-6 max-w-md text-stone-dark">
          The home you're looking for is no longer available — but the next
          chapter of your search is already waiting.
        </p>
        <Link
          to="/buy"
          className="btn-sweep mt-10 inline-block rounded-full border border-copper px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-copper transition-colors duration-300 hover:text-ink"
        >
          Browse All Residences
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 2 — Lightbox                                                */
/* ------------------------------------------------------------------ */

function Lightbox({
  photos,
  index,
  onClose,
  onNav,
  acc,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
  acc: Accent;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNav]);

  const photo = photos[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[90] flex flex-col bg-ink/[0.98]"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-6 py-5 md:px-10">
        <p className="type-body-sm tracking-[0.3em] text-stone-dark">
          {index + 1} / {photos.length}
        </p>
        <button
          type="button"
          aria-label="Close gallery"
          onClick={onClose}
          className={cn(
            "flex h-11 w-11 items-center justify-center border transition-colors",
            acc.ring,
            acc.text,
            acc.bgHover,
            "hover:text-ink"
          )}
        >
          <X className="h-5 w-5" strokeWidth={1.25} />
        </button>
      </div>
      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-8 md:px-24"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={photo.src + index}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex max-h-full flex-col items-center"
          >
            <img
              src={photo.src}
              alt={photo.label}
              className="max-h-[70dvh] w-auto max-w-full object-contain"
            />
            <figcaption className="type-label mt-5 text-stone-dark">
              {photo.label}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => onNav(-1)}
          className={cn(
            "absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border transition-colors md:left-8",
            acc.border,
            acc.text,
            "hover:bg-white/5"
          )}
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.25} />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => onNav(1)}
          className={cn(
            "absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border transition-colors md:right-8",
            acc.border,
            acc.text,
            "hover:bg-white/5"
          )}
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.25} />
        </button>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section 1 — Gallery hero                                            */
/* ------------------------------------------------------------------ */

function GalleryHero({
  listing,
  photos,
  active,
  setActive,
  openLightbox,
  acc,
  luxe,
}: {
  listing: Listing;
  photos: Photo[];
  active: number;
  setActive: (i: number) => void;
  openLightbox: (i: number) => void;
  acc: Accent;
  luxe: boolean;
}) {
  const [saved, setSaved] = useState(() => getSavedHomes().includes(listing.slug));
  const [toast, setToast] = useState(false);

  // Reset gallery + save state when navigating between listings (render-time adjust)
  const [prevSlug, setPrevSlug] = useState(listing.slug);
  if (prevSlug !== listing.slug) {
    setPrevSlug(listing.slug);
    setActive(0);
    setSaved(getSavedHomes().includes(listing.slug));
  }

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      /* clipboard unavailable — still show confirmation */
    }
    setToast(true);
    window.setTimeout(() => setToast(false), 2200);
  };

  const photo = photos[active];

  return (
    <section className="relative min-h-[85dvh] overflow-hidden bg-ink">
      {/* Main image with curtain-reveal swap */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={photo.src}
          className="absolute inset-0"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        >
          <img
            src={photo.src}
            alt={`${listing.address}, ${listing.city}`}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      {/* Bottom 40% gradient only */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[45%] bg-[linear-gradient(180deg,transparent,rgba(18,20,19,0.55)_45%,rgba(18,20,19,0.88))]" />

      {/* Back link */}
      <Link
        to="/buy"
        className="type-body-sm absolute left-6 top-6 z-20 flex items-center gap-2 text-ivory/90 transition-colors hover:text-copper md:left-10"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        All Residences
      </Link>

      {luxe && (
        <div className="absolute right-6 top-6 z-20 border border-luxe-gold/60 px-4 py-2 md:right-10">
          <span className="type-label text-luxe-gold">M O N O G R A M&nbsp; L U X E</span>
        </div>
      )}

      {/* Bottom-left identity block */}
      <div className="absolute bottom-0 left-0 z-10 max-w-2xl p-6 pb-24 md:p-10 md:pb-10">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={cn(
            "inline-block px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.28em]",
            statusColor[listing.status]
          )}
        >
          {listing.status}
        </motion.span>
        <h1 className="type-display-md mt-4 text-ivory">
          <SplitWords text={formatPrice(listing.price)} stagger={0.05} delay={0.4} />
        </h1>
        <p className="mt-2 font-sans text-[clamp(1.3rem,2.4vw,1.9rem)] font-normal tracking-[0.02em] text-ivory">
          <SplitWords text={listing.address} stagger={0.05} delay={0.55} />
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="type-body mt-1 text-stone-dark"
        >
          {listing.city}, {listing.state}
        </motion.p>
      </div>

      {/* Bottom-right spec strip + actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
        className="absolute bottom-0 right-0 z-10 hidden items-stretch p-6 md:flex md:p-10"
      >
        <div className="flex items-center border bg-ink/60 backdrop-blur-sm" style={{ borderColor: "rgba(184,115,51,0.28)" }}>
          {[
            `${listing.beds} BD`,
            `${formatBaths(listing.baths)} BA`,
            `${listing.sqft.toLocaleString("en-US")} SQFT`,
            lotAcres(listing) !== "—" ? `${lotAcres(listing)} AC` : listing.type,
          ].map((s, i) => (
            <span
              key={s}
              className={cn(
                "px-4 py-3 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ivory",
                i > 0 && "border-l border-white/15"
              )}
            >
              {s}
            </span>
          ))}
          <button
            type="button"
            aria-label={saved ? "Unsave home" : "Save home"}
            onClick={() => setSaved(toggleSavedHome(listing.slug))}
            className={cn(
              "flex items-center justify-center border-l border-white/15 px-4 transition-colors",
              saved ? acc.text : "text-ivory hover:text-copper"
            )}
          >
            <motion.span
              key={String(saved)}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="flex"
            >
              <Heart
                className="h-4 w-4"
                fill={saved ? "currentColor" : "none"}
                strokeWidth={1.5}
              />
            </motion.span>
          </button>
          <button
            type="button"
            aria-label="Share this listing"
            onClick={share}
            className="flex items-center justify-center border-l border-white/15 px-4 text-ivory transition-colors hover:text-copper"
          >
            <Share2 className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </motion.div>

      {/* Mobile spec strip */}
      <div className="absolute bottom-20 left-6 right-6 z-10 flex flex-wrap items-center gap-x-4 gap-y-1 md:hidden">
        {[
          `${listing.beds} BD`,
          `${formatBaths(listing.baths)} BA`,
          `${listing.sqft.toLocaleString("en-US")} SQFT`,
        ].map((s) => (
          <span
            key={s}
            className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-ivory"
          >
            {s}
          </span>
        ))}
        <button
          type="button"
          aria-label={saved ? "Unsave home" : "Save home"}
          onClick={() => setSaved(toggleSavedHome(listing.slug))}
          className={cn(saved ? acc.text : "text-ivory")}
        >
          <Heart className="h-4 w-4" fill={saved ? "currentColor" : "none"} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Share this listing"
          onClick={share}
          className="text-ivory"
        >
          <Share2 className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* View all photos */}
      <button
        type="button"
        onClick={() => openLightbox(active)}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/40 bg-ink/40 px-6 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.26em] text-ivory backdrop-blur-sm transition-colors hover:border-copper hover:text-copper"
      >
        <Expand className="h-3.5 w-3.5" strokeWidth={1.5} />
        View All Photos
      </button>

      {/* Thumbnail rail */}
      <div className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            aria-label={`Show ${p.label}`}
            onClick={() => setActive(i)}
            className={cn(
              "h-14 w-[72px] overflow-hidden border-2 transition-all",
              i === active
                ? acc.border
                : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <img src={p.src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* Share toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="absolute bottom-24 left-1/2 z-30 -translate-x-1/2 border hairline-dark bg-ink px-5 py-2.5 type-body-sm text-copper shadow-lift"
          >
            Link copied
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 3 — Story + quick facts                                     */
/* ------------------------------------------------------------------ */

function StorySection({ listing, acc }: { listing: Listing; acc: Accent }) {
  const facts: [string, string][] = [
    ["Year Built", String(YEAR_BUILT[listing.id] ?? 2005)],
    ["Lot", lotAcres(listing) === "—" ? "—" : `${lotAcres(listing)} AC`],
    ["Garage", garage(listing)],
    ["School District", DISTRICTS[listing.city] ?? "—"],
    ["Taxes", `${taxes(listing)} / yr`],
    ["MLS #", mls(listing)],
  ];

  const opener =
    STORY_OPENERS[listing.slug] ??
    `${listing.story} Set in ${listing.city}, ${listing.address} offers the rare combination of presence and practicality — a home that holds its corners of quiet even on the fullest days.`;

  return (
    <section className="bg-ivory py-24 text-ink md:py-32">
      <div className="container-monogram grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className={cn("h-px w-10", acc.bg)} />
              <span className={cn("type-label", acc.text)}>T H E&nbsp; H O M E</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="type-display-md mt-6 max-w-xl">
              {HEADLINES[listing.slug] ?? "A Home With a Story to Tell"}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="type-body mt-8 max-w-2xl text-ink/80">{opener}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="type-body mt-6 max-w-2xl text-ink/80">
              Every showing here is unhurried, and every question is welcome —
              because a decision this personal deserves an advisor, not a
              countdown. When you're ready, we'll walk it together, room by
              room, and talk honestly about how it fits the life you're
              building.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.15} y={30}>
            <div className="bg-ivory-deep p-7 lg:sticky lg:top-[140px]">
              <p className={cn("type-label", acc.text)}>Quick Facts</p>
              <dl className="mt-5">
                {facts.map(([k, v], i) => (
                  <motion.div
                    key={k}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="flex items-center justify-between border-b hairline-light py-3 last:border-b-0"
                  >
                    <dt className="type-body-sm uppercase tracking-[0.18em] text-stone">
                      {k}
                    </dt>
                    <dd className="type-body-sm font-medium text-ink">{v}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 4 — Walkthrough gallery                                     */
/* ------------------------------------------------------------------ */

function WalkthroughGallery({
  photos,
  openLightbox,
  acc,
}: {
  photos: Photo[];
  openLightbox: (i: number) => void;
  acc: Accent;
}) {
  const interiors = photos.slice(1);
  return (
    <section className="bg-ivory pb-24 text-ink md:pb-32">
      <div className="container-monogram">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className={cn("h-px w-10", acc.bg)} />
            <span className={cn("type-label", acc.text)}>T H E&nbsp; W A L K T H R O U G H</span>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {interiors.map((p, i) => (
            <motion.button
              key={p.src}
              type="button"
              onClick={() => openLightbox(i + 1)}
              initial={{ clipPath: i % 2 === 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0%)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.65, 0, 0.35, 1] }}
              className="group relative block aspect-[3/2] overflow-hidden text-left"
            >
              <img
                src={p.src}
                alt={p.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
              <span
                className={cn(
                  "type-label absolute bottom-5 left-5 translate-y-3 bg-ink/70 px-3 py-2 text-ivory opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                )}
              >
                {p.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 5 — Monthly estimate                                        */
/* ------------------------------------------------------------------ */

function MortgageEstimator({ listing, acc }: { listing: Listing; acc: Accent }) {
  const [price, setPrice] = useState(listing.price);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.25);
  const [term, setTerm] = useState<30 | 15>(30);

  // Prefill from the listing; adjust during render when the listing changes
  const [prevListingPrice, setPrevListingPrice] = useState(listing.price);
  if (prevListingPrice !== listing.price) {
    setPrevListingPrice(listing.price);
    setPrice(listing.price);
  }

  const down = Math.round(price * (downPct / 100));
  const principal = Math.max(price - down, 0);
  const r = rate / 100 / 12;
  const n = term * 12;
  const pi =
    r > 0 ? (principal * r) / (1 - Math.pow(1 + r, -n)) : principal / n;
  const taxM = (price * 0.021) / 12;
  const insM = (price * 0.0035) / 12;
  const hoaM = 0;
  const total = pi + taxM + insM + hoaM;

  // Odometer tween on the headline number
  const mv = useMotionValue(0);
  useEffect(() => {
    const controls = animate(mv, total, { duration: 0.5, ease: "easeOut" });
    return () => controls.stop();
  }, [total, mv]);
  const display = useTransform(
    mv,
    (v) => "$" + Math.round(v).toLocaleString("en-US")
  );

  const rows: { label: string; value: number; accent: boolean }[] = [
    { label: "Principal & Interest", value: pi, accent: true },
    { label: "Property Taxes", value: taxM, accent: false },
    { label: "Home Insurance", value: insM, accent: false },
    { label: "HOA", value: hoaM, accent: false },
  ];

  const inputCls =
    "w-full border hairline-dark bg-transparent px-4 py-3 type-body-sm text-ivory outline-none transition-colors focus:border-copper";

  return (
    <section className="bg-ink py-28 md:py-40">
      <div className="container-monogram">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className={cn("h-px w-10", acc.bg)} />
            <span className={cn("type-label", acc.text)}>
              P L A N&nbsp; W I T H&nbsp; Y O U R&nbsp; A D V I S O R
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="type-display-md mt-6 text-ivory">
            Understand the Investment.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-2">
          {/* Inputs */}
          <Reveal delay={0.15}>
            <div className="space-y-8">
              <div>
                <label className="type-label text-stone-dark" htmlFor="mn-price">
                  Home Price
                </label>
                <input
                  id="mn-price"
                  type="number"
                  min={0}
                  step={5000}
                  value={price}
                  onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
                  className={cn(inputCls, "mt-3")}
                />
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <label className="type-label text-stone-dark" htmlFor="mn-down">
                    Down Payment
                  </label>
                  <span className="type-body-sm text-ivory">
                    {downPct}% ·{" "}
                    <span className={acc.text}>${down.toLocaleString("en-US")}</span>
                  </span>
                </div>
                <input
                  id="mn-down"
                  type="range"
                  min={0}
                  max={50}
                  step={1}
                  value={downPct}
                  onChange={(e) => setDownPct(Number(e.target.value))}
                  className="mn-range mt-4 h-[3px] w-full appearance-none outline-none"
                  style={{
                    background: `linear-gradient(90deg, var(--copper) ${downPct * 2}%, rgba(169,164,154,0.3) ${downPct * 2}%)`,
                  }}
                />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="type-label text-stone-dark" htmlFor="mn-rate">
                    Rate (%)
                  </label>
                  <input
                    id="mn-rate"
                    type="number"
                    min={0}
                    max={15}
                    step={0.125}
                    value={rate}
                    onChange={(e) =>
                      setRate(Math.min(15, Math.max(0, Number(e.target.value))))
                    }
                    className={cn(inputCls, "mt-3")}
                  />
                </div>
                <div>
                  <label className="type-label text-stone-dark" htmlFor="mn-term">
                    Term
                  </label>
                  <select
                    id="mn-term"
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value) as 30 | 15)}
                    className={cn(inputCls, "mt-3 bg-ink")}
                  >
                    <option value={30}>30 years</option>
                    <option value={15}>15 years</option>
                  </select>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Output */}
          <Reveal delay={0.25}>
            <div className="border hairline-dark p-8">
              <p className="type-label text-stone-dark">Estimated Monthly</p>
              <motion.p className={cn("type-stat mt-3", acc.text)}>
                {display}
              </motion.p>
              <div className="mt-8 space-y-5">
                {rows.map((row) => (
                  <div key={row.label}>
                    <div className="flex items-baseline justify-between">
                      <span className="type-body-sm text-stone-dark">{row.label}</span>
                      <span className="type-body-sm font-medium text-ivory">
                        ${Math.round(row.value).toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="mt-2 h-[3px] w-full bg-white/10">
                      <motion.div
                        className={cn("h-full", row.accent ? acc.bg : "bg-stone")}
                        animate={{
                          width: `${total > 0 ? (row.value / total) * 100 : 0}%`,
                        }}
                        transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="type-body-sm mt-8 text-stone-dark">
                Estimates only.{" "}
                <Link
                  to="/services"
                  className={cn(acc.text, acc.textHover, "transition-colors")}
                >
                  Connect with Mutual of Omaha Mortgage for guidance →
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 6 — Location                                                */
/* ------------------------------------------------------------------ */

function LocationSection({ listing, acc }: { listing: Listing; acc: Accent }) {
  const hood = neighborhood(listing);
  return (
    <section className="bg-ivory py-24 text-ink md:py-32">
      <div className="container-monogram grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="relative aspect-[7/5] overflow-hidden">
              <img
                src="/map-placeholder.jpg"
                alt={`Stylized map around ${listing.city}`}
                className="h-full w-full object-cover"
              />
              {/* Pin + pulsing radius ring */}
              <motion.div
                initial={{ scale: 0, y: -16 }}
                whileInView={{ scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ type: "spring", stiffness: 300, damping: 16 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <motion.span
                  className={cn("absolute left-1/2 top-1/2 block h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border", acc.border)}
                  animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
                <span className={cn("relative block h-3.5 w-3.5 rounded-full", acc.bg)} />
              </motion.div>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className={cn("h-px w-10", acc.bg)} />
              <span className={cn("type-label", acc.text)}>T H E&nbsp; N E I G H B O R H O O D</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="type-display-md mt-6">{hood.label}</h2>
          </Reveal>
          <div className="mt-8 space-y-0">
            {hood.rows.map((row, i) => (
              <Reveal key={row.text} delay={0.15 + i * 0.08} y={20}>
                <div className="flex items-center gap-4 border-b hairline-light py-4">
                  <row.icon className={cn("h-5 w-5 shrink-0", acc.text)} strokeWidth={1.25} />
                  <span className="type-body-sm text-ink/85">{row.text}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4}>
            <p className="type-serif-accent mt-8 text-stone">
              A neighborhood is part of the home. We'll walk it with you.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 7 — Schedule a tour                                         */
/* ------------------------------------------------------------------ */

function FloatField({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full border hairline-light bg-transparent px-4 pb-2.5 pt-6 type-body-sm text-ink outline-none transition-colors focus:border-copper"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 type-body-sm text-stone transition-all duration-200 peer-focus:top-3 peer-focus:text-[0.62rem] peer-focus:uppercase peer-focus:tracking-[0.22em] peer-focus:text-copper peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-[0.62rem] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.22em]"
      >
        {label}
      </label>
    </div>
  );
}

function TourSection({ listing, acc }: { listing: Listing; acc: Accent }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState(
    `I'd like to tour ${listing.address}.`
  );
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  // Reset the form when navigating to a different residence (render-time adjust)
  const [prevAddress, setPrevAddress] = useState(listing.address);
  if (prevAddress !== listing.address) {
    setPrevAddress(listing.address);
    setMessage(`I'd like to tour ${listing.address}.`);
    setState("idle");
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (state !== "idle") return;
    setState("sending");
    window.setTimeout(() => setState("done"), 1100);
  };

  return (
    <section className="border-t bg-ink py-28 hairline-dark md:py-40">
      <div className="container-monogram grid gap-14 lg:grid-cols-2">
        {/* Left */}
        <div>
          <Reveal>
            <h2 className="type-display-md text-ivory">
              <SplitWords text="Come See It in Person." stagger={0.05} />
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="type-serif-accent mt-5 text-stone-dark">
              Every relationship begins with a conversation.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10 flex items-center gap-5 border hairline-dark p-5">
              <img
                src="/about-portrait-2.jpg"
                alt="Elena Marsh, Managing Broker"
                className="h-16 w-16 rounded-full border object-cover"
                style={{ borderColor: "rgba(184,115,51,0.4)" }}
              />
              <div className="min-w-0">
                <p className="type-body font-normal text-ivory">
                  Elena Marsh · Managing Broker
                </p>
                <p className="type-body-sm text-stone-dark">
                  KW Innovate · Monogram Network
                </p>
              </div>
              <Link
                to="/contact/real-estate"
                className="inline-block rounded-full border border-copper px-6 py-3 text-[0.78rem] font-medium uppercase tracking-[0.22em] text-copper transition-colors duration-300 hover:bg-copper hover:text-ink"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Right — form card */}
        <Reveal delay={0.2}>
          <div className="bg-ivory p-7 text-ink md:p-9">
            <AnimatePresence mode="wait">
              {state === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex min-h-[380px] flex-col items-center justify-center text-center"
                >
                  <svg viewBox="0 0 64 64" className="h-16 w-16">
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="29"
                      fill="none"
                      strokeWidth="1.5"
                      className={acc.text}
                      stroke="currentColor"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M20 33 L29 42 L45 24"
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className={acc.text}
                      stroke="currentColor"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 0.35, ease: "easeInOut" }}
                    />
                  </svg>
                  <p className="type-display-md mt-7 text-[1.4rem]">
                    Thank you — Elena will reach out within the hour.
                  </p>
                  <p className="type-serif-accent mt-4 text-[1.25rem] text-stone">
                    This is the beginning of long-term guidance, not the end of
                    a form.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-5"
                >
                  <p className={cn("type-label", acc.text)}>Schedule a Tour</p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FloatField id="tour-name" label="Name" value={name} onChange={setName} required />
                    <FloatField id="tour-email" label="Email" type="email" value={email} onChange={setEmail} required />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FloatField id="tour-phone" label="Phone" type="tel" value={phone} onChange={setPhone} />
                    <FloatField id="tour-date" label="Preferred Date" type="date" value={date} onChange={setDate} />
                  </div>
                  <div className="relative">
                    <textarea
                      id="tour-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder=" "
                      className="peer w-full resize-none border hairline-light bg-transparent px-4 pb-3 pt-7 type-body-sm text-ink outline-none transition-colors focus:border-copper"
                    />
                    <label
                      htmlFor="tour-message"
                      className="pointer-events-none absolute left-4 top-3 text-[0.62rem] uppercase tracking-[0.22em] text-stone transition-colors peer-focus:text-copper"
                    >
                      Message
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className={cn(
                      "flex w-full items-center justify-center gap-3 py-4 text-[0.8rem] font-medium uppercase tracking-[0.3em] text-ink transition-opacity",
                      acc.bg,
                      state === "sending" ? "opacity-80" : "hover:opacity-90"
                    )}
                  >
                    {state === "sending" ? (
                      <>
                        <motion.span
                          className="block h-4 w-4 rounded-full border-2 border-ink/30 border-t-ink"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        Sending…
                      </>
                    ) : (
                      "Request a Tour"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 8 — Similar residences                                      */
/* ------------------------------------------------------------------ */

function SimilarResidences({ listing, acc }: { listing: Listing; acc: Accent }) {
  const similar = useMemo(() => {
    const others = listings.filter((l) => l.slug !== listing.slug);
    const sameCity = others.filter((l) => l.city === listing.city);
    const byPrice = [...others].sort(
      (a, b) =>
        Math.abs(a.price - listing.price) - Math.abs(b.price - listing.price)
    );
    const picked: Listing[] = [...sameCity];
    for (const l of byPrice) {
      if (picked.length >= 3) break;
      if (!picked.includes(l)) picked.push(l);
    }
    return picked.slice(0, 3);
  }, [listing]);

  return (
    <section className="border-t bg-ink py-24 hairline-dark md:py-32">
      <div className="container-monogram">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className={cn("h-px w-10", acc.bg)} />
            <span className={cn("type-label", acc.text)}>
              C O N T I N U E&nbsp; E X P L O R I N G
            </span>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {similar.map((l, i) => (
            <Reveal key={l.slug} delay={i * 0.1} y={50}>
              <ListingCard listing={l} tone="dark" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Listing() {
  const { slug } = useParams();
  const listing = slug ? getListingBySlug(slug) : undefined;
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!listing) return <NotFound />;

  const luxe = listing.slug === "the-stonebridge-estate";
  const acc = luxe ? GOLD_ACCENT : COPPER_ACCENT;
  const photos = photosFor(listing);

  const navLightbox = (dir: 1 | -1) =>
    setLightbox((i) =>
      i === null ? i : (i + dir + photos.length) % photos.length
    );

  return (
    <div className="bg-ink">
      {/* Scoped slider styling (index.css is shared) */}
      <style>{`
        .mn-range::-webkit-slider-thumb {
          appearance: none; -webkit-appearance: none;
          width: 16px; height: 16px; border-radius: 0;
          background: var(--copper); border: 1px solid var(--copper-bright);
          cursor: pointer;
        }
        .mn-range::-moz-range-thumb {
          width: 16px; height: 16px; border-radius: 0;
          background: var(--copper); border: 1px solid var(--copper-bright);
          cursor: pointer;
        }
      `}</style>

      <GalleryHero
        listing={listing}
        photos={photos}
        active={active}
        setActive={setActive}
        openLightbox={setLightbox}
        acc={acc}
        luxe={luxe}
      />
      <StorySection listing={listing} acc={acc} />
      <WalkthroughGallery
        photos={photos}
        openLightbox={setLightbox}
        acc={acc}
      />
      <MortgageEstimator listing={listing} acc={acc} />
      <LocationSection listing={listing} acc={acc} />
      <TourSection listing={listing} acc={acc} />
      <SimilarResidences listing={listing} acc={acc} />

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            photos={photos}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onNav={navLightbox}
            acc={acc}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
