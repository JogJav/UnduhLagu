import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"
import TrendingPage from "./trending-client"

export const metadata: Metadata = {
  title: "Trending Videos - " + siteConfig.site_name,
  description: "Watch the most popular and trending videos on " + siteConfig.site_name,
  robots: "index, follow",
}

export default function TrendingPageWrapper() {
  return <TrendingPage />
}
