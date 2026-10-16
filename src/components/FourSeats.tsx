import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { brokerage } from "@/brokerages";
import AffiliatedDisclosure from "@/components/AffiliatedDisclosure";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface SeatInfo {
  title: string;
  descriptor: string;
  to?: string;
  affiliated?: boolean;
}

function SeatCard({
  seat,
  dark,
  delay,
}: {
  seat: SeatInfo;
  dark: boolean;
  delay: number;
}) {
  const reduced = useReducedMotion();
  const inner = (
    <motion.div
      data-cursor={seat.to ? "Meet" : "Table"}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.7, ease: EASE }}
      className={cn(
        "group relative flex h-full w-full flex-col items-center justify-center border px-5 py-6 text-center transition-colors duration-500 hover:border-copper",
        dark ? "hairline-dark bg-ink/60" : "hairline-light bg-white/75"
      )}
    >
      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            "text-[0.82rem] font-medium uppercase tracking-[0.22em] transition-colors group-hover:text-copper",
            dark ? "text-ivory" : "text-ink"
          )}
        >
          {seat.title}
        </span>
        {seat.to && (
          <ArrowUpRight
            className="h-3.5 w-3.5 text-copper transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.5}
          />
        )}
      </div>
      <span
        className={cn(
          "type-body-sm mt-2.5 max-w-[230px]",
          dark ? "text-stone-dark" : "text-stone"
        )}
      >
        {seat.descriptor}
      </span>
      {seat.affiliated && (
        <span className="mt-3 border border-copper/40 px-2 py-0.5 text-[0.52rem] font-medium uppercase tracking-[0.2em] text-copper">
          In-House Partner
        </span>
      )}
    </motion.div>
  );

  if (seat.to) {
    return (
      <Link to={seat.to} className="block h-full w-full">
        {inner}
      </Link>
    );
  }
  return inner;
}

function Connector({
  dark,
  vertical,
  delay,
}: {
  dark?: boolean;
  vertical?: boolean;
  delay: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      initial={reduced ? false : { scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay, duration: 0.6, ease: EASE }}
      className={cn(
        "block bg-copper/40",
        vertical
          ? "mx-auto h-8 w-px origin-top"
          : "my-auto h-px w-8 origin-left",
        dark && "bg-copper/50"
      )}
    />
  );
}

export default function FourSeats({
  tone = "light",
  showJourney = true,
  showDisclosure = true,
  className,
}: {
  tone?: "light" | "dark";
  showJourney?: boolean;
  showDisclosure?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";
  const reduced = useReducedMotion();
  const { seats, journeySteps } = brokerage.oneTable;

  // Map the 8 seats around the central table:
  // Top row: 3 seats (Real Estate, Mortgage/Unity, Title/Amicus)
  // Left & Right flanks: Home Warranty (left) & Home Inspection (right)
  // Bottom row: 3 seats (Moving Services, Contractors & Trades, Wealth & Investment)
  const topSeats: SeatInfo[] = [
    {
      title: seats[0].title,
      descriptor: seats[0].descriptor,
      to: "/clients",
    },
    {
      title: `${seats[1].title} · Unity Home Loans`,
      descriptor: seats[1].descriptor,
      to: "/services/mortgage",
      affiliated: true,
    },
    {
      title: `${seats[2].title} · Amicus Title`,
      descriptor: seats[2].descriptor,
      to: "/services/title",
      affiliated: true,
    },
  ];

  const leftSeat: SeatInfo = {
    title: seats[3].title,
    descriptor: seats[3].descriptor,
  };

  const rightSeat: SeatInfo = {
    title: seats[4].title,
    descriptor: seats[4].descriptor,
  };

  const bottomSeats: SeatInfo[] = [
    {
      title: seats[5].title,
      descriptor: seats[5].descriptor,
    },
    {
      title: seats[6].title,
      descriptor: seats[6].descriptor,
    },
    {
      title: seats[7].title,
      descriptor: seats[7].descriptor,
    },
  ];

  const centerTable = (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
      className="relative mx-auto flex w-full flex-col items-center border border-copper bg-ink px-6 py-10 text-center shadow-lift md:py-12"
    >
      {/* Slow copper breathing frame on the table itself */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 border border-copper"
        animate={
          reduced
            ? undefined
            : { opacity: [0.25, 0.75, 0.25], scale: [1, 1.014, 1] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="inline-block h-3 w-3 rotate-45 bg-copper" />
      <span className="mt-5 text-[0.95rem] font-medium uppercase tracking-[0.26em] text-ivory">
        Your KW Success Trusted Advisor
      </span>
      <span className="type-serif-accent mt-1 !text-[1.25rem] text-copper-bright">
        &amp; you
      </span>
      <span className="type-body-sm mt-4 max-w-sm text-stone-dark">
        Sitting at the table together — coordinating real estate, lending,
        title, inspections, and home services from first conversation to long
        after closing.
      </span>
    </motion.div>
  );

  return (
    <div className={cn("w-full", className)}>
      {/* Desktop: 8 seats arranged around the center table */}
      <div className="hidden lg:block">
        {/* Top 3 Seats */}
        <div className="grid grid-cols-3 gap-5">
          {topSeats.map((s, i) => (
            <SeatCard
              key={s.title}
              seat={s}
              dark={dark}
              delay={0.05 + i * 0.06}
            />
          ))}
        </div>

        <div className="grid grid-cols-3">
          <Connector vertical dark={dark} delay={0.3} />
          <Connector vertical dark={dark} delay={0.35} />
          <Connector vertical dark={dark} delay={0.4} />
        </div>

        {/* Middle Row: Left Seat — Center Table — Right Seat */}
        <div className="grid grid-cols-[1fr_auto_1.8fr_auto_1fr] items-center">
          <SeatCard seat={leftSeat} dark={dark} delay={0.18} />
          <Connector dark={dark} delay={0.45} />
          <div>{centerTable}</div>
          <Connector dark={dark} delay={0.45} />
          <SeatCard seat={rightSeat} dark={dark} delay={0.22} />
        </div>

        <div className="grid grid-cols-3">
          <Connector vertical dark={dark} delay={0.35} />
          <Connector vertical dark={dark} delay={0.4} />
          <Connector vertical dark={dark} delay={0.45} />
        </div>

        {/* Bottom 3 Seats */}
        <div className="grid grid-cols-3 gap-5">
          {bottomSeats.map((s, i) => (
            <SeatCard
              key={s.title}
              seat={s}
              dark={dark}
              delay={0.25 + i * 0.06}
            />
          ))}
        </div>
      </div>

      {/* Tablet & Mobile: Center Table + 2-column grid */}
      <div className="flex flex-col items-center gap-4 lg:hidden">
        {centerTable}
        <Connector vertical dark={dark} delay={0.2} />
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {[...topSeats, leftSeat, rightSeat, ...bottomSeats].map((s, idx) => (
            <SeatCard
              key={s.title}
              seat={s}
              dark={dark}
              delay={0.05 * idx}
            />
          ))}
        </div>
      </div>

      {/* 7-Step Horizontal Journey Strip */}
      {showJourney && (
        <div className="mt-20">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-copper" />
            <span className="type-label text-copper">The Journey</span>
            <span className="h-px w-10 bg-copper" />
          </div>
          <div className="relative mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {journeySteps.map((step, idx) => (
              <motion.div
                key={step}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * idx, duration: 0.5, ease: EASE }}
                className={cn(
                  "flex flex-col items-center border p-4 text-center transition-colors hover:border-copper",
                  dark
                    ? "hairline-dark bg-ink/50"
                    : "hairline-light bg-white/60"
                )}
              >
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-copper">
                  0{idx + 1}
                </span>
                <span
                  className={cn(
                    "mt-2 text-[0.78rem] font-medium uppercase tracking-[0.14em]",
                    dark ? "text-ivory" : "text-ink"
                  )}
                >
                  {step}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Affiliated Business Disclosure */}
      {showDisclosure && (
        <div className="mt-12">
          <AffiliatedDisclosure tone={dark ? "dark" : "light"} />
        </div>
      )}
    </div>
  );
}
