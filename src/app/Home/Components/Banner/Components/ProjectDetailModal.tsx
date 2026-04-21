'use client';

import { useState, useEffect, useRef, memo } from "react";
import { Pause, Play, ChevronLeft, ChevronRight, X } from "lucide-react";
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
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const lenisRef = useRef<any>(null);

    const total = project.additionalImages.length;

    const goNext = () => setIdx(p => (p + 1) % total);
    const goPrev = () => setIdx(p => (p - 1 + total) % total);
    const goTo = (i: number) => setIdx(i);

    const stopSlider = () => { if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; } };
    const startSlider = () => { stopSlider(); if (total <= 1) return; intervalRef.current = setInterval(goNext, 4000); };

    // ── Lenis on modal scroll container ──────────────────────────────
    useEffect(() => {
        if (!isOpen || !scrollRef.current) return;

        let rafId: number;

        const boot = async () => {
            try {
                const { default: Lenis } = await import("@studio-freight/lenis");

                lenisRef.current = new Lenis({
                    wrapper: scrollRef.current!,      // ✅ modal scroll div
                    content: scrollRef.current!.firstElementChild as HTMLElement,
                    duration: 1.2,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    smoothWheel: true,
                    touchMultiplier: 2.5,
                    infinite: false,
                });

                const tick = (time: number) => {
                    lenisRef.current?.raf(time);
                    rafId = requestAnimationFrame(tick);
                };
                rafId = requestAnimationFrame(tick);
            } catch {
                // fallback — native scroll
            }
        };

        boot();

        return () => {
            lenisRef.current?.destroy();
            lenisRef.current = null;
            cancelAnimationFrame(rafId);
        };
    }, [isOpen]);

    // ── Pause Lenis when fullscreen ───────────────────────────────────
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

    // ── Keyboard ─────────────────────────────────────────────────────
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

    if (!isOpen) return null;

    // ── Fullscreen ───────────────────────────────────────────────────
    if (fullscreen) {
        return (
            <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center p-4">
                    <Image
                        src={project.additionalImages[idx]}
                        alt={`${project.title} ${idx + 1}`}
                        fill className="object-contain select-none"
                        draggable={false} sizes="100vw" priority
                    />
                </div>
                <button onClick={() => setFullscreen(false)}
                    className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/55 border border-white/15 text-white hover:bg-black/78 transition-all">
                    <X size={20} />
                </button>
                {total > 1 && (
                    <>
                        <button onClick={goPrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-black/55 border border-white/15 text-white hover:bg-black/78 transition-all">
                            <ChevronLeft size={26} />
                        </button>
                        <button onClick={goNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-black/55 border border-white/15 text-white hover:bg-black/78 transition-all">
                            <ChevronRight size={26} />
                        </button>
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full bg-black/60 text-white text-sm select-none">
                            {idx + 1} / {total}
                        </div>
                    </>
                )}
            </div>
        );
    }

    // ── Normal modal ─────────────────────────────────────────────────
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
            style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }}
        >
            {/* Backdrop */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal */}
            <div
                className="relative z-10 w-full max-w-4xl flex flex-col rounded-[24px] sm:rounded-[28px]"
                style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.07) 100%)",
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.20)",
                    maxHeight: "92dvh",
                    height: "92dvh",
                }}
            >
                {/* ── Header ── */}
                <div
                    className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 flex-shrink-0"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.10)" }}
                >
                    <div>
                        <p className="text-[11px] text-white/40 uppercase tracking-widest mb-1">Project Detail</p>
                        <h2 className="text-white text-lg sm:text-xl font-bold">{project.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center w-9 h-9 rounded-xl text-white/70 hover:text-white hover:bg-red-500/30 border border-white/[0.14] transition-all flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.07)" }}
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* ── Scroll area — Lenis wrapper ── */}
                <div
                    ref={scrollRef}
                    className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
                    style={{
                        // ✅ cursor grab for Lenis drag feel
                        cursor: "default",
                        // native fallback for touch
                        WebkitOverflowScrolling: "touch",
                        overscrollBehavior: "contain",
                    }}
                >
                    {/* ✅ single child div — Lenis needs wrapper → content structure */}
                    <div className="p-4 sm:p-5 flex flex-col gap-4 sm:gap-5">

                        {/* Image Slider */}
                        <div className="relative rounded-2xl overflow-hidden flex-shrink-0 bg-[#0a0a12]" style={{ height: 260 }}>
                            <Image
                                src={project.additionalImages[idx]}
                                alt={`${project.title} ${idx + 1}`}
                                fill className="object-cover select-none"
                                draggable={false}
                                sizes="(max-width: 768px) 100vw, 896px"
                                priority
                            />
                            {total > 1 && (
                                <>
                                    <button onClick={goPrev} className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow-md transition-all">
                                        <ChevronLeft size={20} className="text-black" />
                                    </button>
                                    <button onClick={goNext} className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow-md transition-all">
                                        <ChevronRight size={20} className="text-black" />
                                    </button>
                                    <button onClick={() => setPlaying(p => !p)} className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-black/55 border border-white/15 text-white hover:bg-black/78 transition-all">
                                        {playing ? <Pause size={14} /> : <Play size={14} />}
                                    </button>
                                    <button onClick={() => setFullscreen(true)} className="absolute top-3 left-3 flex items-center justify-center w-8 h-8 rounded-full bg-black/55 border border-white/15 text-white hover:bg-black/78 transition-all">
                                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                    </button>
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-xs select-none">
                                        {idx + 1}/{total}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Dots */}
                        {total > 1 && (
                            <div className="flex justify-center items-center gap-2">
                                {project.additionalImages.map((_, i) => (
                                    <button
                                        key={i} onClick={() => goTo(i)}
                                        className="rounded-full transition-all duration-300 border-none cursor-pointer"
                                        style={{
                                            width: i === idx ? 24 : 10, height: 10,
                                            background: i === idx ? "rgba(96,165,250,0.9)" : "rgba(255,255,255,0.28)",
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Overview */}
                        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
                            <p className="text-white/45 text-xs uppercase tracking-widest mb-2">Overview</p>
                            <p className="text-white text-sm sm:text-base leading-relaxed">{project.detailedDescription}</p>
                        </div>

                        {/* Tech Stack */}
                        <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
                            <p className="text-white/45 text-xs uppercase tracking-widest mb-3">Tech Stack</p>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, i) => (
                                    <div key={i} className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                                        <Image src={tech.icon} alt={tech.name} width={18} height={18} className="w-4 h-4 object-contain" />
                                        <span className="text-white text-xs sm:text-sm">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        {project.features.length > 0 && (
                            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
                                <p className="text-white/45 text-xs uppercase tracking-widest mb-3">Features</p>
                                <ul className="flex flex-col gap-2">
                                    {project.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                                                style={{ background: "linear-gradient(135deg,#60a5fa,#a78bfa)" }} />
                                            <span className="text-white text-xs sm:text-sm leading-relaxed">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Links */}
                        <div className="flex flex-wrap gap-3 pb-2">
                            {project.liveLink && (
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                                    className="flex-1 min-w-[120px] inline-flex items-center justify-center px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 active:scale-95"
                                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(12px)" }}>
                                    Live Demo
                                </a>
                            )}
                            {project.frontendRepo && (
                                <a href={project.frontendRepo} target="_blank" rel="noopener noreferrer"
                                    className="flex-1 min-w-[120px] inline-flex items-center justify-center px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 active:scale-95"
                                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(12px)" }}>
                                    Frontend Repo
                                </a>
                            )}
                            {project.backendRepo && (
                                <a href={project.backendRepo} target="_blank" rel="noopener noreferrer"
                                    className="flex-1 min-w-[120px] inline-flex items-center justify-center px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 active:scale-95"
                                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(12px)" }}>
                                    Backend Repo
                                </a>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
});

ProjectDetailModal.displayName = "ProjectDetailModal";
export default ProjectDetailModal;