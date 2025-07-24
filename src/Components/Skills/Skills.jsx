import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Progress, Typography } from '@material-tailwind/react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Skills = () => {
    const [loading, setLoading] = useState(true);
    const [visiblePercentages, setVisiblePercentages] = useState({});

    // Skill categories data
    const skillsData = [
        {
            title: "Frontend",
            skills: [
                { name: "HTML 5", icon: "https://i.ibb.co.com/2tqj250/html.webp" },
                { name: "CSS", icon: "https://i.ibb.co.com/FKdDmVy/css.webp" },
                { name: "BOOTSTRAP", icon: "https://i.ibb.co.com/XJnMS8L/bootstrap.webp" },
                { name: "TAILWIND CSS", icon: "https://i.ibb.co.com/jJzXpx5/tailwind.webp" },
                { name: "DAISYUI", icon: "https://i.ibb.co.com/6s0HLvL/DaisyUI.webp" },
                { name: "JAVASCRIPT", icon: "https://i.ibb.co.com/zRpT9jC/javascript.webp" },
                { name: "REACT", icon: "https://i.ibb.co.com/gRXXrDs/react.webp" },
                // { name: " MATERIAL TAILWIND", icon: "https://www.material-tailwind.com/favicon.icon" },
                { name: "FARMER MOTION  ", icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg" },
                { name: "TANSTACK  ", icon: "https://i.ibb.co/pvXrXCPX/splash-light-CHq-Msyq8.png" },
                { name: "AXIOS  ", icon: "https://axios-http.com/assets/logo.svg" },
                { name: "REACT HOOK FORM  ", icon: "https://react-hook-form.com/images/logo/react-hook-form-logo-only.png" },
                { name: "REDUX TOOLKIT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" }
            ]
        },
        {
            title: "Backend",
            skills: [
                { name: "NODE.JS", icon: "https://i.ibb.co.com/jVnm9XT/nodeJS.webp" },
                { name: "EXPRESS.JS", icon: "https://i.ibb.co.com/ZYWHXHn/express-Js.webp" }
            ]
        },
        {
            title: "Database",
            skills: [
                { name: "MONGODB", icon: "https://i.ibb.co.com/6v93hD0/mongoDB.webp" }
            ]
        },
        {
            title: "Tools",
            skills: [
                { name: "GIT", icon: "https://i.ibb.co.com/chkqwLD/git.webp" },
                { name: "GITHUB", icon: "https://i.ibb.co.com/5jCZwV7/github.webp" },
                { name: "FIREBASE", icon: "https://i.ibb.co.com/GJwBw0r/firebase.webp" },
                { name: "VS CODE", icon: "https://i.ibb.co.com/ncjrw8y/download-1-removebg-preview.png" },
                { name: "NOTION", icon: "https://i.ibb.co.com/jMVL967/image-processing20210629-17620-1wabg7i.png" }
            ]
        }
    ];

    const progressSkills = [
        { name: 'HTML', percentage: 90 },
        { name: 'CSS', percentage: 90 },
        { name: 'JavaScript', percentage: 60 },
        { name: 'React JS', percentage: 60 },
        { name: 'Node JS', percentage: 90 },
        { name: 'MongoDB', percentage: 65 },
        { name: 'Tailwind', percentage: 96 },
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
            progressSkills.forEach((skill) => {
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
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 data-aos="zoom-in" className="text-3xl md:text-4xl font-bold text-center text-white mb-12 drop-shadow-lg uppercase">
            My Skills
            </h2>

            {loading ? (
                // Skeleton Loading State
                <div className="space-y-12">
                    {[...Array(4)].map((_, catIndex) => (
                        <div key={catIndex} className="mb-8">
                            <Skeleton width={150} height={30} className="mb-6" />
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {[...Array(5)].map((_, skillIndex) => (
                                    <div key={skillIndex} className="flex flex-col items-center p-4">
                                        <Skeleton circle width={40} height={40} className="mb-2" />
                                        <Skeleton width={80} height={20} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Actual Skills Display
                <div className="space-y-12">
                    {skillsData.map((category, index) => (
                        <div key={index} className="mb-8">
                            <h3 className="text-xl font-bold text-white mb-6">{category.title}</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <div 
                                        key={skillIndex}
                                        className=" md:w-44 mt-4 p-4 border-4  rounded-xl backdrop-blur shadow-2xl hover:scale-105 transition-transform duration-300"
                                    >
                                        <img 
                                            src={skill.icon} 
                                            alt={skill.name} 
                                            className="w-12 h-12 mx-auto  object-contain mb-2" 
                                            loading="lazy"
                                        />
                                        <p className="text-center font-medium text-white drop-shadow-2xl">{skill.name}</p>
                                    </div>
                                ))}
                            </div>
                            {index < skillsData.length - 1 && <div className="divider my-8" />}
                        </div>
                    ))}
                </div>
            )}

            <section className="my-10" data-aos="fade-up">
                
                {progressSkills.map((skill, index) => (
                    <div key={index} id={skill.name} className="w-full mb-4">
                        <div className="mb-2 flex items-center justify-between">
                            <Typography variant="h6" className="text-white">
                                {skill.name}
                            </Typography>
                            <Typography variant="h6" className="text-white">
                                {visiblePercentages[skill.name] || 0}%
                            </Typography>
                        </div>
                        <Progress
                            color={getColorByPercentage(skill.percentage)}
                            value={visiblePercentages[skill.name] || 0}
                            className="h-2"
                        />
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Skills;