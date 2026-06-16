import type { AssistantPayload, ResponseCard } from "./types";

type Intent =
  | "complaints"
  | "negative"
  | "issues"
  | "improve"
  | "compare"
  | "predict"
  | "executive"
  | "root-cause"
  | "general";

function detectIntent(prompt: string): Intent {
  const p = prompt.toLowerCase();
  if (/(complain|complaint|issue|problem)/.test(p)) return "complaints";
  if (/(negative|bad review|low rating)/.test(p)) return "negative";
  if (/(recurring|repeat|pattern)/.test(p)) return "issues";
  if (/(improve|recommend|action|fix)/.test(p)) return "improve";
  if (/(compare|branch|property|versus|vs )/.test(p)) return "compare";
  if (/(predict|forecast|trend|future)/.test(p)) return "predict";
  if (/(executive|report|summary)/.test(p)) return "executive";
  if (/(root cause|why|reason)/.test(p)) return "root-cause";
  return "general";
}

function trendPoints(base: number, swing: number, n = 8): { label: string; value: number }[] {
  return Array.from({ length: n }, (_, i) => {
    const v = base + Math.sin(i / 1.4) * swing + (Math.random() - 0.5) * swing * 0.4;
    return { label: `W${i + 1}`, value: Math.round(v * 10) / 10 };
  });
}

export function buildResponse(prompt: string): AssistantPayload {
  const intent = detectIntent(prompt);

  const sentiment: ResponseCard = {
    type: "sentiment",
    title: "Guest sentiment · last 7 days",
    positive: 64,
    neutral: 22,
    negative: 14,
    sample: 1284,
  };

  const insights: ResponseCard = {
    type: "insights",
    title: "Key signals",
    insights: [
      { label: "Housekeeping complaints", delta: 18, detail: "Driven by Floors 4–6" },
      { label: "Breakfast satisfaction", delta: -12, detail: "Buffet rotation feedback" },
      { label: "Staff friendliness", delta: 9, detail: "Front office training paying off" },
      { label: "Check-in wait time", delta: 6, detail: "Peak 17:00–19:00" },
    ],
  };

  const actionPlan: ResponseCard = {
    type: "actionPlan",
    title: "Recommended action plan",
    actions: [
      { title: "Reinforce housekeeping QA on Floors 4–6", priority: "high", department: "Housekeeping", owner: "M. Laurent" },
      { title: "Refresh breakfast menu rotation weekly", priority: "high", department: "F&B", owner: "S. Okada" },
      { title: "Add mobile check-in for elite tier", priority: "medium", department: "Front Office" },
      { title: "Publish staff recognition wall in lobby", priority: "low", department: "HR" },
    ],
  };

  const trend: ResponseCard = {
    type: "trend",
    title: "Guest satisfaction index",
    metric: "CSAT",
    growth: 4.2,
    data: trendPoints(82, 4),
  };

  const map: Record<Intent, { markdown: string; cards: ResponseCard[]; suggestions: string[] }> = {
    complaints: {
      markdown:
        "I reviewed **1,284 guest signals** from the past 7 days across reviews, surveys, and in-stay messages. Complaints are concentrated in **Housekeeping** and **Breakfast service**, with a smaller cluster around **evening check-in waits**.",
      cards: [insights, actionPlan],
      suggestions: ["Show root cause analysis", "Identify affected departments", "Generate executive report"],
    },
    negative: {
      markdown:
        "Negative reviews this week cluster around three themes. The strongest signal is **housekeeping consistency** on higher floors, followed by **breakfast variety** and a long tail on **Wi-Fi reliability in suites**.",
      cards: [sentiment, insights],
      suggestions: ["Compare with previous month", "Suggest corrective actions", "Forecast future satisfaction"],
    },
    issues: {
      markdown:
        "Three recurring service issues stand out across the last 30 days. Each has appeared in **3+ consecutive weeks**, suggesting a process gap rather than isolated incidents.",
      cards: [insights, actionPlan],
      suggestions: ["Show root cause analysis", "Generate executive report"],
    },
    improve: {
      markdown:
        "Here is a prioritized improvement plan based on your strongest signals. Tackling the two **high-priority** items should lift CSAT by an estimated **3.1 pts** within four weeks.",
      cards: [actionPlan, trend],
      suggestions: ["Forecast future satisfaction", "Identify affected departments"],
    },
    compare: {
      markdown:
        "Across your portfolio, **Aurelia Paris** leads on staff sentiment while **Aurelia Dubai Marina** outperforms on amenities. **Aurelia Tokyo Ginza** is the strongest on consistency.",
      cards: [trend, insights],
      suggestions: ["Compare with previous month", "Generate executive report"],
    },
    predict: {
      markdown:
        "Based on the current trajectory and seasonality, projected **CSAT for next 4 weeks** is **86.3 ± 1.8**. The main downside risk is the breakfast theme; closing it lifts the forecast by ~2 pts.",
      cards: [trend, actionPlan],
      suggestions: ["Show root cause analysis", "Suggest corrective actions"],
    },
    executive: {
      markdown:
        "## Executive summary\n\n- **Overall sentiment** is healthy at **64% positive**, up **4.2 pts** WoW.\n- Two themes need attention this week: **housekeeping consistency** and **breakfast variety**.\n- Recommended actions are scoped and assigned below.",
      cards: [sentiment, insights, actionPlan, trend],
      suggestions: ["Export as PDF", "Identify affected departments"],
    },
    "root-cause": {
      markdown:
        "Root-cause analysis on the housekeeping spike points to a **rotation change introduced 12 days ago** on Floors 4–6. The same crew is also covering turnover for late check-outs, creating a queueing effect after 14:00.",
      cards: [insights, actionPlan],
      suggestions: ["Suggest corrective actions", "Generate executive report"],
    },
    general: {
      markdown:
        "Here is a quick read on the property right now. Sentiment is **trending up**, with two themes worth attention. Want me to draft an action plan or compare against last month?",
      cards: [sentiment, trend],
      suggestions: ["Analyze guest complaints from this week", "Generate executive report", "Compare with previous month"],
    },
  };

  const r = map[intent];
  return {
    markdown: r.markdown,
    cards: r.cards,
    suggestions: r.suggestions,
    citations: [
      { label: "Booking.com reviews", source: "1,284 records" },
      { label: "In-house surveys", source: "342 responses" },
    ],
  };
}

// Async generator that streams the markdown chunk-by-chunk
export async function* streamMarkdown(markdown: string, signal?: AbortSignal) {
  const tokens = markdown.split(/(\s+)/);
  for (const t of tokens) {
    if (signal?.aborted) return;
    await new Promise((r) => setTimeout(r, 18 + Math.random() * 30));
    yield t;
  }
}
