import Image from "next/image";
import type { IdeaPhoto } from "@/lib/lp-landing";

function Row({ photos, reverse = false }: { photos: IdeaPhoto[]; reverse?: boolean }) {
  return (
    <div className="lp-marquee flex overflow-hidden">
      {/* The list is rendered twice so the loop has no seam. */}
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className={`lp-marquee-track flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4 ${reverse ? "lp-marquee-reverse" : ""}`}
        >
          {photos.map((photo) => (
            <li
              key={photo.src}
              className="relative h-[180px] w-[250px] shrink-0 overflow-hidden rounded-lg bg-muted sm:h-[250px] sm:w-[360px]"
            >
              <Image
                src={photo.src}
                alt={copy === 0 ? photo.label : ""}
                fill
                sizes="(min-width: 640px) 360px, 250px"
                className="object-cover"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8 text-sm font-medium text-white">
                {photo.label}
              </span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

/** Two rows of style idea photos drifting in opposite directions. */
export function IdeasMarquee({ photos }: { photos: IdeaPhoto[] }) {
  const half = Math.ceil(photos.length / 2);
  return (
    <div className="space-y-3 sm:space-y-4">
      <Row photos={photos.slice(0, half)} />
      <Row photos={photos.slice(half)} reverse />
    </div>
  );
}
