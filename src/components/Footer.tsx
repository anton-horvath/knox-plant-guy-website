import Link from "next/link";
import Container from "./Container";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-mist/70 bg-linen/60">
      <Container className="grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg text-ink">{site.name}</p>
          <p className="mt-3 max-w-xs font-serif text-sm leading-relaxed text-stone">
            {site.tagline}
          </p>
          <p className="mt-4 font-serif text-sm text-stone">{site.location}</p>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 font-serif text-sm">
            <li>
              <Link href="/plants" className="text-stone transition-colors hover:text-ink">
                The Plants
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-stone transition-colors hover:text-ink">
                About the Grower
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Find Us</p>
          <ul className="mt-4 space-y-2 font-serif text-sm">
            <li className="text-stone">{site.market}</li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-stone transition-colors hover:text-ink"
              >
                {site.email}
              </a>
            </li>
            <li className="flex gap-4 pt-1">
              <a
                href={site.instagram}
                className="text-stone transition-colors hover:text-ink"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                href={site.facebook}
                className="text-stone transition-colors hover:text-ink"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="border-t border-mist/60 py-6">
        <p className="font-serif text-xs text-stone/80">
          © {new Date().getFullYear()} {site.name}. Grown by hand in Knoxville, Tennessee.
        </p>
      </Container>
    </footer>
  );
}
