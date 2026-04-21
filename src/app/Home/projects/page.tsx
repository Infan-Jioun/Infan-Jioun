import { dbConnect } from "@/lib/dbConnect";
import Project from "@/models/Projects.model";



async function getProjects() {
    await dbConnect();
    const projects = await Project.find({}).lean();
    return JSON.parse(JSON.stringify(projects));
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <main>
            <h1>Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects.map((project: any) => (
                    <div key={project._id} className="border p-4 rounded-lg">
                        <img src={project.imageUrl} alt={project.title} />
                        <h2>{project.title}</h2>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}