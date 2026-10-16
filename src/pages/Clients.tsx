import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Check, ExternalLink } from "lucide-react";
import { brokerage } from "@/brokerages";
import FourSeats from "@/components/FourSeats";
import ThreePillars from "@/components/ThreePillars";
import Reveal, { SplitWords } from "@/components/Reveal";
import EllipseSlider from "@/components/motion/EllipseSlider";
import DuskCard from "@/components/motion/DuskCard";
import { HEADER_H } from "@/components/Navbar";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const CLIENT_SECTIONS = [
  { id: "buying-selling", label: "Buy & Sell" },
  { id: "mortgage", label: "Unity Home Loans" },
  { id: "title", label: "Amicus Title" },
] as const;

function JourneyNav({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (id: string) => void;
}) {
  const reduced = useReducedMotion();
  return (
    <section className="border-t bg-ink py-16 hairline-dark">
      <div className="container-monogram">
        <div className="relative">
          <motion.span
            initial={{ scaleX: reduced ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.9 }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            className="absolute left-0 right-0 top-1/2 h-px origin-left bg-line-dark"
          />
          <div className="relative grid grid-cols-3">
            {CLIENT_SECTIONS.map((item, idx) => {
              const isCurrent = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "group flex flex-col items-center gap-4 py-2",
                    idx === 0 && "items-start",
                    idx === 2 && "items-end"
                  )}
                >
                  <span
                    className={cn(
                      "type-label transition-colors duration-300",
                      isCurrent
                        ? "text-copper-bright"
                        : "text-stone-dark group-hover:text-copper"
                    )}
                  >
                    {item.label}
                  </span>
                  <motion.span
                    initial={{ scale: reduced ? 1 : 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.9 }}
                    transition={{
                      delay: reduced ? 0 : 0.4 + 0.3 * idx,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="relative flex h-6 w-6 items-center justify-center"
                  >
                    <span
                      className={cn(
                        "block h-3 w-3 rotate-45 border transition-all duration-500",
                        isCurrent
                          ? "border-copper-bright bg-copper"
                          : "border-copper bg-ink group-hover:bg-copper/30"
                      )}
                    />
                    {isCurrent && (
                      <motion.span
                        layoutId="client-journey-glow"
                        className="absolute inset-0 rotate-45 border border-copper-bright"
                        style={{
                          boxShadow: "0 0 12px rgba(208,148,84,0.6)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 30,
                        }}
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

function ComfortCalculator() {
  const [monthly, setMonthly] = useState(2800);
  const mv = useMotionValue(2800);
  const spring = useSpring(mv, { stiffness: 120, damping: 24 });
  const [estHome, setEstHome] = useState("$430K");

  useEffect(() => {
    mv.set(monthly);
  }, [monthly, mv]);

  useMotionValueEvent(spring, "change", (val) => {
    const k = (val * 154) / 1000;
    setEstHome(`$${Math.round(k)}K`);
  });

  return (
    <Reveal delay={0.2}>
      <div className="mt-10 border hairline-light bg-white p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="type-label text-stone">Monthly Comfort</span>
          <span className="text-[1.05rem] font-medium text-ink">
            ${monthly.toLocaleString("en-US")}/mo
          </span>
        </div>
        <input
          type="range"
          min={1200}
          max={7000}
          step={50}
          value={monthly}
          onChange={(e) => setMonthly(Number(e.target.value))}
          aria-label="Comfortable monthly payment"
          className="mt-4 w-full accent-copper"
        />
        <div className="mt-4 flex items-baseline justify-between border-t hairline-light pt-4">
          <span className="type-body-sm text-stone">
            Estimated Utah purchasing power
          </span>
          <span className="type-display-md text-copper">≈ {estHome}</span>
        </div>
      </div>
    </Reveal>
  );
}

function FeatureSection({
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
}: {
  id: string;
  tone: "ivory" | "ink";
  image: string;
  imageAlt: string;
  imageSide: "left" | "right";
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  cta: string;
  contactTo: string;
  detailTo?: string;
  externalUrl?: string;
  externalLabel?: string;
  children?: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const dark = tone === "ink";
  const initialClip =
    imageSide === "left"
      ? "inset(0% 100% 0% 0%)"
      : "inset(0% 0% 0% 100%)";

  const imageBlock = (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        variants={{
          hidden: { clipPath: reduced ? "inset(0% 0% 0% 0%)" : initialClip },
          visible: { clipPath: "inset(0% 0% 0% 0%)" },
        }}
        transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
        className="relative aspect-[3/2] overflow-hidden border hairline-dark"
      >
        <DuskCard src={image} alt={imageAlt} />
        {dark && (
          <div className="pointer-events-none absolute inset-0 bg-ink/20" />
        )}
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
            {bullets.map((b, idx) => (
              <Reveal key={b} delay={0.12 + 0.08 * idx} y={16}>
                <div
                  className={cn(
                    "flex items-center gap-4 border-t py-4 last:border-b",
                    dark ? "hairline-dark" : "hairline-light"
                  )}
                >
                  <Check
                    className="h-4 w-4 shrink-0 text-copper"
                    strokeWidth={1.5}
                  />
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
              {detailTo && (
                <Link
                  to={detailTo}
                  className={cn(
                    "nav-link-line type-label transition-colors hover:text-copper",
                    dark ? "text-ivory/80" : "text-ink"
                  )}
                >
                  Learn More
                </Link>
              )}
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
                  <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Clients() {
  const [active, setActive] = useState("buying-selling");

  useEffect(() => {
    const onScroll = () => {
      const threshold = HEADER_H + window.innerHeight * 0.35;
      let cur = "buying-selling";
      for (const item of CLIENT_SECTIONS) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= threshold) {
          cur = item.id;
        }
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -76 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <EllipseSlider
        eyebrow={brokerage.clientsPage.heroEyebrow}
        title={brokerage.clientsPage.heroHeadline}
        lede={brokerage.clientsPage.heroSubheadline}
        slides={[
          {
            image: "/hero-buy.jpg",
            label: "Buy & Sell",
            partner: "KW Success Trusted Advisors",
          },
          {
            image: "/service-mortgage.jpg",
            label: "Mortgage",
            partner: "Unity Home Loans",
          },
          {
            image: "/service-title.jpg",
            label: "Title & Escrow",
            partner: "Amicus Title",
          },
        ]}
      />

      <JourneyNav active={active} onNavigate={scrollTo} />

      {/* Section 1: Buying & Selling with KW Success */}
      <FeatureSection
        id="buying-selling"
        tone="ivory"
        image="/luxe-estate.jpg"
        imageAlt="Northern Utah luxury home at dusk"
        imageSide="left"
        eyebrow="Buying & Selling in Utah"
        title="Local Advisors Across the Wasatch Front"
        body="Whether you are buying your first home in Layton, moving up in Kaysville or Bountiful, or selling an estate in Ogden Valley or Morgan, your KW Success advisor brings local market mastery and a full team to your corner."
        bullets={[
          ...brokerage.clientsPage.buyingSteps.slice(0, 2),
          ...brokerage.clientsPage.sellingSteps.slice(0, 2),
        ]}
        cta="Match With a Utah Advisor"
        contactTo="/contact?intent=Buying"
        detailTo="/areas-served"
        externalUrl={brokerage.search.buyUrl}
        externalLabel="Search Utah MLS"
      />

      <div
        aria-hidden
        className="h-[100px]"
        style={{
          background: "linear-gradient(180deg, #F5F1EA 0%, #121413 100%)",
        }}
      />

      {/* Section 2: Unity Home Loans */}
      <FeatureSection
        id="mortgage"
        tone="ink"
        image="/service-mortgage.jpg"
        imageAlt="Unity Home Loans advisor reviewing financing options"
        imageSide="right"
        eyebrow="In-House Mortgage Partner"
        title="Unity Home Loans"
        body={brokerage.partners.mortgage.body}
        bullets={brokerage.partners.mortgage.highlights}
        cta="Start a Lending Conversation"
        contactTo="/contact/mortgage"
        detailTo="/services/mortgage"
      />

      <div
        aria-hidden
        className="h-[100px]"
        style={{
          background: "linear-gradient(180deg, #121413 0%, #F5F1EA 100%)",
        }}
      />

      {/* Section 3: Amicus Title + Interactive Comfort Calculator */}
      <FeatureSection
        id="title"
        tone="ivory"
        image="/service-title.jpg"
        imageAlt="Fountain pen signing closing documents at Amicus Title"
        imageSide="left"
        eyebrow="In-House Title & Escrow"
        title="Amicus Title"
        body={brokerage.partners.title.body}
        bullets={brokerage.partners.title.highlights}
        cta="Plan a Smooth Closing"
        contactTo="/contact/title"
        detailTo="/services/title"
      >
        <ComfortCalculator />
      </FeatureSection>

      {/* Client Three Pillars */}
      <ThreePillars defaultAudience="clients" allowToggle={false} pinned={false} />

      {/* Everyone at One Table (Dark Mode) */}
      <section className="border-t bg-ink py-28 hairline-dark md:py-40">
        <div className="container-monogram">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-copper" />
              <span className="type-label text-copper">One Relationship</span>
              <span className="h-px w-10 bg-copper" />
            </div>
            <h2 className="type-display-md mt-5 text-ivory">
              <SplitWords text="Everyone at One Table." />
            </h2>
          </div>
          <div className="mt-16">
            <FourSeats tone="dark" />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t bg-black py-28 hairline-dark md:py-36">
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
                Talk to an Advisor →
              </Link>
              <a
                href={brokerage.search.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-10 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-ivory transition-colors duration-300 hover:border-copper hover:text-copper"
              >
                Search Utah Homes
                <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
