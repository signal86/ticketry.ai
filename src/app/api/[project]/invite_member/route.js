import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodbHook'
import { ObjectId } from 'mongodb'

// POST /api/[project]/invite_member
// invites a new member
// takes userEmail
export async function POST(request, { params }) {
    const collection = await getCollection("projects");

    // validate project
    const project = params.project;
    if (collection.findOne({ _id: ObjectId(project) })) {
        return NextResponse.json(
            { error: 'project does not exist' },
            { status: 400 }
        );
    }

    // check if userEmail is in the request body
    const { userEmail } = await request.json()
    if (!userEmail) {
        return NextResponse.json(
            { error: 'userEmail is required' },
            { status: 400 }
        );
    }

    // check if user is in the team
    if collection.findOne({ _id: ObjectId(project), members: userEmail }) {
        return NextResponse.json(
            { error: 'user is already in the team' },
            { status: 400 }
        );
    }

    // mongodb insert
    await collection.updateOne(
        { _id: ObjectId(project) },
        { $addToSet: { members: userEmail } }
    );

    return NextResponse.json({
        success: true,
    }, { status: 200 });
}


