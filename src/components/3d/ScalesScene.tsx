// Lady Justice image card — shown in the right side of the Hero section
export default function ScalesScene({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
      {/* Lady Justice photograph — fills the rounded card */}
      <img
        src="/lady_justice.png"
        alt="Lady Justice holding the Scales of Justice"
        className="w-full h-full object-cover object-center"
        draggable={false}
      />
      {/* Subtle premium dark vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(3,6,21,0.55) 100%)',
        }}
      />
      {/* Gold shimmer gradient at the bottom for card depth */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(3,6,21,0.80) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}
