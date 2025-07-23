import { Header } from "@/components/header";
import { CrowdfundingCampaign } from "@gi-me-to-ple/shared/types/CrowdfundingCampaign";

const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || "";

async function getCampaigns(): Promise<CrowdfundingCampaign[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/campaigns`, {
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
  const campaigns = await getCampaigns();

  return (
    <>
      <Header></Header>

      <main className="space-y-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-blue-800 rounded-xl p-4 shadow-lg space-y-2">
            <h2 className="text-lg font-semibold">{campaign.title}</h2>
            <p className="text-sm text-blue-300">⏱ {campaign.timer}</p>
            <p className="text-sm">
              <span className="font-medium">${campaign.gathered}</span> / ${campaign.goal}
            </p>
            <p className="text-sm text-blue-200">{campaign.description}</p>
          </div>
        ))}

        {campaigns.length === 0 && <p className="text-center text-blue-300">No campaigns available</p>}
      </main>
    </>
  );
}
