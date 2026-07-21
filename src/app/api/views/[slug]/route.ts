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

    // Get the client IP
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    
    // Hash the IP to maintain privacy
    const encoder = new TextEncoder();
    const data = encoder.encode(ip + process.env.NEXT_PUBLIC_APP_URL);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedIp = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    // Attempt to set a deduplication key valid for 24 hours (86400 seconds)
    // nx: true means it will only set the key if it doesn't already exist
    const isNewView = await redis.set(`dedup:view:${slug}:${hashedIp}`, "true", {
      ex: 86400,
      nx: true,
    });

    let views: number | null;

    if (isNewView) {
      // It's a new view from this IP in the last 24 hours, so increment
      views = await redis.incr(`pageviews:blog:${slug}`);
    } else {
      // They already viewed it, just fetch the current count
      views = await redis.get<number>(`pageviews:blog:${slug}`);
    }
    
    return NextResponse.json({ views: views || 0 });
  } catch (error) {
    console.error("Error incrementing views:", error);
    return NextResponse.json({ views: 0 }, { status: 500 });
  }
}
