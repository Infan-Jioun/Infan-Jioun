import React from 'react';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
} from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { TbBrandFiverr } from 'react-icons/tb';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const socialLinks = [
  { icon: <FaGithub />, url: 'https://github.com/Infan-Jioun', color: 'hover:text-gray-800' },
  { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/infan-jioun-rahman-81a1b2295/', color: 'hover:text-blue-500' },
  { icon: <IoIosMail />, url: 'mailto:infanjiounrahman20606@gmail.com', color: 'hover:text-red-500' },
  { icon: <TbBrandFiverr />, url: 'https://www.fiverr.com/s/dD9ZVj0', color: 'hover:text-green-500' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/infan_jioun_rahman/', color: 'hover:text-pink-500' },
  { icon: <FaFacebook />, url: 'https://www.facebook.com/InfanJiounRahmanJito.9', color: 'hover:text-blue-600' },
  { icon: <FaTelegram />, url: 'https://t.me/infanjioun', color: 'hover:text-cyan-500' },
  { icon: <FaSquareXTwitter />, url: 'https://twitter.com/RahmanJito', color: 'hover:text-black' },
];

const Footer = () => {
  return (
    <footer className="mt-20 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-screen-xl mx-auto px-4 py-10 rounded-xl backdrop-blur-xl border-2 border-white bg-gradient-to-br from-white/5 to-white/10"
      >
        {/* Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Navigation */}
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-lg font-semibold">Let’s Connect</h3>
            <p className="text-sm text-gray-300">
              Reach out through any platform below.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 flex-wrap justify-center">
            {socialLinks.map(({ icon, url, color }, i) => (
              <motion.a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`text-xl p-3 bg-white text-black rounded-full shadow-md transition-all duration-300 ${color}`}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-6 mb-4" />

        {/* Footer Bottom Text */}
        <div className="text-center text-sm text-gray-400 font-mono">
          © {new Date().getFullYear()} Infan Jioun Rahman — All Rights Reserved
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
