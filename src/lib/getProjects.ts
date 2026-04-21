import Project from "@/models/Projects.model";
import { dbConnect } from "./dbConnect";
import { Project as ProjectType } from "@/app/types/project";


export async function getProjects(): Promise<ProjectType[]> {
    await dbConnect();
    const projects = await Project.find({}).lean();
    return JSON.parse(JSON.stringify(projects));
}