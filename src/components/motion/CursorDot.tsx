import { useEffect, useRef, useState } from "react";

export default function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || reduced) return;

    let tx = -100;
    let ty = -100;
    let cx = -100;
    let cy = -100;
    let raf = 0;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      setVisible(true);
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor]"
      ) as HTMLElement | null;
      setLabel(target?.dataset.cursor ?? null);
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] will-change-transform"
      style={{ opacity: visible ? 1 : 0, transition: "opacity .3s" }}
    >
      <div
        className={
          label
            ? "flex h-9 items-center rounded-full bg-copper px-4 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-ink shadow-lift transition-all duration-300"
            : "h-2.5 w-2.5 rounded-full bg-copper transition-all duration-300"
        }
      >
        {label && <span className="whitespace-nowrap">{label}</span>}
      </div>
    </div>
  );
}
