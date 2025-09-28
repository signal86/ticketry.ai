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

async function postNewItem(name, ownerEmail) {
  try {
    // Connect to MongoDB
    await client.connect();
    
    // Select database and collection
    const database = client.db('ticketryai');
    const collection = database.collection('projects');
    
    // Create the item document
    const item = {
      name: name,
      owner: ownerEmail,
      members: [ownerEmail],
      createdAt: new Date()
    };
    
    // Insert the item
    const result = await collection.insertOne(item);
    
    console.log(`Item inserted successfully with ID: ${result.insertedId}`);
    
    return {
      success: true,
      itemId: result.insertedId,
      item: { ...item, _id: result.insertedId }
    };
    
  } catch (error) {
    console.error('Error writing item to MongoDB:', error.message);
    return {
      success: false,
      error: error.message
    };
  } finally {
    // Close connection
    await client.close();
  }
}

// Example usage
async function example() {
  const result = await postNewItem(
    "mhacks",
    "user@example.com",
  );
  
  console.log(result);
}

module.exports = { postNewItem };

// Run example if this file is executed directly
if (require.main === module) {
  example().catch(console.error);
}

