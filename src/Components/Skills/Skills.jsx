import React, { useEffect, useState, useMemo, useCallback, lazy, Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Progress, Typography } from '@material-tailwind/react';

// Lazy load heavy dependencies
const LazyAOS = lazy(() => import('aos'));

// Static data outside component to prevent re-renders
const SKILLS_DATA = [
    {
        title: "Frontend",
        skills: [
            { name: "HTML 5", icon: "https://i.ibb.co.com/2tqj250/html.webp" },
            { name: "CSS", icon: "https://i.ibb.co.com/FKdDmVy/css.webp" },
            { name: "JAVASCRIPT", icon: "https://i.ibb.co.com/zRpT9jC/javascript.webp" },
            { name: "TYPESCRIPT", icon: "https://i.ibb.co.com/HL0sSj4C/typescript.webp" },
            { name: "REACT JS", icon: "https://i.ibb.co.com/gRXXrDs/react.webp" },
            { name: "NEXT JS", icon: "https://i.ibb.co.com/xtCck3wG/nextJs.webp" },
            { name: "TAILWIND CSS", icon: "https://i.ibb.co.com/jJzXpx5/tailwind.webp" },
            { name: "SHADCN", icon: "https://i.ibb.co.com/0R3TKXmx/shadcn.webp" },
            { name: "REDUX TOOLKIT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
            { name: "DAISYUI", icon: "https://i.ibb.co.com/6s0HLvL/DaisyUI.webp" },
            { name: "FARMER MOTION", icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg" },
            { name: "TANSTACK", icon: "https://i.ibb.co/pvXrXCPX/splash-light-CHq-Msyq8.png" },
            { name: "AXIOS", icon: "https://axios-http.com/assets/logo.svg" },
            { name: "REACT HOOK FORM", icon: "https://react-hook-form.com/images/logo/react-hook-form-logo-only.png" },
       
        ]
    },
    {
        title: "Backend",
        skills: [
            { name: "NODE.JS", icon: "https://i.ibb.co.com/jVnm9XT/nodeJS.webp" },
            { name: "EXPRESS.JS", icon: "https://i.ibb.co.com/ZYWHXHn/express-Js.webp" },
            { name: "NEXT JS (SSR)", icon: "https://i.ibb.co.com/xtCck3wG/nextJs.webp" }
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

const PROGRESS_SKILLS = [
    { name: 'HTML', percentage: 90 },
    { name: 'CSS', percentage: 90 },
    { name: 'JavaScript', percentage: 80 },
    { name: 'TypeScript', percentage:  60},
    { name: 'React JS', percentage: 80 },
    { name: 'Next JS', percentage: 60 },
    { name: 'Node JS', percentage: 90 },
    { name: 'MongoDB', percentage: 65 },
    { name: 'Tailwind', percentage: 96 },
    { name: 'Redux-Toolkit', percentage: 80 },
];

// Memoized Skill Category Component
const SkillCategory = React.memo(({ category, loading }) => {
    const [loadedImages, setLoadedImages] = useState({});

    const handleImageLoad = useCallback((skillName) => {
        setLoadedImages(prev => ({ ...prev, [skillName]: true }));
    }, []);

    if (loading) {
        return (
            <div className="mb-8">
                <Skeleton width={150} height={30} className="mb-6" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex flex-col items-center p-4">
                            <Skeleton circle width={40} height={40} className="mb-2" />
                            <Skeleton width={80} height={20} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-6">{category.title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.skills.map((skill, index) => (
                    <div
                        key={`${category.title}-${skill.name}`}
                        className="md:w-44 mt-4 p-4 border-4 rounded-xl backdrop-blur shadow-2xl hover:scale-105 transition-transform duration-300"
                    >
                        <div className="relative w-12 h-12 mx-auto mb-2">
                            {!loadedImages[skill.name] && (
                                <Skeleton
                                    circle
                                    width={48}
                                    height={48}
                                    className="absolute inset-0"
                                    baseColor="#2c2c3a"
                                    highlightColor="#4338ca"
                                />
                            )}
                            <img
                                src={skill.icon}
                                alt={skill.name}
                                loading="lazy"
                                onLoad={() => handleImageLoad(skill.name)}
                                className={`w-12 h-12 mx-auto object-contain transition-opacity duration-300 ${loadedImages[skill.name] ? 'opacity-100' : 'opacity-0'
                                    }`}
                            />
                        </div>
                        <p className="text-center font-medium text-white drop-shadow-2xl text-sm leading-tight">
                            {skill.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
});

SkillCategory.displayName = 'SkillCategory';

// Memoized Progress Bar Component
const SkillProgressBar = React.memo(({ skill, visiblePercentage }) => {
    const getColorByPercentage = useCallback((percentage) => {
        if (percentage >= 90) return 'green';
        if (percentage >= 70) return 'blue';
        if (percentage >= 50) return 'amber';
        return 'red';
    }, []);

    return (
        <div id={skill.name} className="w-full mb-4">
            <div className="mb-2 flex items-center justify-between">
                <Typography variant="h6" className="text-white">
                    {skill.name}
                </Typography>
                <Typography variant="h6" className="text-white">
                    {visiblePercentage}%
                </Typography>
            </div>
            <Progress
                color={getColorByPercentage(skill.percentage)}
                value={visiblePercentage}
                className="h-2 transition-all duration-1000 ease-out"
            />
        </div>
    );
});

SkillProgressBar.displayName = 'SkillProgressBar';

const Skills = () => {
    const [loading, setLoading] = useState(true);
    const [visiblePercentages, setVisiblePercentages] = useState({});
    const [isInView, setIsInView] = useState(false);

    // Memoized data
    const skillsData = useMemo(() => SKILLS_DATA, []);
    const progressSkills = useMemo(() => PROGRESS_SKILLS, []);

    // Intersection Observer for progress bars
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const skillsSection = document.getElementById('skills-section');
        if (skillsSection) {
            observer.observe(skillsSection);
        }

        return () => observer.disconnect();
    }, []);

    // Animate progress bars when in view
    useEffect(() => {
        if (!isInView) return;

        const animateProgress = () => {
            const updated = {};
            progressSkills.forEach((skill) => {
                updated[skill.name] = skill.percentage;
            });
            setVisiblePercentages(updated);
        };

        // Stagger the animation
        const timer = setTimeout(animateProgress, 100);
        return () => clearTimeout(timer);
    }, [isInView, progressSkills]);

    // Initialize AOS and loading state
    useEffect(() => {
        const initializeAOS = async () => {
            const AOS = await import('aos');
            AOS.default.init({
                duration: 800,
                once: true,
                offset: 100
            });
        };

        initializeAOS();

        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // Throttled scroll handler for progress bars
    useEffect(() => {
        if (!isInView) return;

        let animationFrameId;

        const handleScroll = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }

            animationFrameId = requestAnimationFrame(() => {
                const updated = {};
                progressSkills.forEach((skill) => {
                    const element = document.getElementById(skill.name);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        if (rect.top < window.innerHeight * 0.8) {
                            updated[skill.name] = skill.percentage;
                        }
                    }
                });
                setVisiblePercentages(prev => ({ ...prev, ...updated }));
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isInView, progressSkills]);

    const skeletonCategories = useMemo(() =>
        [...Array(4)].map((_, index) => (
            <SkillCategory key={index} loading={true} />
        ))
        , []);

    return (
        <div id="skills-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2
                data-aos="zoom-in"
                className="text-3xl md:text-4xl font-bold text-center text-white mb-12 drop-shadow-lg uppercase"
            >
                My Skills
            </h2>

            <Suspense fallback={
                <div className="space-y-12">
                    {skeletonCategories}
                </div>
            }>
                {loading ? (
                    <div className="space-y-12">
                        {skeletonCategories}
                    </div>
                ) : (
                    <div className="space-y-12">
                        {skillsData.map((category, index) => (
                            <SkillCategory
                                key={category.title}
                                category={category}
                                loading={false}
                            />
                        ))}
                    </div>
                )}
            </Suspense>

            <section
                className="my-16"
                data-aos="fade-up"
            >
                <h3 className="text-2xl font-bold text-white text-center mb-8">
                    Skill Proficiency
                </h3>
                <div className="max-w-2xl mx-auto">
                    {progressSkills.map((skill, index) => (
                        <SkillProgressBar
                            key={skill.name}
                            skill={skill}
                            visiblePercentage={visiblePercentages[skill.name] || 0}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default React.memo(Skills);