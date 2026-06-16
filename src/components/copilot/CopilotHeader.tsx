import { Bell, History, Download, Plus, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PROPERTIES } from "@/lib/copilot/sample-data";
import type { ChatStatus } from "@/hooks/use-copilot-chat";
import { cn } from "@/lib/utils";

export function CopilotHeader({
  onNewChat,
  onOpenHistory,
  onExport,
  status,
  hasMessages,
}: {
  onNewChat: () => void;
  onOpenHistory: () => void;
  onExport: () => void;
  status: ChatStatus;
  hasMessages: boolean;
}) {
  const [property, setProperty] = useState(PROPERTIES[0]);
  const analyzing = status !== "idle";

  return (
    <header className="relative z-20 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border/60 px-4 backdrop-blur-xl md:px-6 glass-panel">
      <div className="flex min-w-0 items-center gap-3">
        {/* Brand mark */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand shadow-elevated">
            <span className="font-display text-base font-bold text-primary-foreground">A</span>
          </div>
          <div className="hidden flex-col leading-tight md:flex">
            <span className="font-display text-sm font-semibold tracking-tight">Aurelia Copilot</span>
            <span className="text-[11px] text-muted-foreground">Guest Intelligence</span>
          </div>
        </div>

        <div className="mx-1 hidden h-6 w-px bg-border md:block" />

        {/* Property selector */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="h-9 gap-2 rounded-lg px-2.5 text-left hover:bg-accent/60"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gold-soft/20 text-[10px] font-semibold text-gold">
                {property.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </div>
              <div className="hidden flex-col leading-tight sm:flex">
                <span className="text-xs font-semibold">{property.name}</span>
                <span className="text-[10px] text-muted-foreground">{property.location}</span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-72 p-1.5">
            <div className="px-2 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Properties
            </div>
            {PROPERTIES.map((p) => (
              <button
                key={p.id}
                onClick={() => setProperty(p)}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-accent",
                  p.id === property.id && "bg-accent",
                )}
              >
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {p.location} · {p.rooms} rooms
                  </div>
                </div>
                {p.id === property.id && <Check className="h-4 w-4 text-gold" />}
              </button>
            ))}
          </PopoverContent>
        </Popover>

        {/* Status pill */}
        <div className="ml-1 hidden items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-[11px] font-medium lg:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span
              className={cn(
                "absolute inline-flex h-full w-full rounded-full opacity-75",
                analyzing ? "animate-ping bg-gold" : "bg-success",
              )}
            />
            <span
              className={cn(
                "relative inline-flex h-1.5 w-1.5 rounded-full",
                analyzing ? "bg-gold" : "bg-success",
              )}
            />
          </span>
          <span className="text-muted-foreground">
            {analyzing ? "Analyzing…" : "Online"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={onOpenHistory}
          disabled={!hasMessages}
          className="hidden h-9 gap-1.5 rounded-lg md:inline-flex"
        >
          <History className="h-4 w-4" />
          <span className="text-xs font-medium">History</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onExport}
          disabled={!hasMessages}
          className="hidden h-9 gap-1.5 rounded-lg md:inline-flex"
        >
          <Download className="h-4 w-4" />
          <span className="text-xs font-medium">Export</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-lg"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-gold" />
        </Button>

        <Button
          onClick={onNewChat}
          className="h-9 gap-1.5 rounded-lg bg-gradient-brand px-3 text-primary-foreground shadow-elevated hover:opacity-95"
        >
          <Plus className="h-4 w-4" />
          <span className="text-xs font-semibold">New chat</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold text-[11px] font-bold text-primary-foreground ring-1 ring-border transition-transform hover:scale-105">
              ML
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold">Marie Laurent</span>
                <span className="text-[11px] text-muted-foreground">General Manager</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Workspace settings</DropdownMenuItem>
            <DropdownMenuItem>Data sources</DropdownMenuItem>
            <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
