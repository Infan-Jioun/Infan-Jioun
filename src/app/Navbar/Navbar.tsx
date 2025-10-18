'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Typewriter from 'typewriter-effect';
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";
import { useEffect, useState } from "react";
import { MdDownloading } from "react-icons/md";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
    setScrolled: (scrolled: boolean) => void;
}

const Navbar = ({ setScrolled }: NavbarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const scrollCheck = window.scrollY > 50;
            setIsScrolled(scrollCheck);
            setScrolled(scrollCheck);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [setScrolled]);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const closeDropdown = () => setIsOpen(false);

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const navItems = [
        { path: "about", label: "ABOUT" },
        { path: "myProjects", label: "MY PROJECTS" },
        { path: "skills", label: "MY SKILLS" },
        { path: "education", label: "EDUCATION" },
        { path: "contact", label: "CONTACT US" },
    ];

    const navLinks = navItems.map(({ path, label }) => (
        <Button
            key={path}
            variant="ghost"
            onClick={() => {
                scrollToSection(path);
                closeDropdown();
            }}
            className="font-bold text-white relative inline-block transition-colors duration-300 p-0 h-auto hover:bg-transparent"
        >
            <span className="relative before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-[2px] before:bg-white before:scale-0 before:transition-transform before:duration-300 hover:before:scale-100 rounded">
                {label}
            </span>
        </Button>
    ));

    return (
        <div>
            <div
                className={cn(
                    "navbar bg-transparent border-2 border-white backdrop-blur-xl max-w-screen-xl rounded-3xl drop-shadow-xl w-full mx-auto px-2 md:px-20 text-white z-40 transition-all duration-300",
                    isScrolled ? 'fixed top-0' : 'relative mt-3'
                )}
            >
                <div className="navbar-start flex items-center gap-4">
                    <div className="dropdown md:hidden block">
                        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="btn btn-ghost btn-circle text-xl text-white cursor-pointer hover:bg-transparent p-2 h-auto"
                                    onClick={toggleDropdown}
                                >
                                    {isOpen ? <AiOutlineClose /> : <HiOutlineMenu />}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="bg-transparent w-48 border-2 border-white backdrop-blur-xl ml-3 mt-3 text-white z-[1000]"
                                align="start"
                            >
                                {navItems.map(({ path, label }) => (
                                    <DropdownMenuItem
                                        key={path}
                                        className="hover:bg-transparent focus:bg-transparent cursor-pointer p-3"
                                        onClick={() => {
                                            scrollToSection(path);
                                            closeDropdown();
                                        }}
                                    >
                                        <span className="font-bold text-white relative inline-block transition-colors duration-300 before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-[2px] before:bg-white before:scale-0 before:transition-transform before:duration-300 hover:before:scale-100 rounded">
                                            {label}
                                        </span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <Link href="/" className="font-bold text-xl flex drop-shadow-2xl select-none">
                        <Typewriter
                            options={{
                                strings: ["INFAN"],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </Link>
                </div>

                <div className="flex-none navbar-end flex items-center gap-4">
                    <div className="navbar-center hidden lg:flex">
                        <div className="flex items-center gap-5 font-bold">
                            {navLinks}
                        </div>
                    </div>
                    <Link
                        href="https://drive.google.com/file/d/1m0CAV3xMaVYH13jH_NyW320G9SlJeDOE/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        title='Resume'
                        className="w-36 flex lg:hidden justify-center items-center bg-transparent border-2 border-white backdrop-blur drop-shadow-2xl text-white p-2 rounded-full transform transition-transform duration-300 hover:scale-105 hover:bg-white/10"
                    >
                        <MdDownloading className="text-xl mr-2" />
                        RESUME
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;