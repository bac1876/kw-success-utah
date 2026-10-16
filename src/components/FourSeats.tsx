import { motion, useReducedMotion } from "framer-motion";
import {
  ClipboardCheck,
  FileCheck2,
  Hammer,
  Landmark,
  Paintbrush,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Lending: Landmark,
  "Title & Escrow": FileCheck2,
  Insurance: ShieldCheck,
  Inspections: ClipboardCheck,
  "Contractors & Repairs": Hammer,
  Moving: Truck,
  "Home Maintenance": Wrench,
  "Design & Remodel": Paintbrush,
};

const CATEGORY_NOTES: Record<string, string> = {
  Lending: "Purchase, refinance & strategy tailored to your goals",
  "Title & Escrow": "Clear title, smooth settlement & protected closings",
  Insurance: "Home, auto & umbrella coverage comparisons",
  Inspections: "Thorough property, radon, roof & sewer evaluations",
  "Contractors & Repairs": "Trusted local trades for repairs & upgrades",
  Moving: "Coordinated local & out-of-state relocation support",
  "Home Maintenance": "Seasonal upkeep, HVAC, landscaping & care",
  "Design & Remodel": "Architects, interior design & renovation pros",
};

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

  const leftSeats = seats.slice(0, 4);
  const rightSeats = seats.slice(4, 8);

  const renderSeatCard = (
    seat: (typeof seats)[number],
    idx: number
  ) => {
    const Icon = CATEGORY_ICONS[seat.category] ?? Wrench;
    const note =
      CATEGORY_NOTES[seat.category] ??
      "Vetted Northern Utah professionals brought to your table";

    return (
      <motion.div
        key={seat.category}
        initial={reduced ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.05 * idx, duration: 0.55, ease: EASE }}
        className={cn(
          "group relative flex items-start gap-4 rounded-2xl border p-5 transition-all duration-300",
          dark
            ? "border-white/10 bg-slate-card/80 hover:border-kw-red/60 hover:bg-slate-card"
            : "border-ink/10 bg-white shadow-card hover:border-kw-red/50"
        )}
      >
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300",
            dark
              ? "border-white/10 bg-ink-deep text-kw-red-bright group-hover:border-kw-red group-hover:bg-kw-red group-hover:text-white"
              : "border-ink/10 bg-mist text-kw-red group-hover:border-kw-red group-hover:bg-kw-red group-hover:text-white"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3
              className={cn(
                "text-[0.95rem] font-bold tracking-tight",
                dark ? "text-snow" : "text-ink"
              )}
            >
              {seat.category}
            </h3>
            <span
              className={cn(
                "text-[0.65rem] font-semibold uppercase tracking-widest",
                dark ? "text-stone-dark" : "text-kw-gray"
              )}
            >
              0{idx + 1}
            </span>
          </div>
          <p
            className={cn(
              "mt-1 text-xs leading-relaxed",
              dark ? "text-stone-dark" : "text-charcoal"
            )}
          >
            {note}
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Modern 3-Column Bento Architecture: 4 Left Seats | Central Advisor Core | 4 Right Seats */}
      <div className="grid items-stretch gap-6 lg:grid-cols-12">
        {/* Left 4 Categories */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
          {leftSeats.map((s, i) => renderSeatCard(s, i))}
        </div>

        {/* Center Command Card: "Your KW Success Trusted Advisor & you." (§5.2) */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative flex flex-col items-center justify-between overflow-hidden rounded-3xl border-2 border-kw-red bg-gradient-to-b from-ink via-ink-deep to-ink p-8 text-center text-snow shadow-lift-dark lg:col-span-4 lg:p-10"
        >
          {/* Subtle radial red glow at top */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-kw-red/25 blur-3xl"
          />

          <div className="relative z-10 flex flex-col items-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-kw-red/50 bg-kw-red/15 px-3.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-kw-red-bright">
              <span className="h-1.5 w-1.5 rounded-full bg-kw-red-bright" />
              {oneTable.subhead}
            </span>

            <div className="mt-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-kw-red-bright shadow-inner">
              <Users className="h-8 w-8" />
            </div>

            <h3 className="mt-6 text-2xl font-bold leading-tight tracking-tight text-white md:text-[1.65rem]">
              {oneTable.centerCardTitle}
            </h3>

            <p className="mt-3 text-sm font-medium text-kw-red-bright">
              {oneTable.centerCardCaption}
            </p>

            <div className="my-6 h-px w-16 bg-white/15" />

            <p className="text-sm leading-relaxed text-stone-dark">
              Before, during, and long after the closing, your advisor coordinates
              every specialist around your table and stays with you for as long
              as you own your home.
            </p>
          </div>

          <div className="relative z-10 mt-8 grid w-full grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
            <div>
              <span className="block text-sm font-bold text-white">8+</span>
              <span className="text-[0.62rem] uppercase tracking-wider text-stone-dark">
                Specialties
              </span>
            </div>
            <div className="border-x border-white/10">
              <span className="block text-sm font-bold text-kw-red-bright">1</span>
              <span className="text-[0.62rem] uppercase tracking-wider text-stone-dark">
                Point of Call
              </span>
            </div>
            <div>
              <span className="block text-sm font-bold text-white">1997</span>
              <span className="text-[0.62rem] uppercase tracking-wider text-stone-dark">
                Utah Roots
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right 4 Categories */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
          {rightSeats.map((s, i) => renderSeatCard(s, i + 4))}
        </div>
      </div>

      {/* §5.2 Journey line under the diagram: Buying · Moving · Living · Maintaining · Growing · Selling · Beginning Again */}
      {showJourney && (
        <div
          className={cn(
            "mt-12 rounded-2xl border p-6 md:p-8",
            dark
              ? "border-white/10 bg-ink-deep/90"
              : "border-ink/10 bg-white shadow-card"
          )}
        >
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-kw-red text-[0.68rem] font-bold text-white">
                ∞
              </span>
              <span
                className={cn(
                  "text-xs font-bold uppercase tracking-[0.2em]",
                  dark ? "text-snow" : "text-ink"
                )}
              >
                The Homeownership Lifecycle
              </span>
            </div>
            <span
              className={cn(
                "text-xs font-medium",
                dark ? "text-stone-dark" : "text-charcoal"
              )}
            >
              {oneTable.journeyCaption}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {oneTable.journeySteps.map((step, idx) => (
              <motion.div
                key={step}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * idx, duration: 0.45, ease: EASE }}
                className={cn(
                  "group relative flex flex-col justify-between rounded-xl border p-3.5 transition-colors",
                  dark
                    ? "border-white/10 bg-slate-card/60 hover:border-kw-red/60"
                    : "border-ink/10 bg-mist/60 hover:border-kw-red/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[0.65rem] font-bold text-kw-red-bright">
                    0{idx + 1}
                  </span>
                  {idx < oneTable.journeySteps.length - 1 && (
                    <span
                      className={cn(
                        "text-xs",
                        dark ? "text-white/25" : "text-ink/25"
                      )}
                    >
                      →
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2.5 text-xs font-semibold tracking-tight",
                    dark ? "text-snow" : "text-ink"
                  )}
                >
                  {step}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
