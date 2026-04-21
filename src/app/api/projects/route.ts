
import { NextResponse } from "next/server";
import Project from "@/models/Projects.model";
import { dbConnect } from "@/lib/dbConnect";


export async function GET() {
    try {
        await dbConnect();
        const projects = await Project.find({}).lean();
        return NextResponse.json({
            success: true,
            data: JSON.parse(JSON.stringify(projects))
        });
    } catch (error) {
        console.error("DB Error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch projects" },
            { status: 500 }
        );
    }
}