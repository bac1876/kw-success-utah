import { useEffect, useState } from "react";

const STORAGE_KEY = "kws-intro-seen";

function shouldPlayIntro(): boolean {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return false;
    }
    if (sessionStorage.getItem(STORAGE_KEY)) return false;
    sessionStorage.setItem(STORAGE_KEY, "1");
    return true;
  } catch {
    return false;
  }
}

const playOnLoad = typeof window !== "undefined" ? shouldPlayIntro() : false;

export function introDelay(): number {
  return 0;
}

const CHARS = "KW SUCCESS".split("");
const START_MS = 320;
const STEP_MS = 85;
const HOLD_MS = 500;
const LIFT_AT_MS = START_MS + CHARS.length * STEP_MS + HOLD_MS;
const LIFT_DUR_MS = 1150;

export default function Preloader() {
  const [shown, setShown] = useState(0);
  const [lifting, setLifting] = useState(false);
  const [done, setDone] = useState(!playOnLoad);

  useEffect(() => {
    if (!playOnLoad) return;
    const timers: number[] = [];
    CHARS.forEach((_, idx) => {
      timers.push(
        window.setTimeout(() => setShown(idx + 1), START_MS + idx * STEP_MS)
      );
    });
    timers.push(window.setTimeout(() => setLifting(true), LIFT_AT_MS));
    timers.push(
      window.setTimeout(() => setDone(true), LIFT_AT_MS + LIFT_DUR_MS + 50)
    );

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    timers.push(
      window.setTimeout(() => {
        document.documentElement.style.overflow = prevOverflow;
      }, LIFT_AT_MS + 200)
    );

    return () => {
      timers.forEach(clearTimeout);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      style={{
        transform: lifting ? "translateY(-100%)" : "translateY(0)",
        transition: `transform ${LIFT_DUR_MS}ms cubic-bezier(0.45, 0, 0.15, 1)`,
        willChange: "transform",
      }}
    >
      <div className="flex items-baseline text-[clamp(1.6rem,4.5vw,3.4rem)] font-medium uppercase tracking-[0.45em] text-ivory">
        {CHARS.map((ch, idx) => (
          <span
            key={idx}
            className="inline-block transition-[opacity,transform] duration-300"
            style={{
              opacity: idx < shown ? 1 : 0,
              transform: idx < shown ? "translateY(0)" : "translateY(0.35em)",
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </div>
      <span
        className="mt-5 block h-px bg-copper"
        style={{
          width: "min(38vw, 22rem)",
          transform: `scaleX(${shown / CHARS.length})`,
          transformOrigin: "left",
          transition: "transform 240ms cubic-bezier(.22,1,.36,1)",
        }}
      />
      <span
        className="mt-4 text-[0.6rem] uppercase tracking-[0.42em] text-stone-dark transition-opacity duration-500"
        style={{ opacity: shown === CHARS.length ? 1 : 0 }}
      >
        Keller Williams Realty · Northern Utah
      </span>
    </div>
  );
}
