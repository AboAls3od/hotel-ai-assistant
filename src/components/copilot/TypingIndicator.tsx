import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand">
        <div className="flex h-2 items-end gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-primary-foreground"
              animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12 }}
            />
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-full bg-card/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
        <span className="relative z-10">Analyzing guest signals…</span>
        <span
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent"
          style={{ animation: "shimmer-slide 1.6s linear infinite" }}
        />
      </div>
    </div>
  );
}
