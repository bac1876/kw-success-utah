import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Bot,
  CheckCircle2,
  Cpu,
  HeartHandshake,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { activeBrokerage } from "@/brokerages";
import Reveal, { SplitWords } from "@/components/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { cn } from "@/lib/utils";

const PROMISE_META = [
  {
    id: "culture",
    code: "SYS.01 // CARE_PROTOCOL",
    tag: "Whole-Person Support",
    metricLabel: "Leadership Access",
    metricValue: "Direct · 1-on-1",
    icon: HeartHandshake,
  },
  {
    id: "growth",
    code: "SYS.02 // WEALTH_TRAJECTORY",
    tag: "Launch → Capper → Icon",
    metricLabel: "Commission Cap",
    metricValue: "100% Post-Cap",
    icon: TrendingUp,
  },
  {
    id: "ai",
    code: "SYS.03 // AI_AUTOMATION",
    tag: "Done-For-You Systems",
    metricLabel: "Tech Leverage",
    metricValue: "Weekly AI Labs",
    icon: Bot,
  },
  {
    id: "tribe",
    code: "SYS.04 // MASTERMIND_NET",
    tag: "Open-Book Collaboration",
    metricLabel: "Market Center",
    metricValue: "Weber · Davis · Morgan",
    icon: Users,
  },
];

/* -------------------------------------------------------------------------- */
/*  Graphic 01: Culture & Care Support Radar + Live Pulse Feed                */
/* -------------------------------------------------------------------------- */
function CultureGraphic({ active }: { active: boolean }) {
  const [feedIdx, setFeedIdx] = useState(0);
  const feeds = [
    "1-on-1 Strategy Session · Russie Edwards",
    "Broker Contract Review · Shawn Janke",
    "AI Campaign Buildout · Bradley Green",
    "Launch Coaching Check-In · Chris Bradford",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setFeedIdx((prev) => (prev + 1) % feeds.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [feeds.length]);

  const satellites = [
    { label: "COACH", x: 26, y: 28 },
    { label: "BROKER", x: 174, y: 28 },
    { label: "TECH", x: 26, y: 98 },
    { label: "CARE", x: 174, y: 98 },
  ];

  return (
    <div className="relative flex h-48 w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#111417] p-4">
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(209,25,25,0.26), transparent 68%)",
        }}
      />

      {/* Top HUD bar */}
      <div className="relative z-10 flex items-center justify-between text-[0.6rem] font-mono uppercase tracking-widest text-stone-dark">
        <span className="inline-flex items-center gap-1.5 text-kw-red-bright">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-kw-red-bright" />
          SUPPORT_RADAR
        </span>
        <span>LATENCY: 0ms</span>
      </div>

      {/* Animated SVG Support Network */}
      <div className="relative z-10 my-auto flex items-center justify-center">
        <svg viewBox="0 0 200 124" className="h-28 w-full overflow-visible">
          {/* Concentric radar rings */}
          <motion.circle
            cx="100"
            cy="62"
            r="24"
            fill="none"
            stroke="rgba(209,25,25,0.35)"
            strokeWidth="1"
            strokeDasharray="3 3"
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "100px 62px" }}
          />
          <motion.circle
            cx="100"
            cy="62"
            r="42"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
            animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "100px 62px" }}
          />

          {/* Connecting lines + moving energy pulses from satellites to center */}
          {satellites.map((sat, i) => (
            <g key={sat.label}>
              <line
                x1={sat.x}
                y1={sat.y}
                x2="100"
                y2="62"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.2"
              />
              <motion.circle
                r="2.8"
                fill="#D11919"
                animate={{
                  cx: [sat.x, 100],
                  cy: [sat.y, 62],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: active ? 1.4 : 2.1,
                  repeat: Infinity,
                  delay: i * 0.45,
                  ease: "easeInOut",
                }}
              />
              <rect
                x={sat.x - 20}
                y={sat.y - 9}
                width="40"
                height="18"
                rx="5"
                fill="#1B1F23"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
              />
              <text
                x={sat.x}
                y={sat.y + 3}
                textAnchor="middle"
                fill="#E8EEF3"
                fontSize="7"
                fontWeight="700"
                fontFamily="monospace"
              >
                {sat.label}
              </text>
            </g>
          ))}

          {/* Central YOU / AGENT Hub */}
          <motion.circle
            cx="100"
            cy="62"
            r="16"
            fill="#B40101"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "100px 62px" }}
          />
          <text
            x="100"
            y="65"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="8"
            fontWeight="800"
            letterSpacing="0.08em"
          >
            AGENT
          </text>
        </svg>
      </div>

      {/* Live cycling support ticker */}
      <div className="relative z-10 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={feedIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="flex items-center gap-1.5 truncate text-[0.65rem] font-medium text-snow"
          >
            <CheckCircle2 className="h-3 w-3 shrink-0 text-kw-red-bright" />
            <span className="truncate">{feeds[feedIdx]}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Graphic 02: Growth Path Animated Telemetry Curve & Stage Tracker          */
/* -------------------------------------------------------------------------- */
function GrowthGraphic({ active }: { active: boolean }) {
  const [stageIdx, setStageIdx] = useState(2);
  const stages = [
    { label: "Launch", gci: "90 Days", pct: "Coaching" },
    { label: "Producing", gci: "Momentum", pct: "Systems" },
    { label: "Capper", gci: "100% Split", pct: "Capped" },
    { label: "Empire", gci: "Wealth", pct: "Legacy" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStageIdx((prev) => (prev + 1) % stages.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [stages.length]);

  const bars = [28, 42, 56, 72, 86, 100];

  return (
    <div className="relative flex h-48 w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#111417] p-4">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(180,1,1,0.18) 0%, rgba(17,20,23,0) 70%)",
        }}
      />

      {/* Top HUD */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-kw-red-bright">
          STAGE // {stages[stageIdx].label.toUpperCase()}
        </span>
        <span className="rounded bg-kw-red/20 px-1.5 py-0.5 font-mono text-[0.6rem] font-bold text-white">
          {stages[stageIdx].gci}
        </span>
      </div>

      {/* Animated SVG Growth Curve + Bar Telemetry */}
      <div className="relative z-10 my-auto pt-2">
        <svg viewBox="0 0 220 88" className="h-24 w-full overflow-visible">
          <defs>
            <linearGradient id="kwGrowthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D11919" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#D11919" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1="0"
            y1="22"
            x2="220"
            y2="22"
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="2 3"
          />
          <line
            x1="0"
            y1="52"
            x2="220"
            y2="52"
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="2 3"
          />

          {/* Animated vertical telemetry bars */}
          {bars.map((h, i) => {
            const x = 14 + i * 36;
            const barH = (h / 100) * 68;
            const isHighlighted = i <= stageIdx + 2;
            return (
              <motion.rect
                key={i}
                x={x}
                width="16"
                rx="4"
                fill={
                  isHighlighted
                    ? "rgba(209,25,25,0.32)"
                    : "rgba(255,255,255,0.07)"
                }
                initial={{ y: 80 - barH, height: barH }}
                animate={{
                  y: [80 - barH, 80 - barH - 5, 80 - barH],
                  height: [barH, barH + 5, barH],
                }}
                transition={{
                  duration: active ? 1.6 : 2.4,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* Area under growth curve */}
          <path
            d="M 12 72 C 60 66, 105 46, 150 28 C 175 18, 195 12, 210 8 L 210 82 L 12 82 Z"
            fill="url(#kwGrowthGrad)"
          />

          {/* Animated spline path */}
          <motion.path
            d="M 12 72 C 60 66, 105 46, 150 28 C 175 18, 195 12, 210 8"
            fill="none"
            stroke="#FF3B3B"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0.2 }}
            animate={{ pathLength: [0.25, 1, 0.25] }}
            transition={{
              duration: active ? 3.2 : 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Pulsing apex node */}
          <motion.circle
            cx="210"
            cy="8"
            r="4.5"
            fill="#FFFFFF"
            stroke="#D11919"
            strokeWidth="2.5"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            style={{ transformOrigin: "210px 8px" }}
          />
        </svg>
      </div>

      {/* Bottom 4-stage pill switcher */}
      <div className="relative z-10 grid grid-cols-4 gap-1">
        {stages.map((st, idx) => (
          <div
            key={st.label}
            className={cn(
              "rounded px-1.5 py-1 text-center font-mono text-[0.58rem] font-bold uppercase transition-colors",
              idx === stageIdx
                ? "bg-kw-red text-white"
                : "bg-white/[0.05] text-stone-dark"
            )}
          >
            {st.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Graphic 03: AI Tools Live Prompt & Automation Pipeline                    */
/* -------------------------------------------------------------------------- */
function AiToolsGraphic({ active }: { active: boolean }) {
  const [taskIdx, setTaskIdx] = useState(0);
  const tasks = [
    {
      prompt: "Generate Layton listing launch + 14-day follow-up",
      output: "CMA + Reels Script + SmartPlan Deployed",
    },
    {
      prompt: "Analyze Davis County absorption & price positioning",
      output: "Seller Equity Report Ready in 4.2s",
    },
    {
      prompt: "Draft personalized sphere touch for 150 past clients",
      output: "Segmented Voice & SMS Sequence Queued",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTaskIdx((prev) => (prev + 1) % tasks.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [tasks.length]);

  return (
    <div className="relative flex h-48 w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#111417] p-4">
      {/* Animated scanline */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-kw-red/20 to-transparent"
        animate={{ top: ["-20%", "110%"] }}
        transition={{
          duration: active ? 2.4 : 3.6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Top terminal header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-kw-red" />
          <span className="h-2 w-2 rounded-full bg-white/25" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="ml-1 font-mono text-[0.6rem] text-stone-dark">
            KW_AI_ENGINE v4.2
          </span>
        </div>
        <Cpu className="h-3.5 w-3.5 text-kw-red-bright" />
      </div>

      {/* Live streaming prompt box */}
      <div className="relative z-10 my-auto space-y-2.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={taskIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="space-y-2"
          >
            <div className="rounded-xl border border-white/10 bg-black/50 p-2.5 font-mono text-[0.64rem] text-snow">
              <span className="text-kw-red-bright">&gt; </span>
              {tasks[taskIdx].prompt}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1 inline-block h-3 w-1.5 bg-kw-red-bright align-middle"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-kw-red/40 bg-kw-red/15 px-2.5 py-1.5 text-[0.64rem] font-semibold text-white">
              <span className="flex items-center gap-1.5 truncate">
                <Sparkles className="h-3 w-3 shrink-0 text-kw-red-bright" />
                <span className="truncate">{tasks[taskIdx].output}</span>
              </span>
              <span className="ml-2 shrink-0 font-mono text-[0.58rem] text-kw-red-bright">
                READY
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Equalizer / Neural activity bars */}
      <div className="relative z-10 flex items-center justify-between gap-1 pt-1">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="w-1.5 rounded-full bg-kw-red-bright/80"
            animate={{
              height: [4, ((i * 7) % 14) + 6, 4],
              opacity: [0.35, 0.95, 0.35],
            }}
            transition={{
              duration: 1.1 + (i % 4) * 0.2,
              repeat: Infinity,
              delay: i * 0.06,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Graphic 04: Mastermind Tribe Mesh & Collaborative Deal Flow               */
/* -------------------------------------------------------------------------- */
function TribeGraphic({ active }: { active: boolean }) {
  const nodes = [
    { id: "N1", x: 34, y: 26, label: "LAYTON" },
    { id: "N2", x: 168, y: 24, label: "OGDEN" },
    { id: "N3", x: 102, y: 54, label: "MASTERMIND" },
    { id: "N4", x: 42, y: 88, label: "BOUNTIFUL" },
    { id: "N5", x: 164, y: 88, label: "MORGAN" },
  ];

  const edges = [
    [0, 2],
    [1, 2],
    [3, 2],
    [4, 2],
    [0, 1],
    [3, 4],
    [0, 3],
    [1, 4],
  ];

  return (
    <div className="relative flex h-48 w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#111417] p-4">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(209,25,25,0.22), transparent 70%)",
        }}
      />

      {/* Top HUD */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-widest text-stone-dark">
        <span className="text-kw-red-bright">TRIBE_TOPOLOGY</span>
        <span>OPEN-BOOK SHARING</span>
      </div>

      {/* Animated Mesh SVG */}
      <div className="relative z-10 my-auto">
        <svg viewBox="0 0 200 112" className="h-28 w-full overflow-visible">
          {edges.map(([a, b], idx) => {
            const na = nodes[a];
            const nb = nodes[b];
            return (
              <g key={idx}>
                <line
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1.1"
                />
                <motion.circle
                  r="2.4"
                  fill="#FF4747"
                  animate={{
                    cx: [na.x, nb.x, na.x],
                    cy: [na.y, nb.y, na.y],
                  }}
                  transition={{
                    duration: active ? 2.4 : 3.6,
                    repeat: Infinity,
                    delay: idx * 0.25,
                    ease: "easeInOut",
                  }}
                />
              </g>
            );
          })}

          {nodes.map((node, i) => {
            const isCenter = i === 2;
            return (
              <g key={node.id}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={isCenter ? 11 : 6.5}
                  fill={isCenter ? "#B40101" : "#1F2326"}
                  stroke={isCenter ? "#FF5555" : "rgba(255,255,255,0.45)"}
                  strokeWidth="1.5"
                  animate={{
                    scale: isCenter ? [1, 1.12, 1] : [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
                <text
                  x={node.x}
                  y={node.y + (isCenter ? 20 : 15)}
                  textAnchor="middle"
                  fill={isCenter ? "#FFFFFF" : "#A0AAB2"}
                  fontSize="6.5"
                  fontFamily="monospace"
                  fontWeight="700"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom collaboration status */}
      <div className="relative z-10 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.62rem] text-snow">
        <span className="flex items-center gap-1.5 font-medium">
          <Zap className="h-3 w-3 text-kw-red-bright" />
          Weekly Masterminds &amp; Top-Producer Panels
        </span>
        <span className="font-mono text-[0.58rem] text-kw-red-bright">
          LIVE
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Section: Four Promises Interactive Moving Graphic Interface          */
/* -------------------------------------------------------------------------- */
export default function FourPromisesShowcase() {
  const { agentsPage } = activeBrokerage;
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance the highlighted pipeline stage when not hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="relative overflow-hidden bg-mist py-24 text-ink md:py-32">
      {/* Subtle architectural grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(31,35,38,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,35,38,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-kw relative z-10">
        {/* Header Row */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-kw-red/30 bg-kw-red/10 px-3.5 py-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-kw-red text-[0.65rem] font-bold text-white">
                  01
                </span>
                <span className="type-label text-kw-red">Why KW Success</span>
              </div>
            </Reveal>
            <h2 className="type-display-lg mt-5 max-w-3xl text-ink">
              <SplitWords text="FOUR PROMISES TO EVERY AGENT." />
            </h2>
          </div>

          <Reveal delay={0.15}>
            <div className="flex flex-col items-start gap-3 lg:items-end">
              <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink px-4 py-1.5 text-[0.68rem] font-mono uppercase tracking-[0.16em] text-snow shadow-sm">
                <Activity className="h-3.5 w-3.5 text-kw-red-bright" />
                <span>KW SUCCESS AGENT OPERATING SYSTEM · LIVE TELEMETRY</span>
              </div>
              <p className="type-body max-w-md text-charcoal lg:text-right">
                Real estate is how you fund the life you want. Here is the
                standard we hold ourselves to for every agent in our Market
                Center.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Interactive Pipeline Progress Track */}
        <div className="mt-12 hidden rounded-2xl border border-ink/10 bg-ink-deep p-2 text-snow shadow-card lg:grid lg:grid-cols-4 lg:gap-2">
          {PROMISE_META.map((meta, idx) => {
            const isActive = idx === activeIdx;
            const Icon = meta.icon;
            return (
              <button
                key={meta.id}
                type="button"
                onMouseEnter={() => {
                  setIsPaused(true);
                  setActiveIdx(idx);
                }}
                onMouseLeave={() => setIsPaused(false)}
                onClick={() => setActiveIdx(idx)}
                className={cn(
                  "relative flex items-center justify-between overflow-hidden rounded-xl px-4 py-3 text-left transition-all",
                  isActive
                    ? "bg-slate-card text-white shadow-[0_8px_24px_-8px_rgba(180,1,1,0.5)]"
                    : "text-stone-dark hover:bg-white/5 hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePromisePill"
                    className="absolute inset-0 rounded-xl border border-kw-red/60 bg-gradient-to-r from-kw-red/20 via-kw-red/5 to-transparent"
                    transition={{ type: "spring", stiffness: 280, damping: 28 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-colors",
                      isActive
                        ? "bg-kw-red text-white"
                        : "bg-white/10 text-stone-dark"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="block font-mono text-[0.58rem] uppercase tracking-widest text-kw-red-bright">
                      0{idx + 1} · {meta.tag}
                    </span>
                    <span className="text-xs font-bold text-white">
                      {agentsPage.whyPromises[idx]?.title}
                    </span>
                  </div>
                </div>
                <span
                  className={cn(
                    "relative z-10 h-2 w-2 rounded-full transition-all",
                    isActive
                      ? "bg-kw-red-bright shadow-[0_0_10px_#D11919]"
                      : "bg-white/20"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* 4 Interactive Graphic Cards Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {agentsPage.whyPromises.map((card, idx) => {
            const meta = PROMISE_META[idx] ?? PROMISE_META[0];
            const Icon = meta.icon;
            const isActive = idx === activeIdx;

            return (
              <Reveal key={card.title} delay={0.07 * idx} y={24}>
                <div
                  onMouseEnter={() => {
                    setIsPaused(true);
                    setActiveIdx(idx);
                  }}
                  onMouseLeave={() => setIsPaused(false)}
                  onClick={() => setActiveIdx(idx)}
                  className="h-full cursor-pointer"
                >
                  <SpotlightCard
                    enableTilt
                    maxTilt={4}
                    spotlightColor="rgba(209, 25, 25, 0.24)"
                    borderGlowColor="rgba(255, 70, 70, 0.9)"
                    className={cn(
                      "flex h-full flex-col justify-between rounded-3xl border p-6 transition-all duration-300",
                      isActive
                        ? "border-kw-red bg-ink text-snow shadow-lift-dark -translate-y-1"
                        : "border-ink/15 bg-ink/95 text-snow shadow-card hover:border-kw-red/60"
                    )}
                  >
                    <div>
                      {/* Card Top Status Header */}
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                              isActive
                                ? "bg-kw-red text-white shadow-[0_6px_18px_rgba(180,1,1,0.5)]"
                                : "bg-white/10 text-kw-red-bright"
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                          <div>
                            <span className="block font-mono text-[0.58rem] uppercase tracking-widest text-stone-dark">
                              {meta.code}
                            </span>
                            <span className="text-[0.68rem] font-bold uppercase tracking-wider text-kw-red-bright">
                              {meta.tag}
                            </span>
                          </div>
                        </div>

                        <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-xs font-bold text-white">
                          0{idx + 1}
                        </span>
                      </div>

                      {/* Moving Graphic Interface Viewport */}
                      {idx === 0 && <CultureGraphic active={isActive} />}
                      {idx === 1 && <GrowthGraphic active={isActive} />}
                      {idx === 2 && <AiToolsGraphic active={isActive} />}
                      {idx === 3 && <TribeGraphic active={isActive} />}

                      {/* Promise Title & Copy */}
                      <h3 className="mt-6 text-xl font-bold leading-snug text-white">
                        {card.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-stone-dark">
                        {card.body}
                      </p>
                    </div>

                    {/* Bottom Telemetry Footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                      <span className="font-mono text-[0.64rem] uppercase tracking-wider text-stone-dark">
                        {meta.metricLabel}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] font-bold text-white">
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            isActive
                              ? "bg-kw-red-bright animate-pulse"
                              : "bg-white/40"
                          )}
                        />
                        {meta.metricValue}
                      </span>
                    </div>
                  </SpotlightCard>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
