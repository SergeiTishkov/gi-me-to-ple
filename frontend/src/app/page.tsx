import { HomePage } from "./Temp";
import { CrowdfundingRequest } from "@gi-me-to-ple/shared/types/CrowdfundingRequest";

const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || '';

async function getRequests(): Promise<CrowdfundingRequest[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/requests`, {
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
