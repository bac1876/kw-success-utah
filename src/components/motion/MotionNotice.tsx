export default function MotionNotice({
  nativeReduced,
  forced,
}: {
  nativeReduced: boolean;
  forced: boolean;
}) {
  if (!nativeReduced && !forced) return null;
  const href = forced ? "?motion=off" : "?motion=on";

  return (
    <a
      href={href}
      className="fixed bottom-4 left-4 z-[95] flex max-w-[calc(100vw-2rem)] items-center gap-3 border border-copper/60 bg-ink/90 px-4 py-2.5 text-[0.66rem] uppercase tracking-[0.2em] text-ivory backdrop-blur-md transition-colors hover:border-copper"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-copper" />
      {forced ? (
        <span>
          Motion forced on for this preview ·{" "}
          <span className="text-copper">use system setting</span>
        </span>
      ) : (
        <span>
          Reduce Motion is on in your system settings — you&apos;re seeing the
          static site ·{" "}
          <span className="text-copper">show motion anyway</span>
        </span>
      )}
    </a>
  );
}
