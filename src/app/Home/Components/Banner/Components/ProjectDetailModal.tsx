'use client';

import { useState, useEffect, useCallback, useRef, memo } from "react";
import Link from "next/link";
import { Pause, Play, ChevronLeft, ChevronRight, X, ExternalLink, Github, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
    title: string;
    description: string;
    detailedDescription: string;
    liveLink: string;
    frontendRepo?: string | null;
    backendRepo?: string | null;
    imageUrl: string;
    additionalImages: string[];
    techStack: Array<{ name: string; icon: string }>;
    features: string[];
}

interface Props {
    project: Project;
    isOpen: boolean;
    onClose: () => void;
}

// ─── Glass styles ─────────────────────────────────────────────────────────────
const MODAL_STYLES = `
    @keyframes modalFadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
    @keyframes modalSlideUp {
        from { opacity: 0; transform: translateY(32px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0)    scale(1);    }
    }
    @keyframes progressBar {
        from { width: 0%; }
        to   { width: 100%; }
    }

    /* ── Backdrop ── */
    .modal-backdrop {
        animation: modalFadeIn 0.25s ease forwards;
        background: rgba(0,0,0,0.72);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
    }

    /* ── Glass card ── */
    .glass-modal {
        animation: modalSlideUp 0.38s cubic-bezier(0.22,1,0.36,1) forwards;
        background: linear-gradient(
            135deg,
            rgba(255,255,255,0.09) 0%,
            rgba(255,255,255,0.04) 50%,
            rgba(255,255,255,0.07) 100%
        );
        backdrop-filter: blur(28px);
        -webkit-backdrop-filter: blur(28px);
        border: 1px solid rgba(255,255,255,0.14);
        border-radius: 28px;
        box-shadow:
            0 32px 80px rgba(0,0,0,0.50),
            inset 0 1px 0 rgba(255,255,255,0.20),
            inset 0 -1px 0 rgba(255,255,255,0.05);
    }

    /* ── Custom scrollbar for modal body (Lenis handles page scroll) ── */
    .modal-scroll::-webkit-scrollbar        { width: 4px; }
    .modal-scroll::-webkit-scrollbar-track  { background: transparent; }
    .modal-scroll::-webkit-scrollbar-thumb  { background: rgba(255,255,255,0.18); border-radius: 99px; }

    /* ── Glass section card ── */
    .glass-section {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.10);
        border-radius: 16px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
    }

    /* ── Glass button base ── */
    .glass-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 11px 22px;
        border-radius: 14px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: #fff;
        cursor: pointer;
        transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        border: 1px solid rgba(255,255,255,0.18);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-shadow: 0 4px 16px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.20);
        white-space: nowrap;
        flex: 1;
        min-width: 160px;
    }
    .glass-btn:hover  { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.26); }
    .glass-btn:active { transform: translateY(0px) scale(0.98); }

    /* variants */
    .glass-btn-live     { background: linear-gradient(135deg, rgba(16,185,129,0.55), rgba(5,150,105,0.40)); border-color: rgba(16,185,129,0.40); }
    .glass-btn-live:hover { background: linear-gradient(135deg, rgba(16,185,129,0.70), rgba(5,150,105,0.55)); }

    .glass-btn-fe       { background: linear-gradient(135deg, rgba(59,130,246,0.50), rgba(37,99,235,0.38)); border-color: rgba(59,130,246,0.38); }
    .glass-btn-fe:hover { background: linear-gradient(135deg, rgba(59,130,246,0.66), rgba(37,99,235,0.52)); }

    .glass-btn-be       { background: linear-gradient(135deg, rgba(168,85,247,0.50), rgba(124,58,237,0.38)); border-color: rgba(168,85,247,0.38); }
    .glass-btn-be:hover { background: linear-gradient(135deg, rgba(168,85,247,0.66), rgba(124,58,237,0.52)); }

    /* ── Close button ── */
    .glass-close {
        width: 36px; height: 36px;
        display: flex; align-items: center; justify-content: center;
        border-radius: 10px;
        background: rgba(255,255,255,0.07);
        border: 1px solid rgba(255,255,255,0.14);
        color: rgba(255,255,255,0.7);
        cursor: pointer;
        transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
        flex-shrink: 0;
    }
    .glass-close:hover { background: rgba(239,68,68,0.28); border-color: rgba(239,68,68,0.45); color: #fff; transform: scale(1.08); }

    /* ── Nav arrow buttons ── */
    .slide-nav {
        display: flex; align-items: center; justify-content: center;
        width: 38px; height: 38px; border-radius: 50%;
        background: rgba(255,255,255,0.82);
        border: none; cursor: pointer;
        transition: background 0.15s ease, transform 0.15s ease;
        box-shadow: 0 2px 12px rgba(0,0,0,0.22);
    }
    .slide-nav:hover { background: #fff; transform: scale(1.1); }

    .slide-ctrl {
        display: flex; align-items: center; justify-content: center;
        width: 34px; height: 34px; border-radius: 50%;
        background: rgba(0,0,0,0.55);
        border: 1px solid rgba(255,255,255,0.15);
        cursor: pointer; color: #fff;
        transition: background 0.15s ease, transform 0.15s ease;
    }
    .slide-ctrl:hover { background: rgba(0,0,0,0.78); transform: scale(1.08); }

    /* ── Auto-progress bar ── */
    .progress-bar-anim {
        animation: progressBar 4s linear forwards;
    }

    /* ── Tech chip ── */
    .tech-chip {
        display: flex; align-items: center; gap: 10px;
        padding: 10px 14px;
        background: rgba(255,255,255,0.07);
        border: 1px solid rgba(255,255,255,0.11);
        border-radius: 14px;
        transition: background 0.15s ease, border-color 0.15s ease;
    }
    .tech-chip:hover { background: rgba(255,255,255,0.13); border-color: rgba(255,255,255,0.22); }

    /* ── Feature item ── */
    .feature-dot {
        width: 7px; height: 7px; border-radius: 50%;
        background: linear-gradient(135deg, #60a5fa, #a78bfa);
        flex-shrink: 0;
    }

    /* ── Dot indicator ── */
    .dot-btn {
        border: none; cursor: pointer; border-radius: 999px;
        transition: all 0.28s ease;
        background: rgba(255,255,255,0.28);
    }
    .dot-btn.active  { width: 24px; height: 10px; background: rgba(96,165,250,0.9); }
    .dot-btn.inactive{ width: 10px; height: 10px; }
    .dot-btn.inactive:hover { background: rgba(255,255,255,0.55); }
`;

// ─── Framer Motion ────────────────────────────────────────────────────────────
const imgVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0, transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.26 } },
};

// ─── Component ────────────────────────────────────────────────────────────────
const ProjectDetailModal = memo(({ project, isOpen, onClose }: Props) => {
    const [idx, setIdx] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [fullscreen, setFullscreen] = useState(false);
    const [direction, setDirection] = useState(1);
    const [barKey, setBarKey] = useState(0); // forces progress-bar re-animation

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const lenisRef = useRef<any>(null);
    const total = project.additionalImages.length;

    // ── Navigation ────────────────────────────────────────────────────────────
    const goNext = useCallback(() => {
        setDirection(1);
        setIdx(p => (p + 1) % total);
        setBarKey(k => k + 1);
    }, [total]);

    const goPrev = useCallback(() => {
        setDirection(-1);
        setIdx(p => (p - 1 + total) % total);
        setBarKey(k => k + 1);
    }, [total]);

    const goTo = useCallback((i: number) => {
        setDirection(i > idx ? 1 : -1);
        setIdx(i);
        setBarKey(k => k + 1);
    }, [idx]);

    // ── Slider control ────────────────────────────────────────────────────────
    const stopSlider = useCallback(() => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startSlider = useCallback(() => {
        stopSlider();
        if (total <= 1) return;
        intervalRef.current = setInterval(() => {
            setDirection(1);
            setIdx(p => (p + 1) % total);
            setBarKey(k => k + 1);
        }, 4000);
    }, [total, stopSlider]);

    useEffect(() => {
        if (isOpen && playing && !fullscreen) startSlider();
        else stopSlider();
        return stopSlider;
    }, [isOpen, playing, fullscreen, startSlider, stopSlider]);

    // ── Lenis for modal scroll ─────────────────────────────────────────────────
    useEffect(() => {
        if (!isOpen || !scrollRef.current) return;

        let lenis: any = null;

        const boot = async () => {
            try {
                const { default: Lenis } = await import("@studio-freight/lenis");
                lenis = new Lenis({
                    wrapper: scrollRef.current!,
                    content: scrollRef.current!,
                    duration: 1.2,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    smoothWheel: true,
                    touchMultiplier: 1.8,
                    infinite: false,
                });

                const tick = (time: number) => {
                    lenis?.raf(time);
                };

                const rafLoop = (time: number) => {
                    tick(time);
                    lenisRef.current = requestAnimationFrame(rafLoop);
                };
                lenisRef.current = requestAnimationFrame(rafLoop);
            } catch {
                // native scroll fallback
            }
        };

        boot();

        return () => {
            lenis?.destroy();
            if (lenisRef.current) cancelAnimationFrame(lenisRef.current);
        };
    }, [isOpen]);

    // ── Reset on close ────────────────────────────────────────────────────────
    useEffect(() => {
        if (!isOpen) {
            setIdx(0);
            setPlaying(true);
            setFullscreen(false);
            setBarKey(0);
        }
    }, [isOpen]);

    // ── Keyboard ──────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!isOpen) return;

        const onKey = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowLeft": e.preventDefault(); goPrev(); startSlider(); break;
                case "ArrowRight": e.preventDefault(); goNext(); startSlider(); break;
                case " ": e.preventDefault(); setPlaying(p => !p); break;
                case "f": case "F": e.preventDefault(); setFullscreen(p => !p); break;
                case "Escape":
                    if (fullscreen) setFullscreen(false);
                    else onClose();
                    break;
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [isOpen, fullscreen, goNext, goPrev, onClose, startSlider]);

    if (!isOpen) return null;

    // ─── FULLSCREEN ───────────────────────────────────────────────────────────
    if (fullscreen) {
        return (
            <div className="fixed inset-0 z-[60] backdrop-blur-md flex items-center justify-center">
                <style>{MODAL_STYLES}</style>

                <AnimatePresence mode="wait" custom={direction}>
                    <motion.img
                        key={idx}
                        custom={direction}
                        src={project.additionalImages[idx]}
                        alt={`${project.title} ${idx + 1}`}
                        initial={{ opacity: 0, x: direction * 60 }}
                        animate={{ opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
                        exit={{ opacity: 0, x: direction * -60, transition: { duration: 0.28 } }}
                        className="max-w-full max-h-full object-contain select-none"
                        draggable={false}
                    />
                </AnimatePresence>

                <button onClick={() => setFullscreen(false)} className="slide-ctrl absolute top-4 right-4 z-10" style={{ width: 40, height: 40 }} aria-label="Exit fullscreen">
                    <X size={20} />
                </button>

                {total > 1 && (
                    <>
                        <button onClick={() => { goPrev(); startSlider(); }} className="slide-ctrl absolute left-4 top-1/2 -translate-y-1/2 z-10" style={{ width: 48, height: 48 }} aria-label="Previous">
                            <ChevronLeft size={26} />
                        </button>
                        <button onClick={() => { goNext(); startSlider(); }} className="slide-ctrl absolute right-4 top-1/2 -translate-y-1/2 z-10" style={{ width: 48, height: 48 }} aria-label="Next">
                            <ChevronRight size={26} />
                        </button>
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 select-none"
                            style={{ background: "rgba(0,0,0,0.6)", color: "#fff", padding: "6px 16px", borderRadius: 999, fontSize: 13 }}>
                            {idx + 1} / {total}
                        </div>
                    </>
                )}
            </div>
        );
    }

    // ─── NORMAL MODAL ─────────────────────────────────────────────────────────
    return (
        <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4">
            <style>{MODAL_STYLES}</style>

            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={onClose} />

            <div className="glass-modal relative z-10 w-full max-w-4xl flex flex-col" style={{ maxHeight: "92vh" }}>

                {/* ── Header ── */}
                <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.10)", flexShrink: 0 }}>
                    <div>
                        <p style={{ color: "rgba(255,255,255,0.40)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
                            Project Detail
                        </p>
                        <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: 0 }}>{project.title}</h2>
                    </div>
                    <button className="glass-close" onClick={onClose} aria-label="Close">
                        <X size={16} />
                    </button>
                </div>

                {/* ── Scrollable body (Lenis-powered) ── */}
                <div
                    ref={scrollRef}
                    className="modal-scroll"
                    style={{ overflowY: "scroll", overflowX: "hidden", flex: 1 }}
                >
                    <div style={{ padding: "20px 24px 28px" }}>

                        {/* ── Image Slider ── */}
                        <div style={{ borderRadius: 18, overflow: "hidden", marginBottom: 20 }}>

                            {/* Main image */}
                            <div
                                className="relative cursor-zoom-in"
                                style={{ height: 300, background: "#0a0a12", overflow: "hidden" }}
                                onClick={() => setFullscreen(true)}
                            >
                                <AnimatePresence mode="wait" custom={direction}>
                                    <motion.img
                                        key={idx}
                                        custom={direction}
                                        src={project.additionalImages[idx]}
                                        alt={`${project.title} ${idx + 1}`}
                                        initial={{ opacity: 0, x: direction * 50 }}
                                        animate={{ opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
                                        exit={{ opacity: 0, x: direction * -50, transition: { duration: 0.27 } }}
                                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                                        draggable={false}
                                    />
                                </AnimatePresence>

                                {/* Progress bar */}
                                {playing && total > 1 && (
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.12)", zIndex: 10 }}>
                                        <div
                                            key={barKey}
                                            className="progress-bar-anim"
                                            style={{ height: "100%", background: "linear-gradient(90deg,#60a5fa,#a78bfa)", borderRadius: 999 }}
                                        />
                                    </div>
                                )}

                                {total > 1 && (
                                    <>
                                        {/* Prev / Next */}
                                        <button
                                            onClick={e => { e.stopPropagation(); goPrev(); startSlider(); }}
                                            className="slide-nav absolute left-3 top-1/2 -translate-y-1/2 z-10"
                                            aria-label="Previous image"
                                        >
                                            <ChevronLeft size={20} className="text-gray-800" />
                                        </button>
                                        <button
                                            onClick={e => { e.stopPropagation(); goNext(); startSlider(); }}
                                            className="slide-nav absolute right-3 top-1/2 -translate-y-1/2 z-10"
                                            aria-label="Next image"
                                        >
                                            <ChevronRight size={20} className="text-gray-800" />
                                        </button>

                                        {/* Play/Pause */}
                                        <button
                                            onClick={e => { e.stopPropagation(); setPlaying(p => !p); }}
                                            className="slide-ctrl absolute top-3 right-3 z-10"
                                            aria-label={playing ? "Pause" : "Play"}
                                        >
                                            {playing
                                                ? <Pause size={16} style={{ color: "#4ade80" }} />
                                                : <Play size={16} style={{ color: "#facc15" }} />
                                            }
                                        </button>

                                        {/* Fullscreen */}
                                        <button
                                            onClick={e => { e.stopPropagation(); setFullscreen(true); }}
                                            className="slide-ctrl absolute top-3 left-3 z-10"
                                            aria-label="Fullscreen"
                                        >
                                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                            </svg>
                                        </button>

                                        {/* Counter */}
                                        <div style={{
                                            position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
                                            background: "rgba(0,0,0,0.58)", color: "#fff", padding: "4px 12px",
                                            borderRadius: 999, fontSize: 12, zIndex: 10, userSelect: "none",
                                        }}>
                                            {idx + 1} / {total}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Dot indicators */}
                            {total > 1 && (
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, padding: "12px 0", background: "rgba(255,255,255,0.04)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                                    {project.additionalImages.map((_, i) => (
                                        <button
                                            key={i}
                                            className={`dot-btn ${i === idx ? "active" : "inactive"}`}
                                            onClick={() => { goTo(i); startSlider(); }}
                                            aria-label={`Image ${i + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ── Project Overview ── */}
                        <div className="glass-section" style={{ padding: "20px 22px", marginBottom: 16 }}>
                            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
                                Overview
                            </p>
                            <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.75, margin: 0, fontSize: 14 }}>
                                {project.detailedDescription}
                            </p>
                        </div>

                        {/* ── Key Features ── */}
                        <div className="glass-section" style={{ padding: "20px 22px", marginBottom: 16 }}>
                            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>
                                Key Features
                            </p>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "10px 16px" }}>
                                {project.features.map((f, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.82)", fontSize: 13 }}>
                                        <span className="feature-dot" />
                                        {f}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Tech Stack ── */}
                        <div className="glass-section" style={{ padding: "20px 22px", marginBottom: 24 }}>
                            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>
                                Technology Stack
                            </p>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
                                {project.techStack.map((tech, i) => (
                                    <div key={i} className="tech-chip">
                                        <img src={tech.icon} alt={tech.name} width={28} height={28} style={{ width: 28, height: 28, objectFit: "contain", borderRadius: 7, flexShrink: 0 }} />
                                        <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Glass Action Buttons ── */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, paddingTop: 4, borderTop: "1px solid rgba(255,255,255,0.09)" }}>

                            {/* Live Demo */}
                            <Link href={project.liveLink} target="_blank" rel="noopener noreferrer" style={{ flex: 1, minWidth: 160, textDecoration: "none" }}>
                                <button className="glass-btn glass-btn-live" style={{ width: "100%" }}>
                                    <ExternalLink size={15} />
                                    Live Demo
                                </button>
                            </Link>

                            {/* Frontend Code */}
                            {project.frontendRepo && (
                                <Link href={project.frontendRepo} target="_blank" rel="noopener noreferrer" style={{ flex: 1, minWidth: 160, textDecoration: "none" }}>
                                    <button className="glass-btn glass-btn-fe" style={{ width: "100%" }}>
                                        <Code2 size={15} />
                                        Frontend
                                    </button>
                                </Link>
                            )}

                            {/* Backend Code */}
                            {project.backendRepo && (
                                <Link href={project.backendRepo} target="_blank" rel="noopener noreferrer" style={{ flex: 1, minWidth: 160, textDecoration: "none" }}>
                                    <button className="glass-btn glass-btn-be" style={{ width: "100%" }}>
                                        <Github size={15} />
                                        Backend
                                    </button>
                                </Link>
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