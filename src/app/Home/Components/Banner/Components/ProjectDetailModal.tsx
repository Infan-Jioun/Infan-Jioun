'use client';

import { useState, useEffect, useRef, memo } from "react";
import { createPortal } from "react-dom";
import {
    Pause,
    Play,
    ChevronLeft,
    ChevronRight,
    X,
    ExternalLink,
    Github,
    Sparkles,
    Layers,
    CheckCircle2,
    Maximize2
} from "lucide-react";
import Image from "next/image";
import { Project } from "@/app/types/project";

interface Props {
    project: Project;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectDetailModal = memo(({ project, isOpen, onClose }: Props) => {
    const [idx, setIdx] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [fullscreen, setFullscreen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const lenisRef = useRef<any>(null);

    const total = project.additionalImages?.length || 0;

    useEffect(() => {
        setMounted(true);
    }, []);

    const goNext = () => setIdx(p => (p + 1) % total);
    const goPrev = () => setIdx(p => (p - 1 + total) % total);
    const goTo = (i: number) => setIdx(i);

    const stopSlider = () => { if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; } };
    const startSlider = () => { stopSlider(); if (total <= 1) return; intervalRef.current = setInterval(goNext, 4000); };

    // ── Working Lenis Smooth Scroll Setup ────────────────────────────
    useEffect(() => {
        if (!isOpen || !mounted) return;

        let lenisInstance: any = null;
        let rafId: number;

        const initLenis = async () => {
            try {
                // Dynamic Import supporting both package versions
                const LenisModule = await import("lenis").catch(() => import("@studio-freight/lenis"));
                const Lenis = LenisModule.default || LenisModule;

                if (!scrollRef.current) return;

                lenisInstance = new Lenis({
                    wrapper: scrollRef.current,
                    content: scrollRef.current.firstElementChild as HTMLElement,
                    duration: 1.2,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    smoothWheel: true,
                    touchMultiplier: 2,
                    infinite: false,
                });

                lenisRef.current = lenisInstance;

                const tick = (time: number) => {
                    lenisInstance?.raf(time);
                    rafId = requestAnimationFrame(tick);
                };
                rafId = requestAnimationFrame(tick);

                // Recalculate container height for portal
                setTimeout(() => {
                    lenisInstance?.resize();
                }, 150);

            } catch (err) {
                console.warn("Lenis Scroll Fallback to native scroll:", err);
            }
        };

        initLenis();

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            if (lenisInstance) lenisInstance.destroy();
            lenisRef.current = null;
        };
    }, [isOpen, mounted]);

    // ── Pause Lenis on Fullscreen ────────────────────────────────────
    useEffect(() => {
        if (fullscreen) lenisRef.current?.stop();
        else lenisRef.current?.start();
    }, [fullscreen]);

    // ── Auto-slide ───────────────────────────────────────────────────
    useEffect(() => {
        if (isOpen && playing && !fullscreen) startSlider();
        else stopSlider();
        return stopSlider;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, playing, fullscreen, total]);

    // ── Keyboard ShortCuts ───────────────────────────────────────────
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowLeft": e.preventDefault(); goPrev(); break;
                case "ArrowRight": e.preventDefault(); goNext(); break;
                case " ": e.preventDefault(); setPlaying(p => !p); break;
                case "f": case "F": e.preventDefault(); setFullscreen(f => !f); break;
                case "Escape": fullscreen ? setFullscreen(false) : onClose(); break;
            }
        };
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, fullscreen]);

    if (!isOpen || !mounted) return null;

    // ── Fullscreen View (Sharp 3D) ───────────────────────────────────
    const fullscreenContent = (
        <div className="fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center rounded-none animate-in fade-in duration-300">
            <div className="relative w-full h-full flex items-center justify-center p-4">
                <Image
                    src={project.additionalImages[idx]}
                    alt={`${project.title} ${idx + 1}`}
                    fill className="object-contain select-none"
                    draggable={false} sizes="100vw" priority
                />
            </div>

            <button onClick={() => setFullscreen(false)}
                className="absolute top-5 right-5 z-10 flex items-center justify-center w-11 h-11 bg-slate-900 border-2 border-indigo-500/50 text-white transition-all hover:bg-rose-600 hover:border-rose-500 active:translate-y-0.5 shadow-[4px_4px_0px_0px_#6366f1] rounded-none">
                <X size={20} />
            </button>

            {total > 1 && (
                <>
                    <button onClick={goPrev} className="absolute left-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 bg-slate-900 border-2 border-indigo-500/40 text-white transition-all hover:bg-indigo-600 hover:translate-x-1 active:translate-x-0 shadow-[5px_5px_0px_0px_#4f46e5] rounded-none">
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={goNext} className="absolute right-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 bg-slate-900 border-2 border-indigo-500/40 text-white transition-all hover:bg-indigo-600 hover:-translate-x-1 active:translate-x-0 shadow-[-5px_5px_0px_0px_#4f46e5] rounded-none">
                        <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 px-5 py-2 bg-slate-900 border border-indigo-500/40 text-indigo-300 text-xs font-bold tracking-widest uppercase shadow-[4px_4px_0px_0px_#6366f1] rounded-none">
                        {idx + 1} / {total}
                    </div>
                </>
            )}
        </div>
    );

    // ── Main Modal (3D Glass, No Rounded Corners) ─────────────────────
    const modalContent = (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-8 animate-in fade-in duration-200"
            style={{ background: "rgba(2, 6, 23, 0.88)", backdropFilter: "blur(20px)" }}
        >
            {/* Backdrop */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* 3D Glass Container with Sharp Edges */}
            <div
                className="relative z-10 w-full max-w-4xl flex flex-col rounded-none transition-all duration-300"
                style={{
                    background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)",
                    borderTop: "2px solid rgba(129, 140, 248, 0.6)",
                    borderLeft: "2px solid rgba(129, 140, 248, 0.4)",
                    borderRight: "2px solid rgba(15, 23, 42, 0.8)",
                    borderBottom: "2px solid rgba(15, 23, 42, 0.9)",
                    boxShadow: "12px 16px 40px 0px rgba(0, 0, 0, 0.8), 0px 0px 30px 0px rgba(99, 102, 241, 0.2)",
                    maxHeight: "88dvh",
                    height: "88dvh",
                }}
            >
                {/* 3D Accent Top Bar */}
                <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_2px_10px_#6366f1]" />

                {/* Header */}
                <div
                    className="flex items-center justify-between px-6 py-4 flex-shrink-0 relative z-20 bg-slate-900/80 rounded-none"
                    style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-indigo-500 shadow-[0_0_12px_#6366f1] rounded-none animate-pulse" />
                        <div>
                            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">
                                Project Details
                            </p>
                            <h2 className="text-white text-base sm:text-xl font-black tracking-wide uppercase">
                                {project.title}
                            </h2>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="flex items-center justify-center w-9 h-9 bg-slate-800 text-slate-300 hover:text-white hover:bg-rose-600 border border-white/10 transition-all active:translate-y-0.5 shadow-[3px_3px_0px_0px_#0f172a] rounded-none"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* ── Scroll Area (Lenis Wrapper) ── */}
                <div
                    ref={scrollRef}
                    className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden rounded-none"
                    style={{
                        WebkitOverflowScrolling: "touch",
                        overscrollBehavior: "contain",
                    }}
                >
                    {/* Inner Container for Lenis */}
                    <div className="p-4 sm:p-6 flex flex-col gap-6">

                        {/* Image Slider (3D Frame, Sharp Corners) */}
                        <div
                            className="relative flex-shrink-0 bg-slate-950 border-2 border-indigo-500/30 shadow-[8px_8px_0px_0px_rgba(15,23,42,0.9)] rounded-none group overflow-hidden"
                            style={{ height: 300 }}
                        >
                            <Image
                                src={project.additionalImages[idx]}
                                alt={`${project.title} ${idx + 1}`}
                                fill className="object-cover select-none transition-transform duration-500"
                                draggable={false}
                                sizes="(max-width: 768px) 100vw, 896px"
                                priority
                            />

                            {/* Overlays */}
                            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950/70 to-transparent pointer-events-none" />
                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

                            {total > 1 && (
                                <>
                                    {/* Left/Right Buttons */}
                                    <button onClick={goPrev} className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-slate-900/90 border border-indigo-500/50 text-white shadow-[3px_3px_0px_0px_#6366f1] transition-all hover:bg-indigo-600 active:translate-x-0 rounded-none">
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button onClick={goNext} className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-slate-900/90 border border-indigo-500/50 text-white shadow-[-3px_3px_0px_0px_#6366f1] transition-all hover:bg-indigo-600 active:translate-x-0 rounded-none">
                                        <ChevronRight size={20} />
                                    </button>

                                    {/* Play / Fullscreen */}
                                    <div className="absolute top-3 right-3 flex items-center gap-2">
                                        <button onClick={() => setPlaying(p => !p)} className="flex items-center justify-center w-8 h-8 bg-slate-900/90 border border-white/20 text-white shadow-[2px_2px_0px_0px_#0f172a] hover:bg-slate-800 rounded-none">
                                            {playing ? <Pause size={14} /> : <Play size={14} />}
                                        </button>
                                        <button onClick={() => setFullscreen(true)} className="flex items-center justify-center w-8 h-8 bg-slate-900/90 border border-white/20 text-white shadow-[2px_2px_0px_0px_#0f172a] hover:bg-slate-800 rounded-none">
                                            <Maximize2 size={14} />
                                        </button>
                                    </div>

                                    {/* Counter */}
                                    <div className="absolute bottom-3 left-4 px-3 py-1 bg-slate-900/90 border border-indigo-500/40 text-slate-200 text-xs font-bold tracking-widest rounded-none shadow-[3px_3px_0px_0px_#0f172a]">
                                        {idx + 1} / {total}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Pagination Bar */}
                        {total > 1 && (
                            <div className="flex justify-center items-center gap-2 -mt-2">
                                {project.additionalImages.map((_, i) => (
                                    <button
                                        key={i} onClick={() => goTo(i)}
                                        className="h-2 rounded-none transition-all duration-300 cursor-pointer"
                                        style={{
                                            width: i === idx ? 32 : 10,
                                            background: i === idx ? "#6366f1" : "rgba(255,255,255,0.2)",
                                            boxShadow: i === idx ? "0 0 10px #6366f1" : "none"
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Overview (3D Box) */}
                        <div className="p-5 bg-slate-900/60 border-l-4 border-l-purple-500 border-t border-r border-b border-white/10 shadow-[6px_6px_0px_0px_rgba(15,23,42,0.8)] rounded-none">
                            <div className="flex items-center gap-2 mb-2.5">
                                <Sparkles className="w-4 h-4 text-purple-400" />
                                <h3 className="text-purple-300 text-xs font-black uppercase tracking-wider">
                                    Project Overview
                                </h3>
                            </div>
                            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                                {project.detailedDescription}
                            </p>
                        </div>

                        {/* Tech Stack (3D Box) */}
                        <div className="p-5 bg-slate-900/60 border-l-4 border-l-sky-500 border-t border-r border-b border-white/10 shadow-[6px_6px_0px_0px_rgba(15,23,42,0.8)] rounded-none">
                            <div className="flex items-center gap-2 mb-3.5">
                                <Layers className="w-4 h-4 text-sky-400" />
                                <h3 className="text-sky-300 text-xs font-black uppercase tracking-wider">
                                    Technologies Used
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                                {project.techStack.map((tech, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 bg-slate-800 border border-white/10 px-3.5 py-1.5 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-x-0.5 hover:-translate-y-0.5 hover:border-indigo-500/50 transition-all rounded-none"
                                    >
                                        <Image src={tech.icon} alt={tech.name} width={18} height={18} className="w-4 h-4 object-contain" />
                                        <span className="text-slate-200 text-xs sm:text-sm font-semibold">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Key Features (3D Box) */}
                        {project.features && project.features.length > 0 && (
                            <div className="p-5 bg-slate-900/60 border-l-4 border-l-emerald-500 border-t border-r border-b border-white/10 shadow-[6px_6px_0px_0px_rgba(15,23,42,0.8)] rounded-none">
                                <div className="flex items-center gap-2 mb-3.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    <h3 className="text-emerald-300 text-xs font-black uppercase tracking-wider">
                                        Key Highlights & Features
                                    </h3>
                                </div>
                                <ul className="grid grid-cols-1 gap-2.5">
                                    {project.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3 bg-slate-950/60 p-3 border border-white/5 rounded-none shadow-[2px_2px_0px_0px_#0f172a]">
                                            <span className="mt-1.5 w-2 h-2 bg-emerald-400 shrink-0 shadow-[0_0_8px_#34d399] rounded-none" />
                                            <span className="text-slate-300 text-xs sm:text-sm leading-relaxed">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CTA Buttons (3D Solid Extrusion) */}
                        <div className="flex flex-wrap gap-4 pt-2 pb-2">
                            {project.liveLink && (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-indigo-600 border-2 border-indigo-400 shadow-[5px_5px_0px_0px_#0f172a] hover:bg-indigo-500 hover:shadow-[7px_7px_0px_0px_#6366f1] hover:-translate-y-0.5 transition-all active:translate-y-0 rounded-none"
                                >
                                    <span>Live Preview</span>
                                    <ExternalLink size={15} />
                                </a>
                            )}

                            {project.frontendRepo && (
                                <a
                                    href={project.frontendRepo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-slate-200 bg-slate-800 border-2 border-slate-600 shadow-[5px_5px_0px_0px_#0f172a] hover:bg-slate-700 hover:border-slate-400 hover:-translate-y-0.5 transition-all active:translate-y-0 rounded-none"
                                >
                                    <Github size={15} />
                                    <span>Frontend Code</span>
                                </a>
                            )}

                            {project.backendRepo && (
                                <a
                                    href={project.backendRepo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider text-slate-200 bg-slate-800 border-2 border-slate-600 shadow-[5px_5px_0px_0px_#0f172a] hover:bg-slate-700 hover:border-slate-400 hover:-translate-y-0.5 transition-all active:translate-y-0 rounded-none"
                                >
                                    <Github size={15} />
                                    <span>Backend Code</span>
                                </a>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(
        fullscreen ? fullscreenContent : modalContent,
        document.body
    );
});

ProjectDetailModal.displayName = "ProjectDetailModal";
export default ProjectDetailModal;