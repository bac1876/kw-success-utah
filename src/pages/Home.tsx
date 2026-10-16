import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import FourSeats from "@/components/FourSeats";
import ThreePillars from "@/components/ThreePillars";
import StatsBand from "@/components/StatsBand";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import SampleChip from "@/components/SampleChip";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/* §5.1 Hero                                                           */
/* ------------------------------------------------------------------ */

function HeroBackground() {
  const root = useRef<HTMLDivElement>(null);
  const { hero } = activeBrokerage.home;

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
          { clipPath: "inset(0% 0 0% 0)", duration: 1.3, ease: "power3.inOut" }
        );
        gsap.fromTo(
          img,
          { scale: 1.12 },
          { scale: 1, duration: 1.3, ease: "power3.inOut" }
        );
        gsap.to(img, {
          yPercent: 18,
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
          src={hero.image}
          alt={hero.imageAlt}
          className="h-[115%] w-full object-cover object-center will-change-transform"
        />
      </div>
      {/* §3.2 Treatment: bright, clear sky with light gradient overlay so text stays readable */}
      <div className="overlay-hero absolute inset-0" />
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
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (!el) return;
    if (window.__lenis)
      window.__lenis.scrollTo(el as HTMLElement, { offset: -HEADER_H });
    else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[96dvh] flex-col overflow-hidden"
      style={{ marginTop: -HEADER_H }}
    >
      <HeroBackground />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-[150px] text-center"
      >
        {/* §5.1 KW Success logo centered (reversed version over the photo) */}
        <motion.img
          src={logos.reversed}
          alt={name}
          className="mt-4 h-16 w-auto max-w-[280px] object-contain drop-shadow-md md:h-20 md:max-w-[340px]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 1.1, ease: EASE }}
        />

        {/* §5.1 Headline: You define Success. The relationship is how we get there. */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9, ease: EASE }}
          className="type-display-lg mt-8 max-w-4xl text-white drop-shadow-sm text-balance"
        >
          {hero.headline}
        </motion.h1>

        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.85, duration: 1.0, ease: EASE }}
          className="mt-7 h-0.5 w-20 origin-center bg-kw-red"
        />

        {/* §5.1 Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.85, ease: EASE }}
          className="type-lead mt-7 max-w-2xl font-normal text-white/95 drop-shadow-sm text-balance"
        >
          {hero.subhead}
        </motion.p>

        {/* §5.1 Buttons (two doors): I'm an Agent -> /agents | I'm Buying or Selling -> /clients */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.65, ease: EASE }}
          >
            <Link
              to={hero.primaryCta.to}
              className="inline-flex items-center gap-2.5 bg-kw-red px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-white shadow-lift transition-colors duration-300 hover:bg-kw-red-bright"
            >
              {hero.primaryCta.label}
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.65, ease: EASE }}
          >
            <Link
              to={hero.secondaryCta.to}
              className="inline-flex items-center gap-2.5 border-2 border-white bg-kw-ink/40 px-8 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-kw-ink"
            >
              {hero.secondaryCta.label}
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* §5.1 Corner caption: Serving Weber, Davis & Morgan Counties */}
      <div className=" absolute bottom-7 left-6 z-20 flex flex-wrap items-center gap-3 md:left-10">
        <p className="text-[0.8rem] font-medium uppercase tracking-[0.18em] text-white/90">
          {hero.cornerCaption}
        </p>
        {hero.isPlaceholderImage && (
          <SampleChip
            label="PLACEHOLDER: Wasatch / Ogden Valley Stock Photo"
            className="border-white/40 bg-kw-ink/70 text-white"
          />
        )}
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        aria-label="Scroll to Everyone at One Table"
        onClick={() => scrollTo("#connected")}
        className="absolute bottom-7 right-6 z-20 flex h-12 w-8 flex-col items-center justify-start md:right-10"
      >
        <span className="relative h-10 w-px bg-white/40">
          <span className="animate-scroll-dot absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-kw-red" />
        </span>
        <ChevronDown className="mt-1 h-4 w-4 text-white" strokeWidth={1.75} />
      </button>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §5.2 "Everyone at One Table"                                        */
/* ------------------------------------------------------------------ */

function EveryoneAtOneTable() {
  const { oneTable } = activeBrokerage.home;

  return (
    <section id="connected" className="bg-snow py-24 md:py-32">
      <div className="container-monogram">
        <div className="text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-4">
              <span className="h-0.5 w-10 bg-kw-red" />
              <span className="type-label text-kw-red">{oneTable.eyebrow}</span>
              <span className="h-0.5 w-10 bg-kw-red" />
            </div>
          </Reveal>

          <h2 className="type-display-lg mx-auto mt-7 max-w-4xl text-kw-ink text-balance">
            <SplitWords text={oneTable.headline} />
          </h2>

          <Reveal delay={0.2}>
            <p className="type-lead mx-auto mt-8 max-w-3xl text-charcoal text-balance">
              {oneTable.body}
            </p>
          </Reveal>
        </div>

        <div className="mt-16">
          <Reveal>
            <p className="type-serif-accent text-center text-kw-ink">
              {oneTable.subhead}
            </p>
          </Reveal>

          <div className="mt-10">
            <FourSeats tone="light" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §5.3 The Success Idea                                               */
/* ------------------------------------------------------------------ */

function TheSuccessIdea() {
  const { successIdea } = activeBrokerage.home;

  return (
    <section id="thesis" className="border-y hairline-light bg-mist py-24 md:py-32">
      <div className="container-monogram">
        <div className="text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-4">
              <span className="h-0.5 w-10 bg-kw-red" />
              <span className="type-label text-kw-red">
                {successIdea.eyebrow}
              </span>
              <span className="h-0.5 w-10 bg-kw-red" />
            </div>
          </Reveal>

          <h2 className="type-display-lg mx-auto mt-7 max-w-4xl text-kw-ink text-balance">
            <SplitWords text={successIdea.headline} />
          </h2>

          <Reveal delay={0.2}>
            <p className="type-lead mx-auto mt-8 max-w-3xl text-charcoal text-balance">
              {successIdea.body}
            </p>
          </Reveal>
        </div>

        {/* Two-column split (new; replaces Monogram's infinity loop) */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <Reveal delay={0.1} y={24}>
            <div className="flex h-full flex-col justify-between border hairline-light bg-white p-8 shadow-sm md:p-12">
              <div>
                <span className="type-label text-kw-red">
                  {successIdea.forAgentsTitle}
                </span>
                <span className="mt-3 block h-0.5 w-12 bg-kw-red" />
                <p className="type-body mt-6 text-charcoal">
                  {successIdea.forAgentsBody}
                </p>
              </div>
              <div className="mt-8 border-t hairline-light pt-5">
                <Link
                  to="/agents"
                  className="type-label inline-flex items-center gap-2 text-kw-ink transition-colors hover:text-kw-red"
                >
                  Explore For Agents
                  <ArrowRight className="h-4 w-4 text-kw-red" />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2} y={24}>
            <div className="flex h-full flex-col justify-between border hairline-light bg-white p-8 shadow-sm md:p-12">
              <div>
                <span className="type-label text-kw-red">
                  {successIdea.forClientsTitle}
                </span>
                <span className="mt-3 block h-0.5 w-12 bg-kw-red" />
                <p className="type-body mt-6 text-charcoal">
                  {successIdea.forClientsBody}
                </p>
              </div>
              <div className="mt-8 border-t hairline-light pt-5">
                <Link
                  to="/clients"
                  className="type-label inline-flex items-center gap-2 text-kw-ink transition-colors hover:text-kw-red"
                >
                  Explore Buy &amp; Sell
                  <ArrowRight className="h-4 w-4 text-kw-red" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* §5.3 Visual: simple line diagram of the chain:
            KW Success invests in agents -> Agents invest in clients -> Everyone builds success by design. */}
        <Reveal delay={0.3}>
          <div className="mx-auto mt-14 max-w-4xl border hairline-light bg-white px-6 py-8 shadow-sm md:px-10">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              {successIdea.chainSteps.map((step, i) => (
                <div
                  key={step}
                  className="flex flex-col items-center gap-4 md:flex-row"
                >
                  <div className="flex items-center gap-3 text-center md:text-left">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-kw-red text-[0.72rem] font-semibold text-white">
                      {i + 1}
                    </span>
                    <span className="text-[0.86rem] font-semibold uppercase tracking-[0.12em] text-kw-ink">
                      {step}
                    </span>
                  </div>
                  {i < successIdea.chainSteps.length - 1 && (
                    <ArrowRight
                      className="h-5 w-5 rotate-90 text-kw-red md:rotate-0"
                      strokeWidth={1.75}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §5.5 Our Promise                                                    */
/* ------------------------------------------------------------------ */

function OurPromise() {
  const { promise } = activeBrokerage.home;

  return (
    <section className="bg-kw-ink py-24 text-white md:py-36">
      <div className="container-monogram text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-4">
            <span className="h-0.5 w-10 bg-kw-red" />
            <span className="type-label text-kw-red-bright">
              {promise.eyebrow}
            </span>
            <span className="h-0.5 w-10 bg-kw-red" />
          </div>
        </Reveal>

        <h2 className="type-display-lg mx-auto mt-7 max-w-4xl text-white text-balance">
          <SplitWords text={promise.headline} />
        </h2>

        <Reveal delay={0.2}>
          <p className="type-lead mx-auto mt-8 max-w-3xl text-white/85 text-balance">
            {promise.body}
          </p>
        </Reveal>

        {/* §5.5 Timeline line: 1997 ———— today | Caption: Nearly three decades of success stories. */}
        <Reveal delay={0.3} y={20}>
          <div className="mx-auto mt-16 max-w-2xl">
            <div className="flex items-center gap-5">
              <span className="type-label text-white">
                {promise.timelineStart}
              </span>
              <div className="relative h-px flex-1 bg-white/20">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 1.6, ease: EASE }}
                  className="absolute inset-0 origin-left bg-kw-red"
                />
                <span className="absolute -top-[3px] right-0 h-[7px] w-[7px] rotate-45 bg-kw-red" />
              </div>
              <span className="type-label text-kw-red-bright">
                {promise.timelineEnd}
              </span>
            </div>
            <p className="type-serif-accent mt-8 text-white/90">
              {promise.timelineCaption}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* §5.7 Home Search                                                    */
/* ------------------------------------------------------------------ */

const TABS = ["Buy", "Sell", "Rent"] as const;

export function HomeSearchBox() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Buy");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [beds, setBeds] = useState("");
  const navigate = useNavigate();
  const { externalLinks } = activeBrokerage;
  const { search } = activeBrokerage.home;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // §5.7 Sell tab: goes to /contact?topic=selling
    if (tab === "Sell") {
      navigate("/contact?topic=selling");
      return;
    }

    // §5.7 v1 behavior: "Begin Your Search" opens current KW Success kw.com search in a new tab
    const url = new URL(externalLinks.searchHomesUrl);
    if (location.trim()) url.searchParams.set("q", location.trim());
    if (price) url.searchParams.set("maxPrice", price);
    if (beds) url.searchParams.set("beds", beds);
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  const fieldCls =
    "w-full border hairline-light bg-snow px-4 py-3 text-[0.92rem] text-kw-ink outline-none transition-colors placeholder:text-kw-gray focus:border-kw-red";

  return (
    <div className="border hairline-light bg-white shadow-lift">
      {/* Buy / Sell / Rent Tabs */}
      <div className="flex border-b hairline-light bg-mist/50">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "relative flex-1 px-6 py-4 text-[0.76rem] font-semibold uppercase tracking-[0.26em] transition-colors sm:flex-none sm:px-10",
              tab === t ? "bg-white text-kw-ink" : "text-kw-gray hover:text-kw-red"
            )}
          >
            {t}
            {tab === t && (
              <motion.span
                layoutId="search-tab-underline"
                className="absolute inset-x-0 bottom-0 h-[2px] bg-kw-red"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
          </button>
        ))}
      </div>

      {tab === "Sell" ? (
        <div className="flex flex-col items-center justify-between gap-6 p-6 sm:flex-row md:p-8">
          <div>
            <p className="text-[1.05rem] font-semibold text-kw-ink">
              Thinking about selling your home in Northern Utah?
            </p>
            <p className="type-body-sm mt-1 text-charcoal">
              Connect with a KW Success Trusted Advisor for a personalized market valuation and selling strategy.
            </p>
          </div>
          <Link
            to="/contact?topic=selling"
            className="inline-flex shrink-0 items-center gap-2 bg-kw-red px-8 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-kw-red-bright"
          >
            Talk to an Advisor <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <form
          onSubmit={submit}
          className="grid gap-4 p-6 md:grid-cols-[1.4fr_1fr_0.8fr_1.1fr] md:items-end md:p-8"
        >
          <div>
            <label className="type-label mb-2 block text-charcoal">
              Location
            </label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Layton, Ogden, Kaysville, Bountiful…"
              className={fieldCls}
            />
          </div>
          <div>
            <label className="type-label mb-2 block text-charcoal">
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
            <label className="type-label mb-2 block text-charcoal">Beds</label>
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
            className="flex items-center justify-center gap-2 bg-kw-red px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-kw-red-bright"
          >
            {search.buttonLabel}
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </form>
      )}
    </div>
  );
}

function HomeSearchSection() {
  const { search } = activeBrokerage.home;

  return (
    <section id="home-search" className="bg-snow py-24 md:py-32">
      <div className="container-monogram">
        <div className="text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-4">
              <span className="h-0.5 w-10 bg-kw-red" />
              <span className="type-label text-kw-red">{search.eyebrow}</span>
              <span className="h-0.5 w-10 bg-kw-red" />
            </div>
          </Reveal>
          <h2 className="type-display-lg mx-auto mt-7 max-w-4xl text-kw-ink text-balance">
            <SplitWords text={search.headline} />
          </h2>
        </div>

        <div className="mt-14">
          <HomeSearchBox />
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
    <section className="border-t hairline-light bg-mist py-24 md:py-32">
      <div className="container-monogram text-center">
        <Reveal>
          <span className="mx-auto block h-0.5 w-16 bg-kw-red" />
        </Reveal>
        <h2 className="type-display-lg mx-auto mt-8 max-w-4xl text-kw-ink text-balance">
          <SplitWords text={closingCta.headline} />
        </h2>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to={closingCta.primaryCta.to}
              className="inline-flex items-center gap-2 bg-kw-red px-9 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-white transition-colors duration-300 hover:bg-kw-red-bright"
            >
              {closingCta.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={closingCta.secondaryCta.to}
              className="inline-flex items-center gap-2 border-2 border-kw-ink bg-white px-9 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-kw-ink transition-colors duration-300 hover:bg-kw-ink hover:text-white"
            >
              {closingCta.secondaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Home Page (§5 section order)                                        */
/* ------------------------------------------------------------------ */

export default function Home() {
  const { flags } = activeBrokerage;

  return (
    <>
      {/* §5.1 Hero */}
      <Hero />
      {/* §5.2 Everyone at One Table */}
      <EveryoneAtOneTable />
      {/* §5.3 The Success Idea */}
      <TheSuccessIdea />
      {/* §5.4 The Three Pillars */}
      <ThreePillars mode="toggle" />
      {/* §5.5 Our Promise */}
      <OurPromise />
      {/* §5.6 Stats band + Best of State badge */}
      <StatsBand />
      {/* §5.7 Home search */}
      <HomeSearchSection />
      {/* §5.8 Testimonials (hidden by flag showTestimonials=false until real) */}
      {flags.showTestimonials && (
        <section className="bg-kw-ink py-28 text-white md:py-40">
          <div className="container-monogram">
            <TestimonialCarousel />
          </div>
        </section>
      )}
      {/* §5.9 Closing CTA */}
      <ClosingCTA />
    </>
  );
}
