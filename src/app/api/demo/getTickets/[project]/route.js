import { getCollection } from '@/lib/mongodbHook'
import { ObjectId } from 'mongodb'

// GET /demo/getTickets/[project]
// get whether or not someone has activated a project
export async function GET(request, { params }) {
    try {
        const { project } = await params;
        const collection = await getCollection("items");

        // get tickets
        const tickets = await collection.find({ project: project }).toArray()
        if (tickets == null) {
            return Response.json({message: "Not found"}, {status: 404})
        }

        return Response.json({tickets: tickets}, {status: 200});
    } catch (error) {
        return Response.json({error: "error" + error}, {status: 400})
    }
}