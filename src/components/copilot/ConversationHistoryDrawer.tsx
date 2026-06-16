import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import type { ChatMessage } from "@/lib/copilot/types";
import { MessageSquare, User } from "lucide-react";

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

export function ConversationHistoryDrawer({
  open,
  onOpenChange,
  messages,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  messages: ChatMessage[];
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[360px] sm:w-[420px]">
        <SheetHeader>
          <SheetTitle>Conversation history</SheetTitle>
          <SheetDescription>
            Jump back to any turn in this Copilot session.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-2 overflow-y-auto pr-1">
          {messages.length === 0 && (
            <div className="rounded-xl border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground">
              No messages yet.
            </div>
          )}
          {messages.map((m) => (
            <button
              key={m.id}
              className="flex w-full items-start gap-3 rounded-xl border border-border/60 bg-card/50 p-3 text-left transition-colors hover:bg-card"
              onClick={() => {
                document.getElementById(m.id)?.scrollIntoView({ behavior: "smooth" });
                onOpenChange(false);
              }}
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent">
                {m.role === "user" ? <User className="h-3.5 w-3.5" /> : <MessageSquare className="h-3.5 w-3.5 text-gold" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {m.role === "user" ? "You" : "Copilot"}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{formatTime(m.createdAt)}</span>
                </div>
                <div className="mt-0.5 line-clamp-2 text-xs text-foreground/90">
                  {m.text || "…"}
                </div>
              </div>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
