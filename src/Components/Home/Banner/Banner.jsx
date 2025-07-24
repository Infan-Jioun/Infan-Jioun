import image from '../../../assets/LOGO/[FREE - HDconvert,com] 2024-04-16 (1)-photoaidcom-cropped.png';
import { FaGithub, FaLinkedinIn, FaInstagram, FaFacebook, FaTelegram } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { TbBrandFiverr } from "react-icons/tb";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdDownloading, MdSchool } from 'react-icons/md';
import React, { useRef, useState, useEffect } from 'react';
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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_34ob7qt', 'template_2rj1a7j', form.current, {
      publicKey: 'LD3EefzuvWY-avuiH',
    }).then(() => {
      toast.success('Successfully sent your message!', { position: "top-center" });
    }).catch(() => {
      toast.error('Please try again', { position: "top-center", autoClose: 2000 });
    });
  };

  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const education = [
    {
      institute: 'Premier University Chittagong',
      degree: 'Bachelor of Arts (BA)',
      field: 'Fashion Design And Technology',
      duration: '2024 - Present',
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-8 py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-28 items-center" id="about">
        <div className="flex justify-center md:order-2 drop-shadow-lg">
          {loading
            ? <Skeleton circle={true} height={320} width={320} />
            : <img src={image} alt="Profile" draggable="false" className="w-64 md:w-80 rounded-full border-4 border-violet-700 drop-shadow-lg shadow-xl" />
          }
        </div>

        <div className="text-center md:text-left md:order-1">
          <h1 className=" md:text-4xl  font-mono text-3xl font-bold drop-shadow-lg  ">
            {loading ? <Skeleton width={300} /> : <Typewriter options={{ strings: ['Infan Jioun Rahman'], autoStart: true, loop: true }} />}
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold mt-2 drop-shadow-lg">
            {loading ? <Skeleton width={250} /> : <Typewriter options={{
              strings: ["JavaScript Developer", 'React JS Developer', "MERN Developer", "Web Designer"],
              autoStart: true,
              loop: true,
            }} />}
          </h2>
          <p className="mt-4 text-lg drop-shadow-lg">
            {loading ? <Skeleton count={3} /> :
              "Hi! I'm a passionate Web Developer with a strong focus on React for front-end development. On the back-end, I work seamlessly with Node.js, Express.js, and MongoDB to craft dynamic, secure, and high-performance web applications."
            }
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 drop-shadow-lg mt-5">
            {loading
              ? <Skeleton height={40} width={250} />
              : <>
                <a href="https://github.com/Infan-Jioun" target="_blank" rel="noopener noreferrer" className="text-xl p-2 rounded-full bg-white hover:bg-purple-100 shadow hover:scale-110 transition duration-300 text-gray-800"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/infan-jioun-rahman-81a1b2295/" target="_blank" rel="noopener noreferrer" className="text-xl p-2 rounded-full bg-white hover:bg-purple-100 shadow hover:scale-110 transition duration-300 text-blue-600"><FaLinkedinIn /></a>
                <a href="mailto:infanjiounrahman20606@gmail.com" target="_blank" rel="noopener noreferrer" className="text-xl p-2 rounded-full bg-white hover:bg-purple-100 shadow hover:scale-110 transition duration-300 text-red-600"><IoIosMail /></a>
                <a href="https://www.fiverr.com/s/dD9ZVj0" target="_blank" rel="noopener noreferrer" className="text-xl p-2 rounded-full bg-white hover:bg-purple-100 shadow hover:scale-110 transition duration-300 text-green-600"><TbBrandFiverr /></a>
                <a href="https://www.instagram.com/infan_jioun_rahman/" target="_blank" rel="noopener noreferrer" className="text-xl p-2 rounded-full bg-white hover:bg-purple-100 shadow hover:scale-110 transition duration-300 text-pink-600"><FaInstagram /></a>
                <a href="https://www.facebook.com/InfanJiounRahmanJito.9" target="_blank" rel="noopener noreferrer" className="text-xl p-2 rounded-full bg-white hover:bg-purple-100 shadow hover:scale-110 transition duration-300 text-blue-700"><FaFacebook /></a>
                <a href="https://t.me/infanjioun" target="_blank" rel="noopener noreferrer" className="text-xl p-2 rounded-full bg-white hover:bg-purple-100 shadow hover:scale-110 transition duration-300 text-cyan-500"><FaTelegram /></a>
                <a href="https://twitter.com/RahmanJito" target="_blank" rel="noopener noreferrer" className="text-xl p-2 rounded-full bg-white hover:bg-purple-100 shadow hover:scale-110 transition duration-300 text-black"><FaSquareXTwitter /></a>
              </>
            }
          </div>

          <div className="mt-6 flex justify-center md:justify-start items-center drop-shadow-2xl gap-4">
            {loading ? (
              <Skeleton height={45} width={140} count={2} />
            ) : (
              <>
                <button
                  onClick={scrollToForm}
                  className="w-36 bg-transparent border-2 border-white backdrop-blur drop-shadow-2xl text-white p-3 rounded-full transform transition-transform duration-300 hover:scale-105"
                >
                  HIRE ME
                </button>
                <Link
                  to="https://drive.google.com/file/d/1d-9BZmvSCR0dITy2p1aUDEdrR-oQy1QF/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-44 flex justify-center items-center bg-transparent border-2 border-white backdrop-blur drop-shadow-2xl text-white p-3 rounded-full transform transition-transform duration-300 hover:scale-105"
                >
                  <MdDownloading className="text-xl mr-2" />
                  RESUME
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="mt-12 space-y-4">
          <Skeleton height={200} />
          <Skeleton height={200} />
        </div>
      ) : (
        <>
          <Card />
          <div id='myProjects'>
          <MyProjects />
          </div>
        </>
      )}

      <div id="skills">
        <Skills />
      </div>

      <section className="my-10 px-4" id="education">
        <h2 className="text-2xl md:text-4xl font-bold text-center uppercase text-white drop-shadow-lg mb-8">
          Education
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="relative bg-white/5 backdrop-blur-sm border border-[#5a1c5a81] p-6 rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-purple-800/40"
            >
              <h3 className="text-lg font-semibold  flex items-center gap-2 mb-1">
                <MdSchool className="text-[#5a1c5a81]" /> {edu.institute}
              </h3>
              <p className=" font-semibold">{edu.degree}</p>
              <p className="">{edu.field}</p>
              <p className="italic  mt-2">{edu.duration}</p>
            </div>
          ))}

          <div className="relative bg-white/5 backdrop-blur-sm border border-[#5a1c5a81] p-6 rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-purple-800/40">
            <h3 className="text-lg font-semibold  flex items-center gap-2 mb-1">
              <MdSchool className="text-[#5a1c5a81]" /> Programming Hero
            </h3>
            <p className=" font-semibold">Additional Course</p>
            <p className="">Web Development</p>
            <p className="italic  mt-2">2023 (July - December)</p>
            <Link
              to="https://drive.google.com/file/d/19KYaO4wQdPsMMO3ky-jzsL4XJqM6CfS1/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white mt-4 text-white py-2 px-4 rounded-full transition-transform duration-300 hover:scale-105"
            >
              <MdDownloading className="text-xl" />
              Certificate
            </Link>
          </div>
        </div>
      </section>

      <div ref={formRef} id="contact" className="mt-16">
        <h2 className="text-center text-3xl md:text-4xl uppercase font-bold drop-shadow-lg text-white font-mono">Contact Us</h2>
        <div className="card max-w-3xl mx-auto mt-6 shadow-lg rounded-xl p-6 drop-shadow-xl backdrop-blur-2xl bg-white">
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input type="text" label="Name" name="user_name" placeholder="Your Name" required />
              <Input type="email" label="Email" name="user_email" placeholder="Your Email" required />
            </div>
            <Textarea name="message" label="Your Message" required />
            <button type="submit" className="w-full btn  border-2 border-white backdrop-blur text-white p-3 rounded-full ">
              Send Your Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
