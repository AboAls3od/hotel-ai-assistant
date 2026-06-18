import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, MessageSquare, ArrowRight, LogOut, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUser, signOut } from "@/lib/auth/mock-auth";

export const Route = createFileRoute("/choice")({
  ssr: false,
  beforeLoad: () => {
    if (typeof window !== "undefined" && !getUser()) {
      throw redirect({ to: "/auth" });
    }
  },
  head: () => ({
    meta: [{ title: "Choose your workspace — Aurelia" }],
  }),
  component: ChoicePage,
});

function ChoicePage() {
  const navigate = useNavigate();
  const user = getUser();

  function handleSignOut() {
    signOut();
    navigate({ to: "/" });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.55_0.18_260/0.3),transparent_60%)] blur-3xl" />
      </div>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.78_0.14_85)] to-[oklch(0.55_0.18_260)]">
            <Sparkles className="h-4 w-4 text-background" />
          </div>
          <span className="font-display text-lg font-semibold">Aurelia</span>
        </Link>
        <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-muted-foreground">
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </Button>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-10 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-sm text-muted-foreground">
            Welcome back{user?.name ? `, ${user.name}` : ""}.
          </div>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Where would you like to go?
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Choose a workspace to begin. Your Copilot is ready when you are.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Active: Copilot */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            onClick={() => navigate({ to: "/copilot" })}
            className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-8 text-left backdrop-blur transition-all hover:-translate-y-0.5 hover:border-[oklch(0.78_0.14_85/0.6)] hover:shadow-2xl"
          >
            <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.78_0.14_85/0.35),transparent_60%)] blur-2xl transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[oklch(0.78_0.14_85)] to-[oklch(0.55_0.18_260)]">
                <MessageSquare className="h-5 w-5 text-background" />
              </div>
              <div className="mb-1 text-xs uppercase tracking-wider text-[oklch(0.92_0.12_90)]">Recommended</div>
              <h3 className="font-display text-2xl font-semibold">Admin Copilot Chatbot</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Chat with your AI analyst. Sentiment, trends, complaints, and action plans across
                every guest signal.
              </p>
              <div className="mt-8 flex items-center text-sm font-medium">
                Open Copilot
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </motion.button>

          {/* Coming soon placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="relative overflow-hidden rounded-3xl border border-dashed border-border/60 bg-card/20 p-8 text-left"
          >
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-muted/40 text-muted-foreground">
              <Lock className="h-5 w-5" />
            </div>
            <div className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">Coming soon</div>
            <h3 className="font-display text-2xl font-semibold text-muted-foreground">Operations Workspace</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Live property ops, staffing, and SLA tracking — joined to your Copilot insights.
            </p>
            <div className="mt-8 text-sm text-muted-foreground">Available in the next release</div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
