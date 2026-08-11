"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function LoginPage() {
  const params = useSearchParams();
  const [mode, setMode] = useState<"login" | "signup">(params.get("mode") === "signup" ? "signup" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus("");

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setStatus("Account created. Check your email if confirmation is enabled, then sign in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = "/create";
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to complete that request.");
    } finally {
      setBusy(false);
    }
  }

  async function resetPassword() {
    if (!email) {
      setStatus("Enter your email address first.");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    setStatus(error ? error.message : "Password reset instructions sent.");
  }

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <Link href="/" className="brand"><span className="brand-icon"><svg viewBox="0 0 64 64"><path d="M18 49V20c0-7 5-12 12-12 6 0 11 4 12 10-8-2-13 2-13 8 0 6 5 10 11 10h7c7 0 12 5 12 11 0 7-5 12-12 12H30c-7 0-12-4-12-10Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/><path d="M29 26c4-6 12-8 19-4" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg></span><span>LogoCreator<span>.Site</span></span></Link>
        <h1>{mode === "login" ? "Welcome back" : "Create your account"}</h1>
        <p className="lede">{mode === "login" ? "Sign in to continue designing and access your saved logo projects." : "Create an account to save concepts, return to projects, and manage purchased brand assets."}</p>
        <form onSubmit={submit}>
          <label>Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></label>
          <label>Password<input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" /></label>
          {mode === "login" && <button type="button" className="text-link" onClick={resetPassword}>Forgot password?</button>}
          <button className="btn btn-primary full" type="submit" disabled={busy}>{busy ? "Working…" : mode === "login" ? "Sign In" : "Create Account"}</button>
        </form>
        {status && <p className="status">{status}</p>}
        <div className="auth-toggle">{mode === "login" ? "Don’t have an account? " : "Already have an account? "}<button className="text-link" onClick={() => setMode(mode === "login" ? "signup" : "login")}>{mode === "login" ? "Create one" : "Sign in"}</button></div>
      </div>
    </main>
  );
}
