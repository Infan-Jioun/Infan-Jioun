import { useEffect, useState } from 'react';
import { Progress, Typography } from '@material-tailwind/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Typewriter from 'typewriter-effect';
import { MdSchool } from 'react-icons/md';
import image from '../../../assets/card/AboutImage.jpg';
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

const Banner = () => {
  const [loading, setLoading] = useState(true);
  const [visiblePercentages, setVisiblePercentages] = useState({});

  const skills = [
    { name: 'HTML', percentage: 90 },
    { name: 'CSS', percentage: 90 },
    { name: 'JavaScript', percentage: 60 },
    { name: 'React JS', percentage: 60 },
    { name: 'Node JS', percentage: 90 },
    { name: 'MongoDB', percentage: 65 },
    { name: 'Tailwind', percentage: 96 },
  ];

  const education = [
    {
      institute: 'Premier University Chittagong',
      degree: 'Bachelor of Arts (BA)',
      field: 'Fashion Design And Technology',
      duration: '2022 - Present',
    },
  ];

  const socialLinks = [
    { icon: <FaGithub />, href: 'https://github.com/infan11', color: 'text-gray-800' },
    {
      icon: <FaLinkedinIn />,
      href: 'https://www.linkedin.com/in/infan-jioun-rahman-81a1b2295/',
      color: 'text-blue-600',
    },
    { icon: <IoIosMail />, href: 'mailto:infanjiounrahman20606@gmail.com', color: 'text-red-600' },
    { icon: <TbBrandFiverr />, href: 'https://www.fiverr.com/infan_jioun', color: 'text-green-600' },
    {
      icon: <FaInstagram />,
      href: 'https://www.instagram.com/infan_jioun_rahman/',
      color: 'text-pink-600',
    },
    {
      icon: <FaFacebook />,
      href: 'https://www.facebook.com/InfanJiounRahmanJito.9',
      color: 'text-blue-700',
    },
    { icon: <FaTelegram />, href: 'https://t.me/infanjioun', color: 'text-cyan-500' },
    { icon: <FaSquareXTwitter />, href: 'https://twitter.com/RahmanJito', color: 'text-black' },
  ];

  const getColorByPercentage = (percentage) => {
    if (percentage >= 90) return 'green';
    if (percentage >= 70) return 'blue';
    if (percentage >= 50) return 'amber';
    return 'red';
  };

  useEffect(() => {
    AOS.init({ duration: 800 });
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const updated = {};
      skills.forEach((skill) => {
        const element = document.getElementById(skill.name);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            updated[skill.name] = skill.percentage;
          }
        }
      });
      setVisiblePercentages(updated);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [skills]);

  return (
    <div className="px-5 md:px-24 lg:ml-24">
      <p className="text-4xl font-bold text-center mb-10 drop-shadow-lg text-white block md:hidden">ABOUT</p>

      <div className="mt-28 md:mt-0" data-aos="zoom-in-up">
        <img
          src={image}
          alt="About"
          className="lg:w-[500px] mt-5 mx-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </div>

      <h1 className="text-2xl font-mono font-bold flex items-center gap-2 lg:ml-96 mt-5">
        <Typewriter
          options={{
            strings: ['Infan Jioun Rahman', "Address: Cox'sbazar, Bangladesh", 'Mobile : 01610240096'],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>

      <p className="font-bold mt-3">
        I am a JavaScript developer, majoring in the use of the React framework for front-end
        development. My backend stack includes Node.js, MongoDB, and Express.js. I have built strong
        and fast web apps that guarantee seamless integration with expertise in these technologies
        between the Frontend and Backend.
      </p>

      {/* Center social media icons */}
      <div className="flex flex-wrap max-w-7xl mx-auto justify-center items-center text-center gap-4 mt-5">
        {loading ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <Skeleton key={idx} height={40} width={40} circle />
          ))
        ) : (
          socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xl p-2 rounded-full bg-white hover:bg-purple-100 shadow hover:scale-110 transition duration-300 ${link.color}`}
            >
              {link.icon}
            </a>
          ))
        )}
      </div>
      <br />
      <div className='min-h-screen md:px-10'>
        <p className='text-3xl md:text-4xl font-bold text-center   drop-shadow-lg  text-white '>Tech  Stack</p>

        <p className='font-bold mb-7'> Frontend</p>
        <div className=' grid grid-cols-2  md:grid-cols-4 gap-4'>



          <div className=' md:w-56 mt-4 p-4 border-4  rounded-xl backdrop-blur shadow-2xl hover:scale-105 transition-transform duration-300'>
            <img className='w-10 mx-auto' src="https://i.ibb.co.com/2tqj250/html.webp" alt="" />
            <p className='text-center font-bold'>HTML 5 </p>
          </div>
          <div className=' md:w-56 mt-4 p-4 border-4  rounded-xl backdrop-blur shadow-2xl hover:scale-105 transition-transform duration-300'>
            <img className='w-10 mx-auto' src="https://i.ibb.co.com/FKdDmVy/css.webp" alt="" />
            <p className='text-center font-bold'>CSS </p>
          </div>
          <div className=' md:w-56 mt-4 p-4 border-4  rounded-xl backdrop-blur shadow-2xl hover:scale-105 transition-transform duration-300'>
            <img className='w-10 mx-auto' src="https://i.ibb.co.com/XJnMS8L/bootstrap.webp" alt="" />
            <p className='text-center font-bold'>BOOTSRAP </p>
          </div>
          <div className=' md:w-56 mt-4 p-4 border-4  rounded-xl backdrop-blur shadow-2xl hover:scale-105 transition-transform duration-300'>
            <img className='w-10 mx-auto' src="https://i.ibb.co.com/jJzXpx5/tailwind.webp" alt="" />
            <p className='text-center font-bold'>TAILWIND CSS </p>
          </div>
          <div className=' md:w-56 mt-4 p-4 border-4  rounded-xl backdrop-blur shadow-2xl hover:scale-105 transition-transform duration-300'>
            <img className='w-10 mx-auto' src="https://i.ibb.co.com/6s0HLvL/DaisyUI.webp" alt="" />
            <p className='text-center font-bold'>DAISYUI </p>
          </div>
          <div className=' md:w-56 mt-4 p-4 border-4  rounded-xl backdrop-blur shadow-2xl hover:scale-105 transition-transform duration-300'>
            <img className='w-10 mx-auto' src="https://i.ibb.co.com/zRpT9jC/javascript.webp" alt="" />
            <p className='text-center font-bold'>JAVASCRIPT </p>
          </div>
          <div className=' md:w-56 mt-4 p-4 border-4  rounded-xl backdrop-blur shadow-2xl hover:scale-105 transition-transform duration-300'>
            <img className='w-10 mx-auto' src="https://i.ibb.co.com/gRXXrDs/react.webp" alt="" />
            <p className='text-center font-bold'>REACT </p>
          </div>

          <div className=' md:w-56 mt-4 p-4 border-4  rounded-xl backdrop-blur shadow-2xl hover:scale-105 transition-transform duration-300'>
            <img className='w-10 mx-auto' src="https://i.ibb.co.com/PG70x3p/typescript.webp" alt="" />
            <p className='text-center font-bold'>TYPESCRIPT </p>
          </div>


        </div>
        <div className='divider mt-4 mb-2'></div>


        <p className='font-bold'> Bankend</p>
        <div className=' grid grid-cols-2  md:grid-cols-4 gap-4'>



          <div className=' md:w-56 mt-4 p-4 border-4  rounded-xl backdrop-blur shadow-2xl hover:scale-105 transition-transform duration-300'>
            <img className='w-10 mx-auto' src="https://i.ibb.co.com/jVnm9XT/nodeJS.webp" alt="" />
            <p className='text-center font-bold'>NODE.JS </p>
          </div>


          <div className=' md:w-56 mt-4 p-4 border-4  rounded-xl backdrop-blur shadow-2xl hover:scale-105 transition-transform duration-300'>
            <img className='w-10 mx-auto' src="https://i.ibb.co.com/ZYWHXHn/express-Js.webp" alt="" />
            <p className='text-center font-bold'>EXPRESS.JS </p>
          </div>




        </div>

        <div className='divider mt-4 mb-2'></div>


        <p className='font-bold'> Database</p>
        <div className=' grid grid-cols-2  md:grid-cols-4 gap-4'>



          <div className=' md:w-56 mt-4 p-4 border-4  rounded-xl backdrop-blur shadow-2xl hover:scale-105 transition-transform duration-300'>
            <img className='w-10 mx-auto' src="https://i.ibb.co.com/6v93hD0/mongoDB.webp" alt="" />
            <p className='text-center font-bold'>MONGODB </p>
          </div>




        </div>
        <div className='divider mt-4 mb-2'></div>


        <p className='font-bold'>Tools</p>
        <div className=' grid grid-cols-2  md:grid-cols-4 gap-4 mb-3'>



          <div className=' md:w-56 mt-4 p-4 border-4  rounded-xl backdrop-blur shadow-2xl hover:scale-105 transition-transform duration-300'>
            <img className='w-10 mx-auto' src=" https://i.ibb.co.com/chkqwLD/git.webp" alt="" />
            <p className='text-center font-bold'>GIT </p>
          </div>
          <div className=' md:w-56 mt-4 p-4 border-4  rounded-xl backdrop-blur shadow-2xl hover:scale-105 transition-transform duration-300'>
            <img className='w-10 mx-auto' src=" https://i.ibb.co.com/5jCZwV7/github.webp" alt="" />
            <p className='text-center font-bold'>GITHUB </p>
          </div>
          <div className=' md:w-56 mt-4 p-4 border-4  rounded-xl backdrop-blur shadow-2xl hover:scale-105 transition-transform duration-300'>
            <img className='w-10 mx-auto' src=" https://i.ibb.co.com/GJwBw0r/firebase.webp" alt="" />
            <p className='text-center font-bold'>FIREBASE </p>
          </div>
          <div className=' md:w-56 mt-4 p-4 border-4  rounded-xl backdrop-blur shadow-2xl hover:scale-105 transition-transform duration-300'>
            <img className='w-10 mx-auto mix-blend-darken' src="https://i.ibb.co.com/ncjrw8y/download-1-removebg-preview.png" alt="" />
            <p className='text-center font-bold'>VS CODE </p>
          </div>

          <div className=' md:w-56 mt-4 p-4 border-4  rounded-xl backdrop-blur shadow-2xl hover:scale-105 transition-transform duration-300'>
            <img className='w-10 mx-auto' src="https://i.ibb.co.com/jMVL967/image-processing20210629-17620-1wabg7i.png" alt="" />
            <p className='text-center font-bold'>NOTION</p>
          </div>




        </div>

      </div>

      {/* Skills Section */}
      <section className="my-10">
        <h2 className=" text-3xl md:text-4xl font-bold text-center uppercase   drop-shadow-lg  text-white mb-4">My Skills</h2>
        {skills.map((skill, index) => (
          <div key={index} id={skill.name} className="w-full mb-4">
            <div className="mb-2 flex items-center justify-between">
              <Typography variant="h6">{skill.name}</Typography>
              <Typography variant="h6">{visiblePercentages[skill.name] || 0}%</Typography>
            </div>
            <Progress
              color={getColorByPercentage(skill.percentage)}
              value={visiblePercentages[skill.name] || 0}
            />
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section className="my-10">
        <h2 className=" text-2xl md:text-4xl font-bold text-center uppercase   drop-shadow-lg  text-white mb-4
        ">Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="border-l-4 border-purple-500 pl-4 py-3 shadow-md  rounded-lg hover:scale-105 transition-transform duration-300"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MdSchool className="text-purple-500" /> {edu.institute}
              </h3>
              <p className="font-semibold">{edu.degree}</p>
              <p>{edu.field}</p>
              <p className="italic">{edu.duration}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Banner;
