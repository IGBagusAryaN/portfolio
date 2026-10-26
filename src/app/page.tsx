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
  const tabContentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

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
  }, [activeTab]);

  const handleTabChange = (newTab: TabKey) => {
    if (newTab === activeTab) return;

    if (tabContentRef.current) {
      // Smooth fade-out before switching tab
      gsap.to(tabContentRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          setActiveTab(newTab);
          // Refresh scroll triggers after tab switch
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 50);

          // Smooth fade-in of new tab content
          gsap.fromTo(
            tabContentRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
          );
        },
      });
    } else {
      setActiveTab(newTab);
    }
  };

  const handleNavigateToContact = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        {/* Desktop/Tablet Left Sidebar - Aligned with Header and strictly anchored to container's left edge */}
        <div className="hidden sm:block absolute right-full top-0 mr-4 lg:mr-5 h-full pointer-events-none">
          <div className="sticky top-6 sm:top-8 pointer-events-auto">
            <SideNav activeTab={activeTab} setActiveTab={handleTabChange} />
          </div>
        </div>

        <Header />

        <main ref={tabContentRef} className="flex-1 w-full">
          {activeTab === "home" && (
            <HomeTab onNavigateToContact={handleNavigateToContact} />
          )}
          {activeTab === "portfolio" && <PortfolioTab />}
          {activeTab === "about" && <AboutTab />}
          {activeTab === "contact" && <ContactTab />}
          {activeTab === "others" && <OthersTab />}
        </main>
      </div>

      {/* Mobile Screen: Floating Bottom Icon Dock */}
      <div className="sm:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
        <SideNav activeTab={activeTab} setActiveTab={handleTabChange} isMobile />
      </div>
    </>
  );
}
