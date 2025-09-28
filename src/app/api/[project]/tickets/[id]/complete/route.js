import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodbHook'
import { ObjectId } from 'mongodb'

// PUT /api/[project]/tickets/[id]/complete
// marks ticket as completed by a user
// requires userEmail
// returns JSON object of claimed (true or false) and reason, or error
export async function PUT(request, { params }) {
    try {
        // Extract project and ticket ID from URL params
        const { project, id } = await params;
        const collection = await getCollection("items");

        // Parse JSON body to get user info
        const { userEmail } = await request.json();

        // Validate required fields
        if (!userEmail) {
            return NextResponse.json(
                { error: 'userEmail is required' },
                { status: 400 }
            );
        }

        if (!project || !id) {
            return NextResponse.json(
                { error: 'Project and ticket ID are required' },
                { status: 400 }
            );
        }

        // Check if user is in the team
        const user = await collection.findOne({ project: new ObjectId(project), email: userEmail });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        // Check if ticket exists
        const ticket = await collection.findOne({ project: new ObjectId(project), id: new ObjectId(id) });
        if (!ticket) {
            return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
        }

        // check completed already
        if (collection.findOne({ project: new ObjectId(project), _id: new ObjectId(id), status: 'completed' })) {
            return NextResponse.json({ error: "Ticket already completed" }, { status: 400 })
        }

        // actual complete
        await collection.updateOne({ project: new ObjectId(project), id: new ObjectId(id) }, { $set: { status: 'completed', completedBy: userEmail } });

        return NextResponse.json({}, { status: 200 });

    } catch (error) {
        console.error("Error claiming ticket: ", error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
