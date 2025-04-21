import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

// Image generation
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #f59e0b 0%, #dc2626 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20%",
        overflow: "hidden",
      }}
    >
      <svg
        width="70%"
        height="70%"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 18v-6" />
        <path d="M8 18v-1" />
        <path d="M16 18v-3" />
        <path d="M20 18v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
        <path d="M12 12 8 8" />
        <path d="M12 6v6" />
        <path d="M12 8l4 4" />
      </svg>
    </div>,
    {
      ...size,
    },
  )
}
