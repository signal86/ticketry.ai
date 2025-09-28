import { NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodbHook'
import { ObjectId } from 'mongodb'

// GET /api/[project]/tickets
// return all tickets of a single project
export async function GET(request, { params }) {
    try {
        const project = params.project

        // mongodb query
        const collection = await getCollection("items");
        const tickets = await collection.find({ project: ObjectId(project) }).toArray();

        return NextResponse.json({ project, tickets: tickets }, { status: 200 });
    } catch (error) {
        console.log("Error getting tickets: ", error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// This is unnecessary and for now doesnt need to exist
// POST /api/[project]/tickets
// create a new ticket
// requires title of ticket and summary, and email of the user
// export async function POST(request, { params }) {
//     try {
//         const project = params.project
//         const { title, summary, email } = await request.json()
//
//         // validate title and summary
//         if (!title || !summary) {
//             return NextResponse.json(
//                 { error: 'title and summary are required' },
//                 { status: 400 }
//             );
//         }
//
//         // TODO: mongodb insert
//         const result = await collection.insertOne({
//             title: title,
//             email: email,
//             description: summary,
//             project: ObjectId(project),
//             createdAt: new Date(),
//         });
//
//         return NextResponse.json({ 
//             id: '123', 
//             project, 
//             summary,
//             completed: false 
//         })
//     } catch (error) {
//         return NextResponse.json({ error: "Error creating ticket" }, { status: 500 });
//     }
// }

