import { Router } from "express";
import { crowdfundingDbClient } from "@/dbClient";
import { CROWDFUNDING_REQUESTS_COLLECTION_NAME } from "@/appConsts";
import { CrowdfundingRequest } from "@gi-me-to-ple/shared/types/CrowdfundingRequest";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const requests = await crowdfundingDbClient
      .collection<CrowdfundingRequest>(CROWDFUNDING_REQUESTS_COLLECTION_NAME)
      .find({})
      .toArray();
    res.json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
});

export default router;