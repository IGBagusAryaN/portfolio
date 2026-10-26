"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function OthersTab() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-mono">
          Others & Setup
        </h2>
        <p className="text-sm text-notion-muted dark:text-notion-darkMuted leading-relaxed max-w-xl">
          A collection of developer preferences, hardware setup, engineering notes, and external links.
        </p>
      </div>

      <div className="space-y-6">
        {/* Workstation & Setup */}
        <div className="rounded-xl border border-notion-border dark:border-notion-darkBorder bg-white/60 dark:bg-neutral-900/60 p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold">
            Daily Developer Setup
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm font-mono text-neutral-600 dark:text-neutral-300">
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500">•</span>
              <span><strong className="text-neutral-900 dark:text-neutral-100">Editor:</strong> Visual Studio Code & Neovim (Tokyo Night / Minimalist Dark)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500">•</span>
              <span><strong className="text-neutral-900 dark:text-neutral-100">Terminal:</strong> Zsh + Tmux + Starship prompt</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500">•</span>
              <span><strong className="text-neutral-900 dark:text-neutral-100">Databases:</strong> SQL Server Management Studio (SSMS), DBeaver, TablePlus</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500">•</span>
              <span><strong className="text-neutral-900 dark:text-neutral-100">API Testing:</strong> Postman & Bruno</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-neutral-400 dark:text-neutral-500">•</span>
              <span><strong className="text-neutral-900 dark:text-neutral-100">OS:</strong> Linux & Windows Dual-Boot</span>
            </li>
          </ul>
        </div>

        {/* Current Focus Areas */}
        <div className="rounded-xl border border-notion-border dark:border-notion-darkBorder bg-white/60 dark:bg-neutral-900/60 p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold">
            Current Engineering Focus
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            Delving deeper into advanced GreenSock physics-based motion systems, distributed database partitioning in high-concurrency environments, and modern React Server Component optimization patterns.
          </p>
        </div>

        {/* Connect */}
        <div className="rounded-xl border border-notion-border dark:border-notion-darkBorder bg-white/60 dark:bg-neutral-900/60 p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold">
            Profiles & Socials
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-notion-border dark:border-notion-darkBorder hover:border-neutral-500 transition-colors flex items-center justify-between"
            >
              <span>GitHub</span>
              <span>↗</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg border border-notion-border dark:border-notion-darkBorder hover:border-neutral-500 transition-colors flex items-center justify-between"
            >
              <span>LinkedIn</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
