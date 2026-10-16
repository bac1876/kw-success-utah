import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, Layers, TrendingUp } from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import Reveal, { SplitWords } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const PILLAR_ICONS = [Compass, Layers, TrendingUp];

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

  const dark = tone === "dark";
  const { threePillars } = activeBrokerage.home;
  const items =
    audience === "agents" ? threePillars.forAgents : threePillars.forClients;

  return (
    <section
      id="pillars"
      className={cn(
        "relative overflow-hidden py-24 md:py-32",
        dark ? "bg-ink-deep text-snow" : "bg-mist text-ink",
        className
      )}
    >
      {/* Subtle Wasatch Mountain Ridgeline Line-Art Backdrop (§5.4) */}
      <svg
        aria-hidden
        viewBox="0 0 1440 240"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 w-full opacity-20"
      >
        <path
          d="M0 220 L180 120 L310 175 L490 65 L670 155 L860 40 L1060 145 L1230 80 L1440 165 L1440 240 L0 240 Z"
          stroke="#B40101"
          strokeWidth="1.5"
          fill="url(#wasatchGrad)"
        />
        <path
          d="M0 230 L240 150 L420 190 L610 95 L790 170 L990 85 L1190 165 L1440 110"
          stroke={dark ? "rgba(255,255,255,0.22)" : "rgba(31,35,38,0.18)"}
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <defs>
          <linearGradient id="wasatchGrad" x1="720" y1="40" x2="720" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B40101" stopOpacity="0.22" />
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
                    ? "border-white/15 bg-ink"
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
                          className="absolute inset-0 rounded-full bg-kw-red shadow-sm"
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

        {/* 3 Pillar Bento Cards */}
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
              return (
                <div
                  key={`${audience}-${item.num}`}
                  className={cn(
                    "group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-8 transition-all duration-300 md:p-10",
                    dark
                      ? "border-white/10 bg-ink hover:border-kw-red/60 hover:bg-slate-card"
                      : "border-ink/10 bg-white shadow-card hover:border-kw-red/50"
                  )}
                >
                  {/* Top accent bar */}
                  <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-kw-red transition-transform duration-300 group-hover:scale-x-100" />

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-kw-red/15 text-lg font-extrabold text-kw-red-bright">
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

                    <h3
                      className={cn(
                        "mt-7 text-2xl font-bold tracking-tight",
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
                  </div>

                  {/* Subtle Wasatch Mountain Line Art Accent inside card */}
                  <div className="mt-8 flex items-center justify-between border-t border-current/10 pt-5">
                    <span
                      className={cn(
                        "text-[0.68rem] font-semibold uppercase tracking-[0.2em]",
                        dark ? "text-stone-dark" : "text-kw-gray"
                      )}
                    >
                      {audience === "agents"
                        ? "Agent Pillar"
                        : "Client Pillar"}{" "}
                      · 0{idx + 1}
                    </span>
                    <svg
                      viewBox="0 0 64 20"
                      className="h-4 w-14 text-kw-red"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M2 18 L16 6 L26 14 L40 3 L52 13 L62 8"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
