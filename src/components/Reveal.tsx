import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

/** Standard scroll reveal: rise + fade at viewport entry. */
export default function Reveal({
  children,
  delay = 0,
  y = 40,
  className,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
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

/** Word-level split headline reveal: y:110% → 0, staggered. */
export function SplitWords({
  text,
  className,
  wordClassName,
  stagger = 0.045,
  delay = 0,
}: SplitWordsProps) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
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
              hidden: { y: "110%" },
              visible: {
                y: 0,
                transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
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
