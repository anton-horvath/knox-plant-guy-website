import type { Metadata } from "next";
import Container from "@/components/Container";
import PlantCard from "@/components/PlantCard";
import {
  getAllPlants,
  getPlantsByGroup,
  groupMeta,
  groupOrder,
} from "@/data/plants";

export const metadata: Metadata = {
  title: "Plants",
  description:
    "The full catalog of native shade and rain-garden perennials grown by Knox Plant Guy in Knoxville, Tennessee.",
};

export default function PlantsPage() {
  const total = getAllPlants().length;

  return (
    <>
      {/* Header */}
      <section className="border-b border-mist/70 py-16 sm:py-20">
        <Container>
          <p className="eyebrow">The Catalog · {total} natives</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-light leading-tight text-ink sm:text-5xl">
            Every plant we&apos;re growing this year.
          </h1>
          <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-stone">
            Browse by habitat below. Each drawing shows the plant in its mature
            form — tap through for photographs, growing notes, and pricing.
          </p>

          {/* jump links */}
          <div className="mt-8 flex flex-wrap gap-3">
            {groupOrder.map((g) => (
              <a
                key={g}
                href={`#${g}`}
                className="rounded-full border border-mist bg-linen/50 px-5 py-2 font-serif text-sm text-stone transition-colors hover:border-tan hover:text-ink"
              >
                {groupMeta[g].label}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Groups */}
      {groupOrder.map((g) => {
        const meta = groupMeta[g];
        const list = getPlantsByGroup(g);
        if (list.length === 0) return null;
        return (
          <section key={g} id={g} className="scroll-mt-24 py-14 sm:py-16">
            <Container>
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">
                  {meta.label}
                </h2>
                <p className="mt-3 font-serif text-base leading-relaxed text-stone">
                  {meta.blurb}
                </p>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p) => (
                  <PlantCard key={p.slug} plant={p} />
                ))}
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
