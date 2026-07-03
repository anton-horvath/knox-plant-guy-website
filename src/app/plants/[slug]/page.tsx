import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import ProductGallery from "@/components/ProductGallery";
import PlantCard from "@/components/PlantCard";
import { SunIcon, DropletIcon, BloomIcon, RulerIcon } from "@/components/Icons";
import { site } from "@/lib/site";
import {
  getAllPlants,
  getPlantBySlug,
  getPlantsByGroup,
  groupMeta,
} from "@/data/plants";

// Pre-render every plant page at build time.
export function generateStaticParams() {
  return getAllPlants().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const plant = getPlantBySlug(slug);
  if (!plant) return { title: "Plant not found" };
  return {
    title: `${plant.common} (${plant.botanical})`,
    description: plant.tagline,
  };
}

export default async function PlantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plant = getPlantBySlug(slug);
  if (!plant) notFound();

  const meta = groupMeta[plant.group];
  const related = getPlantsByGroup(plant.group)
    .filter((p) => p.slug !== plant.slug)
    .slice(0, 3);

  const conditions = [
    { icon: SunIcon, label: "Light", value: plant.light },
    { icon: DropletIcon, label: "Moisture", value: plant.moisture },
    { icon: BloomIcon, label: "Bloom", value: plant.bloomSeason },
    { icon: RulerIcon, label: "Mature size", value: plant.height },
  ];

  const subject = encodeURIComponent(
    `Availability: ${plant.common} (${plant.botanical})`,
  );

  return (
    <>
      {/* Breadcrumb */}
      <Container className="pt-8">
        <nav className="font-serif text-sm text-stone">
          <Link href="/plants" className="transition-colors hover:text-ink">
            Plants
          </Link>
          <span className="px-2 text-mist">/</span>
          <span className="text-ink">{plant.common}</span>
        </nav>
      </Container>

      {/* Main */}
      <section className="py-10 sm:py-12">
        <Container className="grid gap-10 md:grid-cols-2 md:gap-14">
          <ProductGallery
            slug={plant.slug}
            common={plant.common}
            photoCount={plant.photoCount}
          />

          <div className="flex flex-col">
            <p className="eyebrow">{meta.label}</p>
            <h1 className="mt-3 font-display text-4xl font-light leading-tight text-ink sm:text-5xl">
              {plant.common}
            </h1>
            <p className="mt-2 font-serif text-lg italic text-stone">
              {plant.botanical}
            </p>

            <div className="mt-6 flex items-baseline gap-4">
              <span className="font-display text-3xl text-moss">
                ${plant.price}
              </span>
              <span className="font-serif text-sm text-stone">
                {plant.potSize}
              </span>
            </div>

            {/* Lifecycle — perennial vs. biennial */}
            <p className="mt-3 font-serif text-base text-stone">
              <span className="font-medium capitalize text-ink">
                {plant.lifecycle}
              </span>
              {" — "}
              {plant.lifecycle === "biennial"
                ? "grows a leafy rosette its first year, then blooms, sets seed, and finishes in its second."
                : "comes back on its own year after year once established."}
            </p>

            <p className="mt-6 font-serif text-lg leading-relaxed text-ink/90">
              {plant.description}
            </p>

            {/* Highlights */}
            {plant.highlights.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {plant.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-tan/70 bg-sand/40 px-4 py-1.5 font-serif text-sm text-fern"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {/* Conditions */}
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-mist bg-mist">
              {conditions.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-linen/60 p-5">
                  <Icon className="h-5 w-5 text-moss" />
                  <p className="mt-3 font-serif text-xs uppercase tracking-widest text-clay">
                    {label}
                  </p>
                  <p className="mt-1 font-serif text-base text-ink">{value}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 rounded-sm border border-mist bg-sand/30 p-6">
              <p className="font-serif text-base leading-relaxed text-stone">
                Interested in this plant? Availability changes through the
                season — email to reserve one or ask a growing question.
              </p>
              <a
                href={`mailto:${site.email}?subject=${subject}`}
                className="mt-4 inline-block rounded-sm bg-ink px-7 py-3 font-serif text-sm uppercase tracking-widest text-paper transition-colors hover:bg-fern"
              >
                Ask about availability
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-mist/70 py-16 sm:py-20">
          <Container>
            <h2 className="font-display text-2xl font-light text-ink sm:text-3xl">
              More from {meta.label.toLowerCase()}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PlantCard key={p.slug} plant={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
