import { Link } from "react-router-dom";
import { brokerage } from "@/brokerages";
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
        "rounded-xl border p-5 text-left",
        dark
          ? "border-white/10 bg-white/[0.03] text-stone-dark"
          : "border-ink/10 bg-mist/70 text-charcoal",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-kw-red" />
        <span
          className={cn(
            "type-label",
            dark ? "text-snow" : "text-ink"
          )}
        >
          Affiliated Business Arrangement Disclosure
        </span>
      </div>
      <p className="type-body-sm mt-2.5 leading-relaxed">
        {brokerage.disclosures.affiliatedBusinessDraft}{" "}
        <Link
          to={brokerage.disclosures.affiliatedPdfUrl}
          className={cn(
            "font-medium underline underline-offset-4 transition-colors",
            dark
              ? "text-snow hover:text-kw-red-bright"
              : "text-kw-red hover:text-ink"
          )}
        >
          View our Affiliated Business Disclosure.
        </Link>
      </p>
      {showFullLegal && (
        <p
          className={cn(
            "mt-3.5 rounded-lg border p-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.04em]",
            dark
              ? "border-white/10 bg-ink-deep text-snow/90"
              : "border-ink/10 bg-white text-ink"
          )}
        >
          {brokerage.disclosures.affiliatedBusinessFullCapitals}
        </p>
      )}
    </div>
  );
}
