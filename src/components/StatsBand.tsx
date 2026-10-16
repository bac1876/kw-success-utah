import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Award, TrendingUp } from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import SampleChip from "@/components/SampleChip";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface StatItem {
  display: string;
  countTo?: number;
  format?: "money" | "comma" | "plain" | ((n: number) => string);
  label: string;
  note?: string;
  review?: boolean;
  sample?: boolean;
}

const DEFAULT_KW_STATS: StatItem[] = [
  {
    display: "20,000+",
    countTo: 20000,
    format: "comma",
    label: "Homes closed since 1997",
    note: "Trusted across Northern Utah",
    sample: true,
  },
  {
    display: "$6 Billion+",
    countTo: 6,
    format: "money",
    label: "In real estate",
    note: "Closed volume across Weber, Davis & Morgan",
    sample: true,
  },
  {
    display: "Since 1997",
    countTo: 1997,
    format: "plain",
    label: "Serving Weber, Davis & Morgan",
    note: "Nearly three decades of local leadership",
  },
];

export default function StatsBand({
  stats = DEFAULT_KW_STATS,
  className,
}: {
  stats?: StatItem[];
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;

      gsap.utils.toArray<HTMLElement>("[data-stat-numeral]").forEach((el) => {
        const raw = el.dataset.countTo;
        if (!raw) return;
        const target = Number(raw);
        if (!Number.isFinite(target)) return;
        const fmt = el.dataset.format;
        const formatFn =
          fmt === "money"
            ? (v: number) => `$${Math.round(v)} Billion+`
            : fmt === "comma"
              ? (v: number) => `${Math.round(v).toLocaleString("en-US")}+`
              : (v: number) => `Since ${Math.round(v)}`;

        const state = { v: fmt === "plain" ? 1950 : 0 };
        gsap.to(state, {
          v: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = formatFn(state.v);
          },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className={cn("bg-ink-deep py-20 text-snow md:py-28", className)}
    >
      <div className="container-kw">
        {/* Bento Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((item, idx) => (
            <div
              key={item.label}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-8 transition-all duration-300 md:p-10",
                idx === 0
                  ? "border-kw-red/50 bg-gradient-to-br from-kw-red/20 via-ink to-ink"
                  : "border-white/10 bg-ink hover:border-white/20"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-stone-dark">
                  0{idx + 1} · Track Record
                </span>
                <TrendingUp className="h-4 w-4 text-kw-red-bright" />
              </div>

              <div className="my-8">
                <span
                  data-stat-numeral
                  data-count-to={item.countTo ?? ""}
                  data-format={typeof item.format === "string" ? item.format : ""}
                  className="block font-display text-[clamp(2.4rem,4.5vw,3.8rem)] font-extrabold leading-none tracking-tight text-white"
                >
                  {item.display}
                </span>
                <span className="mt-3 block text-base font-semibold text-kw-red-bright">
                  {item.label}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4">
                {item.note && (
                  <span className="text-xs text-stone-dark">{item.note}</span>
                )}
                {(item.review || item.sample) && (
                  <SampleChip
                    label={item.review ? "SHAWN REVIEW" : "DRAFT STAT"}
                    variant={item.review ? "review" : "placeholder"}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* §5.6 Best of State Badge under the stats */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink px-6 py-5 sm:flex-row md:px-8">
          <div className="flex flex-wrap items-center gap-3 text-center sm:text-left">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-kw-red/15 text-kw-red-bright">
              <Award className="h-5 w-5" />
            </span>
            <p className="text-sm font-medium text-snow/90">
              {activeBrokerage.disclosures.bestOfStateBadge}
            </p>
          </div>
          <SampleChip label="SHAWN REVIEW" variant="review" />
        </div>
      </div>
    </section>
  );
}
