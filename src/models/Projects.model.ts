import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IProject extends Document {
    title: string;
    description: string;
    detailedDescription: string;
    liveLink: string;
    frontendRepo: string | null;
    backendRepo: string | null;
    imageUrl: string;
    additionalImages: string[];
    techStack: Array<{ name: string; icon: string }>;
    features: string[];
}

const ProjectSchema = new Schema<IProject>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        detailedDescription: { type: String, required: true },
        liveLink: { type: String, required: true },
        frontendRepo: { type: String, default: null },
        backendRepo: { type: String, default: null },
        imageUrl: { type: String, required: true },
        additionalImages: [{ type: String }],
        techStack: [
            {
                name: { type: String },
                icon: { type: String },
            },
        ],
        features: [{ type: String }],
    },
    {
        timestamps: true,
        collection: "project"
    }
);

const Project = models.Project || model<IProject>("Project", ProjectSchema);

export default Project;