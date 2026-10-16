export default function AmbientGlow({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <span
        className="animate-orb-a absolute -left-[10%] top-[10%] h-[55vmax] w-[55vmax] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(184,115,51,.35), rgba(184,115,51,0) 62%)",
        }}
      />
      <span
        className="animate-orb-b absolute -right-[15%] bottom-[-10%] h-[50vmax] w-[50vmax] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(208,148,84,.3), rgba(208,148,84,0) 62%)",
        }}
      />
    </div>
  );
}
