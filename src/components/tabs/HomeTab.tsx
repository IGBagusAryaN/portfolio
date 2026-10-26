"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Bio from "@/components/Bio";
import Skills from "@/components/Skills";
import FooterCTA from "@/components/FooterCTA";

interface HomeTabProps {
  onNavigateToContact: () => void;
}

export default function HomeTab({ onNavigateToContact }: HomeTabProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="space-y-6 sm:space-y-8">
      <Bio />
      <Skills />
      <FooterCTA onNavigateToContact={onNavigateToContact} />
    </div>
  );
}
