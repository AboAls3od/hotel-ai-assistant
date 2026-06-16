import type { ChatMessage } from "@/lib/copilot/types";

export function UserMessage({ message }: { message: ChatMessage }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[78%] rounded-2xl rounded-br-md bg-gradient-brand px-4 py-2.5 text-sm leading-relaxed text-primary-foreground shadow-elevated">
        {message.text}
      </div>
    </div>
  );
}
