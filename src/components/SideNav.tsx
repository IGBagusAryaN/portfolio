"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import {
  FolderIcon,
  UserIcon,
  MailIcon,
  GridIcon,
} from "@needui/ui-kit";
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
    icon: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
        <polyline points="9 21 9 12 15 12 15 21" />
      </svg>
    ),
  },
  {
    key: "portfolio",
    label: "Portfolio",
    icon: <FolderIcon size={16} />,
  },
  {
    key: "about",
    label: "About",
    icon: <UserIcon size={16} />,
  },
  {
    key: "contact",
    label: "Contact",
    icon: <MailIcon size={16} />,
  },
  {
    key: "others",
    label: "Others",
    icon: <GridIcon size={16} />,
  },
];

export default function SideNav({ activeTab, setActiveTab, isMobile = false }: SideNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key in TabKey]?: HTMLButtonElement | null }>({});

  // Slide active indicator to the exact offset coordinate of active button
  const updateIndicator = useCallback(
    (instant = false) => {
      const activeBtn = buttonRefs.current[activeTab];
      const indicator = indicatorRef.current;

      if (!activeBtn || !indicator) return;

      const top = activeBtn.offsetTop;
      const left = activeBtn.offsetLeft;
      const width = activeBtn.offsetWidth;
      const height = activeBtn.offsetHeight;

      gsap.to(indicator, {
        x: left,
        y: top,
        width,
        height,
        opacity: 1,
        duration: instant ? 0 : 0.3,
        ease: "power2.out",
      });
    },
    [activeTab]
  );

  useEffect(() => {
    updateIndicator(true);
    const timer = setTimeout(() => updateIndicator(), 100);
    return () => clearTimeout(timer);
  }, [updateIndicator]);

  // Entrance animation on mount
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: isMobile ? 15 : 0, x: isMobile ? 0 : -15 },
        { opacity: 1, y: 0, x: 0, duration: 0.45, ease: "power2.out", delay: 0.1 }
      );
    }
  }, [isMobile]);

  // Magnetic hover effects on icons
  const handleNavMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;

    gsap.to(target, {
      x,
      y,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleNavMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <aside
      ref={containerRef}
      aria-label="Sidebar Navigation"
      className={`relative select-none flex items-center p-1.5 rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md shadow-lg transition-all duration-300 ${
        isMobile ? "flex-row gap-1" : "flex-col gap-1.5"
      }`}
    >
      {/* Sliding Active Indicator Pill - Starts at (0,0), placed exactly over the button */}
      <div
        ref={indicatorRef}
        className="absolute top-0 left-0 rounded-xl bg-neutral-950 dark:bg-white shadow-sm pointer-events-none opacity-0"
      />

      {/* Navigation Icons from @needui/ui-kit */}
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
                onMouseMove={handleNavMouseMove}
                onMouseLeave={handleNavMouseLeave}
                aria-label={item.label}
                className={`relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center p-0 transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? "text-white dark:text-neutral-950 font-bold"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <span className="flex items-center justify-center w-full h-full">
                  {item.icon}
                </span>
              </button>

              {/* Tooltip Label (Appears to the RIGHT on Desktop, ABOVE on Mobile) */}
              <div
                className={`absolute pointer-events-none opacity-0 transition-all duration-200 z-50 ${
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
        } bg-neutral-200 dark:bg-neutral-800`}
      />

      {/* Theme Toggle Button */}
      <div className="relative z-10 flex items-center justify-center group">
        <ThemeToggle />
        <div
          className={`absolute pointer-events-none opacity-0 transition-all duration-200 z-50 ${
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
