"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { SunIcon, MoonIcon } from "@needui/ui-kit";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (btnRef.current) {
      gsap.to(btnRef.current, {
        scale: 0.85,
        duration: 0.12,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }

    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  if (!mounted) {
    return <div className="w-9 h-9 sm:w-10 sm:h-10" />;
  }

  return (
    <button
      ref={btnRef}
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/70 transition-colors active:scale-90 cursor-pointer focus:outline-none flex items-center justify-center p-0"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <SunIcon size={16} className="text-neutral-200 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <MoonIcon size={16} className="text-neutral-950 transition-transform duration-300 hover:-rotate-12 fill-neutral-950" />
      )}
    </button>
  );
}
