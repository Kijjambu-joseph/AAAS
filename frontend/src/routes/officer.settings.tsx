import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/SettingsPage";

export const Route = createFileRoute("/officer/settings")({
  component: () => <SettingsPage role="loan-officer" />,
  head: () => ({
    meta: [
      { title: "Loan Officer Settings | Centenary Bank AAAS" },
      { name: "description", content: "Manage case alerts, security and display preferences for the Loan Officer workspace." },
      { property: "og:title", content: "Loan Officer Settings | Centenary Bank AAAS" },
      { property: "og:description", content: "Loan Officer workspace preferences and alerts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
