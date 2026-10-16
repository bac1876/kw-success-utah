import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { brokerage } from "@/brokerages";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ThreePillars({
  defaultAudience = "agents",
  allowToggle = true,
  pinned = true,
  className,
}: {
  defaultAudience?: "agents" | "clients";
  allowToggle?: boolean;
  pinned?: boolean;
  className?: string;
}) {
  const [audience, setAudience] = useState<"agents" | "clients">(
    defaultAudience
  );
  const rootRef = useRef<HTMLElement>(null);
  const items =
    audience === "agents"
      ? brokerage.pillars.forAgents
      : brokerage.pillars.forClients;

  useGSAP(
    () => {
      if (!pinned) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const wide = window.matchMedia("(min-width: 1024px)").matches;
      const blocks = gsap.utils.toArray<HTMLElement>("[data-story-block]");
      const numerals = gsap.utils.toArray<HTMLElement>("[data-story-num]");
      const rules = gsap.utils.toArray<HTMLElement>("[data-story-rule]");
      const img = rootRef.current?.querySelector("[data-story-img]");

      if (reduced || !wide || blocks.length < 3) {
        gsap.set(blocks, { opacity: 1 });
        gsap.set(rules, { scaleX: 1 });
        return;
      }

      gsap.set(blocks, { opacity: (i: number) => (i === 0 ? 1 : 0.3) });
      gsap.set(rules, { scaleX: 0, transformOrigin: "left" });
      gsap.set(numerals, { color: "#A9A49A" });
      gsap.set(numerals[0], { color: "#B87333" });
      gsap.set(rules[0], { scaleX: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: 0.6,
        },
      });

      tl.to(blocks[0], { opacity: 0.3, duration: 1 }, 1)
        .to(numerals[0], { color: "#A9A49A", duration: 1 }, 1)
        .to(blocks[1], { opacity: 1, duration: 1 }, 1)
        .to(numerals[1], { color: "#B87333", duration: 1 }, 1)
        .fromTo(rules[1], { scaleX: 0 }, { scaleX: 1, duration: 1 }, 1)
        .to(blocks[1], { opacity: 0.3, duration: 1 }, 2.2)
        .to(numerals[1], { color: "#A9A49A", duration: 1 }, 2.2)
        .to(blocks[2], { opacity: 1, duration: 1 }, 2.2)
        .to(numerals[2], { color: "#B87333", duration: 1 }, 2.2)
        .fromTo(rules[2], { scaleX: 0 }, { scaleX: 1, duration: 1 }, 2.2);

      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    },
    { scope: rootRef, dependencies: [audience, pinned] }
  );

  return (
    <section
      id="pillars"
      ref={rootRef}
      className={cn("overflow-hidden bg-ink", className)}
    >
      <div className="container-monogram grid gap-16 py-28 md:py-40 lg:grid-cols-2">
        {/* Left column */}
        <div className="lg:self-start">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-copper" />
            <span className="type-label text-copper">
              {brokerage.pillars.eyebrow}
            </span>
          </div>
          <h2 className="type-display-lg mt-6 text-ivory">
            {brokerage.pillars.headline}
          </h2>
          <p className="type-body mt-8 max-w-md text-ivory/70">
            {brokerage.pillars.subheadline}
          </p>

          {/* Audience Toggle */}
          {allowToggle && (
            <div className="mt-8 inline-flex border hairline-dark bg-ink-deep p-1">
              <button
                type="button"
                onClick={() => setAudience("agents")}
                className={cn(
                  "px-6 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.26em] transition-colors duration-300",
                  audience === "agents"
                    ? "bg-copper text-ink"
                    : "text-stone-dark hover:text-ivory"
                )}
              >
                For Agents
              </button>
              <button
                type="button"
                onClick={() => setAudience("clients")}
                className={cn(
                  "px-6 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.26em] transition-colors duration-300",
                  audience === "clients"
                    ? "bg-copper text-ink"
                    : "text-stone-dark hover:text-ivory"
                )}
              >
                For Clients
              </button>
            </div>
          )}

          {/* Framed Wasatch Three-Peaks Emblem */}
          <div className="mt-12 hidden w-64 lg:block">
            <div className="relative flex aspect-[4/5] w-full flex-col items-center justify-center border border-copper/30 bg-ink-deep p-6 text-center">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-4 border border-copper/15"
              />
              <svg
                data-story-img
                viewBox="0 0 200 160"
                className="h-28 w-28 will-change-transform"
                aria-label="Three Wasatch Peaks — Trust, Guidance, Relationship"
              >
                <path
                  d="M18 132 L58 68 L94 132 Z"
                  fill="rgba(184, 115, 51, 0.25)"
                  stroke="#B87333"
                  strokeWidth="2"
                />
                <path
                  d="M66 132 L100 36 L134 132 Z"
                  fill="rgba(184, 115, 51, 0.45)"
                  stroke="#D09454"
                  strokeWidth="2"
                />
                <path
                  d="M106 132 L142 68 L182 132 Z"
                  fill="rgba(184, 115, 51, 0.25)"
                  stroke="#B87333"
                  strokeWidth="2"
                />
              </svg>
              <span className="mt-4 text-[0.6rem] uppercase tracking-[0.3em] text-stone-dark">
                {audience === "agents"
                  ? "Agent Pillar Framework"
                  : "Client Pillar Framework"}
              </span>
            </div>
          </div>
        </div>

        {/* Right column: sequential I / II / III blocks */}
        <div className="flex flex-col justify-center gap-16 lg:min-h-[60vh]">
          {items.map((item) => (
            <div
              key={`${audience}-${item.numeral}`}
              data-story-block
              className="will-change-[opacity]"
            >
              <div className="flex items-baseline gap-6">
                <span
                  data-story-num
                  className="type-display-md text-copper"
                >
                  {item.numeral}
                </span>
                <h3 className="type-display-md text-ivory">{item.title}</h3>
              </div>
              <span
                data-story-rule
                className="mt-4 block h-px w-24 bg-copper"
              />
              <p className="type-lead mt-6 max-w-lg text-ivory/75">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
