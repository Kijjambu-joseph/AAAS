import { createFileRoute } from "@tanstack/react-router";
import { SupportPage } from "@/components/SupportPage";

export const Route = createFileRoute("/officer/support")({
  component: () => <SupportPage role="loan-officer" />,
  head: () => ({
    meta: [
      { title: "Loan Officer Support | Centenary Bank AAAS" },
      { name: "description", content: "Case filing guides, service desk contacts and ticketing for Loan Officers." },
      { property: "og:title", content: "Loan Officer Support | Centenary Bank AAAS" },
      { property: "og:description", content: "Guides, contacts and ticketing for Loan Officers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
