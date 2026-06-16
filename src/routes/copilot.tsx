import { createFileRoute } from "@tanstack/react-router";
import { CopilotWorkspace } from "@/components/copilot/CopilotWorkspace";

export const Route = createFileRoute("/copilot")({
  head: () => ({
    meta: [
      { title: "Aurelia Copilot — Guest Intelligence" },
      {
        name: "description",
        content:
          "AI workspace for hotel managers: analyze guest reviews, surface complaints, and turn feedback into action plans.",
      },
      { property: "og:title", content: "Aurelia Copilot — Guest Intelligence" },
      {
        property: "og:description",
        content: "Chat with an AI assistant trained on your guest feedback. Sentiment, trends, action plans — instantly.",
      },
    ],
  }),
  component: CopilotWorkspace,
});
