"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface LeadPhotoGalleryProps {
  photos: string[];
}

export function LeadPhotoGallery({ photos }: LeadPhotoGalleryProps) {
  const [active, setActive] = useState<string | null>(null);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Photos from canvasser ({photos.length})
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {photos.map((url) => (
          <button
            key={url}
            type="button"
            onClick={() => setActive(url)}
            className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100 hover:ring-2 hover:ring-orange-400 transition"
          >
            <Image
              src={url}
              alt="Lead photo"
              fill
              sizes="160px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative w-full max-w-4xl aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active}
              alt="Lead photo"
              fill
              sizes="(max-width: 1024px) 90vw, 896px"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
