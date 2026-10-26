"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import {
  Home,
  FolderGit2,
  User,
  Mail,
  LayoutGrid,
} from "lucide-react";
import { TabKey } from "./Header";
import ThemeToggle from "./ThemeToggle";

interface SideNavProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  isMobile?: boolean;
}

interface NavItem {
  key: TabKey;
  label: string;
  icon: JSX.Element;
}

const NAV_ITEMS: NavItem[] = [
  {
    key: "home",
    label: "Home",
    icon: <Home size={18} strokeWidth={2} />,
  },
  {
    key: "portfolio",
    label: "Portfolio",
    icon: <FolderGit2 size={18} strokeWidth={2} />,
  },
  {
    key: "about",
    label: "About",
    icon: <User size={18} strokeWidth={2} />,
  },
  {
    key: "contact",
    label: "Contact",
    icon: <Mail size={18} strokeWidth={2} />,
  },
  {
    key: "others",
    label: "Others",
    icon: <LayoutGrid size={18} strokeWidth={2} />,
  },
];

export default function SideNav({ activeTab, setActiveTab, isMobile = false }: SideNavProps) {
  const containerRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key in TabKey]?: HTMLButtonElement | null }>({});

  // Slide active indicator to the exact viewport coordinate of active button relative to container
  const updateIndicator = useCallback(
    (instant = false) => {
      const activeBtn = buttonRefs.current[activeTab];
      const container = containerRef.current;
      const indicator = indicatorRef.current;

      if (!activeBtn || !container || !indicator) return;

      const containerRect = container.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();

      const top = btnRect.top - containerRect.top;
      const left = btnRect.left - containerRect.left;
      const width = btnRect.width;
      const height = btnRect.height;

      gsap.to(indicator, {
        x: left,
        y: top,
        width,
        height,
        opacity: 1,
        duration: instant ? 0 : 0.28,
        ease: "power2.out",
      });
    },
    [activeTab]
  );

  useEffect(() => {
    updateIndicator(true);
    const timer = setTimeout(() => updateIndicator(false), 80);
    return () => clearTimeout(timer);
  }, [updateIndicator]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => updateIndicator(true);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateIndicator]);

  // Entrance animation on mount
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: isMobile ? 16 : 0, x: isMobile ? 0 : -16 },
        { opacity: 1, y: 0, x: 0, duration: 0.4, ease: "power2.out", delay: 0.05 }
      );
    }
  }, [isMobile]);

  return (
    <aside
      ref={containerRef}
      aria-label="Sidebar Navigation"
      className={`relative select-none flex items-center p-1.5 rounded-2xl border border-neutral-200/90 dark:border-neutral-700/80 bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-xl shadow-xl dark:shadow-2xl dark:shadow-black/70 ring-1 ring-black/[0.04] dark:ring-white/[0.06] transition-all duration-300 ${
        isMobile ? "flex-row gap-1" : "flex-col gap-1.5"
      }`}
    >
      {/* Sliding Active Indicator Pill */}
      <div
        ref={indicatorRef}
        className="absolute top-0 left-0 rounded-xl bg-neutral-900 dark:bg-white shadow-md pointer-events-none opacity-0"
        style={{ willChange: "transform, width, height" }}
      />

      {/* Navigation Icons */}
      <div className={`flex items-center ${isMobile ? "flex-row gap-1" : "flex-col gap-1.5"}`}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <div key={item.key} className="relative group flex items-center justify-center">
              <button
                ref={(el) => {
                  buttonRefs.current[item.key] = el;
                }}
                onClick={() => setActiveTab(item.key)}
                aria-label={item.label}
                className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center p-0 transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-white dark:text-neutral-950 font-semibold"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60"
                }`}
              >
                <span className="flex items-center justify-center w-full h-full pointer-events-none transition-transform duration-200 group-hover:scale-105">
                  {item.icon}
                </span>
              </button>

              {/* Tooltip Label (Right on Desktop, Top on Mobile) */}
              <div
                className={`absolute pointer-events-none opacity-0 transition-all duration-150 z-50 ${
                  isMobile
                    ? "bottom-full mb-2.5 left-1/2 -translate-x-1/2 group-hover:opacity-100 group-hover:-translate-y-1"
                    : "left-full ml-3 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-1"
                }`}
              >
                <div className="px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-mono font-medium whitespace-nowrap shadow-xl">
                  {item.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div
        className={`${
          isMobile ? "w-[1px] h-5 mx-1" : "w-5 h-[1px] my-1"
        } bg-neutral-200 dark:bg-neutral-700/80`}
      />

      {/* Theme Toggle Button */}
      <div className="relative z-10 flex items-center justify-center group">
        <ThemeToggle />
        <div
          className={`absolute pointer-events-none opacity-0 transition-all duration-150 z-50 ${
            isMobile
              ? "bottom-full mb-2.5 left-1/2 -translate-x-1/2 group-hover:opacity-100 group-hover:-translate-y-1"
              : "left-full ml-3 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-1"
          }`}
        >
          <div className="px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-mono font-medium whitespace-nowrap shadow-xl">
            Theme
          </div>
        </div>
      </div>
    </aside>
  );
}
