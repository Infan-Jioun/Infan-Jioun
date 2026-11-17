"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Upload, Plus, Trash2, ExternalLink, Github, Code,
  FileCode, Layers, CheckCircle2, AlertTriangle, ArrowLeft,
  Sparkles, RefreshCw, X, Search, Database, CloudUpload, HardDrive
} from "lucide-react";
import { useProjectDashboard } from "@/presentation/hooks/useProjectDashboard";

const PRESET_TECHS = [
  { name: "TypeScript", icon: "https://i.ibb.co.com/HL0sSj4C/typescript.webp" },
  { name: "Next.js", icon: "https://i.ibb.co.com/xtCck3wG/nextJs.webp" },
  { name: "Tailwind CSS", icon: "https://i.ibb.co.com/jJzXpx5/tailwind.webp" },
  { name: "React", icon: "https://i.ibb.co.com/HL0sSj4C/typescript.webp" },
  { name: "Node.js", icon: "https://i.ibb.co.com/jVnm9XT/nodeJS.webp" },
  { name: "PostgreSQL", icon: "https://i.ibb.co.com/j9Dh6Xgj/Postgr-SQL.png" },
  { name: "Prisma", icon: "https://i.ibb.co.com/6cbzwXXv/Prisma.png" },
  { name: "Better Auth", icon: "https://i.ibb.co.com/cSwKdnCS/Better-Auth.png" },
  { name: "Redux", icon: "https://i.ibb.co.com/k2mbXZD0/images.jpg" },
  { name: "Shadcn UI", icon: "https://i.ibb.co.com/0R3TKXmx/shadcn.webp" },
];

export default function ProjectDashboardPage() {
  const {
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
  } = useProjectDashboard();

  const [techInput, setTechInput] = useState({ name: "", icon: "" });
  const [featureInput, setFeatureInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        selectedCategory === "all" || p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Banner & Header */}
      <header className="max-w-7xl mx-auto mb-8 bg-slate-900/90 border-2 border-indigo-500/40 shadow-[6px_6px_0px_0px_#4f46e5] p-5 sm:p-7 relative overflow-hidden">
        {/* Glowing top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_12px_#22d3ee]" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-cyan-400 bg-slate-950 border border-indigo-500/40 px-3 py-1.5 shadow-[2px_2px_0px_0px_#4f46e5] hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
              >
                <ArrowLeft size={14} /> Back to Site
              </Link>
              <span className="text-[10px] font-black tracking-widest uppercase bg-indigo-950 text-cyan-300 border border-cyan-400/40 px-2.5 py-1">
                Admin Control Room
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 px-2 py-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 animate-pulse" />
                PostgreSQL + pgvector Active
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-3">
              Project Dashboard
              <span className="text-xs sm:text-sm font-semibold text-indigo-300 lowercase font-mono hidden sm:inline">
                (openrouter nemotron-3.5-embed · neon pg · cloudinary)
              </span>
            </h1>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void handleSyncFallback()}
              disabled={syncing}
              className="inline-flex items-center gap-2 text-xs font-black uppercase bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white border-2 border-indigo-400 px-4 py-2.5 shadow-[3px_3px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#22d3ee] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              <RefreshCw size={14} className={syncing ? "animate-spin" : ""} />
              {syncing ? "Syncing to pgvector..." : "Sync project.ts Data"}
            </button>

            <button
              type="button"
              onClick={() => setShowJsonModal(true)}
              className="inline-flex items-center gap-2 text-xs font-black uppercase bg-slate-950 border-2 border-cyan-400 px-4 py-2.5 text-cyan-300 hover:text-slate-950 hover:bg-cyan-400 shadow-[3px_3px_0px_0px_#4f46e5] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              <FileCode size={15} /> Fast JSON Paste
            </button>
          </div>
        </div>
      </header>

      {/* Notifications */}
      {statusMessage && (
        <div className="max-w-7xl mx-auto mb-6">
          <div
            className={`border-2 p-4 text-xs font-semibold flex items-center gap-3 shadow-[4px_4px_0px_0px_#000] ${
              statusMessage.type === "success"
                ? "bg-emerald-950/80 border-emerald-400 text-emerald-200"
                : "bg-rose-950/80 border-rose-400 text-rose-200"
            }`}
          >
            {statusMessage.type === "success" ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
            <span>{statusMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Grid: Form on Left, Projects List on Right */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Add Project Form */}
        <section className="lg:col-span-7 bg-slate-900/90 border-2 border-indigo-500/40 p-5 sm:p-7 shadow-[6px_6px_0px_0px_#4f46e5]">
          <div className="flex items-center justify-between border-b border-indigo-500/30 pb-3 mb-6">
            <h2 className="text-lg font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Plus size={18} className="text-indigo-400" /> Add New Project
            </h2>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-slate-400">Optimize Format:</span>
              <button
                type="button"
                onClick={() => setFormatTarget("webp")}
                className={`px-2.5 py-1 text-[10px] font-black uppercase border transition-all cursor-pointer ${
                  formatTarget === "webp"
                    ? "bg-cyan-400 text-slate-950 border-cyan-400 shadow-[2px_2px_0px_0px_#4f46e5]"
                    : "bg-slate-950 text-slate-400 border-indigo-500/40"
                }`}
              >
                WEBP
              </button>
              <button
                type="button"
                onClick={() => setFormatTarget("avif")}
                className={`px-2.5 py-1 text-[10px] font-black uppercase border transition-all cursor-pointer ${
                  formatTarget === "avif"
                    ? "bg-purple-400 text-slate-950 border-purple-400 shadow-[2px_2px_0px_0px_#4f46e5]"
                    : "bg-slate-950 text-slate-400 border-indigo-500/40"
                }`}
              >
                AVIF
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-xs">
            {/* Project Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-black uppercase text-indigo-300 mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="e.g. HELPS NEAR"
                  className="w-full bg-slate-950 border-2 border-indigo-500/40 text-white placeholder-slate-500 px-3 py-2 text-xs outline-hidden focus:border-cyan-400 shadow-[2px_2px_0px_0px_#4f46e5] font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-indigo-300 mb-1.5">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className="w-full bg-slate-950 border-2 border-indigo-500/40 text-cyan-300 px-3 py-2 text-xs outline-hidden focus:border-cyan-400 shadow-[2px_2px_0px_0px_#4f46e5] font-bold"
                >
                  <option value="personal">personal</option>
                  <option value="team">team</option>
                  <option value="client">client</option>
                  <option value="open-source">open-source</option>
                </select>
              </div>
            </div>

            {/* URLs: Live Link, Frontend Repo, Backend Repo */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-black uppercase text-indigo-300 mb-1.5">
                  Live URL *
                </label>
                <input
                  type="url"
                  required
                  value={form.liveLink}
                  onChange={(e) => updateField("liveLink", e.target.value)}
                  placeholder="https://helps-near.vercel.app"
                  className="w-full bg-slate-950 border-2 border-indigo-500/40 text-white placeholder-slate-500 px-3 py-2 text-xs outline-hidden focus:border-cyan-400 shadow-[2px_2px_0px_0px_#4f46e5]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-indigo-300 mb-1.5">
                  Frontend GitHub
                </label>
                <input
                  type="url"
                  value={form.frontendRepo || ""}
                  onChange={(e) => updateField("frontendRepo", e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full bg-slate-950 border-2 border-indigo-500/40 text-white placeholder-slate-500 px-3 py-2 text-xs outline-hidden focus:border-cyan-400 shadow-[2px_2px_0px_0px_#4f46e5]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-indigo-300 mb-1.5">
                  Backend GitHub
                </label>
                <input
                  type="url"
                  value={form.backendRepo || ""}
                  onChange={(e) => updateField("backendRepo", e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full bg-slate-950 border-2 border-indigo-500/40 text-white placeholder-slate-500 px-3 py-2 text-xs outline-hidden focus:border-cyan-400 shadow-[2px_2px_0px_0px_#4f46e5]"
                />
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-[11px] font-black uppercase text-indigo-300 mb-1.5">
                Short Description *
              </label>
              <textarea
                required
                rows={2}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="2-3 sentences summarizing the problem solved and core impact..."
                className="w-full bg-slate-950 border-2 border-indigo-500/40 text-white placeholder-slate-500 px-3 py-2 text-xs outline-hidden focus:border-cyan-400 shadow-[2px_2px_0px_0px_#4f46e5] font-mono"
              />
            </div>

            {/* Detailed Description */}
            <div>
              <label className="block text-[11px] font-black uppercase text-indigo-300 mb-1.5">
                Detailed Description *
              </label>
              <textarea
                required
                rows={3}
                value={form.detailedDescription}
                onChange={(e) => updateField("detailedDescription", e.target.value)}
                placeholder="Comprehensive technical architecture, role-based modules, and operational flow..."
                className="w-full bg-slate-950 border-2 border-indigo-500/40 text-white placeholder-slate-500 px-3 py-2 text-xs outline-hidden focus:border-cyan-400 shadow-[2px_2px_0px_0px_#4f46e5] font-mono"
              />
            </div>

            {/* Main Image Upload (Cloudinary WebP/AVIF) */}
            <div className="border border-indigo-500/30 p-3.5 bg-slate-950/60">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-black uppercase text-cyan-300 flex items-center gap-1.5">
                  <Upload size={14} /> Main Image (Cloudinary {formatTarget.toUpperCase()}) *
                </label>
                {uploadingImage && (
                  <span className="text-[10px] text-cyan-400 animate-pulse font-bold">
                    Converting & Uploading...
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  id="main-image-input"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void handleUploadMainImage(f);
                  }}
                />
                <label
                  htmlFor="main-image-input"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 text-xs font-black uppercase border border-indigo-400 shadow-[2px_2px_0px_0px_#000] cursor-pointer flex items-center gap-1.5"
                >
                  <CloudUpload size={14} /> Choose File
                </label>

                <span className="text-[11px] text-slate-400 font-mono">OR URL:</span>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => updateField("imageUrl", e.target.value)}
                  placeholder="https://..."
                  className="flex-1 min-w-[200px] bg-slate-900 border border-indigo-500/40 text-white px-2.5 py-1 text-xs outline-hidden focus:border-cyan-400"
                />
              </div>

              {form.imageUrl && (
                <div className="mt-3 flex items-center gap-3">
                  <div className="relative w-20 h-14 border border-cyan-400 overflow-hidden shrink-0">
                    <Image
                      src={form.imageUrl}
                      alt="Main Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <span className="text-[10px] text-cyan-300 truncate max-w-sm font-mono">
                    {form.imageUrl}
                  </span>
                </div>
              )}
            </div>

            {/* Additional Gallery Images */}
            <div className="border border-indigo-500/30 p-3.5 bg-slate-950/60">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-black uppercase text-indigo-300">
                  Additional Gallery Images ({form.additionalImages.length})
                </label>
                <span className="text-[10px] text-slate-400 font-mono">Cloudinary {formatTarget.toUpperCase()}</span>
              </div>

              <input
                type="file"
                accept="image/*"
                id="gallery-input"
                className="hidden"
                disabled={uploadingGallery}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void handleUploadGalleryImage(f);
                }}
              />
              <label
                htmlFor="gallery-input"
                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-indigo-500/40 px-3 py-1.5 text-xs font-bold uppercase cursor-pointer"
              >
                <Plus size={14} /> Add Gallery Image
              </label>

              {form.additionalImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.additionalImages.map((img, idx) => (
                    <div key={idx} className="relative group w-16 h-12 border border-slate-700">
                      <Image src={img} alt="Gallery" fill className="object-cover" unoptimized />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-none p-0.5 hover:bg-rose-500"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tech Stack Selection */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-black uppercase text-indigo-300 flex items-center gap-1.5">
                  <Code size={14} /> Tech Stack ({form.techStack.length}) *
                </label>
                <span className="text-[10px] text-slate-400">Click preset to add</span>
              </div>

              {/* Preset buttons */}
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {PRESET_TECHS.map((tech) => (
                  <button
                    key={tech.name}
                    type="button"
                    onClick={() => addTechStackItem(tech)}
                    className="text-[10px] font-bold bg-slate-950 hover:bg-indigo-950 border border-indigo-500/30 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 px-2 py-0.5 transition-all cursor-pointer"
                  >
                    + {tech.name}
                  </button>
                ))}
              </div>

              {/* Custom Tech Stack Input */}
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Custom Tech (e.g. Redis)"
                  value={techInput.name}
                  onChange={(e) => setTechInput((p) => ({ ...p, name: e.target.value }))}
                  className="flex-1 bg-slate-950 border border-indigo-500/40 text-white px-2.5 py-1 text-xs outline-hidden"
                />
                <input
                  type="url"
                  placeholder="Icon URL (optional)"
                  value={techInput.icon}
                  onChange={(e) => setTechInput((p) => ({ ...p, icon: e.target.value }))}
                  className="flex-1 bg-slate-950 border border-indigo-500/40 text-white px-2.5 py-1 text-xs outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (techInput.name.trim()) {
                      addTechStackItem({
                        name: techInput.name.trim(),
                        icon: techInput.icon.trim() || "https://i.ibb.co.com/HL0sSj4C/typescript.webp",
                      });
                      setTechInput({ name: "", icon: "" });
                    }
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 text-xs font-bold uppercase cursor-pointer"
                >
                  Add
                </button>
              </div>

              {/* Active Tech Stack Tags */}
              <div className="flex flex-wrap gap-2">
                {form.techStack.map((tech, idx) => (
                  <span
                    key={`${tech.name}-${idx}`}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-indigo-950/80 text-cyan-300 border border-cyan-400/40 px-2.5 py-1 shadow-[2px_2px_0px_0px_#4f46e5]"
                  >
                    {tech.name}
                    <button
                      type="button"
                      onClick={() => removeTechStackItem(idx)}
                      className="hover:text-rose-400 cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <label className="block text-[11px] font-black uppercase text-indigo-300 mb-1.5">
                Key Features ({form.features.length}) *
              </label>

              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="e.g. OTP Authentication & Realtime Alerts"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (featureInput.trim()) {
                        addFeature(featureInput.trim());
                        setFeatureInput("");
                      }
                    }
                  }}
                  className="flex-1 bg-slate-950 border border-indigo-500/40 text-white px-2.5 py-1 text-xs outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (featureInput.trim()) {
                      addFeature(featureInput.trim());
                      setFeatureInput("");
                    }
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 text-xs font-bold uppercase cursor-pointer"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {form.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-[11px] bg-slate-950 text-slate-300 border border-indigo-500/40 px-2.5 py-1"
                  >
                    • {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(idx)}
                      className="hover:text-rose-400 cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3 border-t border-indigo-500/30 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono">
                Auto-indexes to Neon pgvector (2048-dim) on save
              </span>

              <button
                type="submit"
                disabled={loading}
                className="bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 px-6 py-2.5 text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_#4f46e5] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
              >
                {loading ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
                {loading ? "Persisting & Vectorizing..." : "Save Project to PostgreSQL"}
              </button>
            </div>
          </form>
        </section>

        {/* RIGHT COLUMN: Active PostgreSQL Records */}
        <section className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-slate-900/90 border-2 border-indigo-500/40 p-5 shadow-[6px_6px_0px_0px_#4f46e5]">
            <div className="flex items-center justify-between border-b border-indigo-500/30 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Database size={16} className="text-cyan-400" />
                <h2 className="text-sm font-black uppercase tracking-wider text-white">
                  PostgreSQL Records ({projects.length})
                </h2>
              </div>
              <span className="text-[10px] font-bold uppercase text-indigo-300 bg-indigo-950 border border-indigo-500/40 px-2 py-0.5">
                Prisma ORM
              </span>
            </div>

            {/* Search and Category Filters */}
            <div className="flex flex-col gap-2.5 mb-4">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-2.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-indigo-500/40 text-white placeholder-slate-500 pl-8 pr-3 py-1.5 text-xs outline-hidden focus:border-cyan-400"
                />
              </div>

              <div className="flex flex-wrap gap-1">
                {["all", "personal", "team", "client"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-0.5 text-[10px] font-bold uppercase transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-cyan-400 text-slate-950 font-black"
                        : "bg-slate-950 text-slate-400 border border-indigo-500/30 hover:text-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Scroll Area */}
            <div className="flex flex-col gap-3 max-h-[640px] overflow-y-auto pr-1">
              {filteredProjects.length === 0 ? (
                <div className="p-8 border border-dashed border-indigo-500/40 text-center bg-slate-950/40">
                  <HardDrive size={32} className="mx-auto text-indigo-400 mb-2 opacity-60" />
                  <p className="text-xs font-bold text-slate-300 mb-1">
                    {projects.length === 0
                      ? "No projects in PostgreSQL database yet."
                      : "No projects match your filter."}
                  </p>
                  <p className="text-[11px] text-slate-500 mb-4">
                    {projects.length === 0
                      ? "Add your first project using the form or sync all 6 projects from project.ts."
                      : "Try a different search keyword."}
                  </p>

                  {projects.length === 0 && (
                    <button
                      type="button"
                      onClick={() => void handleSyncFallback()}
                      disabled={syncing}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase px-4 py-2 border border-indigo-400 shadow-[3px_3px_0px_0px_#22d3ee] cursor-pointer"
                    >
                      {syncing ? "Syncing..." : "⚡ Sync 6 Projects from project.ts"}
                    </button>
                  )}
                </div>
              ) : (
                filteredProjects.map((proj) => (
                  <article
                    key={proj.id}
                    className="p-3.5 bg-slate-950 border border-indigo-500/40 hover:border-cyan-400 transition-all flex flex-col gap-2.5 shadow-[3px_3px_0px_0px_#000]"
                  >
                    <div className="flex items-start gap-3">
                      {proj.imageUrl && (
                        <div className="relative w-16 h-12 border border-slate-700 shrink-0 overflow-hidden">
                          <Image
                            src={proj.imageUrl}
                            alt={proj.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-xs font-black uppercase text-white truncate">
                            {proj.title}
                          </h3>
                          <span className="text-[9px] font-bold uppercase bg-indigo-950 text-cyan-300 border border-cyan-400/30 px-1.5 py-0.5 shrink-0">
                            {proj.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                          {proj.description}
                        </p>
                      </div>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1">
                      {proj.techStack.slice(0, 4).map((t) => (
                        <span
                          key={t.name}
                          className="text-[9px] bg-slate-900 border border-slate-800 text-slate-300 px-1.5 py-0.5"
                        >
                          {t.name}
                        </span>
                      ))}
                      {proj.techStack.length > 4 && (
                        <span className="text-[9px] text-slate-500">
                          +{proj.techStack.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-xs">
                      <div className="flex items-center gap-2">
                        {proj.liveLink && (
                          <Link
                            href={proj.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[10px] font-bold uppercase"
                          >
                            <ExternalLink size={12} /> Live
                          </Link>
                        )}
                        {proj.frontendRepo && (
                          <Link
                            href={proj.frontendRepo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-slate-200 flex items-center gap-1 text-[10px] font-bold uppercase"
                          >
                            <Github size={12} /> Repo
                          </Link>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => void handleDelete(proj.id, proj.title)}
                        className="text-rose-400 hover:text-rose-300 flex items-center gap-1 text-[10px] font-bold uppercase cursor-pointer"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      </div>

      {/* JSON Import Modal */}
      {showJsonModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-slate-950 border-2 border-cyan-400 w-full max-w-2xl p-6 shadow-[8px_8px_0px_0px_#4f46e5]">
            <div className="flex items-center justify-between border-b border-indigo-500/30 pb-3 mb-4">
              <h3 className="text-sm font-black uppercase text-cyan-300 flex items-center gap-2">
                <FileCode size={16} /> Fast JSON Paste (project.ts schema)
              </h3>
              <button
                type="button"
                onClick={() => setShowJsonModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-3">
              Paste a JSON object matching <code className="text-cyan-400">src/lib/project.ts</code> to auto-fill every field.
            </p>

            <textarea
              rows={12}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder={`{
  "category": "personal",
  "title": "HELPS NEAR",
  "description": "...",
  "detailedDescription": "...",
  "liveLink": "https://...",
  "frontendRepo": "https://github.com/...",
  "backendRepo": "https://github.com/...",
  "imageUrl": "https://...",
  "additionalImages": [],
  "techStack": [{ "name": "Next.js", "icon": "..." }],
  "features": ["..."]
}`}
              className="w-full bg-slate-900 border-2 border-indigo-500/40 text-cyan-200 p-3 text-xs font-mono outline-hidden focus:border-cyan-400 mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowJsonModal(false)}
                className="px-4 py-2 text-xs font-bold uppercase text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={importFromJson}
                className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 px-5 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_0px_#4f46e5] cursor-pointer"
              >
                Parse & Populate Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
