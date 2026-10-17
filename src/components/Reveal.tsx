import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

/** Standard scroll reveal: subtle rise + optical focus + fade at viewport entry. */
export default function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduced
          ? false
          : { opacity: 0, y: Math.min(y, 24), filter: "blur(4px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

interface SplitWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  stagger?: number;
  delay?: number;
}

/** Word-level split headline reveal: y:105% → 0, staggered with exponential ease-out. */
export function SplitWords({
  text,
  className,
  wordClassName,
  stagger = 0.035,
  delay = 0,
}: SplitWordsProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial={reduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            className={`inline-block will-change-transform ${wordClassName ?? ""}`}
            variants={{
              hidden: { y: "105%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.72, ease: EASE_OUT_EXPO },
              },
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
