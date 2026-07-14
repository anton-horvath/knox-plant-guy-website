// =====================================================================
//  PLANT CATALOG
//  ---------------------------------------------------------------------
//  This is the single source of truth for every plant on the site.
//  To ADD a plant:   copy a block below, change the fields, and give it
//                    a unique `slug`. Add a matching outline in
//                    src/components/outlines.tsx (optional but nice).
//  To REMOVE a plant: delete its block.
//  To HIDE a plant:   set `available: false` (kept in code, off the site).
//  Photos live in:    public/plants/<slug>/1.jpg, 2.jpg, ...
//                     set `photoCount` to how many you've added.
// =====================================================================

export type PlantGroup = "shade" | "wet" | "specialty";

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
  specialty: {
    label: "Specialty & Collector",
    short: "Specialty",
    blurb:
      "Slower, rarer, and worth the wait — spring-blooming treasures grown in small numbers.",
  },
};

export const plants: Plant[] = [
  // ---------------------------- SHADE ----------------------------
  {
    slug: "wild-columbine",
    botanical: "Aquilegia canadensis",
    common: "Wild Columbine",
    group: "shade",
    lifecycle: "perennial",
    palette: { bloom: ["#b0674c", "#c99f52"], foliage: ["#7f8c66", "#5f6d4c"] },
    tagline: "Nodding red-and-gold lanterns for the shade edge.",
    description:
      "Delicate, spurred flowers dangle like little lanterns above lacy blue-green foliage. One of the easiest and most rewarding natives — quick from seed, long-lived, and a magnet for early hummingbirds and native bees. Happy in dry to medium woodland soil and gently self-sows into pleasing drifts.",
    light: "Part shade",
    moisture: "Dry to medium",
    bloomSeason: "April–May",
    bloomColor: "red & yellow",
    height: "1–3 ft",
    price: 10,
    springPrice: 14,
    potSize: "Quart",
    featured: true,
    highlights: ["Hummingbird favorite", "Self-sows gently", "Deer-resistant"],
    photoCount: 0,
  },
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
    highlights: ["Evergreen groundcover", "Spreads to fill", "Early-season nectar"],
    photoCount: 0,
  },
  {
    slug: "woodland-phlox",
    botanical: "Phlox divaricata",
    common: "Woodland Phlox",
    group: "shade",
    lifecycle: "perennial",
    palette: { bloom: ["#9a97ba", "#b8a9c6"], foliage: ["#7f8c66", "#5f6d4c"] },
    tagline: "Fragrant clouds of lavender-blue.",
    description:
      "Loose clusters of five-petaled, sweetly fragrant flowers float in a haze of lavender-blue over low, spreading foliage. Slow and precious from seed, it settles in to form soft drifts along a shady path. A classic companion to columbine and phlox-loving swallowtails.",
    light: "Part to full shade",
    moisture: "Medium",
    bloomSeason: "April–May",
    bloomColor: "lavender-blue",
    height: "10–14 in",
    price: 12,
    springPrice: 16,
    potSize: "Quart",
    featured: true,
    highlights: ["Fragrant", "Butterfly nectar", "Forms drifts"],
    photoCount: 0,
  },
  {
    slug: "american-bellflower",
    botanical: "Campanula americana",
    common: "American Bellflower",
    group: "shade",
    lifecycle: "biennial",
    palette: { bloom: ["#8aa2b8"], foliage: ["#828e63", "#5e6b47"] },
    tagline: "Tall summer spires of five-pointed blue stars.",
    description:
      "A graceful woodland-edge biennial: leafy rosettes the first year, then towering stems ringed with flat, star-shaped blue flowers the next summer. Wonderful for a naturalistic planting where it can reseed and drift. Honestly labeled — this one is a patient gardener's plant, blooming in its second year.",
    light: "Part shade",
    moisture: "Medium to moist",
    bloomSeason: "July–September (year 2)",
    bloomColor: "sky blue",
    height: "3–6 ft",
    price: 10,
    potSize: "Quart",
    highlights: ["Biennial — blooms year two", "Reseeds", "Bee & butterfly nectar"],
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
      "The showstopper of the shade garden — upright clusters of crimson tubes flare open into brilliant yellow stars, irresistible to hummingbirds. Slow to size up, so every plant is grown with patience; the reward is a tidy, clump-forming perennial that gets better every year. Our flagship plant.",
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
    slug: "poke-milkweed",
    botanical: "Asclepias exaltata",
    common: "Poke Milkweed",
    group: "shade",
    lifecycle: "perennial",
    palette: { bloom: ["#d7cbb5", "#c6b0a6"], foliage: ["#7f8b64", "#5c6a49"] },
    tagline: "The rare milkweed that thrives in shade.",
    description:
      "An uncommon woodland milkweed with drooping umbels of pale green-and-white flowers on tall, poke-like stems. A genuine monarch host plant for shadier gardens where common milkweeds sulk — scarce in the trade and quietly beautiful.",
    light: "Part shade",
    moisture: "Medium",
    bloomSeason: "June–July",
    bloomColor: "white & blush",
    height: "3–6 ft",
    price: 13,
    potSize: "Quart",
    highlights: ["Monarch host", "Shade-tolerant milkweed", "Uncommon"],
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
    slug: "great-blue-lobelia",
    botanical: "Lobelia siphilitica",
    common: "Great Blue Lobelia",
    group: "wet",
    lifecycle: "perennial",
    palette: { bloom: ["#6f86a6"], foliage: ["#79865f", "#586646"] },
    tagline: "Cardinal flower's cool blue counterpart.",
    description:
      "Spikes of rich blue, two-lipped flowers carry the wet garden into fall, when little else is blooming. Reliable and long-lived in moist soil, a favorite of bumblebees, and a beautiful partner planted alongside its scarlet cousin.",
    light: "Part shade",
    moisture: "Wet",
    bloomSeason: "August–September",
    bloomColor: "true blue",
    height: "2–3 ft",
    price: 10,
    potSize: "Quart",
    highlights: ["Late-season bloom", "Bumblebee favorite", "Rain-garden reliable"],
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
    slug: "cutleaf-coneflower",
    botanical: "Rudbeckia laciniata",
    common: "Cutleaf Coneflower",
    group: "wet",
    lifecycle: "perennial",
    palette: { bloom: ["#c9a24c"], foliage: ["#849066", "#5f6d4a"] },
    tagline: "Sunny recurved petals on towering stems.",
    description:
      "Bright yellow daisies with gracefully drooping rays and a green central knob wave atop tall, branching stems — cheerful, tough, and fast-growing in moist ground. Feeds late-summer pollinators and sets seed that goldfinches love.",
    light: "Part shade",
    moisture: "Moist to wet",
    bloomSeason: "July–September",
    bloomColor: "golden yellow",
    height: "4–8 ft",
    price: 9,
    potSize: "Quart",
    highlights: ["Fast & tough", "Goldfinch seed", "Late-summer color"],
    photoCount: 0,
  },

  // --------------------------- SPECIALTY ---------------------------
  {
    slug: "bloodroot",
    botanical: "Sanguinaria canadensis",
    common: "Bloodroot",
    group: "specialty",
    lifecycle: "perennial",
    palette: { bloom: ["#e7ded0", "#cfa24f"], foliage: ["#7d8a64", "#5a6948"] },
    tagline: "A fleeting, pure-white spring ephemeral.",
    description:
      "Among the first to greet spring — a single, snow-white flower with a golden center unfurls from a scroll of sculptural, scalloped leaf. Short-lived in bloom but unforgettable, with handsome foliage that carries on afterward. Grown patiently from division; a true collector's woodland treasure.",
    light: "Part to full shade",
    moisture: "Medium",
    bloomSeason: "March–April",
    bloomColor: "pure white",
    height: "6–10 in",
    price: 13,
    springPrice: 16,
    potSize: "Quart",
    featured: true,
    highlights: ["Early spring ephemeral", "Sculptural foliage", "Collector favorite"],
    photoCount: 0,
  },
  {
    slug: "wood-poppy",
    botanical: "Stylophorum diphyllum",
    common: "Celandine / Wood Poppy",
    group: "specialty",
    lifecycle: "perennial",
    palette: { bloom: ["#cca049"], foliage: ["#8a9568", "#63704b"] },
    tagline: "Buttery poppies over deeply cut leaves.",
    description:
      "Four-petaled, satiny yellow poppies bloom for weeks above lobed, blue-green foliage, then nod into fuzzy seed pods. A cheerful, long-blooming brightener for the shade garden that gently self-sows once it feels at home.",
    light: "Part to full shade",
    moisture: "Medium to moist",
    bloomSeason: "April–June",
    bloomColor: "golden yellow",
    height: "12–18 in",
    price: 11,
    springPrice: 14,
    potSize: "Quart",
    highlights: ["Long bloom", "Self-sows", "Bold foliage"],
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

export const groupOrder: PlantGroup[] = ["shade", "wet", "specialty"];
