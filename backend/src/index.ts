import express from "express";
import cors from "cors";
import { crowdfundingDbClient } from "@/dbClient";
import { CROWDFUNDING_REQUESTS_COLLECTION_NAME } from "@/appConsts";
import { CrowdfundingRequest } from "@gi-me-to-ple/shared/types/CrowdfundingRequest";

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
