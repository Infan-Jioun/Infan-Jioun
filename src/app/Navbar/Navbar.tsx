'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenu } from 'react-icons/hi';
import { MdDownloading } from 'react-icons/md';

interface NavbarProps {
    setScrolled: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setScrolled }) => {
    const [isScrolled, setIsScrolledState] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const handleScroll = useCallback(() => {
        const scrollCheck = window.scrollY > 40;
        setIsScrolledState(scrollCheck);
        setScrolled(scrollCheck);
    }, [setScrolled]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const closeDropdown = () => setIsOpen(false);

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navItems = [
        { path: 'about', label: 'ABOUT' },
        { path: 'myProjects', label: 'PROJECTS' },
        { path: 'skills', label: 'SKILLS' },
        { path: 'education', label: 'EDUCATION' },
        { path: 'contact', label: 'CONTACT' },
    ];

    return (
        <header
            className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-7xl transition-all duration-300 rounded-none ${isScrolled ? 'top-2' : 'top-4'
                }`}
        >
            {/* 3D Glass Navbar Container */}
            <nav
                className="relative bg-slate-900/90 backdrop-blur-xl border-2 border-indigo-500/40 shadow-[6px_6px_0px_0px_#4f46e5] rounded-none transition-all duration-300"
            >
                {/* Top Accent Gradient Line */}
                <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 shadow-[0_0_12px_#6366f1]" />

                <div className="flex justify-between items-center py-3 px-4 sm:px-6 md:px-8">

                    {/* Brand / Logo Emblem */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-2 group text-left border-none bg-transparent cursor-pointer"
                    >
                        <div className="w-3 h-3 bg-cyan-400 shadow-[0_0_10px_#22d3ee] rounded-none group-hover:bg-indigo-400 transition-colors" />
                        <span className="text-white font-black tracking-widest text-base sm:text-lg uppercase">
                            INFAN<span className="text-indigo-400">.DEV</span>
                        </span>
                    </button>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-6">
                        {navItems.map(({ path, label }) => (
                            <li key={path}>
                                <button
                                    onClick={() => scrollToSection(path)}
                                    className="relative py-1 text-xs font-black tracking-widest text-slate-300 hover:text-cyan-400 transition-colors uppercase rounded-none group cursor-pointer"
                                >
                                    <span>{label}</span>
                                    {/* Sharp Underline Hover Effect */}
                                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 shadow-[0_0_8px_#22d3ee] transition-all duration-300 group-hover:w-full" />
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Right Side: Resume Button & Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        {/* 3D Resume Button */}
                        <Link
                            href="https://drive.google.com/file/d/1XjAiQH6JHOdD0OoZ0HxZF9bQtBYoNK-x/view?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs tracking-wider uppercase px-4 py-2.5 border-2 border-indigo-400 shadow-[3px_3px_0px_0px_#0f172a] hover:shadow-[5px_5px_0px_0px_#6366f1] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all rounded-none"
                        >
                            <MdDownloading className="text-base" />
                            <span className="hidden sm:inline">RESUME</span>
                        </Link>

                        {/* Mobile Hamburger Toggle */}
                        <button
                            onClick={toggleDropdown}
                            className="block md:hidden p-2 text-white bg-slate-800 border border-white/20 shadow-[2px_2px_0px_0px_#0f172a] active:translate-y-0.5 transition-all rounded-none"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <AiOutlineClose size={20} /> : <HiOutlineMenu size={20} />}
                        </button>
                    </div>

                </div>

                {/* ── Mobile Menu Overlay / Drawer ── */}
                {isOpen && (
                    <div className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-2xl p-5 flex flex-col gap-3 shadow-[0_10px_25px_rgba(0,0,0,0.8)] rounded-none">
                        {navItems.map(({ path, label }) => (
                            <button
                                key={path}
                                onClick={() => {
                                    scrollToSection(path);
                                    closeDropdown();
                                }}
                                className="flex items-center justify-between w-full p-3 text-left font-black text-sm tracking-wider uppercase text-slate-200 bg-slate-900 border border-indigo-500/20 hover:border-cyan-400 hover:text-cyan-400 shadow-[3px_3px_0px_0px_#0f172a] transition-all rounded-none"
                            >
                                <span>{label}</span>
                                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-none" />
                            </button>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;