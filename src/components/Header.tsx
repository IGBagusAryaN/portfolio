"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import ThemeToggle from "./ThemeToggle";

export type TabKey = "home" | "portfolio" | "about" | "contact" | "others";

const ORIGINAL_NAME = "I Gede Bagus Arya Negara";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!<>-_\\/[]{}—=+*^?#________";

export default function Header() {
  const [displayText, setDisplayText] = useState(ORIGINAL_NAME);
  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = useCallback(() => {
    if (scrambleIntervalRef.current) {
      clearInterval(scrambleIntervalRef.current);
    }
    let iteration = 0;
    const totalLength = ORIGINAL_NAME.length;

    scrambleIntervalRef.current = setInterval(() => {
      setDisplayText(
        ORIGINAL_NAME.split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return ORIGINAL_NAME[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      if (iteration >= totalLength) {
        if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
        setDisplayText(ORIGINAL_NAME);
      }
      iteration += 1 / 2;
    }, 30);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      scramble();
    }, 350);
    return () => {
      clearTimeout(timer);
      if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
    };
  }, [scramble]);

  return (
    <header className="relative mb-5 sm:mb-6 pb-4 sm:pb-5 border-b border-notion-border/80 dark:border-notion-darkBorder/80">
      <div className="flex items-center gap-3.5 sm:gap-4.5">
        {/* User Profile Avatar - Rounded Squircle */}
        <div className="relative shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm bg-neutral-100 dark:bg-neutral-900 transition-transform duration-300 hover:scale-[1.02]">
            <img
              src="/arya-avatar.jpeg"
              alt="I Gede Bagus Arya Negara"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Name, Subtitles & Theme Toggle */}
        <div className="flex-1 min-w-0 flex flex-col justify-center space-y-1 sm:space-y-1.5">
          {/* Top Row: Name and Dark Mode Toggle */}
          <div className="flex items-center justify-between gap-3">
            <h1
              onClick={scramble}
              onMouseEnter={scramble}
              className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 cursor-pointer select-none font-sans"
              title="Hover or click to re-scramble"
            >
              {displayText}
            </h1>

            <div className="shrink-0">
              <ThemeToggle />
            </div>
          </div>

          {/* Bottom Row: Role and Location */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 font-sans">
            <span className="truncate">Software Engineer, Web Master, Database Spesialist</span>
            <span className="sm:text-right text-neutral-400 dark:text-neutral-500 shrink-0">
              -Based in West Jakarta, Indonesia 🇮🇩
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
