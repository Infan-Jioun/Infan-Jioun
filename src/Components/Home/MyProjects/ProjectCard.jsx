import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";

const ProjectCard = React.memo(({ project, loading, index, onViewDetails }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
    }, []);

    const handleImageError = useCallback(() => {
        setImageError(true);
    }, []);

    if (loading) {
        return (
            <div className="group relative flex flex-col lg:flex-row bg-[#ffffff08] border border-purple-500/30 backdrop-blur-md shadow-2xl rounded overflow-hidden">
                <div className="lg:w-1/2 overflow-hidden">
                    <Skeleton height={250} />
                </div>
                <div className="lg:w-1/2 p-6 flex flex-col justify-between">
                    <div>
                        <Skeleton width={150} height={28} className="mb-2" />
                        <div className="flex gap-2 py-4 flex-wrap">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} width={40} height={40} circle />
                            ))}
                        </div>
                        <Skeleton count={3} />
                    </div>
                    <div className="flex items-center gap-4 pt-6">
                        <Skeleton width={100} height={40} />
                        <Skeleton width={40} height={40} circle />
                        <Skeleton width={40} height={40} circle />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className="group relative flex flex-col lg:flex-row bg-[#ffffff08] border border-purple-500/30 backdrop-blur-md shadow-2xl rounded overflow-hidden transition-transform duration-300 hover:shadow-purple-500/30 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
        >
            {/* Image Section */}
            <div className="lg:w-1/2 overflow-hidden drop-shadow-lg relative">
                <div className="relative w-full h-64 lg:h-full">
                    {!imageLoaded && !imageError && (
                        <Skeleton
                            height="100%"
                            baseColor="#2c2c3a"
                            highlightColor="#4338ca"
                        />
                    )}
                    <motion.img
                        src={project.imageUrl}
                        alt={project.title}
                        loading="lazy"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        className={`w-full h-full object-cover transition-transform duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                            } ${!imageError ? 'group-hover:scale-105' : ''
                            }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: imageLoaded ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
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
                            <img
                                key={i}
                                src={tech.icon}
                                alt={tech.name}
                                loading="lazy"
                                className="w-8 h-8 object-contain rounded-full border border-purple-300 p-1 bg-white shadow transition-transform hover:scale-110"
                                title={tech.name}
                            />
                        ))}
                    </div>

                    <p className="text-white-300 text-opacity-80 leading-relaxed">
                        {project.description}
                    </p>
                </div>

                <div className="flex items-center gap-4 pt-6">
                    <Button
                        onClick={() => onViewDetails(project)}
                        className="px-6 py-2 font-semibold rounded-lg transition bg-transparent hover:bg-transparent border-2 border-white backdrop-blur-xl shadow-lg hover:scale-105"
                        placeholder="View Details"
                    >
                        View Details
                    </Button>

                    <div className="flex items-center gap-3">
                        <Link to={project.frontendRepo} target="_blank" rel="noopener noreferrer">
                            <div className="w-10 h-10 flex items-center justify-center bg-white-800/80 backdrop-blur-sm rounded-full border border-white-600/50 shadow-lg hover:scale-110 hover:bg-white-700/80 transition-all duration-300 group">
                                <img
                                    src="https://i.ibb.co.com/5jCZwV7/github.webp"
                                    alt="GitHub Frontend"
                                    loading="lazy"
                                    className="w-5 h-5 filter brightness-0 invert group-hover:scale-110 transition-transform"
                                />
                            </div>
                        </Link>

                        {project.backendRepo && (
                            <Link to={project.backendRepo} target="_blank" rel="noopener noreferrer">
                                <div className="w-10 h-10 flex items-center justify-center bg-white-800/80 backdrop-blur-sm rounded-full border border-white-600/50 shadow-lg hover:scale-110 hover:bg-white-700/80 transition-all duration-300 group">
                                    <img
                                        src="https://i.ibb.co.com/5jCZwV7/github.webp"
                                        alt="GitHub Backend"
                                        loading="lazy"
                                        className="w-5 h-5 filter brightness-0 invert group-hover:scale-110 transition-transform"
                                    />
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;