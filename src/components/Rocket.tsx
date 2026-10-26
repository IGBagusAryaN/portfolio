"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Rocket() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Gentle hover float
    const hoverTween = gsap.to(svgRef.current, {
      y: -10,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      hoverTween.kill();
    };
  }, []);

  const handleLaunch = () => {
    if (!svgRef.current) return;

    gsap.timeline()
      .to(svgRef.current, {
        y: 8,
        scaleY: 0.9,
        duration: 0.15,
        ease: "power2.in",
      })
      .to(svgRef.current, {
        y: -180,
        opacity: 0,
        scale: 0.6,
        duration: 0.6,
        ease: "power3.in",
      })
      .set(svgRef.current, { y: 120, opacity: 0, scale: 0.8 })
      .to(svgRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "elastic.out(1, 0.4)",
      });
  };

  return (
    <div
      ref={wrapperRef}
      id="rocket-wrapper"
      onClick={handleLaunch}
      className="relative cursor-pointer transition-transform duration-500 hover:scale-105"
      title="Click me for liftoff!"
    >
      {/* Orbital celestial rings */}
      <div className="absolute -inset-6 rounded-full border border-dashed border-neutral-300 dark:border-neutral-700/60 animate-[spin_40s_linear_infinite] pointer-events-none" />
      <div className="absolute -inset-12 rounded-full border border-dotted border-neutral-200 dark:border-neutral-800 pointer-events-none" />

      <svg
        ref={svgRef}
        id="rocket-svg"
        className="w-32 h-32 sm:w-40 sm:h-40 text-neutral-800 dark:text-neutral-200 drop-shadow-sm transition-all duration-300"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rocket Body Outline */}
        <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M80 20C65 42 60 74 60 100H100C100 74 95 42 80 20Z" />
          <path d="M72 44C77 41 83 41 88 44" strokeWidth="1.8" />
          <circle cx="80" cy="66" r="8" fill="transparent" />
          <circle cx="80" cy="66" r="4" fill="currentColor" opacity="0.3" />
          <line x1="86" y1="62" x2="89" y2="59" strokeWidth="1.5" />
          <line x1="70" y1="88" x2="90" y2="88" strokeWidth="1.5" strokeDasharray="2 3" />
          <path d="M60 88L42 106V112H60" />
          <path d="M100 88L118 106V112H100" />
          <path d="M68 100H92L88 108H72L68 100Z" />
        </g>

        {/* Thruster Plume Flame */}
        <g className="thrust-pulse" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M74 112L80 128L86 112" />
          <path d="M70 114L66 122" opacity="0.5" />
          <path d="M90 114L94 122" opacity="0.5" />
          <line x1="80" y1="130" x2="80" y2="136" opacity="0.7" strokeDasharray="1 3" />
        </g>

        {/* Sparkles / Micro Stars */}
        <g className="opacity-60 text-neutral-400 dark:text-neutral-500" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M36 48L36 54M33 51L39 51" />
          <path d="M124 38L124 44M121 41L127 41" />
          <circle cx="120" cy="80" r="1" fill="currentColor" />
          <circle cx="44" cy="88" r="1" fill="currentColor" />
        </g>
      </svg>
    </div>
  );
}
