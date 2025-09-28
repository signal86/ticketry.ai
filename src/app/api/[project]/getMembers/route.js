import { getCollection } from '@/lib/mongodbHook'
import { ObjectId } from 'mongodb'

// GET /api/[project]/getMembers
// get all members of a project
export async function GET(request, { params }) {
    try {
        const { project } = await params;
        const collection = await getCollection("projects");

        // get project
        const project1 = await collection.findOne({ _id: new ObjectId(project) })
        if (project1 == null) {
            return Response.json({message: "Not found"}, {status: 404})
        }

        return Response.json({ members: project1.members }, {status: 200})
    } catch (error) {
        console.log("error: " + error)
        return Response.json({error: "error"}, {status: 400})
    }
}
