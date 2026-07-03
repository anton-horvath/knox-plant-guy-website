import Link from "next/link";
import Container from "./Container";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/plants", label: "Plants" },
  { href: "/about", label: "About" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-mist/70 bg-paper/85 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="group flex items-center gap-3">
          <span className="font-display text-lg tracking-tight text-ink sm:text-xl">
            {site.name}
          </span>
        </Link>

        <nav>
          <ul className="flex items-center gap-6 sm:gap-9">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative font-serif text-sm tracking-wide text-stone transition-colors hover:text-ink sm:text-[0.95rem]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

function Sprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 36 C 20 26 20 18 20 10" />
      <path d="M20 20 C 12 18 8 12 8 6 C 15 6 19 11 20 18" />
      <path d="M20 16 C 28 14 32 8 32 3 C 25 3 21 8 20 14" />
    </svg>
  );
}
