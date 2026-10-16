import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { activeBrokerage } from "@/brokerages";
import Reveal, { SplitWords } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * §5.4 The Three Pillars (replaces "The Meaning of the Mark")
 * - Eyebrow: HOW WE HELP YOU GROW
 * - Headline: THREE PILLARS. ONE LIFE BY DESIGN.
 * - Layout: Monogram's I / II / III list style, with light mountain line-art accents
 *   (not Monogram's peak mark).
 * - Two-tab toggle above the list on Home: For Agents | For Clients (default: For Agents).
 * - Separate content: each tab shows its own three pillars; agent and client copy are never mixed.
 * - Reuse: /agents shows only the agent pillars (mode="agents"), and /clients shows only the client pillars (mode="clients").
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function MountainLineArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 110"
      fill="none"
      aria-hidden
      className={cn("w-full max-w-[340px]", className)}
    >
      {/* Wasatch Ridgeline contour art */}
      <path
        d="M4 96 L58 46 L94 72 L154 18 L208 64 L256 30 L312 78 L356 54"
        stroke="#B40101"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 96 L88 58 L132 82 L192 38 L244 76 L296 48 L348 96"
        stroke="#1F2326"
        strokeOpacity="0.22"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="4"
        y1="96"
        x2="356"
        y2="96"
        stroke="#1F2326"
        strokeOpacity="0.12"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function ThreePillars({
  mode = "toggle",
  className,
}: {
  mode?: "toggle" | "agents" | "clients";
  className?: string;
}) {
  const { threePillars } = activeBrokerage.home;
  const [tab, setTab] = useState<"agents" | "clients">(
    mode === "clients" ? "clients" : "agents"
  );

  const activeAudience = mode === "toggle" ? tab : mode;
  const pillars =
    activeAudience === "agents"
      ? threePillars.forAgents
      : threePillars.forClients;

  return (
    <section
      id="three-pillars"
      className={cn("overflow-hidden bg-snow py-24 md:py-32", className)}
    >
      <div className="container-monogram">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          {/* Left column: Eyebrow, Headline, Toggle (if mode === 'toggle'), and Wasatch mountain line-art */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-0.5 w-10 bg-kw-red" />
                <span className="type-label text-kw-red">
                  {threePillars.eyebrow}
                </span>
              </div>
            </Reveal>

            <h2 className="type-display-lg mt-6 text-kw-ink">
              <SplitWords text={threePillars.headline} />
            </h2>

            {mode === "toggle" && (
              <Reveal delay={0.15}>
                <div
                  role="tablist"
                  aria-label="Choose audience"
                  className="mt-8 inline-flex border hairline-light bg-mist p-1"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={tab === "agents"}
                    onClick={() => setTab("agents")}
                    className={cn(
                      "px-6 py-2.5 text-[0.74rem] font-semibold uppercase tracking-[0.22em] transition-all duration-200",
                      tab === "agents"
                        ? "bg-kw-red text-white shadow-sm"
                        : "text-charcoal hover:text-kw-ink"
                    )}
                  >
                    For Agents
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={tab === "clients"}
                    onClick={() => setTab("clients")}
                    className={cn(
                      "px-6 py-2.5 text-[0.74rem] font-semibold uppercase tracking-[0.22em] transition-all duration-200",
                      tab === "clients"
                        ? "bg-kw-red text-white shadow-sm"
                        : "text-charcoal hover:text-kw-ink"
                    )}
                  >
                    For Clients
                  </button>
                </div>
              </Reveal>
            )}

            {/* Light Wasatch mountain line-art accent (§5.4) */}
            <Reveal delay={0.25}>
              <div className="mt-12 border hairline-light bg-white p-8 shadow-sm">
                <MountainLineArt />
                <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-kw-gray">
                  {activeAudience === "agents"
                    ? "For Agents · Business, Person & Wealth"
                    : "For Clients · Home, Community & Wealth"}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right column: I / II / III Pillars list */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAudience}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex flex-col divide-y hairline-light border-y hairline-light bg-white px-8 shadow-sm md:px-12"
              >
                {pillars.map((p) => (
                  <div key={p.num} className="py-10 md:py-12">
                    <div className="flex items-baseline gap-5">
                      <span className="type-display-md font-semibold text-kw-red">
                        {p.num}.
                      </span>
                      <h3 className="type-display-md text-kw-ink">
                        {p.title}
                      </h3>
                    </div>
                    <span className="mt-4 block h-0.5 w-16 bg-kw-red" />
                    <p className="type-body mt-5 max-w-xl text-charcoal">
                      {p.body}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
