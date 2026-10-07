import type { ReactNode } from "react";

// =====================================================================
//  PLANT GEOMETRY — minimal botanical line drawings.
//  Each plant is a set of stroke paths (fill:none). The geometry is kept
//  separate from the SVG wrapper so it can be reused two ways:
//    • <PlantOutline/>  — the original black line-art (currentColor).
//    • <PlantArt/>      — soft watercolor washes + this linework on top
//                         (see PlantArt.tsx).
//  Keyed by slug; unknown slugs fall back to a generic sprig.
// =====================================================================

const VB = "0 0 200 240";

// SVG wrapper for the plain line-art version.
function O({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <svg
      viewBox={VB}
      className={className}
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.1}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

// ---- small geometry helpers ---------------------------------------

// A pointed leaf whose base sits at (x,y), tip `len` away, rotated `angle`.
function leaf(x: number, y: number, len: number, wid: number, angle: number, key?: string | number) {
  const h = wid / 2;
  const d = `M0 0 C ${-h} ${-len * 0.42}, ${-h} ${-len * 0.78}, 0 ${-len} C ${h} ${-len * 0.78}, ${h} ${-len * 0.42}, 0 0 Z`;
  return (
    <g key={key} transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path d={d} />
      <path d={`M0 -4 L 0 ${-len + 6}`} strokeWidth={1.3} />
    </g>
  );
}

// Radial ellipse petals around a center (long axis pointing outward).
function radialPetals(
  cx: number,
  cy: number,
  count: number,
  dist: number,
  rx: number,
  ry: number,
  start = -90,
) {
  return Array.from({ length: count }, (_, i) => {
    const a = start + (360 / count) * i;
    const rad = (a * Math.PI) / 180;
    const px = cx + Math.cos(rad) * dist;
    const py = cy + Math.sin(rad) * dist;
    return <ellipse key={i} cx={px} cy={py} rx={rx} ry={ry} transform={`rotate(${a} ${px} ${py})`} />;
  });
}

// =====================================================================
//  Individual plants — each returns just its stroke geometry (no <svg>).
// =====================================================================

// ---------------------------- SHADE ----------------------------

function GoldenRagwort() {
  const daisy = (x: number, y: number, r: number) => (
    <g transform={`translate(${x} ${y})`}>
      {radialPetals(0, 0, 10, r, r * 0.55, r * 0.24)}
      <circle cx={0} cy={0} r={r * 0.34} />
    </g>
  );
  return (
    <>
      {[70, 100, 130, 85, 115].map((x, i) => (
        <line key={i} x1={100} y1={150} x2={x} y2={70 + (i % 2) * 14} strokeWidth={1.4} />
      ))}
      <path d="M100 228 C 100 200 100 175 100 152" />
      {daisy(70, 66, 12)}
      {daisy(130, 70, 12)}
      {daisy(100, 54, 13)}
      {daisy(85, 84, 10)}
      {daisy(116, 88, 10)}
      <path d="M100 226 C 74 224 60 208 66 192 C 82 188 98 200 100 220" />
      <path d="M100 226 C 126 224 140 208 134 192 C 118 188 102 200 100 220" />
      <path d="M100 226 C 92 210 92 196 100 186 C 108 196 108 210 100 226" />
    </>
  );
}

function GoldenAlexanders() {
  // Flat-topped compound umbels of tiny florets + divided foliage.
  const umbel = (cx: number, cy: number, r: number, n: number) => (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const a = -158 + (136 / (n - 1)) * i;
        const rad = (a * Math.PI) / 180;
        const px = cx + Math.cos(rad) * r;
        const py = cy + Math.sin(rad) * r * 0.72;
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={px} y2={py} strokeWidth={1} />
            <circle cx={px} cy={py} r={2} />
            <circle cx={px - 2.4} cy={py + 1.6} r={1.3} />
            <circle cx={px + 2.4} cy={py + 1.6} r={1.3} />
          </g>
        );
      })}
    </g>
  );
  return (
    <>
      <path d="M100 230 L 100 98" />
      <path d="M100 150 C 86 140 80 128 80 110" />
      <path d="M100 140 C 116 132 122 120 122 104" />
      {umbel(100, 86, 24, 7)}
      {umbel(80, 106, 18, 6)}
      {umbel(122, 100, 18, 6)}
      {[160, 192].map((y, i) => (
        <g key={i}>
          {leaf(100, y, 26, 11, -70)}
          {leaf(100, y, 22, 9, -42)}
          {leaf(100, y, 26, 11, 70)}
          {leaf(100, y, 22, 9, 42)}
          {leaf(100, y + 2, 20, 9, 0)}
        </g>
      ))}
    </>
  );
}

function IndianPink() {
  const tube = (x: number, y: number, len: number, rot: number) => (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d={`M-4 0 L -3 ${-len} M4 0 L 3 ${-len}`} />
      {Array.from({ length: 5 }, (_, i) => {
        const a = -90 + i * 72;
        const rad = (a * Math.PI) / 180;
        return <path key={i} d={`M0 ${-len} L ${Math.cos(rad) * 6} ${-len + Math.sin(rad) * 6}`} />;
      })}
    </g>
  );
  return (
    <>
      <path d="M100 230 L 100 118" />
      {tube(92, 116, 30, -18)}
      {tube(108, 116, 30, 16)}
      {tube(96, 110, 34, -6)}
      {tube(106, 108, 33, 6)}
      {tube(100, 104, 30, 0)}
      {[150, 176, 202].map((y, i) => (
        <g key={i}>
          {leaf(100, y, 32, 15, -78)}
          {leaf(100, y, 32, 15, 78)}
        </g>
      ))}
    </>
  );
}

function EasternBluestar() {
  // Domed cluster of small five-point stars + narrow willowy leaves.
  const star = (x: number, y: number, r: number) => (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: 5 }, (_, i) => {
        const a = -90 + i * 72;
        const rad = (a * Math.PI) / 180;
        return <path key={i} d={`M0 0 L ${Math.cos(rad) * r} ${Math.sin(rad) * r}`} />;
      })}
      {radialPetals(0, 0, 5, r * 0.52, r * 0.4, r * 0.18, -90)}
    </g>
  );
  return (
    <>
      <path d="M100 230 L 100 104" />
      {star(100, 82, 9)}
      {star(84, 94, 8)}
      {star(116, 94, 8)}
      {star(92, 106, 7)}
      {star(110, 106, 7)}
      {[130, 150, 170, 190, 210].map((y, i) => (
        <g key={i}>
          {leaf(100, y, 24, 6, -82)}
          {leaf(100, y, 24, 6, 82)}
        </g>
      ))}
    </>
  );
}

function MountainMint() {
  // Branched, flat silvery button-clusters + opposite narrow leaves.
  const cluster = (cx: number, cy: number, r: number) => (
    <g>
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.6} />
      {[
        [-r * 0.5, 0],
        [0, -r * 0.25],
        [r * 0.5, 0],
        [0, r * 0.25],
        [0, 0],
      ].map(([dx, dy], i) => (
        <circle key={i} cx={cx + dx} cy={cy + dy} r={1.2} />
      ))}
      {[-150, -90, -30, 30, 90, 150].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <path
            key={`b${i}`}
            d={`M${cx + Math.cos(rad) * r} ${cy + Math.sin(rad) * r * 0.6} l ${Math.cos(rad) * 4} ${Math.sin(rad) * 2.4}`}
            strokeWidth={1}
          />
        );
      })}
    </g>
  );
  return (
    <>
      <path d="M100 230 L 100 118" />
      <path d="M100 150 C 86 140 80 128 80 112" />
      <path d="M100 142 C 116 132 122 120 122 108" />
      {cluster(100, 96, 15)}
      {cluster(79, 106, 12)}
      {cluster(123, 102, 12)}
      {[160, 184, 208].map((y, i) => (
        <g key={i}>
          {leaf(100, y, 26, 8, -74)}
          {leaf(100, y, 26, 8, 74)}
        </g>
      ))}
    </>
  );
}

// -------------------------- RAIN GARDEN --------------------------

function CardinalFlower() {
  const floret = (x: number, y: number, dir: number) => (
    <g transform={`translate(${x} ${y}) scale(${dir} 1)`}>
      <path d="M0 0 C 10 -3 16 -1 20 4" />
      <path d="M0 0 C 10 3 16 6 21 10" />
      <path d="M8 1 L 15 -2 M8 3 L 16 6 M8 4 L 13 10" strokeWidth={1.1} />
    </g>
  );
  return (
    <>
      <path d="M100 232 L 100 52" />
      {Array.from({ length: 8 }, (_, i) => {
        const y = 64 + i * 14;
        return <g key={i}>{floret(100, y, i % 2 === 0 ? 1 : -1)}</g>;
      })}
      <circle cx={100} cy={54} r={3} />
      {[196, 214, 230].map((y, i) => (
        <g key={i}>
          {leaf(100, y, 24, 9, -76)}
          {leaf(100, y - 5, 22, 8, 78)}
        </g>
      ))}
    </>
  );
}

function SwampMilkweed() {
  const dome = (cx: number, cy: number, r: number, n: number) => (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const a = -180 + (180 / (n - 1)) * i;
        const rad = (a * Math.PI) / 180;
        const px = cx + Math.cos(rad) * r;
        const py = cy + Math.sin(rad) * r * 0.8;
        return (
          <g key={i}>
            <line x1={cx} y1={cy + 4} x2={px} y2={py} strokeWidth={1.1} />
            <circle cx={px} cy={py} r={2.6} />
          </g>
        );
      })}
    </g>
  );
  return (
    <>
      <path d="M100 230 L 100 96" />
      <path d="M100 120 C 84 116 78 108 76 96" />
      <path d="M100 112 C 116 108 122 100 124 90" />
      {dome(76, 92, 14, 7)}
      {dome(124, 86, 14, 7)}
      {dome(100, 78, 15, 8)}
      {[150, 176, 202, 224].map((y, i) => (
        <g key={i}>
          {leaf(100, y, 30, 9, -82)}
          {leaf(100, y, 30, 9, 82)}
        </g>
      ))}
    </>
  );
}

function JoePyeWeed() {
  return (
    <>
      <path d="M100 232 L 100 96" />
      <path d="M62 92 C 70 58 130 58 138 92" />
      {Array.from({ length: 11 }, (_, i) => {
        const a = -170 + (160 / 10) * i;
        const rad = (a * Math.PI) / 180;
        const px = 100 + Math.cos(rad) * 34;
        const py = 92 + Math.sin(rad) * 30;
        return (
          <g key={i}>
            <line x1={100} y1={94} x2={px} y2={py} strokeWidth={1} />
            {[-6, 0, 6].map((d, j) => (
              <line key={j} x1={px} y1={py} x2={px + d} y2={py - 7} strokeWidth={1} />
            ))}
          </g>
        );
      })}
      {[132, 160, 188].map((y, i) => (
        <g key={i}>
          {leaf(100, y, 34, 12, -90)}
          {leaf(100, y, 34, 12, 90)}
          {leaf(100, y, 26, 10, -50)}
          {leaf(100, y, 26, 10, 50)}
        </g>
      ))}
    </>
  );
}

function PinkTurtlehead() {
  // Terminal cluster of hooded "turtlehead" flowers + opposite leaves.
  const hood = (x: number, y: number, s: number, rot: number) => (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M-6 2 C -8 -12 8 -12 6 2" />
      <path d="M-5 2 C -3 8 3 8 5 2" />
      <path d="M-4 2 L 4 2" strokeWidth={1} />
    </g>
  );
  return (
    <>
      <path d="M100 232 L 100 74" />
      {hood(100, 84, 1, 0)}
      {hood(90, 98, 0.95, -14)}
      {hood(110, 98, 0.95, 14)}
      {hood(100, 106, 0.9, 0)}
      {[140, 166, 192, 216].map((y, i) => (
        <g key={i}>
          {leaf(100, y, 28, 11, -74)}
          {leaf(100, y - 4, 26, 10, 76)}
        </g>
      ))}
    </>
  );
}

function GenericSprig() {
  return (
    <>
      <path d="M100 230 C 100 180 100 140 100 96" />
      {radialPetals(100, 82, 6, 16, 13, 6)}
      <circle cx={100} cy={82} r={5} />
      {[150, 178, 206].map((y, i) => (
        <g key={i}>
          {leaf(100, y, 30, 13, -70)}
          {leaf(100, y - 6, 28, 12, 72)}
        </g>
      ))}
    </>
  );
}

// ---- registry ------------------------------------------------------

type ContentFn = () => ReactNode;

const registry: Record<string, ContentFn> = {
  "golden-ragwort": GoldenRagwort,
  "golden-alexanders": GoldenAlexanders,
  "indian-pink": IndianPink,
  "eastern-bluestar": EasternBluestar,
  "mountain-mint": MountainMint,
  "cardinal-flower": CardinalFlower,
  "swamp-milkweed": SwampMilkweed,
  "sweet-joe-pye-weed": JoePyeWeed,
  "pink-turtlehead": PinkTurtlehead,
};

function labelFor(slug: string): string {
  return `${slug.replace(/-/g, " ")} botanical illustration`;
}

// Raw stroke geometry for a slug (no <svg> wrapper) — used by PlantArt.
export function OutlineContent({ slug }: { slug: string }) {
  const Content = registry[slug] ?? GenericSprig;
  return <Content />;
}

// The original black line-art version, in its own <svg>.
export function PlantOutline({ slug, className }: { slug: string; className?: string }) {
  const Content = registry[slug] ?? GenericSprig;
  return (
    <O className={className} label={labelFor(slug)}>
      <Content />
    </O>
  );
}

export function hasOutline(slug: string): boolean {
  return slug in registry;
}

export const OUTLINE_VIEWBOX = VB;
