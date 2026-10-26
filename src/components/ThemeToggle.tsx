"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { Sun, Moon } from "lucide-react";

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
      className="w-10 h-10 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors active:scale-95 cursor-pointer focus:outline-none flex items-center justify-center p-0"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun size={18} strokeWidth={2} className="text-amber-400 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon size={18} strokeWidth={2} className="text-neutral-700 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
