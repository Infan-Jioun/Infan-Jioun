import React from 'react';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import Skeleton from 'react-loading-skeleton';
import { MdDownloading } from 'react-icons/md';
import ProfileImage from './ProfileImage';
import SocialLinks from './SocialLinks';
import { FaGithub, FaLinkedinIn, FaInstagram, FaFacebook, FaTelegram } from "react-icons/fa";
import { IoIosMail } from 'react-icons/io';
import { FaSquareXTwitter } from 'react-icons/fa6';
const HeroSection = ({ loading, onScrollToForm }) => {
    const socialLinks = [
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
                <Skeleton width={300} height={40} className="mb-4" />
                <Skeleton width={250} height={32} className="mb-4" />
                <Skeleton count={3} className="mb-6" />
            </>
        ) : (
            <>
                <h1 className="text-3xl md:text-4xl font-mono font-bold drop-shadow-lg mb-2">
                    <Typewriter
                        options={{
                            strings: ['Infan Jioun Rahman'],
                            autoStart: true,
                            loop: true
                        }}
                    />
                </h1>
                <h2 className="text-xl md:text-2xl font-semibold mb-4 drop-shadow-lg">
                    <Typewriter
                        options={{
                            strings: ["JavaScript Developer", "TypeScript Developer", "Next JS Developer", 'React JS Developer', "MERN Developer", "Web Designer"],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </h2>
                <p className="text-lg drop-shadow-lg mb-6">
                    Hi! I'm a passionate Full-Stack Web Developer specializing in React and TypeScript for front-end development with Next.js, and Redux for state management. On the back-end, I work seamlessly with Node.js, Express.js, and MongoDB to build dynamic, secure, and high-performance web applications.
                </p>
            </>
        );

    // Action buttons component
    const ActionButtons = () =>
        loading ? (
            <div className="flex justify-center md:justify-start items-center gap-4">
                <Skeleton height={45} width={140} />
                <Skeleton className='lg:flex hidden' height={45} width={140} />
            </div>
        ) : (
            <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 drop-shadow-2xl">
                <button
                    onClick={onScrollToForm}
                    className="w-36 bg-transparent border-2 border-white backdrop-blur drop-shadow-2xl text-white p-3 rounded-full transform transition-transform duration-300 hover:scale-105 hover:bg-white/10"
                >
                    HIRE ME
                </button>
                <Link
                    to="https://drive.google.com/file/d/1m0CAV3xMaVYH13jH_NyW320G9SlJeDOE/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    title='Resume'
                    className="w-44 lg:flex hidden justify-center items-center bg-transparent border-2 border-white backdrop-blur drop-shadow-2xl text-white p-3 rounded-full transform transition-transform duration-300 hover:scale-105 hover:bg-white/10"
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