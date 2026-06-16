import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, RefreshCcw, ThumbsUp, ThumbsDown, Share2, Check } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { AssistantCards } from "./AssistantCards";
import { AiThinkingState } from "./AiThinkingState";
import type { ChatMessage } from "@/lib/copilot/types";
import avatarImg from "@/assets/copilot-avatar.png";
import { cn } from "@/lib/utils";

export function AssistantMessage({
  message,
  isStreaming,
  isThinking,
  onRegenerate,
}: {
  message: ChatMessage;
  isStreaming: boolean;
  isThinking: boolean;
  onRegenerate?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy");
    }
  };

  return (
    <div className="flex gap-3">
      <div className="relative h-9 w-9 shrink-0">
        <div className="absolute inset-0 rounded-xl bg-gradient-brand" />
        <img
          src={avatarImg}
          alt=""
          aria-hidden
          className="absolute inset-0 h-9 w-9 rounded-xl object-cover p-1.5"
        />
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-background" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="text-xs font-semibold tracking-tight">Aurelia Copilot</span>
          <span className="text-[11px] text-muted-foreground">Guest Intelligence</span>
        </div>

        {isThinking && <AiThinkingState />}

        {message.text && (
          <div className="prose prose-sm prose-invert max-w-none text-[14px] leading-relaxed text-foreground prose-headings:font-display prose-headings:tracking-tight prose-strong:text-foreground prose-strong:font-semibold prose-p:my-2 prose-ul:my-2">
            <ReactMarkdown>{message.text}</ReactMarkdown>
            {isStreaming && (
              <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-foreground/70" />
            )}
          </div>
        )}

        {!isStreaming && !isThinking && message.cards && message.cards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-4 space-y-3"
          >
            <AssistantCards cards={message.cards} />
          </motion.div>
        )}

        {!isStreaming && !isThinking && message.citations && message.citations.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Sources</span>
            {message.citations.map((c) => (
              <span
                key={c.label}
                className="rounded-full border border-border/60 bg-card/50 px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {c.label} · {c.source}
              </span>
            ))}
          </div>
        )}

        {!isStreaming && !isThinking && (
          <div className="mt-3 flex items-center gap-0.5 text-muted-foreground">
            <ActionBtn onClick={copy} label={copied ? "Copied" : "Copy"}>
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </ActionBtn>
            {onRegenerate && (
              <ActionBtn onClick={onRegenerate} label="Regenerate">
                <RefreshCcw className="h-3.5 w-3.5" />
              </ActionBtn>
            )}
            <ActionBtn
              onClick={() => {
                setFeedback("up");
                toast.success("Thanks for the feedback");
              }}
              label="Like"
              active={feedback === "up"}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </ActionBtn>
            <ActionBtn
              onClick={() => {
                setFeedback("down");
                toast("Noted — we'll improve");
              }}
              label="Dislike"
              active={feedback === "down"}
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </ActionBtn>
            <ActionBtn onClick={() => toast("Share link copied")} label="Share">
              <Share2 className="h-3.5 w-3.5" />
            </ActionBtn>
          </div>
        )}
      </div>
    </div>
  );
}

function ActionBtn({
  children,
  label,
  onClick,
  active,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-foreground",
        active && "text-gold",
      )}
    >
      {children}
    </button>
  );
}
