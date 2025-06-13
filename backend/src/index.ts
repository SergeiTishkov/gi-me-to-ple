// index.ts (CommonJS compatible)
import express from "express";
import cors from "cors";
import { crowdfundingDbClient } from "@src/dbClient";
import { CROWDFUNDING_REQUESTS_COLLECTION_NAME } from "@src/appConsts";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/api/requests", async (req, res) => {
  try {
    const requests = await crowdfundingDbClient.collection(CROWDFUNDING_REQUESTS_COLLECTION_NAME).find({}).toArray();
    res.json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ message: "Failed to fetch requests from the database" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
