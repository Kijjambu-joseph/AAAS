import { createFileRoute } from "@tanstack/react-router";
import { SupportPage } from "@/components/SupportPage";

export const Route = createFileRoute("/credit/support")({
  component: () => <SupportPage role="credit-officer" />,
  head: () => ({
    meta: [
      { title: "Credit Officer Support | Centenary Bank AAAS" },
      { name: "description", content: "Allocation engine guides, service desk contacts and ticketing for Credit Officers." },
      { property: "og:title", content: "Credit Officer Support | Centenary Bank AAAS" },
      { property: "og:description", content: "Guides, contacts and ticketing for Credit Officers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
