import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";
import StatsBand from "@/components/StatsBand";
import type { StatItem } from "@/components/StatsBand";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function scrollToId(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (window.__lenis)
    window.__lenis.scrollTo(el as HTMLElement, { offset: -HEADER_H });
  else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
}

/* ------------------------------------------------------------------ */
/* Section 1 — Hero (60vh)                                             */
/* ------------------------------------------------------------------ */

/** GSAP-isolated background: curtain reveal + subtle parallax. */
function HeroBackground() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const img = root.current!.querySelector("[data-hero-img]");
      const wrap = root.current!.querySelector("[data-hero-clip]");

      if (reduced) {
        gsap.set(wrap, { clipPath: "inset(0% 0 0% 0)" });
        gsap.set(img, { scale: 1 });
      } else {
        gsap.fromTo(
          wrap,
          { clipPath: "inset(0% 0 100% 0)" },
          { clipPath: "inset(0% 0 0% 0)", duration: 1.4, ease: "power3.inOut" }
        );
        gsap.fromTo(
          img,
          { scale: 1.15 },
          { scale: 1, duration: 1.4, ease: "power3.inOut" }
        );
        gsap.to(img, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: root }
  );

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden">
      <div data-hero-clip className="h-full w-full will-change-transform">
        <img
          data-hero-img
          src="/hero-sell.jpg"
          alt="Sunlit brick colonial at golden hour"
          className="h-[115%] w-full object-cover will-change-transform"
        />
      </div>
      <div className="overlay-hero absolute inset-0" />
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative flex min-h-[60dvh] flex-col overflow-hidden"
      style={{ marginTop: -HEADER_H }}
    >
      <HeroBackground />
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-[160px] text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-10 bg-copper" />
          <span className="type-label text-copper">Sell With Intention</span>
          <span className="h-px w-10 bg-copper" />
        </motion.div>

        <h1 className="type-display-lg mt-8 max-w-5xl text-ivory text-balance">
          <SplitWords
            text="Your Home Carries a Story. We Help It Find Its Next Reader."
            stagger={0.05}
            delay={0.4}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.9 + 0.9, duration: 0.8 }}
          className="type-serif-accent mt-6 text-ivory/90"
        >
          Selling isn't a transaction to close — it's a chapter to honor.
        </motion.p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, scale: [1, 1, 1.03, 1] }}
            transition={{
              opacity: { delay: 1.3, duration: 0.7, ease: EASE },
              y: { delay: 1.3, duration: 0.7, ease: EASE },
              scale: { delay: 1.6, duration: 0.6, times: [0, 0.6, 0.8, 1] },
            }}
          >
            <button
              type="button"
              onClick={() => scrollToId("#valuation")}
              className="btn-sweep inline-flex items-center gap-2 rounded-full border border-copper px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-copper transition-colors duration-300 hover:text-ink"
            >
              What's My Home Worth?
              <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45, duration: 0.7, ease: EASE }}
          >
            <Link
              to="/contact"
              className="inline-block rounded-full border border-white/50 px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
            >
              Talk to an Advisor
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 2 — Home Valuation Widget                                   */
/* ------------------------------------------------------------------ */

const ADDRESS_SUGGESTIONS = [
  "1420 Fox Bend Ln, Aurora",
  "88 Stonebridge Ct, Naperville",
  "2311 Prairie Path, Downers Grove",
  "405 Linden Oaks Dr, Glen Ellyn",
  "1712 Riverwalk Ln, Geneva",
  "963 Harvest Ridge, St. Charles",
];

const ANALYSIS_LINES = [
  "Reviewing comparable residences…",
  "Consulting market stewardship data…",
  "Preparing your personalized range…",
];

const CONDITION_OPTIONS = ["Updated", "Well-kept", "Needs love"] as const;

type WidgetStep = "address" | "details" | "analyzing" | "result";

/** Typing state: three lines type in sequence, 0.8s each, blinking caret. */
function AnalysisState({ onDone }: { onDone: () => void }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const line = ANALYSIS_LINES[lineIdx];
    if (charIdx < line.length) {
      const t = window.setTimeout(
        () => setCharIdx((c) => c + 1),
        800 / line.length
      );
      return () => window.clearTimeout(t);
    }
    if (lineIdx < ANALYSIS_LINES.length - 1) {
      const t = window.setTimeout(() => {
        setLineIdx((i) => i + 1);
        setCharIdx(0);
      }, 250);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(onDone, 400);
    return () => window.clearTimeout(t);
  }, [lineIdx, charIdx, onDone]);

  return (
    <div className="flex min-h-[180px] flex-col justify-center gap-4">
      {ANALYSIS_LINES.map((line, i) => {
        if (i > lineIdx) return null;
        const text = i === lineIdx ? line.slice(0, charIdx) : line;
        return (
          <p
            key={line}
            className="type-body flex items-center gap-1 text-ink/80"
          >
            <span>{text}</span>
            {i === lineIdx && (
              <span className="inline-block h-[1.1em] w-px animate-pulse bg-copper" />
            )}
            {i < lineIdx && (
              <span className="type-body-sm ml-2 text-copper">✓</span>
            )}
          </p>
        );
      })}
    </div>
  );
}

/** Result state: range counts up from the lower bound. */
function ResultState() {
  const low = useMotionValue(0);
  const lowText = useTransform(
    low,
    (v) => `$${Math.round(v).toLocaleString("en-US")}`
  );

  useEffect(() => {
    const controls = animate(low, 650000, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [low]);

  return (
    <div className="text-center">
      <p className="type-label text-stone">Your Estimated Range</p>
      <p className="type-stat mt-4 text-copper">
        <motion.span>{lowText}</motion.span>
        <span className="mx-3 text-ink/40">–</span>
        <span>$710,000</span>
      </p>
      <p className="type-body-sm mx-auto mt-6 max-w-md text-stone">
        A personalized experience starts with a conversation — your advisor
        refines this with a walk-through.
      </p>
      <Link
        to="/contact"
        className="btn-sweep mt-8 inline-flex items-center gap-2 rounded-full border border-copper px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-copper transition-colors duration-300 hover:text-ink"
      >
        Schedule My Walk-Through
        <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
      </Link>
    </div>
  );
}

function ValuationWidget() {
  const [step, setStep] = useState<WidgetStep>("address");
  const [address, setAddress] = useState("");
  const [focused, setFocused] = useState(false);
  const [beds, setBeds] = useState("4");
  const [baths, setBaths] = useState("2");
  const [condition, setCondition] =
    useState<(typeof CONDITION_OPTIONS)[number]>("Well-kept");

  const suggestions = ADDRESS_SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(address.toLowerCase())
  );

  const fieldCls =
    "w-full border hairline-light bg-white/60 px-4 py-3 text-[0.9rem] font-light text-ink outline-none transition-colors placeholder:text-stone focus:border-copper";

  return (
    <section id="valuation" className="bg-ivory-deep py-24 md:py-32">
      <div className="container-monogram flex flex-col items-center">
        <Reveal>
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-copper" />
            <span className="type-label text-copper">Home Valuation</span>
            <span className="h-px w-10 bg-copper" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="type-display-md mt-6 text-center text-ink">
            Begin With an Honest Valuation.
          </h2>
        </Reveal>

        <Reveal delay={0.2} className="mt-12 w-full max-w-[720px]">
          <div
            className={cn(
              "border hairline-light bg-ivory p-6 transition-shadow duration-700 md:p-10",
              step === "result" && "shadow-lift"
            )}
          >
            <AnimatePresence mode="wait">
              {step === "address" && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <label className="type-label mb-3 block text-stone">
                    Step 01 — Your Address
                  </label>
                  <div className="relative">
                    <MapPin
                      className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-copper"
                      strokeWidth={1.5}
                    />
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onFocus={() => setFocused(true)}
                      onBlur={() =>
                        window.setTimeout(() => setFocused(false), 150)
                      }
                      placeholder="Enter your home's address"
                      className={cn(fieldCls, "pl-11")}
                    />
                    {focused && suggestions.length > 0 && (
                      <ul className="absolute inset-x-0 top-full z-20 border border-t-0 hairline-light bg-ivory shadow-lift">
                        {suggestions.map((s) => (
                          <li key={s}>
                            <button
                              type="button"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => {
                                setAddress(s);
                                setFocused(false);
                              }}
                              className="flex w-full items-center gap-3 px-4 py-3 text-left text-[0.9rem] font-light text-ink transition-colors hover:bg-ivory-deep hover:text-copper"
                            >
                              <MapPin
                                className="h-3.5 w-3.5 shrink-0 text-stone"
                                strokeWidth={1.5}
                              />
                              {s}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <button
                    type="button"
                    disabled={address.trim().length < 5}
                    onClick={() => setStep("details")}
                    className="mt-6 flex w-full items-center justify-center gap-2 bg-copper px-8 py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.24em] text-ink transition-colors duration-300 enabled:hover:bg-copper-bright disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Continue <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </motion.div>
              )}

              {step === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <div className="flex items-center justify-between">
                    <span className="type-label text-stone">
                      Step 02 — The Home Itself
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep("address")}
                      className="type-body-sm text-copper transition-colors hover:text-copper-bright"
                    >
                      ← {address}
                    </button>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="type-label mb-2 block text-stone">
                        Bedrooms
                      </label>
                      <select
                        value={beds}
                        onChange={(e) => setBeds(e.target.value)}
                        className={fieldCls}
                      >
                        {["1", "2", "3", "4", "5", "6+"].map((b) => (
                          <option key={b} value={b}>
                            {b} {b === "1" ? "Bed" : "Beds"}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="type-label mb-2 block text-stone">
                        Bathrooms
                      </label>
                      <select
                        value={baths}
                        onChange={(e) => setBaths(e.target.value)}
                        className={fieldCls}
                      >
                        {["1", "1.5", "2", "2.5", "3", "3.5", "4+"].map(
                          (b) => (
                            <option key={b} value={b}>
                              {b} {b === "1" ? "Bath" : "Baths"}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="type-label mb-3 block text-stone">
                      Condition
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {CONDITION_OPTIONS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCondition(c)}
                          className={cn(
                            "rounded-full border px-6 py-2.5 text-[0.78rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300",
                            condition === c
                              ? "border-copper bg-copper text-ink"
                              : "hairline-light border text-stone hover:border-copper hover:text-copper"
                          )}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep("analyzing")}
                    className="mt-8 flex w-full items-center justify-center gap-2 bg-copper px-8 py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:bg-copper-bright"
                  >
                    Prepare My Valuation
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </motion.div>
              )}

              {step === "analyzing" && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <p className="type-label mb-6 text-stone">
                    Analyzing — {address}
                  </p>
                  <AnalysisState onDone={() => setStep("result")} />
                </motion.div>
              )}

              {step === "result" && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <ResultState />
                  <div className="mt-8 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setAddress("");
                        setStep("address");
                      }}
                      className="type-body-sm text-stone underline-offset-4 transition-colors hover:text-copper hover:underline"
                    >
                      Value a different home
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 3 — The Stewardship Process (pinned horizontal story)       */
/* ------------------------------------------------------------------ */

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Listen",
    body: "We learn what this home has meant — and what the next chapter needs.",
  },
  {
    num: "02",
    title: "Prepare",
    body: "Staging, photography, and pricing shaped by intention, not automation.",
  },
  {
    num: "03",
    title: "Present",
    body: "Your home enters the market with the Monogram mark — presented to the right buyers, not just more buyers.",
  },
  {
    num: "04",
    title: "Steward",
    body: "Negotiation to closing, with Summit Title at the table and your advisor beside you.",
  },
];

/** GSAP-isolated pinned horizontal scroll. Falls back to a vertical stack
 *  on mobile or when reduced motion is preferred. */
function ProcessStory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      const track = root.current!.querySelector<HTMLElement>(
        "[data-process-track]"
      )!;
      const fill = root.current!.querySelector("[data-process-fill]");

      if (reduced || !wide) {
        gsap.set(fill, { scaleX: 1 });
        return;
      }

      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      const horizontal = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Copper progress fill, synced to the same scroll range
      gsap.fromTo(
        fill,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=200%",
            scrub: 0.6,
          },
        }
      );

      // Ghost numerals drift 40px as their panel crosses the viewport
      gsap.utils
        .toArray<HTMLElement>("[data-process-num]")
        .forEach((num) => {
          gsap.fromTo(
            num,
            { x: 0 },
            {
              x: 40,
              ease: "none",
              scrollTrigger: {
                trigger: num,
                containerAnimation: horizontal,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="overflow-hidden bg-ink">
      <div className="flex flex-col justify-center py-28 md:py-32 lg:h-[100dvh] lg:py-0">
        <div className="container-monogram">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-copper" />
            <span className="type-label text-copper">
              The Stewardship Process
            </span>
          </div>
          <h2 className="type-display-md mt-5 max-w-2xl text-ivory">
            Four Movements. One Relationship.
          </h2>
        </div>

        {/* Horizontal track on desktop; vertical stack on mobile */}
        <div
          data-process-track
          className="mt-14 flex flex-col lg:mt-10 lg:w-max lg:flex-row will-change-transform"
        >
          {PROCESS_STEPS.map((s, i) => (
            <article
              key={s.num}
              className="relative border-t hairline-dark px-[clamp(20px,5vw,64px)] py-14 lg:flex lg:h-[52vh] lg:w-[70vw] lg:shrink-0 lg:flex-col lg:justify-center lg:border-t-0 lg:py-0"
            >
              <span
                data-process-num
                aria-hidden
                className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 select-none text-[20vw] font-semibold leading-none text-white/[0.06] lg:block"
              >
                {s.num}
              </span>
              <span className="type-label text-copper lg:hidden">{s.num}</span>
              <h3 className="type-display-md mt-3 text-ivory lg:mt-0">
                {s.title}
              </h3>
              <p className="type-lead mt-5 max-w-md text-ivory/70">{s.body}</p>
              <span className="type-body-sm mt-8 hidden text-stone-dark lg:block">
                {i + 1} of {PROCESS_STEPS.length}
              </span>
            </article>
          ))}
        </div>

        {/* Progress track */}
        <div className="container-monogram mt-12 hidden lg:block">
          <div className="flex items-center justify-between">
            <span className="type-label text-stone-dark">01</span>
            <span className="type-label text-stone-dark">04</span>
          </div>
          <div className="relative mt-3 h-px w-full bg-line-dark">
            <span
              data-process-fill
              className="absolute inset-0 origin-left bg-copper will-change-transform"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 4 — Proof Band (StatsBand + star rating)                    */
/* ------------------------------------------------------------------ */

const SELLER_STATS: StatItem[] = [
  { display: "98.6%", label: "List-to-Sale Price" },
  { display: "19 Days", label: "Avg. on Market" },
  {
    display: "$312M+",
    countTo: 312,
    format: (n) => `$${Math.round(n)}M+`,
    label: "Sold Across the Network",
  },
  { display: "4.9", label: "Client Rating" },
];

const STAR_PATH =
  "M12 2.5l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.52l-5.88 3.09 1.12-6.55L2.48 9.42l6.58-.96L12 2.5z";

/** Five thin copper stars (one half-filled) that draw stroke sequentially. */
function StarRating() {
  return (
    <div className="border-t hairline-dark bg-ink">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        transition={{ staggerChildren: 0.15 }}
        className="container-monogram flex items-center justify-center gap-3 py-8"
        aria-label="4.9 out of 5 stars"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            aria-hidden
          >
            <defs>
              <linearGradient id={`star-half-${i}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stopColor="#B87333" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {i === 4 && (
              <motion.path
                d={STAR_PATH}
                fill={`url(#star-half-${i})`}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { delay: 0.4, duration: 0.3 },
                  },
                }}
              />
            )}
            <motion.path
              d={STAR_PATH}
              stroke="#B87333"
              strokeWidth={1}
              strokeLinejoin="round"
              variants={{
                hidden: { pathLength: 0 },
                visible: { pathLength: 1, transition: { duration: 0.5 } },
              }}
            />
          </svg>
        ))}
      </motion.div>
    </div>
  );
}

function ProofBand() {
  return (
    <section aria-label="Seller proof">
      <StatsBand stats={SELLER_STATS} />
      <StarRating />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 5 — Staging & Presentation (before/after slider)            */
/* ------------------------------------------------------------------ */

const STAGING_BULLETS = [
  "Professional staging consultation",
  "Architectural photography & twilight exteriors",
  "Cinematic walkthrough film",
  "Network-wide Luxe placement for qualifying homes",
];

/** Draggable before/after comparison. "Before" is a desaturated treatment
 *  of the same photograph, revealed left of the divider. */
function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const pos = useMotionValue(58); // percent
  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const handleX = useTransform(pos, (v) => (v / 100) * width);
  const beforeLabelOpacity = useTransform(pos, [10, 30], [0, 1]);
  const afterLabelOpacity = useTransform(pos, [70, 90], [1, 0]);

  useEffect(() => {
    const measure = () =>
      setWidth(containerRef.current?.offsetWidth ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const setFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    pos.set(Math.min(96, Math.max(4, pct)));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFromClientX(e.clientX);
    const move = (ev: PointerEvent) => setFromClientX(ev.clientX);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <div className="relative">
      {/* Corner copper frame accent */}
      <span
        aria-hidden
        className="absolute -left-4 -top-4 z-10 h-16 w-16 border-l border-t border-copper"
      />
      <span
        aria-hidden
        className="absolute -bottom-4 -right-4 z-10 h-16 w-16 border-b border-r border-copper"
      />
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        className="relative aspect-[4/3] cursor-ew-resize touch-none select-none overflow-hidden"
        role="slider"
        aria-label="Before and after staging comparison"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos.get())}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") pos.set(Math.max(4, pos.get() - 4));
          if (e.key === "ArrowRight") pos.set(Math.min(96, pos.get() + 4));
        }}
      >
        {/* After (base) */}
        <img
          src="/sell-staging.jpg"
          alt="Professionally staged living room"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Before (desaturated treatment) */}
        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <img
            src="/sell-staging.jpg"
            alt=""
            aria-hidden
            draggable={false}
            className="h-full w-full object-cover"
            style={{
              filter: "grayscale(0.85) contrast(1.05) brightness(0.92)",
            }}
          />
        </motion.div>

        {/* Labels */}
        <motion.span
          style={{ opacity: beforeLabelOpacity }}
          className="type-label absolute left-4 top-4 bg-ink/70 px-3 py-1.5 text-ivory"
        >
          Before
        </motion.span>
        <motion.span
          style={{ opacity: afterLabelOpacity }}
          className="type-label absolute right-4 top-4 bg-copper px-3 py-1.5 text-ink"
        >
          After
        </motion.span>

        {/* Divider handle */}
        <motion.div
          style={{ x: handleX }}
          className="absolute inset-y-0 left-0 z-10 will-change-transform"
        >
          <span className="absolute inset-y-0 left-0 w-px -translate-x-1/2 bg-copper" />
          <span className="absolute left-0 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-copper bg-ink/80">
            <span className="flex gap-1">
              <span className="h-3 w-px bg-copper" />
              <span className="h-3 w-px bg-copper" />
            </span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function Staging() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="container-monogram grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <BeforeAfterSlider />
        </Reveal>

        <div>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-copper" />
              <span className="type-label text-copper">Presentation</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="type-display-md mt-6 text-ink">
              Staging That Honors the Home
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="type-body mt-5 max-w-lg text-stone">
              Drag the line to see what intention looks like. Every residence we
              represent is prepared to be remembered — not just listed.
            </p>
          </Reveal>
          <ul className="mt-10">
            {STAGING_BULLETS.map((b, i) => (
              <li key={b}>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.08 * i,
                    duration: 0.9,
                    ease: EASE,
                  }}
                  className="block h-px w-full origin-left bg-line-light"
                />
                <Reveal delay={0.08 * i + 0.1} y={16}>
                  <span className="flex items-center gap-4 py-4">
                    <span className="type-label text-copper">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="type-body text-ink">{b}</span>
                  </span>
                </Reveal>
              </li>
            ))}
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
              className="block h-px w-full origin-left bg-line-light"
            />
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 6 — Seller Testimonial                                      */
/* ------------------------------------------------------------------ */

const QUOTE =
  "They sold our home in eleven days — and somehow made it feel like the house was being handed to friends.";

function SellerTestimonial() {
  const words = QUOTE.split(" ");
  return (
    <section className="bg-ink py-28 md:py-40">
      <div className="container-monogram">
        <div className="relative mx-auto max-w-4xl text-center">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-16 left-0 select-none font-serif text-[8rem] leading-none text-copper/20"
          >
            &ldquo;
          </span>
          <motion.blockquote
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            transition={{ staggerChildren: 0.03 }}
            className="type-serif-accent relative text-ivory"
            aria-label={QUOTE}
          >
            {words.map((w, i) => (
              <motion.span
                key={i}
                className="inline-block will-change-[filter,transform]"
                variants={{
                  hidden: { opacity: 0, filter: "blur(6px)", y: 8 },
                  visible: {
                    opacity: 1,
                    filter: "blur(0px)",
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
              >
                {w}
                {i < words.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </motion.blockquote>
          <Reveal delay={0.4} y={16}>
            <p className="mt-8">
              <span className="type-body-sm text-ivory">
                The Kowalski Family
              </span>
              <span className="type-body-sm text-stone-dark"> · Wheaton</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 7 — Final CTA Band                                          */
/* ------------------------------------------------------------------ */

function FinalCta() {
  return (
    <section className="border-t hairline-dark bg-ink py-28 md:py-40">
      <div className="container-monogram text-center">
        <Reveal>
          <h2 className="type-display-md text-ivory">Ready When You Are.</h2>
        </Reveal>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          className="mx-auto mt-8 block h-px w-24 origin-center bg-copper"
        />
        <Reveal delay={0.3}>
          <p className="type-serif-accent mt-8 text-ivory/85">
            No pressure. No scripts. Just guidance.
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollToId("#valuation")}
              className="btn-sweep inline-block rounded-full border border-copper px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-copper transition-colors duration-300 hover:text-ink"
            >
              What's My Home Worth?
            </button>
            <Link
              to="/contact"
              className="inline-block rounded-full border border-white/50 px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
            >
              Talk to an Advisor
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.55}>
          <Link
            to="/contact/real-estate"
            className="inline-block rounded-full border border-copper px-6 py-3 text-[0.78rem] font-medium uppercase tracking-[0.22em] text-copper transition-colors duration-300 hover:bg-copper hover:text-ink"
          >
            Contact Us
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Sell() {
  return (
    <>
      <Hero />
      <ValuationWidget />
      <ProcessStory />
      <ProofBand />
      <Staging />
      <SellerTestimonial />
      <FinalCta />
    </>
  );
}
