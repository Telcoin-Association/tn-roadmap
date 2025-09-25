export function GradientCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-hero-ambient opacity-80" />
      <div className="motion-reduce:hidden absolute inset-x-0 top-0 h-[140vh] -translate-y-1/4 bg-[radial-gradient(circle_at_20%_20%,hsl(201_92%_60%/0.25),transparent_55%),radial-gradient(circle_at_80%_0%,hsl(248_78%_65%/0.2),transparent_55%),radial-gradient(circle_at_50%_80%,hsl(220_94%_60%/0.15),transparent_55%)] blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/40 to-bg opacity-95" />
    </div>
  );
}
