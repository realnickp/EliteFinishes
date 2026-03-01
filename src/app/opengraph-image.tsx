import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Elite Finishes — Painting and Remodeling in Baltimore, MD";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
        {/* Top accent bar */}
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

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Elite Finishes
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#009246",
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            Painting &amp; Remodeling in Baltimore, MD
          </div>
          <div
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.5,
              maxWidth: 700,
            }}
          >
            Licensed contractor serving Baltimore City, Baltimore County, Anne
            Arundel County &amp; Howard County. MHIC 153498.
          </div>
        </div>

        {/* Bottom bar */}
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
          <span>•</span>
          <span>Free Estimates</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
