import type { ChatMessage } from "./types";

const KEY = "copilot:conversation:v1";

export function loadMessages(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatMessage[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMessages(messages: ChatMessage[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(messages));
  } catch {
    // ignore quota errors
  }
}

export function clearMessages() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
