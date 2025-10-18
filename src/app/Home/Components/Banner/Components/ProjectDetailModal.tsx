'use client';

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
    const [imagesLoaded, setImagesLoaded] = useState<{ [key: number]: boolean }>({});

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

    const handleImageLoad = useCallback((index: number) => {
        setImagesLoaded(prev => ({ ...prev, [index]: true }));
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'Escape') {
            onClose();
        }
    }, [nextImage, prevImage, onClose]);

    // Auto-slide functionality
    useEffect(() => {
        let slideInterval: NodeJS.Timeout;

        if (isOpen && project.additionalImages.length > 1) {
            slideInterval = setInterval(() => {
                nextImage();
            }, 5000); // Change image every 5 seconds
        }

        return () => {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        };
    }, [isOpen, project.additionalImages.length, nextImage]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);

            // Preload all images when modal opens
            project.additionalImages.forEach((src, index) => {
                const img = new window.Image();
                img.src = src;
                img.onload = () => handleImageLoad(index);
                img.onerror = () => console.warn(`Failed to load image: ${src}`);
            });
        } else {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleKeyDown);
            setCurrentImageIndex(0); // Reset to first image when closing
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown, project.additionalImages, handleImageLoad]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-[#1a1a2e] border border-purple-500/30 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-purple-500/30">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-purple-300 text-2xl transition-colors duration-200 p-1"
                    >
                        ×
                    </button>
                </div>

                {/* Image Slider */}
                <div className="relative h-64 md:h-80 bg-gray-800 overflow-hidden">
                    <div className="relative w-full h-full">
                        <Image
                            src={project.additionalImages[currentImageIndex]}
                            alt={`${project.title} - Image ${currentImageIndex + 1}`}
                            width={800}
                            height={400}
                            className="w-full h-full object-cover transition-opacity duration-300"
                            onLoadingComplete={() => handleImageLoad(currentImageIndex)}
                            priority={currentImageIndex === 0}
                        />
                    </div>

                    {/* Loading skeleton for images */}
                    {!imagesLoaded[currentImageIndex] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                        </div>
                    )}

                    {project.additionalImages.length > 1 && (
                        <>
                            {/* Navigation Buttons */}
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-10"
                                aria-label="Previous image"
                            >
                                ‹
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 z-10"
                                aria-label="Next image"
                            >
                                ›
                            </button>

                            {/* Image Indicators */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
                                {project.additionalImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToImage(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentImageIndex
                                                ? 'bg-white scale-125'
                                                : 'bg-gray-400 hover:bg-gray-300'
                                            }`}
                                        aria-label={`Go to image ${index + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Image Counter */}
                            <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm z-10">
                                {currentImageIndex + 1} / {project.additionalImages.length}
                            </div>

                            {/* Auto-slide Progress Bar */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gray-600 z-10">
                                <div
                                    className="h-full bg-purple-500 transition-all duration-1000 ease-linear"
                                    style={{
                                        width: `${(currentImageIndex / (project.additionalImages.length - 1)) * 100}%`
                                    }}
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Description */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Project Description</h4>
                        <p className="text-gray-300 leading-relaxed">{project.detailedDescription}</p>
                    </div>

                    {/* Features */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Key Features</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {project.features.map((feature, index) => (
                                <li key={index} className="flex items-center text-gray-300">
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0"></span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Technology Stack */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Technology Stack</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {project.techStack.map((tech, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-3 p-3 bg-[#ffffff08] rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-200"
                                >
                                    <Image
                                        src={tech.icon}
                                        alt={tech.name}
                                        width={32}
                                        height={32}
                                        className="w-8 h-8 object-contain rounded flex-shrink-0"
                                        loading="lazy"
                                    />
                                    <span className="text-white text-sm font-medium">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Code Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Source Code</h4>
                        <div className="flex flex-wrap gap-4">
                            <Link href={project.frontendRepo} target="_blank" rel="noopener noreferrer">
                                <Button className="px-6 py-2 font-semibold rounded-lg transition bg-purple-600 hover:bg-purple-700 border-2 border-purple-600 backdrop-blur-xl shadow-lg hover:scale-105">
                                    Frontend Code
                                </Button>
                            </Link>

                            {project.backendRepo && (
                                <Link href={project.backendRepo} target="_blank" rel="noopener noreferrer">
                                    <Button className="px-6 py-2 font-semibold rounded-lg transition bg-blue-600 hover:bg-blue-700 border-2 border-blue-600 backdrop-blur-xl shadow-lg hover:scale-105">
                                        Backend Code
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-purple-500/30">
                        <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            <Button className="px-6 py-2 font-semibold rounded-lg transition bg-green-600 hover:bg-green-700 border-2 border-green-600 backdrop-blur-xl shadow-lg hover:scale-105">
                                Live Demo
                            </Button>
                        </Link>

                        <Button
                            onClick={onClose}
                            className="px-6 py-2 font-semibold rounded-lg transition bg-gray-600 hover:bg-gray-700 border-2 border-gray-600 backdrop-blur-xl shadow-lg hover:scale-105"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
});

ProjectDetailModal.displayName = 'ProjectDetailModal';

export default ProjectDetailModal;