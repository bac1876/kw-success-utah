import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SplitChars from "@/components/motion/SplitChars";
import { HEADER_H } from "@/components/Navbar";

export interface EllipseSlide {
  image: string;
  label: string;
  partner: string;
}

const STEP_VH = 95;
const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

export default function EllipseSlider({
  slides,
  eyebrow,
  title,
  lede,
}: {
  slides: EllipseSlide[];
  eyebrow: string;
  title: string;
  lede: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [radii, setRadii] = useState<number[]>(() =>
    slides.map((_, idx) => (idx === 0 ? 1 : 0))
  );
  const [activeIdx, setActiveIdx] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const canPin =
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.matchMedia("(min-width: 768px)").matches;
    setPinned(canPin);
    if (!canPin) return;

    let raf = 0;
    const update = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const stepPx = (window.innerHeight * STEP_VH) / 100;
      const next = slides.map((_, idx) => {
        if (idx === 0) return 1;
        const raw = Math.min(1, Math.max(0, (-rect.top - (idx - 1) * stepPx) / stepPx));
        return easeOutQuad(raw);
      });
      setRadii(next);
      let cur = 0;
      next.forEach((v, idx) => {
        if (v > 0.5) cur = idx;
      });
      setActiveIdx(cur);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [slides]);

  const totalHeight = pinned
    ? `calc(100vh + ${(slides.length - 1) * STEP_VH}vh)`
    : undefined;

  return (
    <div
      ref={wrapRef}
      style={{ height: totalHeight, marginTop: -HEADER_H }}
    >
      <section
        className={
          pinned
            ? "sticky top-0 h-screen w-full overflow-hidden bg-ink"
            : "relative min-h-[70vh] overflow-hidden bg-ink"
        }
        style={{ paddingTop: HEADER_H }}
      >
        {slides.map((s, idx) => (
          <div
            key={s.image + idx}
            className="absolute inset-0"
            style={{
              clipPath: pinned
                ? `ellipse(${5 + (radii[idx] ?? 0) * 150}% ${
                    8 + (radii[idx] ?? 0) * 150
                  }% at 50% 50%)`
                : idx === 0
                  ? "none"
                  : "ellipse(0% 0% at 50% 50%)",
              willChange: "clip-path",
            }}
          >
            <img
              src={s.image}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="overlay-hero absolute inset-0" />
            <div className="absolute inset-0 bg-ink/35" />
          </div>
        ))}

        <div
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
          style={{ minHeight: pinned ? undefined : "60vh" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <span className="h-px w-10 bg-copper" />
            <span className="type-label text-copper">{eyebrow}</span>
            <span className="h-px w-10 bg-copper" />
          </motion.div>

          <h1 className="type-display-lg mt-8 max-w-4xl text-ivory">
            <SplitChars text={title} delay={0.5} />
          </h1>

          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="type-serif-accent mt-6 max-w-2xl text-ivory/80"
          >
            {lede}
          </motion.p>

          <div className="mt-12 flex items-center gap-8">
            {slides.map((s, idx) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-2"
              >
                <span
                  className={`h-px w-10 transition-colors duration-500 ${
                    idx === activeIdx ? "bg-copper" : "bg-ivory/25"
                  }`}
                />
                <span
                  className={`text-[0.62rem] uppercase tracking-[0.3em] transition-colors duration-500 ${
                    idx === activeIdx ? "text-copper" : "text-ivory/45"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <motion.p
            key={activeIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="type-label mt-5 text-ivory/70"
          >
            {slides[activeIdx]?.partner}
          </motion.p>

          {pinned && (
            <p className="absolute bottom-8 text-[0.6rem] uppercase tracking-[0.3em] text-stone-dark">
              Scroll
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
