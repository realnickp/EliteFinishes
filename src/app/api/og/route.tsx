import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "Elite Finishes";
  const subtitle = searchParams.get("subtitle") || "Painting & Remodeling in Baltimore, MD";
  const badge = searchParams.get("badge") || "";

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
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Italian flag accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            display: "flex",
          }}
        >
          <div style={{ flex: 1, background: "#009246" }} />
          <div style={{ flex: 1, background: "#ffffff" }} />
          <div style={{ flex: 1, background: "#c8102e" }} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          {badge && (
            <div
              style={{
                fontSize: 16,
                color: "#009246",
                fontWeight: 700,
                marginBottom: 20,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              {badge}
            </div>
          )}
          {!badge && (
            <div
              style={{
                fontSize: 24,
                color: "rgba(255,255,255,0.5)",
                fontWeight: 600,
                marginBottom: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Elite Finishes
            </div>
          )}
          <div
            style={{
              fontSize: title.length > 40 ? 40 : 52,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.2,
              marginBottom: 16,
              maxWidth: 900,
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
              fontSize: 20,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.5,
            }}
          >
            Licensed Contractor • MHIC 153498 • Free Estimates
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 32,
            display: "flex",
            alignItems: "center",
            gap: 24,
            color: "rgba(255,255,255,0.4)",
            fontSize: 16,
          }}
        >
          <span>443-825-0206</span>
          <span>•</span>
          <span>elitefinishespainting.com</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
