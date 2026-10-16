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
        "inline-flex items-center border px-1.5 py-0.5 align-middle text-[0.55rem] font-medium uppercase tracking-[0.22em]",
        variant === "review" || variant === "shawn-review"
          ? "border-copper/60 text-copper-bright"
          : "border-copper/50 text-copper",
        className
      )}
      title="Staging note — final confirmation pending"
    >
      {label}
    </span>
  );
}
