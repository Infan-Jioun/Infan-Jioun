import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { cloudinaryService } from "@/infrastructure/storage/cloudinary.service";
import { auth } from "@/infrastructure/auth/auth";
import { logger } from "@/infrastructure/logging/logger";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized. Admin session required to upload media." },
        { status: 401 }
      );
    }

    const contentType = req.headers.get("content-type") || "";

    let fileBuffer: Buffer | string;
    let targetFormat: "webp" | "avif" = "webp";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const requestedFormat = (formData.get("format") as string) || "webp";

      if (!file) {
        return NextResponse.json({ error: "No file provided in form data." }, { status: 400 });
      }

      if (requestedFormat === "avif" || requestedFormat === "webp") {
        targetFormat = requestedFormat;
      }

      const bytes = await file.arrayBuffer();
      fileBuffer = Buffer.from(bytes);
    } else {
      const body = await req.json();
      if (!body.image) {
        return NextResponse.json({ error: "Missing 'image' field (base64 or URL)." }, { status: 400 });
      }
      fileBuffer = body.image;
      if (body.format === "avif" || body.format === "webp") {
        targetFormat = body.format;
      }
    }

    logger.info(`Uploading image to Cloudinary (converting to ${targetFormat.toUpperCase()})...`, "POST /api/upload");

    const result = await cloudinaryService.uploadImage(fileBuffer, {
      targetFormat,
      folder: "infan-portfolio/projects",
      quality: "auto:good",
    });

    if (!result.success) {
      logger.error("Cloudinary upload failed", "POST /api/upload", result.error);
      return NextResponse.json(
        {
          error: result.error.message,
          code: result.error.code,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: result.data,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Unhandled error in upload route", "POST /api/upload", error);
    return NextResponse.json(
      {
        error: "Internal server error during image upload.",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}
