// =====================================================================
//  PLANT CATALOG
//  ---------------------------------------------------------------------
//  This is the single source of truth for every plant on the site.
//  To ADD a plant:   copy a block below, change the fields, and give it
//                    a unique `slug`. Add a matching outline in
//                    src/components/outlines.tsx + a washMap entry in
//                    src/components/PlantArt.tsx (optional but nice).
//  To REMOVE a plant: delete its block.
//  To HIDE a plant:   set `available: false` (kept in code, off the site).
//  Photos live in:    public/plants/<slug>/1.jpg, 2.jpg, ...
//                     set `photoCount` to how many you've added.
// =====================================================================

export type PlantGroup = "shade" | "wet";

// How the plant lives: a perennial returns for many years; a biennial
// grows leaves year one, blooms & sets seed year two, then is done.
export type Lifecycle = "perennial" | "biennial";

// Muted, earthy hues used to paint the watercolor illustration.
// `bloom` = the flower color(s); `foliage` = the leaf/stem greens.
// Keep these soft and desaturated so they sit in the japandi palette.
export interface PlantPalette {
  bloom: string[]; // 1–2 hex colors for the flowers
  foliage: string[]; // 1–2 hex greens for leaves/stems
}

export interface Plant {
  slug: string;
  botanical: string;
  common: string;
  group: PlantGroup;
  /** Short evocative one-liner shown under the name. */
  tagline: string;
  /** One or two sentences for the product page. */
  description: string;

  // Growing conditions
  lifecycle: Lifecycle; // "perennial" | "biennial"
  /** Colors for the watercolor illustration (see PlantPalette). */
  palette: PlantPalette;
  light: string;
  moisture: string;
  bloomSeason: string;
  bloomColor: string; // plain-english, drives the little color dot
  height: string;

  // Selling
  price: number; // fall quart price, USD
  springPrice?: number; // higher in-bloom spring price, if held over
  potSize: string;

  // Presentation
  featured?: boolean;
  available?: boolean; // default true; set false to hide from the site
  highlights: string[]; // short bullets (wildlife value, habit, etc.)
  photoCount: number; // number of real photos in public/plants/<slug>/
}

export const groupMeta: Record<
  PlantGroup,
  { label: string; short: string; blurb: string }
> = {
  shade: {
    label: "Woodland & Shade",
    short: "Shade",
    blurb:
      "Understory perennials for dappled light — the quiet floor of an Eastern forest brought into the garden.",
  },
  wet: {
    label: "Rain Garden & Wet",
    short: "Rain Garden",
    blurb:
      "Moisture-lovers for low spots, rain gardens, and pond edges — lush foliage and pollinator-heavy blooms.",
  },
};

export const plants: Plant[] = [
  // ---------------------------- SHADE ----------------------------
  {
    slug: "golden-ragwort",
    botanical: "Packera aurea",
    common: "Golden Ragwort",
    group: "shade",
    lifecycle: "perennial",
    palette: { bloom: ["#c9a24c"], foliage: ["#8a9568", "#63704b"] },
    tagline: "A living carpet lit with gold each spring.",
    description:
      "Evergreen rosettes of rounded, purple-backed leaves spread into a weed-smothering groundcover, then throw up airy stems of bright golden daisies in spring. Vigorous and forgiving in moist shade — one of the best native alternatives to turf or ivy in a damp, shady spot.",
    light: "Part to full shade",
    moisture: "Moist to wet",
    bloomSeason: "April–May",
    bloomColor: "golden yellow",
    height: "1–2 ft in bloom",
    price: 9,
    springPrice: 12,
    potSize: "Quart",
    featured: true,
    highlights: ["Evergreen groundcover", "Spreads to fill", "Early-season nectar"],
    photoCount: 0,
  },
  {
    slug: "golden-alexanders",
    botanical: "Zizia aurea",
    common: "Golden Alexanders",
    group: "shade",
    lifecycle: "perennial",
    palette: { bloom: ["#c9a24c"], foliage: ["#7f8c66", "#5f6d4c"] },
    tagline: "Flat golden umbels for the late-spring edge.",
    description:
      "Tidy domes of tiny golden-yellow flowers float over clean, divided foliage from mid-spring into early summer — an easygoing, long-lived woodland-edge native. A key host plant for black swallowtail butterflies, and the foliage stays handsome well past bloom.",
    light: "Part shade",
    moisture: "Medium to moist",
    bloomSeason: "April–June",
    bloomColor: "golden yellow",
    height: "1–3 ft",
    price: 10,
    springPrice: 13,
    potSize: "Quart",
    highlights: ["Swallowtail host", "Tidy foliage", "Reliable & long-lived"],
    photoCount: 0,
  },
  {
    slug: "indian-pink",
    botanical: "Spigelia marilandica",
    common: "Indian Pink",
    group: "shade",
    lifecycle: "perennial",
    palette: { bloom: ["#b3543f", "#c99f52"], foliage: ["#7c8a66", "#59684a"] },
    tagline: "Scarlet trumpets tipped with a yellow star.",
    description:
      "The showstopper of the shade garden — upright clusters of crimson tubes flare open into brilliant yellow stars, irresistible to hummingbirds. Slow to size up, so every plant is grown with patience; the reward is a tidy, clump-forming perennial with glossy foliage that gets better every year. Our flagship plant.",
    light: "Part shade",
    moisture: "Medium to moist",
    bloomSeason: "May–June",
    bloomColor: "scarlet & yellow",
    height: "1–2 ft",
    price: 16,
    springPrice: 22,
    potSize: "Quart",
    featured: true,
    highlights: ["Hummingbird magnet", "Clump-forming", "Collector premium"],
    photoCount: 0,
  },
  {
    slug: "eastern-bluestar",
    botanical: "Amsonia tabernaemontana",
    common: "Eastern Bluestar",
    group: "shade",
    lifecycle: "perennial",
    palette: { bloom: ["#9aadc0", "#b4c0cc"], foliage: ["#7e8b63", "#5b6a48"] },
    tagline: "Powder-blue stars, then golden fall foliage.",
    description:
      "Clusters of soft, powder-blue star-shaped flowers open in spring above lush, willowy foliage that turns a glowing gold in autumn — a long-lived, trouble-free native with three seasons of interest. An uncommon straight species, adaptable to almost any garden.",
    light: "Part shade",
    moisture: "Medium to moist",
    bloomSeason: "April–May",
    bloomColor: "powder blue",
    height: "2–3 ft",
    price: 13,
    springPrice: 17,
    potSize: "Quart",
    featured: true,
    highlights: ["Golden fall color", "Long-lived", "Uncommon species"],
    photoCount: 0,
  },
  {
    slug: "mountain-mint",
    botanical: "Pycnanthemum muticum",
    common: "Short-toothed Mountain Mint",
    group: "shade",
    lifecycle: "perennial",
    palette: { bloom: ["#cfcebd", "#b9c2ad"], foliage: ["#8a9472", "#5f6d4c"] },
    tagline: "Months of silvery bracts, alive with pollinators.",
    description:
      "One of the very best pollinator plants there is — frosted, silver-green bracts surround tiny flowers for months, drawing clouds of bees and butterflies through summer and fall. Aromatic, deer-proof foliage spreads by runners, so give it room to naturalize.",
    light: "Part shade",
    moisture: "Medium to moist",
    bloomSeason: "July–September",
    bloomColor: "silvery white",
    height: "1.5–3 ft",
    price: 11,
    potSize: "Quart",
    highlights: ["Top pollinator plant", "Aromatic & deer-proof", "Spreads to naturalize"],
    photoCount: 0,
  },

  // -------------------------- RAIN GARDEN --------------------------
  {
    slug: "cardinal-flower",
    botanical: "Lobelia cardinalis",
    common: "Cardinal Flower",
    group: "wet",
    lifecycle: "perennial",
    palette: { bloom: ["#b0463a"], foliage: ["#77855f", "#566448"] },
    tagline: "The most vivid red in the native garden.",
    description:
      "Nothing else glows quite like it — tall spikes packed with velvety, true-scarlet flowers that hummingbirds cannot resist. Loves consistently moist to wet soil at a pond edge or in a rain garden, blooming right through the late-summer sale season.",
    light: "Part shade",
    moisture: "Wet",
    bloomSeason: "July–September",
    bloomColor: "scarlet red",
    height: "2–4 ft",
    price: 11,
    potSize: "Quart",
    featured: true,
    highlights: ["Hummingbird magnet", "Rain-garden star", "Long bloom"],
    photoCount: 0,
  },
  {
    slug: "swamp-milkweed",
    botanical: "Asclepias incarnata",
    common: "Swamp Milkweed",
    group: "wet",
    lifecycle: "perennial",
    palette: { bloom: ["#bf8b96", "#d0a7ac"], foliage: ["#7e8b63", "#5b6a48"] },
    tagline: "Fragrant pink for monarchs and moist soil.",
    description:
      "Softly vanilla-scented, dusky-pink flower clusters sit atop upright stems all summer — a premier monarch host and nectar plant that, despite the name, is easygoing in any reliably moist garden soil. Butterflies, bees, and the occasional monarch caterpillar included.",
    light: "Sun to part shade",
    moisture: "Wet",
    bloomSeason: "June–August",
    bloomColor: "rose pink",
    height: "3–4 ft",
    price: 10,
    potSize: "Quart",
    highlights: ["Monarch host", "Fragrant", "Easy & long-lived"],
    photoCount: 0,
  },
  {
    slug: "sweet-joe-pye-weed",
    botanical: "Eutrochium purpureum",
    common: "Sweet Joe Pye Weed",
    group: "wet",
    lifecycle: "perennial",
    palette: { bloom: ["#ab8c9c", "#c0a6b0"], foliage: ["#7b8860", "#586646"] },
    tagline: "Architectural stems crowned in mauve haze.",
    description:
      "A stately back-of-border native — whorled leaves climb tall, vanilla-scented stems topped with big, domed clouds of dusty-mauve flowers that hum with butterflies and bees in late summer. Commanding structure for a rain garden or moist meadow edge.",
    light: "Part shade",
    moisture: "Moist to wet",
    bloomSeason: "July–September",
    bloomColor: "mauve-pink",
    height: "5–7 ft",
    price: 10,
    potSize: "Quart",
    highlights: ["Pollinator magnet", "Bold structure", "Vanilla-scented"],
    photoCount: 0,
  },
  {
    slug: "pink-turtlehead",
    botanical: "Chelone obliqua",
    common: "Pink Turtlehead",
    group: "wet",
    lifecycle: "perennial",
    palette: { bloom: ["#c48b9a", "#d4a6b0"], foliage: ["#77855f", "#56644a"] },
    tagline: "Rose-pink hooded blooms for the fall water's edge.",
    description:
      "Curious, hooded rose-pink flowers — each like a little turtle's head — crowd the tops of upright stems from late summer into fall, just when the rain garden needs color most. Clump-forming and uncommon in the trade, and a host plant for the Baltimore checkerspot butterfly.",
    light: "Part shade",
    moisture: "Moist to wet",
    bloomSeason: "August–October",
    bloomColor: "rose pink",
    height: "2–3 ft",
    price: 12,
    potSize: "Quart",
    highlights: ["Late-season bloom", "Baltimore checkerspot host", "Uncommon in trade"],
    photoCount: 0,
  },
];

// ---------------------------- Helpers ----------------------------

export function getAllPlants(): Plant[] {
  return plants.filter((p) => p.available !== false);
}

export function getPlantBySlug(slug: string): Plant | undefined {
  return getAllPlants().find((p) => p.slug === slug);
}

export function getPlantsByGroup(group: PlantGroup): Plant[] {
  return getAllPlants().filter((p) => p.group === group);
}

export function getFeaturedPlants(): Plant[] {
  return getAllPlants().filter((p) => p.featured);
}

export const groupOrder: PlantGroup[] = ["shade", "wet"];
