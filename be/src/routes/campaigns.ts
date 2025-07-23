import { Router } from "express";
import { crowdfundingDbClient } from "@/dbClient";
import { CROWDFUNDING_CAMPAIGNS_COLLECTION_NAME } from "@/appConsts";
import { CrowdfundingCampaign } from "@gi-me-to-ple/shared/types/CrowdfundingCampaign";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const campaigns = await crowdfundingDbClient
      .collection<CrowdfundingCampaign>(CROWDFUNDING_CAMPAIGNS_COLLECTION_NAME)
      .find({})
      .toArray();
    res.json(campaigns);
  } catch (err) {
    console.error("Error fetching campaigns:", err);
    res.status(500).json({ message: "Failed to fetch campaigns" });
  }
});

export default router;
