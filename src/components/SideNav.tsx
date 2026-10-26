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
        className="w-[18px] h-[18px]"
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
    icon: <FolderIcon size={18} />,
  },
  {
    key: "about",
    label: "About",
    icon: <UserIcon size={18} />,
  },
  {
    key: "contact",
    label: "Contact",
    icon: <MailIcon size={18} />,
  },
  // {
  //   key: "others",
  //   label: "Gallery",
  //   icon: <GridIcon size={18} />,
  // },
];

export default function SideNav({ activeTab, setActiveTab, isMobile = false }: SideNavProps) {
  const containerRef = useRef<HTMLElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const indicatorInnerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key in TabKey]?: HTMLDivElement | null }>({});

  // Slide active indicator & inner aperture smoothly to the active tab's offset
  const updateIndicator = useCallback(
    (instant = false) => {
      const activeEl = itemRefs.current[activeTab];
      const navContainer = navContainerRef.current;
      const indicator = indicatorRef.current;
      const indicatorInner = indicatorInnerRef.current;

      if (!activeEl || !navContainer || !indicator || !indicatorInner) return;

      const top = activeEl.offsetTop;
      const left = activeEl.offsetLeft;
      const width = activeEl.offsetWidth;
      const height = activeEl.offsetHeight;

      gsap.to(indicator, {
        x: left,
        y: top,
        width,
        height,
        opacity: 1,
        duration: instant ? 0 : 0.36,
        ease: "power3.out",
        overwrite: "auto",
      });

      // Translate the inner inverted icon stack in the opposite direction
      // so the icons stay anchored to dock space while the pill aperture slides over them
      gsap.to(indicatorInner, {
        x: -left,
        y: -top,
        duration: instant ? 0 : 0.36,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    [activeTab]
  );

  useEffect(() => {
    updateIndicator(true);
    const timer = setTimeout(() => updateIndicator(false), 40);
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
      {/* Navigation Icons Container */}
      <div
        ref={navContainerRef}
        className={`relative flex items-center ${isMobile ? "flex-row gap-1" : "flex-col gap-1.5"}`}
      >
        {/* Layer 1: Base interactive buttons (neutral icons + tooltip) */}
        {NAV_ITEMS.map((item) => {
          return (
            <div
              key={item.key}
              ref={(el) => {
                itemRefs.current[item.key] = el;
              }}
              className="relative group flex items-center justify-center"
            >
              <button
                onClick={() => setActiveTab(item.key)}
                aria-label={item.label}
                className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center p-0 outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500 cursor-pointer text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 transition-colors duration-200"
              >
                <span className="flex items-center justify-center w-full h-full pointer-events-none transition-transform duration-200 group-hover:scale-110 active:scale-95">
                  {item.icon}
                </span>
              </button>

              {/* Tooltip Label (Right on Desktop, Top on Mobile) */}
              <div
                className={`absolute pointer-events-none opacity-0 transition-all duration-200 ease-out z-50 ${
                  isMobile
                    ? "bottom-full mb-2.5 left-1/2 -translate-x-1/2 group-hover:opacity-100 group-hover:-translate-y-1 translate-y-1"
                    : "left-full ml-3 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1"
                }`}
              >
                <div className="px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-mono font-medium whitespace-nowrap shadow-xl ring-1 ring-black/10 dark:ring-white/10">
                  {item.label}
                </div>
              </div>
            </div>
          );
        })}

        {/* Layer 2: Sliding Active Indicator Pill (Aperture Stencil Window) */}
        <div
          ref={indicatorRef}
          aria-hidden="true"
          className="absolute top-0 left-0 rounded-xl bg-neutral-950 dark:bg-white shadow-[0_2px_10px_rgba(0,0,0,0.15)] dark:shadow-[0_2px_14px_rgba(255,255,255,0.22)] pointer-events-none overflow-hidden opacity-0 z-20"
          style={{
            width: 40,
            height: 40,
            willChange: "transform, opacity",
          }}
        >
          {/* Inverted Cloned Icon Stack (Stationary in dock space) */}
          <div
            ref={indicatorInnerRef}
            className={`flex items-center text-white dark:text-neutral-950 ${
              isMobile ? "flex-row gap-1" : "flex-col gap-1.5"
            }`}
            style={{ willChange: "transform" }}
          >
            {NAV_ITEMS.map((item) => (
              <div
                key={`active-${item.key}`}
                className="w-10 h-10 flex items-center justify-center shrink-0"
              >
                <span className="flex items-center justify-center w-full h-full">
                  {item.icon}
                </span>
              </div>
            ))}
          </div>
        </div>
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
          className={`absolute pointer-events-none opacity-0 transition-all duration-200 ease-out z-50 ${
            isMobile
              ? "bottom-full mb-2.5 left-1/2 -translate-x-1/2 group-hover:opacity-100 group-hover:-translate-y-1 translate-y-1"
              : "left-full ml-3 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1"
          }`}
        >
          <div className="px-2.5 py-1 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-mono font-medium whitespace-nowrap shadow-xl ring-1 ring-black/10 dark:ring-white/10">
            Theme
          </div>
        </div>
      </div>
    </aside>
  );
}
