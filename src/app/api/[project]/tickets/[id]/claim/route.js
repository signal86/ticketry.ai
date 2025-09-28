import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodbHook'
import { ObjectId } from 'mongodb'

// PUT /api/[project]/tickets/[id]/claim
// marks ticket as claimed by a user
// requires userEmail
// returns JSON object of claimed (true or false) and reason, or error
export async function PUT(request, { params }) {
    try {
        // Extract project and ticket ID from URL params
        const { project, id } = await params;

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

        // does ticket exist
        let res = await getCollection("items").findOne({ project: ObjectId(project), id: ObjectId(id) });
        if (!res) {
            return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
        }
        // check claimed already
        if (res.status === 'claimed') {
            return NextResponse.json({ error: "Ticket already claimed" }, { status: 400 })
        }
        // TODO: check if user is in the team
        // TODO: check if ticket exists

        // actual claim
        const claimed = await getCollection("items").updateOne({ project: ObjectId(project), id: ObjectId(id) }, { $set: { status: 'claimed', claimedBy: userEmail } });

        return NextResponse.json({}, { status: 200 });

    } catch (error) {
        console.error('Error claiming ticket:', error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

