"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Mail } from "lucide-react";
import { TabKey } from "./Header";

interface BottomNavProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}

interface NavLinkItem {
  key: TabKey;
  label: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { key: "portfolio", label: "Work" },
  { key: "about", label: "About" },
  { key: "others", label: "Playground" },
  { key: "contact", label: "Contact" },
];

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const [copied, setCopied] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const emailAddress = "gede.arya.negara@gmail.com";

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2400);
  };

  return (
    <div className="fixed bottom-5 sm:bottom-6 inset-x-0 flex justify-center items-center pointer-events-none z-50 px-4">
      <motion.nav
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto select-none max-w-full"
        aria-label="Bottom Navigation"
      >
        {/* Elongated Capsule Container */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 p-1.5 sm:p-2 rounded-full bg-neutral-950/95 dark:bg-[#121214]/95 backdrop-blur-2xl border border-neutral-800/90 shadow-[0_16px_48px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.08]">
          {/* Left: Saturn Planet Circle Button (Navigates to Home) */}
          <motion.button
            onClick={() => setActiveTab("home")}
            whileHover={{ scale: 1.08, rotate: 12 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 450, damping: 24 }}
            className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white transition-all duration-300 ${
              activeTab === "home"
                ? "bg-white text-neutral-950 shadow-md ring-2 ring-white/60"
                : "bg-white text-neutral-950 hover:bg-neutral-100 shadow-sm"
            }`}
            title="Home"
            aria-label="Home"
          >
            {/* Saturn Planet SVG */}
            <svg
              className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-neutral-950"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              {/* Planet Sphere */}
              <circle cx="12" cy="12" r="5" fill="currentColor" stroke="none" />
              {/* Tilted Ring */}
              <ellipse
                cx="12"
                cy="12"
                rx="10"
                ry="3.8"
                transform="rotate(-26 12 12)"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </motion.button>

          {/* Middle: Navigation Links with Hover Pill & Click Bounce */}
          <div
            onMouseLeave={() => setHoveredTab(null)}
            className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2"
          >
            {NAV_LINKS.map((item) => {
              const isActive = activeTab === item.key;
              const isHovered = hoveredTab === item.key;

              return (
                <motion.button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  onMouseEnter={() => setHoveredTab(item.key)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                  aria-label={item.label}
                >
                  {/* Floating Hover Pill Background */}
                  {isHovered && (
                    <motion.div
                      layoutId="navHoverPill"
                      className="absolute inset-0 rounded-full bg-white/10 dark:bg-white/10 z-0"
                      transition={{ type: "spring", stiffness: 480, damping: 32 }}
                    />
                  )}

                  {/* Active Indicator Underline Dot */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavDot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10 font-sans tracking-tight">
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Right: Elongated White Capsule Button with "✓ Copied" Click Animation */}
          <motion.button
            onClick={handleCopyEmail}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 450, damping: 26 }}
            className="relative inline-flex items-center justify-center h-9 sm:h-10 px-4 sm:px-5 rounded-full bg-white text-neutral-900 font-sans font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 shrink-0 overflow-hidden"
            title="Click to copy email"
            aria-label="Copy Email"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.div
                  key="copied"
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.9 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex items-center gap-1.5 text-neutral-950 font-bold"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  >
                    <Check size={14} className="text-emerald-600 stroke-[3]" />
                  </motion.span>
                  <span>Copied</span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="flex items-center gap-1.5 text-neutral-900 font-medium"
                >
                  <Mail size={13} className="text-neutral-500 shrink-0" />
                  <span>Copy Email</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>
    </div>
  );
}
