import { useEffect, useRef } from "react";

export default function Watermark({
  word = "KW SUCCESS",
  className = "",
}: {
  word?: string;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    const fit = () => {
      try {
        if (!textRef.current || !svgRef.current) return;
        const box = textRef.current.getBBox();
        svgRef.current.setAttribute(
          "viewBox",
          `${box.x} ${box.y} ${box.width} ${box.height}`
        );
      } catch {
        // ignore if hidden
      }
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(fit);
    } else {
      fit();
    }
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [word]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={{ lineHeight: 0 }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1000 200"
        preserveAspectRatio="xMidYMid meet"
        className="block h-auto w-full overflow-visible"
      >
        <text
          ref={textRef}
          x="500"
          y="160"
          textAnchor="middle"
          fontSize="200"
          fontWeight="500"
          letterSpacing="0.12em"
          fill="rgba(184,115,51,0.07)"
          style={{ fontFamily: "inherit" }}
        >
          {word}
        </text>
      </svg>
    </div>
  );
}
