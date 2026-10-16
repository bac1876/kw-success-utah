import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ChevronDown, ExternalLink } from "lucide-react";
import { brokerage } from "@/brokerages";
import FourSeats from "@/components/FourSeats";
import ThreePillars from "@/components/ThreePillars";
import { FourPartInfinity, InfinityMark } from "@/components/InfinityMark";
import StatsBand from "@/components/StatsBand";
import Reveal, { SplitWords } from "@/components/Reveal";
import { HEADER_H } from "@/components/Navbar";
import Magnetic from "@/components/motion/Magnetic";
import { introDelay } from "@/components/motion/Preloader";
import Spotlight from "@/components/motion/Spotlight";
import SplitChars from "@/components/motion/SplitChars";
import ScrollWords from "@/components/motion/ScrollWords";
import Parallax from "@/components/motion/Parallax";
import JourneyRail from "@/components/motion/JourneyRail";
import MouseTrail from "@/components/motion/MouseTrail";
import Ticker from "@/components/motion/Ticker";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/* Section 1 — Sticky Curtain Hero + Spotlight                        */
/* ------------------------------------------------------------------ */

function HeroBackground() {
  const root = useRef<HTMLDivElement>(null);
  const wait = introDelay();

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
          {
            clipPath: "inset(0% 0 0% 0)",
            duration: 1.4,
            ease: "power3.inOut",
            delay: wait * 0.6,
          }
        );
        gsap.fromTo(
          img,
          { scale: 1.15 },
          {
            scale: 1,
            duration: 1.4,
            ease: "power3.inOut",
            delay: wait * 0.6,
          }
        );
        gsap.to(img, {
          yPercent: 18,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
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
          src="/hero-home.jpg"
          alt="Luxury Northern Utah residence at dusk along the Wasatch Front"
          className="h-[115%] w-full object-cover will-change-transform"
        />
      </div>
      <div className="overlay-hero absolute inset-0" />
      <Spotlight src="/hero-home.jpg" />
    </div>
  );
}

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const wait = introDelay();
  const { scrollY } = useScroll();
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  const contentY = useTransform(scrollY, [0, vh], [0, -90]);
  const contentOpacity = useTransform(scrollY, [0, vh * 0.75], [1, 0]);
  const shadeOpacity = useTransform(scrollY, [0, vh], [0, 0.55]);

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
      className="sticky top-0 z-0 flex h-[100dvh] flex-col overflow-hidden"
      style={{ marginTop: -HEADER_H }}
    >
      <HeroBackground />
      <motion.div
        style={{ opacity: shadeOpacity }}
        className="pointer-events-none absolute inset-0 z-[15] bg-ink"
      />
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 bg-ink"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: wait * 0.5 }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-[140px] text-center"
      >
        <motion.img
          src={brokerage.brand.logos.reversed}
          alt={brokerage.brand.name}
          className="mt-6 h-[110px] w-auto max-w-full object-contain md:h-[135px]"
          initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.3 + wait, duration: 1.4, ease: EASE }}
        />

        <p className="type-serif-accent mt-6 max-w-3xl text-ivory text-balance">
          <SplitChars
            text={brokerage.hero.headline}
            delay={0.8 + wait}
          />
        </p>

        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.0 + wait, duration: 1.2, ease: EASE }}
          className="mt-8 h-px w-20 origin-left bg-copper"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05 + wait, duration: 0.9, ease: EASE }}
          className="type-lead mt-8 max-w-2xl text-white/85 text-balance"
        >
          {brokerage.hero.subheadline}
        </motion.p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + wait, duration: 0.7, ease: EASE }}
          >
            <Magnetic>
              <Link
                to={brokerage.hero.primaryCta.to}
                className="inline-block rounded-full bg-copper px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-ink transition-colors duration-300 hover:bg-copper-bright"
              >
                {brokerage.hero.primaryCta.label}
              </Link>
            </Magnetic>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 + wait, duration: 0.7, ease: EASE }}
          >
            <Magnetic>
              <Link
                to={brokerage.hero.secondaryCta.to}
                className="inline-block rounded-full border border-white/50 px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
              >
                {brokerage.hero.secondaryCta.label}
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 + wait, duration: 0.8 }}
        className="type-body-sm absolute bottom-8 left-6 z-20 text-stone-dark md:left-10"
      >
        {brokerage.hero.eyebrow}
      </motion.p>

      <motion.button
        type="button"
        aria-label="Scroll to Everyone at One Table"
        onClick={() => scrollTo("#connected")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 + wait, duration: 0.8 }}
        className="absolute bottom-8 right-6 z-20 flex h-14 w-8 flex-col items-center justify-start md:right-10"
      >
        <span className="relative h-12 w-px bg-white/25">
          <span className="animate-scroll-dot absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-copper" />
        </span>
        <ChevronDown
          className="mt-1 h-3.5 w-3.5 text-copper"
          strokeWidth={1.5}
        />
      </motion.button>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 2 — Connected Homeownership ("Everyone at One Table")       */
/* ------------------------------------------------------------------ */

function Connected() {
  return (
    <section id="connected" className="bg-ivory py-24 md:py-32">
      <div className="container-monogram">
        <div className="text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-copper" />
              <span className="type-label text-copper">
                {brokerage.oneTable.eyebrow}
              </span>
              <span className="h-px w-10 bg-copper" />
            </div>
          </Reveal>
          <h2 className="type-display-lg mx-auto mt-8 max-w-4xl text-ink text-balance">
            <SplitWords text={brokerage.oneTable.headline} />
          </h2>
          <Reveal delay={0.25}>
            <p className="type-lead mx-auto mt-10 max-w-3xl text-stone text-balance">
              {brokerage.oneTable.subheadline}
            </p>
          </Reveal>
        </div>

        <div className="mt-20">
          <Reveal>
            <p className="type-serif-accent text-center text-ink/80">
              {brokerage.oneTable.centerLabel}
            </p>
          </Reveal>

          <Parallax distance={-28} className="mt-12">
            <FourSeats tone="light" />
          </Parallax>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 3 — The Thesis (ScrollWords + FourPartInfinity)             */
/* ------------------------------------------------------------------ */

function Thesis() {
  return (
    <section id="thesis" className="border-t hairline-light bg-ivory py-28 md:py-40">
      <div className="container-monogram text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-copper" />
            <span className="type-label text-copper">The KW Success Standard</span>
            <span className="h-px w-10 bg-copper" />
          </div>
        </Reveal>
        <h2 className="type-display-lg mx-auto mt-8 max-w-4xl text-ink text-balance">
          <SplitWords text="A Home Is More Than a Transaction." />
        </h2>
        <ScrollWords
          className="type-lead mx-auto mt-10 max-w-3xl text-stone"
          text="It is a lifelong journey shaped by *trust,* *guidance,* and *relationship.* Since 1997, KW Success has united *real estate,* *mortgage,* and *title* under one roof so Northern Utah families and agents thrive for *the life of the home.*"
        />
        <Reveal delay={0.35}>
          <FourPartInfinity className="mx-auto mt-16" />
        </Reveal>
        <motion.span
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          className="mx-auto mt-12 block h-px w-32 origin-center bg-copper"
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 5 — Our Promise (1997 → ∞ timeline)                        */
/* ------------------------------------------------------------------ */

function PromiseSection() {
  return (
    <section className="sticky top-0 z-0 bg-ink py-28 md:py-40">
      <div className="container-monogram text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-copper" />
            <span className="type-label text-copper">Our Promise</span>
            <span className="h-px w-10 bg-copper" />
          </div>
        </Reveal>
        <h2 className="type-display-lg mx-auto mt-8 max-w-4xl text-ivory text-balance">
          <SplitWords text="The Relationship Is the Product." />
        </h2>
        <Reveal delay={0.25}>
          <p className="type-lead mx-auto mt-10 max-w-3xl text-ivory/70 text-balance">
            Homeownership and career growth should feel personal, trusted, and
            intentionally supported across every market cycle. We don&apos;t
            disappear at the closing table — we stay, one relationship at a
            time.
          </p>
        </Reveal>

        <Reveal delay={0.3} y={24}>
          <div className="mx-auto mt-20 max-w-3xl">
            <div className="flex items-center gap-5">
              <span className="type-label text-copper">1997</span>
              <div className="relative h-px flex-1 bg-line-dark">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.9 }}
                  transition={{ duration: 1.8, ease: EASE }}
                  className="absolute inset-0 origin-left bg-copper"
                />
                <span className="absolute -top-[3px] right-0 h-[7px] w-[7px] rotate-45 bg-copper" />
              </div>
              <InfinityMark className="h-7 text-copper" />
            </div>
            <p className="type-serif-accent mt-10 text-ivory/80">
              Built one relationship at a time across the Wasatch Front.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 7 — Dual Audience Paths + Home Search Strip                 */
/* ------------------------------------------------------------------ */

const SEARCH_TABS = ["Buy", "Sell", "Rent"] as const;

function SearchStrip() {
  const [tab, setTab] = useState<(typeof SEARCH_TABS)[number]>("Buy");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [beds, setBeds] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "Sell") {
      navigate("/contact?intent=Selling");
      return;
    }
    const base =
      tab === "Rent" ? brokerage.search.rentUrl : brokerage.search.buyUrl;
    const params = new URLSearchParams();
    if (location.trim()) params.set("q", location.trim());
    if (price) params.set("max", price);
    if (beds) params.set("beds", beds);
    const url = params.toString() ? `${base}?${params.toString()}` : base;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const fieldCls =
    "w-full border hairline-light bg-white/60 px-4 py-3 text-[0.9rem] font-light text-ink outline-none transition-colors placeholder:text-stone focus:border-copper";

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <div className="border hairline-light bg-ivory shadow-lift">
          <div className="flex border-b hairline-light">
            {SEARCH_TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "relative flex-1 px-6 py-4 text-[0.78rem] font-medium uppercase tracking-[0.3em] transition-colors sm:flex-none sm:px-10",
                  tab === t ? "text-ink" : "text-stone hover:text-copper"
                )}
              >
                {t}
                {tab === t && (
                  <motion.span
                    layoutId="search-tab-underline"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-copper"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 40,
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <form
            onSubmit={submit}
            className="grid gap-4 p-6 md:grid-cols-[1.4fr_1fr_0.8fr_1.1fr] md:items-end md:p-8"
          >
            <div>
              <label className="type-label mb-2 block text-stone">
                Utah Location
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Layton, Kaysville, Ogden, Bountiful, or ZIP"
                className={fieldCls}
              />
            </div>
            <div>
              <label className="type-label mb-2 block text-stone">
                Price Range
              </label>
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={fieldCls}
              >
                <option value="">Any price</option>
                <option value="450000">Up to $450K</option>
                <option value="650000">Up to $650K</option>
                <option value="850000">Up to $850K</option>
                <option value="1200000">Up to $1.2M</option>
                <option value="2000000">Up to $2M+</option>
              </select>
            </div>
            <div>
              <label className="type-label mb-2 block text-stone">Beds</label>
              <select
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className={fieldCls}
              >
                <option value="">Any</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-copper px-8 py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:bg-copper-bright"
            >
              {tab === "Sell" ? (
                <>
                  Request Valuation{" "}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </>
              ) : (
                <>
                  Begin Your Search{" "}
                  <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

function DualAudienceAndSearch() {
  return (
    <section
      id="home-search"
      className="relative z-10 bg-ivory py-24 shadow-[0_-30px_60px_-30px_rgba(0,0,0,.6)] md:py-32"
    >
      <div className="container-monogram">
        {/* Dual Audience Cards: Agents & Clients */}
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal y={30}>
            <div className="flex h-full flex-col justify-between border hairline-light bg-white p-10 md:p-14">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-copper" />
                  <span className="type-label text-copper">
                    {brokerage.agentCta.eyebrow}
                  </span>
                </div>
                <h3 className="type-display-md mt-6 text-ink">
                  {brokerage.agentCta.headline}
                </h3>
                <p className="type-body mt-5 text-stone">
                  {brokerage.agentCta.body}
                </p>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to={brokerage.agentCta.primaryCta.to}
                  className="btn-sweep inline-block rounded-full border border-copper px-8 py-3.5 text-[0.75rem] font-medium uppercase tracking-[0.26em] text-copper transition-colors duration-300 hover:text-ink"
                >
                  {brokerage.agentCta.primaryCta.label}
                </Link>
                <Link
                  to={brokerage.agentCta.secondaryCta.to}
                  className="nav-link-line type-label text-ink transition-colors hover:text-copper"
                >
                  {brokerage.agentCta.secondaryCta.label} →
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} y={30}>
            <div className="flex h-full flex-col justify-between border hairline-dark bg-ink p-10 md:p-14">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-copper" />
                  <span className="type-label text-copper">
                    {brokerage.clientCta.eyebrow}
                  </span>
                </div>
                <h3 className="type-display-md mt-6 text-ivory">
                  {brokerage.clientCta.headline}
                </h3>
                <p className="type-body mt-5 text-stone-dark">
                  {brokerage.clientCta.body}
                </p>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={brokerage.clientCta.primaryCta.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-copper px-8 py-3.5 text-[0.75rem] font-medium uppercase tracking-[0.26em] text-ink transition-colors duration-300 hover:bg-copper-bright"
                >
                  {brokerage.clientCta.primaryCta.label}
                  <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
                <Link
                  to={brokerage.clientCta.secondaryCta.to}
                  className="nav-link-line type-label text-ivory transition-colors hover:text-copper"
                >
                  {brokerage.clientCta.secondaryCta.label} →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Search Strip */}
        <div className="mt-24 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-copper" />
              <span className="type-label text-copper">When You&apos;re Ready</span>
              <span className="h-px w-10 bg-copper" />
            </div>
          </Reveal>
          <h2 className="type-display-lg mx-auto mt-8 max-w-4xl text-ink text-balance">
            <SplitWords text="Guidance for Wherever You Are in the Journey." />
          </h2>
          <Reveal delay={0.25}>
            <p className="type-lead mx-auto mt-8 max-w-2xl text-stone text-balance">
              Whether you&apos;re exploring Northern Utah neighborhoods, buying,
              selling, or planning ahead, your advisor is ready when you are.
            </p>
          </Reveal>
        </div>

        <div className="mt-14">
          <SearchStrip />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 9 — Leadership Preview (Editorial Portrait Grid)            */
/* ------------------------------------------------------------------ */

function LeadershipPreview() {
  const featured = brokerage.leadership.slice(0, 4);

  return (
    <section className="bg-ink py-28 md:py-40">
      <div className="container-monogram">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-copper" />
                <span className="type-label text-copper">
                  Leadership &amp; Stewardship
                </span>
              </div>
            </Reveal>
            <h2 className="type-display-lg mt-6 max-w-2xl text-ivory">
              <SplitWords text="Meet the Leaders Behind the Table." />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <Link
              to="/about#leadership"
              className="btn-sweep inline-flex items-center gap-2 rounded-full border border-copper px-8 py-3.5 text-[0.75rem] font-medium uppercase tracking-[0.26em] text-copper transition-colors duration-300 hover:text-ink"
            >
              Meet All {brokerage.leadership.length} Leaders →
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((leader, idx) => (
            <Reveal key={leader.id} delay={0.08 * idx} y={32}>
              <Link
                to="/about#leadership"
                data-cursor="Meet"
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden border hairline-dark bg-ink-deep">
                  <img
                    src={leader.headshot}
                    alt={leader.name}
                    className="h-full w-full object-cover object-top grayscale-[25%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-3 border border-copper opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>
                <div className="mt-5">
                  <h3 className="text-[1.15rem] font-medium text-ivory transition-colors group-hover:text-copper">
                    {leader.name}
                  </h3>
                  <p className="type-label mt-1.5 text-copper">
                    {leader.role}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 10 — Footer CTA (MouseTrail + Ticker)                       */
/* ------------------------------------------------------------------ */

function FooterCTA() {
  return (
    <MouseTrail
      images={[
        "/interior-a.jpg",
        "/interior-b.jpg",
        "/interior-c.jpg",
        "/interior-d.jpg",
        "/luxe-estate.jpg",
        "/listing-03.jpg",
        "/listing-06.jpg",
        "/listing-09.jpg",
      ]}
      className="relative overflow-hidden bg-black py-28 md:py-36"
    >
      <Ticker word="KW SUCCESS" />
      <div className="container-monogram relative z-10 text-center">
        <Reveal>
          <span className="mx-auto inline-block h-3.5 w-3.5 rotate-45 bg-copper" />
        </Reveal>
        <h2 className="type-display-lg mx-auto mt-10 max-w-4xl text-ivory text-balance">
          <SplitWords text="One Conversation Opens Every Door." />
        </h2>
        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic radius={120}>
              <Link
                to="/contact"
                className="inline-block rounded-full bg-copper px-10 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-ink transition-colors duration-300 hover:bg-copper-bright"
              >
                Start a Conversation
              </Link>
            </Magnetic>
            <Magnetic radius={120}>
              <Link
                to="/areas-served"
                className="inline-block rounded-full border border-white/40 px-10 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-ivory transition-colors duration-300 hover:border-copper hover:text-copper"
              >
                Explore Network Map
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </MouseTrail>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10 shadow-[0_-40px_80px_-30px_rgba(0,0,0,.7)]">
        <Connected />
        <Thesis />
        <ThreePillars defaultAudience="agents" allowToggle pinned />
        <PromiseSection />
        <div className="relative z-10">
          <JourneyRail />
          <DualAudienceAndSearch />
          <StatsBand />
          <LeadershipPreview />
          <FooterCTA />
        </div>
      </div>
    </>
  );
}
