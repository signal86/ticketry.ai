const dotenv = require("dotenv");
dotenv.config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri = `mongodb+srv://${process.env.DATABASE_ADMIN_USERNAME}:${process.env.DATABASE_ADMIN_PASSWORD}@cluster000.ujpmqhi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster000`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/**
 * Write a new item to MongoDB
 * @param {string} title - The title of the item
 * @param {string} email - User's email address
 * @param {string} description - Description of the item
 * @param {string} additionalDetails - Additional details about the item
 * @param {number} project - Project ID (defaults to 0)
 * @returns {Promise<Object>} The result of the insert operation with fields:
 *   - title, email, description, additionalDetails, project
 *   - status: 'Unclaimed' (will be managed by website: Unclaimed -> Claimed -> Resolved)
 *   - createdAt: timestamp
 */
async function postNewItem(
  title,
  email,
  description,
  additionalDetails,
  project = 0,
) {
  try {
    // Connect to MongoDB
    await client.connect();

    // Select database and collection
    const database = client.db("ticketryai");
    const collection = database.collection("items");

    // Create the item document
    const item = {
      title: title,
      email: email,
      description: description,
      additionalDetails: additionalDetails,
      project: new ObjectId("68d9091f56c61d350b9e4a5e"),
      status: "Unclaimed",
      createdAt: new Date(),
    };

    // Insert the item
    const result = await collection.insertOne(item);

    console.log(`Item inserted successfully with ID: ${result.insertedId}`);

    return {
      success: true,
      itemId: result.insertedId,
      item: { ...item, _id: result.insertedId },
    };
  } catch (error) {
    console.error("Error writing item to MongoDB:", error.message);
    return {
      success: false,
      error: error.message,
    };
  } finally {
    // Close connection
    await client.close();
  }
}

// Example usage
async function example() {
  const result = await postNewItem(
    "Sample Title",
    "user@example.com",
    "This is a sample description",
    "Additional details go here",
    0,
  );

  console.log(result);
}

module.exports = { postNewItem };

// Run example if this file is executed directly
if (require.main === module) {
  example().catch(console.error);
}
