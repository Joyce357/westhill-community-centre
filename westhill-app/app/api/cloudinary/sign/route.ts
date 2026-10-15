import { NextResponse } from "next/server";
import crypto from "crypto";
import { getSession } from "@/lib/auth";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({
      configured: false,
      message: "Media upload is not configured yet. You can continue using a media URL.",
    });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "westhill-community";

  // Cloudinary requires sorted query parameters for hashing: folder, then timestamp
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign + apiSecret)
    .digest("hex");

  return NextResponse.json({
    configured: true,
    cloudName,
    apiKey,
    timestamp,
    folder,
    signature,
  });
}
