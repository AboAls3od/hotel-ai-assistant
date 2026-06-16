# Admin Copilot Chatbot — Build Plan

A premium, AI-first chat workspace for hotel managers to "talk to" their guest feedback. Single ongoing conversation, persisted in browser localStorage, with mocked streaming AI responses that render rich hospitality cards (sentiment, insights, action plan, trends). Built on the existing TanStack Start stack.

## Stack & foundations

- TanStack Start + React 19 + TypeScript (existing).
- Tailwind v4 tokens in `src/styles.css` (no `tailwind.config.js`).
- shadcn/ui (already installed) + AI Elements (`conversation`, `message`, `prompt-input`, `shimmer`, `tool`) for the chat surface.
- Framer Motion for micro-interactions (typing dots, message enter, card reveal, success pulses).
- `react-markdown` for AI message rendering.
- Recharts (already present) for the Trend card.
- Fonts: Inter + a display face loaded via `<link>` in `__root.tsx` head (no CSS URL `@import`).

## Design system (added to `src/styles.css`)

Dark-first, with a clean light mode. Semantic tokens only — no hardcoded colors in components.

- Brand: `--primary 222 47% 11%` (#0F172A), `--brand-blue 217 91% 60%` (#2563EB), `--brand-gold 44 65% 52%` (#D4AF37).
- Status: success #22C55E, warning #F59E0B, error #EF4444.
- Surfaces: deep charcoal bg, layered glass surfaces (`--surface`, `--surface-elevated`, `--surface-glass` with backdrop-blur), hairline borders, soft inner highlights.
- Gradients/shadows: `--gradient-brand` (navy→blue), `--gradient-gold` (subtle gold rim for accents), `--shadow-elevated`, `--shadow-glow`.
- Typography scale: H1 / H2 / H3 / body / caption with Inter; display weight for greeting.
- Radius: `--radius: 1rem` for cards, `1.25rem` for message bubbles.

## Routes

- `src/routes/index.tsx` → redirects to `/copilot`.
- `src/routes/copilot.tsx` → the full-screen Copilot workspace (single conversation, no sidebar analytics, no dashboard).
- Root `__root.tsx`: head metadata (title, description, OG), font `<link>` tags, keep `<Outlet />`.

## Components (`src/components/copilot/`)

- `CopilotHeader` — hotel logo mark, property selector (Popover + Command), AI status pill ("Online" / animated "Analyzing…"), conversation title (editable inline), New Chat, notifications bell, profile menu.
- `WelcomeScreen` — large greeting "How can I help improve your guest experience today?", subtle hospitality-themed SVG/illustration accent (generated asset), grid of 6 suggested-prompt cards with icon + title + subtle hover lift.
- `ChatTranscript` — wraps AI Elements `Conversation` / `ConversationContent` / `ConversationScrollButton`; renders welcome state when empty, message list otherwise; auto-scroll, message enter animation.
- `UserMessage` — right-aligned bubble, brand gradient bg, high-contrast foreground.
- `AssistantMessage` — left-aligned, AI avatar (gold-rim mark), no background by default, markdown via `MessageResponse` + `react-markdown`, citation chips, message actions (copy / regenerate / like / dislike / share / export) on hover.
- `AssistantCards` — renderer that maps a typed `cards[]` payload to:
  - `SentimentCard` — Positive/Neutral/Negative % with stacked bar + animated counters.
  - `InsightsCard` — list of insight rows with delta chips (↑/↓ %, color-coded).
  - `ActionPlanCard` — grouped by priority (High/Medium/Low) with colored priority dots and owner/department tags.
  - `TrendCard` — Recharts line/area chart, period toggle (7d / 30d / 90d), growth %.
- `SmartSuggestions` — contextual follow-up chips rendered under the last assistant message.
- `Composer` — AI Elements `PromptInput` with `PromptInputTextarea` + `PromptInputFooter`; left footer holds attach + voice + quick-actions; right footer holds `PromptInputSubmit` (icon-sm). Multiline, Enter to send, Shift+Enter newline, character hint, focus management per chat-UI contract.
- `TypingIndicator` — Framer Motion 3-dot pulse + `Shimmer` "Analyzing guest signals…".
- `AiThinkingState` — collapsible "steps" panel (e.g. "Fetching reviews → Clustering themes → Scoring sentiment") shown while streaming.
- `ExportModal` — shadcn Dialog: PDF / CSV / Markdown / Copy link (mock actions, toast on success).
- `ConversationHistoryDrawer` — Sheet listing prior turns within the single conversation with jump-to-message (no multi-thread switching, matching the chosen single-conversation shape).

## State, persistence & mock engine

- `src/lib/copilot/storage.ts` — load/save a single `UIMessage[]` (AI SDK shape) to `localStorage` under `copilot:conversation:v1`, guarded by `typeof window !== "undefined"`; New Chat clears it.
- `src/lib/copilot/mock-engine.ts` — deterministic-ish mock responder:
  - Detects intent from the prompt (complaints, sentiment, comparison, trends, action plan, executive report, etc.) via keyword routing.
  - Returns a structured payload: `{ markdown, cards: Array<SentimentCard|InsightsCard|ActionPlanCard|TrendCard>, suggestions: string[], citations: Array<{label,source}> }`.
  - Streams tokens via an async generator with realistic pacing so the UI exercises the streaming/typing states.
  - Seeded sample hotel data (properties, weekly review snippets, department breakdowns) lives in `src/lib/copilot/sample-data.ts`.
- `useCopilotChat` hook wraps the message list, streaming status (`idle | submitted | streaming`), send/regenerate/stop, and persistence. No real network calls.

## Micro-interactions

- Framer Motion: message fade+rise on mount, card stagger reveal, suggestion chip hover, send-button success pulse.
- Streaming: token-by-token append, caret blink at tail; smooth scroll pinning.
- Loading skeletons for cards while their data "computes".
- Reduced-motion respected via `prefers-reduced-motion`.

## Accessibility & responsiveness

- Full keyboard support, focus rings on all interactive elements, ARIA roles on chat log / messages / status.
- Composer textarea auto-focuses on load, after send, after New Chat.
- Responsive: header collapses controls into an overflow menu on mobile; cards stack; suggestions become a horizontal scroll row.
- Contrast verified for both themes; user bubble uses `primary` / `primary-foreground` pair.

## Assets

- Generate one premium hospitality-themed hero/illustration accent for the welcome screen (`src/assets/copilot-welcome.png`).
- Generate a square Copilot avatar mark with subtle gold rim (`src/assets/copilot-avatar.png`).

## Technical notes

```text
src/
  routes/
    index.tsx              # redirect → /copilot
    copilot.tsx            # full-screen workspace
  components/copilot/
    CopilotHeader.tsx
    WelcomeScreen.tsx
    ChatTranscript.tsx
    UserMessage.tsx
    AssistantMessage.tsx
    AssistantCards/
      SentimentCard.tsx
      InsightsCard.tsx
      ActionPlanCard.tsx
      TrendCard.tsx
    SmartSuggestions.tsx
    Composer.tsx
    TypingIndicator.tsx
    AiThinkingState.tsx
    ExportModal.tsx
    ConversationHistoryDrawer.tsx
  lib/copilot/
    storage.ts
    mock-engine.ts
    sample-data.ts
    types.ts
  hooks/
    use-copilot-chat.ts
  assets/
    copilot-welcome.png
    copilot-avatar.png
```

- AI Elements installed via `bunx ai-elements@latest add conversation message prompt-input shimmer tool`.
- All color/gradient/shadow values come from tokens in `src/styles.css` — no `text-white` / `bg-[#…]` in components.
- No backend, no Cloud, no auth enabled. Pure frontend + localStorage.

## Out of scope (per your brief)

- No dashboard, no analytics sidebar, no real AI calls, no multi-tenant data layer.

## Acceptance check before finishing

- `/copilot` loads with the welcome state; suggested prompts send a message.
- Sending shows optimistic user bubble + typing indicator, then streams markdown + at least one rich card depending on intent.
- Smart follow-up suggestions appear under the latest assistant message.
- Refresh restores the conversation; New Chat clears it.
- Composer stays focused through send / stream / new chat.
- Looks premium in both dark and light themes; no Sparkles icon as brand identity.
