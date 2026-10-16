import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  borderGlowColor?: string;
  enableTilt?: boolean;
  maxTilt?: number;
}

/**
 * MotionSites-inspired Spotlight + 3D Tilt Card (inspired by Apex Program Accordion
 * SpotlightBorder, Glow Features, and Animated Cards).
 */
export default function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(180, 1, 1, 0.22)",
  borderGlowColor = "rgba(209, 25, 25, 0.65)",
  enableTilt = false,
  maxTilt = 4,
  style,
  ...rest
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y });

    if (enableTilt) {
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -maxTilt;
      const ry = ((x - cx) / cx) * maxTilt;
      setTilt({ rotateX: rx, rotateY: ry });
    }
    rest.onMouseMove?.(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setOpacity(1);
    rest.onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setOpacity(0);
    if (enableTilt) {
      setTilt({ rotateX: 0, rotateY: 0 });
    }
    rest.onMouseLeave?.(e);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: enableTilt
          ? `perspective(1100px) rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg)`
          : style?.transform,
        transition: enableTilt
          ? "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), border-color 300ms ease, background-color 300ms ease, box-shadow 300ms ease"
          : undefined,
      }}
      className={cn("relative overflow-hidden", className)}
      {...rest}
    >
      {/* Ambient cursor-following interior spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(380px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />

      {/* 1.5px cursor-tracked border ring using mask-composite */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity,
          padding: "1.5px",
          background: `radial-gradient(260px circle at ${pos.x}px ${pos.y}px, ${borderGlowColor}, transparent 75%)`,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
