import { type NextRequest, NextResponse } from "next/server"
import { getRelatedVideos } from "@/lib/youtube"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const videoId = searchParams.get("video_id")
  const maxResults = Number.parseInt(searchParams.get("max_results") || "50")

  if (!videoId) {
    return NextResponse.json({ status: 400, msg: "Parameter 'video_id' is required." }, { status: 400 })
  }

  try {
    const results = await getRelatedVideos(videoId, maxResults)

    return NextResponse.json({
      status: 200,
      result: results,
      server_time: new Date().toISOString(),
      msg: "OK",
    })
  } catch (error) {
    console.error("Error getting related videos:", error)
    return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
  }
}
