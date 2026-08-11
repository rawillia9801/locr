"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

type ChatMessage = { role: "user" | "assistant"; content: string };

export default function CreatePage() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [style, setStyle] = useState("Elegant and minimal");
  const [colors, setColors] = useState("");
  const [notes, setNotes] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Tell me about the business you’re building. I’ll turn the direction into a logo concept you can refine with me." },
  ]);
  const [svg, setSvg] = useState("");
  const [conceptName, setConceptName] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  async function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus("");
    const userMessage = notes.trim() || `Create a ${style.toLowerCase()} direction for ${businessName}.`;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: userMessage }];
    setMessages(nextMessages);

    try {
      const response = await fetch("/api/brand-assistant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ businessName, industry, style, colors, notes, messages: nextMessages }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to generate a concept.");
      setMessages([...nextMessages, { role: "assistant", content: data.message }]);
      setSvg(data.svg || "");
      setConceptName(data.conceptName || "Logo Concept");
      setNotes("");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to generate a concept.");
    } finally {
      setBusy(false);
    }
  }

  async function saveProject() {
    setStatus("");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setStatus("Sign in to save projects to your account.");
      return;
    }
    if (!svg) {
      setStatus("Generate a logo concept before saving.");
      return;
    }
    const { error } = await supabase.from("logo_projects").insert({
      user_id: user.id,
      business_name: businessName,
      industry,
      style,
      colors,
      concept_name: conceptName,
      svg,
      conversation: messages,
    });
    setStatus(error ? error.message : "Project saved to your account.");
  }

  function downloadSvg() {
    if (!svg) return;
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${(businessName || "logo").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="creator-shell">
      <div className="creator-topbar">
        <Link href="/" className="brand"><span className="brand-icon"><svg viewBox="0 0 64 64"><path d="M18 49V20c0-7 5-12 12-12 6 0 11 4 12 10-8-2-13 2-13 8 0 6 5 10 11 10h7c7 0 12 5 12 11 0 7-5 12-12 12H30c-7 0-12-4-12-10Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/><path d="M29 26c4-6 12-8 19-4" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg></span><span>LogoCreator<span>.Site</span></span></Link>
        <div className="header-actions"><Link href="/login" className="btn btn-outline compact">Account</Link><Link href="/#packages" className="btn btn-primary compact">Packages</Link></div>
      </div>

      <div className="creator-layout">
        <section className="creator-card">
          <span className="section-kicker">AI BRAND ASSISTANT</span>
          <h1>Create your logo</h1>
          <p className="muted">Creating and refining is free. Tell the assistant what the brand should feel like, then keep iterating until the direction feels right.</p>
          <form onSubmit={generate}>
            <label>Business name<input required value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Your business name" /></label>
            <div className="creator-row">
              <label>Industry<input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Pet care, construction…" /></label>
              <label>Style<input value={style} onChange={(e) => setStyle(e.target.value)} placeholder="Elegant, minimal, bold…" /></label>
            </div>
            <label>Color direction<input value={colors} onChange={(e) => setColors(e.target.value)} placeholder="Deep teal, warm cream, gold…" /></label>
            <label>What should we create or change?<textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Describe the logo, symbol, typography, layout, or refinement you want." /></label>
            <button className="btn btn-primary full" disabled={busy}>{busy ? "Creating concept…" : svg ? "Refine This Concept" : "Generate My First Concept"}</button>
          </form>
          {status && <p className="status">{status}</p>}
        </section>

        <section className="creator-card">
          <span className="section-kicker">LIVE WORKSPACE</span>
          <h2>{conceptName || "Your brand workspace"}</h2>
          <div className="creator-chat">
            {messages.map((message, index) => <div key={index} className={`creator-message ${message.role === "user" ? "user" : ""}`}>{message.content}</div>)}
          </div>
          <div className="logo-preview-box">
            {svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : <div className="muted">Your generated logo concept will appear here.</div>}
          </div>
          <div className="creator-actions">
            <button className="btn btn-outline" type="button" onClick={saveProject}>Save Project</button>
            <button className="btn btn-outline" type="button" onClick={downloadSvg} disabled={!svg}>Export SVG</button>
            <Link href="/#packages" className="btn btn-primary">Unlock Brand Files</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
