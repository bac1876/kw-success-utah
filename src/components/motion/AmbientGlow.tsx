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
        className="animate-orb-a absolute -left-[10%] top-[10%] h-[55vmax] w-[55vmax] rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(180,1,1,.32), rgba(180,1,1,0) 62%)",
        }}
      />
      <span
        className="animate-orb-b absolute -right-[15%] bottom-[-10%] h-[50vmax] w-[50vmax] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(209,25,25,.26), rgba(209,25,25,0) 62%)",
        }}
      />
    </div>
  );
}
