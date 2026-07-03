// Minimal line icons for growing conditions. Inherit `currentColor`.

type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SunIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <circle cx="12" cy="12" r="4" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (Math.PI / 4) * i;
        return (
          <line
            key={i}
            x1={12 + Math.cos(a) * 7}
            y1={12 + Math.sin(a) * 7}
            x2={12 + Math.cos(a) * 9.5}
            y2={12 + Math.sin(a) * 9.5}
          />
        );
      })}
    </svg>
  );
}

export function DropletIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M12 3 C 12 3 5 11 5 15 a7 7 0 0 0 14 0 C 19 11 12 3 12 3 Z" />
    </svg>
  );
}

export function BloomIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => {
        const a = (-90 + i * 72) * (Math.PI / 180);
        return (
          <ellipse
            key={i}
            cx={12 + Math.cos(a) * 5}
            cy={12 + Math.sin(a) * 5}
            rx={3.4}
            ry={1.9}
            transform={`rotate(${-90 + i * 72} ${12 + Math.cos(a) * 5} ${12 + Math.sin(a) * 5})`}
          />
        );
      })}
      <circle cx="12" cy="12" r="1.6" />
    </svg>
  );
}

export function RulerIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
      <path d="M12 4 L 12 20" />
      <path d="M8 7 L 12 4 L 16 7" />
      <path d="M8 17 L 12 20 L 16 17" />
    </svg>
  );
}
