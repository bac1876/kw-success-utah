import { memo, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check } from "lucide-react";
import FourSeats from "@/components/FourSeats";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/* Section 1 — Hero with ghost text                                    */
/* ------------------------------------------------------------------ */

/** GSAP-isolated ghost text: load drift + scroll parallax. */
const GhostText = memo(function GhostText() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const el = root.current!.querySelector("[data-ghost]");
      if (reduced) {
        gsap.set(el, { xPercent: 0 });
        return;
      }
      gsap.fromTo(
        el,
        { xPercent: -3 },
        { xPercent: 0, duration: 2, ease: "power2.out" }
      );
      gsap.to(el, {
        yPercent: -20, // 0.2x parallax drift
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
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center overflow-hidden"
    >
      <span
        data-ghost
        className="whitespace-nowrap font-semibold uppercase leading-none text-white/[0.04] will-change-transform"
        style={{ fontSize: "12vw", letterSpacing: "0.18em" }}
      >
        Life of the Home · Life of the Home
      </span>
    </div>
  );
});

function Hero() {
  return (
    <section
      className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden bg-ink"
      style={{ marginTop: -HEADER_H, paddingTop: HEADER_H }}
    >
      <GhostText />
      <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-10 bg-copper" />
          <span className="type-label text-copper">Our Services</span>
          <span className="h-px w-10 bg-copper" />
        </motion.div>
        <h1 className="type-display-lg mt-8 text-ivory">
          <SplitWords text="Connected Homeownership." stagger={0.06} delay={0.5} />
        </h1>
        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="type-serif-accent mt-6 max-w-2xl text-stone-dark"
        >
          One relationship for every step — before, during, and long after the
          closing.
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 2 — Journey Rail (scroll-spy TOC)                           */
/* ------------------------------------------------------------------ */

const journeySteps = [
  { id: "title", label: "Title" },
  { id: "insurance", label: "Insurance" },
  { id: "mortgage", label: "Mortgage" },
] as const;

type JourneyId = (typeof journeySteps)[number]["id"];

function JourneyRail({
  active,
  onNavigate,
}: {
  active: JourneyId;
  onNavigate: (id: JourneyId) => void;
}) {
  const reduced = useReducedMotion();
  return (
    <section className="border-t bg-ink py-16 hairline-dark">
      <div className="container-monogram">
        <div className="relative">
          {/* Track */}
          <motion.span
            initial={{ scaleX: reduced ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.9 }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            className="absolute left-0 right-0 top-1/2 h-px origin-left bg-line-dark"
          />
          <div className="relative grid grid-cols-3">
            {journeySteps.map((step, i) => {
              const isActive = active === step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => onNavigate(step.id)}
                  className={cn(
                    "group flex flex-col items-center gap-4 py-2",
                    i === 0 && "items-start",
                    i === 2 && "items-end"
                  )}
                >
                  <span
                    className={cn(
                      "type-label transition-colors duration-300",
                      isActive
                        ? "text-copper-bright"
                        : "text-stone-dark group-hover:text-copper"
                    )}
                  >
                    {step.label}
                  </span>
                  {/* Copper diamond node */}
                  <motion.span
                    initial={{ scale: reduced ? 1 : 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.9 }}
                    transition={{
                      delay: reduced ? 0 : 0.4 + 0.4 * i,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="relative flex h-6 w-6 items-center justify-center"
                  >
                    <span
                      className={cn(
                        "block h-3 w-3 rotate-45 border transition-all duration-500",
                        isActive
                          ? "border-copper-bright bg-copper"
                          : "border-copper bg-ink group-hover:bg-copper/30"
                      )}
                    />
                    {isActive && (
                      <motion.span
                        layoutId="journey-glow"
                        className="absolute inset-0 rotate-45 border border-copper-bright"
                        style={{ boxShadow: "0 0 12px rgba(208,148,84,0.6)" }}
                        transition={{ type: "spring", stiffness: 260, damping: 30 }}
                      />
                    )}
                  </motion.span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Sections 3–5 — Service sections                                     */
/* ------------------------------------------------------------------ */

interface ServiceSectionProps {
  id: JourneyId;
  tone: "ivory" | "ink";
  image: string;
  imageAlt: string;
  imageSide: "left" | "right";
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  cta: string;
  /** Intent-specific capture page (spec C1) */
  contactTo: string;
  /** Monogram-branded detail page (spec S2–S4) */
  detailTo: string;
  /** Partner site, opened in a new tab (spec S2/S3) */
  externalUrl?: string;
  externalLabel?: string;
  children?: ReactNode;
}

function ServiceSection({
  id,
  tone,
  image,
  imageAlt,
  imageSide,
  eyebrow,
  title,
  body,
  bullets,
  cta,
  contactTo,
  detailTo,
  externalUrl,
  externalLabel,
  children,
}: ServiceSectionProps) {
  const reduced = useReducedMotion();
  const dark = tone === "ink";
  const clipFrom =
    imageSide === "left" ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)";

  // Chromium reports zero intersection for fully self-clipped elements, so
  // the observer lives on this unclipped wrapper and the clip animates on
  // the child via variant propagation.
  const imageBlock = (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        variants={{
          hidden: { clipPath: reduced ? "inset(0% 0% 0% 0%)" : clipFrom },
          visible: { clipPath: "inset(0% 0% 0% 0%)" },
        }}
        transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
        className="relative aspect-[3/2] overflow-hidden"
      >
        <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
        {dark && <div className="absolute inset-0 bg-ink/20" />}
      </motion.div>
    </motion.div>
  );

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 py-24 md:py-32",
        dark ? "bg-ink" : "bg-ivory"
      )}
    >
      <div className="container-monogram grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className={imageSide === "right" ? "lg:order-2" : ""}>
          {imageBlock}
        </div>
        <div className={imageSide === "right" ? "lg:order-1" : ""}>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-copper" />
              <span className="type-label text-copper">{eyebrow}</span>
            </div>
          </Reveal>
          <h2
            className={cn(
              "type-display-md mt-5",
              dark ? "text-ivory" : "text-ink"
            )}
          >
            <SplitWords text={title} />
          </h2>
          <Reveal delay={0.1}>
            <p
              className={cn(
                "type-body mt-6",
                dark ? "text-stone-dark" : "text-stone"
              )}
            >
              {body}
            </p>
          </Reveal>
          <div className="mt-8">
            {bullets.map((b, i) => (
              <Reveal key={b} delay={0.12 + 0.08 * i} y={16}>
                <div className="flex items-center gap-4 border-t py-4 last:border-b hairline-light">
                  <Check className="h-4 w-4 shrink-0 text-copper" strokeWidth={1.5} />
                  <span
                    className={cn(
                      "type-body-sm",
                      dark ? "text-ivory/80" : "text-ink/80"
                    )}
                  >
                    {b}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          {children}
          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                to={contactTo}
                className="btn-sweep inline-block rounded-full border border-copper px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-copper transition-colors duration-300 hover:text-ink"
              >
                {cta} →
              </Link>
              <Link
                to={detailTo}
                className={cn(
                  "nav-link-line type-label transition-colors hover:text-copper",
                  dark ? "text-ivory/80" : "text-ink"
                )}
              >
                Learn More
              </Link>
              {externalUrl && (
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "type-label flex items-center gap-1.5 transition-colors hover:text-copper",
                    dark ? "text-stone-dark" : "text-stone"
                  )}
                >
                  {externalLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Affordability teaser: slider → estimated home price, spring tween. */
function AffordabilityTeaser() {
  const [monthly, setMonthly] = useState(2800);
  const mv = useMotionValue(2800);
  const spring = useSpring(mv, { stiffness: 120, damping: 24 });
  const [display, setDisplay] = useState("$430K");

  useEffect(() => {
    mv.set(monthly);
  }, [monthly, mv]);

  useMotionValueEvent(spring, "change", (v) => {
    // ~$154 of home price per $1 of comfortable monthly payment
    const home = (v * 154) / 1000;
    setDisplay(`$${Math.round(home)}K`);
  });

  return (
    <Reveal delay={0.2}>
      <div className="mt-10 border hairline-light bg-white p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="type-label text-stone">Monthly Comfort</span>
          <span className="text-[1.05rem] font-medium text-ink">
            ${monthly.toLocaleString("en-US")}
          </span>
        </div>
        <input
          type="range"
          min={800}
          max={6000}
          step={50}
          value={monthly}
          onChange={(e) => setMonthly(Number(e.target.value))}
          aria-label="Comfortable monthly payment"
          className="mt-4 w-full accent-copper"
        />
        <div className="mt-4 flex items-baseline justify-between border-t hairline-light pt-4">
          <span className="type-body-sm text-stone">You could call this home</span>
          <span className="type-display-md text-copper">≈ {display}</span>
        </div>
      </div>
    </Reveal>
  );
}

/** Shield icon that draws its stroke once on entry. */
function ShieldDraw() {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-10 w-10 text-copper"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.path
        d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
        variants={{
          hidden: { pathLength: reduced ? 1 : 0 },
          visible: { pathLength: 1 },
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      <motion.path
        d="m9 12 2 2 4-4"
        variants={{
          hidden: { pathLength: reduced ? 1 : 0 },
          visible: { pathLength: 1 },
        }}
        transition={{ duration: 0.7, delay: reduced ? 0 : 0.9, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/* Section 6 — Four Partners. One Table. (shared with homepage, S5)    */
/* ------------------------------------------------------------------ */

function OneTable() {
  return (
    <section className="border-t bg-ink py-28 hairline-dark md:py-40">
      <div className="container-monogram">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-copper" />
            <span className="type-label text-copper">One Relationship</span>
            <span className="h-px w-10 bg-copper" />
          </div>
          <h2 className="type-display-md mt-5 text-ivory">
            <SplitWords text="Four Partners. One Table." />
          </h2>
        </div>
        <div className="mt-16">
          <FourSeats tone="dark" />
        </div>
        <Reveal delay={0.3}>
          <p className="type-body mx-auto mt-12 max-w-xl text-center text-stone-dark">
            The same table you saw on the homepage — because it is the same
            relationship, wherever you meet it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 6.5 — Home Services (coming soon, spec S8/G3)               */
/* ------------------------------------------------------------------ */

function HomeServicesTeaser() {
  return (
    <section className="border-t bg-ivory py-20 hairline-light md:py-24">
      <div className="container-monogram flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <div className="flex items-center justify-center gap-3 md:justify-start">
            <span className="type-label text-copper">Home Services</span>
            <span className="border border-copper/50 px-2 py-0.5 text-[0.58rem] font-medium uppercase tracking-[0.2em] text-copper">
              Coming Soon
            </span>
          </div>
          <p className="type-body mt-4 max-w-xl text-stone">
            A fifth seat is being built at the table — a full home-services
            program for the life of the home.
          </p>
        </div>
        <Link
          to="/home-services"
          className="btn-sweep inline-block shrink-0 rounded-full border border-copper px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-copper transition-colors duration-300 hover:text-ink"
        >
          Be First to Know →
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 7 — CTA Band                                                */
/* ------------------------------------------------------------------ */

function CtaBand() {
  return (
    <section className="border-t bg-ink py-28 hairline-dark md:py-36">
      <div className="container-monogram flex flex-col items-center text-center">
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="h-px w-24 origin-left bg-copper"
        />
        <h2 className="type-display-md mt-8 text-ivory">
          <SplitWords text="One Conversation Opens Every Door." />
        </h2>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="inline-block rounded-full bg-copper px-10 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-ink transition-colors duration-300 hover:bg-copper-bright"
            >
              Contact Us →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export default function Services() {
  const [active, setActive] = useState<JourneyId>("title");

  // Scroll-spy: active journey node follows section position
  useEffect(() => {
    const onScroll = () => {
      const probe = HEADER_H + window.innerHeight * 0.35;
      let current: JourneyId = "title";
      for (const step of journeySteps) {
        const el = document.getElementById(step.id);
        if (el && el.getBoundingClientRect().top <= probe) current = step.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (id: JourneyId) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis)
      window.__lenis.scrollTo(el, { offset: -(HEADER_H - 36) });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Hero />
      <JourneyRail active={active} onNavigate={navigate} />

      <ServiceSection
        id="title"
        tone="ivory"
        image="/service-title.jpg"
        imageAlt="Fountain pen signing closing documents"
        imageSide="left"
        eyebrow="Title Services"
        title="Summit Title"
        body="The closing table should feel like a milestone, not a hurdle. Summit Title handles the details — searches, escrow, documents — so the day you get your keys is the day you remember."
        bullets={[
          "Title search & insurance",
          "Escrow & settlement services",
          "Rate sheets & net sheet tools",
        ]}
        cta="Plan a Smooth Closing"
        contactTo="/contact/title"
        detailTo="/services/title"
        externalUrl="https://summittitleillinois.com"
        externalLabel="summittitleillinois.com"
      />

      {/* 100px gradient seam: ivory → ink */}
      <div
        aria-hidden
        className="h-[100px]"
        style={{
          background: "linear-gradient(180deg, #F5F1EA 0%, #121413 100%)",
        }}
      />

      <ServiceSection
        id="insurance"
        tone="ink"
        image="/service-insurance.jpg"
        imageAlt="Umbrella over a miniature house model on a wooden table"
        imageSide="right"
        eyebrow="Home & Auto Insurance"
        title="Prairie Home & Auto"
        body="Relationship stewardship doesn't end at closing. Prairie protects what you've built — home, auto, and the life between them — with advisors who already know your story."
        bullets={[
          "Bundled home & auto coverage",
          "Annual policy reviews with your advisor",
          "Claims guidance from people you know",
        ]}
        cta="Review My Coverage"
        contactTo="/contact/insurance"
        detailTo="/services/insurance"
        externalUrl="https://prairieha.com"
        externalLabel="prairieha.com"
      >
        <div className="mt-10">
          <ShieldDraw />
        </div>
      </ServiceSection>

      {/* 100px gradient seam: ink → ivory */}
      <div
        aria-hidden
        className="h-[100px]"
        style={{
          background: "linear-gradient(180deg, #121413 0%, #F5F1EA 100%)",
        }}
      />

      <ServiceSection
        id="mortgage"
        tone="ivory"
        image="/service-mortgage.jpg"
        imageAlt="Mortgage advisor reviewing documents with a couple at a kitchen table"
        imageSide="left"
        eyebrow="Mortgage Solutions"
        title="Mutual of Omaha Mortgage"
        body="Financing shaped around your life, not a rate sheet. Your advisor and your lender sit at the same table — because long-term guidance starts with honest numbers."
        bullets={[
          "Pre-approval with a human on the phone",
          "Purchase, refinance & renovation lending",
          "First-time buyer guidance programs",
        ]}
        cta="Start a Lending Conversation"
        contactTo="/contact/mortgage"
        detailTo="/services/mortgage"
      >
        <AffordabilityTeaser />
      </ServiceSection>

      <OneTable />
      <HomeServicesTeaser />
      <CtaBand />
    </>
  );
}
