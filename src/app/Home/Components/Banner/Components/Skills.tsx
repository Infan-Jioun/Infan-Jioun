"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
interface Skill {
    name: string;
    icon: string;
}

interface SkillCategory {
    title: string;
    skills: Skill[];
}

const SKILLS_DATA: SkillCategory[] = [
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
            { name: "FRAMER MOTION", icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg" },
            { name: "TANSTACK", icon: "https://i.ibb.co/pvXrXCPX/splash-light-CHq-Msyq8.png" },
            { name: "AXIOS", icon: "https://axios-http.com/assets/logo.svg" },
            { name: "REACT HOOK FORM", icon: "https://react-hook-form.com/images/logo/react-hook-form-logo-only.png" },
        ],
    },
    {
        title: "Backend",
        skills: [
            { name: "NODE.JS", icon: "https://i.ibb.co.com/jVnm9XT/nodeJS.webp" },
            { name: "EXPRESS.JS", icon: "https://i.ibb.co.com/ZYWHXHn/express-Js.webp" },
            { name: "NEXT JS (SSR)", icon: "https://i.ibb.co.com/xtCck3wG/nextJs.webp" },
        ],
    },
    {
        title: "Database",
        skills: [{ name: "MONGODB", icon: "https://i.ibb.co.com/6v93hD0/mongoDB.webp" }],
    },
    {
        title: "Tools",
        skills: [
            { name: "GIT", icon: "https://i.ibb.co.com/chkqwLD/git.webp" },
            { name: "GITHUB", icon: "https://i.ibb.co.com/5jCZwV7/github.webp" },
            { name: "FIREBASE", icon: "https://i.ibb.co.com/GJwBw0r/firebase.webp" },
            { name: "VS CODE", icon: "https://i.ibb.co.com/ncjrw8y/download-1-removebg-preview.png" },
            { name: "NOTION", icon: "https://i.ibb.co.com/jMVL967/image-processing20210629-17620-1wabg7i.png" },
        ],
    },
];

const PROGRESS_SKILLS = [
    { name: "HTML", percentage: 90 },
    { name: "CSS", percentage: 90 },
    { name: "JavaScript", percentage: 80 },
    { name: "TypeScript", percentage: 60 },
    { name: "React JS", percentage: 80 },
    { name: "Next JS", percentage: 60 },
    { name: "Node JS", percentage: 90 },
    { name: "MongoDB", percentage: 65 },
    { name: "Tailwind", percentage: 96 },
    { name: "Redux-Toolkit", percentage: 80 },
];


const SkillCategory = React.memo(({ category }: { category: SkillCategory }) => {
    const [loaded, setLoaded] = useState<Record<string, boolean>>({});

    const handleLoad = useCallback((name: string) => {
        setLoaded((prev) => ({ ...prev, [name]: true }));
    }, []);

    return (
        <div className="mb-12">
            <h3 className="text-xl font-semibold text-white mb-6">{category.title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.skills.map((skill) => (
                    <div
                        key={skill.name}
                        className="p-4 rounded-xl border border-gray-700 bg-gray-900 backdrop-blur shadow-lg text-center transition-transform hover:scale-105"
                    >
                        <div className="relative w-12 h-12 mx-auto mb-3">
                            {!loaded[skill.name] && (
                                <div className="absolute inset-0 bg-gray-700 rounded-full animate-pulse" />
                            )}
                            <img
                                src={skill.icon}
                                alt={skill.name}
                                loading="lazy"
                                onLoad={() => handleLoad(skill.name)}
                                className={`w-12 h-12 mx-auto object-contain transition-opacity duration-500 ${loaded[skill.name] ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                        </div>
                        <p className="text-sm text-white font-medium">{skill.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
});
SkillCategory.displayName = "SkillCategory";
interface SkillProgressBarProps {
    name: string;
    percentage: number;
    visible: number;
}

const SkillProgressBar = React.memo(
    ({ name, percentage, visible }: SkillProgressBarProps) => {
        return (
            <div className="w-full mb-5">
                <div className="flex justify-between text-white text-sm mb-1">
                    <span>{name}</span>
                    <span>{visible}%</span>
                </div>
                <Progress value={visible} className="h-2 bg-white" />
            </div>
        );
    }
);
SkillProgressBar.displayName = "SkillProgressBar";

const Skills: React.FC = () => {
    const [visible, setVisible] = useState<Record<string, number>>({});
    const skillsData = useMemo(() => SKILLS_DATA, []);
    const progressSkills = useMemo(() => PROGRESS_SKILLS, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            const updated: Record<string, number> = {};
            progressSkills.forEach((skill) => {
                updated[skill.name] = skill.percentage;
            });
            setVisible(updated);
        }, 400);

        return () => clearTimeout(timer);
    }, [progressSkills]);

    return (
        <section
            id="skills-section"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 uppercase">
                My Skills
            </h2>

            <div className="space-y-12">
                {skillsData.map((category) => (
                    <SkillCategory key={category.title} category={category} />
                ))}
            </div>

            <div className="my-16">
                <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 uppercase">
                    Skill Proficiency
                </h3>
                <Card className="max-w-2xl mx-auto bg-gray-900/40 backdrop-blur border border-gray-700 p-6">
                    <CardContent>
                        {progressSkills.map((skill) => (
                            <SkillProgressBar
                                key={skill.name}
                                name={skill.name}
                                percentage={skill.percentage}
                                visible={visible[skill.name] || 0}
                            />
                        ))}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default React.memo(Skills);
