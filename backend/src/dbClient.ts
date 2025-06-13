import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://myuser:mypassword@localhost:27017/admin";
const dbName = "crowdfunding_db";

export let mongoClient: MongoClient;
export let crowdfundingDbClient: Db;

async function connectToDatabase(): Promise<void> {
  try {
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();

    console.log("✅ Successfully connected to MongoDB.");

    crowdfundingDbClient = mongoClient.db(dbName);
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB. Server not starting.", err);
    process.exit(1);
  }
}

connectToDatabase();
