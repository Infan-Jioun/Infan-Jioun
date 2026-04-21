'use client';

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import ProjectDetailModal from "./ProjectDetailModal";
import ProjectCard from "./ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/app/types/project";

gsap.registerPlugin(ScrollTrigger);

interface Props {
    projects: Project[];
    loading: boolean;
}

const SKELETON_STYLES = `
    @keyframes glassShimmer {
        0%   { transform: translateX(-100%); }
        100% { transform: translateX(250%); }
    }
    @keyframes glassPulse {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.35; }
    }
    .sk-wrap {
        background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.07) 100%);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 24px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(255,255,255,0.05);
    }
    .sk-shimmer-bar {
        position: absolute; top: 0; bottom: 0; width: 60%;
        background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.09) 40%, rgba(255,255,255,0.13) 50%, rgba(255,255,255,0.09) 60%, transparent 100%);
        animation: glassShimmer 2.2s ease-in-out infinite;
    }
    .sk-img-square {
        width: 100%; aspect-ratio: 4 / 3;
        background: linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%);
        border-radius: 14px; border: 1px solid rgba(255,255,255,0.10);
        animation: glassPulse 2s ease-in-out infinite; flex-shrink: 0;
    }
    .sk-badge { height: 26px; border-radius: 999px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); animation: glassPulse 2s ease-in-out infinite; }
    .sk-btn   { height: 42px; border-radius: 12px;  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); animation: glassPulse 2s ease-in-out infinite; }
    .sk-title { height: 26px; border-radius: 8px;   background: rgba(255,255,255,0.12); animation: glassPulse 2s ease-in-out infinite; }
    .sk-line  { height: 12px; border-radius: 999px; background: rgba(255,255,255,0.07); animation: glassPulse 2s ease-in-out infinite; }
    .glass-card-outer {
        background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 60%, rgba(255,255,255,0.06) 100%);
        backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
        border: 1px solid rgba(255,255,255,0.13); border-radius: 24px;
        box-shadow: 0 12px 40px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(255,255,255,0.04);
        transition: box-shadow 0.3s ease, transform 0.3s ease;
    }
    .glass-card-outer:hover {
        box-shadow: 0 20px 60px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(255,255,255,0.06);
        transform: translateY(-2px);
    }
    .glass-header-pill {
        display: inline-block; padding: 6px 22px;
        background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.14);
        border-radius: 999px; backdrop-filter: blur(12px);
        color: rgba(255,255,255,0.6); font-size: 12px; letter-spacing: 0.15em;
        text-transform: uppercase; margin-bottom: 14px;
    }
`;

const GlassSquareSkeleton = ({ delay = 0 }: { delay?: number }) => (
    <div className="sk-wrap relative overflow-hidden p-5 md:p-6" style={{ animationDelay: `${delay}s` }}>
        <style>{SKELETON_STYLES}</style>
        <div className="sk-shimmer-bar" />
        <div className="flex flex-col lg:flex-row gap-5 md:gap-6">
            <div className="lg:w-[38%] flex-shrink-0">
                <div className="sk-img-square" style={{ animationDelay: `${delay}s` }} />
            </div>
            <div className="lg:w-[62%] flex flex-col justify-center gap-4">
                <div className="sk-title" style={{ width: "68%", animationDelay: `${delay + 0.05}s` }} />
                <div className="flex flex-col gap-2">
                    <div className="sk-line" style={{ width: "100%", animationDelay: `${delay + 0.08}s` }} />
                    <div className="sk-line" style={{ width: "90%", animationDelay: `${delay + 0.13}s` }} />
                    <div className="sk-line" style={{ width: "78%", animationDelay: `${delay + 0.18}s` }} />
                </div>
                <div className="flex flex-wrap gap-2">
                    {[72, 58, 66, 50, 70, 54].map((w, i) => (
                        <div key={i} className="sk-badge" style={{ width: w, animationDelay: `${delay + i * 0.08}s` }} />
                    ))}
                </div>
                <div className="flex flex-wrap gap-3">
                    {[110, 130, 94].map((w, i) => (
                        <div key={i} className="sk-btn" style={{ width: w, animationDelay: `${delay + i * 0.1}s` }} />
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const MyProjects = ({ projects, loading }: Props) => {
    const [visibleProjects, setVisibleProjects] = useState(3);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);

    const displayedProjects = useMemo(
        () => projects.slice(0, visibleProjects),
        [projects, visibleProjects]
    );

    // ── Lenis ────────────────────────────────────────────────────────────────
    useEffect(() => {
        let lenis: any = null;
        let rafId: number;
        const boot = async () => {
            try {
                const { default: Lenis } = await import("@studio-freight/lenis");
                lenis = new Lenis({ duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, touchMultiplier: 2.2 });
                const tick = (time: number) => { lenis.raf(time); ScrollTrigger.update(); rafId = requestAnimationFrame(tick); };
                rafId = requestAnimationFrame(tick);
            } catch { }
        };
        boot();
        return () => { lenis?.destroy(); cancelAnimationFrame(rafId); };
    }, []);

    // ── GSAP: header ─────────────────────────────────────────────────────────
    useEffect(() => {
        if (loading || !headerRef.current) return;
        const ctx = gsap.context(() => {
            const st = { trigger: headerRef.current, start: "top 90%", toggleActions: "play none none none" };
            gsap.fromTo(".header-pill", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: st });
            gsap.fromTo(".header-title", { opacity: 0, y: 40, filter: "blur(10px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out", delay: 0.15, scrollTrigger: st });
            gsap.fromTo(".header-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.3, scrollTrigger: st });
        }, sectionRef);
        return () => ctx.revert();
    }, [loading]);

    // ── GSAP: cards — ✅ setTimeout으로 DOM paint 후 실행 ────────────────────
    useEffect(() => {
        if (loading || !listRef.current || !displayedProjects.length) return;

        // ✅ requestAnimationFrame 2번 — React paint 완료 후 GSAP 실행
        const raf = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const cards = listRef.current?.querySelectorAll<HTMLElement>(".project-card-wrap");
                if (!cards?.length) return;

                ScrollTrigger.refresh(); // ✅ 새 카드 높이 재계산

                const ctx = gsap.context(() => {
                    gsap.fromTo(
                        cards,
                        { opacity: 0, y: 80, scale: 0.96 },
                        {
                            opacity: 1, y: 0, scale: 1,
                            duration: 0.8, ease: "power3.out", stagger: 0.18,
                            scrollTrigger: {
                                trigger: listRef.current,
                                start: "top 87%",
                                toggleActions: "play none none none",
                            },
                        }
                    );
                }, sectionRef);

                return () => ctx.revert();
            });
        });

        return () => cancelAnimationFrame(raf);
    }, [loading, displayedProjects.length]);

    // ── GSAP: Load More ───────────────────────────────────────────────────────
    useEffect(() => {
        if (loading || !btnRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                btnRef.current,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.8)",
                    scrollTrigger: { trigger: btnRef.current, start: "top 96%", toggleActions: "play none none none" }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, [loading, visibleProjects]);

    const loadMore = useCallback(() => {
        setVisibleProjects(prev => Math.min(prev + 2, projects.length));
    }, [projects.length]);

    const handleViewDetails = useCallback((project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedProject(null);
    }, []);

    const hasMore = visibleProjects < projects.length;

    return (
        <section ref={sectionRef} className="py-24 bg-transparent" id="projects-section">
            <style>{SKELETON_STYLES}</style>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div ref={headerRef} className="text-center mb-16">
                    <div className="header-pill" style={{ opacity: 0 }}>✦ Portfolio</div>
                    <h2
                        className="header-title text-3xl md:text-5xl font-bold uppercase text-white mb-4 tracking-tight"
                        style={{ opacity: 0, textShadow: "0 0 40px rgba(255,255,255,0.15)" }}
                    >
                        My Projects
                    </h2>
                    <p className="header-sub text-lg text-white/60 max-w-xl mx-auto" style={{ opacity: 0 }}>
                        Explore my latest work and creative solutions
                    </p>
                </div>

                <div ref={listRef} className="space-y-6">
                    {loading
                        ? Array.from({ length: 3 }).map((_, i) => (
                            <GlassSquareSkeleton key={`sk-${i}`} delay={i * 0.18} />
                        ))
                        : displayedProjects.map((project, index) => (
                            <div
                                key={project._id ?? project.title}
                                className="project-card-wrap glass-card-outer"
                                style={{ opacity: 0 }}
                            >
                                <ProjectCard
                                    project={project}
                                    loading={false}
                                    index={index}
                                    onViewDetails={handleViewDetails}
                                />
                            </div>
                        ))
                    }
                </div>

                {!loading && hasMore && (
                    <div ref={btnRef} className="text-center mt-14" style={{ opacity: 0 }}>
                        <button
                            onClick={loadMore}
                            className="relative px-9 py-3.5 text-sm font-semibold tracking-widest uppercase text-white rounded-2xl overflow-hidden transition-transform duration-200 hover:scale-105 active:scale-95"
                            style={{
                                background: "rgba(255,255,255,0.07)",
                                border: "1px solid rgba(255,255,255,0.18)",
                                backdropFilter: "blur(16px)",
                                WebkitBackdropFilter: "blur(16px)",
                                boxShadow: "0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.18)",
                            }}
                        >
                            Load More Projects
                        </button>
                    </div>
                )}

                {selectedProject && (
                    <ProjectDetailModal
                        project={selectedProject}
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </section>
    );
};

export default MyProjects;