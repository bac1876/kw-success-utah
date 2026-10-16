import { cn } from "@/lib/utils";

export default function Ticker({
  word = "KW SUCCESS",
  className,
}: {
  word?: string;
  className?: string;
}) {
  const repeated = Array.from({ length: 6 }, () => word).join("\u2003·\u2003");

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none overflow-hidden",
        className
      )}
    >
      <div className="animate-ticker flex w-max whitespace-nowrap will-change-transform">
        {[0, 1].map((idx) => (
          <span
            key={idx}
            className="pr-[0.5em] text-[clamp(6rem,16vw,15rem)] font-medium uppercase leading-none tracking-[0.18em] text-copper/[0.05]"
          >
            {repeated}
            {"\u2003·\u2003"}
          </span>
        ))}
      </div>
    </div>
  );
}
