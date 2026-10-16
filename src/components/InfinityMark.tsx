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
      aria-label="Infinity — the relationship keeps going"
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

const FOUR_CORNERS = [
  { text: "Transact", x: 15, y: 6 },
  { text: "Move", x: 105, y: 6 },
  { text: "Life", x: 15, y: 74 },
  { text: "Search", x: 105, y: 74 },
];

export function FourPartInfinity({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <motion.svg
        viewBox="-14 0 148 80"
        fill="none"
        className="w-full max-w-[460px]"
        role="img"
        aria-label="The life of the home: Transact, Move, Life, Search — one continuous relationship"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.path
          d="M118 40 C118 12 74 12 60 40 C46 68 2 68 2 40 C2 12 46 12 60 40 C74 68 118 68 118 40 Z"
          stroke="#B87333"
          strokeWidth={1.6}
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: reduced ? 1 : 0 },
            visible: { pathLength: 1 },
          }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
        <motion.rect
          x={56.5}
          y={36.5}
          width={7}
          height={7}
          fill="#B87333"
          transform="rotate(45 60 40)"
          variants={{
            hidden: { opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.6 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ delay: reduced ? 0 : 1.6, duration: 0.5 }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
        {FOUR_CORNERS.map((item, idx) => (
          <motion.text
            key={item.text}
            x={item.x}
            y={item.y}
            textAnchor="middle"
            fill="#8A857C"
            fontSize={5.4}
            fontWeight={500}
            letterSpacing={1.6}
            style={{ textTransform: "uppercase" }}
            variants={{
              hidden: { opacity: reduced ? 1 : 0 },
              visible: { opacity: 1 },
            }}
            transition={{
              delay: reduced ? 0 : 0.9 + idx * 0.25,
              duration: 0.6,
            }}
          >
            {item.text.toUpperCase()}
          </motion.text>
        ))}
      </motion.svg>
    </div>
  );
}
