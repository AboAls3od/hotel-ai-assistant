import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth/mock-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Aurelia Copilot" },
      { name: "description", content: "Sign in to your Aurelia hotel intelligence workspace." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      toast.error("Enter a valid email and a password (4+ chars).");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      signIn(email, mode === "signup" ? name : undefined);
      toast.success(mode === "signup" ? "Welcome to Aurelia." : "Welcome back.");
      navigate({ to: "/choice" });
    }, 500);
  }

  return (
    <main className="relative grid min-h-screen lg:grid-cols-2">
      {/* Left: brand */}
      <div className="relative hidden overflow-hidden bg-[oklch(0.14_0.03_265)] lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.55_0.18_260/0.4),transparent_55%),radial-gradient(circle_at_80%_80%,oklch(0.78_0.14_85/0.25),transparent_55%)]" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.78_0.14_85)] to-[oklch(0.55_0.18_260)]">
              <Sparkles className="h-4 w-4 text-background" />
            </div>
            <span className="font-display text-lg font-semibold">Aurelia</span>
          </Link>
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight">
              "Aurelia replaced three dashboards.<br />
              <span className="text-muted-foreground">Now we just ask."</span>
            </h2>
            <div className="mt-6 text-sm text-muted-foreground">
              — Director of Guest Experience, Five-star Resort
            </div>
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="relative flex items-center justify-center bg-background px-6 py-12">
        <div className="absolute right-6 top-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to home
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            {mode === "signin" ? "Welcome back" : "Create your workspace"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Sign in to access your Copilot."
              : "Start turning guest signals into action."}
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            {mode === "signup" && (
              <div className="space-y-1.5">
                <Label htmlFor="name">Full name</Label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="pl-9"
                  />
                </div>
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@hotel.com"
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[oklch(0.78_0.14_85)] to-[oklch(0.68_0.16_75)] text-background hover:opacity-90"
            >
              {loading ? "Signing you in…" : mode === "signin" ? "Sign in" : "Create account"}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "New to Aurelia?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Demo mode · any email + password will sign you in.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
