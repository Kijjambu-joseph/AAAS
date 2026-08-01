import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/SettingsPage";

export const Route = createFileRoute("/credit/settings")({
  component: () => <SettingsPage role="credit-officer" />,
  head: () => ({
    meta: [
      { title: "Credit Officer Settings | Centenary Bank AAAS" },
      { name: "description", content: "Manage allocation alerts, security and display preferences for the Credit Officer console." },
      { property: "og:title", content: "Credit Officer Settings | Centenary Bank AAAS" },
      { property: "og:description", content: "Credit Officer workspace preferences and alerts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
