import { memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, Network as NetworkIcon } from "lucide-react";
import { InfinityMark } from "@/components/InfinityMark";
import Reveal, { SplitWords } from "@/components/Reveal";
import StatsBand, { type StatItem } from "@/components/StatsBand";
import { HEADER_H } from "@/components/Navbar";
import { offices } from "@/data/network";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/* Section 1 — Hero: generative constellation                          */
/* ------------------------------------------------------------------ */

/** Canvas constellation: 4 nodes + 6 lines, draw-in then ambient drift. */
const ConstellationCanvas = memo(function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Node anchor positions as fractions of canvas size (4 market centers)
    const anchors: [number, number][] = [
      [0.24, 0.36],
      [0.76, 0.3],
      [0.34, 0.74],
      [0.7, 0.7],
    ];
    // All 6 connections between 4 nodes
    const edges: [number, number][] = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3],
      [2, 3],
    ];

    let raf = 0;
    let w = 0;
    let h = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const nodePos = (i: number, t: number) => {
      const [fx, fy] = anchors[i];
      // ambient drift: 10px amplitude, 8s cycle, offset phases
      const phase = (i * Math.PI) / 2;
      const driftX = reduced ? 0 : 10 * Math.sin((t / 8000) * Math.PI * 2 + phase);
      const driftY = reduced ? 0 : 10 * Math.cos((t / 8000) * Math.PI * 2 + phase * 1.3);
      return [fx * w + driftX, fy * h + driftY] as const;
    };

    const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

    const draw = (now: number) => {
      const t = now - start;
      ctx.clearRect(0, 0, w, h);

      const pts = anchors.map((_, i) => nodePos(i, t));

      // Lines: after nodes (last node in at 1.2s), draw 0.8s each staggered
      ctx.lineWidth = 1;
      edges.forEach(([a, b], ei) => {
        const lineStart = 1200 + ei * 160;
        const p = reduced ? 1 : Math.min(Math.max((t - lineStart) / 800, 0), 1);
        if (p <= 0) return;
        const [x1, y1] = pts[a];
        const [x2, y2] = pts[b];
        ctx.strokeStyle = "rgba(184,115,51,0.32)";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + (x2 - x1) * p, y1 + (y2 - y1) * p);
        ctx.stroke();
      });

      // Nodes: draw in sequence 0.4s apart
      pts.forEach(([x, y], i) => {
        const p = reduced ? 1 : easeOut(Math.min(Math.max((t - i * 400) / 600, 0), 1));
        if (p <= 0) return;
        // halo
        ctx.fillStyle = `rgba(184,115,51,${0.12 * p})`;
        ctx.beginPath();
        ctx.arc(x, y, 10 * p, 0, Math.PI * 2);
        ctx.fill();
        // core
        ctx.fillStyle = `rgba(208,148,84,${p})`;
        ctx.beginPath();
        ctx.arc(x, y, 3 * p, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reduced) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
});

function Hero() {
  return (
    <section
      className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden bg-ink"
      style={{ marginTop: -HEADER_H, paddingTop: HEADER_H }}
    >
      <ConstellationCanvas />
      <div className="relative z-10 flex flex-col items-center px-6 py-24 text-center">
        <motion.img
          src="/logo-stacked.svg"
          alt="Monogram Network"
          className="h-[160px] w-auto max-w-full"
          initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.3, duration: 1.4, ease: EASE }}
        />
        <h1 className="type-display-lg mt-10 text-ivory">
          <SplitWords text="One Network. One Mark." stagger={0.06} delay={0.6} />
        </h1>
        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="type-serif-accent mt-6 text-stone-dark"
        >
          Trusted relationships around the life of the home.
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 2 — The Four Market Centers                                 */
/* ------------------------------------------------------------------ */

/** Cards are driven by the shared network data (spec S9/N4). */

function MarketCenters() {
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="container-monogram">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-copper" />
          <span className="type-label text-copper">Our Brokerages</span>
        </div>
        <h2 className="type-display-md mt-5 text-ink">
          <SplitWords text="Four Doors, One Relationship." />
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {offices.map((c, i) => (
            <Reveal key={c.slug} delay={0.12 * i} y={60} className="h-full">
              {/* Equal-height cards: the grid stretches the wrapper, the card fills it, and the footer pins to the bottom */}
              <div className="group relative flex h-full flex-col border hairline-light bg-white transition-shadow duration-500 hover:shadow-lift">
                {/* copper border draw on hover */}
                <span className="pointer-events-none absolute inset-0 z-10 border border-copper opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* City-tinted top band */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src="/aurora-aerial.jpg"
                    alt={`${c.localities} aerial`}
                    className={cn(
                      "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]",
                      c.imgClass
                    )}
                  />
                  <div className="overlay-card absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60" />
                </div>

                <div className="flex flex-1 flex-col p-8">
                  <p className="type-body-sm text-stone">
                    <span className="font-semibold lowercase text-ink">kw</span>{" "}
                    KELLERWILLIAMS.
                  </p>
                  <h3 className="type-display-md mt-3 uppercase tracking-[0.06em] text-ink">
                    {c.name}
                  </h3>
                  <p className="type-body-sm mt-2 text-stone">{c.localities}</p>
                  <p className="type-serif-accent mb-8 mt-5 !text-[1.35rem] text-ink/75">
                    {c.tagline}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t hairline-light pt-6">
                    <Link
                      to={`/offices/${c.slug}`}
                      className="type-label flex items-center gap-2 text-ink transition-colors hover:text-copper"
                    >
                      Visit Office
                      <ArrowUpRight
                        className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        strokeWidth={1.5}
                      />
                    </Link>
                    <span className="h-px w-10 bg-line-light transition-colors duration-500 group-hover:bg-copper" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 3 — The Umbrella Story                                      */
/* ------------------------------------------------------------------ */

const umbrellaRows = [
  {
    icon: BadgeCheck,
    title: "Shared Stewardship",
    note: "One standard of care across four centers.",
  },
  {
    icon: NetworkIcon,
    title: "Trusted Access",
    note: "Network-wide reach, off-market insight.",
  },
  {
    /* The infinity mark — shared with the homepage timeline (spec N6) */
    icon: (props: { className?: string; strokeWidth?: number }) => (
      <InfinityMark className={cn("h-4 text-copper", props.className)} strokeWidth={4} />
    ),
    title: "Continuity",
    note: "Your relationship transfers wherever life moves you.",
  },
];

function UmbrellaStory() {
  return (
    <section className="bg-ink py-28 md:py-40">
      <div className="container-monogram">
        <div className="mx-auto max-w-[720px]">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-copper" />
            <span className="type-label text-copper">Why Monogram</span>
          </div>
          <h2 className="type-display-md mt-5 text-ivory">
            <SplitWords text="One Roof Over Everything." />
          </h2>
          <Reveal delay={0.15}>
            <p className="type-body mt-6 text-stone-dark">
              Each market center keeps its local soul. Monogram Network is what
              connects them — shared standards of stewardship, affiliated
              services under one umbrella, and a promise that follows you from
              your first home to your forever home.
            </p>
          </Reveal>

          <div className="mt-12">
            {umbrellaRows.map((row, i) => (
              <Reveal key={row.title} delay={0.1 * i} y={24}>
                <div className="flex items-center gap-6 border-t hairline-dark py-6 last:border-b">
                  <row.icon className="h-5 w-5 shrink-0 text-copper" strokeWidth={1.25} />
                  <div className="flex flex-wrap items-baseline gap-x-4">
                    <span className="text-[1.05rem] font-medium uppercase tracking-[0.14em] text-ivory">
                      {row.title}
                    </span>
                    <span className="type-body-sm text-stone-dark">{row.note}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 4 — Agent Resources                                         */
/* ------------------------------------------------------------------ */

const portals = [
  "KW Innovate Agent Portal",
  "KW Experience Agent Portal",
  "KW Premiere Agent Portal",
  "KW Infinity Agent Portal",
];

function AgentResources() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="container-monogram grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left: portals */}
        <div>
          <h2 className="type-display-md text-ink">
            <SplitWords text="For Our Agents." />
          </h2>
          <Reveal delay={0.1}>
            <p className="type-body mt-5 max-w-md text-stone">
              One agent portal per market center — training, marketing, and the
              tools to serve relationships, not transactions.
            </p>
          </Reveal>
          <div className="mt-10">
            {portals.map((p, i) => (
              <motion.a
                key={p}
                href="#"
                onClick={(e) => e.preventDefault()}
                initial={reduced ? false : { opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.07 * i, duration: 0.6, ease: EASE }}
                className="group flex items-center justify-between border-t hairline-light py-5 last:border-b"
              >
                <span className="text-[0.95rem] font-light text-ink transition-colors group-hover:text-copper">
                  {p}
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-copper transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right: recruiting card */}
        <Reveal delay={0.15} y={40} className="lg:pt-16">
          <div className="relative bg-ivory-deep p-10 md:p-12">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.2, ease: EASE }}
              className="absolute inset-x-0 top-0 h-[2px] origin-left bg-copper"
            />
            <p className="type-label text-copper">Careers</p>
            <h3 className="type-display-md mt-4 text-ink">
              Build Your Practice Here.
            </h3>
            <p className="type-body-sm mt-4 max-w-sm text-stone">
              Grow with a network that believes the relationship is the product.
            </p>
            <Link
              to="/careers"
              className="btn-sweep mt-8 inline-flex items-center gap-2 rounded-full border border-copper px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-copper transition-colors duration-300 hover:text-ink"
            >
              Explore Careers at Monogram
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Section 5 — Network Stats                                           */
/* ------------------------------------------------------------------ */

const networkStats: StatItem[] = [
  // Spec N3: 7 locations · 700+ agents; communities-served removed.
  { display: "7+", countTo: 7, label: "Locations" },
  { display: "700+", countTo: 700, label: "Network Agents" },
  { display: "$20B+", countTo: 20, label: "Combined Volume" },
];

/* ------------------------------------------------------------------ */
/* Section 6 — CTA Band                                                */
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
        <h2 className="type-display-md mt-8 max-w-3xl text-ivory">
          <SplitWords text="Wherever You Are, the Mark Travels With You." />
        </h2>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              to="/buy"
              className="btn-sweep inline-block rounded-full border border-copper px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-copper transition-colors duration-300 hover:text-ink"
            >
              Find a Home
            </Link>
            <Link
              to="/contact"
              className="inline-block rounded-full border border-white/40 px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
            >
              Contact the Network
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export default function KwOffices() {
  return (
    <>
      <Hero />
      <MarketCenters />
      <UmbrellaStory />
      <AgentResources />
      <StatsBand stats={networkStats} />
      <CtaBand />
    </>
  );
}
