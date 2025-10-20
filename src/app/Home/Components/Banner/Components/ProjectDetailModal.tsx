'use client';

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface ProjectDetailModalProps {
    project: Project;
    isOpen: boolean;
    onClose: () => void;
}

const ProjectDetailModal = memo(({ project, isOpen, onClose }: ProjectDetailModalProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = useCallback(() => {
        setCurrentImageIndex(prev =>
            prev === project.additionalImages.length - 1 ? 0 : prev + 1
        );
    }, [project.additionalImages.length]);

    const prevImage = useCallback(() => {
        setCurrentImageIndex(prev =>
            prev === 0 ? project.additionalImages.length - 1 : prev - 1
        );
    }, [project.additionalImages.length]);

    const goToImage = useCallback((index: number) => {
        setCurrentImageIndex(index);
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') prevImage();
        else if (e.key === 'ArrowRight') nextImage();
        else if (e.key === 'Escape') onClose();
    }, [nextImage, prevImage, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleKeyDown);
            setCurrentImageIndex(0);
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4">
            <Card className="bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white animate-gradient shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between border-b border-white/20 pb-4">
                    <CardTitle className="text-2xl font-bold text-white">{project.title}</CardTitle>
                    <Button
                        onClick={onClose}
                        variant="ghost"
                        className="text-white hover:text-red-400 hover:bg-white/10 rounded-xl p-2"
                    >
                        ✕
                    </Button>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                    {/* Image Gallery */}
                    <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                        <div className="relative h-64 md:h-80">
                            <Image
                                src={project.additionalImages[currentImageIndex]}
                                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                                width={800}
                                height={400}
                                className="w-full h-full object-cover"
                                priority
                            />

                            {project.additionalImages.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-xl transition-all duration-200 hover:scale-110"
                                    >
                                        ‹
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-xl transition-all duration-200 hover:scale-110"
                                    >
                                        ›
                                    </button>

                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                        {project.additionalImages.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => goToImage(index)}
                                                className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentImageIndex
                                                    ? 'bg-white scale-125'
                                                    : 'bg-white/50 hover:bg-white/70'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                        {currentImageIndex + 1} / {project.additionalImages.length}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                        <CardContent className="p-6">
                            <h4 className="text-lg font-semibold text-white mb-3">Project Overview</h4>
                            <p className="text-white leading-relaxed">{project.detailedDescription}</p>
                        </CardContent>
                    </Card>

                    {/* Features */}
                    <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                        <CardContent className="p-6">
                            <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {project.features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3 text-white">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Technology Stack */}
                    <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                        <CardContent className="p-6">
                            <h4 className="text-lg font-semibold text-white mb-4">Technology Stack</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {project.techStack.map((tech, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-3 p-3 bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-colors duration-200"
                                    >
                                        <Image
                                            src={tech.icon}
                                            alt={tech.name}
                                            width={32}
                                            height={32}
                                            className="w-8 h-8 object-contain rounded-lg"
                                        />
                                        <span className="text-white text-sm font-medium">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-white/20">
                        <Link href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[200px]">
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 border-0">
                                Live Demo
                            </Button>
                        </Link>
                        <Link href={project.frontendRepo} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[200px]">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 border-0">
                                Frontend Code
                            </Button>
                        </Link>
                        {project.backendRepo && (
                            <Link href={project.backendRepo} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[200px]">
                                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 border-0">
                                    Backend Code
                                </Button>
                            </Link>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
});

ProjectDetailModal.displayName = 'ProjectDetailModal';

export default ProjectDetailModal;