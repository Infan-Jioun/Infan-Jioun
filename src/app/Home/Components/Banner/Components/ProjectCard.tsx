'use client';
import { useState, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    frontendRepo?: string | null;
    backendRepo?: string | null;
    imageUrl: string;
    additionalImages: string[];
    techStack: Array<{ name: string; icon: string }>;
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

    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
        setImageError(false);
    }, []);

    const handleImageError = useCallback(() => {
        setImageError(true);
    }, []);

    if (loading) {
        return (
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
                <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:w-2/5">
                            <Skeleton className="w-full h-64 rounded-2xl bg-white/20" />
                        </div>
                        <div className="lg:w-3/5 flex flex-col justify-between">
                            <div className="space-y-4">
                                <div>
                                    <Skeleton className="h-8 w-3/4 bg-white/20 rounded-lg" />
                                    <div className="pt-2 space-y-3">
                                        <Skeleton className="h-4 w-full bg-white/20 rounded-full" />
                                        <Skeleton className="h-4 w-11/12 bg-white/20 rounded-full" />
                                        <Skeleton className="h-4 w-4/5 bg-white/20 rounded-full" />
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Skeleton key={i} className="h-10 w-20 bg-white/20 rounded-lg" />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 pt-6">
                                <Skeleton className="h-10 w-28 bg-white/20 rounded-full" />
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-10 w-10 bg-white/20 rounded-xl" />
                                    <Skeleton className="h-10 w-10 bg-white/20 rounded-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
            <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image Section */}
                    <div className="lg:w-2/5">
                        <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-white/5">
                            {!imageLoaded && !imageError && (
                                <Skeleton className="absolute inset-0 h-full w-full bg-white/20" />
                            )}
                            <Image
                                src={project.imageUrl || "/placeholder.jpg"}
                                alt={project.title}
                                fill
                                unoptimized // স্ট্যাটিক এক্সপোর্টের এরর ফিক্স করার জন্য এটি যুক্ত করা হয়েছে
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                className={`object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                onLoadingComplete={handleImageLoad}
                                onError={handleImageError}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-3/5 flex flex-col justify-between">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2 transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-white/80 leading-relaxed text-sm md:text-base">
                                    {project.description}
                                </p>
                            </div>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg border border-white/10 backdrop-blur-sm"
                                    >
                                        <img
                                            src={tech.icon}
                                            alt={tech.name}
                                            width={20}
                                            height={20}
                                            loading="lazy"
                                            className="w-5 h-5 object-contain"
                                        />
                                        <span className="text-white text-sm font-medium">
                                            {tech.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-4 pt-6">
                            <Button
                                onClick={() => onViewDetails(project)}
                                className="gap-2 border-2 border-white rounded-full px-6 py-2 bg-transparent text-white text-sm font-semibold transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
                            >
                                View Details
                            </Button>

                            <div className="flex items-center gap-3">
                                {/* Frontend Link with Fallback Check */}
                                {project?.frontendRepo && (
                                    <Link href={project.frontendRepo} target="_blank" rel="noopener noreferrer">
                                        <div className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:scale-110 hover:bg-white/20 transition-all duration-300">
                                            <img
                                                src="https://i.ibb.co.com/5jCZwV7/github.webp"
                                                alt="GitHub Frontend"
                                                className="w-5 h-5 filter brightness-0 invert"
                                            />
                                        </div>
                                    </Link>
                                )}

                                {/* Backend Link with Null Check */}
                                {project?.backendRepo && (
                                    <Link href={project.backendRepo} target="_blank" rel="noopener noreferrer">
                                        <div className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:scale-110 hover:bg-white/20 transition-all duration-300">
                                            <img
                                                src="https://i.ibb.co.com/5jCZwV7/github.webp"
                                                alt="GitHub Backend"
                                                className="w-5 h-5 filter brightness-0 invert"
                                            />
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
});

ProjectCard.displayName = 'ProjectCard';
export default ProjectCard;