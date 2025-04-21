import { type NextRequest, NextResponse } from "next/server"
import { getVideoList } from "@/lib/youtube"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = Number.parseInt(searchParams.get("page") || "1")
  const perPage = Number.parseInt(searchParams.get("per_page") || "12")

  try {
    const listData = await getVideoList(page, perPage)
    return NextResponse.json(listData)
  } catch (error) {
    console.error("Error getting video list:", error)
    return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
  }
}
