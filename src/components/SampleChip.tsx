import { cn } from "@/lib/utils";

export default function SampleChip({
  label = "Placeholder",
  variant = "placeholder",
  className,
}: {
  label?: string;
  variant?: "placeholder" | "review" | "shawn-review";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 align-middle text-[0.58rem] font-semibold uppercase tracking-[0.16em]",
        variant === "review" || variant === "shawn-review"
          ? "border-kw-red/40 bg-kw-red/10 text-kw-red-bright"
          : "border-stone-dark/40 bg-white/10 text-stone-dark",
        className
      )}
      title="Staging note — final confirmation pending"
    >
      {label}
    </span>
  );
}
