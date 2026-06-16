import { useEffect, useRef, useState } from "react";
import { CopilotHeader } from "./CopilotHeader";
import { WelcomeScreen } from "./WelcomeScreen";
import { ChatTranscript } from "./ChatTranscript";
import { Composer } from "./Composer";
import { ExportModal } from "./ExportModal";
import { ConversationHistoryDrawer } from "./ConversationHistoryDrawer";
import { useCopilotChat } from "@/hooks/use-copilot-chat";

export function CopilotWorkspace() {
  const { messages, status, send, stop, regenerate, newChat } = useCopilotChat();
  const [exportOpen, setExportOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const composerRef = useRef<HTMLTextAreaElement>(null);

  // Focus composer on mount, after send, after new chat
  useEffect(() => {
    composerRef.current?.focus();
  }, []);
  useEffect(() => {
    if (status === "idle") composerRef.current?.focus();
  }, [status]);

  const handleSend = (text: string) => {
    void send(text);
    requestAnimationFrame(() => composerRef.current?.focus());
  };

  const handleNewChat = () => {
    newChat();
    requestAnimationFrame(() => composerRef.current?.focus());
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="relative flex h-screen flex-col bg-background text-foreground">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 aurora-bg opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <CopilotHeader
        onNewChat={handleNewChat}
        onOpenHistory={() => setHistoryOpen(true)}
        onExport={() => setExportOpen(true)}
        status={status}
        hasMessages={!isEmpty}
      />

      <main className="relative z-10 flex min-h-0 flex-1 flex-col">
        {isEmpty ? (
          <WelcomeScreen onPrompt={handleSend} />
        ) : (
          <ChatTranscript
            messages={messages}
            status={status}
            onSuggestion={handleSend}
            onRegenerate={regenerate}
          />
        )}

        <Composer
          ref={composerRef}
          onSend={handleSend}
          onStop={stop}
          status={status}
          isEmpty={isEmpty}
        />
      </main>

      <ExportModal open={exportOpen} onOpenChange={setExportOpen} />
      <ConversationHistoryDrawer
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        messages={messages}
      />
    </div>
  );
}
