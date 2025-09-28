import { getCollection } from '@/lib/mongodbHook'
import { ObjectId } from 'mongodb'

// POST /demo/createProject/[email]
// create a demo project for the email
// requires name
export async function POST(request, { params }) {
    const { name } = await request.json()
    try {
        const { email } = await params;
        const collection = await getCollection("projects");

        const project = collection.insertOne({
            name: name,
            owner: email,
            members: [email],
            createdAt: new Date(),
        })

        return Response.json({project: project, message: "created"}, {status: 200});
    } catch (error) {
        return Response.json({error: "error"}, {status: 400})
    }
}