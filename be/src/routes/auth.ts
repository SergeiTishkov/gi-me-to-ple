import { Router } from "express";
import { ethers } from "ethers";
import { crowdfundingDbClient } from "../dbClient";
import { User } from "@gi-me-to-ple/shared/types/User";

// Extend session type to include address
declare module "express-session" {
  interface SessionData {
    address?: string;
  }
}

const router = Router();

const nonces: Record<string, string> = {};

router.get("/nonce", (req, res) => {
  const { address } = req.query;
  if (!address || typeof address !== "string") {
    res.status(400).json({ message: "Missing or invalid address" });
    return;
  }
  const nonce = Math.floor(Math.random() * 1e16).toString();
  nonces[address.toLowerCase()] = nonce;
  res.json({ nonce });
});

router.post("/verify", async (req, res) => {
  const { address, signature } = req.body;
  if (!address || !signature) {
    res.status(400).json({ message: "Missing address or signature" });
    return;
  }
  const nonce = nonces[address.toLowerCase()];
  if (!nonce) {
    res.status(400).json({ message: "Nonce not found" });
    return;
  }
  try {
    const recovered = ethers.verifyMessage(nonce, signature);
    if (recovered.toLowerCase() !== address.toLowerCase()) {
      res.status(401).json({ message: "Signature verification failed" });
      return;
    }
    if (req.session) {
      req.session.address = address;
    }
    
    delete nonces[address.toLowerCase()];
    
    // Store user in MongoDB if not exists
    const usersCollection = crowdfundingDbClient.collection<User>("users");

    const userDoc = await usersCollection.findOne({ address: address.toLowerCase() });

    if (!userDoc) {
      const newUser: User = {
        address: address.toLowerCase(),
        createdAt: new Date(),
      };
      await usersCollection.insertOne(newUser);
    }

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ message: "Invalid signature" });
  }
});

router.get("/me", async (req, res) => {
  if (req.session && req.session.address) {
    // Lookup user in MongoDB
    const usersCollection = crowdfundingDbClient.collection<User>("users");
    const userDoc = await usersCollection.findOne({ address: req.session.address.toLowerCase() });
    if (userDoc) {
      res.json(userDoc);
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

export default router;
