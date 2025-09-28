import { getCollection } from '@/lib/mongodbHook'
import { ObjectId } from 'mongodb'

// GET /demo/doesProjectExist/[email]
// get whether or not someone has activated a project
export async function GET(request, { params }) {
    try {
        const { email } = await params;
        const collection = await getCollection("projects");

        // get user projects
        const project = await collection.findOne({ owner: email })
        if (project == null) {
            return Response.json({message: "Not found"}, {status: 404})
        }

        return Response.json({project: project}, {status: 200});
    } catch (error) {
        return Response.json({error: "error"}, {status: 400})
    }
}