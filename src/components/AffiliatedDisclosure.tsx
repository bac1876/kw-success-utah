import { brokerage } from "@/brokerages";
import SampleChip from "@/components/SampleChip";
import { cn } from "@/lib/utils";

export default function AffiliatedDisclosure({
  tone = "light",
  showFullLegal = false,
  className,
}: {
  tone?: "light" | "dark";
  showFullLegal?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "border p-5 text-left",
        dark
          ? "hairline-dark bg-ink-deep/80 text-stone-dark"
          : "hairline-light bg-ivory-deep/50 text-stone",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="type-label text-copper">
          Affiliated Business Arrangement Disclosure
        </span>
        <SampleChip label="SHAWN REVIEW" variant="review" />
      </div>
      <p className="type-body-sm mt-2 leading-relaxed">
        {brokerage.disclosures.affiliatedBusinessDraft}
      </p>
      {showFullLegal && (
        <p className="mt-3 text-[0.75rem] font-semibold uppercase tracking-[0.06em] text-ink">
          {brokerage.disclosures.affiliatedBusinessFullCapitals}
        </p>
      )}
    </div>
  );
}
