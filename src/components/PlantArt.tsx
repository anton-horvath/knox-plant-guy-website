import { getPlantBySlug, type PlantPalette } from "@/data/plants";
import { OutlineContent, OUTLINE_VIEWBOX } from "./outlines";

// =====================================================================
//  PLANT ART — soft "watercolor" illustration of each plant.
//  Two layers on a transparent background:
//    1. color WASHES — layered, blurred, edge-displaced ellipses painted
//       from the plant's `palette` (bloom + foliage). Positions come from
//       the per-plant `washMap` below, roughly tracing the flowers/leaves.
//    2. ink LINEWORK — the shared geometry from outlines.tsx drawn on top
//       in a soft warm-black, so petal/leaf STRUCTURE stays legible.
//
//  The washes are intentionally loose — watercolor bleeds past the lines,
//  which reads as painterly rather than a coloring-book fill.
//
//  To tune a plant's COLORS: edit its `palette` in src/data/plants.ts.
//  To tune WHERE the paint sits: edit its entry in `washMap` below.
//  A plant with no washMap entry gets a sensible generic wash.
// =====================================================================

// Color roles resolved against the plant's palette.
type Role = "b" | "b2" | "l" | "l2";
interface Wash {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rot?: number;
  c: Role;
}

const FALLBACK: PlantPalette = { bloom: ["#c3a26a"], foliage: ["#7c8a6a"] };

const genericWash: Wash[] = [
  { x: 100, y: 84, rx: 20, ry: 18, c: "b" },
  { x: 100, y: 84, rx: 11, ry: 10, c: "b2" },
  { x: 100, y: 180, rx: 24, ry: 15, c: "l" },
  { x: 100, y: 206, rx: 20, ry: 12, c: "l2" },
];

// Blob positions mirror the geometry in outlines.tsx (viewBox 200×240).
const washMap: Record<string, Wash[]> = {
  "wild-columbine": [
    { x: 78, y: 112, rx: 15, ry: 13, c: "b" },
    { x: 124, y: 108, rx: 15, ry: 13, c: "b" },
    { x: 100, y: 93, rx: 13, ry: 12, c: "b" },
    { x: 78, y: 114, rx: 7, ry: 6, c: "b2" },
    { x: 124, y: 110, rx: 7, ry: 6, c: "b2" },
    { x: 100, y: 95, rx: 6, ry: 5, c: "b2" },
    { x: 100, y: 214, rx: 30, ry: 15, c: "l" },
    { x: 100, y: 220, rx: 18, ry: 9, c: "l2" },
  ],
  "golden-ragwort": [
    { x: 70, y: 66, rx: 13, ry: 12, c: "b" },
    { x: 130, y: 70, rx: 13, ry: 12, c: "b" },
    { x: 100, y: 55, rx: 14, ry: 13, c: "b" },
    { x: 85, y: 84, rx: 11, ry: 10, c: "b" },
    { x: 116, y: 88, rx: 11, ry: 10, c: "b" },
    { x: 82, y: 208, rx: 24, ry: 14, c: "l" },
    { x: 118, y: 210, rx: 24, ry: 14, c: "l" },
    { x: 100, y: 196, rx: 18, ry: 11, c: "l2" },
  ],
  "woodland-phlox": [
    { x: 84, y: 96, rx: 14, ry: 13, c: "b" },
    { x: 120, y: 104, rx: 13, ry: 12, c: "b" },
    { x: 102, y: 74, rx: 14, ry: 13, c: "b" },
    { x: 76, y: 122, rx: 11, ry: 10, c: "b2" },
    { x: 126, y: 78, rx: 10, ry: 9, c: "b2" },
    { x: 96, y: 175, rx: 16, ry: 11, c: "l" },
    { x: 100, y: 200, rx: 16, ry: 11, c: "l" },
    { x: 96, y: 150, rx: 11, ry: 8, c: "l2" },
  ],
  "american-bellflower": [
    { x: 84, y: 88, rx: 12, ry: 11, c: "b" },
    { x: 118, y: 104, rx: 12, ry: 11, c: "b" },
    { x: 90, y: 124, rx: 11, ry: 10, c: "b" },
    { x: 112, y: 66, rx: 11, ry: 10, c: "b" },
    { x: 100, y: 148, rx: 10, ry: 9, c: "b" },
    { x: 100, y: 185, rx: 20, ry: 13, c: "l" },
    { x: 100, y: 210, rx: 18, ry: 11, c: "l2" },
  ],
  "indian-pink": [
    { x: 98, y: 110, rx: 15, ry: 14, c: "b" },
    { x: 104, y: 104, rx: 11, ry: 11, c: "b" },
    { x: 96, y: 112, rx: 10, ry: 10, c: "b" },
    { x: 98, y: 104, rx: 6, ry: 5, c: "b2" },
    { x: 104, y: 99, rx: 5, ry: 4, c: "b2" },
    { x: 100, y: 176, rx: 24, ry: 14, c: "l" },
    { x: 100, y: 202, rx: 22, ry: 13, c: "l2" },
  ],
  "poke-milkweed": [
    { x: 64, y: 130, rx: 13, ry: 12, c: "b" },
    { x: 140, y: 128, rx: 13, ry: 12, c: "b" },
    { x: 101, y: 118, rx: 11, ry: 10, c: "b" },
    { x: 64, y: 130, rx: 6, ry: 6, c: "b2" },
    { x: 140, y: 128, rx: 6, ry: 6, c: "b2" },
    { x: 100, y: 178, rx: 34, ry: 20, c: "l" },
    { x: 100, y: 206, rx: 30, ry: 18, c: "l2" },
  ],
  "cardinal-flower": [
    { x: 100, y: 80, rx: 13, ry: 22, c: "b" },
    { x: 100, y: 120, rx: 14, ry: 24, c: "b" },
    { x: 100, y: 152, rx: 11, ry: 16, c: "b" },
    { x: 88, y: 100, rx: 6, ry: 6, c: "b" },
    { x: 112, y: 130, rx: 6, ry: 6, c: "b" },
    { x: 100, y: 212, rx: 20, ry: 12, c: "l" },
  ],
  "great-blue-lobelia": [
    { x: 100, y: 92, rx: 13, ry: 22, c: "b" },
    { x: 100, y: 132, rx: 14, ry: 24, c: "b" },
    { x: 100, y: 160, rx: 11, ry: 14, c: "b" },
    { x: 100, y: 165, rx: 20, ry: 12, c: "l" },
    { x: 100, y: 205, rx: 20, ry: 12, c: "l2" },
  ],
  "swamp-milkweed": [
    { x: 76, y: 92, rx: 13, ry: 10, c: "b" },
    { x: 124, y: 86, rx: 13, ry: 10, c: "b" },
    { x: 100, y: 78, rx: 14, ry: 11, c: "b" },
    { x: 76, y: 92, rx: 6, ry: 5, c: "b2" },
    { x: 124, y: 86, rx: 6, ry: 5, c: "b2" },
    { x: 100, y: 180, rx: 18, ry: 12, c: "l" },
    { x: 100, y: 210, rx: 16, ry: 11, c: "l2" },
  ],
  "sweet-joe-pye-weed": [
    { x: 100, y: 88, rx: 32, ry: 22, c: "b" },
    { x: 100, y: 84, rx: 22, ry: 15, c: "b2" },
    { x: 72, y: 150, rx: 20, ry: 10, c: "l" },
    { x: 128, y: 152, rx: 20, ry: 10, c: "l" },
    { x: 100, y: 190, rx: 22, ry: 12, c: "l2" },
  ],
  "cutleaf-coneflower": [
    { x: 92, y: 92, rx: 18, ry: 17, c: "b" },
    { x: 124, y: 122, rx: 15, ry: 14, c: "b" },
    { x: 92, y: 92, rx: 6, ry: 6, c: "l2" },
    { x: 124, y: 122, rx: 5, ry: 5, c: "l2" },
    { x: 84, y: 190, rx: 18, ry: 11, c: "l" },
    { x: 112, y: 206, rx: 18, ry: 11, c: "l" },
  ],
  "fire-pink": [
    { x: 92, y: 104, rx: 15, ry: 14, c: "b" },
    { x: 126, y: 120, rx: 12, ry: 11, c: "b" },
    { x: 108, y: 78, rx: 11, ry: 10, c: "b" },
    { x: 100, y: 180, rx: 16, ry: 10, c: "l" },
    { x: 100, y: 206, rx: 16, ry: 10, c: "l2" },
  ],
  "dwarf-crested-iris": [
    { x: 100, y: 112, rx: 20, ry: 15, c: "b" },
    { x: 100, y: 100, rx: 11, ry: 11, c: "b2" },
    { x: 74, y: 124, rx: 9, ry: 7, c: "b" },
    { x: 126, y: 124, rx: 9, ry: 7, c: "b" },
    { x: 88, y: 172, rx: 9, ry: 36, rot: -14, c: "l" },
    { x: 112, y: 172, rx: 9, ry: 36, rot: 14, c: "l2" },
  ],
  bloodroot: [
    { x: 86, y: 96, rx: 16, ry: 15, c: "b" },
    { x: 86, y: 96, rx: 5, ry: 5, c: "b2" },
    { x: 138, y: 178, rx: 26, ry: 30, rot: 8, c: "l" },
    { x: 140, y: 190, rx: 18, ry: 20, c: "l2" },
  ],
  "wood-poppy": [
    { x: 88, y: 104, rx: 19, ry: 18, c: "b" },
    { x: 118, y: 130, rx: 14, ry: 13, c: "b" },
    { x: 74, y: 205, rx: 20, ry: 12, c: "l" },
    { x: 126, y: 208, rx: 20, ry: 12, c: "l" },
    { x: 100, y: 220, rx: 18, ry: 11, c: "l2" },
  ],
};

// Shared SVG filter for the soft watercolor bleed. Rendered once (in the
// root layout) so all PlantArt instances reference url(#wcWash) cheaply.
// A plain Gaussian blur is GPU-accelerated and stays smooth even with a
// full grid of illustrations on screen; the ragged, organic edges come
// from layering several offset ellipses per wash (see PlantArt below),
// not from an expensive turbulence/displacement filter.
export function WatercolorDefs() {
  return (
    <svg
      aria-hidden="true"
      width="0"
      height="0"
      style={{ position: "absolute", pointerEvents: "none" }}
    >
      <defs>
        <filter
          id="wcWash"
          x="-25%"
          y="-25%"
          width="150%"
          height="150%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation={2.8} />
        </filter>
      </defs>
    </svg>
  );
}

export function PlantArt({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const plant = getPlantBySlug(slug);
  const pal = plant?.palette ?? FALLBACK;
  const washes = washMap[slug] ?? genericWash;

  const color = (c: Role) =>
    c === "b"
      ? pal.bloom[0]
      : c === "b2"
        ? (pal.bloom[1] ?? pal.bloom[0])
        : c === "l"
          ? pal.foliage[0]
          : (pal.foliage[1] ?? pal.foliage[0]);

  return (
    <svg
      viewBox={OUTLINE_VIEWBOX}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${plant?.common ?? "Plant"} watercolor illustration`}
    >
      {/* 1 · color washes — three overlapping, offset dabs per blob give an
          organic pooled edge once the shared blur softens them. */}
      <g filter="url(#wcWash)">
        {washes.map((w, i) => {
          const fill = color(w.c);
          const transform = w.rot ? `rotate(${w.rot} ${w.x} ${w.y})` : undefined;
          const ox = ((i % 3) - 1) * w.rx * 0.22;
          const oy = ((i % 2) - 0.5) * w.ry * 0.34;
          return (
            <g key={i} transform={transform}>
              {/* soft outer halo */}
              <ellipse cx={w.x} cy={w.y} rx={w.rx * 1.3} ry={w.ry * 1.3} fill={fill} opacity={0.24} />
              {/* offset mid pool */}
              <ellipse
                cx={w.x + ox}
                cy={w.y + oy}
                rx={w.rx * 0.92}
                ry={w.ry * 0.92}
                fill={fill}
                opacity={0.42}
              />
              {/* denser pigment core */}
              <ellipse
                cx={w.x - ox * 0.7}
                cy={w.y - oy * 0.6}
                rx={w.rx * 0.6}
                ry={w.ry * 0.6}
                fill={fill}
                opacity={0.5}
              />
            </g>
          );
        })}
      </g>

      {/* 2 · ink linework (crisp, on top) */}
      <g
        fill="none"
        stroke="#3a362d"
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.82}
      >
        <OutlineContent slug={slug} />
      </g>
    </svg>
  );
}
