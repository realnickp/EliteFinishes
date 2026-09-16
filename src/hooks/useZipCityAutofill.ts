"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fills in the city once a 5 digit zip is entered. Never overwrites a city
 * the visitor typed themselves. Returns the looked up state (e.g. "MD").
 */
export function useZipCityAutofill(zip: string, city: string, setCity: (city: string) => void) {
  const [lookup, setLookup] = useState<{ zip: string; state: string }>({ zip: "", state: "" });
  const cityRef = useRef(city);
  const setCityRef = useRef(setCity);
  const lastFilled = useRef("");

  useEffect(() => {
    cityRef.current = city;
    setCityRef.current = setCity;
  });

  const zip5 = zip.trim().slice(0, 5);

  useEffect(() => {
    if (!/^\d{5}$/.test(zip5)) return;
    const controller = new AbortController();
    fetch(`/api/zip-lookup?zip=${zip5}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { city: string | null; state: string | null } | null) => {
        if (!data?.city) return;
        setLookup({ zip: zip5, state: data.state ?? "" });
        const current = cityRef.current.trim();
        if (!current || current === lastFilled.current) {
          lastFilled.current = data.city;
          setCityRef.current(data.city);
        }
      })
      .catch(() => {
        // lookup is optional
      });
    return () => controller.abort();
  }, [zip5]);

  return { state: lookup.zip === zip5 ? lookup.state : "" };
}
