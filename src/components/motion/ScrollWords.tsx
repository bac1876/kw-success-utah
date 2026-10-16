import { useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollWords({
  text,
  className,
  accentClassName = "text-copper",
}: {
  text: string;
  className?: string;
  accentClassName?: string;
}) {
  const root = useRef<HTMLParagraphElement>(null);

  const tokens = useMemo(() => {
    const out: { w: string; hi: boolean }[] = [];
    text.split(/(\*[^*]+\*)/g).forEach((chunk) => {
      const hi = chunk.startsWith("*") && chunk.endsWith("*");
      chunk
        .replace(/^\*|\*$/g, "")
        .split(/\s+/)
        .filter(Boolean)
        .forEach((w) => out.push({ w, hi }));
    });
    return out;
  }, [text]);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const words = gsap.utils.toArray<HTMLElement>("[data-word]");
      if (reduced) {
        gsap.set(words, { opacity: 1, filter: "blur(0px)" });
        return;
      }
      gsap.fromTo(
        words,
        { opacity: 0.12, filter: "blur(6px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          stagger: 0.06,
          scrollTrigger: {
            trigger: root.current,
            start: "top 82%",
            end: "bottom 45%",
            scrub: 0.4,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <p
      ref={root}
      className={cn("flex flex-wrap justify-center gap-x-[0.3em]", className)}
    >
      {tokens.map((t, idx) => (
        <span
          key={idx}
          data-word
          className={cn(
            "inline-block will-change-[opacity,filter]",
            t.hi && accentClassName
          )}
        >
          {t.w}
        </span>
      ))}
    </p>
  );
}
