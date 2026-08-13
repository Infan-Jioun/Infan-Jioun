"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Skeleton } from "@/components/ui/skeleton";
import {
    MdSchool,
    MdDownloading,
    MdVerified,
    MdWorkspacePremium,
} from "react-icons/md";

interface EducationItem {
    id: string;
    institute: string;
    category: "University" | "Course" | "Bootcamp";
    degree: string;
    field: string;
    duration: string;
    credentialId?: string;
    certificateUrl?: string;
    status: "Ongoing" | "Completed";
}

interface EducationSectionProps {
    loading: boolean;
}

const educationData: EducationItem[] = [
    {
        id: "1",
        institute: "Premier University Chittagong",
        category: "University",
        degree: "Bachelor of Arts (BA)",
        field: "Fashion Design And Technology",
        duration: "2024 - Present",
        status: "Ongoing",
    },
    {
        id: "2",
        institute: "Programming Hero",
        category: "Course",
        degree: "Additional Course",
        field: "Web Development",
        duration: "2023 (July - December)",
        certificateUrl:
            "https://drive.google.com/file/d/19KYaO4wQdPsMMO3ky-jzsL4XJqM6CfS1/view?usp=sharing",
        status: "Completed",
    },
    {
        id: "3",
        institute: "Programming Hero",
        category: "Bootcamp",
        degree: "Bootcamp Level 2",
        field: "Next Level AI-Driven Software Engineering",
        duration: "2025 - 2026",
        credentialId: "PHL2B6WEB8-10281066",
        certificateUrl:
            "https://drive.google.com/file/d/10CQcWVI8MA5AREF2u8WC8BCAoIhgCrT2/view?usp=sharing",
        status: "Completed",
    },
];

const GSAPCard = ({ edu }: { edu: EducationItem }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        const glow = glowRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 1000,
        });

        if (glow) {
            gsap.to(glow, {
                x: x - rect.width / 2,
                y: y - rect.height / 2,
                opacity: 0.4,
                duration: 0.2,
                ease: "power1.out",
            });
        }
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        const glow = glowRef.current;

        if (card) {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.6,
                ease: "power3.out",
            });
        }

        if (glow) {
            gsap.to(glow, {
                opacity: 0,
                duration: 0.4,
            });
        }
    };

    return (
        <div className="perspective-1000 h-full">
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-none border-2 border-purple-500/40 bg-slate-900/90 p-7 shadow-[6px_6px_0px_0px_#a855f7] backdrop-blur-xl transition-all duration-300 hover:border-purple-400 hover:shadow-[8px_8px_0px_0px_#c084fc]"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Top Cyber Accent Line */}
                <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 shadow-[0_0_10px_#a855f7]" />

                {/* Glow Effect */}
                <div
                    ref={glowRef}
                    className="pointer-events-none absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-3xl opacity-0"
                />

                <div
                    className="relative z-10"
                    style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
                >
                    <div className="mb-6 flex items-center justify-between">
                        {/* Category Icon Box */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-none border-2 border-purple-500/50 bg-slate-950 text-purple-400 shadow-[3px_3px_0px_0px_#a855f7] transition-all duration-300 group-hover:bg-purple-600 group-hover:text-white">
                            {edu.category === "Bootcamp" ? (
                                <MdWorkspacePremium className="text-2xl" />
                            ) : (
                                <MdSchool className="text-2xl" />
                            )}
                        </div>

                        {/* Status Badge */}
                        <span
                            className={`rounded-none border-2 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest ${
                                edu.status === "Ongoing"
                                    ? "border-emerald-500/50 bg-emerald-950/40 text-emerald-400 shadow-[2px_2px_0px_0px_#10b981]"
                                    : "border-purple-500/50 bg-purple-950/40 text-purple-300 shadow-[2px_2px_0px_0px_#a855f7]"
                            }`}
                        >
                            {edu.status}
                        </span>
                    </div>

                    <h3 className="mb-2 text-xl font-black text-white tracking-wide uppercase transition-colors group-hover:text-purple-300">
                        {edu.institute}
                    </h3>

                    <div className="mb-4 space-y-1 font-mono">
                        <p className="text-xs font-bold uppercase tracking-wider text-purple-300">
                            {edu.degree}
                        </p>
                        <p className="text-xs text-slate-300">{edu.field}</p>
                        {edu.credentialId && (
                            <p className="flex items-center gap-1.5 pt-2 text-[11px] font-bold text-cyan-400">
                                <MdVerified className="text-sm text-cyan-400" /> ID:{" "}
                                {edu.credentialId}
                            </p>
                        )}
                    </div>
                </div>

                {/* Card Footer */}
                <div
                    className="relative z-10 mt-auto flex items-center justify-between gap-2 border-t border-purple-500/30 pt-5"
                    style={{ transform: "translateZ(20px)" }}
                >
                    <span className="font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
                        {edu.duration}
                    </span>

                    {edu.certificateUrl ? (
                        <Link
                            href={edu.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-slate-950 border-2 border-purple-500/50 shadow-[3px_3px_0px_0px_#a855f7] px-4 py-1.5 rounded-none text-purple-300 text-xs font-black tracking-widest uppercase transition-all duration-200 hover:border-purple-400 hover:text-white hover:shadow-[4px_4px_0px_0px_#c084fc] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                        >
                            <MdDownloading className="text-base" />
                            <span>Certificate</span>
                        </Link>
                    ) : (
                        <div className="inline-flex items-center gap-2 bg-slate-950 border-2 border-emerald-500/50 shadow-[3px_3px_0px_0px_#10b981] px-3 py-1.5 rounded-none text-emerald-400 text-[11px] font-black tracking-widest uppercase">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                            </span>
                            <span>In Progress</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const EducationSection = ({ loading }: EducationSectionProps) => {
    const cardsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!loading && cardsContainerRef.current) {
            gsap.fromTo(
                cardsContainerRef.current.children,
                { opacity: 0, y: 35, rotateX: -15 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                }
            );
        }
    }, [loading]);

    if (loading) {
        return (
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="education">
                <Skeleton className="mx-auto mb-16 h-12 w-64 rounded-none border-2 border-purple-500/30 bg-slate-900/90" />
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
                    <Skeleton className="h-72 w-full rounded-none border-2 border-purple-500/30 bg-slate-900/90" />
                    <Skeleton className="h-72 w-full rounded-none border-2 border-purple-500/30 bg-slate-900/90" />
                    <Skeleton className="h-72 w-full rounded-none border-2 border-purple-500/30 bg-slate-900/90" />
                </div>
            </section>
        );
    }

    return (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10" id="education">
            {/* Header Section */}
            <div className="relative z-10 mb-16 text-center">
                <h2 className="mb-3 text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-widest text-white drop-shadow-lg">
                    EDUCATION <span className="text-purple-400">JOURNEY</span>
                </h2>
                {/* Cyber Divider */}
                <div className="relative w-48 mx-auto my-4">
                    <div className="w-full border-t-2 border-purple-500/40" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-400 rotate-45 shadow-[0_0_8px_#a855f7]" />
                </div>
            </div>

            <div
                ref={cardsContainerRef}
                className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-3"
            >
                {educationData.map((edu) => (
                    <GSAPCard key={edu.id} edu={edu} />
                ))}
            </div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[120px]" />
        </section>
    );
};

export default EducationSection;