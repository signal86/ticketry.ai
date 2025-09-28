import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodbHook'
import { ObjectId } from 'mongodb'

// GET /api/[project]/tickets/[id]
// return ticket info
// TODO: further ticket info, such as attachments, claims, checklists, or other components like that 
export async function GET(request, { params }) {
    try {
        const project = params.project
        const id = params.id

        const collection = await getCollection("items");

        // mongodb query
        const ticket = await collection.findOne({ project: ObjectId(project), id: ObjectId(id) });

        // if ticket not found, return 
        if (!ticket) {
            return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
        }
        
        return NextResponse.json({ ticket })
    } catch (error) {
        console.log("Error getting ticket: ", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// DELETE /api/[project]/tickets/[id]
// deletes a ticket
export async function DELETE(request, { params }) {
    try {
        const project = params.project
        const id = params.id

        const collection = await getCollection("items")

        // mongodb delete
        const result = await collection.deleteOne({ project: ObjectId(project), id: ObjectId(id) })

        // if ticket not found, return 
        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
        }

        return NextResponse.json({ completed: true })
    } catch (error) {
        console.log("Error deleting ticket: ", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
