"use client"

import { SpeedInsights } from "@vercel/speed-insights/next"
import { usePathname } from "next/navigation"

export function Insights() {
  const pathname = usePathname()

  return <SpeedInsights route={pathname} />
}
