import { NextResponse } from 'next/server'

// PUT /api/[project]/tickets/[id]/claim
// marks ticket as claimed by a user
// requires userEmail
// returns JSON object of claimed (true or false) and reason, or error
export async function PUT(request, { params }) {
    try {
        // Extract project and ticket ID from URL params
        const { project, id } = params;

        // Parse JSON body to get user info
        const body = await request.json();
        const { userEmail } = body;

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

        // TODO: Add database logic here
        // TODO: check claimed already, if user is in the team, if the ticket exists

        claimed = true;

        return NextResponse.json({
            claimed: claimed,
            reason: 'TODO: ticket claiming',
        }, { status: 200 });

    } catch (error) {
        console.error('Error claiming ticket:', error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

