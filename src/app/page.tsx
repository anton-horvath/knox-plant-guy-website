import Link from "next/link";
import Container from "@/components/Container";
import PlantCard from "@/components/PlantCard";
import { PlantArt } from "@/components/PlantArt";
import { site } from "@/lib/site";
import {
  getFeaturedPlants,
  getPlantsByGroup,
  groupMeta,
  groupOrder,
} from "@/data/plants";

export default function HomePage() {
  const featured = getFeaturedPlants().slice(0, 4);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden">
        <Container className="grid items-center gap-10 py-16 sm:py-24 md:grid-cols-[1.15fr_0.85fr] md:gap-6">
          <div>
            <p className="eyebrow">{site.location}</p>
            <h1 className="mt-5 font-display text-5xl font-light leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Native plants,
              <br />
              <span className="italic text-moss">grown in Knoxville.</span>
            </h1>
            <p className="mt-7 max-w-md font-serif text-lg leading-relaxed text-stone">
              {site.description}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/plants"
                className="rounded-sm bg-ink px-7 py-3 font-serif text-sm uppercase tracking-widest text-paper transition-colors hover:bg-fern"
              >
                Browse the Plants
              </Link>
              <Link
                href="/about"
                className="font-serif text-sm uppercase tracking-widest text-stone underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* Hero outline arrangement */}
          <div className="relative mx-auto flex h-72 w-full max-w-sm items-end justify-center gap-2 sm:h-96">
            <PlantArt slug="cardinal-flower" className="h-[85%] w-auto" />
            <PlantArt slug="wild-columbine" className="h-[70%] w-auto" />
            <PlantArt slug="bloodroot" className="h-[55%] w-auto" />
          </div>
        </Container>
        <div className="mx-auto h-px w-full max-w-6xl bg-mist/70" />
      </section>

      {/* ---------------- Collections ---------------- */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow">Three habitats</p>
            <h2 className="mt-4 font-display text-3xl font-light text-ink sm:text-4xl">
              Grown for the places most gardens forget.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {groupOrder.map((g) => {
              const meta = groupMeta[g];
              const sample = getPlantsByGroup(g)[0];
              return (
                <Link
                  key={g}
                  href={`/plants#${g}`}
                  className="group flex flex-col rounded-sm border border-mist bg-linen/40 p-8 transition-colors hover:border-tan"
                >
                  <div className="flex h-28 items-center justify-center">
                    {sample && (
                      <PlantArt
                        slug={sample.slug}
                        className="h-full w-auto transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <h3 className="mt-6 font-display text-2xl text-ink">
                    {meta.label}
                  </h3>
                  <p className="mt-3 font-serif text-sm leading-relaxed text-stone">
                    {meta.blurb}
                  </p>
                  <span className="mt-5 font-serif text-xs uppercase tracking-widest text-clay transition-colors group-hover:text-moss">
                    Explore →
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ---------------- Featured ---------------- */}
      <section className="border-y border-mist/70 bg-sand/30 py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="eyebrow">This season&apos;s stars</p>
              <h2 className="mt-4 font-display text-3xl font-light text-ink sm:text-4xl">
                A few favorites.
              </h2>
            </div>
            <Link
              href="/plants"
              className="font-serif text-sm uppercase tracking-widest text-stone underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              See all plants →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <PlantCard key={p.slug} plant={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------- Season band ---------------- */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">When to find us</p>
            <h2 className="mt-4 font-display text-3xl font-light leading-snug text-ink sm:text-4xl">
              Sold in the fall, in bloom by spring.
            </h2>
            <p className="mt-6 max-w-md font-serif text-lg leading-relaxed text-stone">
              {site.seasonNote} Everything is started from seed or division right
              here in Knoxville — no shipping, no big-box middlemen, just healthy
              quart-sized natives ready for your garden.
            </p>
            <div className="mt-8">
              <a
                href={`mailto:${site.email}`}
                className="rounded-sm border border-ink px-7 py-3 font-serif text-sm uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Get in Touch
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <PlantArt
              slug="sweet-joe-pye-weed"
              className="h-64 w-auto sm:h-80"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
