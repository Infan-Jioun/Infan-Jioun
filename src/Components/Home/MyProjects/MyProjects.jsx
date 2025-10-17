import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Button } from "@material-tailwind/react";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";
import { PROJECTS_DATA } from "./projectsData";

const MyProjects = () => {
  const [loading, setLoading] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = useMemo(() => PROJECTS_DATA, []);
  const displayedProjects = useMemo(() =>
    projects.slice(0, visibleProjects),
    [projects, visibleProjects]
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const loadMore = useCallback(() => {
    setVisibleProjects(prev => Math.min(prev + 2, projects.length));
  }, [projects.length]);

  const handleViewDetails = useCallback((project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
  }, []);

  const hasMoreProjects = visibleProjects < projects.length;

  return (
    <div className="py-12 max-w-7xl mx-auto">
      <h2 className="text-3xl mt-7 md:text-4xl uppercase font-bold text-center mb-10 drop-shadow-2xl text-white">
        My PROJECTS
      </h2>

      <div className="mx-auto px-6 md:px-16 py-10 grid gap-8 drop-shadow-2xl">
        {displayedProjects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            loading={loading}
            index={index}
            onViewDetails={handleViewDetails}
          />
        ))}
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

export default React.memo(MyProjects);