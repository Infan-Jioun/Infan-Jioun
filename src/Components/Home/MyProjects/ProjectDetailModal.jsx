import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";

const ProjectDetailModal = React.memo(({ project, isOpen, onClose }) => {
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

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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
                        className="text-white hover:text-purple-300 text-2xl"
                    >
                        ×
                    </button>
                </div>

                {/* Image Slider */}
                <div className="relative h-64 md:h-80 bg-gray-800">
                    <img
                        src={project.additionalImages[currentImageIndex]}
                        alt={`${project.title} - Image ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                    />

                    {project.additionalImages.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                            >
                                ‹
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                            >
                                ›
                            </button>

                            {/* Image Indicators */}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {project.additionalImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
                                            }`}
                                    />
                                ))}
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
                                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Technology Stack */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Technology Stack</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {project.techStack.map((tech, index) => (
                                <div key={index} className="flex items-center space-x-3 p-3 bg-[#ffffff08] rounded-lg border border-purple-500/20">
                                    <img
                                        src={tech.icon}
                                        alt={tech.name}
                                        className="w-8 h-8 object-contain rounded"
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
                                    Frontend (React/JavaScript)
                                </Button>
                            </Link>

                            {project.backendRepo && (
                                <Link to={project.backendRepo} target="_blank" rel="noopener noreferrer">
                                    <Button
                                        className="px-6 py-2 font-semibold rounded-lg transition bg-blue-600 hover:bg-blue-700 border-2 border-blue-600 backdrop-blur-xl shadow-lg hover:scale-105"
                                        placeholder="Backend Code"
                                    >
                                        Backend (Node.js)
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