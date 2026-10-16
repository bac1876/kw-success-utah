import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Award,
  Compass,
  Handshake,
  HeartHandshake,
  Layers,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { brokerage } from "@/brokerages";
import Reveal, { SplitWords } from "@/components/Reveal";
import SampleChip from "@/components/SampleChip";
import { HEADER_H } from "@/components/Navbar";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function AboutHeroBackground() {
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
          yPercent: 20,
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
          src="/hero-about.jpg"
          alt="KW Success advisors and Northern Utah homeowners"
          className="h-[115%] w-full object-cover will-change-transform"
        />
      </div>
      <div className="overlay-hero absolute inset-0" />
    </div>
  );
}

function TypewriterLine({ text, delay }: { text: string; delay: number }) {
  const pRef = useRef<HTMLParagraphElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const measure = () => setWidth(pRef.current?.offsetWidth ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <span className="relative inline-block">
      <motion.p
        ref={pRef}
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ delay, duration: 1.4, ease: "linear" }}
        className="type-serif-accent text-ivory/90"
      >
        {text}
      </motion.p>
      {width > 0 && (
        <motion.span
          aria-hidden
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: width, opacity: [1, 1, 0] }}
          transition={{
            x: { delay, duration: 1.4, ease: "linear" },
            opacity: { delay, duration: 1.4, times: [0, 0.92, 1] },
          }}
          className="absolute left-0 top-1/2 h-[1.2em] w-px -translate-y-1/2 bg-copper"
        />
      )}
    </span>
  );
}

const SIX_MARKS = [
  {
    icon: ShieldCheck,
    title: "Win-Win or No Deal",
    body: "Integrity and transparency in every Northern Utah transaction — putting people ahead of commissions.",
  },
  {
    icon: Compass,
    title: "Long-Term Guidance",
    body: "We walk beside our clients and agents across decades of market cycles, not just closing day.",
  },
  {
    icon: Handshake,
    title: "Everyone at One Table",
    body: "Real estate, Unity Home Loans, and Amicus Title working together in one coordinated experience.",
  },
  {
    icon: Sparkles,
    title: "Training & Mastery",
    body: "Hands-on mentorship, masterminds, and business coaching that turn ambitious agents into business owners.",
  },
  {
    icon: HeartHandshake,
    title: "Culture of Care",
    body: "God, Family, then Business — a Market Center community that shows up for one another and for Utah.",
  },
  {
    icon: Layers,
    title: "Local Wasatch Expertise",
    body: "Deep neighborhood roots across Davis, Weber, and Morgan Counties since 1997.",
  },
];

const TIMELINE_EVENTS = [
  {
    year: "1997",
    body: "Marcus & Jenifer Arbuckle found the brokerage in Northern Utah with a vision for agent-first, relationship-driven real estate.",
  },
  {
    year: "Layton",
    body: "KW Success anchors its flagship Market Center at 1572 Woodland Park Drive, serving Davis, Weber, and Morgan Counties.",
  },
  {
    year: "20,000+",
    body: "More than 20,000 Utah families and individuals guided home across the Wasatch Front.",
  },
  {
    year: "$6B+",
    body: "Surpasses $6 billion in closed real estate volume through collaborative coaching and market leadership.",
  },
  {
    year: "Unity & Amicus",
    body: "Unity Home Loans and Amicus Title join the family of companies — bringing lending and escrow to the same table.",
  },
  {
    year: "8 of 9",
    body: "Recognized 8 out of 9 years with Utah Best of State honors inside the Keller Williams Utah Region.",
  },
];

const PEAK_PATHS = [
  "M22 152 L62 84 L96 152 Z",
  "M70 152 L100 48 L130 152 Z",
  "M104 152 L138 84 L178 152 Z",
];

const PEAK_DOTS = [
  { left: "31%", top: "42%" },
  { left: "50%", top: "24%" },
  { left: "69%", top: "42%" },
];

function BrandTimeline() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const line = root.current!.querySelector("[data-timeline-line]");
      const blocks = gsap.utils.toArray<HTMLElement>("[data-timeline-block]");
      const years = gsap.utils.toArray<HTMLElement>("[data-timeline-year]");

      if (reduced) {
        gsap.set(line, { scaleY: 1 });
        gsap.set(blocks, { opacity: 1, y: 0 });
        gsap.set(years, { color: "#B87333" });
        return;
      }

      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: root.current!.querySelector("[data-timeline-body]"),
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );

      blocks.forEach((b, idx) => {
        gsap.fromTo(
          b,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: b, start: "top 65%" },
          }
        );
        gsap.fromTo(
          years[idx],
          { color: "#8A857C", scale: 0.94 },
          {
            color: "#B87333",
            scale: 1,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: { trigger: b, start: "top 65%" },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="border-t hairline-dark bg-ink py-28 md:py-40">
      <div className="container-monogram">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-copper" />
            <span className="type-label text-copper">Our Heritage</span>
            <span className="h-px w-10 bg-copper" />
          </div>
          <h2 className="type-display-md mx-auto mt-6 max-w-2xl text-ivory">
            Built One Relationship at a Time Since 1997.
          </h2>
        </div>

        <div data-timeline-body className="relative mt-20">
          <span
            data-timeline-line
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-copper will-change-transform md:block"
          />
          {TIMELINE_EVENTS.map((item, idx) => (
            <div
              key={item.year}
              data-timeline-block
              className="relative flex flex-col py-10 will-change-transform md:grid md:min-h-[34vh] md:grid-cols-2 md:items-center md:gap-24 md:py-0"
            >
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-copper bg-ink md:block"
              />
              <div
                className={cn(
                  "md:text-right",
                  idx % 2 === 0 ? "md:order-1" : "md:order-2"
                )}
              >
                <span
                  data-timeline-year
                  className="type-stat inline-block text-stone will-change-transform"
                >
                  {item.year}
                </span>
              </div>
              <div className={cn(idx % 2 === 0 ? "md:order-2" : "md:order-1")}>
                <p className="type-body mt-4 max-w-md text-ivory/75 md:mt-0">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InteractivePeaks() {
  const [activePeak, setActivePeak] = useState(0);
  const pillars = brokerage.pillars.forClients;

  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="container-monogram grid gap-16 lg:grid-cols-2">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="relative mx-auto w-[280px] md:w-[320px]">
            <motion.svg
              viewBox="0 0 200 200"
              className="h-auto w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              aria-label="Three Wasatch peaks"
            >
              {PEAK_PATHS.map((d, idx) => (
                <motion.path
                  key={d}
                  d={d}
                  fill="#B87333"
                  stroke="#B87333"
                  strokeWidth={2}
                  custom={idx}
                  variants={{
                    hidden: { pathLength: 0, fillOpacity: 0 },
                    visible: (i: number) => ({
                      pathLength: 1,
                      fillOpacity: activePeak === i ? 0.95 : 0.45,
                      transition: {
                        pathLength: {
                          delay: 0.3 * i,
                          duration: 0.5,
                          ease: "easeInOut",
                        },
                        fillOpacity: { duration: 0.4 },
                      },
                    }),
                  }}
                />
              ))}
            </motion.svg>

            {PEAK_DOTS.map((pos, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Peak ${pillars[idx].numeral} — ${pillars[idx].title}`}
                aria-pressed={activePeak === idx}
                onMouseEnter={() => setActivePeak(idx)}
                onFocus={() => setActivePeak(idx)}
                onClick={() => setActivePeak(idx)}
                style={pos}
                className="group absolute -translate-x-1/2 -translate-y-1/2 p-2"
              >
                <span
                  className={cn(
                    "block h-3 w-3 rounded-full border transition-colors duration-300",
                    activePeak === idx
                      ? "border-copper bg-copper"
                      : "border-copper bg-ivory group-hover:bg-copper/40"
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-full border border-copper transition-all duration-500",
                    activePeak === idx
                      ? "scale-[1.9] opacity-100"
                      : "scale-100 opacity-0"
                  )}
                />
              </button>
            ))}
          </div>
          <p className="type-body-sm mt-6 text-center text-stone">
            Explore the three Wasatch peaks
          </p>
        </div>

        <div>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-copper" />
              <span className="type-label text-copper"> Our Origin Story</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="type-display-md mt-6 text-ink">
              {brokerage.about.originHeadline}
            </h2>
          </Reveal>
          {brokerage.about.originBody.map((para, idx) => (
            <Reveal key={idx} delay={0.15 + idx * 0.08}>
              <p className="type-body mt-5 max-w-xl text-stone">{para}</p>
            </Reveal>
          ))}

          <div className="mt-12 flex flex-col">
            {pillars.map((p, idx) => (
              <button
                key={p.numeral}
                type="button"
                onMouseEnter={() => setActivePeak(idx)}
                onFocus={() => setActivePeak(idx)}
                onClick={() => setActivePeak(idx)}
                className={cn(
                  "border-t hairline-light py-6 text-left transition-all duration-500 last:border-b",
                  activePeak === idx
                    ? "-translate-y-1 opacity-100"
                    : "translate-y-0 opacity-45"
                )}
              >
                <span className="flex items-baseline gap-5">
                  <span
                    className={cn(
                      "type-display-md transition-colors duration-500",
                      activePeak === idx ? "text-copper" : "text-stone"
                    )}
                  >
                    {p.numeral}
                  </span>
                  <span className="type-display-md text-ink">
                    Peak {p.numeral} — {p.title}
                  </span>
                </span>
                <span className="type-body mt-3 block max-w-lg text-stone">
                  {p.body}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  const { office } = brokerage;

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-[55dvh] flex-col overflow-hidden"
        style={{ marginTop: -HEADER_H }}
      >
        <AboutHeroBackground />
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-[160px] text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-10 bg-copper" />
            <span className="type-label text-copper">
              {brokerage.about.heroEyebrow}
            </span>
            <span className="h-px w-10 bg-copper" />
          </motion.div>
          <h1 className="type-display-lg mt-8 max-w-4xl text-ivory text-balance">
            <SplitWords
              text={brokerage.about.heroHeadline}
              stagger={0.05}
              delay={0.4}
            />
          </h1>
          <div className="mt-6 max-w-3xl">
            <TypewriterLine
              text="— serving Northern Utah families and real estate professionals since 1997."
              delay={1.4}
            />
          </div>
        </div>
      </section>

      {/* Six Marks of the KW Success Way */}
      <section className="bg-ink py-28 md:py-40">
        <div className="container-monogram">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-copper" />
              <span className="type-label text-copper">
                {brokerage.about.valuesHeadline}
              </span>
              <span className="h-px w-10 bg-copper" />
            </div>
            <h2 className="type-display-md mx-auto mt-6 max-w-2xl text-ivory">
              Six Marks of the KW Success Way.
            </h2>
          </div>

          <div className="mt-16 border hairline-dark bg-line-dark sm:grid sm:grid-cols-2 sm:gap-px lg:grid-cols-3">
            {SIX_MARKS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.08 * idx, duration: 0.7, ease: EASE }}
                className="group bg-ink p-8 transition-colors duration-500 hover:bg-copper/[0.04] md:p-10"
              >
                <item.icon
                  className="h-7 w-7 text-copper transition-transform duration-500 group-hover:rotate-[8deg]"
                  strokeWidth={1}
                />
                <h3 className="type-label mt-6 text-stone-dark transition-colors duration-500 group-hover:text-ivory">
                  {item.title}
                </h3>
                <p className="type-body-sm mt-4 text-stone-dark">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Three Peaks + Origin Story */}
      <InteractivePeaks />

      {/* Brand DNA Vertical Timeline */}
      <BrandTimeline />

      {/* Full 9-Member Leadership Team Grid */}
      <section id="leadership" className="scroll-mt-24 bg-ivory py-24 md:py-32">
        <div className="container-monogram">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-copper" />
              <span className="type-label text-copper">Leadership Team</span>
            </div>
          </Reveal>
          <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="type-display-lg max-w-3xl text-ink">
              <SplitWords text="Experienced Leaders In Your Corner." />
            </h2>
            <p className="type-body max-w-md text-stone">
              Decades of Northern Utah real estate, coaching, compliance, and
              operational leadership dedicated to our agents and clients.
            </p>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {brokerage.leadership.map((person, idx) => (
              <Reveal key={person.id} delay={0.05 * idx} y={28}>
                <article
                  data-cursor="Meet"
                  className="group flex h-full flex-col border hairline-light bg-white transition-colors duration-500 hover:border-copper"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                    <img
                      src={person.headshot}
                      alt={person.name}
                      className="h-full w-full object-cover object-top grayscale-[20%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      loading="lazy"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-3 border border-copper opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-8">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="type-display-md !text-[1.45rem] text-ink">
                          {person.name}
                        </h3>
                        {person.bioPlaceholder && (
                          <SampleChip label="Bio Pending" />
                        )}
                      </div>
                      <p className="type-label mt-2 text-copper">
                        {person.role}
                      </p>

                      <div className="mt-6 space-y-3">
                        {person.bio.map((paragraph, pIdx) => (
                          <p
                            key={pIdx}
                            className="type-body-sm leading-relaxed text-stone"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    {(person.email || person.phone) && (
                      <div className="mt-6 flex flex-wrap items-center gap-4 border-t hairline-light pt-4 text-[0.8rem] text-stone">
                        {person.email && (
                          <a
                            href={`mailto:${person.email}`}
                            className="inline-flex items-center gap-1.5 transition-colors hover:text-copper"
                          >
                            <Mail className="h-3.5 w-3.5 text-copper" />
                            {person.email}
                          </a>
                        )}
                        {person.phone && (
                          <a
                            href={`tel:${person.phone.replace(/[^0-9]/g, "")}`}
                            className="inline-flex items-center gap-1.5 transition-colors hover:text-copper"
                          >
                            <Phone className="h-3.5 w-3.5 text-copper" />
                            {person.phone}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition & Layton Market Center */}
      <section
        id="market-center"
        className="border-t hairline-dark bg-ink py-24 md:py-32"
      >
        <div className="container-monogram grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-copper" />
                <span className="type-label text-copper">
                  Our Market Center
                </span>
              </div>
            </Reveal>
            <h2 className="type-display-md mt-6 text-ivory">
              <SplitWords text="Anchored in Layton. Serving the Wasatch Front." />
            </h2>
            <Reveal delay={0.15}>
              <div className="mt-8 space-y-4 border hairline-dark bg-ink-deep p-8">
                <p className="flex items-start gap-3 text-ivory">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-copper" />
                  <span>
                    <strong className="block font-medium">{office.name}</strong>
                    <span className="text-stone-dark">
                      {office.street}, {office.city}, {office.state}{" "}
                      {office.zip}
                    </span>
                  </span>
                </p>
                <p className="flex items-center gap-3 text-ivory">
                  <Phone className="h-5 w-5 shrink-0 text-copper" />
                  <a
                    href={`tel:${office.phone.replace(/[^0-9]/g, "")}`}
                    className="transition-colors hover:text-copper"
                  >
                    {office.phone}
                  </a>
                  {office.phonePlaceholder && (
                    <SampleChip label="Marcus to confirm" />
                  )}
                </p>
                <p className="flex items-center gap-3 text-stone-dark">
                  <Award className="h-5 w-5 shrink-0 text-copper" />
                  <span>
                    Hours: {office.hours}{" "}
                    {office.hoursPlaceholder && (
                      <SampleChip label="Placeholder" className="ml-1" />
                    )}
                  </span>
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="overflow-hidden border hairline-dark bg-ink-deep">
              <iframe
                title="KW Success Layton Market Center Map"
                src={office.googleMapsEmbedUrl}
                className="h-[380px] w-full border-0 grayscale contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-black py-28 md:py-36">
        <div className="container-monogram relative text-center">
          <Reveal>
            <h2 className="type-display-md text-ivory">
              Become Part of the Story.
            </h2>
          </Reveal>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
            className="mx-auto mt-8 block h-px w-24 origin-center bg-copper"
          />
          <Reveal delay={0.3}>
            <p className="type-body mx-auto mt-8 max-w-lg text-ivory/70">
              Whether you&apos;re finding your next home or building your real
              estate career, the relationship starts the same way — with a
              conversation.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="btn-sweep inline-block rounded-full border border-copper px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-copper transition-colors duration-300 hover:text-ink"
              >
                Talk to an Advisor
              </Link>
              <Link
                to="/agents"
                className="inline-flex items-center gap-2 rounded-full border border-white/50 px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
              >
                Join KW Success
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
