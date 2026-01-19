'use client';

import Link from 'next/link';
import { MdDownloading } from 'react-icons/md';
import { FaGithub, FaLinkedinIn, FaInstagram, FaFacebook, FaTelegram } from "react-icons/fa";
import { IoIosMail } from 'react-icons/io';
import { FaSquareXTwitter } from 'react-icons/fa6';
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

interface SocialLink {
    icon: React.ReactNode;
    href: string;
    color: string;
}

const HeroSection = ({ loading, onScrollToForm }: HeroSectionProps) => {
    const socialLinks: SocialLink[] = [
        { icon: <FaGithub />, href: 'https://github.com/Infan-Jioun', color: 'text-gray-800' },
        { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/infan-jioun-rahman-81a1b2295/', color: 'text-blue-600' },
        { icon: <IoIosMail />, href: 'mailto:infanjiounrahman20606@gmail.com', color: 'text-red-600' },
        { icon: <FaInstagram />, href: 'https://www.instagram.com/infan_jioun_rahman/', color: 'text-pink-600' },
        { icon: <FaFacebook />, href: 'https://www.facebook.com/profile.php?id=61572744838042', color: 'text-blue-700' },
        { icon: <FaTelegram />, href: 'https://t.me/infanjioun', color: 'text-cyan-500' },
        { icon: <FaSquareXTwitter />, href: 'https://twitter.com/RahmanJito', color: 'text-black' },
    ];

    // Text content component
    const TextContent = () =>
        loading ? (
            <Card className="bg-black/20 backdrop-blur-lg border border-white/10 shadow-2xl">
                <CardContent className="p-6 md:p-8">
                    <Skeleton className="w-72 h-10 mb-6 bg-white/20 mx-auto md:mx-0 rounded-lg" />
                    <Skeleton className="w-64 h-8 mb-6 bg-white/20 mx-auto md:mx-0 rounded-lg" />
                    <div className="space-y-3">
                        <Skeleton className="w-full h-4 bg-white/20 rounded" />
                        <Skeleton className="w-full h-4 bg-white/20 rounded" />
                        <Skeleton className="w-3/4 h-4 bg-white/20 rounded" />
                    </div>
                </CardContent>
            </Card>
        ) : (
            <Card className="bg-black/20 backdrop-blur-lg border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <CardContent className="p-6 md:p-8">
                    <div className="mb-6">
                        <span className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                            👋 Asslamoalikom, I'm
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 min-h-[60px] flex items-center">
                            <TextType
                                text={["Infan Jioun Rahman"]}
                                typingSpeed={75}
                                pauseDuration={1500}
                                showCursor={true}
                                cursorCharacter="|"
                            />
                        </h1>
                    </div>

                    <Card className="bg-white/10 border border-white/20 mb-6">
                        <CardContent className="p-4">
                            <h2 className="text-lg md:text-2xl font-semibold text-white min-h-[40px] flex items-center">
                                <TextType
                                    text={["JavaScript Developer", "TypeScript Developer", "Next JS Developer", 'React JS Developer', "MERN Developer", "Full Stack Developer"]}
                                    typingSpeed={50}
                                    pauseDuration={1000}
                                    showCursor={true}
                                    cursorCharacter="|"
                                />
                            </h2>
                        </CardContent>
                    </Card>

                    <p className="text-white leading-relaxed text-base md:text-lg">
                        Passionate <span className="text-white font-semibold">Full-Stack Developer</span> specializing in modern web technologies. I create dynamic, scalable, and high-performance applications using <span className="text-white font-semibold">React</span>, <span className="text-white font-semibold">Next.js</span>, <span className="text-white font-semibold">TypeScript</span>, and <span className="text-white font-semibold">Node.js</span> with MongoDB.
                    </p>
                </CardContent>
            </Card>
        );

    // Action buttons component
    const ActionButtons = () =>
        loading ? (
            <Card className="bg-black/20 backdrop-blur-lg border border-white/10 shadow-2xl">
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Skeleton className="h-12 w-36 bg-white/20 rounded-xl" />
                        <Skeleton className="h-12 w-44 bg-white/20 rounded-xl" />
                    </div>
                </CardContent>
            </Card>
        ) : (
            <Card className="bg-black/20 backdrop-blur-lg border border-white/10 shadow-2xl">
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            onClick={onScrollToForm}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-0"
                        >
                            HIRE ME
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="flex-1 border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                        >
                            <Link
                                href="https://drive.google.com/file/d/1m0CAV3xMaVYH13jH_NyW320G9SlJeDOE/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2"
                            >
                                <MdDownloading className="text-xl" />
                                RESUME
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );

    return (
        <section className="min-h-screen flex items-center justify-center px-4 lg:px-8 py-20 bg-transparent" id="about">
            <div className="max-w-7xl mx-auto w-full">
                {/* Mobile: Image on top, Desktop: Image on right */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
                    {/* Profile Image - Top on mobile, Right on desktop */}
                    <div className="order-1 lg:order-2 w-full lg:w-auto flex justify-center">
                        <Card className="bg-black/20 backdrop-blur-lg border border-white/10 shadow-2xl p-4 md:p-6 hover:shadow-3xl transition-all duration-500">
                            <CardContent className="p-0">
                                <ProfileImage loading={loading} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Text Content - Bottom on mobile, Left on desktop */}
                    <div className="order-2 lg:order-1 w-full lg:flex-1 space-y-6 md:space-y-8">
                        <TextContent />

                        {/* Social Links */}
                        <Card className="bg-black/20 backdrop-blur-lg border border-white/10 shadow-2xl">
                            <CardContent className="p-6">
                                <SocialLinks loading={loading} socialLinks={socialLinks} />
                            </CardContent>
                        </Card>

                        <ActionButtons />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;