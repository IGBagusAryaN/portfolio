"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header, { TabKey } from "@/components/Header";
import SideNav from "@/components/SideNav";
import HomeTab from "@/components/tabs/HomeTab";
import PortfolioTab from "@/components/tabs/PortfolioTab";
import AboutTab from "@/components/tabs/AboutTab";
import ContactTab from "@/components/tabs/ContactTab";
import OthersTab from "@/components/tabs/OthersTab";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [displayedTab, setDisplayedTab] = useState<TabKey>("home");
  const tabContentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);

  // Global Scroll Progress Bar
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (progressBarRef.current) {
      const tw = gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });

      return () => {
        if (tw.scrollTrigger) tw.scrollTrigger.kill();
        tw.kill();
      };
    }
  }, [displayedTab]);

  const handleTabChange = (newTab: TabKey) => {
    if (newTab === activeTab) return;

    // 1. Immediately update activeTab so SideNav indicator starts gliding at t = 0ms
    setActiveTab(newTab);

    const el = tabContentRef.current;
    if (!el) {
      setDisplayedTab(newTab);
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    // Kill any ongoing tweens on tab content
    gsap.killTweensOf(el);
    isTransitioningRef.current = true;

    // 2. Rapid Exit Fade (0.14s)
    gsap.to(el, {
      opacity: 0,
      y: -6,
      duration: 0.14,
      ease: "power2.in",
      onComplete: () => {
        // Reset scroll position cleanly to top
        window.scrollTo({ top: 0, behavior: "instant" });

        // Switch displayed tab in DOM
        setDisplayedTab(newTab);

        // 3. Smooth Entrance Glide (0.28s)
        requestAnimationFrame(() => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.28,
              ease: "power2.out",
              clearProps: "all",
              onComplete: () => {
                isTransitioningRef.current = false;
                ScrollTrigger.refresh();
              },
            }
          );
        });
      },
    });
  };

  const handleNavigateToContact = () => {
    handleTabChange("contact");
  };

  return (
    <>
      {/* Top Hairline Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] bg-neutral-900/10 dark:bg-white/10 z-50 pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full bg-neutral-900 dark:bg-white origin-left scale-x-0"
        />
      </div>

      {/* Main Container - Extended Width (max-w-4xl) */}
      <div className="relative z-10 max-w-4xl lg:max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pt-6 sm:pt-8 pb-10 md:pb-12 flex flex-col min-h-screen">
        {/* Desktop Left Sidebar - Aligned with Header and strictly anchored to container's left edge */}
        <div className="hidden lg:block absolute right-full top-0 mr-4 lg:mr-5 h-full pointer-events-none">
          <div className="sticky top-6 sm:top-8 pointer-events-auto">
            <SideNav activeTab={activeTab} setActiveTab={handleTabChange} />
          </div>
        </div>

        <Header />

        <main ref={tabContentRef} className="flex-1 w-full">
          {displayedTab === "home" && (
            <HomeTab onNavigateToContact={handleNavigateToContact} />
          )}
          {displayedTab === "portfolio" && <PortfolioTab />}
          {displayedTab === "about" && <AboutTab />}
          {displayedTab === "contact" && <ContactTab />}
          {displayedTab === "others" && <OthersTab />}
        </main>
      </div>

      {/* Mobile & Tablet Screen: Floating Bottom Icon Dock */}
      <div className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <SideNav activeTab={activeTab} setActiveTab={handleTabChange} isMobile />
      </div>
    </>
  );
}
