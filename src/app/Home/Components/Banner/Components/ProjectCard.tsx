'use client';

import { useState, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface TechStack {
    name: string;
    icon: string;
}

interface Project {
    title: string;
    description: string;
    detailedDescription: string;
    liveLink: string;
    frontendRepo: string;
    backendRepo: string | null;
    imageUrl: string;
    additionalImages: string[];
    techStack: TechStack[];
    features: string[];
}

interface ProjectCardProps {
    project: Project;
    loading: boolean;
    index: number;
    onViewDetails: (project: Project) => void;
}

const ProjectCard = memo(({ project, loading, index, onViewDetails }: ProjectCardProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isInView, setIsInView] = useState(false);

    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
    }, []);

    const handleImageError = useCallback(() => {
        setImageError(true);
    }, []);

    const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            setIsInView(true);
        }
    }, []);

    const cardRef = useCallback((node: HTMLDivElement | null) => {
        if (node) {
            const observer = new IntersectionObserver(handleIntersection, {
                threshold: 0.1,
                rootMargin: "-50px"
            });
            observer.observe(node);
            return () => observer.disconnect();
        }
    }, [handleIntersection]);

    if (loading) {
        return (
            <div className="group relative flex flex-col lg:flex-row bg-[#ffffff08] border border-purple-500/30 backdrop-blur-md shadow-2xl rounded overflow-hidden">
                <div className="lg:w-1/2 overflow-hidden">
                    <Skeleton className="h-64 w-full bg-gray-700" />
                </div>
                <div className="lg:w-1/2 p-6 flex flex-col justify-between">
                    <div>
                        <Skeleton className="h-7 w-40 mb-2 bg-gray-700" />
                        <div className="flex gap-2 py-4 flex-wrap">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} className="w-10 h-10 rounded-full bg-gray-700" />
                            ))}
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full bg-gray-700" />
                            <Skeleton className="h-4 w-full bg-gray-700" />
                            <Skeleton className="h-4 w-2/3 bg-gray-700" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 pt-6">
                        <Skeleton className="w-32 h-10 bg-gray-700" />
                        <Skeleton className="w-10 h-10 rounded-full bg-gray-700" />
                        <Skeleton className="w-10 h-10 rounded-full bg-gray-700" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={cardRef}
            className={`group relative flex flex-col lg:flex-row bg-[#ffffff08] border border-purple-500/30 backdrop-blur-md shadow-2xl rounded overflow-hidden transition-all duration-300 hover:shadow-purple-500/30 drop-shadow-lg hover:scale-[1.02] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            style={{ transitionDelay: isInView ? `${index * 100}ms` : '0ms' }}
        >
            {/* Image Section */}
            <div className="lg:w-1/2 overflow-hidden drop-shadow-lg relative">
                <div className="relative w-full h-64 lg:h-full">
                    {!imageLoaded && !imageError && (
                        <Skeleton className="h-full w-full bg-gray-700 absolute inset-0" />
                    )}
                    <Image
                        src={project.imageUrl}
                        alt={project.title}
                        width={600}
                        height={400}
                        loading="lazy"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        className={`w-full h-full object-cover transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                            } ${!imageError ? 'group-hover:scale-105' : ''
                            }`}
                    />
                </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 p-6 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold uppercase text-white drop-shadow-2xl mb-2">
                        {project.title}
                    </h3>

                    <div className="flex gap-2 py-4 flex-wrap">
                        {project.techStack.map((tech, i) => (
                            <Image
                                key={i}
                                src={tech.icon}
                                alt={tech.name}
                                width={32}
                                height={32}
                                loading="lazy"
                                className="w-8 h-8 object-contain rounded-full border border-purple-300 p-1 bg-white shadow transition-transform hover:scale-110"
                                title={tech.name}
                            />
                        ))}
                    </div>

                    <p className="text-gray-300 text-opacity-80 leading-relaxed">
                        {project.description}
                    </p>
                </div>

                <div className="flex items-center gap-4 pt-6">
                    <Button
                        onClick={() => onViewDetails(project)}
                        className="px-6 py-2 font-semibold rounded-lg transition bg-transparent hover:bg-transparent border-2 border-white backdrop-blur-xl shadow-lg hover:scale-105 text-white"
                    >
                        View Details
                    </Button>

                    <div className="flex items-center gap-3">
                        <Link href={project.frontendRepo} target="_blank" rel="noopener noreferrer">
                            <div className="w-10 h-10 flex items-center justify-center bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-600/50 shadow-lg hover:scale-110 hover:bg-gray-700/80 transition-all duration-300 group">
                                <Image
                                    src="https://i.ibb.co/5jCZwV7/github.webp"
                                    alt="GitHub Frontend"
                                    width={20}
                                    height={20}
                                    loading="lazy"
                                    className="w-5 h-5 filter brightness-0 invert group-hover:scale-110 transition-transform"
                                />
                            </div>
                        </Link>

                        {project.backendRepo && (
                            <Link href={project.backendRepo} target="_blank" rel="noopener noreferrer">
                                <div className="w-10 h-10 flex items-center justify-center bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-600/50 shadow-lg hover:scale-110 hover:bg-gray-700/80 transition-all duration-300 group">
                                    <Image
                                        src="https://i.ibb.co/5jCZwV7/github.webp"
                                        alt="GitHub Backend"
                                        width={20}
                                        height={20}
                                        loading="lazy"
                                        className="w-5 h-5 filter brightness-0 invert group-hover:scale-110 transition-transform"
                                    />
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;