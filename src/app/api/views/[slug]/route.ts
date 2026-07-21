import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    if (!redis) {
      return NextResponse.json({ views: 0 });
    }

    const views = await redis.get<number>(`pageviews:blog:${slug}`);
    
    return NextResponse.json({ views: views || 0 });
  } catch (error) {
    console.error("Error fetching views:", error);
    return NextResponse.json({ views: 0 }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    if (!redis) {
      return NextResponse.json({ views: 0 });
    }

    // Increment the view count for the specific post
    const views = await redis.incr(`pageviews:blog:${slug}`);
    
    return NextResponse.json({ views });
  } catch (error) {
    console.error("Error incrementing views:", error);
    return NextResponse.json({ views: 0 }, { status: 500 });
  }
}
