'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenu } from 'react-icons/hi';
import { MdDownloading } from 'react-icons/md';
import TextType from '@/components/TextType';

interface NavbarProps {
    setScrolled: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setScrolled }) => {
    const [isScrolled, setIsScrolledState] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();

    const handleScroll = useCallback(() => {
        const scrollCheck = window.scrollY > 50;
        setIsScrolledState(scrollCheck);
        setScrolled(scrollCheck);
    }, [setScrolled]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
        { path: 'myProjects', label: 'MY PROJECTS' },
        { path: 'skills', label: 'MY SKILLS' },
        { path: 'education', label: 'EDUCATION' },
        { path: 'contact', label: 'CONTACT US' },
    ];

    return (
        <nav
            className={`navbar bg-transparent border-2 border-white backdrop-blur-xl rounded-3xl drop-shadow-xl text-white z-40 transition-all duration-300
                ${isScrolled ? 'fixed top-1 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-screen-xl' : 'relative mt-3 w-full max-w-screen-xl mx-auto'}
            `}
        >
            <div className="flex justify-between items-center py-3 px-4 md:px-20">

                <div className="flex items-center gap-4">
                    <div className="block md:hidden">
                        <button
                            onClick={toggleDropdown}
                            className="text-2xl text-white cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <AiOutlineClose /> : <HiOutlineMenu />}
                        </button>

                        {isOpen && (
                            <div className="absolute bg-black/60 border-2 border-white backdrop-blur-xl w-8/12 rounded-xl left-4 mt-3 p-4 space-y-3 z-50">
                                {navItems.map(({ path, label }) => (
                                    <button
                                        key={path}
                                        onClick={() => {
                                            scrollToSection(path);
                                            closeDropdown();
                                        }}
                                        className="block w-full text-left font-bold text-white hover:text-purple-300 transition-all duration-200"
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        )}

                    </div>

                    <ul className="hidden md:flex gap-6 font-bold">
                        {navItems.map(({ path, label }) => (
                            <li key={path}>
                                <button
                                    onClick={() => scrollToSection(path)}
                                    className="relative transition-colors duration-300 before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-[2px] before:bg-white before:scale-0 hover:before:scale-100 before:transition-transform before:duration-300"
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>

                </div>

                {/* Desktop Navigation */}

                {/* Resume Button */}
                <Link
                    href="https://drive.google.com/file/d/1m0CAV3xMaVYH13jH_NyW320G9SlJeDOE/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border-2 border-white rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-white/10 hover:scale-105"
                >
                    <MdDownloading className="text-lg" />
                    RESUME
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;