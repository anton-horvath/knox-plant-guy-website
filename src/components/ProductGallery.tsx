"use client";

import { useState } from "react";
import Image from "next/image";
import { PlantOutline } from "./outlines";

// Shows the plant's photos with the signature line-art as the first view.
// Photos live at /public/plants/<slug>/1.jpg, 2.jpg, ... — set the plant's
// `photoCount` in src/data/plants.ts to how many you've added.
export default function ProductGallery({
  slug,
  common,
  photoCount,
}: {
  slug: string;
  common: string;
  photoCount: number;
}) {
  const photos = Array.from(
    { length: photoCount },
    (_, i) => `/plants/${slug}/${i + 1}.jpg`,
  );

  // View 0 is always the outline; views 1..n are photos.
  const [active, setActive] = useState(0);
  const showingOutline = active === 0;

  return (
    <div>
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-sm border border-mist bg-linen/40">
        {showingOutline ? (
          <>
            <PlantOutline slug={slug} className="h-4/5 w-auto text-ink/90" />
            {photoCount === 0 && (
              <span className="absolute bottom-4 left-0 right-0 text-center font-serif text-xs uppercase tracking-widest text-clay">
                Photographs coming soon
              </span>
            )}
          </>
        ) : (
          <Image
            src={photos[active - 1]}
            alt={`${common} — photo ${active}`}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        )}
      </div>

      {/* Thumbnails */}
      {photoCount > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          <Thumb
            selected={showingOutline}
            onClick={() => setActive(0)}
            label="Illustration"
          >
            <PlantOutline slug={slug} className="h-10 w-auto text-ink/80" />
          </Thumb>
          {photos.map((src, i) => (
            <Thumb
              key={src}
              selected={active === i + 1}
              onClick={() => setActive(i + 1)}
              label={`Photo ${i + 1}`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </Thumb>
          ))}
        </div>
      )}
    </div>
  );
}

function Thumb({
  children,
  selected,
  onClick,
  label,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={selected}
      className={`relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-sm border bg-paper/70 transition-colors ${
        selected ? "border-moss" : "border-mist hover:border-tan"
      }`}
    >
      {children}
    </button>
  );
}
