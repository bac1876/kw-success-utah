import { cn } from "@/lib/utils";

/**
 * Visible [PLACEHOLDER] or [SHAWN REVIEW] marker for staging review (spec §0, §14).
 */
export default function SampleChip({
  label = "PLACEHOLDER",
  variant = "placeholder",
  className,
}: {
  label?: string;
  variant?: "placeholder" | "shawn-review";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-0.5 align-middle text-[0.58rem] font-semibold uppercase tracking-[0.2em]",
        variant === "shawn-review"
          ? "border-amber-600/60 bg-amber-500/10 text-amber-700"
          : "border-kw-red/50 bg-kw-red/5 text-kw-red",
        className
      )}
      title={
        variant === "shawn-review"
          ? "Draft legal/compliance wording — Shawn Janke review prior to launch"
          : "Placeholder — final content pending"
      }
    >
      [{label}]
    </span>
  );
}
