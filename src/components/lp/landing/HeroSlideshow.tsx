"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDE_MS = 5500;
/** Extra slides wait this long so the first photo and the form load first. */
const MOUNT_DELAY_MS = 2500;

/** Slow crossfading background photos behind the hero headline. Decorative only. */
export function HeroSlideshow({ images }: { images: string[] }) {
  const [slide, setSlide] = useState({ active: 0, previous: -1 });
  const [mountAll, setMountAll] = useState(false);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setInterval> | undefined;
    const mount = setTimeout(() => {
      setMountAll(true);
      timer = setInterval(() => {
        setSlide(({ active }) => ({ active: (active + 1) % images.length, previous: active }));
      }, SLIDE_MS);
    }, MOUNT_DELAY_MS);

    return () => {
      clearTimeout(mount);
      if (timer) clearInterval(timer);
    };
  }, [images.length]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {images.map((src, i) => {
        if (i > 0 && !mountAll) return null;
        // The outgoing photo stays fully visible underneath while the next one fades in over it.
        const shown = i === slide.active || i === slide.previous;
        return (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-[1600ms] ease-in-out"
            style={{ opacity: shown ? 1 : 0, zIndex: i === slide.active ? 2 : i === slide.previous ? 1 : 0 }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${shown ? "lp-kenburns" : ""}`}
            />
          </div>
        );
      })}
    </div>
  );
}
