import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";

export function SmartSuggestions({
  suggestions,
  onPick,
}: {
  suggestions: string[];
  onPick: (text: string) => void;
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-2 pl-12">
      {suggestions.map((s, i) => (
        <motion.button
          key={s}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * i, duration: 0.3 }}
          whileHover={{ y: -1 }}
          onClick={() => onPick(s)}
          className="group inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs text-foreground backdrop-blur transition-colors hover:border-gold/50 hover:bg-card"
        >
          <Sparkle className="h-3 w-3 text-gold" />
          {s}
        </motion.button>
      ))}
    </div>
  );
}
