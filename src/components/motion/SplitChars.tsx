import { motion, useReducedMotion } from "framer-motion";

export default function SplitChars({
  text,
  delay = 0,
  stagger = 0.028,
  className,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  let charIdx = 0;
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wIdx) => (
        <span
          key={wIdx}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden
        >
          {word.split("").map((ch, cIdx) => {
            const idx = charIdx++;
            return (
              <motion.span
                key={cIdx}
                className="inline-block"
                initial={reduced ? false : { y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: delay + idx * stagger,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {ch}
              </motion.span>
            );
          })}
          {wIdx < words.length - 1 && (
            <span className="inline-block">{"\u00A0"}</span>
          )}
        </span>
      ))}
    </span>
  );
}
