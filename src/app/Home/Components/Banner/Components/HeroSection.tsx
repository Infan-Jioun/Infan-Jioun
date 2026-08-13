'use client';

import Link from 'next/link';
import React from 'react';
import { MdDownloading } from 'react-icons/md';
import { FaGithub, FaLinkedinIn, FaInstagram, FaFacebook, FaTelegram } from "react-icons/fa";
import { IoIosMail } from 'react-icons/io';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';
import ProfileImage from './ProfileImage';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import TextType from '@/components/TextType';
import SocialLinks from './SocialLink';

interface HeroSectionProps {
    loading: boolean;
    onScrollToForm: () => void;
}

interface SocialLinkItem {
    icon: React.ReactNode;
    href: string;
    color: string;
}

// Updated Neo-Brutalist Cyber Style Object matching Footer
const neoBrutalistCardStyle: React.CSSProperties = {
    background: "rgba(15, 23, 42, 0.90)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
};

const socialLinks: SocialLinkItem[] = [
    { icon: <FaGithub />, href: 'https://github.com/Infan-Jioun', color: 'text-slate-200 hover:text-cyan-400' },
    { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/infan-jioun-rahman-81a1b2295/', color: 'text-blue-400 hover:text-blue-300' },
    { icon: <IoIosMail />, href: 'mailto:infanjiounrahman20606@gmail.com', color: 'text-red-400 hover:text-red-300' },
    { icon: <FaInstagram />, href: 'https://www.instagram.com/infan_jioun_rahman/', color: 'text-pink-400 hover:text-pink-300' },
    { icon: <FaFacebook />, href: 'https://www.facebook.com/profile.php?id=61572744838042', color: 'text-blue-500 hover:text-blue-400' },
    { icon: <FaTelegram />, href: 'https://t.me/infanjioun', color: 'text-cyan-400 hover:text-cyan-300' },
    { icon: <FaSquareXTwitter />, href: 'https://twitter.com/RahmanJito', color: 'text-slate-300 hover:text-white' },
];

const HeroSection = ({ loading, onScrollToForm }: HeroSectionProps) => {
    return (
        <section
            id="about"
            className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-20 lg:pt-32 lg:pb-24 bg-transparent overflow-hidden scroll-mt-24"
        >
            {/* Custom Animations & Styles */}
            <style jsx global>{`
                @keyframes floatBlob {
                    0%, 100% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -20px) scale(1.08); }
                    66% { transform: translate(-20px, 20px) scale(0.95); }
                }
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .text-gradient-hero {
                    background: linear-gradient(-45deg, #ffffff, #38bdf8, #818cf8, #c084fc, #ffffff);
                    background-size: 300% 300%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradientShift 8s ease infinite;
                }
            `}</style>

            {/* Ambient Glowing Background Orbs matching Footer Colors */}
            <div
                className="absolute top-1/3 left-10 w-80 md:w-96 h-80 md:h-96 rounded-full pointer-events-none opacity-20 blur-[130px]"
                style={{
                    background: "radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(34,211,238,0.4) 70%, transparent 100%)",
                    animation: "floatBlob 12s ease-in-out infinite",
                }}
            />
            <div
                className="absolute bottom-1/4 right-10 w-80 md:w-96 h-80 md:h-96 rounded-full pointer-events-none opacity-20 blur-[130px]"
                style={{
                    background: "radial-gradient(circle, rgba(168,85,247,0.7) 0%, rgba(79,70,229,0.4) 70%, transparent 100%)",
                    animation: "floatBlob 16s ease-in-out infinite reverse",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">

                    {/* Profile Image Container with Footer-Matching Neo-Brutalist Border */}
                    <div className="order-1 lg:order-2 w-full lg:w-auto flex justify-center relative group">
                        <div
                            className="absolute -inset-1 opacity-40 group-hover:opacity-70 transition duration-500 blur-2xl"
                            style={{
                                background: "linear-gradient(135deg, rgba(34,211,238,0.5), rgba(99,102,241,0.5), rgba(168,85,247,0.4))",
                            }}
                        />
                        <Card 
                            className="relative rounded-none border-2 border-indigo-500/40 shadow-[8px_8px_0px_0px_#4f46e5] overflow-hidden p-4 md:p-6 transition-all duration-300 hover:border-indigo-400" 
                            style={neoBrutalistCardStyle}
                        >
                            <CardContent className="p-0">
                                <ProfileImage loading={loading} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Area */}
                    <div className="order-2 lg:order-1 w-full lg:flex-1 space-y-6 md:space-y-6">
                        
                        {/* Text Content */}
                        {loading ? (
                            <Card className="rounded-none border-2 border-indigo-500/40 shadow-[6px_6px_0px_0px_#4f46e5]" style={neoBrutalistCardStyle}>
                                <CardContent className="p-6 md:p-8">
                                    <Skeleton className="w-72 h-10 mb-6 bg-slate-800 rounded-none animate-pulse" />
                                    <Skeleton className="w-64 h-8 mb-6 bg-slate-800 rounded-none animate-pulse" />
                                    <div className="space-y-3">
                                        <Skeleton className="w-full h-4 bg-slate-800 rounded-none" />
                                        <Skeleton className="w-full h-4 bg-slate-800 rounded-none" />
                                        <Skeleton className="w-3/4 h-4 bg-slate-800 rounded-none" />
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card 
                                className="rounded-none border-2 border-indigo-500/40 shadow-[6px_6px_0px_0px_#4f46e5] transition-all duration-300 hover:border-indigo-400" 
                                style={neoBrutalistCardStyle}
                            >
                                <CardContent className="p-6 md:p-8">
                                    <div className="mb-6">
                                        {/* Neo-brutalist Greeting Badge matching Footer */}
                                        <span className="inline-flex items-center gap-2 bg-slate-950 border-2 border-indigo-500/40 shadow-[3px_3px_0px_0px_#4f46e5] px-4 py-1.5 rounded-none text-indigo-300 text-xs font-black tracking-widest uppercase mb-4 select-none">
                                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                            👋 Assalamoalaikum, I'm
                                        </span>

                                        {/* Name Heading */}
                                        <h1 className="text-3xl sm:text-xl md:text-5xl font-black text-gradient-hero mb-3 min-h-[60px] flex items-center tracking-tight">
                                            <TextType
                                                text={["Infan Jioun Rahman"]}
                                                typingSpeed={75}
                                                pauseDuration={1500}
                                                showCursor={true}
                                                cursorCharacter="|"
                                            />
                                        </h1>
                                    </div>

                                    {/* Role Subtitle Box matching Footer Card Theme */}
                                    <div
                                        className="rounded-none p-4 mb-6 border-2 border-indigo-500/30 bg-slate-950/80 shadow-[4px_4px_0px_0px_#4f46e5] transition-all duration-300"
                                    >
                                        <h2 className="text-lg md:text-2xl font-bold text-cyan-400 min-h-[40px] flex items-center">
                                            <TextType
                                                text={["JavaScript Developer", "TypeScript Developer", "Next JS Developer", 'React JS Developer', "MERN Developer", "Full Stack Developer"]}
                                                typingSpeed={50}
                                                pauseDuration={1000}
                                                showCursor={true}
                                                cursorCharacter="|"
                                            />
                                        </h2>
                                    </div>

                                    {/* Bio Description */}
                                    <p className="text-slate-300 leading-relaxed text-base md:text-lg font-normal">
                                        Passionate <span className="text-cyan-400 font-semibold underline decoration-indigo-500/50 underline-offset-4">Full-Stack Developer</span> specializing in modern web technologies. I create dynamic, scalable, and high-performance applications using{' '}
                                        <span className="text-cyan-400 font-semibold">React</span>,{' '}
                                        <span className="text-white font-semibold">Next.js</span>,{' '}
                                        <span className="text-indigo-400 font-semibold">TypeScript</span>, and{' '}
                                        <span className="text-emerald-400 font-semibold">Node.js</span>, with experience in{' '}
                                        <span className="text-emerald-300 font-semibold">MongoDB</span>,{' '}
                                        <span className="text-sky-400 font-semibold">PostgreSQL</span>, and{' '}
                                        <span className="text-purple-400 font-semibold">Prisma</span>.
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Social Links Container */}
                        <Card className="rounded-none border-2 border-indigo-500/40 shadow-[6px_6px_0px_0px_#4f46e5]" style={neoBrutalistCardStyle}>
                            <CardContent className="p-6">
                                <SocialLinks loading={loading} socialLinks={socialLinks} />
                            </CardContent>
                        </Card>

                        {/* Action Buttons with Cyber Neo-Brutalist Theme */}
                        {loading ? (
                            <Card className="rounded-none border-2 border-indigo-500/40 shadow-[6px_6px_0px_0px_#4f46e5]" style={neoBrutalistCardStyle}>
                                <CardContent className="p-6">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Skeleton className="flex-1 h-12 bg-slate-800 rounded-none animate-pulse" />
                                        <Skeleton className="flex-1 h-12 bg-slate-800 rounded-none animate-pulse" />
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="rounded-none border-2 border-indigo-500/40 shadow-[6px_6px_0px_0px_#4f46e5]" style={neoBrutalistCardStyle}>
                                <CardContent className="p-6">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {/* HIRE ME Button */}
                                        <Button
                                            onClick={onScrollToForm}
                                            className="flex-1 relative items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs tracking-wider uppercase px-4 py-3 border-2 border-indigo-400 shadow-[4px_4px_0px_0px_#22d3ee] hover:shadow-[6px_6px_0px_0px_#22d3ee] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all rounded-none"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                <HiSparkles className="text-lg text-cyan-300 animate-spin" style={{ animationDuration: '4s' }} />
                                                HIRE ME
                                            </span>
                                        </Button>

                                        {/* RESUME Button */}
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="flex-1 items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-black text-xs tracking-wider uppercase px-4 py-3 border-2 border-indigo-500/40 shadow-[4px_4px_0px_0px_#4f46e5] hover:shadow-[6px_6px_0px_0px_#4f46e5] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all rounded-none hover:text-white"
                                        >
                                            <Link
                                                href="https://drive.google.com/file/d/1XjAiQH6JHOdD0OoZ0HxZF9bQtBYoNK-x/view?usp=sharing"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2"
                                            >
                                                <MdDownloading className="text-xl text-cyan-400" />
                                                RESUME
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;