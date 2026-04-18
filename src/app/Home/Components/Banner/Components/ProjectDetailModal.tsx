'use client';

import { useState, useEffect, useRef, memo } from "react";
import { Pause, Play, ChevronLeft, ChevronRight, X } from "lucide-react";

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

const MODAL_STYLES = `
.modal-backdrop { background: rgba(0,0,0,0.72); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); }
.glass-modal { background: linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.07) 100%); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px); border: 1px solid rgba(255,255,255,0.14); border-radius: 28px; box-shadow: 0 32px 80px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.20), inset 0 -1px 0 rgba(255,255,255,0.05); display:flex; flex-direction:column; max-height:92vh; }
.modal-scroll { overflow-y:auto; scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.18) transparent; }
.modal-scroll::-webkit-scrollbar { width: 6px; }
.modal-scroll::-webkit-scrollbar-track { background: transparent; }
.modal-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.18); border-radius:99px; }
.glass-section { background: rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.10); border-radius:16px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.08); padding:20px 22px; margin-bottom:16px; }
.glass-btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:11px 22px; border-radius:14px; font-size:13px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; color:#fff; cursor:pointer; border:1px solid rgba(255,255,255,0.18); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow:0 4px 16px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.20); flex:1; min-width:160px; }
.glass-btn:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.26); }
.glass-btn:active { transform: translateY(0px) scale(0.98); }
.glass-close { width:36px; height:36px; display:flex; align-items:center; justify-content:center; border-radius:10px; background: rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.14); color:rgba(255,255,255,0.7); cursor:pointer; flex-shrink:0; }
.glass-close:hover { background: rgba(239,68,68,0.28); border-color: rgba(239,68,68,0.45); color:#fff; transform: scale(1.08); }
.slide-nav { display:flex; align-items:center; justify-content:center; width:38px; height:38px; border-radius:50%; background: rgba(255,255,255,0.82); border:none; cursor:pointer; box-shadow:0 2px 12px rgba(0,0,0,0.22); }
.slide-nav:hover { background:#fff; transform:scale(1.1); }
.slide-ctrl { display:flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:50%; background: rgba(0,0,0,0.55); border:1px solid rgba(255,255,255,0.15); cursor:pointer; color:#fff; }
.slide-ctrl:hover { background: rgba(0,0,0,0.78); transform:scale(1.08); }
.feature-dot { width:7px; height:7px; border-radius:50%; background: linear-gradient(135deg,#60a5fa,#a78bfa); flex-shrink:0; }
.dot-btn { border:none; cursor:pointer; border-radius:999px; transition:all 0.28s ease; background: rgba(255,255,255,0.28); }
.dot-btn.active { width:24px; height:10px; background: rgba(96,165,250,0.9); }
.dot-btn.inactive { width:10px; height:10px; }
.dot-btn.inactive:hover { background: rgba(255,255,255,0.55); }
`;

const ProjectDetailModal = memo(({ project, isOpen, onClose }: Props) => {
    const [idx, setIdx] = useState(0);
    const [playing, setPlaying] = useState(true);
    const [fullscreen, setFullscreen] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const total = project.additionalImages.length;

    const goNext = () => setIdx(p => (p + 1) % total);
    const goPrev = () => setIdx(p => (p - 1 + total) % total);
    const goTo = (i: number) => setIdx(i);

    const stopSlider = () => { if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; } };
    const startSlider = () => {
        stopSlider();
        if (total <= 1) return;
        intervalRef.current = setInterval(goNext, 4000);
    };

    useEffect(() => {
        if (isOpen && playing && !fullscreen) startSlider();
        else stopSlider();
        return stopSlider;
    }, [isOpen, playing, fullscreen]);

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
        return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
    }, [isOpen, fullscreen]);

    if (!isOpen) return null;

    if (fullscreen) {
        return (
            <div className="fixed inset-0 z-[60] backdrop-blur-md flex items-center justify-center">
                <style>{MODAL_STYLES}</style>
                <img src={project.additionalImages[idx]} alt={`${project.title} ${idx + 1}`} className="max-w-full max-h-full object-contain select-none" draggable={false} />
                <button onClick={() => setFullscreen(false)} className="slide-ctrl absolute top-4 right-4" style={{ width: 40, height: 40 }}><X size={20} /></button>
                {total > 1 && <>
                    <button onClick={goPrev} className="slide-ctrl absolute left-4 top-1/2 -translate-y-1/2" style={{ width: 48, height: 48 }}><ChevronLeft size={26} /></button>
                    <button onClick={goNext} className="slide-ctrl absolute right-4 top-1/2 -translate-y-1/2" style={{ width: 48, height: 48 }}><ChevronRight size={26} /></button>
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-black/60 text-white text-sm">{idx + 1} / {total}</div>
                </>}
            </div>
        );
    }

    return (
        <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4">
            <style>{MODAL_STYLES}</style>
            <div className="absolute inset-0" onClick={onClose} />
            <div className="glass-modal relative z-10 w-full max-w-4xl">
                <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
                    <div>
                        <p className="text-[11px] text-white/40 uppercase mb-1">Project Detail</p>
                        <h2 className="text-white text-xl font-bold">{project.title}</h2>
                    </div>
                    <button className="glass-close" onClick={onClose}><X size={16} /></button>
                </div>

                <div className="modal-scroll p-5 flex flex-col gap-5">
                    {/* Image Slider */}
                    <div className="relative rounded-lg overflow-hidden" style={{ height: 300, background: "#0a0a12" }}>
                        <img src={project.additionalImages[idx]} alt={`${project.title} ${idx + 1}`} className="w-full h-full object-cover select-none" draggable={false} />
                        {total > 1 && <>
                            <button onClick={goPrev} className="slide-nav absolute left-3 top-1/2 -translate-y-1/2"><ChevronLeft size={20} /></button>
                            <button onClick={goNext} className="slide-nav absolute right-3 top-1/2 -translate-y-1/2"><ChevronRight size={20} /></button>
                            <button onClick={() => setPlaying(p => !p)} className="slide-ctrl absolute top-3 right-3">{playing ? <Pause size={16} /> : <Play size={16} />}</button>
                            <button onClick={() => setFullscreen(true)} className="slide-ctrl absolute top-3 left-3">
                                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                            </button>
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-sm select-none">{idx + 1}/{total}</div>
                        </>}
                    </div>

                    {/* Dots */}
                    {total > 1 && <div className="flex justify-center items-center gap-2">
                        {project.additionalImages.map((_, i) => (
                            <button key={i} className={`dot-btn ${i === idx ? "active" : "inactive"}`} onClick={() => goTo(i)} />
                        ))}
                    </div>}

                    {/* Overview */}
                    <div className="glass-section">
                        <p className="text-white/45 text-sm mb-2">Overview</p>
                        <p className="text-white text-base">{project.detailedDescription}</p>
                    </div>

                    {/* Tech Stack */}
                    <div className="glass-section">
                        <p className="text-white/45 text-sm mb-2">Tech Stack</p>
                        <div className="flex flex-wrap gap-3">
                            {project.techStack.map((tech, i) => (
                                <div key={i} className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-md">
                                    <img src={tech.icon} alt={tech.name} className="w-5 h-5" />
                                    <span className="text-white text-sm">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    {project.features.length > 0 && <div className="glass-section">
                        <p className="text-white/45 text-sm mb-2">Features</p>
                        <ul className="flex flex-col gap-2">
                            {project.features.map((f, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="feature-dot" />
                                    <span className="text-white text-sm">{f}</span>
                                </li>
                            ))}
                        </ul>
                    </div>}

                    {/* Links */}
                    <div className="flex flex-wrap gap-4 mt-3">
                        {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="glass-btn">Live Demo</a>}
                        {project.frontendRepo && <a href={project.frontendRepo} target="_blank" rel="noopener noreferrer" className="glass-btn">Frontend Repo</a>}
                        {project.backendRepo && <a href={project.backendRepo} target="_blank" rel="noopener noreferrer" className="glass-btn">Backend Repo</a>}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProjectDetailModal;