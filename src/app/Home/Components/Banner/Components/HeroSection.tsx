'use client';

import Link from 'next/link';
import { MdDownloading } from 'react-icons/md';
import { FaGithub, FaLinkedinIn, FaInstagram, FaFacebook, FaTelegram } from "react-icons/fa";
import { IoIosMail } from 'react-icons/io';
import { FaSquareXTwitter } from 'react-icons/fa6';
import ProfileImage from './ProfileImage';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
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
        { icon: <FaGithub />, href: "https://github.com/Infan-Jioun", color: "text-gray-800" },
        { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/infan-jioun-rahman", color: "text-blue-600" },
        { icon: <IoIosMail />, href: "mailto:infanjiounrahman20606@gmail.com", color: "text-red-600" },
        { icon: <FaInstagram />, href: "https://www.instagram.com/infan_jioun_rahman/", color: "text-pink-600" },
        { icon: <FaFacebook />, href: "https://www.facebook.com/profile.php?id=61572744838042", color: "text-blue-700" },
        { icon: <FaTelegram />, href: "https://t.me/infanjioun", color: "text-cyan-500" },
        { icon: <FaSquareXTwitter />, href: "https://twitter.com/RahmanJito", color: "text-black" }
    ];

    // Text content component
    const TextContent = () =>
        loading ? (
            <>
                <Skeleton className="w-72 h-10 mb-4 bg-gray-700 mx-auto md:mx-0" />
                <Skeleton className="w-64 h-8 mb-4 bg-gray-700 mx-auto md:mx-0" />
                <div className="space-y-2 mb-6">
                    <Skeleton className="w-full h-4 bg-gray-700" />
                    <Skeleton className="w-full h-4 bg-gray-700" />
                    <Skeleton className="w-3/4 h-4 bg-gray-700" />
                </div>
            </>
        ) : (
            <>
                <h1 className="text-3xl md:text-4xl font-mono font-bold drop-shadow-lg mb-2 min-h-[48px] flex items-center justify-center md:justify-start">
                    <TextType
                        text={["Infan Jioun Rahman"]}
                        typingSpeed={75}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorCharacter="|"
                    />
                </h1>
                <h2 className="text-xl md:text-2xl font-semibold mb-4 drop-shadow-lg min-h-[36px] flex items-center justify-center md:justify-start">
                    <TextType
                        text={["JavaScript Developer", "TypeScript Developer", "Next JS Developer", 'React JS Developer', "MERN Developer", "Web Designer"]}
                        typingSpeed={50}
                        pauseDuration={1000}
                        showCursor={true}
                        cursorCharacter="|"
                    />
                </h2>
                <p className="text-lg drop-shadow-lg mb-6 text-center md:text-left">
                    Hi! I&apos;m a passionate Full-Stack Web Developer specializing in React and TypeScript for front-end development with Next.js, and Redux for state management. On the back-end, I work seamlessly with Node.js, Express.js, and MongoDB to build dynamic, secure, and high-performance web applications.
                </p>
            </>
        );

    // Action buttons component
    const ActionButtons = () =>
        loading ? (
            <div className="flex justify-center md:justify-start items-center gap-4">
                <Skeleton className="h-12 w-36 bg-gray-700 rounded-full" />
                <Skeleton className="h-12 w-44 bg-gray-700 rounded-full hidden lg:block" />
            </div>
        ) : (
            <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 drop-shadow-2xl">
                <Button
                    onClick={onScrollToForm}
                    variant="outline"
                    className="w-36 bg-transparent border-2 border-white backdrop-blur drop-shadow-2xl text-white p-3 rounded-full transform transition-transform duration-300 hover:scale-105 hover:bg-white/10 h-12"
                >
                    HIRE ME
                </Button>
                <Link
                    href="https://drive.google.com/file/d/1m0CAV3xMaVYH13jH_NyW320G9SlJeDOE/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    title='Resume'
                    className="w-44 lg:flex hidden justify-center items-center bg-transparent border-2 border-white backdrop-blur drop-shadow-2xl text-white p-3 rounded-full transform transition-transform duration-300 hover:scale-105 hover:bg-white/10 border-solid h-12"
                >
                    <MdDownloading className="text-xl mr-2" />
                    RESUME
                </Link>
            </div>
        );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-28 items-center" id="about">
            <div className="flex justify-center md:order-2 drop-shadow-lg">
                <ProfileImage loading={loading} />
            </div>

            <div className="text-center md:text-left md:order-1">
                <TextContent />
                <SocialLinks loading={loading} socialLinks={socialLinks} />
                <ActionButtons />
            </div>
        </div>
    );
};

export default HeroSection;