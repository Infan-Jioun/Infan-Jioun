"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

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
        title: "Frontend Development",
        skills: [
            { name: "HTML 5", icon: "https://i.ibb.co/2tqj250/html.webp" },
            { name: "CSS", icon: "https://i.ibb.co/FKdDmVy/css.webp" },
            { name: "JavaScript", icon: "https://i.ibb.co/zRpT9jC/javascript.webp" },
            { name: "TypeScript", icon: "https://i.ibb.co/HL0sSj4C/typescript.webp" },
            { name: "React JS", icon: "https://i.ibb.co/gRXXrDs/react.webp" },
            { name: "Next JS", icon: "https://i.ibb.co/xtCck3wG/nextJs.webp" },
            { name: "Tailwind CSS", icon: "https://i.ibb.co/jJzXpx5/tailwind.webp" },
            { name: "Shadcn/ui", icon: "https://i.ibb.co/0R3TKXmx/shadcn.webp" },
            { name: "Redux Toolkit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
            { name: "Framer Motion", icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg" },
        ],
    },
    {
        title: "Backend & Database",
        skills: [
            { name: "Node.js", icon: "https://i.ibb.co/jVnm9XT/nodeJS.webp" },
            { name: "Express.js", icon: "https://i.ibb.co/ZYWHXHn/express-Js.webp" },
            { name: "Next.js (SSR)", icon: "https://i.ibb.co/xtCck3wG/nextJs.webp" },
            { name: "MongoDB", icon: "https://i.ibb.co/6v93hD0/mongoDB.webp" },
        ],
    },
    {
        title: "Tools & Platforms",
        skills: [
            { name: "Git", icon: "https://i.ibb.co/chkqwLD/git.webp" },
            { name: "GitHub", icon: "https://i.ibb.co/5jCZwV7/github.webp" },
            { name: "Firebase", icon: "https://i.ibb.co/GJwBw0r/firebase.webp" },
            { name: "VS Code", icon: "https://i.ibb.co/ncjrw8y/download-1-removebg-preview.png" },
            { name: "Notion", icon: "https://i.ibb.co/jMVL967/image-processing20210629-17620-1wabg7i.png" },
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
    { name: "Redux Toolkit", percentage: 80 },
];

const SkillCard = React.memo(({ skill }: { skill: Skill }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/40 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
                <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                    loading="lazy"
                />
            </div>
            <span className="text-sm font-medium text-card-foreground">{skill.name}</span>
        </CardContent>
    </Card>
));
SkillCard.displayName = "SkillCard";

const SkillCategorySection = React.memo(({ category }: { category: SkillCategory }) => (
    <Card className="border-border/40 bg-card/20 backdrop-blur-sm">
        <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-card-foreground flex items-center gap-2">
                <div className="w-2 h-6 bg-purple-500 rounded-full " />
                <p className="text-white">   {category.title}</p>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.skills.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                ))}
            </div>
        </CardContent>
    </Card>
));
SkillCategorySection.displayName = "SkillCategorySection";

const SkillProgressBar = React.memo(({ skill }: { skill: { name: string; percentage: number } }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-white">{skill.name}</span>
            <Badge variant="secondary" className="text-xs">
                {skill.percentage}%
            </Badge>
        </div>
        <Progress value={skill.percentage} className="h-2 bg-white" />
    </div>
));
SkillProgressBar.displayName = "SkillProgressBar";

const Skills: React.FC = () => {
    const skillsData = useMemo(() => SKILLS_DATA, []);
    const progressSkills = useMemo(() => PROGRESS_SKILLS, []);

    return (
        <section id="skills-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* Header */}
            <h2 className="text-2xl md:text-4xl font-bold text-center uppercase text-white drop-shadow-lg mb-8">
                Technologies
            </h2>

            {/* Skills Grid */}
            <div className="space-y-8 mb-20">
                {skillsData.map((category) => (
                    <SkillCategorySection key={category.title} category={category} />
                ))}
            </div>

            {/* Progress Section */}
            <Card className="border-border/40 bg-card/20 backdrop-blur-sm">
                <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl md:text-4xl font-bold text-center uppercase text-white drop-shadow-lg mb-8foreground">
                        Skill Proficiency
                    </CardTitle>
                    <p className="text-white">
                        My expertise level across different technologies
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-white">
                        <div className="space-y-6">
                            {progressSkills.slice(0, 5).map((skill) => (
                                <SkillProgressBar key={skill.name} skill={skill} />
                            ))}
                        </div>
                        <div className="space-y-6 ">
                            {progressSkills.slice(5).map((skill) => (
                                <SkillProgressBar key={skill.name} skill={skill} />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Summary Card */}
            <Card className="mt-12 border-primary/20 bg-primary/5 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2 text-white">
                        Always Learning, Always Growing
                    </h3>
                    <p className="text-white">
                        Always exploring new tools and tech to stay one step ahead in the dev game.
                    </p>
                </CardContent>
            </Card>
        </section>
    );
};

export default React.memo(Skills);