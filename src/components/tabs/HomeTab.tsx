"use client";

import Bio from "@/components/Bio";
import Skills from "@/components/Skills";
import CareerHighlights from "@/components/CareerHighlights";
import FooterCTA from "@/components/FooterCTA";

interface HomeTabProps {
  onNavigateToContact: () => void;
}

export default function HomeTab({ onNavigateToContact }: HomeTabProps) {
  return (
    <div className="space-y-8 sm:space-y-10">
      <Bio />
      <Skills />
      <CareerHighlights />
      <FooterCTA onNavigateToContact={onNavigateToContact} />
    </div>
  );
}
