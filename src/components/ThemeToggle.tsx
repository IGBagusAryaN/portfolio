"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { SunIcon, MoonIcon } from "@needui/ui-kit";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateTheme = () => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    updateTheme();
    setMounted(true);

    const observer = new MutationObserver(() => {
      updateTheme();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
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

    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      ref={btnRef}
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="w-10 h-10 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 transition-colors active:scale-95 cursor-pointer outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 flex items-center justify-center p-0"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="flex items-center justify-center pointer-events-none transition-transform duration-200 group-hover:scale-110">
        {isDark ? (
          <SunIcon size={18} className="text-amber-400 transition-transform duration-300 hover:rotate-45" />
        ) : (
          <MoonIcon size={18} className="text-neutral-700 transition-transform duration-300 hover:-rotate-12" />
        )}
      </span>
    </button>
  );
}
