import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

const mockRequests = [
  {
    id: 1,
    title: "Help fund a solar-powered water pump",
    timer: "3d 14h left",
    gathered: 120,
    goal: 300,
    description: "Providing clean water to a rural village in Kenya.",
  },
  {
    id: 2,
    title: "Web3 educational app for kids",
    timer: "5d 3h left",
    gathered: 980,
    goal: 1500,
    description: "Making blockchain learning fun and accessible for children.",
  },
  {
    id: 3,
    title: "Community NFT art gallery",
    timer: "1d 23h left",
    gathered: 450,
    goal: 600,
    description: "Support local digital artists and showcase their work.",
  },
  {
    id: 4,
    title: "Open-source DAO management tool",
    timer: "6d 10h left",
    gathered: 700,
    goal: 1000,
    description: "Easy governance tools for decentralized organizations.",
  },
  {
    id: 5,
    title: "Crypto donations for Gaza hospitals",
    timer: "8h left",
    gathered: 2100,
    goal: 2500,
    description: "Emergency medical support through direct crypto aid.",
  },
  {
    id: 6,
    title: "Reforestation with NFTs",
    timer: "2d 8h left",
    gathered: 1300,
    goal: 2000,
    description: "Plant trees and get proof-of-impact NFTs in return.",
  },
  {
    id: 7,
    title: "Decentralized mental health support app",
    timer: "4d 6h left",
    gathered: 860,
    goal: 1200,
    description: "Accessible, anonymous, and funded by the crowd.",
  },
];

app.get("/api/requests", (req, res) => {
  res.json(mockRequests);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
