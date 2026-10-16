import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Award } from "lucide-react";
import { brokerage } from "@/brokerages";
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

const KW_STATS: StatItem[] = [
  {
    display: "20,000+",
    countTo: 20000,
    format: "comma",
    label: "Families & Individuals Served",
    note: "Across Northern Utah since 1997",
  },
  {
    display: "$6B+",
    countTo: 6,
    format: "money",
    label: "Closed Real Estate Volume",
    note: "Davis, Weber, Morgan & Salt Lake Metro",
  },
  {
    display: "1997",
    countTo: 1997,
    format: "plain",
    label: "Serving Utah Since",
    note: "Founded by Marcus & Jenifer Arbuckle",
  },
  {
    display: "8 of 9",
    label: "Utah Best of State",
    note: "Recognized inside the KW Utah Region",
    review: true,
  },
];

export default function StatsBand({
  stats = KW_STATS,
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
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-stat-numeral]").forEach((el) => {
        const raw = el.dataset.countTo;
        if (!raw) return;
        const target = Number(raw);
        if (!Number.isFinite(target)) return;
        const fmt = el.dataset.format;
        const formatFn =
          fmt === "money"
            ? (v: number) => `$${Math.round(v)}B+`
            : fmt === "comma"
              ? (v: number) => `${Math.round(v).toLocaleString("en-US")}+`
              : (v: number) => String(Math.round(v));

        const state = { v: fmt === "plain" ? 1950 : 0 };
        gsap.to(state, {
          v: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = formatFn(state.v);
          },
          onComplete: () => {
            gsap.fromTo(
              el,
              { color: "#D09454" },
              { color: "#B87333", duration: 0.3 }
            );
          },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className={cn("bg-ink border-y hairline-dark", className)}>
      <div className="container-monogram grid grid-cols-2 lg:grid-cols-4">
        {stats.map((item, idx) => (
          <div
            key={item.label}
            className="relative flex flex-col items-center gap-4 px-6 py-16 text-center md:py-24"
          >
            {idx > 0 && (
              <span
                data-stat-divider
                className="absolute left-0 top-1/2 hidden h-24 w-px -translate-y-1/2 bg-line-dark lg:block"
              />
            )}
            <span
              data-stat-numeral
              data-count-to={item.countTo ?? ""}
              data-format={typeof item.format === "string" ? item.format : ""}
              className="type-stat text-copper"
            >
              {item.display}
            </span>
            <span className="type-label flex flex-wrap items-center justify-center gap-2 text-ivory/85">
              {item.label}
              {(item.review || item.sample) && (
                <SampleChip label="SHAWN REVIEW" variant="review" />
              )}
            </span>
            {item.note && (
              <span className="type-body-sm max-w-[240px] text-stone-dark">
                {item.note}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Best of State Attribution Bar */}
      <div className="border-t hairline-dark bg-ink-deep py-4">
        <div className="container-monogram flex flex-wrap items-center justify-center gap-3 text-center">
          <Award className="h-4 w-4 text-copper" strokeWidth={1.5} />
          <span className="type-body-sm text-ivory/80">
            {brokerage.disclosures.bestOfStateBadge}
          </span>
          <a
            href={brokerage.externalLinks.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="type-label text-copper transition-colors hover:text-copper-bright"
          >
            View Feature →
          </a>
        </div>
      </div>
    </div>
  );
}
