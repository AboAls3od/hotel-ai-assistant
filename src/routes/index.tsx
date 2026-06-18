import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MessageSquare, BarChart3, ShieldCheck, Star } from "lucide-react";
import welcomeImg from "@/assets/copilot-welcome.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurelia — AI Copilot for Hotel Guest Intelligence" },
      {
        name: "description",
        content:
          "Aurelia turns guest feedback into action. A premium AI workspace for hoteliers — sentiment, trends, complaints, and decisive next steps.",
      },
      { property: "og:title", content: "Aurelia — AI Copilot for Hotel Guest Intelligence" },
      {
        property: "og:description",
        content:
          "Chat with an AI assistant trained on your guest feedback. Sentiment, trends, action plans — instantly.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.55_0.18_260/0.35),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,oklch(0.78_0.14_85/0.18),transparent_60%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,oklch(0.12_0.02_265/0.6))]" />
      </div>

      {/* Nav */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.78_0.14_85)] to-[oklch(0.55_0.18_260)] shadow-lg shadow-[oklch(0.55_0.18_260/0.35)]">
            <Sparkles className="h-4 w-4 text-background" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">Aurelia</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#why" className="hover:text-foreground transition-colors">Why Aurelia</a>
          <a href="#trust" className="hover:text-foreground transition-colors">Trust</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/auth">
            <Button variant="ghost" className="text-sm">Sign in</Button>
          </Link>
          <Link to="/auth">
            <Button className="bg-gradient-to-r from-[oklch(0.78_0.14_85)] to-[oklch(0.68_0.16_75)] text-background hover:opacity-90">
              Get started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pt-12 pb-24 lg:grid-cols-2 lg:items-center lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.14_85)]" />
            AI Copilot · Hospitality Edition
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Turn every guest{" "}
            <span className="bg-gradient-to-r from-[oklch(0.92_0.12_90)] via-[oklch(0.78_0.14_85)] to-[oklch(0.6_0.18_60)] bg-clip-text text-transparent">
              whisper
            </span>{" "}
            into a decision.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Aurelia is the AI workspace for hotel leaders. Chat your way through reviews, surveys
            and complaints — and walk away with sentiment, trends, and a ready-to-run action plan.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/auth">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-[oklch(0.78_0.14_85)] to-[oklch(0.68_0.16_75)] text-background hover:opacity-90"
              >
                Launch Copilot
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="border-border/60 bg-card/30 backdrop-blur">
                See how it works
              </Button>
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[oklch(0.78_0.14_85)] text-[oklch(0.78_0.14_85)]" />
              ))}
              <span className="ml-2">Trusted by luxury properties worldwide</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-[oklch(0.78_0.14_85/0.3)] to-[oklch(0.55_0.18_260/0.3)] blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 shadow-2xl backdrop-blur">
            <img
              src={welcomeImg}
              alt="Aurelia Copilot interface preview"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-border/60 bg-background/70 p-4 backdrop-blur">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.78_0.14_85)] to-[oklch(0.55_0.18_260)]">
                <Sparkles className="h-4 w-4 text-background" />
              </div>
              <div className="text-sm">
                <div className="font-medium">"Summarize last week's complaints by department."</div>
                <div className="text-xs text-muted-foreground">Aurelia · responding in real time</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12 max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Built for the people who run hospitality.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Four pillars that turn raw guest signals into the next decision your team will execute.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: MessageSquare,
              title: "Conversational Intelligence",
              body: "Ask anything across reviews, surveys and complaints. Get cited, structured answers in seconds.",
            },
            {
              icon: BarChart3,
              title: "Sentiment & Trends",
              body: "Detect emerging issues before they hit your scores. Track NPS, CSAT, and theme momentum.",
            },
            {
              icon: Sparkles,
              title: "Action Plans, Drafted",
              body: "Aurelia proposes prioritized next steps — by department, with owners and SLAs.",
            },
            {
              icon: ShieldCheck,
              title: "Enterprise-grade Trust",
              body: "Role-aware access, audit trail, and exports your GM and corporate can actually use.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur transition-colors hover:border-[oklch(0.78_0.14_85/0.5)]"
            >
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.78_0.14_85/0.25)] to-[oklch(0.55_0.18_260/0.25)] text-[oklch(0.92_0.12_90)]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="why" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-[oklch(0.2_0.04_265)] to-[oklch(0.14_0.03_265)] p-10 md:p-14">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.78_0.14_85/0.35),transparent_60%)] blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Your concierge for guest experience intelligence.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Spin up Aurelia in seconds. No setup, no spreadsheets — just a conversation that ends
              in action.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/auth">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[oklch(0.78_0.14_85)] to-[oklch(0.68_0.16_75)] text-background hover:opacity-90"
                >
                  Sign in to continue
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer id="trust" className="border-t border-border/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Aurelia Hospitality. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>SOC 2 · GDPR ready</span>
            <span>·</span>
            <span>Made for hoteliers</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
