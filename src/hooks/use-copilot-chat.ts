import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/copilot/types";
import { buildResponse, streamMarkdown } from "@/lib/copilot/mock-engine";
import { clearMessages, loadMessages, saveMessages } from "@/lib/copilot/storage";

export type ChatStatus = "idle" | "submitted" | "streaming";

function uid() {
  return `m_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function useCopilotChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const abortRef = useRef<AbortController | null>(null);

  // Hydrate once
  useEffect(() => {
    setMessages(loadMessages());
  }, []);

  // Persist on change (skip while streaming partial)
  useEffect(() => {
    if (status === "streaming") return;
    saveMessages(messages);
  }, [messages, status]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStatus("idle");
  }, []);

  const send = useCallback(async (text: string) => {
    const clean = text.trim();
    if (!clean) return;

    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      text: clean,
      createdAt: Date.now(),
    };

    const assistantId = uid();
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: "assistant",
      text: "",
      createdAt: Date.now(),
      streaming: true,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setStatus("submitted");

    const payload = buildResponse(clean);
    const controller = new AbortController();
    abortRef.current = controller;

    // Brief "thinking" pause before streaming
    await new Promise((r) => setTimeout(r, 650));
    if (controller.signal.aborted) return;
    setStatus("streaming");

    let acc = "";
    try {
      for await (const token of streamMarkdown(payload.markdown, controller.signal)) {
        acc += token;
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, text: acc } : m)),
        );
      }
    } catch {
      // ignore
    }

    setMessages((prev) =>
      prev.map((m) =>
        m.id === assistantId
          ? {
              ...m,
              text: payload.markdown,
              cards: payload.cards,
              suggestions: payload.suggestions,
              citations: payload.citations,
              streaming: false,
            }
          : m,
      ),
    );
    setStatus("idle");
    abortRef.current = null;
  }, []);

  const regenerate = useCallback(async () => {
    // Find last user message
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    // Remove last assistant
    setMessages((prev) => {
      const out = [...prev];
      for (let i = out.length - 1; i >= 0; i--) {
        if (out[i].role === "assistant") {
          out.splice(i, 1);
          break;
        }
      }
      return out;
    });
    await send(lastUser.text);
  }, [messages, send]);

  const newChat = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setStatus("idle");
    clearMessages();
  }, []);

  return { messages, status, send, stop, regenerate, newChat };
}
