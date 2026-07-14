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

// A ring of tiny florets (for milkweed-style umbels).
function florets(cx: number, cy: number, r: number, count: number, dot = 3) {
  return Array.from({ length: count }, (_, i) => {
    const a = (360 / count) * i - 90;
    const rad = (a * Math.PI) / 180;
    const px = cx + Math.cos(rad) * r;
    const py = cy + Math.sin(rad) * r;
    return (
      <g key={i}>
        <line x1={cx} y1={cy} x2={px} y2={py} strokeWidth={1.2} />
        <circle cx={px} cy={py} r={dot} />
      </g>
    );
  });
}

// =====================================================================
//  Individual plants — each returns just its stroke geometry (no <svg>).
// =====================================================================

function WildColumbine() {
  // Arching stems with three nodding, spurred flowers.
  const bloom = (x: number, y: number, s: number) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-58, -30, 0, 30, 58].map((a, i) => (
        <path key={i} d="M0 0 Q 0 -14 3 -22" transform={`rotate(${a})`} />
      ))}
      <path d="M-11 0 Q -13 16 0 22 Q 13 16 11 0" />
      <path d="M-4 4 Q -5 15 0 20" strokeWidth={1.3} />
      <path d="M4 4 Q 5 15 0 20" strokeWidth={1.3} />
      <line x1={0} y1={20} x2={0} y2={30} strokeWidth={1.2} />
      <line x1={-3} y1={20} x2={-4} y2={29} strokeWidth={1.2} />
      <line x1={3} y1={20} x2={4} y2={29} strokeWidth={1.2} />
    </g>
  );
  return (
    <>
      <path d="M100 228 C 96 180 88 150 78 120" />
      <path d="M100 228 C 104 180 112 150 124 116" />
      <path d="M92 168 C 100 150 108 150 118 150" />
      {bloom(78, 112, 1)}
      {bloom(124, 108, 1.05)}
      {bloom(100, 92, 0.85)}
      {leaf(84, 224, 30, 17, -34)}
      {leaf(84, 224, 22, 13, -58)}
      {leaf(116, 224, 30, 17, 34)}
      {leaf(116, 224, 22, 13, 58)}
      {leaf(100, 226, 24, 15, 0)}
    </>
  );
}

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

function WoodlandPhlox() {
  const flower = (x: number, y: number, r: number, rot = 0) => (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {radialPetals(0, 0, 5, r * 0.72, r * 0.5, r * 0.34)}
      <circle cx={0} cy={0} r={r * 0.18} />
    </g>
  );
  return (
    <>
      <path d="M100 228 C 98 190 96 160 96 132" />
      <path d="M96 150 C 104 146 112 140 120 132" strokeWidth={1.5} />
      <path d="M96 168 C 88 164 82 160 76 152" strokeWidth={1.5} />
      {flower(84, 96, 20, 8)}
      {flower(120, 104, 19, -14)}
      {flower(102, 74, 21, 20)}
      {flower(76, 122, 16, 30)}
      {flower(126, 78, 15, -8)}
      {leaf(96, 150, 26, 12, -60)}
      {leaf(96, 150, 26, 12, 60)}
      {leaf(100, 190, 24, 11, -66)}
      {leaf(100, 190, 24, 11, 66)}
    </>
  );
}

function AmericanBellflower() {
  const star = (x: number, y: number, r: number, rot = 0) => (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {Array.from({ length: 5 }, (_, i) => {
        const a = -90 + i * 72;
        const rad = (a * Math.PI) / 180;
        return <path key={i} d={`M0 0 L ${Math.cos(rad) * r} ${Math.sin(rad) * r}`} />;
      })}
      {radialPetals(0, 0, 5, r * 0.5, r * 0.42, r * 0.2, -90)}
      <circle cx={0} cy={0} r={2} />
    </g>
  );
  return (
    <>
      <path d="M100 230 L 100 60" />
      {star(84, 88, 15, -20)}
      {star(118, 104, 15, 18)}
      {star(90, 124, 13, 10)}
      {star(112, 66, 14, -8)}
      {star(100, 148, 12, 0)}
      {[168, 190, 210].map((y, i) => (
        <g key={i}>
          {leaf(100, y, 30, 12, -68)}
          {leaf(100, y - 8, 28, 11, 70)}
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

function PokeMilkweed() {
  return (
    <>
      <path d="M100 230 L 100 70" />
      <path d="M100 96 C 78 100 70 112 66 124" />
      <path d="M100 90 C 122 94 132 108 138 122" />
      <path d="M100 80 C 96 96 98 104 100 112" />
      {florets(64, 130, 12, 9, 2.6)}
      {florets(140, 128, 12, 9, 2.6)}
      {florets(101, 118, 10, 8, 2.4)}
      {[150, 178, 206].map((y, i) => (
        <g key={i}>
          {leaf(100, y, 40, 22, -80)}
          {leaf(100, y, 40, 22, 80)}
        </g>
      ))}
    </>
  );
}

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

function GreatBlueLobelia() {
  const floret = (x: number, y: number, dir: number) => (
    <g transform={`translate(${x} ${y}) scale(${dir} 1)`}>
      <path d="M0 0 C 9 -4 15 -3 18 2" />
      <path d="M0 0 C 9 2 15 6 18 11" />
      <path d="M6 -1 L 12 -3 M6 2 L 13 4 M6 4 L 12 10" strokeWidth={1.1} />
    </g>
  );
  return (
    <>
      <path d="M100 232 L 100 60" />
      {Array.from({ length: 8 }, (_, i) => {
        const y = 74 + i * 15;
        return <g key={i}>{floret(100, y, i % 2 === 0 ? 1 : -1)}</g>;
      })}
      <path d="M100 60 C 96 52 104 52 100 46" strokeWidth={1.4} />
      {[150, 176, 202, 226].map((y, i) => (
        <g key={i}>
          {leaf(100, y, 30, 13, -72)}
          {leaf(100, y - 6, 28, 12, 74)}
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

function CutleafConeflower() {
  const flower = (x: number, y: number, r: number) => (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: 11 }, (_, i) => {
        const a = -90 + (360 / 11) * i;
        const rad = (a * Math.PI) / 180;
        const bx = Math.cos(rad) * r * 0.34;
        const by = Math.sin(rad) * r * 0.34;
        const tx = Math.cos(rad) * r;
        const ty = Math.sin(rad) * r;
        const mx = Math.cos(rad) * r * 0.85 - Math.sin(rad) * 5;
        const my = Math.sin(rad) * r * 0.85 + Math.cos(rad) * 5;
        return <path key={i} d={`M${bx} ${by} Q ${mx} ${my} ${tx} ${ty}`} />;
      })}
      <ellipse cx={0} cy={0} rx={r * 0.28} ry={r * 0.32} />
    </g>
  );
  return (
    <>
      <path d="M100 232 C 100 190 96 150 92 108" />
      <path d="M100 190 C 112 176 120 160 122 140" />
      {flower(92, 92, 22)}
      {flower(124, 122, 18)}
      {[
        [78, 176],
        [120, 200],
        [90, 214],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d="M0 0 L 0 -34" strokeWidth={1.3} />
          {[-26, -18, -10].map((yy, j) => (
            <g key={j}>
              <path d={`M0 ${yy} L -12 ${yy - 8}`} />
              <path d={`M0 ${yy} L 12 ${yy - 8}`} />
            </g>
          ))}
        </g>
      ))}
    </>
  );
}

function FirePink() {
  const flower = (x: number, y: number, r: number, rot = 0) => (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {Array.from({ length: 5 }, (_, i) => {
        const a = -90 + i * 72;
        const rad = (a * Math.PI) / 180;
        const nx = Math.cos(rad);
        const ny = Math.sin(rad);
        const px = -ny;
        const py = nx;
        const tipL = { x: nx * r + px * 3, y: ny * r + py * 3 };
        const tipR = { x: nx * r - px * 3, y: ny * r - py * 3 };
        const notch = { x: nx * r * 0.82, y: ny * r * 0.82 };
        return (
          <path
            key={i}
            d={`M0 0 L ${nx * r * 0.5 + px * 4} ${ny * r * 0.5 + py * 4} L ${tipL.x} ${tipL.y} L ${notch.x} ${notch.y} L ${tipR.x} ${tipR.y} L ${nx * r * 0.5 - px * 4} ${ny * r * 0.5 - py * 4} Z`}
          />
        );
      })}
      <circle cx={0} cy={0} r={2.4} />
    </g>
  );
  return (
    <>
      <path d="M100 232 C 100 196 98 168 96 138" />
      <path d="M96 160 C 106 156 114 150 120 140" strokeWidth={1.4} />
      {flower(92, 104, 22, 6)}
      {flower(126, 120, 17, -18)}
      {flower(108, 78, 15, 26)}
      {[168, 194, 218].map((y, i) => (
        <g key={i}>
          {leaf(100, y, 26, 8, -80)}
          {leaf(100, y, 26, 8, 80)}
        </g>
      ))}
    </>
  );
}

function DwarfCrestedIris() {
  return (
    <>
      {[-16, -4, 8, 20].map((a, i) => (
        <path key={i} d={`M100 230 C ${100 + a} 180 ${100 + a * 1.8} 140 ${100 + a * 2.2} 108`} />
      ))}
      <path d="M100 150 C 98 130 100 118 100 108" />
      <path d="M100 108 C 88 92 88 78 96 70 C 100 66 100 74 100 84" />
      <path d="M100 108 C 112 92 112 78 104 70 C 100 66 100 74 100 84" />
      <path d="M100 96 C 96 84 104 84 100 96" />
      <path d="M100 106 C 78 104 62 112 58 126 C 70 130 86 122 96 112" />
      <path d="M100 106 C 122 104 138 112 142 126 C 130 130 114 122 104 112" />
      <path d="M98 112 C 92 128 92 140 100 150 C 108 140 108 128 102 112" />
      <path d="M74 120 q 4 -4 8 0 M118 120 q 4 -4 8 0" strokeWidth={1.3} />
    </>
  );
}

function Bloodroot() {
  return (
    <>
      <path d="M118 210 C 108 168 110 150 118 138 C 150 140 168 168 158 196 C 150 214 130 216 118 210 Z" />
      <path d="M120 200 C 128 176 138 164 150 158" strokeWidth={1.2} />
      <path d="M124 196 L 140 190 M126 182 L 150 178 M130 170 L 148 164" strokeWidth={1.1} />
      <path d="M96 210 C 88 176 84 150 86 116" />
      <g transform="translate(86 96)">
        {radialPetals(0, 0, 8, 15, 12, 5)}
        <circle cx={0} cy={0} r={5} />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (360 / 12) * i;
          const rad = (a * Math.PI) / 180;
          return <line key={i} x1={0} y1={0} x2={Math.cos(rad) * 6} y2={Math.sin(rad) * 6} strokeWidth={1} />;
        })}
      </g>
    </>
  );
}

function WoodPoppy() {
  const flower = (x: number, y: number, r: number, rot = 0) => (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {radialPetals(0, 0, 4, r * 0.72, r * 0.62, r * 0.5, -90)}
      <circle cx={0} cy={0} r={r * 0.22} />
    </g>
  );
  const lobedLeaf = (x: number, y: number, s: number, flip = 1) => (
    <g transform={`translate(${x} ${y}) scale(${flip * s} ${s})`}>
      <path d="M0 0 C -4 -12 -2 -24 4 -34" strokeWidth={1.3} />
      <path d="M2 -6 C -10 -8 -16 -4 -18 4 C -8 6 -2 2 2 -4" />
      <path d="M3 -16 C -9 -18 -16 -14 -18 -6 C -8 -4 -2 -10 3 -14" />
      <path d="M4 -26 C -6 -30 -13 -26 -14 -18 C -6 -18 0 -22 4 -24" />
    </g>
  );
  return (
    <>
      <path d="M100 230 C 98 194 92 164 88 124" />
      <path d="M100 200 C 110 184 118 168 120 146" />
      <path d="M120 146 C 128 140 134 142 134 150 C 134 158 128 160 122 156" />
      {flower(88, 104, 24, 12)}
      {flower(118, 130, 17, -20)}
      {lobedLeaf(70, 210, 1.5, 1)}
      {lobedLeaf(130, 214, 1.5, -1)}
      {lobedLeaf(100, 224, 1.3, 1)}
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
  "wild-columbine": WildColumbine,
  "golden-ragwort": GoldenRagwort,
  "woodland-phlox": WoodlandPhlox,
  "american-bellflower": AmericanBellflower,
  "indian-pink": IndianPink,
  "poke-milkweed": PokeMilkweed,
  "cardinal-flower": CardinalFlower,
  "great-blue-lobelia": GreatBlueLobelia,
  "swamp-milkweed": SwampMilkweed,
  "sweet-joe-pye-weed": JoePyeWeed,
  "cutleaf-coneflower": CutleafConeflower,
  "fire-pink": FirePink,
  "dwarf-crested-iris": DwarfCrestedIris,
  bloodroot: Bloodroot,
  "wood-poppy": WoodPoppy,
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
