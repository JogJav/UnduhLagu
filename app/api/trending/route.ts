import { type NextRequest, NextResponse } from "next/server"
import { getVideoList } from "@/lib/youtube"

export async function GET(request: NextRequest) {
  try {
    // Use getVideoList instead of getTrendingVideos for more reliable results
    const trendingData = await getVideoList(1, 24)
    return NextResponse.json(trendingData)
  } catch (error) {
    console.error("Error getting trending videos:", error)
    return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
  }
}
