import { NextRequest, NextResponse } from "next/server";

const ONE_MONTH = 60 * 60 * 24 * 30;

/** GET /api/zip-lookup?zip=21204 → { city: "Towson", state: "MD" } */
export async function GET(request: NextRequest) {
  const zip = (request.nextUrl.searchParams.get("zip") || "").trim().slice(0, 5);
  if (!/^\d{5}$/.test(zip)) {
    return NextResponse.json({ city: null, state: null }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.zippopotam.us/us/${zip}`, {
      next: { revalidate: ONE_MONTH },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) {
      return NextResponse.json({ city: null, state: null }, { status: 404 });
    }
    const data = (await res.json()) as {
      places?: { "place name"?: string; "state abbreviation"?: string }[];
    };
    const place = data.places?.[0];
    return NextResponse.json(
      { city: place?.["place name"] ?? null, state: place?.["state abbreviation"] ?? null },
      { headers: { "Cache-Control": `public, max-age=86400, s-maxage=${ONE_MONTH}` } }
    );
  } catch {
    // Lookup is a convenience only; the visitor can still type their city
    return NextResponse.json({ city: null, state: null }, { status: 502 });
  }
}
