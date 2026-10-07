import type { Metadata } from "next";
import Container from "@/components/Container";
import { PlantArt } from "@/components/PlantArt";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Knox Plant Guy — small-batch native perennials grown by hand in Knoxville, Tennessee.",
};

const values = [
  {
    slug: "eastern-bluestar",
    title: "Grown from scratch",
    body: "Every plant starts here — seed cold-stratified through winter, then sown and grown on by hand. Nothing is bought in and flipped.",
  },
  {
    slug: "swamp-milkweed",
    title: "Native & local",
    body: "These are the plants that belong in East Tennessee: hosts for monarchs, nectar for native bees, and food for the birds that overwinter here.",
  },
  {
    slug: "mountain-mint",
    title: "Small batch, honest labels",
    body: "Slow growers are grown slowly; spreaders are labeled as spreaders. You get a healthy, honestly-described plant — not a forced one-season showpiece.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="border-b border-mist/70 py-16 sm:py-24">
        <Container className="grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow">About</p>
            <h1 className="mt-4 font-display text-4xl font-light leading-tight text-ink sm:text-5xl lg:text-6xl">
              A one-person nursery for
              <span className="italic text-moss"> Knoxville&apos;s shadier and wetter spots.</span>
            </h1>
            <div className="mt-8 max-w-xl space-y-5 font-serif text-lg leading-relaxed text-stone">
              <p>
                Living at the woodland edge and dealing with dense, moist clay soil taught me many expensive lessons about what plants work and what plants don&apos;t. I started growing my own native perennials and biennials to fill the gaps in my own garden, and now I grow them for other gardeners who want to do the same.
              </p>
              <p>
                I do things from scratch — seeds stratified through the cold months, seedlings potted up as their
                roots fill in, and quart-sized natives hardened off and ready for
                the ground. Each plant meticulously grown and honestly described, so you know what you&apos;re getting and how to care for it.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <PlantArt slug="indian-pink" className="h-72 w-auto sm:h-96" />
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title}>
                <div className="flex h-24 items-center justify-start">
                  <PlantArt slug={v.slug} className="h-full w-auto" />
                </div>
                <h2 className="mt-5 font-display text-2xl text-ink">{v.title}</h2>
                <p className="mt-3 font-serif text-base leading-relaxed text-stone">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact band */}
      <section className="border-t border-mist/70 bg-sand/30 py-16 sm:py-20">
        <Container className="max-w-3xl text-center">
          <p className="eyebrow">Say hello</p>
          <h2 className="mt-4 font-display text-3xl font-light leading-snug text-ink sm:text-4xl">
            Come find the plants in person.
          </h2>
          <p className="mt-5 font-serif text-lg leading-relaxed text-stone">
            {site.market} · {site.seasonNote} Have a question about a plant, your
            garden&apos;s conditions, or what&apos;s ready this week? I&apos;d love
            to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="rounded-sm bg-ink px-7 py-3 font-serif text-sm uppercase tracking-widest text-paper transition-colors hover:bg-fern"
            >
              {site.email}
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="font-serif text-sm uppercase tracking-widest text-stone underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              Instagram
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
