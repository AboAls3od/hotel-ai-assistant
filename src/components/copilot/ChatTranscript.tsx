import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserMessage } from "./UserMessage";
import { AssistantMessage } from "./AssistantMessage";
import { TypingIndicator } from "./TypingIndicator";
import { SmartSuggestions } from "./SmartSuggestions";
import type { ChatMessage } from "@/lib/copilot/types";
import type { ChatStatus } from "@/hooks/use-copilot-chat";

export function ChatTranscript({
  messages,
  status,
  onSuggestion,
  onRegenerate,
}: {
  messages: ChatMessage[];
  status: ChatStatus;
  onSuggestion: (text: string) => void;
  onRegenerate: () => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, status]);

  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant" && !m.streaming);
  const showSuggestions = status === "idle" && lastAssistant?.suggestions?.length;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 md:px-6">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => {
            const isLast = i === messages.length - 1;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mb-6"
              >
                {m.role === "user" ? (
                  <UserMessage message={m} />
                ) : (
                  <AssistantMessage
                    message={m}
                    isStreaming={!!m.streaming && status === "streaming"}
                    isThinking={!!m.streaming && status === "submitted"}
                    onRegenerate={isLast ? onRegenerate : undefined}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {status === "submitted" && (
          <div className="mb-6">
            <TypingIndicator />
          </div>
        )}

        {showSuggestions && lastAssistant?.suggestions && (
          <SmartSuggestions
            suggestions={lastAssistant.suggestions}
            onPick={onSuggestion}
          />
        )}

        <div ref={endRef} />
      </div>
    </div>
  );
}
