"use client";

import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import ProjectDetailModal from "./ProjectDetailModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ExternalLink, Github, Info, Sparkles } from "lucide-react";
import { Project } from "@/app/types/project";

gsap.registerPlugin(ScrollTrigger);

interface Props {
    projects: Project[];
    loading: boolean;
}

type Tab = "production" | "personal";

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const SkeletonCard = ({ delay = 0 }: { delay?: number }) => (
    <div
        className="rounded-none border-2 border-purple-500/30 bg-slate-900/90 p-4 sm:p-5 shadow-[4px_4px_0px_0px_#a855f7] sm:shadow-[5px_5px_0px_0px_#a855f7] flex flex-col justify-between h-full space-y-4"
        style={{ animationDelay: `${delay}s` }}
    >
        <div className="w-full h-48 sm:h-60 rounded-none bg-slate-800/80 animate-pulse border border-slate-700/50" />
        <div className="space-y-3 flex-1">
            <div className="h-6 w-2/3 bg-slate-800/80 animate-pulse rounded-none" />
            <div className="h-4 w-full bg-slate-800/80 animate-pulse rounded-none" />
            <div className="h-4 w-4/5 bg-slate-800/80 animate-pulse rounded-none" />
        </div>
        <div className="flex gap-3 pt-4 border-t border-purple-500/20">
            <div className="h-10 w-1/2 bg-slate-800/80 animate-pulse rounded-none" />
            <div className="h-10 w-1/2 bg-slate-800/80 animate-pulse rounded-none" />
        </div>
    </div>
);

const RightSkeletonItem = ({ delay = 0 }: { delay?: number }) => (
    <div
        className="rounded-none border-2 border-purple-500/20 bg-slate-950 p-2.5 sm:p-3 flex gap-3 shadow-[3px_3px_0px_0px_#a855f7] animate-pulse"
        style={{ animationDelay: `${delay}s` }}
    >
        <div className="w-14 h-12 sm:w-16 sm:h-14 bg-slate-800 rounded-none flex-shrink-0 border border-slate-700" />
        <div className="flex flex-col gap-2 flex-1 justify-center">
            <div className="h-4 w-3/4 bg-slate-800 rounded-none" />
            <div className="h-3 w-1/2 bg-slate-800 rounded-none" />
        </div>
    </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// LEFT FEATURED CARD
// ─────────────────────────────────────────────────────────────────────────────
interface FeaturedCardProps {
    project: Project;
    onViewDetails: (p: Project) => void;
}

const FeaturedCard = ({ project, onViewDetails }: FeaturedCardProps) => (
    <div className="relative group h-full">
        <div
            className="featured-card relative rounded-none border-2 border-purple-500/40 bg-slate-900/90 backdrop-blur-xl shadow-[4px_4px_0px_0px_#a855f7] sm:shadow-[6px_6px_0px_0px_#a855f7] transition-all duration-300 hover:border-purple-400 hover:shadow-[8px_8px_0px_0px_#c084fc] flex flex-col h-full overflow-hidden"
        >
            {/* Top Cyber Accent Line */}
            <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 shadow-[0_0_10px_#a855f7] z-20" />

            {/* Image Container */}
            <div className="relative w-full overflow-hidden border-b-2 border-purple-500/30" style={{ aspectRatio: "16/10", flexShrink: 0 }}>
                {project.imageUrl ? (
                    <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-950 font-mono text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest text-center px-2">
                        NO IMAGE DATA AVAILABLE
                    </div>
                )}

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                {/* Cyber Category Badge */}
                {project.category && (
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-slate-950 border-2 border-purple-500/60 shadow-[3px_3px_0px_0px_#a855f7] px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest text-purple-300 flex items-center gap-1.5 z-10">
                        <span className="w-2 h-2 rounded-none bg-purple-400 shadow-[0_0_8px_#a855f7] animate-pulse" />
                        {project.category}
                    </div>
                )}
            </div>

            {/* Card Body */}
            <div className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-6 flex-1 justify-between bg-slate-900/90 font-mono">
                <div className="space-y-2.5 sm:space-y-3">
                    <h3 className="text-white font-black text-lg sm:text-xl lg:text-2xl uppercase tracking-wider group-hover:text-purple-300 transition-colors duration-200">
                        {project.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                        {project.description}
                    </p>

                    {/* Tech Badges */}
                    {project.techStack?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                            {project.techStack.slice(0, 5).map((tech, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-300 bg-slate-950 border border-slate-800 px-2 sm:px-2.5 py-1 rounded-none shadow-[2px_2px_0px_0px_#334155]"
                                >
                                    {tech.icon && (
                                        <Image src={tech.icon} alt={tech.name} width={12} height={12} className="w-3 h-3 object-contain" />
                                    )}
                                    {tech.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cyber Neo-Brutalist Buttons */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t-2 border-purple-500/20">
                    <button
                        onClick={() => onViewDetails(project)}
                        className="flex-1 min-w-[100px] sm:min-w-[120px] inline-flex items-center justify-center gap-2 bg-slate-950 border-2 border-purple-500/50 shadow-[3px_3px_0px_0px_#a855f7] px-3 sm:px-4 py-2 sm:py-2.5 rounded-none text-purple-300 text-[10px] sm:text-xs font-black tracking-widest uppercase transition-all duration-200 hover:border-purple-400 hover:text-white hover:shadow-[5px_5px_0px_0px_#c084fc] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                    >
                        <Info size={14} className="text-purple-400 flex-shrink-0" />
                        <span>DETAILS</span>
                    </button>

                    {project.liveLink && (
                        
                         <a   href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 min-w-[100px] sm:min-w-[120px] inline-flex items-center justify-center gap-2 bg-indigo-950/80 border-2 border-indigo-500/50 shadow-[3px_3px_0px_0px_#6366f1] px-3 sm:px-4 py-2 sm:py-2.5 rounded-none text-indigo-300 text-[10px] sm:text-xs font-black tracking-widest uppercase transition-all duration-200 hover:border-indigo-400 hover:text-white hover:shadow-[5px_5px_0px_0px_#818cf8] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                        >
                            <ExternalLink size={14} className="text-indigo-400 flex-shrink-0" />
                            <span>PREVIEW</span>
                        </a>
                    )}

                    {/* {(project.frontendRepo || project.backendRepo) && (
                        
                          <a  href={project.frontendRepo ?? project.backendRepo ?? "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-slate-950 border-2 border-slate-700 shadow-[3px_3px_0px_0px_#475569] text-slate-300 hover:border-purple-400 hover:text-white hover:shadow-[4px_4px_0px_0px_#a855f7] transition-all duration-200 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex-shrink-0"
                            aria-label="GitHub Repository"
                        >
                            <Github size={16} />
                        </a>
                    )} */}
                </div>
            </div>
        </div>
    </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// RIGHT LIST ITEM
// ─────────────────────────────────────────────────────────────────────────────
interface ListItemProps {
    project: Project;
    active: boolean;
    onClick: () => void;
}

const ListItem = ({ project, active, onClick }: ListItemProps) => (
    <button
        onClick={onClick}
        className={`w-full text-left flex gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-none border-2 transition-all duration-200 relative font-mono ${
            active
                ? "bg-slate-900 border-purple-400 shadow-[4px_4px_0px_0px_#a855f7]"
                : "bg-slate-950/90 border-slate-800/80 hover:border-purple-500/50 hover:shadow-[3px_3px_0px_0px_#6366f1]"
        }`}
    >
        {/* Active Side Bar Glow */}
        {active && (
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-400 shadow-[0_0_8px_#a855f7]" />
        )}

        <div className="relative flex-shrink-0 rounded-none border border-slate-800 overflow-hidden bg-slate-950 w-14 h-12 sm:w-[68px] sm:h-[54px]">
            {project.imageUrl ? (
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="68px"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-[9px] text-slate-600 font-mono">
                    N/A
                </div>
            )}
        </div>

        <div className="flex flex-col gap-1 flex-1 min-w-0 justify-center">
            <p className={`text-[11px] sm:text-xs font-black uppercase tracking-wider truncate transition-colors duration-200 ${active ? "text-purple-300" : "text-white"}`}>
                {project.title}
            </p>
            <p className="text-slate-400 text-[10px] sm:text-[11px] leading-snug line-clamp-2">
                {project.description}
            </p>
        </div>

        {active && (
            <div className="flex items-center pr-1">
                <span className="w-2 h-2 bg-purple-400 shadow-[0_0_8px_#a855f7] animate-ping" />
            </div>
        )}
    </button>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const MyProjects = ({ projects, loading }: Props) => {
    const [activeTab, setActiveTab] = useState<Tab>("production");
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Calculate Project Counts
    const projectCounts = useMemo(() => {
        return {
            production: projects.filter(p => (p as any).category === "production").length,
            personal: projects.filter(p => (p as any).category === "personal").length,
        };
    }, [projects]);

    // Filter projects
    const filteredProjects = useMemo(
        () => projects.filter(p => (p as any).category === activeTab),
        [projects, activeTab]
    );

    const featuredProject = filteredProjects[activeIndex] ?? null;

    useEffect(() => {
        setActiveIndex(0);
    }, [activeTab]);

    // Lenis Setup
    useEffect(() => {
        let lenis: any = null;
        let rafId: number;
        const boot = async () => {
            try {
                const { default: Lenis } = await import("@studio-freight/lenis");
                lenis = new Lenis({
                    duration: 1.4,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    smoothWheel: true,
                    touchMultiplier: 2.2,
                });
                const tick = (time: number) => {
                    lenis?.raf(time);
                    ScrollTrigger.update();
                    rafId = requestAnimationFrame(tick);
                };
                rafId = requestAnimationFrame(tick);
            } catch { }
        };
        boot();
        return () => { lenis?.destroy(); cancelAnimationFrame(rafId); };
    }, []);

    // GSAP Header Animation
    useEffect(() => {
        if (loading || !headerRef.current) return;
        const ctx = gsap.context(() => {
            const st = { trigger: headerRef.current, start: "top 88%", toggleActions: "play none none none" };
            gsap.fromTo(".hdr-pill",
                { opacity: 0, y: 18 },
                { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", scrollTrigger: st }
            );
            gsap.fromTo(".hdr-title",
                { opacity: 0, y: 38 },
                { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.12, scrollTrigger: st }
            );
            gsap.fromTo(".hdr-sub",
                { opacity: 0, y: 18 },
                { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", delay: 0.26, scrollTrigger: st }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, [loading]);

    // GSAP Left Card Entrance
    useEffect(() => {
        if (loading || !leftRef.current) return;
        const raf = requestAnimationFrame(() => requestAnimationFrame(() => {
            if (!leftRef.current) return;
            ScrollTrigger.refresh();
            const ctx = gsap.context(() => {
                gsap.fromTo(leftRef.current,
                    { opacity: 0, x: -50 },
                    {
                        opacity: 1, x: 0,
                        duration: 0.9, ease: "power3.out",
                        scrollTrigger: { trigger: leftRef.current, start: "top 87%", toggleActions: "play none none none" },
                    }
                );
            }, sectionRef);
            return () => ctx.revert();
        }));
        return () => cancelAnimationFrame(raf);
    }, [loading]);

    // GSAP Right Panel Entrance
    useEffect(() => {
        if (loading || !rightRef.current) return;
        const raf = requestAnimationFrame(() => requestAnimationFrame(() => {
            if (!rightRef.current) return;
            const ctx = gsap.context(() => {
                gsap.fromTo(rightRef.current,
                    { opacity: 0, x: 50 },
                    {
                        opacity: 1, x: 0,
                        duration: 0.9, ease: "power3.out", delay: 0.12,
                        scrollTrigger: { trigger: rightRef.current, start: "top 87%", toggleActions: "play none none none" },
                    }
                );
            }, sectionRef);
            return () => ctx.revert();
        }));
        return () => cancelAnimationFrame(raf);
    }, [loading]);

    // GSAP Stagger list
    useEffect(() => {
        if (!listRef.current || loading) return;
        const items = listRef.current.querySelectorAll<HTMLElement>(".list-item");
        if (!items.length) return;
        gsap.fromTo(items,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.07 }
        );
    }, [activeTab, loading, filteredProjects.length]);

    // GSAP Card Swap
    const prevIndexRef = useRef(activeIndex);
    useEffect(() => {
        if (!leftRef.current) return;
        if (prevIndexRef.current === activeIndex) return;
        prevIndexRef.current = activeIndex;
        const card = leftRef.current.querySelector(".featured-card");
        if (!card) return;
        gsap.fromTo(card,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
        );
    }, [activeIndex]);

    // Select a project from the list. On mobile/tablet (stacked layout),
    // smooth-scroll up to the featured card so the user actually sees the change.
    const handleSelectProject = useCallback((index: number) => {
        setActiveIndex(index);
        if (typeof window !== "undefined" && window.innerWidth < 1024) {
            requestAnimationFrame(() => {
                leftRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        }
    }, []);

    const handleViewDetails = useCallback((project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedProject(null);
    }, []);

    return (
        <section ref={sectionRef} id="projects-section" className="relative py-16 sm:py-24 bg-transparent overflow-hidden">
            {/* Custom Cyber Scrollbar */}
            <style>{`
                .cyber-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .cyber-scrollbar::-webkit-scrollbar-track {
                    background: #020617;
                    border: 1px solid #1e293b;
                }
                .cyber-scrollbar::-webkit-scrollbar-thumb {
                    background: #a855f7;
                }
                .cyber-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #c084fc;
                }
            `}</style>

            {/* Background Glow */}
            <div className="absolute left-10 top-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">

                {/* Header */}
                <div ref={headerRef} className="text-center mb-10 sm:mb-16">
                    <div className="hdr-pill inline-flex items-center gap-2 bg-slate-950 border-2 border-purple-500/50 shadow-[3px_3px_0px_0px_#a855f7] px-3 sm:px-4 py-1.5 rounded-none text-purple-300 text-[10px] sm:text-xs font-mono font-black tracking-widest uppercase mb-4">
                        <Sparkles size={12} className="text-purple-400" />
                        <span>Featured Work</span>
                    </div>

                    <h2 className="hdr-title text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-widest text-white drop-shadow-lg mb-4">
                        MY <span className="text-purple-400">PROJECTS</span>
                    </h2>

                    {/* Cyber Divider */}
                    <div className="relative w-36 sm:w-48 mx-auto my-4">
                        <div className="w-full border-t-2 border-purple-500/40" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-400 rotate-45 shadow-[0_0_8px_#a855f7]" />
                    </div>

                    <p className="hdr-sub text-slate-400 font-mono text-xs sm:text-sm max-w-xl mx-auto tracking-wide uppercase px-2">
                        Explore my latest production solutions and full-stack technical creations
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">

                    {/* LEFT: Featured Card */}
                    {/* scroll-mt gives offset space when we scrollIntoView on mobile, so it doesn't land flush under a sticky navbar. Adjust the value to match your navbar height. */}
                    <div
                        ref={leftRef}
                        className="h-full flex flex-col scroll-mt-24"
                        style={{ opacity: 0 }}
                    >
                        {loading ? (
                            <SkeletonCard />
                        ) : featuredProject ? (
                            <FeaturedCard project={featuredProject} onViewDetails={handleViewDetails} />
                        ) : (
                            <div className="rounded-none border-2 border-purple-500/40 bg-slate-900/90 shadow-[6px_6px_0px_0px_#a855f7] flex items-center justify-center h-full min-h-[320px] sm:min-h-[380px] px-4 text-center">
                                <p className="text-slate-400 font-mono text-xs uppercase tracking-wider">No projects found in this category</p>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Tabs + List */}
                    <div ref={rightRef} className="h-full flex flex-col gap-4" style={{ opacity: 0 }}>

                        {/* Cyber Tab Bar */}
                        <div className="flex gap-2 p-1.5 bg-slate-950 border-2 border-purple-500/40 shadow-[3px_3px_0px_0px_#a855f7] sm:shadow-[4px_4px_0px_0px_#a855f7] font-mono">
                            {(["production", "personal"] as Tab[]).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-2.5 px-3 sm:py-3 sm:px-4 rounded-none text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 border-2 ${
                                        activeTab === tab
                                            ? "bg-slate-900 border-purple-400 text-purple-300 shadow-[3px_3px_0px_0px_#a855f7]"
                                            : "bg-transparent border-transparent text-slate-400 hover:text-white"
                                    }`}
                                >
                                    <span>{tab}</span>
                                    <span
                                        className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 border ${
                                            activeTab === tab
                                                ? "bg-purple-950 border-purple-400 text-purple-300"
                                                : "bg-slate-900 border-slate-700 text-slate-500"
                                        }`}
                                    >
                                        {projectCounts[tab]}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* List Container */}
                        <div className="rounded-none border-2 border-purple-500/40 bg-slate-900/90 backdrop-blur-xl shadow-[4px_4px_0px_0px_#a855f7] sm:shadow-[6px_6px_0px_0px_#a855f7] p-3 sm:p-4 flex flex-col gap-3 flex-1">
                            {/* Panel Header */}
                            <div className="flex items-center justify-between pb-3 border-b-2 border-purple-500/20 font-mono">
                                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400">
                                    {filteredProjects.length} {filteredProjects.length === 1 ? "Project" : "Projects"} Available
                                </span>
                                <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 uppercase bg-purple-950 border border-purple-500/50 text-purple-300">
                                    {activeTab}
                                </span>
                            </div>

                            {/* Scrollable List */}
                            <div
                                ref={listRef}
                                data-lenis-prevent
                                className="flex-1 overflow-y-auto max-h-[340px] sm:max-h-[420px] lg:max-h-[460px] flex flex-col gap-2 sm:gap-2.5 pr-1 cyber-scrollbar"
                            >
                                {loading ? (
                                    Array.from({ length: 4 }).map((_, i) => <RightSkeletonItem key={i} delay={i * 0.12} />)
                                ) : filteredProjects.length > 0 ? (
                                    filteredProjects.map((project, i) => (
                                        <div key={project._id ?? project.title ?? i} className="list-item">
                                            <ListItem
                                                project={project}
                                                active={i === activeIndex}
                                                onClick={() => handleSelectProject(i)}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-12 text-center text-slate-500 font-mono text-xs uppercase tracking-wider">
                                        No projects available in this category.
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Project Modal */}
            {selectedProject && (
                <ProjectDetailModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    project={selectedProject}
                />
            )}
        </section>
    );
};

export default MyProjects;