import { motion } from "framer-motion";
import { Check } from "lucide-react";

const STEPS = [
  "Fetching reviews",
  "Clustering themes",
  "Scoring sentiment",
  "Drafting insights",
];

export function AiThinkingState() {
  return (
    <div className="mb-3 rounded-2xl border border-border/60 bg-card/50 p-3 backdrop-blur">
      <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Reasoning
      </div>
      <ul className="space-y-1">
        {STEPS.map((s, i) => (
          <motion.li
            key={s}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.25 }}
            className="flex items-center gap-2 text-xs text-foreground/80"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold/20 text-gold">
              <Check className="h-3 w-3" />
            </span>
            {s}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
