import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const alt = "Cube — AI Coding Agent for Your Terminal";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 0%, transparent 65%)",
          color: "#FFFFFF",
          padding: "40px 60px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "12px",
              backgroundColor: "#18181B",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: "26px",
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="og-cube-top" x1="6" y1="4" x2="26" y2="15.5" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E4E4E7" />
                </linearGradient>
                <linearGradient id="og-cube-left" x1="6" y1="9.75" x2="16" y2="27" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#D4D4D8" />
                  <stop offset="100%" stopColor="#8E8E93" />
                </linearGradient>
                <linearGradient id="og-cube-right" x1="26" y1="9.75" x2="16" y2="27" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#4B4B52" />
                  <stop offset="100%" stopColor="#242428" />
                </linearGradient>
              </defs>
              <path
                d="M16 3.5 L26.5 9.5 L16 15.5 L5.5 9.5 Z"
                fill="url(#og-cube-top)"
                stroke="#121214"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
              <path
                d="M5.5 9.5 L16 15.5 L16 27.5 L5.5 21.5 Z"
                fill="url(#og-cube-left)"
                stroke="#121214"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
              <path
                d="M26.5 9.5 L26.5 21.5 L16 27.5 L16 15.5 Z"
                fill="url(#og-cube-right)"
                stroke="#121214"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
              <line x1="16" y1="15.5" x2="16" y2="27.5" stroke="#121214" strokeWidth="0.8" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "44px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            Cube
          </span>
          <span
            style={{
              fontSize: "16px",
              padding: "4px 12px",
              borderRadius: "999px",
              backgroundColor: "#18181B",
              border: "1px solid #27272A",
              color: "#A1A1AA",
            }}
          >
          0.1.7
          </span>
        </div>

        {/* Main Headline */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 600,
            letterSpacing: "-0.04em",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: "920px",
            marginBottom: "20px",
          }}
        >
          A coding agent that lives where you already work
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "22px",
            color: "#A1A1AA",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.45,
            marginBottom: "36px",
          }}
        >
          Code with tool approval, local memory, skills, and MCP. Choose OAuth, API keys, or local models.
        </div>

        {/* Feature Pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              padding: "8px 18px",
              borderRadius: "999px",
              backgroundColor: "#18181B",
              border: "1px solid #27272A",
              fontSize: "16px",
              color: "#FFFFFF",
            }}
          >
            Windows • Linux • macOS
          </div>
          <div
            style={{
              padding: "8px 18px",
              borderRadius: "999px",
              backgroundColor: "#18181B",
              border: "1px solid #27272A",
              fontSize: "16px",
              color: "#A1A1AA",
            }}
          >
            Local History & Memory
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
