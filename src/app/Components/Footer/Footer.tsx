"use client"
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
}

const socialLinks: SocialLink[] = [
  { icon: <FaGithub />, url: 'https://github.com/Infan-Jioun', color: 'text-gray-800' },
  { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/infan-jioun-rahman-81a1b2295/', color: 'text-blue-600' },
  { icon: <IoIosMail />, url: 'mailto:infanjiounrahman20606@gmail.com', color: 'text-red-600' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/infan_jioun_rahman/', color: 'text-pink-600' },
  { icon: <FaFacebook />, url: 'https://www.facebook.com/profile.php?id=61572744838042', color: 'text-blue-700' },
  { icon: <FaTelegram />, url: 'https://t.me/infanjioun', color: 'text-cyan-500' },
  { icon: <FaSquareXTwitter />, url: 'https://twitter.com/RahmanJito', color: 'text-black' },
];

const Footer: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);

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
    <div className="px-4 sm:px-6 lg:px-8 xl:px-52 w-full">
      <footer
        id="footer"
        className="mt-20  backdrop-blur-lg border  rounded-t-3xl pt-8 sm:pt-10 lg:pt-12 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8"
      >
        <div
          className={`
          max-w-7xl mx-auto text-center space-y-6 sm:space-y-8
          ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}
        `}
        >
          {/* Header */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold sm:font-extrabold text-white tracking-wide uppercase">
            Let&apos;s build something impactful together!
          </h2>

          <p className="max-w-xl mx-auto text-xs sm:text-sm text-white/90 leading-relaxed px-2">
            I&apos;m passionate about building clean, modern, and performance-optimized web applications. Let&apos;s connect and create something awesome!
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-5 mt-6">
            {loading ? (
              <Skeleton height={40} width={250} baseColor="#2c2c3a" highlightColor="#4338ca" />
            ) : (
              socialLinks.map(({ icon, url, color }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                  w-7 h-7 md:w-12 md:h-12 text-xl flex items-center justify-center 
                  rounded-full bg-white shadow-md transition-all duration-300 
                  hover:scale-110 hover:rotate-6 active:scale-95 ${color}
                  ${isVisible ? 'animate-bounce-in' : 'opacity-0'}
                `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {icon}
                </a>
              ))
            )}
          </div>

          {/* Divider */}
          <div className="w-full border-t border-white/30 mt-8 sm:mt-10"></div>

          {/* Footer Bottom Text */}
          <p className="text-xs text-white/80 font-mono mt-4 sm:mt-6 px-2 leading-5">
            © {new Date().getFullYear()} Infan Jioun Rahman — All rights reserved.
            <br className="sm:hidden" />
            Crafted with ❤️ using TypeScript & Next JS
          </p>
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.3);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
            70% {
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.5s ease-out forwards;
          }
          
          .animate-bounce-in {
            animation: bounceIn 0.6s ease-out forwards;
          }
        `}</style>
      </footer>
    </div>
  );
};

export default Footer;