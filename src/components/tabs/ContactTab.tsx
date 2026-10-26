"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Rocket from "@/components/Rocket";

export default function ContactTab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  const emailAddress = "gede.arya.negara@gmail.com";

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    setSubmitted(true);
  };

  return (
    <div ref={containerRef} className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Currently open for collaboration & opportunities
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-mono">
          Let's Start a Conversation
        </h2>
        <p className="text-sm sm:text-base text-notion-muted dark:text-notion-darkMuted leading-relaxed max-w-xl">
          Whether you have a question, an opportunity in Frontend or Fullstack development, or simply want to say hello, my inbox is always open!
        </p>
      </div>

      {/* Main Grid: Contact Card + Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        {/* Left Form: 3 cols */}
        <div className="md:col-span-3 space-y-6 rounded-2xl border border-notion-border dark:border-notion-darkBorder bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto text-lg font-bold">
                ✓
              </div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-mono">
                Message Received!
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
                Thank you for reaching out! I will get back to you at <span className="font-mono text-neutral-700 dark:text-neutral-300">{formState.email}</span> as soon as possible.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormState({ name: "", email: "", message: "" });
                }}
                className="mt-2 text-xs font-mono text-neutral-500 underline hover:text-black dark:hover:text-white"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-notion-border dark:border-notion-darkBorder bg-white/50 dark:bg-neutral-950/50 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-200 transition-colors placeholder:text-neutral-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-notion-border dark:border-notion-darkBorder bg-white/50 dark:bg-neutral-950/50 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-200 transition-colors placeholder:text-neutral-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell me about your project, idea, or role..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-notion-border dark:border-notion-darkBorder bg-white/50 dark:bg-neutral-950/50 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-200 transition-colors placeholder:text-neutral-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg text-xs sm:text-sm font-mono font-medium text-white dark:text-neutral-900 bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <span>↗</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info: 2 cols */}
        <div className="md:col-span-2 space-y-6">
          {/* Direct Email Card */}
          <div className="rounded-2xl border border-notion-border dark:border-notion-darkBorder bg-white/50 dark:bg-neutral-900/50 p-6 space-y-3">
            <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
              Direct Email
            </span>
            <p className="text-sm font-mono font-medium text-neutral-900 dark:text-neutral-100 break-all select-all">
              {emailAddress}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded-md text-xs font-mono border border-notion-border dark:border-notion-darkBorder hover:border-neutral-500 dark:hover:border-neutral-400 transition-all active:scale-95 text-neutral-700 dark:text-neutral-300"
              >
                {copied ? "Copied! ✓" : "Copy Email"}
              </button>
              <a
                href={`mailto:${emailAddress}`}
                className="px-3 py-1.5 rounded-md text-xs font-mono bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
              >
                Mail App ↗
              </a>
            </div>
          </div>

          {/* Line-art Rocket Visual in Card */}
          <div className="rounded-2xl border border-notion-border dark:border-notion-darkBorder bg-white/50 dark:bg-neutral-900/50 p-6 flex flex-col items-center justify-center text-center space-y-3">
            <Rocket />
            <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
              Interactive Rocket • Click for liftoff
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
