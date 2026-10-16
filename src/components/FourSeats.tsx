import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Hammer,
  Landmark,
  Paintbrush,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface SeatMeta {
  icon: React.ComponentType<{ className?: string }>;
  shortDesc: string;
  advisorRole: string;
  capabilities: string[];
  serviceUrl?: string;
  partnerName?: string;
}

const SEAT_META: Record<string, SeatMeta> = {
  Lending: {
    icon: Landmark,
    shortDesc: "Purchase, refinance & rate strategy tailored to your goals",
    advisorRole:
      "Your advisor connects you with trusted local lending partners—including in-house options—to structure the right loan, compare rate & term scenarios, and monitor future refinance windows.",
    capabilities: [
      "Purchase & Pre-Approval",
      "Rate & Term Strategy",
      "Refinance Monitoring",
    ],
    serviceUrl: "/services/mortgage",
    partnerName: "Unity Home Loans",
  },
  "Title & Escrow": {
    icon: FileCheck2,
    shortDesc: "Clear title, smooth settlement & protected closings",
    advisorRole:
      "From earnest money to recording day, your advisor coordinates directly with seasoned Utah title and escrow officers so every document, payoff, and wire is verified and stress-free.",
    capabilities: [
      "Clear Title Search",
      "Protected Escrow Settlement",
      "Coordinated Closing Day",
    ],
    serviceUrl: "/services/title",
    partnerName: "Amicus Title",
  },
  Insurance: {
    icon: ShieldCheck,
    shortDesc: "Home, auto & umbrella coverage comparisons",
    advisorRole:
      "Before you close—and whenever your home value or life changes—your advisor brings vetted insurance specialists to compare coverage, deductibles, and Wasatch Front hazard protection.",
    capabilities: [
      "Homeowners Coverage",
      "Bundled Auto & Umbrella",
      "Annual Policy Checkups",
    ],
    serviceUrl: "/services/insurance",
  },
  Inspections: {
    icon: ClipboardCheck,
    shortDesc: "Thorough property, radon, roof & sewer evaluations",
    advisorRole:
      "Your advisor schedules certified Northern Utah inspectors for general home, radon, sewer scope, and structural evaluations—then helps you translate findings into smart repair negotiations.",
    capabilities: [
      "Full Property & Roof",
      "Utah Radon & Air Testing",
      "Sewer Scope & HVAC",
    ],
  },
  "Contractors & Repairs": {
    icon: Hammer,
    shortDesc: "Trusted local trades for repairs, bids & upgrades",
    advisorRole:
      "Need a licensed electrician, plumber, roofer, or general contractor who actually shows up? Your advisor opens our vetted Weber, Davis & Morgan County trade bench whenever you need a bid.",
    capabilities: [
      "Vetted Local Trades",
      "Pre-Sale Punch Lists",
      "Emergency Repair Calls",
    ],
  },
  Moving: {
    icon: Truck,
    shortDesc: "Coordinated local & out-of-state relocation support",
    advisorRole:
      "Whether you are moving across Layton, relocating to Ogden Valley, or arriving from out of state via Hill AFB, your advisor coordinates movers, storage, utility transfers, and timelines.",
    capabilities: [
      "White-Glove Local Movers",
      "Hill AFB & Out-of-State",
      "Utility & Key Handoff",
    ],
  },
  "Home Maintenance": {
    icon: Wrench,
    shortDesc: "Seasonal upkeep, HVAC, landscaping & four-season care",
    advisorRole:
      "Northern Utah's four seasons demand proactive care. Your advisor stays in your corner year after year with trusted pros for sprinkler blowouts, furnace tune-ups, roof care, and concrete.",
    capabilities: [
      "Four-Season Utah Prep",
      "HVAC & Plumbing Tune-Ups",
      "Lawn, Snow & Exterior",
    ],
  },
  "Design & Remodel": {
    icon: Paintbrush,
    shortDesc: "Architects, interior design & value-adding renovations",
    advisorRole:
      "Before you remodel a kitchen, finish a basement, or repaint, your advisor helps you evaluate which upgrades add the most livability and resale equity in your specific neighborhood.",
    capabilities: [
      "ROI Remodel Guidance",
      "Basement & Kitchen Pros",
      "Interior & Paint Specialists",
    ],
  },
};

interface ChapterDetail {
  step: string;
  tagline: string;
  description: string;
  activeSeats: number[]; // indices 0..7
}

const CHAPTER_DETAILS: ChapterDetail[] = [
  {
    step: "Buying",
    tagline: "Finding and securing the right home base in Northern Utah.",
    description:
      "Your advisor aligns financing, inspections, title examination, and homeowner coverage at one table so you can make confident offers and close without surprises.",
    activeSeats: [0, 1, 2, 3], // Lending, Title, Insurance, Inspections
  },
  {
    step: "Moving",
    tagline: "A seamless transition from closing table to front door.",
    description:
      "As keys change hands, your advisor coordinates vetted movers, lock & security updates, immediate contractor touch-ups, and coverage activation.",
    activeSeats: [1, 4, 5], // Title, Contractors, Moving
  },
  {
    step: "Living",
    tagline: "Settling into your neighborhood and protecting your investment.",
    description:
      "Long after closing day, your advisor remains your first call for local recommendations, insurance reviews, and seasonal home care across the Wasatch Front.",
    activeSeats: [2, 6, 7], // Insurance, Maintenance, Design
  },
  {
    step: "Maintaining",
    tagline: "Proactive four-season care for Utah winters and summers.",
    description:
      "Need an HVAC specialist in January or a roofer after a canyon windstorm? One call to your advisor connects you with vetted local trades who stand behind their work.",
    activeSeats: [2, 4, 6], // Insurance, Contractors, Maintenance
  },
  {
    step: "Growing",
    tagline: "Adapting your home—and equity—as your life expands.",
    description:
      "Finishing a basement, remodeling a kitchen, or tapping equity for an investment property? Your advisor brings designers, contractors, and lenders together around your goals.",
    activeSeats: [0, 4, 7], // Lending, Contractors, Design & Remodel
  },
  {
    step: "Selling",
    tagline: "Preparing, positioning, and maximizing your home's equity.",
    description:
      "Your advisor orchestrates pre-listing inspections, high-ROI contractor touch-ups, staging & design, and title coordination to maximize your net proceeds.",
    activeSeats: [1, 3, 4, 7], // Title, Inspections, Contractors, Design
  },
  {
    step: "Beginning Again",
    tagline: "Rolling your hard-earned equity into the next chapter.",
    description:
      "When it's time to upsize, right-size, or relocate, your advisor already knows your story—bringing lending, title, moving, and search together for your next home base.",
    activeSeats: [0, 1, 2, 5], // Lending, Title, Insurance, Moving
  },
];

// Desktop SVG connection coordinates (viewBox 0 0 1200 620)
const LEFT_Y = [78, 232, 386, 540];
const RIGHT_Y = [78, 232, 386, 540];
const CENTER_X = 600;
const CENTER_Y = 309;

export default function FourSeats({
  tone = "dark",
  showJourney = true,
  className,
}: {
  tone?: "light" | "dark";
  showJourney?: boolean;
  showDisclosure?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";
  const reduced = useReducedMotion();
  const { oneTable } = activeBrokerage.home;
  const seats = oneTable.seats;

  const [focusedSeat, setFocusedSeat] = useState<number>(0);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHoveringHub, setIsHoveringHub] = useState<boolean>(false);

  // Auto-cycle through seats when user isn't hovering and hasn't locked a chapter
  useEffect(() => {
    if (reduced || !isAutoPlaying || isHoveringHub || selectedChapter !== null) {
      return;
    }
    const timer = window.setInterval(() => {
      setFocusedSeat((prev) => (prev + 1) % seats.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [reduced, isAutoPlaying, isHoveringHub, selectedChapter, seats.length]);

  const activeChapterObj =
    selectedChapter !== null ? CHAPTER_DETAILS[selectedChapter] : null;

  // Which seats are illuminated right now?
  const illuminatedSeats: number[] = activeChapterObj
    ? activeChapterObj.activeSeats
    : [focusedSeat];

  const primarySeatIndex = focusedSeat;
  const primarySeat = seats[primarySeatIndex] ?? seats[0];
  const primaryMeta = SEAT_META[primarySeat.category] ?? {
    icon: Wrench,
    shortDesc: "Vetted Northern Utah professionals brought to your table",
    advisorRole:
      "Your KW Success Trusted Advisor coordinates vetted local professionals for every stage of homeownership.",
    capabilities: [
      "Vetted Local Pros",
      "Single Point of Call",
      "Lifetime Support",
    ],
  };
  const PrimaryIcon = primaryMeta.icon;
  const primaryProvider = primarySeat.providers?.[0];

  const handleSeatActivate = (index: number) => {
    setFocusedSeat(index);
    if (selectedChapter !== null && ! CHAPTER_DETAILS[selectedChapter].activeSeats.includes(index)) {
      setSelectedChapter(null);
    }
  };

  const renderSeatCard = (seat: (typeof seats)[number], idx: number, side: "left" | "right") => {
    const meta = SEAT_META[seat.category];
    const Icon = meta?.icon ?? Wrench;
    const isFocused = focusedSeat === idx;
    const isIlluminated = illuminatedSeats.includes(idx);
    const hasAffiliated = (seat.providers?.length ?? 0) > 0;

    return (
      <motion.div
        key={seat.category}
        initial={reduced ? false : { opacity: 0, x: side === "left" ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ delay: 0.05 * idx, duration: 0.55, ease: EASE }}
      >
        <SpotlightCard
          role="button"
          tabIndex={0}
          aria-pressed={isFocused}
          onMouseEnter={() => {
            setIsHoveringHub(true);
            setFocusedSeat(idx);
          }}
          onMouseLeave={() => setIsHoveringHub(false)}
          onClick={() => handleSeatActivate(idx)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleSeatActivate(idx);
            }
          }}
          spotlightColor={
            isIlluminated
              ? "rgba(209, 25, 25, 0.28)"
              : "rgba(180, 1, 1, 0.16)"
          }
          borderGlowColor={
            isIlluminated
              ? "rgba(255, 77, 77, 0.9)"
              : "rgba(209, 25, 25, 0.55)"
          }
          className={cn(
            "group cursor-pointer rounded-2xl border p-5 transition-all duration-300",
            dark
              ? isIlluminated
                ? "border-kw-red bg-gradient-to-br from-slate-card via-ink-deep to-slate-card shadow-[0_0_35px_-8px_rgba(180,1,1,0.55)]"
                : "border-white/10 bg-slate-card/70 hover:border-kw-red/50 hover:bg-slate-card"
              : isIlluminated
                ? "border-kw-red bg-white shadow-lift"
                : "border-ink/10 bg-white/90 shadow-card hover:border-kw-red/50"
          )}
        >
          {/* Connection terminal dot on inner edge facing the center hub */}
          <span
            aria-hidden
            className={cn(
              "hidden lg:block absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full transition-all duration-300",
              side === "left" ? "right-2" : "left-2",
              isIlluminated
                ? "bg-kw-red-bright shadow-[0_0_12px_2px_rgba(209,25,25,0.9)] scale-110"
                : "bg-white/15 group-hover:bg-kw-red/60"
            )}
          />

          <div className="flex items-start gap-4">
            {/* Animated Icon Tile */}
            <div
              className={cn(
                "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all duration-300",
                isIlluminated
                  ? "border-kw-red-bright bg-kw-red text-white shadow-[0_0_20px_rgba(180,1,1,0.6)] scale-105"
                  : dark
                    ? "border-white/10 bg-ink-deep text-kw-red-bright group-hover:border-kw-red/60 group-hover:bg-kw-red/20 group-hover:text-white"
                    : "border-ink/10 bg-mist text-kw-red group-hover:border-kw-red group-hover:bg-kw-red group-hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              {isIlluminated && (
                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kw-red-bright opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-kw-red-bright" />
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1 pr-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3
                    className={cn(
                      "text-[0.98rem] font-bold tracking-tight transition-colors",
                      dark
                        ? isIlluminated
                          ? "text-white"
                          : "text-snow/90 group-hover:text-white"
                        : "text-ink"
                    )}
                  >
                    {seat.category}
                  </h3>
                  {hasAffiliated && (
                    <span className="rounded-full border border-kw-red/40 bg-kw-red/15 px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-wider text-kw-red-bright">
                      In-House
                    </span>
                  )}
                </div>

                <span
                  className={cn(
                    "font-mono text-[0.68rem] font-bold tracking-widest transition-colors",
                    isIlluminated
                      ? "text-kw-red-bright"
                      : dark
                        ? "text-stone-dark"
                        : "text-kw-gray"
                  )}
                >
                  0{idx + 1}
                </span>
              </div>

              <p
                className={cn(
                  "mt-1 text-xs leading-relaxed transition-colors",
                  dark
                    ? isIlluminated
                      ? "text-snow/85"
                      : "text-stone-dark"
                    : "text-charcoal"
                )}
              >
                {meta?.shortDesc}
              </p>

              {/* Expandable micro-capability pills when focused or illuminated */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                {(meta?.capabilities ?? []).slice(0, 2).map((cap) => (
                  <span
                    key={cap}
                    className={cn(
                      "inline-flex items-center rounded-md px-2 py-0.5 text-[0.62rem] font-medium transition-colors",
                      isIlluminated
                        ? dark
                          ? "bg-kw-red/25 text-white border border-kw-red/40"
                          : "bg-kw-red/10 text-kw-red border border-kw-red/30"
                        : dark
                          ? "bg-white/[0.04] text-stone-dark"
                          : "bg-mist text-charcoal"
                    )}
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    );
  };

  const leftSeats = seats.slice(0, 4);
  const rightSeats = seats.slice(4, 8);

  return (
    <div className={cn("w-full", className)}>
      {/* Top Interactive Status & Mode Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink-deep/80 px-5 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kw-red-bright opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-kw-red-bright" />
          </span>
          <span className="text-xs font-semibold tracking-wide text-snow/90">
            {activeChapterObj ? (
              <>
                Showing active seats for Chapter:{" "}
                <strong className="text-kw-red-bright">
                  {activeChapterObj.step}
                </strong>{" "}
                ({activeChapterObj.activeSeats.length} seats coordinated)
              </>
            ) : (
              <>
                Interactive Table — Hover or click any seat around the table to
                inspect how your advisor coordinates it
              </>
            )}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {selectedChapter !== null && (
            <button
              type="button"
              onClick={() => setSelectedChapter(null)}
              className="rounded-full border border-kw-red/40 bg-kw-red/15 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-kw-red-bright transition-colors hover:bg-kw-red hover:text-white"
            >
              Reset Chapter Filter
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setSelectedChapter(null);
              setIsAutoPlaying((p) => !p);
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-stone-dark transition-colors hover:border-white/30 hover:text-white"
          >
            {isAutoPlaying && selectedChapter === null ? (
              <>
                <Pause className="h-3 w-3 text-kw-red-bright" />
                <span>Auto-Tour On</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3 text-kw-red-bright" />
                <span>Auto-Tour Paused</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main 3-Column Interactive Neural Hub */}
      <div className="relative">
        {/* Desktop Animated SVG Neural Connection Layer */}
        <svg
          aria-hidden
          viewBox="0 0 1200 620"
          fill="none"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        >
          <defs>
            <linearGradient id="kwLeftBeam" x1="365" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D11919" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#B40101" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="kwRightBeam" x1="835" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D11919" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#B40101" stopOpacity="0.35" />
            </linearGradient>
            <filter id="kwGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Left 4 Seat Connection Curves */}
          {LEFT_Y.map((y, i) => {
            const active = illuminatedSeats.includes(i);
            const pathD = `M 368 ${y} C 430 ${y}, 420 ${CENTER_Y}, 450 ${CENTER_Y}`;
            return (
              <g key={`left-beam-${i}`}>
                {/* Base structural hairline */}
                <path
                  d={pathD}
                  stroke={dark ? "rgba(255,255,255,0.10)" : "rgba(31,35,38,0.12)"}
                  strokeWidth="1.5"
                  strokeDasharray="4 5"
                />
                {/* Active glowing beam */}
                {active && (
                  <>
                    <path
                      d={pathD}
                      stroke="url(#kwLeftBeam)"
                      strokeWidth="2.5"
                      filter="url(#kwGlow)"
                    />
                    <motion.path
                      d={pathD}
                      stroke="#FF5555"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="16 180"
                      initial={{ strokeDashoffset: 196 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </>
                )}
              </g>
            );
          })}

          {/* Right 4 Seat Connection Curves */}
          {RIGHT_Y.map((y, i) => {
            const seatIdx = i + 4;
            const active = illuminatedSeats.includes(seatIdx);
            const pathD = `M 832 ${y} C 770 ${y}, 780 ${CENTER_Y}, 750 ${CENTER_Y}`;
            return (
              <g key={`right-beam-${seatIdx}`}>
                {/* Base structural hairline */}
                <path
                  d={pathD}
                  stroke={dark ? "rgba(255,255,255,0.10)" : "rgba(31,35,38,0.12)"}
                  strokeWidth="1.5"
                  strokeDasharray="4 5"
                />
                {/* Active glowing beam */}
                {active && (
                  <>
                    <path
                      d={pathD}
                      stroke="url(#kwRightBeam)"
                      strokeWidth="2.5"
                      filter="url(#kwGlow)"
                    />
                    <motion.path
                      d={pathD}
                      stroke="#FF5555"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="16 180"
                      initial={{ strokeDashoffset: 196 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </>
                )}
              </g>
            );
          })}

          {/* Center Ambient Rings behind the Command Core */}
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r="165"
            stroke="rgba(180, 1, 1, 0.2)"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
        </svg>

        <div className="relative z-10 grid items-stretch gap-6 lg:grid-cols-12">
          {/* Left 4 Seats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            {leftSeats.map((s, i) => renderSeatCard(s, i, "left"))}
          </div>

          {/* Center Interactive Command Core */}
          <div
            className="lg:col-span-4 flex"
            onMouseEnter={() => setIsHoveringHub(true)}
            onMouseLeave={() => setIsHoveringHub(false)}
          >
            <SpotlightCard
              spotlightColor="rgba(209, 25, 25, 0.25)"
              borderGlowColor="rgba(255, 90, 90, 0.95)"
              className="flex w-full flex-col justify-between rounded-3xl border-2 border-kw-red bg-gradient-to-b from-ink via-ink-deep to-ink p-7 text-center text-snow shadow-[0_24px_70px_-15px_rgba(180,1,1,0.45)] lg:p-8"
            >
              {/* Ambient Top Crimson Halo */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-kw-red/30 blur-3xl"
              />

              {/* Top Section: Pill + Interactive Orbital Radar Ring */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-kw-red/50 bg-kw-red/15 px-3.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-kw-red-bright">
                  <Sparkles className="h-3 w-3" />
                  {oneTable.subhead}
                </span>

                {/* MotionSites-inspired Interactive Orbital Radar Diagram */}
                <div className="relative mt-5 flex h-44 w-44 items-center justify-center">
                  {/* Outer slow-rotating dashed ring */}
                  <svg
                    viewBox="0 0 180 180"
                    className="absolute inset-0 h-full w-full animate-[spin_32s_linear_infinite]"
                  >
                    <circle
                      cx="90"
                      cy="90"
                      r="80"
                      fill="none"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1"
                      strokeDasharray="4 6"
                    />
                  </svg>

                  {/* Inner counter-rotating tech ring */}
                  <svg
                    viewBox="0 0 180 180"
                    className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite_reverse]"
                  >
                    <circle
                      cx="90"
                      cy="90"
                      r="56"
                      fill="none"
                      stroke="rgba(180,1,1,0.35)"
                      strokeWidth="1.2"
                      strokeDasharray="18 12"
                    />
                  </svg>

                  {/* Static Radial Spokes + 8 Interactive Perimeter Seat Nodes */}
                  <svg
                    viewBox="0 0 180 180"
                    className="absolute inset-0 h-full w-full"
                  >
                    {seats.map((s, idx) => {
                      // Position 0..3 on left arc, 4..7 on right arc
                      const angles = [-135, -105, -75, -45, 45, 75, 105, 135];
                      const deg = angles[idx] ?? idx * 45;
                      const rad = ((deg - 90) * Math.PI) / 180;
                      const r = 72;
                      const x = 90 + r * Math.cos(rad);
                      const y = 90 + r * Math.sin(rad);
                      const active = illuminatedSeats.includes(idx);

                      return (
                        <g
                          key={s.category}
                          className="cursor-pointer"
                          onClick={() => handleSeatActivate(idx)}
                        >
                          <line
                            x1="90"
                            y1="90"
                            x2={x}
                            y2={y}
                            stroke={
                              active
                                ? "#D11919"
                                : "rgba(255, 255, 255, 0.12)"
                            }
                            strokeWidth={active ? "2" : "1"}
                          />
                          {active && (
                            <circle
                              cx={x}
                              cy={y}
                              r="11"
                              fill="rgba(209, 25, 25, 0.25)"
                            />
                          )}
                          <circle
                            cx={x}
                            cy={y}
                            r={active ? "6.5" : "4.5"}
                            fill={active ? "#D11919" : "#252A30"}
                            stroke={
                              active
                                ? "#FFFFFF"
                                : "rgba(255, 255, 255, 0.35)"
                            }
                            strokeWidth="1.5"
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {/* Central Advisor Core Emblem */}
                  <div className="relative z-10 flex h-16 w-16 flex-col items-center justify-center rounded-2xl border-2 border-kw-red bg-ink-deep text-white shadow-[0_0_30px_rgba(180,1,1,0.7)]">
                    <Users className="h-6 w-6 text-kw-red-bright" />
                    <span className="mt-0.5 text-[0.52rem] font-extrabold uppercase tracking-widest text-snow/90">
                      Advisor
                    </span>
                  </div>
                </div>

                <h3 className="mt-2 text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                  {oneTable.centerCardTitle}
                </h3>
                <p className="mt-1 text-xs font-semibold text-kw-red-bright">
                  {oneTable.centerCardCaption}
                </p>
              </div>

              {/* Dynamic Live Seat Inspector Panel */}
              <div className="relative z-10 my-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={primarySeat.category}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24, ease: EASE }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-kw-red-bright">
                        <PrimaryIcon className="h-3.5 w-3.5" />
                        Seat 0{primarySeatIndex + 1} · {primarySeat.category}
                      </span>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.6rem] font-semibold text-snow/80">
                        Active Focus
                      </span>
                    </div>

                    <p className="mt-2.5 text-xs leading-relaxed text-snow/85">
                      {primaryMeta.advisorRole}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {primaryMeta.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-ink-deep/80 px-2.5 py-0.5 text-[0.62rem] font-medium text-snow/90"
                        >
                          <CheckCircle2 className="h-2.5 w-2.5 text-kw-red-bright" />
                          {cap}
                        </span>
                      ))}
                    </div>

                    {/* Affiliated Partner Callout or Service Link */}
                    {primaryProvider ? (
                      <div className="mt-3.5 flex items-center justify-between gap-3 rounded-xl border border-kw-red/40 bg-kw-red/15 px-3 py-2">
                        <div>
                          <span className="block text-[0.58rem] font-bold uppercase tracking-widest text-kw-red-bright">
                            In-House Partner Seat
                          </span>
                          <span className="text-xs font-bold text-white">
                            {primaryProvider.name}
                          </span>
                        </div>
                        <Link
                          to={primaryProvider.url ?? primaryMeta.serviceUrl ?? "/clients"}
                          className="inline-flex items-center gap-1 rounded-full bg-kw-red px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white transition-colors hover:bg-kw-red-bright"
                        >
                          <span>Explore</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      </div>
                    ) : primaryMeta.serviceUrl ? (
                      <div className="mt-3.5 flex items-center justify-end">
                        <Link
                          to={primaryMeta.serviceUrl}
                          className="inline-flex items-center gap-1 text-[0.68rem] font-bold uppercase tracking-wider text-kw-red-bright hover:text-white"
                        >
                          <span>Explore {primarySeat.category}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Summary Metrics Bar */}
              <div className="relative z-10 grid w-full grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-ink-deep/90 p-3 text-center">
                <div>
                  <span className="block text-sm font-extrabold text-white">
                    8+
                  </span>
                  <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-stone-dark">
                    Specialties
                  </span>
                </div>
                <div className="border-x border-white/10">
                  <span className="block text-sm font-extrabold text-kw-red-bright">
                    1
                  </span>
                  <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-stone-dark">
                    Point of Call
                  </span>
                </div>
                <div>
                  <span className="block text-sm font-extrabold text-white">
                    1997
                  </span>
                  <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-stone-dark">
                    Utah Roots
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Right 4 Seats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            {rightSeats.map((s, i) => renderSeatCard(s, i + 4, "right"))}
          </div>
        </div>
      </div>

      {/* §5.2 Interactive 7-Chapter Homeownership Lifecycle Scrubber */}
      {showJourney && (
        <div
          className={cn(
            "mt-10 overflow-hidden rounded-3xl border p-6 md:p-8",
            dark
              ? "border-white/10 bg-gradient-to-b from-ink-deep to-slate-card/90 shadow-lift-dark"
              : "border-ink/10 bg-white shadow-card"
          )}
        >
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-kw-red text-xs font-extrabold text-white shadow-[0_0_15px_rgba(180,1,1,0.6)]">
                ∞
              </span>
              <div>
                <span
                  className={cn(
                    "block text-xs font-extrabold uppercase tracking-[0.2em]",
                    dark ? "text-white" : "text-ink"
                  )}
                >
                  The Homeownership Lifecycle
                </span>
                <span
                  className={cn(
                    "text-xs",
                    dark ? "text-stone-dark" : "text-charcoal"
                  )}
                >
                  Click any chapter below to light up the seats your advisor
                  coordinates for that stage
                </span>
              </div>
            </div>

            <span
              className={cn(
                "rounded-full border px-3.5 py-1 text-xs font-semibold",
                dark
                  ? "border-white/10 bg-white/5 text-snow/85"
                  : "border-ink/10 bg-mist text-ink"
              )}
            >
              {oneTable.journeyCaption}
            </span>
          </div>

          {/* 7 Interactive Chapter Pills */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {CHAPTER_DETAILS.map((chapter, idx) => {
              const isSelected = selectedChapter === idx;
              const isSeatLinked =
                selectedChapter === null &&
                chapter.activeSeats.includes(focusedSeat);

              return (
                <button
                  key={chapter.step}
                  type="button"
                  onClick={() => {
                    if (selectedChapter === idx) {
                      setSelectedChapter(null);
                    } else {
                      setSelectedChapter(idx);
                      setFocusedSeat(chapter.activeSeats[0]);
                    }
                  }}
                  className={cn(
                    "group relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all duration-300",
                    isSelected
                      ? "border-kw-red bg-kw-red text-white shadow-[0_10px_28px_-6px_rgba(180,1,1,0.75)] -translate-y-0.5"
                      : isSeatLinked
                        ? dark
                          ? "border-kw-red/60 bg-kw-red/15 text-white"
                          : "border-kw-red/50 bg-kw-red/10 text-ink"
                        : dark
                          ? "border-white/10 bg-ink/80 text-snow hover:border-kw-red/50 hover:bg-slate-card"
                          : "border-ink/10 bg-mist/60 text-ink hover:border-kw-red/40"
                  )}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={cn(
                        "font-mono text-[0.65rem] font-extrabold",
                        isSelected
                          ? "text-white"
                          : "text-kw-red-bright"
                      )}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      className={cn(
                        "text-[0.6rem] font-bold uppercase tracking-wider",
                        isSelected
                          ? "text-white/90"
                          : isSeatLinked
                            ? "text-kw-red-bright"
                            : dark
                              ? "text-white/25 group-hover:text-white/60"
                              : "text-ink/30"
                      )}
                    >
                      {chapter.activeSeats.length} seats
                    </span>
                  </div>

                  <span className="mt-3 block text-xs font-bold tracking-tight">
                    {chapter.step}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Animated Chapter Detail Drawer */}
          <AnimatePresence mode="wait">
            {activeChapterObj && (
              <motion.div
                key={activeChapterObj.step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASE }}
                className={cn(
                  "mt-5 flex flex-col justify-between gap-4 rounded-2xl border p-5 lg:flex-row lg:items-center",
                  dark
                    ? "border-kw-red/40 bg-ink/90"
                    : "border-kw-red/30 bg-mist"
                )}
              >
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-kw-red px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-white">
                      Chapter 0{(selectedChapter ?? 0) + 1} ·{" "}
                      {activeChapterObj.step}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-bold",
                        dark ? "text-white" : "text-ink"
                      )}
                    >
                      {activeChapterObj.tagline}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-xs leading-relaxed",
                      dark ? "text-stone-dark" : "text-charcoal"
                    )}
                  >
                    {activeChapterObj.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {activeChapterObj.activeSeats.map((sIdx) => {
                    const s = seats[sIdx];
                    if (!s) return null;
                    return (
                      <button
                        key={s.category}
                        type="button"
                        onClick={() => setFocusedSeat(sIdx)}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-semibold transition-all",
                          focusedSeat === sIdx
                            ? "border-kw-red bg-kw-red text-white"
                            : dark
                              ? "border-white/15 bg-white/5 text-snow hover:border-kw-red"
                              : "border-ink/15 bg-white text-ink hover:border-kw-red"
                        )}
                      >
                        0{sIdx + 1} · {s.category}
                      </button>
                    );
                  })}
                  <Link
                    to="/clients"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-bold text-ink transition-colors hover:bg-kw-red hover:text-white"
                  >
                    <span>Start With an Advisor</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
