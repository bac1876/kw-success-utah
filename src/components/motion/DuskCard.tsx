import { useState } from "react";
import { cn } from "@/lib/utils";

export default function DuskCard({
  src,
  alt = "",
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const [dusk, setDusk] = useState(false);

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      onPointerEnter={() => setDusk(true)}
      onPointerLeave={() => setDusk(false)}
      onClick={() => setDusk((d) => !d)}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      <img
        src={src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          filter:
            "brightness(0.42) saturate(0.75) contrast(1.12) sepia(0.18) hue-rotate(-14deg)",
          opacity: dusk ? 1 : 0,
          transition: "opacity 4.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(38% 30% at 62% 46%, rgba(255,196,120,.42), rgba(255,196,120,0) 70%), radial-gradient(22% 18% at 28% 58%, rgba(255,180,100,.28), rgba(255,180,100,0) 70%), linear-gradient(to top, rgba(8,6,4,.55), rgba(8,6,4,0) 45%)",
          opacity: dusk ? 1 : 0,
          transition: "opacity 4.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      <span
        className={cn(
          "pointer-events-none absolute bottom-4 left-4 text-[0.58rem] uppercase tracking-[0.3em] transition-opacity duration-700",
          dusk ? "text-copper-bright opacity-100" : "text-ivory/70 opacity-70"
        )}
      >
        {dusk ? "Dusk" : "Day"}
      </span>
    </div>
  );
}
