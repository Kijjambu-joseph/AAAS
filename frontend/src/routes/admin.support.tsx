import { createFileRoute } from "@tanstack/react-router";
import { SupportPage } from "@/components/SupportPage";

export const Route = createFileRoute("/admin/support")({
  component: () => <SupportPage role="super-admin" />,
  head: () => ({
    meta: [
      { title: "Admin Support Centre | Centenary Bank AAAS" },
      { name: "description", content: "Knowledge base, service desk contacts and ticketing for Super Admin users of the recovery system." },
      { property: "og:title", content: "Admin Support Centre | Centenary Bank AAAS" },
      { property: "og:description", content: "Guides, contacts and ticketing for Super Admins." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
