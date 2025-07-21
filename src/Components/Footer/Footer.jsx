import React from 'react';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaTwitter,
} from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { TbBrandFiverr } from 'react-icons/tb';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const socialLinks = [
  { icon: <FaGithub />, url: 'https://github.com/Infan-Jioun', color: 'text-gray-800' },
  { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/infan-jioun-rahman-81a1b2295/', color: 'text-blue-600' },
  { icon: <IoIosMail />, url: 'mailto:infanjiounrahman20606@gmail.com', color: 'text-red-600' },
  { icon: <TbBrandFiverr />, url: 'https://www.fiverr.com/s/dD9ZVj0', color: 'text-green-600' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/infan_jioun_rahman/', color: 'text-pink-600' },
  { icon: <FaFacebook />, url: 'https://www.facebook.com/InfanJiounRahmanJito.9', color: 'text-blue-700' },
  { icon: <FaTelegram />, url: 'https://t.me/infanjioun', color: 'text-cyan-500' },
  { icon: <FaSquareXTwitter />, url: 'https://twitter.com/RahmanJito', color: 'text-black' },
];

const Footer = () => {
  return (
    <footer className="footer footer-center p-6 bg-[#5a1c5a81]  backdrop-blur text-white rounded-xl mt-16">
      {/* Navigation Links */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center gap-10 mb-3 uppercase font-bold text-sm tracking-widest"
      >
        {/* <a href="/" className="hover:text-purple-400 transition-colors duration-300">About</a> */}
        <a href="/contact" className="hover:text-purple-400 transition-colors duration-300">Contact</a>
      </motion.nav>

      {/* Social Icons */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex flex-wrap justify-center gap-4"
      >
        {socialLinks.map(({ icon, url, color }, i) => (
          <motion.a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`text-sm p-2 rounded-full bg-white shadow transition duration-300 ${color}`}
          >
            {icon}
          </motion.a>
        ))}
      </motion.div>

      {/* Footer Text */}
      <motion.aside
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.1 }}
        className="mt-4 text-sm font-mono tracking-wide opacity-90"
      >
        <p>© 2025 Infan Jioun Rahman | Portfolio</p>
      </motion.aside>
    </footer>
  );
};

export default Footer;
