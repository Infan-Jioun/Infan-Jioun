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
import { TbBrandFiverr } from 'react-icons/tb';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const socialLinks = [
  { icon: <FaGithub />, url: 'https://github.com/Infan-Jioun', color: 'text-gray-800' },
  { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/infan-jioun-rahman-81a1b2295/', color: 'text-blue-600' },
  { icon: <IoIosMail />, url: 'mailto:infanjiounrahman20606@gmail.com', color: 'text-red-600' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/infan_jioun_rahman/', color: 'text-pink-600' },
  { icon: <FaFacebook />, url: 'https://www.facebook.com/InfanJiounRahmanJito.9', color: 'text-blue-700' },
  { icon: <FaTelegram />, url: 'https://t.me/infanjioun', color: 'text-cyan-500' },
  { icon: <FaSquareXTwitter />, url: 'https://twitter.com/RahmanJito', color: 'text-black' },
];

const Footer = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <footer className="mt-20 bg-transparent border-2 border-white backdrop-blur-xl rounded-t-3xl pt-12 pb-8 px-6 md:px-24 ">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-screen-xl mx-auto text-center space-y-8"
      >
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide uppercase">
          Let's build something impactful together!
        </h2>
        <p className="max-w-xl mx-auto text-sm ">
          I'm passionate about building clean, modern, and performance-optimized web applications. Let's connect and create something awesome!
        </p>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-5 mt-6">
          {loading
            ? <Skeleton height={40} width={250} />
            : socialLinks.map(({ icon, url, color }, i) => (
              <motion.a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 6 }}
                whileTap={{ scale: 0.95 }}
                className={`w-11 h-11 md:w-12 md:h-12 text-xl flex items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ${color}`}
              >
                {icon}
              </motion.a>
            ))}
        </div>

        {/* Divider */}
        <div className="w-full border-t  mt-10"></div>

        {/* Footer Bottom Text */}
        <p className="text-xs  font-mono mt-4">
          © {new Date().getFullYear()} Infan Jioun Rahman — All rights reserved. | Crafted with ❤️ using React & Tailwind CSS
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
