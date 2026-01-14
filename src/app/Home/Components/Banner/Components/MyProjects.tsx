'use client';

import { useEffect, useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import ProjectDetailModal from "./ProjectDetailModal";
import { PROJECTS_DATA } from "./projectsData";
import ProjectCard from "./ProjectCard";

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

    const ProjectSkeleton = useCallback(({ index }: { index: number }) => (
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image Skeleton */}
                    <div className="lg:w-2/5">
                        <Skeleton className="w-full h-64 rounded-2xl bg-white/20" />
                    </div>

                    {/* Content Skeleton */}
                    <div className="lg:w-3/5 space-y-4">
                        <Skeleton className="h-8 w-3/4 bg-white/20 rounded-lg" />
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full bg-white/20 rounded-full" />
                            <Skeleton className="h-4 w-11/12 bg-white/20 rounded-full" />
                            <Skeleton className="h-4 w-4/5 bg-white/20 rounded-full" />
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} className="h-6 w-16 bg-white/20 rounded-full" />
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-3 pt-4">
                            <Skeleton className="h-10 w-28 bg-white/20 rounded-xl" />
                            <Skeleton className="h-10 w-32 bg-white/20 rounded-xl" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    ), []);

    return (
        <section className="py-20 bg-transparent" id="projects-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold text-center uppercase text-white drop-shadow-lg mb-8">
                        My Projects
                    </h2>
                    <p className="text-xl text-white max-w-2xl mx-auto">
                        Explore my latest work and creative solutions
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="space-y-8">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <ProjectSkeleton key={`skeleton-${index}`} index={index} />
                        ))
                    ) : (
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

                {/* Load More Button */}
                {loading ? (
                    <div className="text-center mt-12">
                        <Skeleton className="h-12 w-48 mx-auto bg-white/20 rounded-xl" />
                    </div>
                ) : (
                    hasMoreProjects && (
                        <div className="text-center mt-12">
                            <Button
                                onClick={loadMore}
                                className="px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 hover:scale-105 hover:shadow-2xl"
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
        </section>
    );
};

export default MyProjects;