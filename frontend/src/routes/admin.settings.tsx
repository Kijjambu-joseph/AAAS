import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/SettingsPage";

export const Route = createFileRoute("/admin/settings")({
  component: () => <SettingsPage role="super-admin" />,
  head: () => ({
    meta: [
      { title: "Admin Settings | Centenary Bank AAAS" },
      { name: "description", content: "Configure profile, notification, security and workspace preferences for the Super Admin console." },
      { property: "og:title", content: "Admin Settings | Centenary Bank AAAS" },
      { property: "og:description", content: "Super Admin workspace preferences and security controls." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
