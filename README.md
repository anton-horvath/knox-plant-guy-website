# Knox Plant Guy

A calm, japandi-styled catalog site for a small native-plant nursery in
Knoxville, TN. Built with **Next.js** + **Tailwind CSS**, statically generated,
and cheap (free-tier) to host on **Vercel**.

- **Home** — hero, the three plant habitats, featured plants, season info.
- **Plants** (`/plants`) — the full catalog, grouped by habitat.
- **Plant pages** (`/plants/<slug>`) — one per plant, with photos + the black
  line-art illustration, growing conditions, and an email inquiry button.
  (These are intentionally not in the top navigation.)
- **About** (`/about`) — the story + contact.

Every plant is drawn as a black-outline botanical illustration that stands in
until you add real photos.

---

## Running it locally

Requires **Node 20 or newer** (this repo pins Node via `.nvmrc`).

```bash
nvm use          # or: nvm install 22
npm install
npm run dev      # http://localhost:3000
```

Other commands: `npm run build` (production build), `npm start` (serve the
build), `npm run lint`.

---

## ✏️ Adding / removing / editing plants

**Everything lives in one file: [`src/data/plants.ts`](src/data/plants.ts).**

### Add a plant
Copy an existing block in the `plants` array, then edit the fields. The only
hard requirement is a unique `slug` (lowercase, hyphenated — it becomes the URL,
e.g. `wild-columbine` → `/plants/wild-columbine`).

```ts
{
  slug: "trout-lily",
  botanical: "Erythronium americanum",
  common: "Trout Lily",
  group: "shade",            // "shade" | "wet" | "specialty"
  lifecycle: "perennial",    // "perennial" | "biennial"
  tagline: "Mottled leaves and nodding yellow bells.",
  description: "A longer sentence or two for the plant page…",
  light: "Part to full shade",
  moisture: "Medium",
  bloomSeason: "March–April",
  bloomColor: "golden yellow",
  height: "4–8 in",
  price: 12,                  // fall quart price
  potSize: "Quart",
  featured: true,            // optional — shows on the home page
  highlights: ["Spring ephemeral", "Woodland charm"],
  photoCount: 0,             // number of photos you've added (see below)
},
```

### Remove a plant
Delete its block. To keep it in the file but hide it from the site, set
`available: false` instead.

### Reorder / regroup
Plants appear in the order listed within each group. Move blocks up or down to
reorder. Change `group` to move a plant to a different habitat section.

No other files need editing — the home page, catalog, individual page, sitemap,
and navigation all read from this one list automatically.

---

## 📸 Adding photos

1. Create a folder named after the plant's `slug` inside `public/plants/`,
   e.g. `public/plants/trout-lily/`.
2. Drop in photos named `1.jpg`, `2.jpg`, `3.jpg`, …
3. Set that plant's `photoCount` in `src/data/plants.ts` to how many you added.

The plant page then shows a photo gallery (with the line drawing as the first
thumbnail). Until you add photos, it shows the drawing with a "Photographs
coming soon" note. See [`public/plants/README.md`](public/plants/README.md).

---

## 🖊️ The black-outline illustrations

Each plant has a hand-drawn SVG line illustration in
[`src/components/outlines.tsx`](src/components/outlines.tsx), keyed by `slug`.
When you add a new plant, it automatically falls back to a generic sprig until
you draw one. To add a custom drawing, copy one of the existing components,
tweak the paths, and register it in the `registry` map at the bottom of the file.

---

## 🎨 Changing the look

- **Colors & fonts** — [`src/app/globals.css`](src/app/globals.css) (the
  `@theme` block). Palette: paper/linen/sand/tan neutrals, soft-black ink, and
  moss/sage greens. Fonts are Fraunces (headings) + EB Garamond (body).
- **Business name, tagline, email, socials, market info** —
  [`src/lib/site.ts`](src/lib/site.ts). Edit these and they update everywhere.

---

## 🚀 Deploying to Vercel (free)

1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import the
   repo. Vercel auto-detects Next.js; no configuration needed. Click **Deploy**.
3. You get a free `*.vercel.app` URL. To use your own domain, add it under
   **Project → Settings → Domains** and point your DNS at Vercel.

The site is fully static, so it stays comfortably within Vercel's free (Hobby)
tier. Every push to the repo redeploys automatically.

> Alternative free hosts that work the same way: **Netlify** or
> **Cloudflare Pages**.

---

## Before you go live — quick checklist

- [ ] Update contact + social links in `src/lib/site.ts` (currently placeholders).
- [ ] Confirm prices and plant descriptions in `src/data/plants.ts`.
- [ ] Add photos for your hero/featured plants at least.
