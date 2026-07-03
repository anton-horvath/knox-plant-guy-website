import Link from "next/link";
import type { Plant } from "@/data/plants";
import { groupMeta } from "@/data/plants";
import { PlantOutline } from "./outlines";

export default function PlantCard({ plant }: { plant: Plant }) {
  return (
    <Link
      href={`/plants/${plant.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-mist bg-linen/50 transition-all duration-300 hover:-translate-y-1 hover:border-tan hover:shadow-[0_18px_40px_-24px_rgba(28,27,24,0.45)]"
    >
      {/* Outline panel */}
      <div className="relative flex aspect-[4/5] items-center justify-center bg-paper/70 p-8">
        <span className="eyebrow absolute left-4 top-4 text-[0.6rem]">
          {groupMeta[plant.group].short}
        </span>
        <PlantOutline
          slug={plant.slug}
          className="h-full w-auto text-ink/90 transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col border-t border-mist px-5 py-5">
        <h3 className="font-display text-xl leading-tight text-ink">
          {plant.common}
        </h3>
        <p className="mt-0.5 font-serif text-sm italic text-stone">
          {plant.botanical}
        </p>
        <p className="mt-3 flex-1 font-serif text-sm leading-relaxed text-stone/90">
          {plant.tagline}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-mist/70 pt-3">
          <span className="font-display text-lg text-moss">${plant.price}</span>
          <span className="font-serif text-xs uppercase tracking-widest text-clay">
            {plant.potSize}
          </span>
        </div>
      </div>
    </Link>
  );
}
