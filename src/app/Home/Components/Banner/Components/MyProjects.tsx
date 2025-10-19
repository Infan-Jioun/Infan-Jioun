'use client';

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectDetailModal from "./ProjectDetailModal";
import { PROJECTS_DATA } from "./projectsData";
import ProjectCard from "./ProjectCard";

interface Project {
    title: string;
    description: string;
    detailedDescription: string;
    liveLink: string;
    frontendRepo: string;
    backendRepo: string | null;
    imageUrl: string;
    additionalImages: string[];
    techStack: Array<{ name: string; icon: string }>;
    features: string[];
}

const MyProjects = () => {
    const [loading, setLoading] = useState(true);
    const [visibleProjects, setVisibleProjects] = useState(3);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const projects = useMemo(() => PROJECTS_DATA, []);
    const displayedProjects = useMemo(() =>
        projects.slice(0, visibleProjects),
        [projects, visibleProjects]
    );

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const loadMore = useCallback(() => {
        setVisibleProjects(prev => Math.min(prev + 2, projects.length));
    }, [projects.length]);

    const handleViewDetails = useCallback((project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedProject(null);
    }, []);

    const hasMoreProjects = visibleProjects < projects.length;

    // Skeleton Loader Component
    const ProjectSkeleton = useCallback(({ index }: { index: number }) => (
        <div
            className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-2xl transition-all duration-500 hover:shadow-purple-500/20"
            style={{
                animationDelay: `${index * 150}ms`
            }}
        >
            <div className="flex flex-col md:flex-row gap-6">
                {/* Image Skeleton */}
                <div className="md:w-2/5">
                    <Skeleton className="w-full h-64 md:h-72 rounded-xl bg-gradient-to-r from-gray-700/40 via-gray-600/50 to-gray-700/40 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                    </Skeleton>
                </div>

                {/* Content Skeleton */}
                <div className="md:w-3/5 space-y-4">
                    {/* Title Skeleton */}
                    <Skeleton className="h-8 w-3/4 bg-gradient-to-r from-gray-600/50 to-gray-700/50 rounded-lg">
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer" />
                    </Skeleton>

                    {/* Description Skeletons */}
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-full bg-gradient-to-r from-gray-600/40 to-gray-700/40 rounded-full" />
                        <Skeleton className="h-4 w-11/12 bg-gradient-to-r from-gray-600/40 to-gray-700/40 rounded-full" />
                        <Skeleton className="h-4 w-4/5 bg-gradient-to-r from-gray-600/40 to-gray-700/40 rounded-full" />
                    </div>

                    {/* Tech Stack Skeletons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton
                                key={i}
                                className="h-6 w-16 bg-gradient-to-r from-gray-600/30 to-gray-700/30 rounded-full"
                            />
                        ))}
                    </div>

                    {/* Button Skeletons */}
                    <div className="flex flex-wrap gap-3 pt-4">
                        <Skeleton className="h-10 w-28 bg-gradient-to-r from-gray-600/40 to-gray-700/40 rounded-lg" />
                        <Skeleton className="h-10 w-32 bg-gradient-to-r from-gray-600/40 to-gray-700/40 rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    ), []);

    return (
        <div className="py-12 max-w-7xl mx-auto">
            <h2 className="text-3xl mt-7 md:text-4xl uppercase font-bold text-center mb-10 drop-shadow-2xl text-white">
                My PROJECTS
            </h2>

            <div className="mx-auto px-6 md:px-16 py-10 grid gap-8 drop-shadow-2xl">
                {loading ? (
                    // Show skeleton loaders while loading
                    Array.from({ length: 3 }).map((_, index) => (
                        <ProjectSkeleton key={`skeleton-${index}`} index={index} />
                    ))
                ) : (
                    // Show actual project cards
                    displayedProjects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            loading={false}
                            index={index}
                            onViewDetails={handleViewDetails}
                        />
                    ))
                )}
            </div>

            {/* Load More Button - Show skeleton if loading, actual button if not */}
            {loading ? (
                <div className="text-center mt-8">
                    <Skeleton className="h-12 w-48 mx-auto bg-gradient-to-r from-gray-600/40 to-gray-700/40 rounded-lg">
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                    </Skeleton>
                </div>
            ) : (
                hasMoreProjects && (
                    <div className="text-center mt-8">
                        <Button
                            onClick={loadMore}
                            className="px-8 py-3 font-semibold rounded-lg transition bg-transparent hover:bg-transparent border-2 border-white backdrop-blur-xl shadow-lg hover:scale-105 text-white"
                        >
                            Load More Projects
                        </Button>
                    </div>
                )
            )}

            {/* Project Detail Modal */}
            {selectedProject && (
                <ProjectDetailModal
                    project={selectedProject}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default MyProjects;