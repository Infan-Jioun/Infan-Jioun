'use client';

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pause, Play, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [autoPlayInterval] = useState(4000);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const nextImage = useCallback(() => {
        setCurrentImageIndex(prev =>
            prev === project.additionalImages.length - 1 ? 0 : prev + 1
        );
        setImageLoaded(false);
    }, [project.additionalImages.length]);

    const prevImage = useCallback(() => {
        setCurrentImageIndex(prev =>
            prev === 0 ? project.additionalImages.length - 1 : prev - 1
        );
        setImageLoaded(false);
    }, [project.additionalImages.length]);

    const goToImage = useCallback((index: number) => {
        setCurrentImageIndex(index);
        setImageLoaded(false);
    }, []);

    const toggleAutoPlay = useCallback(() => {
        setIsAutoPlaying(prev => !prev);
    }, []);

    const toggleFullscreen = useCallback(() => {
        setIsFullscreen(prev => !prev);
    }, []);

    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') prevImage();
        else if (e.key === 'ArrowRight') nextImage();
        else if (e.key === 'Escape') {
            if (isFullscreen) {
                setIsFullscreen(false);
            } else {
                onClose();
            }
        }
        else if (e.key === ' ') {
            e.preventDefault();
            toggleAutoPlay();
        }
        else if (e.key === 'f' || e.key === 'F') {
            e.preventDefault();
            toggleFullscreen();
        }
    }, [nextImage, prevImage, onClose, toggleAutoPlay, toggleFullscreen, isFullscreen]);

    // Auto-play functionality
    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isAutoPlaying && isOpen && project.additionalImages.length > 1 && !isFullscreen) {
            intervalId = setInterval(() => {
                nextImage();
            }, autoPlayInterval);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isAutoPlaying, isOpen, nextImage, project.additionalImages.length, autoPlayInterval, isFullscreen]);

    // Event listeners and body overflow management
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleKeyDown);
            setCurrentImageIndex(0);
            setIsAutoPlaying(true);
            setIsFullscreen(false);
            setImageLoaded(false);
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };

    if (!isOpen) return null;

    // Fullscreen Image Viewer
    if (isFullscreen) {
        return (
            <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentImageIndex}
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                       
                        >
                            <img
                                src={project.additionalImages[currentImageIndex]}
                                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                                width={1200}
                                height={800}
                                className="max-w-full max-h-full object-contain"
                                
                                onLoad={handleImageLoad}
                            />
                            {!imageLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                                    <div className="animate-pulse text-white">Loading...</div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Close Fullscreen Button */}
                    <button
                        onClick={toggleFullscreen}
                        className="absolute top-4 right-4 bg-black/60 text-white p-3 rounded-full hover:bg-black/80 transition-all z-10"
                    >
                        <X size={24} />
                    </button>

                    {/* Navigation Arrows */}
                    {project.additionalImages.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-4 rounded-full hover:bg-black/80 transition-all z-10"
                            >
                                <ChevronLeft size={28} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 text-white p-4 rounded-full hover:bg-black/80 transition-all z-10"
                            >
                                <ChevronRight size={28} />
                            </button>
                        </>
                    )}

                    {/* Image Counter */}
                    {project.additionalImages.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-lg">
                            {currentImageIndex + 1} / {project.additionalImages.length}
                        </div>
                    )}
                </div>
            </div>
        );
    }

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
                        <X size={20} />
                    </Button>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                    {/* Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
              
                    >
                        <div className="relative h-64 md:h-80 bg-gray-200 cursor-pointer" onClick={toggleFullscreen}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentImageIndex}
                                    variants={imageVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                 
                                >
                                    <img
                                        src={project.additionalImages[currentImageIndex]}
                                        alt={`${project.title} - Image ${currentImageIndex + 1}`}
                                        width={800}
                                        height={400}
                                        className="w-full h-full object-cover"
                                        
                                        onLoad={handleImageLoad}
                                    />
                                    {!imageLoaded && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                                            <div className="animate-pulse text-white">Loading image...</div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {project.additionalImages.length > 1 && (
                                <>
                                    {/* Navigation Arrows */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            prevImage();
                                        }}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all z-10"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft size={24} className="text-gray-800" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            nextImage();
                                        }}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all z-10"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight size={24} className="text-gray-800" />
                                    </button>

                                    {/* Auto-play Toggle */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleAutoPlay();
                                        }}
                                        className={`absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full shadow-md transition-all z-10 ${isAutoPlaying ? 'text-green-400' : 'text-yellow-400'}`}
                                        title={isAutoPlaying ? "Pause auto-play" : "Start auto-play"}
                                        aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                                    >
                                        {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
                                    </button>

                                    {/* Image Counter */}
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm z-10">
                                        {currentImageIndex + 1} / {project.additionalImages.length}
                                    </div>

                                    {/* Fullscreen Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFullscreen();
                                        }}
                                        className="absolute top-4 left-4 bg-black/60 text-white p-2 rounded-full shadow-md transition-all z-10 hover:bg-black/80"
                                        title="View fullscreen"
                                        aria-label="View fullscreen"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Image Dots Indicator */}
                        {project.additionalImages.length > 1 && (
                            <div className="flex justify-center space-x-2 p-4 bg-white/5">
                                {project.additionalImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToImage(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                                            ? 'bg-blue-500 scale-125'
                                            : 'bg-white/30 hover:bg-white/50'
                                            }`}
                                        aria-label={`Go to image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </motion.div>

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

                    {/* Tech Stack */}
                    <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
                        <CardContent className="p-6">
                            <h4 className="text-lg font-semibold text-white mb-4">Technology Stack</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {project.techStack.map((tech, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-3 p-3 bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-colors duration-200"
                                    >
                                        <div className="relative w-8 h-8">
                                            <img
                                                src={tech.icon}
                                                alt={tech.name}
                                           
                                                className="object-contain rounded-lg"
                                            />
                                        </div>
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