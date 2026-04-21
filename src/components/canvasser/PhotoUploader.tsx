"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Camera, Image as ImageIcon, Loader2, X } from "lucide-react";

const MAX_PHOTOS = 10;

type Slot =
  | { id: string; state: "uploading"; preview: string }
  | { id: string; state: "uploaded"; preview: string; url: string }
  | { id: string; state: "error"; preview: string; error: string };

interface PhotoUploaderProps {
  photos: string[];
  onChange: (photos: string[]) => void;
}

export function PhotoUploader({ photos, onChange }: PhotoUploaderProps) {
  const [slots, setSlots] = useState<Slot[]>(() =>
    photos.map((url, i) => ({
      id: `existing-${i}`,
      state: "uploaded" as const,
      preview: url,
      url,
    }))
  );

  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  // Keep a stable ref to the latest onChange so the sync effect below
  // doesn't re-fire every time the parent re-renders.
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Sync uploaded URLs to parent whenever slots change. Guarded against
  // redundant emissions so we never cause a render loop.
  const lastEmittedRef = useRef<string>("");
  useEffect(() => {
    const urls = slots
      .filter((s): s is Extract<Slot, { state: "uploaded" }> => s.state === "uploaded")
      .map((s) => s.url);
    const key = urls.join("|");
    if (key !== lastEmittedRef.current) {
      lastEmittedRef.current = key;
      onChangeRef.current(urls);
    }
  }, [slots]);

  const uploadedCount = slots.filter((s) => s.state === "uploaded").length;

  async function uploadFile(file: File) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const preview = URL.createObjectURL(file);

    setSlots((prev) => [...prev, { id, state: "uploading", preview }]);

    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/canvasser/upload", {
        method: "POST",
        body: form,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Upload failed");
      }
      const data = (await res.json()) as { url: string };

      setSlots((prev) =>
        prev.map((s) =>
          s.id === id
            ? ({ id, state: "uploaded", preview, url: data.url } satisfies Slot)
            : s
        )
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      toast.error(message);
      setSlots((prev) =>
        prev.map((s) =>
          s.id === id ? ({ id, state: "error", preview, error: message } satisfies Slot) : s
        )
      );
    }
  }

  async function handleFiles(files: FileList | null) {
    if (!files) return;
    const slotsLeft = Math.max(0, MAX_PHOTOS - uploadedCount);
    const picked = Array.from(files).slice(0, slotsLeft);
    if (files.length > slotsLeft) {
      toast.error(`You can only add ${MAX_PHOTOS} photos per lead.`);
    }
    for (const file of picked) {
      await uploadFile(file);
    }
    if (cameraRef.current) cameraRef.current.value = "";
    if (galleryRef.current) galleryRef.current.value = "";
  }

  function removeSlot(id: string) {
    setSlots((prev) => prev.filter((s) => s.id !== id));
  }

  const full = uploadedCount >= MAX_PHOTOS;

  return (
    <div className="space-y-4">
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {slots.map((slot) => (
          <div
            key={slot.id}
            className={`relative aspect-square rounded-xl overflow-hidden border-2 bg-gray-100 ${
              slot.state === "error" ? "border-red-400" : "border-gray-200"
            }`}
          >
            <Image
              src={slot.preview}
              alt="Lead photo"
              fill
              sizes="160px"
              unoptimized
              className="object-cover"
            />
            {slot.state === "uploading" && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            )}
            {slot.state === "error" && (
              <div className="absolute inset-0 bg-red-500/70 flex items-end p-2">
                <p className="text-xs text-white font-medium leading-tight">
                  Upload failed — remove and retry
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={() => removeSlot(slot.id)}
              className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 hover:bg-black text-white"
              aria-label="Remove photo"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {!full && (
          <>
            <button
              type="button"
              onClick={() => cameraRef.current?.click()}
              className="aspect-square rounded-xl border-2 border-dashed border-orange-300 bg-orange-50/40 text-orange-600 flex flex-col items-center justify-center gap-2 hover:bg-orange-50 hover:border-orange-400 transition-colors"
            >
              <Camera className="h-6 w-6" />
              <span className="text-xs font-semibold">Take photo</span>
            </button>
            <button
              type="button"
              onClick={() => galleryRef.current?.click()}
              className="aspect-square rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-600 flex flex-col items-center justify-center gap-2 hover:bg-gray-100 hover:border-gray-400 transition-colors"
            >
              <ImageIcon className="h-6 w-6" />
              <span className="text-xs font-semibold">From gallery</span>
            </button>
          </>
        )}
      </div>

      <p className="text-xs text-gray-500 text-center">
        {uploadedCount} of {MAX_PHOTOS} photos added. Photos are optional.
      </p>
    </div>
  );
}
