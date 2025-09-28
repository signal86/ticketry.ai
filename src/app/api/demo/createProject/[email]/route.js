import { getCollection } from '@/lib/mongodbHook'
import { ObjectId } from 'mongodb'

// GET /demo/createProject/[email]
// create a demo project for the email
export async function POST(request, { params }) {
    const { name } = await request.json()
    try {
        const email = params.email;
        const collection = await getCollection("projects");

        collection.insertOne({
            name: name,
            owner: email,
            members: [email],
            createdAt: new Date(),
        })

        return Response.json({message: "created", status: 200});
    } catch (error) {
        return Response.json({error: "error", status: 400})
    }
}