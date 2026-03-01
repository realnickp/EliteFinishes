import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "Elite Finishes";
  const subtitle =
    searchParams.get("subtitle") || "Painting & Remodeling in Baltimore, MD";

  const fontSize = title.length > 40 ? 40 : 52;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0c1220 0%, #1a2332 50%, #0c1220 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ flex: 1, backgroundColor: "#009246" }} />
          <div style={{ flex: 1, backgroundColor: "#ffffff" }} />
          <div style={{ flex: 1, backgroundColor: "#c8102e" }} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingLeft: 80,
            paddingRight: 80,
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.5)",
              fontWeight: 600,
              marginBottom: 12,
              letterSpacing: 2,
              textTransform: "uppercase" as const,
            }}
          >
            ELITE FINISHES
          </div>
          <div
            style={{
              fontSize,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.2,
              marginBottom: 16,
              maxWidth: 900,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#009246",
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            {subtitle}
          </div>
          <div
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.45)",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            Licensed Contractor · MHIC 153498 · Free Estimates
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 32,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            color: "rgba(255,255,255,0.35)",
            fontSize: 16,
          }}
        >
          <span style={{ marginRight: 16 }}>443-825-0206</span>
          <span style={{ marginRight: 16 }}>·</span>
          <span>elitefinishespainting.com</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
