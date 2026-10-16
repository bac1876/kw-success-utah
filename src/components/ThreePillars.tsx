import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Layers,
  TrendingUp,
} from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import Reveal, { SplitWords } from "@/components/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const PILLAR_ICONS = [Compass, Layers, TrendingUp];

const AGENT_HIGHLIGHTS: string[][] = [
  ["1-on-1 Coaching", "Proven KW Models", "AI Leverage"],
  ["Leadership Growth", "Mastermind Community", "Life Balance"],
  ["GCI & Net Margin", "Wealth Strategy", "Investment Club"],
];

const CLIENT_HIGHLIGHTS: string[][] = [
  ["Trusted Advisor", "Hyper-Local Strategy", "Off-Market Insight"],
  ["Weber, Davis & Morgan", "Local Schools & Parks", "Community Roots"],
  ["Equity Reviews", "Remodel ROI Guidance", "Portfolio Growth"],
];

function PillarGraphic({ index, hovered }: { index: number; hovered: boolean }) {
  if (index === 0) {
    // Rising trajectory curve
    return (
      <svg
        aria-hidden
        viewBox="0 0 140 64"
        fill="none"
        className="h-14 w-28 opacity-80 transition-transform duration-500 group-hover:scale-105"
      >
        <path
          d="M6 56 C 38 52, 56 36, 86 28 C 106 22, 120 12, 134 6"
          stroke={hovered ? "#D11919" : "rgba(209,25,25,0.5)"}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M6 56 C 38 52, 56 36, 86 28 C 106 22, 120 12, 134 6 L 134 60 L 6 60 Z"
          fill="url(#pillarGrad0)"
        />
        <circle
          cx="134"
          cy="6"
          r={hovered ? "5" : "3.5"}
          fill="#D11919"
          stroke="#fff"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="pillarGrad0" x1="70" y1="6" x2="70" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D11919" stopOpacity={hovered ? "0.35" : "0.15"} />
            <stop offset="100%" stopColor="#D11919" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  if (index === 1) {
    // Concentric mastery rings
    return (
      <svg
        aria-hidden
        viewBox="0 0 140 64"
        fill="none"
        className="h-14 w-28 opacity-80 transition-transform duration-500 group-hover:scale-105"
      >
        <circle
          cx="104"
          cy="32"
          r="26"
          stroke={hovered ? "rgba(209,25,25,0.65)" : "rgba(255,255,255,0.18)"}
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <circle
          cx="104"
          cy="32"
          r="17"
          stroke={hovered ? "#D11919" : "rgba(209,25,25,0.45)"}
          strokeWidth="2"
        />
        <circle
          cx="104"
          cy="32"
          r={hovered ? "7" : "5"}
          fill="#D11919"
        />
      </svg>
    );
  }
  // Compounding wealth bars
  return (
    <svg
      aria-hidden
      viewBox="0 0 140 64"
      fill="none"
      className="h-14 w-28 opacity-80 transition-transform duration-500 group-hover:scale-105"
    >
      {[
        { x: 46, h: 18 },
        { x: 68, h: 28 },
        { x: 90, h: 40 },
        { x: 112, h: 54 },
      ].map((b, i) => (
        <rect
          key={b.x}
          x={b.x}
          y={60 - b.h}
          width="14"
          height={b.h}
          rx="4"
          fill={
            i === 3
              ? "#D11919"
              : hovered
                ? "rgba(209,25,25,0.55)"
                : "rgba(255,255,255,0.16)"
          }
        />
      ))}
    </svg>
  );
}

export default function ThreePillars({
  defaultAudience = "agents",
  allowToggle = true,
  mode,
  tone = "dark",
  className,
}: {
  defaultAudience?: "agents" | "clients";
  allowToggle?: boolean;
  mode?: "toggle" | "agents" | "clients";
  pinned?: boolean;
  tone?: "dark" | "light";
  className?: string;
}) {
  const initialAudience =
    mode === "agents" || mode === "clients" ? mode : defaultAudience;
  const canToggle = mode ? mode === "toggle" : allowToggle;

  const [audience, setAudience] = useState<"agents" | "clients">(
    initialAudience
  );
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const dark = tone === "dark";
  const { threePillars } = activeBrokerage.home;
  const items =
    audience === "agents" ? threePillars.forAgents : threePillars.forClients;
  const highlights =
    audience === "agents" ? AGENT_HIGHLIGHTS : CLIENT_HIGHLIGHTS;
  const targetUrl = audience === "agents" ? "/agents" : "/clients";

  return (
    <section
      id="pillars"
      className={cn(
        "relative overflow-hidden py-24 md:py-32",
        dark ? "bg-ink-deep text-snow" : "bg-mist text-ink",
        className
      )}
    >
      {/* Animated Wasatch Mountain Ridgeline Line-Art Backdrop (§5.4) */}
      <svg
        aria-hidden
        viewBox="0 0 1440 240"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 w-full opacity-35"
      >
        <path
          d="M0 220 L180 120 L310 175 L490 65 L670 155 L860 40 L1060 145 L1230 80 L1440 165 L1440 240 L0 240 Z"
          stroke="#B40101"
          strokeWidth="1.5"
          fill="url(#wasatchGrad)"
        />
        <motion.path
          d="M0 220 L180 120 L310 175 L490 65 L670 155 L860 40 L1060 145 L1230 80 L1440 165"
          stroke="#FF4D4D"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="120 1400"
          initial={{ strokeDashoffset: 1520 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <path
          d="M0 230 L240 150 L420 190 L610 95 L790 170 L990 85 L1190 165 L1440 110"
          stroke={dark ? "rgba(255,255,255,0.22)" : "rgba(31,35,38,0.18)"}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <defs>
          <linearGradient
            id="wasatchGrad"
            x1="720"
            y1="40"
            x2="720"
            y2="240"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#B40101" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#B40101" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container-kw relative z-10">
        {/* Header Row: Left Eyebrow + Headline | Right Toggle */}
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/30 bg-kw-red/10 px-3.5 py-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kw-red text-[0.65rem] font-bold text-white">
                  03
                </span>
                <span className="type-label text-kw-red-bright">
                  {threePillars.eyebrow}
                </span>
              </div>
            </Reveal>

            <h2
              className={cn(
                "type-display-lg mt-5 text-balance",
                dark ? "text-snow" : "text-ink"
              )}
            >
              <SplitWords text={threePillars.headline} />
            </h2>
          </div>

          {/* Two-tab toggle: For Agents | For Clients (§5.4) */}
          {canToggle && (
            <Reveal delay={0.15}>
              <div
                role="tablist"
                aria-label="Select audience pillars"
                className={cn(
                  "inline-flex rounded-full border p-1.5",
                  dark
                    ? "border-white/15 bg-ink shadow-lift-dark"
                    : "border-ink/15 bg-white shadow-card"
                )}
              >
                {(
                  [
                    { id: "agents", label: "For Agents" },
                    { id: "clients", label: "For Clients" },
                  ] as const
                ).map((tab) => {
                  const active = audience === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setAudience(tab.id)}
                      className={cn(
                        "relative rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-200",
                        active
                          ? "text-white"
                          : dark
                            ? "text-stone-dark hover:text-white"
                            : "text-charcoal hover:text-ink"
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="pillars-tab-pill"
                          className="absolute inset-0 rounded-full bg-kw-red shadow-[0_0_20px_rgba(180,1,1,0.6)]"
                          transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 35,
                          }}
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          )}
        </div>

        {/* 3 Pillar Interactive Spotlight + 3D Tilt Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={audience}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-14 grid gap-6 lg:grid-cols-3"
          >
            {items.map((item, idx) => {
              const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
              const hovered = hoveredIdx === idx;
              const tags = highlights[idx] ?? [];

              return (
                <SpotlightCard
                  key={`${audience}-${item.num}`}
                  enableTilt
                  maxTilt={3.5}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  spotlightColor="rgba(209, 25, 25, 0.24)"
                  borderGlowColor="rgba(255, 80, 80, 0.9)"
                  className={cn(
                    "group flex flex-col justify-between rounded-3xl border p-8 transition-all duration-300 md:p-10",
                    dark
                      ? "border-white/10 bg-ink/95 hover:border-kw-red/60 hover:bg-slate-card shadow-lift-dark"
                      : "border-ink/10 bg-white shadow-card hover:border-kw-red/50"
                  )}
                >
                  {/* Top accent bar */}
                  <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-kw-red via-kw-red-bright to-kw-red transition-transform duration-300 group-hover:scale-x-100" />

                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-kw-red/40 bg-kw-red/15 text-lg font-extrabold text-kw-red-bright transition-colors duration-300 group-hover:bg-kw-red group-hover:text-white">
                          {item.num}
                        </span>
                        <Icon
                          className={cn(
                            "h-5 w-5 transition-colors",
                            dark
                              ? "text-stone-dark group-hover:text-kw-red-bright"
                              : "text-kw-gray group-hover:text-kw-red"
                          )}
                        />
                      </div>

                      <PillarGraphic index={idx} hovered={hovered} />
                    </div>

                    <h3
                      className={cn(
                        "mt-6 text-2xl font-bold tracking-tight transition-transform duration-300 group-hover:-translate-y-0.5",
                        dark ? "text-white" : "text-ink"
                      )}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={cn(
                        "type-body mt-4 leading-relaxed",
                        dark ? "text-stone-dark" : "text-charcoal"
                      )}
                    >
                      {item.body}
                    </p>

                    {/* Key Pillar Takeaways */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.68rem] font-semibold transition-colors",
                            dark
                              ? "border-white/10 bg-ink-deep/80 text-snow/85 group-hover:border-kw-red/40"
                              : "border-ink/10 bg-mist text-ink group-hover:border-kw-red/40"
                          )}
                        >
                          <CheckCircle2 className="h-3 w-3 text-kw-red-bright" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "mt-8 flex items-center justify-between border-t pt-5",
                      dark ? "border-white/10" : "border-ink/10"
                    )}
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-kw-red-bright">
                      Pillar {item.num} ·{" "}
                      {audience === "agents" ? "Agents" : "Clients"}
                    </span>
                    <Link
                      to={targetUrl}
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors",
                        dark
                          ? "text-white/80 group-hover:text-kw-red-bright"
                          : "text-ink group-hover:text-kw-red"
                      )}
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </SpotlightCard>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
