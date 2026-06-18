import { createFileRoute, redirect } from "@tanstack/react-router";
import { CopilotWorkspace } from "@/components/copilot/CopilotWorkspace";
import { getUser } from "@/lib/auth/mock-auth";

export const Route = createFileRoute("/copilot")({
  ssr: false,
  beforeLoad: () => {
    if (typeof window !== "undefined" && !getUser()) {
      throw redirect({ to: "/auth" });
    }
  },
  head: () => ({
    meta: [
      { title: "Aurelia Copilot — Guest Intelligence" },
      {
        name: "description",
        content:
          "AI workspace for hotel managers: analyze guest reviews, surface complaints, and turn feedback into action plans.",
      },
    ],
  }),
  component: CopilotWorkspace,
});
