"use client";

import Bio from "@/components/Bio";
import Skills from "@/components/Skills";
import FooterCTA from "@/components/FooterCTA";

interface HomeTabProps {
  onNavigateToContact: () => void;
}

export default function HomeTab({ onNavigateToContact }: HomeTabProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <Bio />
      <Skills />
      <FooterCTA onNavigateToContact={onNavigateToContact} />
    </div>
  );
}
