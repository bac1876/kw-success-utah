import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const INFINITY_D =
  "M60 30 C60 13 38 13 30 30 C22 47 0 47 0 30 C0 13 22 13 30 30 C38 47 60 47 60 30 Z";

export function InfinityMark({
  className,
  strokeWidth = 2.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.svg
      viewBox="-2 8 64 44"
      fill="none"
      className={cn("h-[1.6em] w-auto", className)}
      role="img"
      aria-label="Continuous relationship"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.path
        d={INFINITY_D}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: reduced ? 1 : 0 },
          visible: { pathLength: 1 },
        }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

export function FourPartInfinity({ className }: { className?: string }) {
  return <InfinityMark className={className} />;
}
