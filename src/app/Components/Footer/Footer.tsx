'use client';

import React, { useEffect, useState } from 'react';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
} from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Types
interface SocialLink {
  icon: React.ReactElement;
  url: string;
  color: string;
  hoverShadow: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <FaGithub />,
    url: 'https://github.com/Infan-Jioun',
    color: 'text-white hover:text-cyan-400',
    hoverShadow: 'hover:shadow-[4px_4px_0px_0px_#22d3ee]',
    label: 'GitHub',
  },
  {
    icon: <FaLinkedinIn />,
    url: 'https://www.linkedin.com/in/infan-jioun-rahman-81a1b2295/',
    color: 'text-blue-400 hover:text-blue-300',
    hoverShadow: 'hover:shadow-[4px_4px_0px_0px_#3b82f6]',
    label: 'LinkedIn',
  },
  {
    icon: <IoIosMail />,
    url: 'mailto:infanjiounrahman20606@gmail.com',
    color: 'text-red-400 hover:text-red-300',
    hoverShadow: 'hover:shadow-[4px_4px_0px_0px_#ef4444]',
    label: 'Email',
  },
  {
    icon: <FaInstagram />,
    url: 'https://www.instagram.com/infan_jioun_rahman/',
    color: 'text-pink-400 hover:text-pink-300',
    hoverShadow: 'hover:shadow-[4px_4px_0px_0px_#ec4899]',
    label: 'Instagram',
  },
  {
    icon: <FaFacebook />,
    url: 'https://www.facebook.com/profile.php?id=61572744838042',
    color: 'text-blue-500 hover:text-blue-400',
    hoverShadow: 'hover:shadow-[4px_4px_0px_0px_#2563eb]',
    label: 'Facebook',
  },
  {
    icon: <FaTelegram />,
    url: 'https://t.me/infanjioun',
    color: 'text-cyan-400 hover:text-cyan-300',
    hoverShadow: 'hover:shadow-[4px_4px_0px_0px_#06b6d4]',
    label: 'Telegram',
  },
  {
    icon: <FaSquareXTwitter />,
    url: 'https://twitter.com/RahmanJito',
    color: 'text-slate-200 hover:text-white',
    hoverShadow: 'hover:shadow-[4px_4px_0px_0px_#f8fafc]',
    label: 'Twitter',
  },
];

const Footer: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <footer
        id="footer"
        className="relative mt-24 bg-slate-900/90 backdrop-blur-xl border-2 border-indigo-500/40 shadow-[8px_8px_0px_0px_#4f46e5] rounded-none pt-10 sm:pt-12 pb-8 px-4 sm:px-8 transition-all duration-300 overflow-hidden"
      >
        {/* Top Accent Gradient Line */}
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 shadow-[0_0_12px_#6366f1]" />

        <div
          className={`
            max-w-5xl mx-auto text-center space-y-6 sm:space-y-8
            ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
          `}
        >
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-widest uppercase">
              LET&apos;S BUILD SOMETHING <span className="text-cyan-400">IMPACTFUL</span> TOGETHER!
            </h2>
            <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 font-medium leading-relaxed px-2">
              I&apos;m passionate about building clean, modern, and performance-optimized web applications. Let&apos;s connect and create something awesome!
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6">
            {loading ? (
              <div className="flex gap-3">
                {Array.from({ length: 7 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    height={44}
                    width={44}
                    baseColor="#0f172a"
                    highlightColor="#4f46e5"
                    className="rounded-none border border-indigo-500/30"
                  />
                ))}
              </div>
            ) : (
              socialLinks.map(({ icon, url, color, hoverShadow, label }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`
                    w-11 h-11 sm:w-12 sm:h-12 text-lg sm:text-xl flex items-center justify-center 
                    bg-slate-950 border-2 border-indigo-500/40 rounded-none
                    shadow-[4px_4px_0px_0px_#4f46e5] transition-all duration-200
                    hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none
                    ${color} ${hoverShadow}
                    ${isVisible ? 'animate-bounce-in' : 'opacity-0'}
                  `}
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  {icon}
                </a>
              ))
            )}
          </div>

          {/* Sharp Cyber Divider */}
          <div className="relative w-full my-8">
            <div className="w-full border-t border-indigo-500/30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rotate-45 shadow-[0_0_8px_#22d3ee]" />
          </div>

          {/* Footer Bottom Text */}
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase leading-6">
            © {new Date().getFullYear()} INFAN JIOUN RAHMAN — ALL RIGHTS RESERVED.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> | </span>
            CRAFTED WITH <span className="text-cyan-400 font-bold">NEXT.JS</span> & <span className="text-indigo-400 font-bold">TYPESCRIPT</span>
          </p>
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.6) translateY(10px);
            }
            70% {
              opacity: 1;
              transform: scale(1.05) translateY(-2px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .animate-bounce-in {
            animation: bounceIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
      </footer>
    </div>
  );
};

export default Footer;