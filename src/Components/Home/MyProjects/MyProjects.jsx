import React, { useEffect, useState, useMemo, useCallback, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Lazy load heavy components
const LazyMotionDiv = lazy(() => import("framer-motion").then(mod => ({ default: mod.motion.div })));
const LazyMotionImg = lazy(() => import("framer-motion").then(mod => ({ default: mod.motion.img })));

// Static data moved outside component to prevent re-renders
const PROJECTS_DATA = [
  {
    title: "NESTIFY",
    description: "Nestify is a modern Next.js real estate platform with property listings, agent profiles, and real estate services. It includes OTP authentication.",
    liveLink: "https://nestify-projects.vercel.app/",
    frontendRepo: "https://github.com/Infan-Jioun/Nestify-Projects",
    imageUrl: "https://i.ibb.co.com/WWDcGs38/screenshot-1760378582857.png",
    techStack: [
      "https://i.ibb.co.com/HL0sSj4C/typescript.webp",
      "https://i.ibb.co.com/xtCck3wG/nextJs.webp",
      "https://i.ibb.co.com/jJzXpx5/tailwind.webp",
      "https://i.ibb.co.com/0R3TKXmx/shadcn.webp",
      "https://i.ibb.co.com/k2mbXZD0/images.jpg",
      "https://i.ibb.co.com/hJhwkTcL/mongoDB.webp",
    ],
  },
  {
    title: "FOODHUB",
    description: "Developed a food ordering platform (FoodHub) with dynamic food management and role-based access (Admin, Moderator, Restaurant Owner).",
    liveLink: "https://foodhub-d3e1e.web.app/",
    frontendRepo: "https://github.com/Infan-Jioun/FoodHub-Frontend-Projects",
    backendRepo: "https://github.com/Infan-Jioun/FoodHub-Backend-Projects",
    imageUrl: "https://i.ibb.co/fzkTN1Tw/screenshot-1748712980940.png",
    techStack: [
      "https://i.ibb.co.com/zRpT9jC/javascript.webp",

      "https://i.ibb.co.com/gRXXrDs/react.webp",
      "https://i.ibb.co.com/jJzXpx5/tailwind.webp",
      "https://i.ibb.co.com/6s0HLvL/DaisyUI.webp",
      "https://i.ibb.co.com/jVnm9XT/nodeJS.webp",
      "https://i.ibb.co.com/ZYWHXHn/express-Js.webp",
    ],
  },
  {
    title: "ShoppingGO",
    description: "An advanced e-commerce platform with product listing, dynamic navigation, payment integration, a responsive design, and Seller Sale product system.",
    liveLink: "https://shoppinggo-930e2.web.app/",
    frontendRepo: "https://github.com/Infan-Jioun/ShoppingGO-Projects-Frontend",
    backendRepo: "https://github.com/Infan-Jioun/ShoppingGO-Projects-Backend",
    imageUrl: "https://i.ibb.co/j9wXX893/screenshot-1748713595547.png",
    techStack: [
      "https://i.ibb.co.com/zRpT9jC/javascript.webp",
      "https://i.ibb.co.com/gRXXrDs/react.webp",
      "https://i.ibb.co.com/jJzXpx5/tailwind.webp",
      "https://i.ibb.co.com/6s0HLvL/DaisyUI.webp",
      "https://i.ibb.co.com/k2mbXZD0/images.jpg",
      "https://i.ibb.co.com/jVnm9XT/nodeJS.webp",
      "https://i.ibb.co.com/ZYWHXHn/express-Js.webp",
    ],
  },
  {
    title: "Infan Web Ecommerce",
    description: "An advanced e-commerce platform with product listing, dynamic navigation, payment integration, and a responsive design.",
    liveLink: "https://infan-web.web.app/",
    frontendRepo: "https://github.com/Infan-Jioun/infan-ecommerce-frontend",
    backendRepo: "https://github.com/Infan-Jioun/infan-ecommerce-backend",
    imageUrl: "https://i.ibb.co.com/GHzJT6J/Screenshot-2024-11-23-071650.png",
    techStack: [
      "https://i.ibb.co.com/zRpT9jC/javascript.webp",
      "https://i.ibb.co.com/gRXXrDs/react.webp",
      "https://i.ibb.co.com/jJzXpx5/tailwind.webp",
      "https://i.ibb.co.com/6s0HLvL/DaisyUI.webp",
      "https://i.ibb.co.com/jVnm9XT/nodeJS.webp",
      "https://i.ibb.co.com/ZYWHXHn/express-Js.webp",
    ],
  },
  {
    title: "Pet Adopt Web",
    description: "An interactive pet adoption website connecting adopters with pets through a user-friendly experience.",
    liveLink: "https://petadoptweb.web.app/",
    frontendRepo: "https://github.com/Infan-Jioun/Pet-adoption-frontend",
    backendRepo: "https://github.com/Infan-Jioun/Pet-adoption-backend",
    imageUrl: "https://i.ibb.co.com/ZmZmXPz/2024-11-24.png",
    techStack: [
      "https://i.ibb.co.com/zRpT9jC/javascript.webp",
      "https://i.ibb.co.com/gRXXrDs/react.webp",
      "https://i.ibb.co.com/jJzXpx5/tailwind.webp",
      "https://i.ibb.co.com/6s0HLvL/DaisyUI.webp",
      "https://i.ibb.co.com/jVnm9XT/nodeJS.webp",
      "https://i.ibb.co.com/ZYWHXHn/express-Js.webp",
    ],
  },
  {
    title: "EduBooker",
    description: "A modern solution simplifying college admissions with an intuitive and efficient online platform.",
    liveLink: "https://edubooker-2f225.web.app/",
    frontendRepo: "https://github.com/Infan-Jioun/EduBooker-project-frontend",
    backendRepo: "https://github.com/Infan-Jioun/EduBooker-project-backend",
    imageUrl: "https://i.ibb.co.com/NtZz2NN/2025-01-27-2.png",
    techStack: [
      "https://i.ibb.co.com/zRpT9jC/javascript.webp",
      "https://i.ibb.co.com/gRXXrDs/react.webp",
      "https://i.ibb.co.com/jJzXpx5/tailwind.webp",
      "https://i.ibb.co.com/6s0HLvL/DaisyUI.webp",
      "https://i.ibb.co.com/jVnm9XT/nodeJS.webp",
      "https://i.ibb.co.com/ZYWHXHn/express-Js.webp",
    ],
  },
];

// Memoized Project Card Component
const ProjectCard = React.memo(({ project, loading, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const MotionComponent = useMemo(() => lazy(() => import("framer-motion").then(mod => ({
    default: mod.motion.div
  }))), []);

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
        <Link to={project.liveLink} target="_blank" rel="noopener noreferrer">
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
                } ${!imageError ? 'group-hover:scale-105' : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </Link>
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
                src={tech}
                alt="Tech"
                loading="lazy"
                className="w-8 h-8 object-contain rounded-full border border-purple-300 p-1 bg-white shadow transition-transform hover:scale-110"
              />
            ))}
          </div>

          <p className="text-white-300 text-opacity-80 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex items-center gap-4 pt-6">
          <Link to={project.liveLink} target="_blank" rel="noopener noreferrer">
            <Button
              className="px-6 py-2 font-semibold rounded-lg transition bg-transparent hover:bg-transparent border-2 border-white backdrop-blur-xl shadow-lg hover:scale-105"
              placeholder="Preview"
            >
              Preview
            </Button>
          </Link>

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

const MyProjects = () => {
  const [loading, setLoading] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState(3);

  const projects = useMemo(() => PROJECTS_DATA, []);
  const displayedProjects = useMemo(() => projects.slice(0, visibleProjects), [projects, visibleProjects]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const loadMore = useCallback(() => {
    setVisibleProjects(prev => Math.min(prev + 2, projects.length));
  }, [projects.length]);

  const hasMoreProjects = visibleProjects < projects.length;

  return (
    <div className="py-12 max-w-7xl mx-auto">
      <h2 className="text-3xl mt-7 md:text-4xl uppercase font-bold text-center mb-10 drop-shadow-2xl text-white">
        My PROJECTS
      </h2>

      <div className="mx-auto px-6 md:px-16 py-10 grid gap-8 drop-shadow-2xl">
        <Suspense fallback={
          <div className="space-y-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <ProjectCard key={index} loading={true} index={index} />
            ))}
          </div>
        }>
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              loading={loading}
              index={index}
            />
          ))}
        </Suspense>
      </div>

      {/* Load More Button */}
      {!loading && hasMoreProjects && (
        <div className="text-center mt-8">
          <Button
            onClick={loadMore}
            className="px-8 py-3 font-semibold rounded-lg transition bg-transparent hover:bg-transparent border-2 border-white backdrop-blur-xl shadow-lg hover:scale-105"
            placeholder="Load More"
          >
            Load More Projects
          </Button>
        </div>
      )}
    </div>
  );
};

export default React.memo(MyProjects);