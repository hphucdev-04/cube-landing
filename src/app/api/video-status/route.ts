import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export async function GET() {
  const publicDir = path.join(process.cwd(), "public");

  if (fs.existsSync(path.join(publicDir, "hero-demo.mp4"))) {
    return NextResponse.json({ hasVideo: true, src: "/hero-demo.mp4" });
  }

  if (fs.existsSync(path.join(publicDir, "demo.mp4"))) {
    return NextResponse.json({ hasVideo: true, src: "/demo.mp4" });
  }

  return NextResponse.json({ hasVideo: false, src: null });
}
