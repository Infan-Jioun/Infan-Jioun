"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { HiSparkles } from "react-icons/hi2";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiShadcnui,
  SiRedux,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiDocker,
  SiVercel,
  SiFirebase,
  SiPostman,
} from "react-icons/si";
import { TbApi, TbLockCheck } from "react-icons/tb";

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface SkillCategory {
  title: string;
  subtitle: string;
  accent: "purple" | "indigo" | "emerald" | "rose";
  skills: Skill[];
}

const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Frontend",
    subtitle: "Interfaces people actually touch and love",
    accent: "purple",
    skills: [
      { name: "HTML5", icon: <SiHtml5 />, color: "text-orange-500" },
      { name: "CSS3", icon: <SiCss3 />, color: "text-blue-500" },
      { name: "JavaScript", icon: <SiJavascript />, color: "text-yellow-400" },
      { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-400" },
      { name: "React", icon: <SiReact />, color: "text-cyan-400" },
      { name: "Next.js", icon: <SiNextdotjs />, color: "text-white" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-sky-400" },
      { name: "Shadcn/ui", icon: <SiShadcnui />, color: "text-slate-200" },
      { name: "Redux Toolkit", icon: <SiRedux />, color: "text-purple-400" },
      { name: "Framer Motion", icon: <SiFramer />, color: "text-pink-400" },
    ],
  },
  {
    title: "Backend",
    subtitle: "Logic, data, and resilient system architecture",
    accent: "indigo",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs />, color: "text-emerald-500" },
      { name: "Express.js", icon: <SiExpress />, color: "text-slate-300" },
      { name: "Prisma ORM", icon: <SiPrisma />, color: "text-indigo-300" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-sky-400" },
      { name: "MongoDB", icon: <SiMongodb />, color: "text-emerald-400" },
      { name: "Next.js (SSR)", icon: <SiNextdotjs />, color: "text-slate-100" },
      { name: "REST APIs", icon: <TbApi />, color: "text-orange-400" },
    ],
  },
  {
    title: "DevOps & Tools",
    subtitle: "Shipping fast, monitoring, and automated deployment",
    accent: "emerald",
    skills: [
      { name: "Git", icon: <SiGit />, color: "text-orange-500" },
      { name: "GitHub", icon: <SiGithub />, color: "text-slate-200" },
      { name: "GitHub Actions", icon: <SiGithubactions />, color: "text-blue-400" },
      { name: "Docker", icon: <SiDocker />, color: "text-sky-400" },
      { name: "Vercel", icon: <SiVercel />, color: "text-white" },
      { name: "Firebase", icon: <SiFirebase />, color: "text-amber-400" },
      { name: "Postman", icon: <SiPostman />, color: "text-orange-400" },
    ],
  },
  {
    title: "Full Stack Architecture",
    subtitle: "Where robust backend meets fluid user interaction",
    accent: "rose",
    skills: [
      { name: "Next.js", icon: <SiNextdotjs />, color: "text-white" },
      { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-400" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-sky-400" },
      { name: "Prisma", icon: <SiPrisma />, color: "text-indigo-300" },
      { name: "Auth.js", icon: <TbLockCheck />, color: "text-emerald-400" },
      { name: "tRPC / REST", icon: <TbApi />, color: "text-rose-400" },
    ],
  },
];

const ACCENT_STYLES: Record<
  string,
  { border: string; hoverShadow: string; text: string; dot: string; overlay: string }
> = {
  purple: {
    border: "border-purple-500/40 hover:border-purple-400",
    hoverShadow: "hover:shadow-[4px_4px_0px_0px_#a855f7]",
    text: "group-hover:text-purple-300",
    dot: "bg-purple-400 shadow-[0_0_10px_#a855f7]",
    overlay: "from-purple-500 via-indigo-500 to-cyan-500",
  },
  indigo: {
    border: "border-indigo-500/40 hover:border-indigo-400",
    hoverShadow: "hover:shadow-[4px_4px_0px_0px_#6366f1]",
    text: "group-hover:text-indigo-300",
    dot: "bg-indigo-400 shadow-[0_0_10px_#6366f1]",
    overlay: "from-indigo-500 via-purple-500 to-cyan-500",
  },
  emerald: {
    border: "border-emerald-500/40 hover:border-emerald-400",
    hoverShadow: "hover:shadow-[4px_4px_0px_0px_#10b981]",
    text: "group-hover:text-emerald-300",
    dot: "bg-emerald-400 shadow-[0_0_10px_#10b981]",
    overlay: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  rose: {
    border: "border-rose-500/40 hover:border-rose-400",
    hoverShadow: "hover:shadow-[4px_4px_0px_0px_#f43f5e]",
    text: "group-hover:text-rose-300",
    dot: "bg-rose-400 shadow-[0_0_10px_#f43f5e]",
    overlay: "from-rose-500 via-purple-500 to-indigo-500",
  },
};

// 3D Sharp Interactive Skill Badge
const SkillBox = React.memo(({ skill, accent }: { skill: Skill; accent: string }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const a = ACCENT_STYLES[accent];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const box = boxRef.current;
    const glow = glowRef.current;
    if (!box) return;

    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    gsap.to(box, {
      rotateX: ((y - centerY) / centerY) * -10,
      rotateY: ((x - centerX) / centerX) * 10,
      scale: 1.03,
      duration: 0.2,
      ease: "power2.out",
      transformPerspective: 600,
    });

    if (glow) {
      gsap.to(glow, {
        x: x - rect.width / 2,
        y: y - rect.height / 2,
        opacity: 0.4,
        duration: 0.2,
        ease: "power1.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (boxRef.current) {
      gsap.to(boxRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.2 });
    }
  };

  return (
    <div className="perspective-1000 inline-block">
      <div
        ref={boxRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d" }}
        className={`group relative overflow-hidden rounded-none border-2 bg-slate-950/80 backdrop-blur-md px-4 py-2.5 cursor-pointer shadow-[3px_3px_0px_0px_#0f172a] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 ${a.border} ${a.hoverShadow}`}
      >
        {/* Mouse Tracking Neon Glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute w-20 h-20 bg-cyan-400 rounded-none blur-xl opacity-0 -translate-x-1/2 -translate-y-1/2"
        />

        <div className="relative z-10 flex items-center gap-2.5 whitespace-nowrap">
          <span className={`text-lg sm:text-xl shrink-0 transition-transform duration-200 group-hover:scale-110 ${skill.color}`}>
            {skill.icon}
          </span>
          <span className={`text-xs sm:text-sm font-black tracking-wider uppercase text-slate-200 transition-colors duration-200 ${a.text}`}>
            {skill.name}
          </span>
        </div>
      </div>
    </div>
  );
});
SkillBox.displayName = "SkillBox";

// 3D Sharp Category Section Card
const SkillCategorySection = React.memo(({ category }: { category: SkillCategory }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const a = ACCENT_STYLES[category.accent];

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".perspective-1000"),
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      className="group relative overflow-hidden rounded-none border-2 border-indigo-500/40 bg-slate-900/90 backdrop-blur-xl shadow-[6px_6px_0px_0px_#4f46e5] hover:shadow-[8px_8px_0px_0px_#6366f1] transition-all duration-300"
    >
      {/* Top Accent Gradient Line */}
      <div className={`h-[2px] w-full bg-gradient-to-r ${a.overlay} shadow-[0_0_10px_#6366f1]`} />

      {/* Card Header */}
      <div className="p-5 sm:p-6 pb-3 relative z-10 space-y-1">
        <div className="flex items-center gap-3">
          {/* Sharp Diamond Accent Indicator */}
          <div className={`w-2.5 h-2.5 rotate-45 rounded-none ${a.dot}`} />
          <h3 className="text-lg sm:text-xl font-black uppercase tracking-widest text-white">
            {category.title}
          </h3>
        </div>
        <p className="pl-5 text-xs sm:text-sm text-slate-300 font-medium">{category.subtitle}</p>
      </div>

      {/* Card Content - Skill Badges Grid */}
      <div className="p-5 sm:p-6 pt-2 relative z-10">
        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {category.skills.map((skill) => (
            <SkillBox key={skill.name} skill={skill} accent={category.accent} />
          ))}
        </div>
      </div>
    </div>
  );
});
SkillCategorySection.displayName = "SkillCategorySection";

const Skills: React.FC = () => {
  const skillsData = useMemo(() => SKILLS_DATA, []);

  return (
    <section
      id="skills"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 z-10 isolate block clear-both"
    >
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16 relative z-10 block space-y-3">
        {/* Cyber Header Badge */}
        <div className="inline-flex items-center gap-2 bg-slate-950 border-2 border-purple-500/50 shadow-[3px_3px_0px_0px_#a855f7] px-4 py-1.5 rounded-none text-purple-300 text-xs font-black tracking-widest uppercase">
          <HiSparkles className="text-sm text-cyan-400 animate-pulse" /> MY TECH STACK
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
          TECHNOLOGIES I <span className="text-cyan-400">WORK WITH</span>
        </h2>
        <p className="text-slate-300 text-center text-xs sm:text-sm max-w-xl mx-auto font-medium leading-relaxed">
          Frontend, backend, DevOps, and microservices — every tool chosen with purpose for maximum performance.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 relative z-10">
        {skillsData.map((category) => (
          <SkillCategorySection key={category.title} category={category} />
        ))}
      </div>

      {/* Bottom Summary Card */}
      <div className="relative overflow-hidden rounded-none border-2 border-purple-500/50 bg-slate-900/90 backdrop-blur-xl shadow-[6px_6px_0px_0px_#a855f7] p-6 text-center z-10">
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-500" />
        <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-white mb-1">
          ALWAYS LEARNING, ALWAYS <span className="text-cyan-400">GROWING</span>
        </h3>
        <p className="text-slate-300 max-w-xl mx-auto text-xs sm:text-sm font-medium">
          Constantly exploring modern frameworks, performance optimization, and scalable cloud architectures.
        </p>
      </div>
    </section>
  );
};

export default React.memo(Skills);