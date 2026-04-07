'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'swiper/css';
import 'swiper/css/pagination';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/* ──────────────────────────────────────────────────
   SVG ICONS
────────────────────────────────────────────────── */
const IconJS = () => (
    <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect width="48" height="48" rx="10" fill="#F7DF1E" />
        <path d="M12.5 35.8l3.4-2.06c.66 1.17 1.26 2.15 2.7 2.15 1.38 0 2.25-.54 2.25-2.64V19.5h4.2v13.82c0 4.34-2.54 6.32-6.25 6.32-3.35 0-5.3-1.74-6.3-3.84zM27 35.3l3.4-1.98c.9 1.46 2.06 2.54 4.12 2.54 1.73 0 2.83-.87 2.83-2.07 0-1.43-1.14-1.94-3.05-2.77l-1.05-.45c-3.02-1.29-5.03-2.9-5.03-6.31 0-3.14 2.4-5.54 6.14-5.54 2.66 0 4.57.92 5.94 3.35l-3.26 2.09c-.72-1.28-1.5-1.79-2.69-1.79-1.23 0-2 .78-2 1.79 0 1.25.78 1.76 2.57 2.54l1.05.45c3.56 1.52 5.57 3.08 5.57 6.57 0 3.77-2.96 5.84-6.93 5.84-3.89 0-6.4-1.85-7.62-4.27z" fill="#323330" />
    </svg>
);
const IconTS = () => (
    <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect width="48" height="48" rx="10" fill="#3178C6" />
        <path d="M21.5 33.4V36.5c.54.28 1.18.49 1.92.63.74.15 1.52.22 2.35.22 1.46 0 2.73-.26 3.79-.77 1.06-.51 1.88-1.26 2.44-2.24.56-.98.84-2.14.84-3.5 0-.94-.14-1.76-.43-2.46a5.03 5.03 0 00-1.26-1.83c-.55-.51-1.4-1-2.54-1.48l-1.28-.54c-.59-.25-1.04-.47-1.32-.68a2.12 2.12 0 01-.65-.73c-.12-.27-.19-.58-.19-.94 0-.35.08-.66.23-.92.15-.27.39-.48.7-.64.32-.15.7-.23 1.15-.23.41 0 .79.07 1.15.2.36.14.7.34 1.02.6.31.27.58.59.8.99l2.5-1.61a6.6 6.6 0 00-1.35-1.7 5.86 5.86 0 00-1.91-1.1 7.03 7.03 0 00-2.37-.38c-1.34 0-2.51.26-3.51.77a5.5 5.5 0 00-2.31 2.12c-.54.91-.81 1.94-.81 3.09 0 1.51.41 2.73 1.23 3.68.82.94 2.11 1.72 3.87 2.36l1 .37c.73.27 1.27.54 1.6.79.33.25.57.52.69.81.12.29.18.62.18 1.01 0 .64-.2 1.14-.61 1.49-.41.35-1.01.52-1.79.52-.7 0-1.35-.14-1.96-.43a5.82 5.82 0 01-1.61-1.15 7.1 7.1 0 01-1.13-1.64l-2.64 1.52zM12 23.26H7v-2.75h12.6v2.74h-4.7v13.25H12V23.26z" fill="white" />
    </svg>
);
const IconReact = () => (
    <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect width="48" height="48" rx="10" fill="#20232A" />
        <ellipse cx="24" cy="24" rx="4.2" ry="4.2" fill="#61DAFB" />
        <ellipse cx="24" cy="24" rx="13" ry="4.8" stroke="#61DAFB" strokeWidth="1.8" fill="none" />
        <ellipse cx="24" cy="24" rx="13" ry="4.8" stroke="#61DAFB" strokeWidth="1.8" fill="none" transform="rotate(60 24 24)" />
        <ellipse cx="24" cy="24" rx="13" ry="4.8" stroke="#61DAFB" strokeWidth="1.8" fill="none" transform="rotate(120 24 24)" />
    </svg>
);
const IconNext = () => (
    <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect width="48" height="48" rx="10" fill="#000" />
        <path d="M8 34L28 10h3.5v26H28V14.5L10.5 37 8 34z" fill="white" />
        <path d="M25.5 27l2.5-3.2L38 37h-4.2L25.5 27z" fill="white" />
    </svg>
);
const IconNode = () => (
    <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect width="48" height="48" rx="10" fill="#0F1923" />
        <path d="M24 7l15.5 8.96v17.92L24 42.88 8.5 33.88V15.96L24 7z" fill="none" stroke="#539E43" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="4" fill="#539E43" />
        <path d="M18 28.5V20l6 3.5v6.8L18 28.5zM30 28.5l-6 1.8v-6.8l6-3.5v8.5z" fill="#539E43" opacity=".6" />
    </svg>
);
const IconExpress = () => (
    <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect width="48" height="48" rx="10" fill="#1C1C1C" />
        <text x="6" y="22" fill="#E5E5E5" fontSize="9.5" fontFamily="'Courier New', monospace" fontWeight="700">expr</text>
        <text x="6" y="34" fill="#E5E5E5" fontSize="9.5" fontFamily="'Courier New', monospace" fontWeight="700">ess</text>
        <circle cx="39" cy="13" r="3.5" fill="#888" opacity=".5" />
        <line x1="6" y1="39" x2="42" y2="39" stroke="#333" strokeWidth="1" />
    </svg>
);
const IconMongo = () => (
    <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect width="48" height="48" rx="10" fill="#0D1117" />
        <path d="M24 5c0 0-11 9.5-11 20.5 0 8 5 13.5 11 17.5 6-4 11-9.5 11-17.5C35 14.5 24 5 24 5z" fill="#13AA52" />
        <path d="M24 8v30" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity=".3" />
    </svg>
);
const IconPrisma = () => (
    <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect width="48" height="48" rx="10" fill="#0C2D48" />
        <path d="M9 38l15-32 15 32H9z" stroke="#5A67D8" strokeWidth="2" fill="none" strokeLinejoin="round" />
        <line x1="24" y1="6" x2="24" y2="29" stroke="#5A67D8" strokeWidth="2" />
        <path d="M9 38l15-9 15 9" stroke="#818CF8" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    </svg>
);
const IconPostgres = () => (
    <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect width="48" height="48" rx="10" fill="#0D1B2A" />
        <ellipse cx="24" cy="17" rx="12" ry="6" fill="#336791" opacity=".8" />
        <path d="M12 17v14c0 3.3 5.37 6 12 6s12-2.7 12-6V17" stroke="#336791" strokeWidth="2" fill="none" />
        <path d="M12 24c0 3.3 5.37 6 12 6s12-2.7 12-6" stroke="#4A90D9" strokeWidth="1.5" fill="none" />
        <ellipse cx="24" cy="17" rx="12" ry="6" stroke="#4A90D9" strokeWidth="1.5" fill="none" />
    </svg>
);
const IconRedux = () => (
    <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect width="48" height="48" rx="10" fill="#1A0533" />
        <path d="M31 13c3.5 1.2 5.8 4.8 5.2 8.8-.3 2.5-1.7 4.6-3.7 6" stroke="#764ABC" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M17 13c-3.5 1.2-5.8 4.8-5.2 8.8.3 2.5 1.7 4.6 3.7 6" stroke="#764ABC" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M24 8v7M17 37l3.5-5.5h7L31 37" stroke="#764ABC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="24" cy="23" r="4.5" fill="#764ABC" />
    </svg>
);
const IconMERN = () => (
    <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect width="48" height="48" rx="10" fill="#0F2027" />
        <text x="7" y="20" fill="#13AA52" fontSize="8" fontFamily="monospace" fontWeight="bold">M</text>
        <text x="17" y="20" fill="#E5E5E5" fontSize="8" fontFamily="monospace" fontWeight="bold">E</text>
        <text x="27" y="20" fill="#61DAFB" fontSize="8" fontFamily="monospace" fontWeight="bold">R</text>
        <text x="37" y="20" fill="#539E43" fontSize="8" fontFamily="monospace" fontWeight="bold">N</text>
        <line x1="7" y1="24" x2="41" y2="24" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <text x="10" y="36" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace">Full Stack</text>
    </svg>
);
const IconFullStack = () => (
    <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect width="48" height="48" rx="10" fill="#0F172A" />
        <rect x="8" y="9" width="32" height="7" rx="2" fill="#38BDF8" opacity=".85" />
        <rect x="8" y="20" width="32" height="7" rx="2" fill="#818CF8" opacity=".85" />
        <rect x="8" y="31" width="32" height="7" rx="2" fill="#34D399" opacity=".85" />
        <circle cx="37" cy="12.5" r="1.5" fill="white" opacity=".6" />
        <circle cx="37" cy="23.5" r="1.5" fill="white" opacity=".6" />
        <circle cx="37" cy="34.5" r="1.5" fill="white" opacity=".6" />
    </svg>
);

/* ──────────────────────────────────────────────────
   CARD DATA
────────────────────────────────────────────────── */
interface CardItem { title: string; Icon: React.FC; tag: string; desc: string; accent: string; }

const CARDS: CardItem[] = [
    { title: "JavaScript", Icon: IconJS, tag: "Core Language", desc: "Dynamic interactions, event-driven programming, and real-time UX with modern ES6+ practices.", accent: "#F7DF1E" },
    { title: "TypeScript", Icon: IconTS, tag: "Type Safety", desc: "Scalable, maintainable apps with advanced type systems, generics, and compile-time safety.", accent: "#3178C6" },
    { title: "React.js", Icon: IconReact, tag: "UI Library", desc: "Component-driven UIs with hooks, context, and blazing-fast virtual DOM diffing.", accent: "#61DAFB" },
    { title: "Next.js", Icon: IconNext, tag: "Framework", desc: "SSR, SSG, ISR — optimal performance, SEO, and seamless full-stack developer experience.", accent: "#FFFFFF" },
    { title: "Redux Toolkit", Icon: IconRedux, tag: "State Management", desc: "Predictable global state with slices, async thunks, and RTK Query for server sync.", accent: "#764ABC" },
    { title: "Node.js", Icon: IconNode, tag: "Runtime", desc: "Non-blocking, event-loop architecture for building fast and massively scalable server-side apps.", accent: "#539E43" },
    { title: "Express.js", Icon: IconExpress, tag: "Backend Framework", desc: "Minimal, un-opinionated REST APIs with clean middleware pipelines and flexible routing.", accent: "#CCCCCC" },
    { title: "MongoDB", Icon: IconMongo, tag: "NoSQL Database", desc: "Flexible document model for rapid iteration and handling complex nested data structures.", accent: "#13AA52" },
    { title: "Prisma ORM", Icon: IconPrisma, tag: "ORM", desc: "Type-safe DB queries, auto migrations, and schema-first design for modern Node backends.", accent: "#5A67D8" },
    { title: "PostgreSQL", Icon: IconPostgres, tag: "SQL Database", desc: "Production-grade relational DB — advanced indexing, complex joins, and full ACID compliance.", accent: "#4A90D9" },
    { title: "MERN Stack", Icon: IconMERN, tag: "Full Stack", desc: "End-to-end JavaScript: MongoDB, Express, React, Node — one language, total ownership.", accent: "#13AA52" },
    { title: "Full Stack Dev", Icon: IconFullStack, tag: "Architecture", desc: "Designing entire systems from DB schema to pixel-perfect UI. Clean code, always shipped.", accent: "#38BDF8" },
];

/* ──────────────────────────────────────────────────

────────────────────────────────────────────────── */
const SkeletonCard = () => (
    <div
        className="relative h-[290px] rounded-2xl overflow-hidden border border-white/[0.08] p-6 flex flex-col gap-4"
        style={{ background: "rgba(255,255,255,0.04)" }}
    >
        {/* shimmer sweep */}
        <div
            className="absolute inset-0 pointer-events-none"
            style={{
                background: "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.07) 50%,transparent 100%)",
                animation: "sk-shimmer 1.6s ease-in-out infinite",
            }}
        />
        <div className="w-14 h-14 rounded-2xl bg-white/[0.10] flex-shrink-0" />
        <div className="h-2.5 w-20 rounded-full bg-white/[0.10]" />
        <div className="h-4   w-36 rounded-full bg-white/[0.12]" />
        <div className="flex-1 space-y-2.5 pt-1">
            <div className="h-2.5 w-full rounded-full bg-white/[0.08]" />
            <div className="h-2.5 w-full rounded-full bg-white/[0.08]" />
            <div className="h-2.5 w-3/4  rounded-full bg-white/[0.08]" />
        </div>
        <div className="h-px  w-full bg-white/[0.08]" />
        <div className="h-2.5 w-28   rounded-full bg-white/[0.08]" />
    </div>
);

/* ──────────────────────────────────────────────────
   TECH CARD — GSAP 3-D tilt on hover
────────────────────────────────────────────────── */
const TechCard = ({ card }: { card: CardItem }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = cardRef.current;
        const glow = glowRef.current;
        if (!el || !glow) return;

        const onEnter = () => {
            gsap.to(el, { scale: 1.035, duration: 0.35, ease: "power2.out" });
            gsap.to(glow, { opacity: 0.3, duration: 0.4, ease: "power2.out" });
        };
        const onLeave = () => {
            gsap.to(el, { scale: 1, rotateX: 0, rotateY: 0, duration: 0.55, ease: "power3.out" });
            gsap.to(glow, { opacity: 0, duration: 0.5, ease: "power2.out" });
        };
        const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
            const y = ((e.clientY - r.top) / r.height - 0.5) * -14;
            gsap.to(el, { rotateX: y, rotateY: x, duration: 0.3, ease: "power1.out" });
        };

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        el.addEventListener("mousemove", onMove as EventListener);
        return () => {
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
            el.removeEventListener("mousemove", onMove as EventListener);
        };
    }, []);

    const { Icon } = card;
    return (
        <div
            ref={cardRef}
            className="relative h-[290px] rounded-2xl  overflow-hidden border border-white/10 p-6 flex flex-col gap-3 cursor-default select-none"
            style={{ background: "rgba(255,255,255,0.04)", transformStyle: "preserve-3d", willChange: "transform" }}
        >
            <div ref={glowRef}
                className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl opacity-0 pointer-events-none"
                style={{ background: card.accent }} />
            <div className="absolute top-0 left-6 right-6 h-px"
                style={{ background: `linear-gradient(90deg,transparent,${card.accent}55,transparent)` }} />

            <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 ring-1 ring-white/10 shadow-lg">
                <Icon />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[.18em] px-2.5 py-1 rounded-full self-start"
                style={{ color: card.accent, background: `${card.accent}18`, border: `1px solid ${card.accent}28` }}>
                {card.tag}
            </span>
            <h3 className="text-[17px] font-bold text-white leading-tight tracking-tight">{card.title}</h3>
            <p className="text-white/45 text-[12.5px] leading-relaxed flex-1">{card.desc}</p>
            <div className="flex items-center gap-2 pt-2 border-t border-white/[0.08]">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: card.accent }} />
                <span className="text-[11px] text-white/25 tracking-wide">Production Ready</span>
            </div>
        </div>
    );
};

/* ──────────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────────── */
const TechnologySlider = () => {
    const [mounted, setMounted] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const eyebrowRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    // 800 ms skeleton, then swap to real Swiper
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 800);
        return () => clearTimeout(t);
    }, []);

    // GSAP ScrollTrigger entrance
    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                [eyebrowRef.current, headingRef.current, subRef.current],
                { y: 45, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" }
                }
            );
            gsap.fromTo(sliderRef.current,
                { y: 65, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1.05, ease: "power3.out", delay: 0.25,
                    scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" }
                }
            );
            gsap.fromTo(badgeRef.current,
                { y: 22, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.45,
                    scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const breakpoints = {
        320: { slidesPerView: 1, spaceBetween: 16 },
        640: { slidesPerView: 1.15, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 24 },
        1024: { slidesPerView: 3, spaceBetween: 28 },
        1280: { slidesPerView: 3.2, spaceBetween: 32 },
    };

    return (
        <section ref={sectionRef} className="relative py-24 bg-transparent overflow-hidden">

            <style>{`
                @keyframes sk-shimmer {
                    0%   { transform: translateX(-100%); }
                    100% { transform: translateX(100%);  }
                }
                .tech-swiper .swiper-pagination-bullet {
                    background: rgba(255,255,255,.2);
                    opacity: 1; width: 6px; height: 6px; transition: all .3s;
                }
                .tech-swiper .swiper-pagination-bullet-active {
                    background: #38BDF8; width: 22px; border-radius: 999px;
                }
            `}</style>

          

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <div ref={eyebrowRef}
                        className=" hidden items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-[11px] tracking-[.2em] uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                        Tech Arsenal
                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-center uppercase text-white drop-shadow-lg mb-8">
                        Technologies  I Work With
                    </h2>
                    <p ref={subRef} className="text-white text-lg max-w-xl mx-auto leading-relaxed">
                        From pixel-perfect frontends to rock-solid backends — every tool chosen with purpose.
                    </p>
                </div>

                {/* Slider area */}
                <div ref={sliderRef}>
                    {!mounted ? (
                        /*
                         * ✅ FIX: skeletons live in a plain CSS grid, NOT inside Swiper.
                         *    Swiper's loop mode clones SwiperSlide nodes — that's what
                         *    caused the doubling. By keeping skeletons outside Swiper
                         *    entirely we get exactly CARDS.length skeletons, every time.
                         */
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-14">
                            {CARDS.map((_, i) => (
                                <SkeletonCard key={`sk-${i}`} />
                            ))}
                        </div>
                    ) : (
                        /* Real Swiper only mounts after mounted=true → loop is safe */
                        <Swiper
                            className="tech-swiper pb-14"
                            modules={[Pagination, Autoplay]}
                            pagination={{ clickable: true }}
                            loop={true}
                            autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
                            speed={750}
                            grabCursor={true}
                            breakpoints={breakpoints}
                        >
                            {CARDS.map((card, i) => (
                                <SwiperSlide key={i}>
                                    <TechCard card={card} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>

                {/* Count badge */}
                <div ref={badgeRef} className="flex justify-center mt-2">
                    <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-white/35 text-sm">
                        <span className="font-semibold text-white/60">{CARDS.length}</span>
                        technologies in my arsenal
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TechnologySlider;