// -------------------------------------------------------------------
// Central site configuration. Edit these values to update contact
// details, tagline, and social links everywhere on the site.
// -------------------------------------------------------------------

export const site = {
  name: "Knox Plant Guy",
  shortName: "Knox Plant Guy",
  tagline: "Shade & rain-garden natives, grown in Knoxville.",
  description:
    "Small-batch native perennials for East Tennessee shade gardens and rain gardens. Grown with care by a solo grower in Knoxville.",
  location: "Knoxville, Tennessee · USDA Zone 7b",

  // --- Contact + social (edit these) ---
  email: "hello@knoxplantguy.com",
  instagram: "https://instagram.com/knoxplantguy",
  facebook: "https://facebook.com/knoxplantguy",

  // Where you sell — shown on the home + about pages.
  market: "Fall farmers market & local pickup",
  seasonNote: "Fall sale window: mid-September through October.",
} as const;

export type Site = typeof site;
