import { useState } from "react";
import { cn } from "@/lib/utils";

export default function FlyLabel({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [key, setKey] = useState(0);
  const bump = () => setKey((k) => k + 1);

  return (
    <span
      onMouseEnter={bump}
      onMouseLeave={bump}
      className={cn(
        "relative inline-block overflow-hidden align-baseline",
        className
      )}
    >
      {key === 0 ? (
        <span className="inline-block">{text}</span>
      ) : (
        <span key={key} className="inline-block">
          <span className="animate-fly-out-up inline-block">{text}</span>
          <span
            className="animate-fly-in-up absolute inset-0 inline-block"
            aria-hidden
          >
            {text}
          </span>
        </span>
      )}
    </span>
  );
}
