import { motion, useReducedMotion } from "framer-motion";
import {
  Compass,
  FileCheck2,
  Hammer,
  Landmark,
  SearchCheck,
  ShieldCheck,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import type { TableSeat } from "@/brokerages/types";
import AffiliatedDisclosure from "@/components/AffiliatedDisclosure";
import { cn } from "@/lib/utils";

/**
 * §5.2 "Everyone at One Table" (replaces Monogram's "Four Partners, One Table").
 * - Center card: "Your KW Success Trusted Advisor & you."
 *   Caption: "Your first call for anything your home needs."
 * - Seats come from config (tableSeats: [{ category, icon, providers }]).
 * - v1 shows categories only (flags.showTableProviderLogos = false).
 * - If any provider with affiliated: true is displayed by name when logos are turned on,
 *   automatically renders the Affiliated Business Disclosure.
 * - Desktop shows the seats around the center card; mobile stacks them as a 2-column grid under the center card.
 * - Includes the horizontal Journey line underneath:
 *   Buying · Moving · Living · Maintaining · Growing · Selling · Beginning Again.
 *   Caption: "Your advisor is with you for every chapter."
 */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ICON_MAP: Record<string, typeof Landmark> = {
  Landmark,
  FileCheck2,
  ShieldCheck,
  SearchCheck,
  Hammer,
  Truck,
  Wrench,
  Compass,
};

function SeatCard({
  seat,
  showProviders,
  delay,
}: {
  seat: TableSeat;
  showProviders: boolean;
  delay: number;
}) {
  const reduced = useReducedMotion();
  const Icon = ICON_MAP[seat.icon] ?? Compass;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.6, ease: EASE }}
      className="group flex h-full w-full flex-col items-center justify-center border hairline-light bg-white px-4 py-6 text-center shadow-sm transition-all duration-300 hover:border-kw-red/50 hover:shadow-lift"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mist text-kw-red transition-colors duration-300 group-hover:bg-kw-red group-hover:text-white">
        <Icon className="h-4 w-4" strokeWidth={1.6} />
      </div>
      <span className="mt-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-kw-ink">
        {seat.category}
      </span>

      {showProviders && seat.providers.length > 0 && (
        <div className="mt-3 flex flex-col items-center gap-1.5 border-t hairline-light pt-2.5">
          {seat.providers.map((p) => (
            <span
              key={p.name}
              className="text-[0.74rem] font-medium text-charcoal"
            >
              {p.name}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function FourSeats({
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { oneTable } = activeBrokerage.home;
  const showProviders = activeBrokerage.flags.showTableProviderLogos;
  const seats = oneTable.seats;

  // Check if any affiliated provider is currently shown by name in this section
  const hasVisibleAffiliatedProvider =
    showProviders &&
    seats.some((s) => s.providers.some((p) => p.affiliated));

  // Split seats around the table for desktop layout:
  // Top row: first 3 seats, Middle row: seat[3] + Center Card + seat[4], Bottom row: remaining seats
  const topSeats = seats.slice(0, 3);
  const leftSeat = seats[3];
  const rightSeat = seats[4];
  const bottomSeats = seats.slice(5);

  const centerCard = (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay: 0.15, duration: 0.75, ease: EASE }}
      className="relative mx-auto flex w-full flex-col items-center justify-center border-2 border-kw-red bg-kw-ink px-7 py-10 text-center text-white shadow-lift md:py-12"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-2 border border-white/15"
        animate={
          reduced ? undefined : { opacity: [0.3, 0.75, 0.3] }
        }
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-kw-red text-white">
        <Users className="h-5 w-5" strokeWidth={1.6} />
      </div>
      <h3 className="mt-5 max-w-md text-[1.08rem] font-semibold uppercase tracking-[0.18em] text-white md:text-[1.2rem]">
        {oneTable.centerCardTitle}
      </h3>
      <span className="mt-3 h-0.5 w-12 bg-kw-red" />
      <p className="type-body-sm mt-4 max-w-sm text-white/85">
        {oneTable.centerCardCaption}
      </p>
    </motion.div>
  );

  return (
    <div className={cn("w-full", className)}>
      {/* Desktop: seats arranged around the center card */}
      <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-5">
        {/* Top row of seats */}
        <div className="grid w-full max-w-4xl grid-cols-3 gap-5">
          {topSeats.map((seat, i) => (
            <SeatCard
              key={seat.category}
              seat={seat}
              showProviders={showProviders}
              delay={0.05 * i}
            />
          ))}
        </div>

        {/* Connector lines top -> center */}
        <div className="grid w-full max-w-4xl grid-cols-3">
          <span className="mx-auto h-6 w-px bg-kw-red/35" />
          <span className="mx-auto h-6 w-px bg-kw-red/35" />
          <span className="mx-auto h-6 w-px bg-kw-red/35" />
        </div>

        {/* Middle row: Left seat — Center Advisor Table — Right seat */}
        <div className="grid w-full max-w-5xl grid-cols-[1fr_auto_1.8fr_auto_1fr] items-stretch">
          {leftSeat && (
            <SeatCard
              seat={leftSeat}
              showProviders={showProviders}
              delay={0.18}
            />
          )}
          <div className="flex items-center">
            <span className="h-px w-7 bg-kw-red/35" />
          </div>
          {centerCard}
          <div className="flex items-center">
            <span className="h-px w-7 bg-kw-red/35" />
          </div>
          {rightSeat && (
            <SeatCard
              seat={rightSeat}
              showProviders={showProviders}
              delay={0.22}
            />
          )}
        </div>

        {/* Connector lines center -> bottom */}
        <div className="grid w-full max-w-4xl grid-cols-3">
          <span className="mx-auto h-6 w-px bg-kw-red/35" />
          <span className="mx-auto h-6 w-px bg-kw-red/35" />
          <span className="mx-auto h-6 w-px bg-kw-red/35" />
        </div>

        {/* Bottom row of seats */}
        <div className="grid w-full max-w-4xl grid-cols-3 gap-5">
          {bottomSeats.map((seat, i) => (
            <SeatCard
              key={seat.category}
              seat={seat}
              showProviders={showProviders}
              delay={0.25 + 0.05 * i}
            />
          ))}
        </div>
      </div>

      {/* Mobile & Tablet: Center card on top, seats stacked as a two-column grid underneath (§5.2) */}
      <div className="flex flex-col items-center gap-6 lg:hidden">
        {centerCard}
        <div className="grid w-full grid-cols-2 gap-3.5 sm:gap-4">
          {seats.map((seat, i) => (
            <SeatCard
              key={seat.category}
              seat={seat}
              showProviders={showProviders}
              delay={0.04 * i}
            />
          ))}
        </div>
      </div>

      {/* Journey line under the diagram (§5.2): Horizontal timeline */}
      <div className="mt-16 border-t hairline-light pt-12">
        <div className="relative mx-auto max-w-4xl">
          <div className="hidden top-3 inset-x-8 h-px bg-kw-red/25 md:block md:absolute" />
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4 md:justify-between">
            {oneTable.journeySteps.map((step, i) => (
              <div
                key={step}
                className="relative z-10 flex items-center gap-3 md:flex-col md:gap-2.5"
              >
                <span className="hidden h-2.5 w-2.5 rounded-full border-2 border-kw-red bg-snow md:block" />
                <span className="text-[0.76rem] font-semibold uppercase tracking-[0.2em] text-kw-ink">
                  {step}
                </span>
                {i < oneTable.journeySteps.length - 1 && (
                  <span className="text-kw-red/60 md:hidden">·</span>
                )}
              </div>
            ))}
          </div>
          <p className="type-body-sm mt-6 text-center font-medium text-charcoal">
            {oneTable.journeyCaption}
          </p>
        </div>
      </div>

      {/* Automatic disclosure if affiliated providers are shown by name */}
      {hasVisibleAffiliatedProvider && (
        <div className="mx-auto mt-10 max-w-3xl">
          <AffiliatedDisclosure tone="light" />
        </div>
      )}
    </div>
  );
}
