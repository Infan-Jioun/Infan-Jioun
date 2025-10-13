import image from '../../../assets/LOGO/[FREE - HDconvert,com] 2024-04-16 (1)-photoaidcom-cropped.png';
import { FaGithub, FaLinkedinIn, FaInstagram, FaFacebook, FaTelegram } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdDownloading, MdSchool } from 'react-icons/md';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import MyProjects from '../MyProjects/MyProjects';
import Card from '../Card/Card';
import Typewriter from 'typewriter-effect';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input, Textarea } from '@material-tailwind/react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';
import Skills from '../../Skills/Skills';

const Banner = () => {
  const form = useRef();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);

  // Social media links data for cleaner code
  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/Infan-Jioun", color: "text-gray-800" },
    { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/infan-jioun-rahman", color: "text-blue-600" },
    { icon: <IoIosMail />, href: "mailto:infanjiounrahman20606@gmail.com", color: "text-red-600" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/infan_jioun_rahman/", color: "text-pink-600" },
    { icon: <FaFacebook />, href: "https://www.facebook.com/InfanJiounRahmanJito.9", color: "text-blue-700" },
    { icon: <FaTelegram />, href: "https://t.me/infanjioun", color: "text-cyan-500" },
    { icon: <FaSquareXTwitter />, href: "https://twitter.com/RahmanJito", color: "text-black" }
  ];

  const education = [
    {
      institute: 'Premier University Chittagong',
      degree: 'Bachelor of Arts (BA)',
      field: 'Fashion Design And Technology',
      duration: '2024 - Present',
    },
  ];

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Event handlers
  const sendEmail = useCallback((e) => {
    e.preventDefault();
    emailjs.sendForm('service_34ob7qt', 'template_2rj1a7j', form.current, {
      publicKey: 'LD3EefzuvWY-avuiH',
    }).then(() => {
      toast.success('Successfully sent your message!', { position: "top-center" });
      form.current.reset(); // Clear form after successful submission
    }).catch(() => {
      toast.error('Please try again', { position: "top-center", autoClose: 2000 });
    });
  }, []);

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Loading skeleton for profile image
  const ProfileImage = () =>
    loading ? (
      <Skeleton circle={true} height={320} width={320} />
    ) : (
      <img
        src={image}
        alt="Infan Jioun Rahman"
        draggable="false"
        className="w-64 md:w-80 rounded-full border-4 border-violet-700 drop-shadow-lg shadow-xl transition-transform duration-300 hover:scale-105"
      />
    );

  // Loading skeleton for text content
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

  // Social links component
  const SocialLinks = () =>
    loading ? (
      <Skeleton height={40} width={250} className="mb-6" />
    ) : (
      <div className="flex flex-wrap justify-center md:justify-start gap-3 drop-shadow-lg mb-6">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xl p-2 rounded-full bg-white hover:bg-purple-100 shadow hover:scale-110 transition duration-300 ${link.color}`}
            aria-label={`Visit ${link.href}`}
          >
            {link.icon}
          </a>
        ))}
      </div>
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
          onClick={scrollToForm}
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
    <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-14">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-28 items-center" id="about">
        <div className="flex justify-center md:order-2 drop-shadow-lg">
          <ProfileImage />
        </div>

        <div className="text-center md:text-left md:order-1">
          <TextContent />
          <SocialLinks />
          <ActionButtons />
        </div>
      </div>

      {/* Projects & Skills Section */}
      {loading ? (
        <div className="mt-12 space-y-8">
          <Skeleton height={200} />
          <Skeleton height={200} />
        </div>
      ) : (
        <>
          <Card />
          <div id='myProjects' className="mt-16">
            <MyProjects />
          </div>
        </>
      )}

      {/* Skills Section */}
      <div id="skills" className="mt-16">
        <Skills />
      </div>

      {/* Education Section */}
      <section className="my-16 px-4" id="education">
        <h2 className="text-2xl md:text-4xl font-bold text-center uppercase text-white drop-shadow-lg mb-8">
          Education
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <div
              key={index}
              className="relative bg-white/5 backdrop-blur-sm border border-[#5a1c5a81] p-6 rounded-xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-purple-800/40"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-1">
                <MdSchool className="text-white" /> {edu.institute}
              </h3>
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-white-300">{edu.field}</p>
              <p className="italic mt-2">{edu.duration}</p>
            </div>
          ))}

          <div className="relative bg-white/5 backdrop-blur-sm border border-[#5a1c5a81] p-6 rounded-xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-purple-800/40">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-1">
              <MdSchool className="text-white" /> Programming Hero
            </h3>
            <p className="font-semibold">Additional Course</p>
            <p className="text-white-300">Web Development</p>
            <p className="italic mt-2">2023 (July - December)</p>
            <Link
              to="https://drive.google.com/file/d/1LRG-O9v8Xi0APntm4gbi6gR7BODlmqBu/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white mt-4 text-white py-2 px-4 rounded-full transition-all duration-300 hover:scale-105 hover:bg-white/10"
            >
              <MdDownloading className="text-xl" />
              Certificate
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div ref={formRef} id="contact" className="mt-16">
        <h2 className="text-center text-3xl md:text-4xl uppercase font-bold drop-shadow-lg text-white font-mono mb-8">
          Contact Us
        </h2>
        <div className="card max-w-3xl mx-auto mt-6 shadow-lg rounded-xl p-6 drop-shadow-xl backdrop-blur-2xl bg-white/5 border border-white/10">
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                label="Name"
                name="user_name"
                placeholder="Your Name"
                required
                className="text-white"
              />
              <Input
                type="email"
                label="Email"
                name="user_email"
                placeholder="Your Email"
                required
                className="text-white"
              />
            </div>
            <Textarea
              name="message"
              label="Your Message"
              required
              className="text-white"
            />
            <button
              type="submit"
              title='Send Your Message'
              className="w-full btn border-2 border-white backdrop-blur text-white p-3 bg-purple-700 hover:bg-purple-900 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Send Your Message
            </button>
          </form>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 w-12 h-12 font-bold z-50 rounded-full bg-white text-purple-700 hover:text-white shadow-xl hover:bg-transparent hover:backdrop-blur-3xl transition-all duration-300 animate-bounce flex items-center justify-center"
          title="Back to top"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Banner;