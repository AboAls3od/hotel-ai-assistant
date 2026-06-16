import { motion } from "framer-motion";
import {
  MessageSquareWarning,
  TrendingDown,
  Repeat,
  Lightbulb,
  Building2,
  LineChart,
} from "lucide-react";
import welcomeImg from "@/assets/copilot-welcome.jpg";

const PROMPTS = [
  { icon: MessageSquareWarning, title: "Analyze guest complaints", subtitle: "From this week, grouped by theme" },
  { icon: TrendingDown, title: "Summarize negative reviews", subtitle: "Across all booking channels" },
  { icon: Repeat, title: "Identify recurring service issues", subtitle: "Trailing 30 days" },
  { icon: Lightbulb, title: "Generate improvement recommendations", subtitle: "Prioritized action plan" },
  { icon: Building2, title: "Compare hotel branches", subtitle: "Sentiment & CSAT by property" },
  { icon: LineChart, title: "Predict guest satisfaction trends", subtitle: "Next 4 weeks forecast" },
];

export function WelcomeScreen({ onPrompt }: { onPrompt: (text: string) => void }) {
  return (
    <div className="relative flex flex-1 items-start justify-center overflow-y-auto px-4 py-10 md:py-16">
      <div className="mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mb-10 overflow-hidden rounded-3xl border border-border/60 glass-panel"
        >
          <img
            src={welcomeImg}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="relative px-6 py-10 md:px-10 md:py-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Aurelia Copilot · v2.4
            </span>
            <h1 className="mt-5 font-display text-3xl font-bold tracking-tight md:text-[40px] md:leading-[1.1]">
              How can I help improve your{" "}
              <span className="gold-text">guest experience</span> today?
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
              Ask about reviews, complaints, satisfaction trends, or hotel performance.
              I'll surface signals and turn them into action.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2">
          {PROMPTS.map((p, i) => (
            <motion.button
              key={p.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 + i * 0.04, ease: "easeOut" }}
              whileHover={{ y: -2 }}
              onClick={() => onPrompt(p.title)}
              className="group flex items-start gap-3 rounded-2xl border border-border/60 bg-card/60 p-4 text-left backdrop-blur-xl transition-colors hover:border-border hover:bg-card"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-foreground transition-colors group-hover:bg-gradient-brand group-hover:text-primary-foreground">
                <p.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold tracking-tight">{p.title}</div>
                <div className="mt-0.5 truncate text-[12px] text-muted-foreground">
                  {p.subtitle}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
