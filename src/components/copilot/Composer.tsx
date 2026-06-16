import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { ArrowUp, Mic, Paperclip, Square, Zap } from "lucide-react";
import { motion } from "framer-motion";
import type { ChatStatus } from "@/hooks/use-copilot-chat";
import { cn } from "@/lib/utils";

const QUICK_ACTIONS = [
  "Executive report",
  "Root cause analysis",
  "Compare with last month",
];

type ComposerHandle = HTMLTextAreaElement;

export const Composer = forwardRef<ComposerHandle, {
  onSend: (text: string) => void;
  onStop: () => void;
  status: ChatStatus;
  isEmpty: boolean;
}>(function Composer({ onSend, onStop, status, isEmpty }, ref) {
  const [value, setValue] = useState("");
  const taRef = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle(ref, () => taRef.current as HTMLTextAreaElement);

  const busy = status !== "idle";

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (busy || !value.trim()) return;
    onSend(value);
    setValue("");
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative z-10 shrink-0 px-4 pb-5 pt-2 md:px-6">
      <div className="mx-auto w-full max-w-3xl">
        {/* Quick actions row */}
        {!isEmpty && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {QUICK_ACTIONS.map((q) => (
              <button
                key={q}
                onClick={() => onSend(q)}
                disabled={busy}
                className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-card/40 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-border hover:bg-card hover:text-foreground disabled:opacity-50"
              >
                <Zap className="h-3 w-3 text-gold" />
                {q}
              </button>
            ))}
          </div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          layout
          className="group rounded-2xl border border-border/60 bg-card/70 p-2 shadow-elevated backdrop-blur-xl transition-colors focus-within:border-border focus-within:gold-ring"
        >
          <textarea
            ref={taRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
            placeholder="Ask about guest reviews, complaints, satisfaction trends, or hotel performance…"
            className="block max-h-48 w-full resize-none bg-transparent px-3 py-2 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
            style={{
              minHeight: 44,
              height: Math.min(
                192,
                Math.max(44, (value.split("\n").length || 1) * 22 + 22),
              ),
            }}
          />
          <div className="mt-1 flex items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-0.5 text-muted-foreground">
              <IconBtn label="Attach"><Paperclip className="h-4 w-4" /></IconBtn>
              <IconBtn label="Voice"><Mic className="h-4 w-4" /></IconBtn>
              <span className="ml-1 hidden text-[11px] sm:inline">
                <kbd className="rounded border border-border/60 bg-background/60 px-1.5 py-0.5 font-mono text-[10px]">⇧ Enter</kbd>
                <span className="ml-1">for newline</span>
              </span>
            </div>
            {busy ? (
              <button
                type="button"
                onClick={onStop}
                aria-label="Stop"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-destructive text-destructive-foreground transition-transform hover:scale-105"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!value.trim()}
                aria-label="Send"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-elevated transition-all",
                  value.trim() ? "opacity-100 hover:scale-105" : "cursor-not-allowed opacity-40",
                )}
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.form>
        <div className="mt-2 text-center text-[10.5px] text-muted-foreground">
          Aurelia Copilot can make mistakes — verify critical decisions against source data.
        </div>
      </div>
    </div>
  );
});

function IconBtn({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-accent hover:text-foreground"
    >
      {children}
    </button>
  );
}
