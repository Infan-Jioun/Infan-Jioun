import { z } from "zod";

export const TechStackItemSchema = z.object({
  name: z.string().trim().min(1, "Technology name is required"),
  icon: z.string().trim().min(1, "Icon URL or identifier is required"),
});

export const CreateProjectSchema = z.object({
  category: z.string().trim().min(1, "Category is required (e.g. personal, client)"),
  title: z.string().trim().min(1, "Project title is required").max(120, "Title is too long"),
  description: z.string().trim().min(10, "Short description must be at least 10 characters"),
  detailedDescription: z.string().trim().min(20, "Detailed description must be at least 20 characters"),
  liveLink: z.string().trim().url("Live demo must be a valid URL"),
  frontendRepo: z
    .string()
    .trim()
    .url("Frontend repo must be a valid URL")
    .nullable()
    .optional()
    .or(z.literal("")),
  backendRepo: z
    .string()
    .trim()
    .url("Backend repo must be a valid URL")
    .nullable()
    .optional()
    .or(z.literal("")),
  imageUrl: z.string().trim().url("Main preview image must be a valid URL"),
  additionalImages: z.array(z.string().trim().url("Gallery image must be a valid URL")).default([]),
  techStack: z.array(TechStackItemSchema).min(1, "At least one tech stack item is required"),
  features: z.array(z.string().trim().min(1, "Feature cannot be empty")).min(1, "At least one feature is required"),
});

export type CreateProjectDto = z.infer<typeof CreateProjectSchema>;
