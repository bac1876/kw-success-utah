import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Award } from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import type { StatEntry } from "@/brokerages/types";
import SampleChip from "@/components/SampleChip";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type StatItem = StatEntry;

export const defaultStats: StatItem[] = activeBrokerage.home.stats;

interface StatsBandProps {
  stats?: StatItem[];
  showBestOfState?: boolean;
  className?: string;
}

export default function StatsBand({
  stats = defaultStats,
  showBestOfState = true,
  className,
}: StatsBandProps) {
  const root = useRef<HTMLDivElement>(null);
  const { disclosures } = activeBrokerage;

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const dividers = gsap.utils.toArray<HTMLElement>("[data-stat-divider]");
      if (reduced) {
        gsap.set(dividers, { scaleY: 1 });
        return;
      }

      gsap.fromTo(
        dividers,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          duration: 1.1,
          ease: "power3.inOut",
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-stat-numeral]").forEach((el) => {
        const raw = el.dataset.countTo;
        if (!raw) return;
        const target = Number(raw);
        if (!Number.isFinite(target)) return;
        const fmt = (n: number) => `${Math.round(n).toLocaleString("en-US")}+`;
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
          onUpdate: () => {
            el.textContent = fmt(state.v);
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className={cn("border-y hairline-light bg-mist", className)}
    >
      <div
        className={cn(
          "container-monogram grid grid-cols-1 divide-y hairline-light md:grid-cols-3 md:divide-y-0",
          stats.length === 2 && "md:grid-cols-2",
          stats.length === 4 && "md:grid-cols-4"
        )}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="relative flex flex-col items-center justify-center gap-3 px-6 py-14 text-center md:py-20"
          >
            {i > 0 && (
              <span
                data-stat-divider
                className="absolute left-0 top-1/2 hidden h-20 w-px -translate-y-1/2 bg-line-light md:block"
              />
            )}
            <span
              data-stat-numeral
              data-count-to={s.countTo ?? ""}
              className="type-stat text-kw-ink"
            >
              {s.display}
            </span>
            <span className="h-0.5 w-8 bg-kw-red" />
            <span className="type-label mt-1 flex flex-wrap items-center justify-center gap-2 text-charcoal">
              {s.label}
              {s.sample && <SampleChip label="DRAFT STATS" />}
            </span>
            {s.note && (
              <span className="type-body-sm max-w-[240px] text-kw-gray">
                {s.note}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* §5.6 Best of State badge [SHAWN REVIEW] under the stats */}
      {showBestOfState && disclosures.bestOfStateBadge && (
        <div className="border-t hairline-light bg-white/70 py-5">
          <div className="container-monogram flex flex-wrap items-center justify-center gap-3 text-center">
            <Award className="h-4 w-4 shrink-0 text-kw-red" strokeWidth={1.75} />
            <span className="text-[0.82rem] font-medium tracking-[0.04em] text-kw-ink">
              {disclosures.bestOfStateBadge}
            </span>
            <SampleChip label="SHAWN REVIEW" variant="shawn-review" />
          </div>
        </div>
      )}
    </div>
  );
}
