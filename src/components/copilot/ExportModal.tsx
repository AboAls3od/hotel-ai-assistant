import { FileText, FileSpreadsheet, FileCode, Link2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const OPTIONS = [
  { icon: FileText, label: "Export as PDF", subtitle: "Branded report, ready to share" },
  { icon: FileSpreadsheet, label: "Export as CSV", subtitle: "Raw insights for spreadsheets" },
  { icon: FileCode, label: "Export as Markdown", subtitle: "Drop into Notion or Linear" },
  { icon: Link2, label: "Copy shareable link", subtitle: "Anyone in your workspace" },
];

export function ExportModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export conversation</DialogTitle>
          <DialogDescription>
            Send this Copilot session to your team or attach it to a decision log.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {OPTIONS.map((o) => (
            <button
              key={o.label}
              onClick={() => {
                toast.success(`${o.label} — ready`);
                onOpenChange(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl border border-border/60 bg-card/60 p-3 text-left transition-colors hover:border-border hover:bg-card"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-foreground">
                <o.icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium">{o.label}</div>
                <div className="text-[11px] text-muted-foreground">{o.subtitle}</div>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
