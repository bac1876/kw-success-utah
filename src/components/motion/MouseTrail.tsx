import { useCallback, useEffect, useRef, useState } from "react";

interface TrailItem {
  id: number;
  x: number;
  y: number;
  t: number;
  src: string;
  rot: number;
}

export default function MouseTrail({
  images,
  className,
  children,
}: {
  images: string[];
  className?: string;
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<TrailItem[]>([]);
  const lastSpawn = useRef(0);
  const nextId = useRef(0);
  const [now, setNow] = useState(() => Date.now());
  const enabled = useRef(false);

  useEffect(() => {
    enabled.current =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      setItems((prev) =>
        prev.length ? prev.filter((item) => t - item.t < 1000) : prev
      );
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!enabled.current) return;
      const t = Date.now();
      if (t - lastSpawn.current < 85) return;
      lastSpawn.current = t;
      const rect = e.currentTarget.getBoundingClientRect();
      setItems((prev) => [
        ...prev,
        {
          id: nextId.current++,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          t,
          src: images[Math.floor(Math.random() * images.length)],
          rot: (Math.random() - 0.5) * 22,
        },
      ]);
    },
    [images]
  );

  return (
    <div onPointerMove={onMove} className={className}>
      {children}
      {items.map((item) => {
        const age = Math.min((now - item.t) / 1000, 1);
        return (
          <img
            key={item.id}
            src={item.src}
            alt=""
            aria-hidden
            className="pointer-events-none absolute w-28 select-none border border-copper/40 shadow-lift"
            style={{
              left: item.x - 56,
              top: item.y - 40,
              opacity: 1 - age,
              transform: `scale(${1 - age * 0.18}) rotate(${item.rot}deg)`,
              willChange: "opacity, transform",
            }}
          />
        );
      })}
    </div>
  );
}
