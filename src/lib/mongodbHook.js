const dotenv = require('dotenv');
dotenv.config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DATABASE_ADMIN_USERNAME}:${process.env.DATABASE_ADMIN_PASSWORD}@cluster000.ujpmqhi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster000`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let promise = client.connect();
export default promise;

// accessing the collection
export async function getCollection(collectionName, dbName = 'ticketryai') {
    if (!collectionName) {
        throw new Error('Collection name is required');
    }
    const db = client.db(dbName);
    return db.collection(collectionName)
}
