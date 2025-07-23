import { Header } from "@/components/header";
import { CrowdfundingRequest } from "@gi-me-to-ple/shared/types/CrowdfundingRequest";

const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || "";

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

  return (
    <>
      <Header></Header>

      <main className="space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="bg-blue-800 rounded-xl p-4 shadow-lg space-y-2">
            <h2 className="text-lg font-semibold">{req.title}</h2>
            <p className="text-sm text-blue-300">⏱ {req.timer}</p>
            <p className="text-sm">
              <span className="font-medium">${req.gathered}</span> / ${req.goal}
            </p>
            <p className="text-sm text-blue-200">{req.description}</p>
          </div>
        ))}

        {requests.length === 0 && <p className="text-center text-blue-300">No requests available</p>}
      </main>
    </>
  );
}
