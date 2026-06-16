import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import type {
  ResponseCard,
  SentimentCard as SentimentCardT,
  InsightsCard as InsightsCardT,
  ActionPlanCard as ActionPlanCardT,
  TrendCard as TrendCardT,
  Priority,
} from "@/lib/copilot/types";
import { cn } from "@/lib/utils";

export function AssistantCards({ cards }: { cards: ResponseCard[] }) {
  return (
    <div className="space-y-3">
      {cards.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 * i, ease: "easeOut" }}
        >
          {c.type === "sentiment" && <SentimentCard card={c} />}
          {c.type === "insights" && <InsightsCard card={c} />}
          {c.type === "actionPlan" && <ActionPlanCard card={c} />}
          {c.type === "trend" && <TrendCard card={c} />}
        </motion.div>
      ))}
    </div>
  );
}

function CardShell({
  title,
  children,
  accent,
}: {
  title: string;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl shadow-elevated">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <h3 className="text-[13px] font-semibold tracking-tight">{title}</h3>
        {accent && (
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{accent}</span>
        )}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function SentimentCard({ card }: { card: SentimentCardT }) {
  const total = card.positive + card.neutral + card.negative;
  const segs = [
    { label: "Positive", value: card.positive, color: "var(--success)" },
    { label: "Neutral", value: card.neutral, color: "var(--muted-foreground)" },
    { label: "Negative", value: card.negative, color: "var(--destructive)" },
  ];
  return (
    <CardShell title={card.title} accent={`${card.sample.toLocaleString()} signals`}>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
        {segs.map((s) => (
          <motion.div
            key={s.label}
            initial={{ width: 0 }}
            animate={{ width: `${(s.value / total) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ background: s.color }}
            className="h-full"
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {segs.map((s) => (
          <div key={s.label} className="rounded-xl border border-border/50 bg-background/50 p-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
              <span className="text-[11px] text-muted-foreground">{s.label}</span>
            </div>
            <div className="mt-1 font-display text-2xl font-bold tracking-tight">{s.value}%</div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function InsightsCard({ card }: { card: InsightsCardT }) {
  return (
    <CardShell title={card.title}>
      <ul className="divide-y divide-border/60">
        {card.insights.map((i) => {
          const up = i.delta >= 0;
          return (
            <li key={i.label} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <div className="text-sm font-medium">{i.label}</div>
                {i.detail && (
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{i.detail}</div>
                )}
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold",
                  up
                    ? "bg-success/15 text-success"
                    : "bg-destructive/15 text-destructive",
                )}
              >
                {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {up ? "+" : ""}
                {i.delta}%
              </div>
            </li>
          );
        })}
      </ul>
    </CardShell>
  );
}

const priorityStyles: Record<Priority, string> = {
  high: "bg-destructive/15 text-destructive",
  medium: "bg-warning/15 text-warning",
  low: "bg-success/15 text-success",
};

function ActionPlanCard({ card }: { card: ActionPlanCardT }) {
  return (
    <CardShell title={card.title} accent={`${card.actions.length} actions`}>
      <ul className="space-y-2">
        {card.actions.map((a) => (
          <li
            key={a.title}
            className="group flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-3 transition-colors hover:bg-background/70"
          >
            <span
              className={cn(
                "rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                priorityStyles[a.priority],
              )}
            >
              {a.priority}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium leading-tight">{a.title}</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">
                {a.department}
                {a.owner && <> · {a.owner}</>}
              </div>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

function TrendCard({ card }: { card: TrendCardT }) {
  const up = card.growth >= 0;
  return (
    <CardShell title={card.title} accent={card.metric}>
      <div className="flex items-end justify-between">
        <div>
          <div className="font-display text-3xl font-bold tracking-tight">
            {card.data[card.data.length - 1]?.value}
          </div>
          <div
            className={cn(
              "mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
              up ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive",
            )}
          >
            {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {up ? "+" : ""}
            {card.growth}% vs prior period
          </div>
        </div>
        <div className="flex gap-1 text-[11px] text-muted-foreground">
          {["7d", "30d", "90d"].map((p, i) => (
            <button
              key={p}
              className={cn(
                "rounded-md px-2 py-1 transition-colors hover:bg-accent",
                i === 1 && "bg-accent text-foreground",
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={card.data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--brand-blue)" stopOpacity={0.45} />
                <stop offset="100%" stopColor="var(--brand-blue)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
            <Tooltip
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: "var(--muted-foreground)" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--brand-blue)"
              strokeWidth={2}
              fill="url(#trendFill)"
            />
            <Line type="monotone" dataKey="value" stroke="var(--brand-blue)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </CardShell>
  );
}
