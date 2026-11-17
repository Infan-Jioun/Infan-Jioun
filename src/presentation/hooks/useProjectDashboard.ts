"use client";

import { useState, useEffect, useCallback } from "react";
import { ProjectEntity, TechStackItem } from "@/domain/entities/project.entity";
import { CreateProjectDto } from "@/shared/validation/project.schema";

const INITIAL_FORM_STATE: CreateProjectDto = {
  category: "personal",
  title: "",
  description: "",
  detailedDescription: "",
  liveLink: "",
  frontendRepo: "",
  backendRepo: "",
  imageUrl: "",
  additionalImages: [],
  techStack: [
    { name: "TypeScript", icon: "https://i.ibb.co.com/HL0sSj4C/typescript.webp" },
    { name: "Next.js", icon: "https://i.ibb.co.com/xtCck3wG/nextJs.webp" },
    { name: "Tailwind CSS", icon: "https://i.ibb.co.com/jJzXpx5/tailwind.webp" },
  ],
  features: ["Responsive Design", "Modern UI Architecture"],
};

export function useProjectDashboard() {
  const [projects, setProjects] = useState<ProjectEntity[]>([]);
  const [form, setForm] = useState<CreateProjectDto>(INITIAL_FORM_STATE);
  const [jsonInput, setJsonInput] = useState<string>("");
  const [showJsonModal, setShowJsonModal] = useState<boolean>(false);
  const [formatTarget, setFormatTarget] = useState<"webp" | "avif">("webp");

  const [loading, setLoading] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [uploadingGallery, setUploadingGallery] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [syncing, setSyncing] = useState<boolean>(false);

  // Fetch projects from PostgreSQL
  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setProjects(json.data);
      }
    } catch {
      setStatusMessage({ type: "error", text: "Failed to load projects from PostgreSQL." });
    }
  }, []);

  const handleSyncFallback = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/projects/sync", { method: "POST" });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Sync failed.");
      }
      setStatusMessage({ type: "success", text: json.message });
      await fetchProjects();
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Sync failed.",
      });
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    void fetchProjects();
  }, [fetchProjects]);

  const updateField = <K extends keyof CreateProjectDto>(field: K, value: CreateProjectDto[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Upload single main image to Cloudinary in WebP/AVIF
  const handleUploadMainImage = async (file: File) => {
    setUploadingImage(true);
    setStatusMessage(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("format", formatTarget);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Image upload failed.");
      }

      updateField("imageUrl", json.data.secureUrl);
      setStatusMessage({
        type: "success",
        text: `Main image uploaded to Cloudinary in ${json.data.format.toUpperCase()} format!`,
      });
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to upload image.",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  // Upload gallery image to Cloudinary in WebP/AVIF
  const handleUploadGalleryImage = async (file: File) => {
    setUploadingGallery(true);
    setStatusMessage(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("format", formatTarget);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Gallery upload failed.");
      }

      setForm((prev) => ({
        ...prev,
        additionalImages: [...prev.additionalImages, json.data.secureUrl],
      }));
      setStatusMessage({
        type: "success",
        text: `Gallery image uploaded in ${json.data.format.toUpperCase()} format!`,
      });
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to upload gallery image.",
      });
    } finally {
      setUploadingGallery(false);
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setForm((prev) => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // Tech stack item management
  const addTechStackItem = (item: TechStackItem) => {
    if (!item.name.trim()) return;
    setForm((prev) => ({
      ...prev,
      techStack: [...prev.techStack, item],
    }));
  };

  const removeTechStackItem = (indexToRemove: number) => {
    setForm((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // Features list management
  const addFeature = (feature: string) => {
    if (!feature.trim()) return;
    setForm((prev) => ({
      ...prev,
      features: [...prev.features, feature.trim()],
    }));
  };

  const removeFeature = (indexToRemove: number) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // Fast JSON Importer: Parses single JSON object matching src/lib/project.ts
  const importFromJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const target = Array.isArray(parsed) ? parsed[0] : parsed;

      if (!target || typeof target !== "object") {
        throw new Error("Invalid JSON: Root must be an object.");
      }

      setForm({
        category: target.category || "personal",
        title: target.title || "",
        description: target.description || "",
        detailedDescription: target.detailedDescription || "",
        liveLink: target.liveLink || "",
        frontendRepo: target.frontendRepo || "",
        backendRepo: target.backendRepo || "",
        imageUrl: target.imageUrl || "",
        additionalImages: Array.isArray(target.additionalImages) ? target.additionalImages : [],
        techStack: Array.isArray(target.techStack) ? target.techStack : [],
        features: Array.isArray(target.features) ? target.features : [],
      });

      setShowJsonModal(false);
      setJsonInput("");
      setStatusMessage({ type: "success", text: "Successfully imported project data from JSON!" });
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err instanceof Error ? `JSON Parse Error: ${err.message}` : "Failed to parse JSON.",
      });
    }
  };

  // Submit project to PostgreSQL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to create project in database.");
      }

      setStatusMessage({
        type: "success",
        text: `Project "${form.title}" added to PostgreSQL and auto-indexed in RAG!`,
      });

      setForm(INITIAL_FORM_STATE);
      void fetchProjects();
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Submission failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete project from PostgreSQL
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Delete failed.");
      }

      setStatusMessage({ type: "success", text: `Deleted "${title}" successfully.` });
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to delete project.",
      });
    }
  };

  return {
    projects,
    form,
    updateField,
    loading,
    uploadingImage,
    uploadingGallery,
    formatTarget,
    setFormatTarget,
    handleUploadMainImage,
    handleUploadGalleryImage,
    removeGalleryImage,
    addTechStackItem,
    removeTechStackItem,
    addFeature,
    removeFeature,
    jsonInput,
    setJsonInput,
    showJsonModal,
    setShowJsonModal,
    importFromJson,
    handleSubmit,
    handleDelete,
    statusMessage,
    syncing,
    handleSyncFallback,
  };
}
