import crypto from "crypto";
import { Result, ok, err } from "@/shared/types/result";
import { AppError } from "@/shared/errors/app-error";
import { logger } from "../logging/logger";

export interface CloudinaryUploadResult {
  url: string;
  secureUrl: string;
  publicId: string;
  format: "webp" | "avif" | string;
  bytes: number;
  width: number;
  height: number;
}

export interface UploadOptions {
  folder?: string;
  targetFormat?: "webp" | "avif";
  quality?: string;
}

export class CloudinaryService {
  private readonly cloudName: string;
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly uploadPreset: string;

  constructor() {
    this.cloudName =
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ??
      process.env.CLOUDINARY_CLOUD_NAME ??
      "";
    this.apiKey = process.env.CLOUDINARY_API_KEY ?? "";
    this.apiSecret = process.env.CLOUDINARY_API_SECRET ?? "";
    this.uploadPreset =
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ??
      process.env.CLOUDINARY_UPLOAD_PRESET ??
      "";
  }

  public isConfigured(): boolean {
    return Boolean(
      this.cloudName &&
        ((this.apiKey && this.apiSecret) || this.uploadPreset)
    );
  }

  private generateSignature(params: Record<string, string>): string {
    const sortedKeys = Object.keys(params).sort();
    const serialized = sortedKeys.map((k) => `${k}=${params[k]}`).join("&");
    return crypto.createHash("sha1").update(`${serialized}${this.apiSecret}`).digest("hex");
  }

  public async uploadImage(
    fileBuffer: Buffer | string,
    options: UploadOptions = {}
  ): Promise<Result<CloudinaryUploadResult, AppError>> {
    const targetFormat = options.targetFormat ?? "webp";
    const folder = options.folder ?? "infan-portfolio/projects";

    if (!this.isConfigured()) {
      logger.warn(
        "Cloudinary environment variables (CLOUDINARY_CLOUD_NAME, API_KEY/SECRET or UPLOAD_PRESET) are not configured.",
        "CloudinaryService"
      );
      return err(
        AppError.validation(
          "Cloudinary credentials are not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local"
        )
      );
    }

    try {
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const formData = new FormData();

      // Convert buffer or data URI into upload payload
      if (typeof fileBuffer === "string") {
        formData.append("file", fileBuffer);
      } else {
        const blob = new Blob([new Uint8Array(fileBuffer)]);
        formData.append("file", blob, `upload.${targetFormat}`);
      }

      if (this.apiKey && this.apiSecret) {
        // Signed upload with explicit WebP/AVIF transformation
        const signParams: Record<string, string> = {
          folder,
          format: targetFormat,
          timestamp,
        };

        const signature = this.generateSignature(signParams);

        formData.append("api_key", this.apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", folder);
        formData.append("format", targetFormat);
        formData.append("quality", options.quality ?? "auto:good");
      } else if (this.uploadPreset) {
        // Unsigned upload via preset
        formData.append("upload_preset", this.uploadPreset);
        formData.append("folder", folder);
        formData.append("format", targetFormat);
      }

      const endpoint = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        logger.error("Cloudinary API rejected upload", "CloudinaryService", data);
        return err(
          AppError.aiService(
            data?.error?.message ?? `Cloudinary upload failed with status ${response.status}`
          )
        );
      }

      return ok({
        url: data.url,
        secureUrl: data.secure_url,
        publicId: data.public_id,
        format: data.format,
        bytes: data.bytes,
        width: data.width,
        height: data.height,
      });
    } catch (error) {
      logger.error("Cloudinary upload failed with exception", "CloudinaryService", error);
      return err(AppError.internal("Failed to process image upload to Cloudinary", error));
    }
  }
}

export const cloudinaryService = new CloudinaryService();
