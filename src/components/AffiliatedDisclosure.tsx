import { Link } from "react-router-dom";
import { activeBrokerage } from "@/brokerages";
import SampleChip from "@/components/SampleChip";
import { cn } from "@/lib/utils";

/**
 * §5.2 & §10: Affiliated Business Disclosure component.
 * Automatically shown wherever any provider with affiliated: true is displayed by name
 * (partner pages, footer, and One Table section if logos are ever turned on).
 */
export default function AffiliatedDisclosure({
  tone = "light",
  showFullLegal = false,
  className,
}: {
  tone?: "light" | "dark";
  showFullLegal?: boolean;
  className?: string;
}) {
  const { disclosures } = activeBrokerage;
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "border px-5 py-4 text-left",
        dark
          ? "border-white/15 bg-white/[0.03] text-stone-dark"
          : "border-charcoal/15 bg-mist/70 text-charcoal",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "text-[0.65rem] font-semibold uppercase tracking-[0.22em]",
            dark ? "text-white/90" : "text-kw-ink"
          )}
        >
          Affiliated Business Disclosure
        </span>
        <SampleChip label="SHAWN REVIEW" variant="shawn-review" />
      </div>

      <p
        className={cn(
          "mt-2 text-[0.8rem] leading-relaxed",
          dark ? "text-stone-dark" : "text-charcoal"
        )}
      >
        {disclosures.affiliatedBusinessDraft}{" "}
        <Link
          to={disclosures.affiliatedPdfUrl}
          className={cn(
            "font-medium underline underline-offset-4 transition-colors",
            dark
              ? "text-white hover:text-kw-red-bright"
              : "text-kw-red hover:text-kw-ink"
          )}
        >
          View our Affiliated Business Disclosure.
        </Link>
      </p>

      {showFullLegal && (
        <p
          className={cn(
            "mt-3 border-t pt-3 text-[0.72rem] font-semibold uppercase tracking-[0.04em] leading-relaxed",
            dark
              ? "border-white/15 text-white/85"
              : "border-charcoal/15 text-kw-ink"
          )}
        >
          {disclosures.affiliatedBusinessFullCapitals}
        </p>
      )}
    </div>
  );
}
