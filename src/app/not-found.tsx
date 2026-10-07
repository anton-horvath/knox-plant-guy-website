import Link from "next/link";
import Container from "@/components/Container";
import { PlantArt } from "@/components/PlantArt";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-28 text-center">
      <PlantArt slug="eastern-bluestar" className="h-40 w-auto" />
      <p className="eyebrow mt-8">Nothing growing here</p>
      <h1 className="mt-4 font-display text-4xl font-light text-ink sm:text-5xl">
        Page not found.
      </h1>
      <p className="mt-4 max-w-md font-serif text-lg text-stone">
        That page may have gone dormant. Let&apos;s get you back to the garden.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-sm bg-ink px-7 py-3 font-serif text-sm uppercase tracking-widest text-paper transition-colors hover:bg-fern"
      >
        Back home
      </Link>
    </Container>
  );
}
