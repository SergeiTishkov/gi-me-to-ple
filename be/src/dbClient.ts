
import { ensureEnvLoaded } from "./ensureEnv";
ensureEnvLoaded();

import { MongoClient, Db } from "mongodb";
import { CROWDFUNDING_DB_NAME } from "./appConsts";

const uri = `${process.env.MONGODB_URI}/admin`;
export let mongoClient: MongoClient;
export let crowdfundingDbClient: Db;

async function connectToDatabase(): Promise<void> {
  try {
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();

    console.log("✅ Successfully connected to MongoDB.");

    crowdfundingDbClient = mongoClient.db(CROWDFUNDING_DB_NAME);
  } catch (err) {
    console.error(`❌ Failed to connect to MongoDB. Server not starting. URI: "${uri}"`, err);
    process.exit(1);
  }
}

connectToDatabase();
