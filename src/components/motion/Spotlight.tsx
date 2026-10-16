import { useEffect, useRef } from "react";

export default function Spotlight({
  src,
  alt = "",
}: {
  src: string;
  alt?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!el || !finePointer || reduced) return;

    let tx = 50;
    let ty = 45;
    let cx = 50;
    let cy = 45;
    let raf = 0;
    const parent = el.parentElement;
    if (!parent) return;

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width) * 100;
      ty = ((e.clientY - rect.top) / rect.height) * 100;
    };

    const tick = () => {
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      el.style.setProperty("--sx", `${cx}%`);
      el.style.setProperty("--sy", `${cy}%`);
      raf = requestAnimationFrame(tick);
    };

    parent.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      parent.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={
        {
          "--sx": "50%",
          "--sy": "45%",
          WebkitMaskImage:
            "radial-gradient(circle 300px at var(--sx) var(--sy), rgba(0,0,0,1) 0%, rgba(0,0,0,.9) 30%, rgba(0,0,0,.45) 60%, rgba(0,0,0,0) 100%)",
          maskImage:
            "radial-gradient(circle 300px at var(--sx) var(--sy), rgba(0,0,0,1) 0%, rgba(0,0,0,.9) 30%, rgba(0,0,0,.45) 60%, rgba(0,0,0,0) 100%)",
        } as React.CSSProperties
      }
    >
      <img
        src={src}
        alt={alt}
        className="h-[115%] w-full object-cover"
        style={{ filter: "brightness(1.35) saturate(1.12) sepia(0.12)" }}
      />
    </div>
  );
}
