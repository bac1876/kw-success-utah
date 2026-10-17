import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChevronDown,
  Compass,
  Home as HomeIcon,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import FourSeats from "@/components/FourSeats";
import ThreePillars from "@/components/ThreePillars";
import StatsBand, { type StatItem } from "@/components/StatsBand";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";
import Parallax from "@/components/motion/Parallax";
import SplitChars from "@/components/motion/SplitChars";
import SpotlightCard from "@/components/motion/SpotlightCard";
import NetworkMap from "@/components/motion/NetworkMap";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/lib/usePageMeta";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/** §5.6 Map config StatEntry -> StatsBand StatItem, inferring the counter format from the display string. */
const HOME_STATS: StatItem[] = activeBrokerage.home.stats.map((s) => ({
  display: s.display,
  countTo: s.countTo,
  format:
    s.format ??
    (s.display.startsWith("$")
      ? "money"
      : s.display.includes(",")
        ? "comma"
        : "plain"),
  label: s.label,
  note: s.note,
  sample: s.sample,
}));

const WASATCH_COMMUNITIES_TICKER = [
  "Layton Market Center",
  "Ogden & Ogden Valley",
  "Kaysville & Fruit Heights",
  "Farmington & Centerville",
  "Bountiful & North Salt Lake",
  "Syracuse & West Point",
  "South Weber & Uintah",
  "Morgan & Mountain Green",
  "Huntsville & Eden",
  "North Ogden & Pleasant View",
];

/* ------------------------------------------------------------------ */
/* §5.1 Hero — Wasatch Mountains + Modern Editorial Layout             */
/* ------------------------------------------------------------------ */

function HeroBackground() {
  const root = useRef<HTMLDivElement>(null);
  const { hero } = activeBrokerage.home;

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const img = root.current?.querySelector("[data-hero-img]");
      if (!img || reduced) return;

      gsap.fromTo(
        img,
        { scale: 1.1 },
        { scale: 1, duration: 1.5, ease: "power3.out" }
      );
      gsap.to(img, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden bg-ink-deep">
      <img
        data-hero-img
        src={hero.image}
        alt={hero.imageAlt}
        className="h-[115%] w-full object-cover object-center will-change-transform"
      />
      {/* Balanced alpine gradient: preserves clear sky & snow-capped peaks while grounding typography */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,23,26,0.36) 0%, rgba(20,23,26,0.16) 42%, rgba(20,23,26,0.76) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 left-1/2 h-64 w-[48rem] -translate-x-1/2 rounded-full bg-kw-red/25 blur-3xl"
      />
    </div>
  );
}

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { hero } = activeBrokerage.home;
  const { logos, name } = activeBrokerage;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el as HTMLElement, { offset: -HEADER_H });
    } else {
      (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="keep-dark relative flex min-h-[96dvh] flex-col justify-between overflow-hidden"
      style={{ marginTop: -HEADER_H }}
    >
      <HeroBackground />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-kw relative z-20 my-auto pb-16 pt-[160px]"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Location Pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-ink-deep/65 px-4 py-1.5 backdrop-blur-md"
          >
            <MapPin className="h-3.5 w-3.5 text-kw-red-bright" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-snow">
              {hero.cornerCaption}
            </span>
          </motion.div>

          {/* §5.1 KW Success Reversed Logo Centered */}
          <motion.img
            src={logos.reversed}
            alt={name}
            className="mt-7 h-16 w-auto max-w-[280px] object-contain drop-shadow-lg md:h-20 md:max-w-[340px]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.9, ease: EASE }}
          />

          {/* §5.1 Headline: You define Success. The relationship is how we get there. */}
          <h1 className="type-display-xl mt-7 max-w-4xl text-white drop-shadow-sm text-balance">
            <SplitChars text={hero.headline} delay={0.25} stagger={0.018} />
          </h1>

          {/* §5.1 Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
            className="type-lead mt-6 max-w-2xl text-snow/90 text-balance"
          >
            {hero.subhead}
          </motion.p>

          {/* §5.1 Two Doors: I'm an Agent | I'm Buying or Selling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7, ease: EASE }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link
              to={hero.primaryCta.to}
              className="group inline-flex items-center gap-3.5 rounded-full bg-kw-red py-2.5 pl-7 pr-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_12px_36px_-6px_rgba(180,1,1,0.75)] transition-all duration-300 hover:bg-kw-red-bright hover:scale-[1.02]"
            >
              <span>{hero.primaryCta.label}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-kw-red transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </Link>

            <Link
              to={hero.secondaryCta.to}
              className="group inline-flex items-center gap-3.5 rounded-full border border-white/30 bg-ink-deep/65 py-2.5 pl-7 pr-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-ink hover:scale-[1.02]"
            >
              <span>{hero.secondaryCta.label}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-transform duration-300 group-hover:rotate-45 group-hover:bg-ink group-hover:text-white">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Hero Telemetry & Infinite Wasatch Community Marquee */}
      <div className="relative z-20 border-t border-white/10 bg-ink-deep/75 backdrop-blur-md">
        <div className="container-kw flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-kw-red-bright opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-kw-red-bright" />
            </span>
            <span className="text-xs font-semibold tracking-wider text-snow/85">
              Layton Market Center · Est. 1997
            </span>
          </div>

          {/* Infinite Scrolling Communities Ticker on Desktop */}
          <div className="hidden max-w-md overflow-hidden xl:block">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="flex w-max items-center gap-6"
            >
              {[...WASATCH_COMMUNITIES_TICKER, ...WASATCH_COMMUNITIES_TICKER].map(
                (item, idx) => (
                  <span
                    key={`${item}-${idx}`}
                    className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-stone-dark"
                  >
                    <span className="h-1 w-1 rounded-full bg-kw-red-bright" />
                    {item}
                  </span>
                )
              )}
            </motion.div>
          </div>

          <button
            type="button"
            onClick={() => scrollTo("#connected")}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-snow/85 transition-colors hover:text-white"
          >
            <span>Explore One Table</span>
            <ChevronDown className="h-4 w-4 animate-bounce text-kw-red-bright" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §5.2 "Everyone at One Table" (Dark Architectural Slate Section)     */
/* ------------------------------------------------------------------ */

function EveryoneAtOneTable() {
  const { oneTable } = activeBrokerage.home;

  return (
    <section
      id="connected"
      className="relative overflow-hidden bg-ink py-24 text-snow md:py-32"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[34rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-kw-red/10 blur-3xl"
      />

      <div className="container-kw relative z-10">
        {/* Asymmetric Modern Editorial Header */}
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/35 bg-kw-red/10 px-3.5 py-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kw-red text-[0.65rem] font-bold text-white">
                  01
                </span>
                <span className="type-label text-kw-red-bright">
                  {oneTable.eyebrow}
                </span>
              </div>
            </Reveal>

            <h2 className="type-display-lg mt-5 text-white text-balance">
              <SplitWords text={oneTable.headline} />
            </h2>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <p className="type-body text-stone-dark leading-relaxed">
                {oneTable.body}
              </p>
            </Reveal>
          </div>
        </div>

        <Parallax distance={-12} className="mt-14">
          <FourSeats tone="dark" showJourney />
        </Parallax>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §5.3 The Success Idea (Cool Wasatch Sky Mist Section)               */
/* ------------------------------------------------------------------ */

function TheSuccessIdea() {
  const { successIdea } = activeBrokerage.home;
  const reduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [flywheelPaused, setFlywheelPaused] = useState(false);

  useEffect(() => {
    if (reduced || flywheelPaused) return;
    const timer = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % successIdea.chainSteps.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [reduced, flywheelPaused, successIdea.chainSteps.length]);

  return (
    <section
      id="thesis"
      className="relative overflow-hidden bg-mist py-24 text-ink md:py-32"
    >
      <div className="container-kw">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/30 bg-kw-red/10 px-3.5 py-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kw-red text-[0.65rem] font-bold text-white">
                  02
                </span>
                <span className="type-label text-kw-red">
                  {successIdea.eyebrow}
                </span>
              </div>
            </Reveal>

            <h2 className="type-display-lg mt-5 text-ink text-balance">
              <SplitWords text={successIdea.headline} />
            </h2>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <p className="type-lead text-charcoal">{successIdea.body}</p>
            </Reveal>
          </div>
        </div>

        {/* §5.3 Two-column split (High-Contrast Dark Slate + Crisp Light Bento Cards with 3D Tilt) */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Card 1: For Our Agents (Dark Slate Card) */}
          <Reveal delay={0.1} y={24}>
            <SpotlightCard
              enableTilt
              maxTilt={3}
              spotlightColor="rgba(209, 25, 25, 0.25)"
              borderGlowColor="rgba(255, 80, 80, 0.9)"
              className="group flex h-full flex-col justify-between rounded-3xl border border-ink/10 bg-ink p-8 text-snow shadow-lift md:p-12"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-kw-red px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(180,1,1,0.5)]">
                    <Sparkles className="h-3.5 w-3.5" />
                    {successIdea.forAgentsTitle}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-stone-dark">
                    01 / Agents
                  </span>
                </div>

                <h3 className="mt-7 text-2xl font-bold leading-snug text-white md:text-3xl">
                  Build the business that funds your version of success.
                </h3>

                <p className="type-body mt-4 leading-relaxed text-stone-dark">
                  {successIdea.forAgentsBody}
                </p>
              </div>

              <div className="mt-10 border-t border-white/10 pt-6">
                <Link
                  to="/agents"
                  className="group/btn inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:text-kw-red-bright"
                >
                  <span>Explore For Agents</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-kw-red text-white transition-transform duration-300 group-hover/btn:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Card 2: For Our Clients (Crisp Elevated Card) */}
          <Reveal delay={0.2} y={24}>
            <SpotlightCard
              enableTilt
              maxTilt={3}
              spotlightColor="rgba(180, 1, 1, 0.12)"
              borderGlowColor="rgba(180, 1, 1, 0.65)"
              className="group flex h-full flex-col justify-between rounded-3xl border border-ink/10 bg-white p-8 text-ink shadow-lift md:p-12"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-kw-red/30 bg-kw-red/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-kw-red">
                    <HomeIcon className="h-3.5 w-3.5" />
                    {successIdea.forClientsTitle}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-kw-gray">
                    02 / Clients
                  </span>
                </div>

                <h3 className="mt-7 text-2xl font-bold leading-snug text-ink md:text-3xl">
                  Home base for living out your dreams in Northern Utah.
                </h3>

                <p className="type-body mt-4 leading-relaxed text-charcoal">
                  {successIdea.forClientsBody}
                </p>
              </div>

              <div className="mt-10 border-t border-ink/10 pt-6">
                <Link
                  to="/clients"
                  className="group/btn inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:text-kw-red"
                >
                  <span>Explore Buy &amp; Sell</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover/btn:rotate-45 group-hover/btn:bg-kw-red">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>

        {/* §5.3 Animated Flywheel Chain: KW Success invests in agents → Agents invest in clients → Everyone builds success by design */}
        <Reveal delay={0.25}>
          <SpotlightCard
            spotlightColor="rgba(209, 25, 25, 0.2)"
            borderGlowColor="rgba(255, 80, 80, 0.8)"
            className="mt-8 rounded-3xl border border-ink/10 bg-ink-deep p-6 text-snow shadow-lift md:p-9"
            onMouseEnter={() => setFlywheelPaused(true)}
            onMouseLeave={() => setFlywheelPaused(false)}
          >
            {/* Live Flywheel Energy Rail */}
            <div className="mb-5 hidden items-center justify-between gap-4 md:flex">
              <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-stone-dark">
                Compounding Success Flywheel · Step 0{activeStep + 1} of 0
                {successIdea.chainSteps.length}
              </span>
              <div className="relative h-1 w-48 overflow-hidden rounded-full bg-white/10">
                <motion.span
                  animate={{
                    scaleX: (activeStep + 1) / successIdea.chainSteps.length,
                  }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-kw-red to-kw-red-bright"
                />
              </div>
            </div>

            <div className="grid items-center gap-6 md:grid-cols-3">
              {successIdea.chainSteps.map((step, i) => {
                const isActive = activeStep === i;
                return (
                  <button
                    key={step}
                    type="button"
                    onClick={() => setActiveStep(i)}
                    onMouseEnter={() => setActiveStep(i)}
                    className={cn(
                      "group relative flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-colors duration-300",
                      isActive
                        ? "border-kw-red/70 bg-white/[0.07]"
                        : "border-white/10 bg-white/[0.03] hover:border-kw-red/40 hover:bg-white/[0.05]"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="flywheel-active-glow"
                        className="pointer-events-none absolute inset-0 rounded-2xl border border-kw-red-bright/80 shadow-[0_0_28px_rgba(209,25,25,0.28)]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span
                      className={cn(
                        "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-white transition-all duration-300",
                        isActive
                          ? "bg-kw-red shadow-[0_0_22px_rgba(209,25,25,0.65)] scale-105"
                          : "bg-white/10 text-stone-dark group-hover:bg-kw-red/80 group-hover:text-white"
                      )}
                    >
                      0{i + 1}
                    </span>
                    <p
                      className={cn(
                        "relative z-10 text-sm font-semibold leading-snug transition-colors duration-300",
                        isActive ? "text-white" : "text-snow/80"
                      )}
                    >
                      {step}
                    </p>
                    {i < successIdea.chainSteps.length - 1 && (
                      <ArrowRight
                        className={cn(
                          "relative z-10 ml-auto hidden h-4 w-4 shrink-0 transition-transform duration-300 md:block",
                          isActive
                            ? "translate-x-1 text-kw-red-bright"
                            : "text-stone-dark"
                        )}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §5.5 Our Promise (Cool Mist Section + Interactive Continuity Card)  */
/* ------------------------------------------------------------------ */

const CONTINUITY_MILESTONES = [
  {
    year: "1997",
    title: "Founded in Northern Utah",
    detail:
      "Built in the communities of Weber, Davis, and Morgan Counties with a commitment to coaching, leadership, and lifelong client care.",
  },
  {
    year: "20,000+",
    title: "Utah Families Served",
    detail:
      "Over two decades of guiding first-time buyers, growing families, Hill AFB relocations, and lifelong Northern Utah homeowners.",
  },
  {
    year: "Today",
    title: "Everyone at One Table",
    detail:
      "Your KW Success Trusted Advisor coordinates lending, title, insurance, inspections, and trusted local trades under one roof.",
  },
];

function OurPromise() {
  const { promise } = activeBrokerage.home;
  const reduced = useReducedMotion();
  const [activeMilestone, setActiveMilestone] = useState(2);
  const [timelinePaused, setTimelinePaused] = useState(false);

  useEffect(() => {
    if (reduced || timelinePaused) return;
    const timer = window.setInterval(() => {
      setActiveMilestone((prev) => (prev + 1) % CONTINUITY_MILESTONES.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [reduced, timelinePaused]);

  return (
    <section className="relative overflow-hidden bg-mist-deep py-24 text-ink md:py-32">
      <div className="container-kw">
        <div className="rounded-3xl border border-ink/10 bg-white p-8 shadow-lift md:p-14 lg:p-16">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/30 bg-kw-red/10 px-3.5 py-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kw-red text-[0.65rem] font-bold text-white">
                    04
                  </span>
                  <span className="type-label text-kw-red">
                    {promise.eyebrow}
                  </span>
                </div>
              </Reveal>

              <h2 className="type-display-lg mt-5 text-ink text-balance">
                <SplitWords text={promise.headline} />
              </h2>

              <Reveal delay={0.15}>
                <p className="type-lead mt-6 max-w-2xl text-charcoal">
                  {promise.body}
                </p>
              </Reveal>
            </div>

            {/* §5.5 Interactive Continuity Timeline Card: 1997 ———— today */}
            <div className="lg:col-span-5">
              <Reveal delay={0.2}>
                <SpotlightCard
                  spotlightColor="rgba(209, 25, 25, 0.25)"
                  borderGlowColor="rgba(255, 80, 80, 0.9)"
                  className="rounded-3xl bg-ink p-8 text-snow shadow-lift"
                  onMouseEnter={() => setTimelinePaused(true)}
                  onMouseLeave={() => setTimelinePaused(false)}
                >
                  <span className="type-label text-kw-red-bright">
                    Wasatch Front Continuity
                  </span>

                  {/* Interactive Milestone Stepper */}
                  <div className="mt-6 flex items-center justify-between gap-2">
                    {CONTINUITY_MILESTONES.map((m, idx) => {
                      const active = activeMilestone === idx;
                      return (
                        <button
                          key={m.year}
                          type="button"
                          onClick={() => setActiveMilestone(idx)}
                          onMouseEnter={() => setActiveMilestone(idx)}
                          className={cn(
                            "relative rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider transition-colors",
                            active
                              ? "text-white"
                              : "bg-white/10 text-stone-dark hover:text-white"
                          )}
                        >
                          {active && (
                            <motion.span
                              layoutId="continuity-milestone-pill"
                              className="absolute inset-0 rounded-full bg-kw-red shadow-[0_0_20px_rgba(180,1,1,0.6)]"
                              transition={{
                                type: "spring",
                                stiffness: 420,
                                damping: 34,
                              }}
                            />
                          )}
                          <span className="relative z-10">{m.year}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-lg font-extrabold tracking-tight text-white">
                      {promise.timelineStart}
                    </span>
                    <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/15">
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX:
                            (activeMilestone + 1) /
                            CONTINUITY_MILESTONES.length,
                        }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="absolute inset-0 origin-left bg-gradient-to-r from-kw-red to-kw-red-bright"
                      />
                    </div>
                    <span className="rounded-full bg-kw-red/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-kw-red-bright">
                      {promise.timelineEnd}
                    </span>
                  </div>

                  <div className="mt-5 min-h-[6.25rem] rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={CONTINUITY_MILESTONES[activeMilestone].year}
                        initial={
                          reduced
                            ? false
                            : { opacity: 0, y: 6, filter: "blur(3px)" }
                        }
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
                        transition={{ duration: 0.3, ease: EASE }}
                      >
                        <p className="text-sm font-bold text-white">
                          {CONTINUITY_MILESTONES[activeMilestone].title}
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-stone-dark">
                          {CONTINUITY_MILESTONES[activeMilestone].detail}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <p className="mt-5 text-xs font-medium text-snow/80">
                    {promise.timelineCaption}
                  </p>
                </SpotlightCard>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §5.7 Home Search ("When You're Ready") + Interactive Wasatch Map    */
/* ------------------------------------------------------------------ */

const TABS = ["Buy", "Sell", "Rent"] as const;
const QUICK_TOWNS = [
  "Layton",
  "Kaysville",
  "Ogden",
  "Bountiful",
  "Farmington",
  "Syracuse",
  "Morgan",
];

function HomeSearchSection() {
  const { search } = activeBrokerage.home;
  const [tab, setTab] = useState<(typeof TABS)[number]>("Buy");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [beds, setBeds] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "Sell") {
      navigate("/contact?topic=selling");
      return;
    }
    const url = new URL(activeBrokerage.externalLinks.searchHomesUrl);
    if (location.trim()) url.searchParams.set("q", location.trim());
    if (price) url.searchParams.set("maxPrice", price);
    if (beds) url.searchParams.set("beds", beds);
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  const fieldCls =
    "w-full rounded-xl border border-white/15 bg-ink-deep px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-stone-dark focus:border-kw-red";

  return (
    <section id="home-search" className="bg-mist py-24 text-ink md:py-32">
      <div className="container-kw">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/30 bg-kw-red/10 px-3.5 py-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kw-red text-[0.65rem] font-bold text-white">
                  05
                </span>
                <span className="type-label text-kw-red">{search.eyebrow}</span>
              </div>
            </Reveal>
            <h2 className="type-display-lg mt-5 max-w-3xl text-ink text-balance">
              <SplitWords text={search.headline} />
            </h2>
          </div>

          <Reveal delay={0.15}>
            <Link
              to="/areas-served"
              className="group inline-flex items-center gap-2.5 rounded-full border border-ink/20 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-ink transition-all hover:border-kw-red hover:text-kw-red"
            >
              <Compass className="h-4 w-4 text-kw-red" />
              <span>Full 35-Community Directory</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        {/* High-Contrast Dark Slate Search Console */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-ink/10 bg-ink text-snow shadow-lift">
          {/* Buy / Sell / Rent Tabs */}
          <div className="flex border-b border-white/10 bg-ink-deep/60 px-6 pt-4">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "relative px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] transition-colors",
                  tab === t
                    ? "text-white"
                    : "text-stone-dark hover:text-white"
                )}
              >
                {t}
                {tab === t && (
                  <motion.span
                    layoutId="search-tab-underline"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-kw-red"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
              </button>
            ))}
          </div>

          {tab === "Sell" ? (
            <div className="flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center md:p-10">
              <div>
                <p className="text-xl font-bold text-white">
                  Thinking about selling your home in Northern Utah?
                </p>
                <p className="mt-2 text-sm text-stone-dark">
                  Connect with a KW Success Trusted Advisor for a personalized
                  market valuation and selling strategy across Weber, Davis, or
                  Morgan County.
                </p>
              </div>
              <Link
                to="/contact?topic=selling"
                className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-kw-red py-2.5 pl-6 pr-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-kw-red-bright"
              >
                <span>Talk to an Advisor</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-kw-red transition-transform duration-300 group-hover:rotate-45">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          ) : (
            <div className="p-6 md:p-10">
              <form
                onSubmit={submit}
                className="grid gap-5 md:grid-cols-[1.5fr_1fr_0.8fr_auto] md:items-end"
              >
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-dark">
                    Community / ZIP
                  </label>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Layton, Ogden, Kaysville, Bountiful, Morgan…"
                    className={fieldCls}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-dark">
                    Price Range
                  </label>
                  <select
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={fieldCls}
                  >
                    <option value="">Any price</option>
                    <option value="400000">Up to $400K</option>
                    <option value="600000">Up to $600K</option>
                    <option value="800000">Up to $800K</option>
                    <option value="1000000">Up to $1M</option>
                    <option value="1500000">Up to $1.5M+</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-dark">
                    Beds
                  </label>
                  <select
                    value={beds}
                    onChange={(e) => setBeds(e.target.value)}
                    className={fieldCls}
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="group inline-flex h-[50px] items-center justify-center gap-3 rounded-full bg-kw-red pl-7 pr-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-kw-red-bright"
                >
                  <span>{search.buttonLabel}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-kw-red transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </button>
              </form>

              {/* Quick-select Northern Utah Community Chips */}
              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
                <span className="text-[0.68rem] font-bold uppercase tracking-wider text-stone-dark">
                  Quick Select:
                </span>
                {QUICK_TOWNS.map((town) => (
                  <button
                    key={town}
                    type="button"
                    onClick={() => setLocation(town)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      location === town
                        ? "border-kw-red bg-kw-red text-white"
                        : "border-white/10 bg-white/5 text-snow/80 hover:border-kw-red/50 hover:text-white"
                    )}
                  >
                    {town}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Interactive Wasatch Front Map Showcase right on the Home Page */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-ink/10 bg-ink-deep shadow-lift">
          <NetworkMap />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §5.9 Closing CTA                                                    */
/* ------------------------------------------------------------------ */

function ClosingCTA() {
  const { closingCta } = activeBrokerage.home;

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-snow md:py-32">
      {/* Subtle Wasatch radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-kw-red/20 blur-3xl"
      />
      <div className="container-kw relative z-10">
        <SpotlightCard
          spotlightColor="rgba(209, 25, 25, 0.22)"
          borderGlowColor="rgba(255, 80, 80, 0.9)"
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-card via-ink-deep to-ink-deep p-10 text-center shadow-lift-dark md:p-16"
        >
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-kw-red/40 bg-kw-red/15 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-kw-red-bright">
              <Users className="h-3.5 w-3.5" />
              Layton Market Center · Northern Utah
            </span>
          </Reveal>

          <h2 className="type-display-lg mx-auto mt-6 max-w-4xl text-white text-balance">
            <SplitWords text={closingCta.headline} />
          </h2>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to={closingCta.primaryCta.to}
                className="group inline-flex items-center gap-3.5 rounded-full bg-kw-red py-2.5 pl-7 pr-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_12px_36px_-6px_rgba(180,1,1,0.75)] transition-all hover:bg-kw-red-bright hover:scale-[1.02]"
              >
                <span>{closingCta.primaryCta.label}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-kw-red transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </Link>

              <Link
                to={closingCta.secondaryCta.to}
                className="group inline-flex items-center gap-3.5 rounded-full border border-white/25 bg-white/5 py-2.5 pl-7 pr-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white hover:bg-white hover:text-ink hover:scale-[1.02]"
              >
                <Building2 className="h-4 w-4 text-kw-red-bright group-hover:text-kw-red" />
                <span>{closingCta.secondaryCta.label}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-300 group-hover:rotate-45 group-hover:bg-ink group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                </span>
              </Link>
            </div>
          </Reveal>
        </SpotlightCard>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Home Page (§5 section order)                                        */
/* ------------------------------------------------------------------ */

export default function Home() {
  usePageMeta("", activeBrokerage.home.hero.subhead);
  const { flags } = activeBrokerage;

  return (
    <>
      {/* §5.1 Hero (Wasatch Mountain Panorama) */}
      <Hero />
      {/* §5.2 Everyone at One Table (Dark Slate Interactive Neural Hub) */}
      <EveryoneAtOneTable />
      {/* §5.3 The Success Idea (Cool Sky Mist + 3D Tilt Cards) */}
      <TheSuccessIdea />
      {/* §5.4 The Three Pillars (Deep Slate + Animated SVG Visualizations) */}
      <ThreePillars mode="toggle" tone="dark" />
      {/* §5.5 Our Promise (Cool Mist + Interactive Continuity Stepper) */}
      <OurPromise />
      {/* §5.6 Stats Band + Best of State Badge (Deep Slate Bento) */}
      <StatsBand stats={HOME_STATS} />
      {/* §5.7 Home Search + Interactive Wasatch Front Map */}
      <HomeSearchSection />
      {/* §5.8 Testimonials (hidden by flag showTestimonials=false until real) */}
      {flags.showTestimonials && (
        <section className="bg-ink py-28 text-white md:py-40">
          <div className="container-kw">
            <TestimonialCarousel />
          </div>
        </section>
      )}
      {/* §5.9 Closing CTA (Dark Slate Architectural Banner) */}
      <ClosingCTA />
    </>
  );
}
