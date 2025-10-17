import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectDetailModal = React.memo(({ project, isOpen, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState({});

    const nextImage = useCallback(() => {
        setDirection(1);
        setCurrentImageIndex(prev =>
            prev === project.additionalImages.length - 1 ? 0 : prev + 1
        );
    }, [project.additionalImages.length]);

    const prevImage = useCallback(() => {
        setDirection(-1);
        setCurrentImageIndex(prev =>
            prev === 0 ? project.additionalImages.length - 1 : prev - 1
        );
    }, [project.additionalImages.length]);

    const goToImage = useCallback((index) => {
        setDirection(index > currentImageIndex ? 1 : -1);
        setCurrentImageIndex(index);
    }, [currentImageIndex]);

    const handleImageLoad = useCallback((index) => {
        setImagesLoaded(prev => ({ ...prev, [index]: true }));
    }, []);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'Escape') {
            onClose();
        }
    }, [nextImage, prevImage, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleKeyDown);

            // Preload all images when modal opens
            project.additionalImages.forEach((src, index) => {
                const img = new Image();
                img.src = src;
                img.onload = () => handleImageLoad(index);
            });
        } else {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleKeyDown);
            setCurrentImageIndex(0); // Reset to first image when closing
            setDirection(0);
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown, project.additionalImages, handleImageLoad]);

    // Slide variants for smooth animation
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8
        })
    };

    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-[#1a1a2e] border border-purple-500/30 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
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
                    <AnimatePresence custom={direction} mode="wait">
                        <motion.img
                            key={currentImageIndex}
                            src={project.additionalImages[currentImageIndex]}
                            alt={`${project.title} - Image ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover absolute inset-0"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            onLoad={() => handleImageLoad(currentImageIndex)}
                        />
                    </AnimatePresence>

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
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                                aria-label="Previous image"
                            >
                                ‹
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                                aria-label="Next image"
                            >
                                ›
                            </button>

                            {/* Image Indicators */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
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
                            <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                                {currentImageIndex + 1} / {project.additionalImages.length}
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
                                    <img
                                        src={tech.icon}
                                        alt={tech.name}
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
                            <Link to={project.frontendRepo} target="_blank" rel="noopener noreferrer">
                                <Button
                                    className="px-6 py-2 font-semibold rounded-lg transition bg-purple-600 hover:bg-purple-700 border-2 border-purple-600 backdrop-blur-xl shadow-lg hover:scale-105"
                                    placeholder="Frontend Code"
                                >
                                    Frontend Code
                                </Button>
                            </Link>

                            {project.backendRepo && (
                                <Link to={project.backendRepo} target="_blank" rel="noopener noreferrer">
                                    <Button
                                        className="px-6 py-2 font-semibold rounded-lg transition bg-blue-600 hover:bg-blue-700 border-2 border-blue-600 backdrop-blur-xl shadow-lg hover:scale-105"
                                        placeholder="Backend Code"
                                    >
                                        Backend Code
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-purple-500/30">
                        <Link to={project.liveLink} target="_blank" rel="noopener noreferrer">
                            <Button
                                className="px-6 py-2 font-semibold rounded-lg transition bg-green-600 hover:bg-green-700 border-2 border-green-600 backdrop-blur-xl shadow-lg hover:scale-105"
                                placeholder="Live Demo"
                            >
                                Live Demo
                            </Button>
                        </Link>

                        <Button
                            onClick={onClose}
                            className="px-6 py-2 font-semibold rounded-lg transition bg-gray-600 hover:bg-gray-700 border-2 border-gray-600 backdrop-blur-xl shadow-lg hover:scale-105"
                            placeholder="Close"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
});

ProjectDetailModal.displayName = 'ProjectDetailModal';

export default ProjectDetailModal;