import { getProjects, ProjectEntity } from "@/lib/getProjects";
import Image from "next/image";

export default async function ProjectsPage() {
  const projects: ProjectEntity[] = await getProjects();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border border-indigo-500/30 p-4 rounded-none bg-slate-900 text-slate-100">
            {project.imageUrl && (
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            )}
            <h2 className="text-lg font-bold text-cyan-400">{project.title}</h2>
            <p className="text-sm text-slate-300 mt-2 line-clamp-3">{project.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
