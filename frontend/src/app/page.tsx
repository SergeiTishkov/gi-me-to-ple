import { CrowdfundingRequest } from "@/types/CrowdfundingRequest";
import { HomePage } from "./HomePage";

async function getRequests(): Promise<CrowdfundingRequest[]> {
  try {
    const res = await fetch("http://localhost:3000/api/requests", {
      cache: "no-store", // disables caching for SSR
    });
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

export default async function HomePageRenderWrapper() {
  const requests = await getRequests();

  return <HomePage requests={requests}></HomePage>
}
