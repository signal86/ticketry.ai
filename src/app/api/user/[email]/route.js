import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodbHook'
import { ObjectId } from 'mongodb'

// GET /api/user/[email]
// get user projects
export async function GET(request, { params }) {
    try {
        const email = params.email;
        const collection = await getCollection("projects");

        // get user projects
        const owned_projects = await collection.find({ owner: email }).toArray();
        const unowned_projects = await collection.find({ owner: { $ne: email }, members: email }).toArray();

        return NextResponse.json(owned_projects: owned_projects, unowned_projects: unowned_projects, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error getting projects" }, { status: 500 });
    }
}

// POST /api/user/[email]
// create a new project
// takes project name
export async function POST(request, { params }) {
    try {
        const collection = await getCollection("projects");
        const email = params.email;

        // validate project
        const { name } = await request.json()
        if (!name) {
            return NextResponse.json(
                { error: 'name is required' },
                { status: 400 }
            );
        }

        // mongodb insert
        const result = await collection.insertOne({
            name: name,
            owner: email,
            members: [email],
            createdAt: new Date(),
        });

        return NextResponse.json({
            success: true,
            projectId: result.insertedId,
        }, { status: 200 });
    } catch (error) {
        console.log("Error creating project", error);
        return NextResponse.json({ error: "Error creating project" }, { status: 500 });
    }
}
