export type Priority = "high" | "medium" | "low";

export type SentimentCard = {
  type: "sentiment";
  title: string;
  positive: number;
  neutral: number;
  negative: number;
  sample: number;
};

export type Insight = {
  label: string;
  delta: number; // percent, can be negative
  detail?: string;
};

export type InsightsCard = {
  type: "insights";
  title: string;
  insights: Insight[];
};

export type Action = {
  title: string;
  priority: Priority;
  department: string;
  owner?: string;
};

export type ActionPlanCard = {
  type: "actionPlan";
  title: string;
  actions: Action[];
};

export type TrendPoint = { label: string; value: number };

export type TrendCard = {
  type: "trend";
  title: string;
  metric: string;
  growth: number;
  data: TrendPoint[];
};

export type ResponseCard = SentimentCard | InsightsCard | ActionPlanCard | TrendCard;

export type Citation = { label: string; source: string };

export type AssistantPayload = {
  markdown: string;
  cards: ResponseCard[];
  suggestions: string[];
  citations: Citation[];
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  cards?: ResponseCard[];
  suggestions?: string[];
  citations?: Citation[];
  createdAt: number;
  streaming?: boolean;
};
