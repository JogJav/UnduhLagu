"use client"

import { useEffect } from "react"

export function Analytics() {
  useEffect(() => {
    // Only run in production and in the browser
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      try {
        // Create and append the script manually
        const script = document.createElement("script")
        script.src = "/_vercel/insights/script.js"
        script.defer = true
        script.dataset.sdkn = "next.js"
        script.dataset.sdkv = "14.1.0" // Match your Next.js version
        document.body.appendChild(script)
      } catch (error) {
        // Silently fail - analytics should not break the app
        console.error("Failed to load analytics:", error instanceof Error ? error.message : String(error))
      }
    }
  }, [])

  return null
}
