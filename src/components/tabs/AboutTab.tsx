"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutTab() {
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
    <div ref={containerRef} className="space-y-12">
      {/* Intro */}
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-mono">
          About Me
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed text-justify sm:text-left">
          I am a Software Engineer, Webmaster, and Database Specialist currently based in West Jakarta, Indonesia. With a dual focus on engineering dynamic frontends and robust data infrastructure, I build web applications designed for longevity, performance, and delightful user experiences.
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-6 pt-4 border-t border-notion-border/70 dark:border-notion-darkBorder/70">
        <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold">
          Work Experience
        </h3>

        <div className="space-y-8">
          <div className="relative pl-6 border-l-2 border-neutral-300 dark:border-neutral-700 space-y-2">
            <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-neutral-900 dark:bg-white" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                Software Engineer & Webmaster
              </h4>
              <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                2023 — Present
              </span>
            </div>
            <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
              PT Sinar Metrindo Perkasa (Simetri) • West Jakarta
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1">
              Specializing in JavaScript and TypeScript, leveraging modern technologies to create seamless user experiences and ensure robust site architecture. In daily operations, manage, query, and optimize high-throughput SQL Server and MySQL databases, effectively bridging dynamic frontend interfaces with reliable backend systems.
            </p>
          </div>
        </div>
      </div>

      {/* Engineering Philosophy */}
      {/* <div className="space-y-4 pt-4 border-t border-notion-border/70 dark:border-notion-darkBorder/70">
        <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold">
          Engineering Philosophy
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-notion-border dark:border-notion-darkBorder bg-white/40 dark:bg-neutral-900/40 space-y-1.5">
            <h5 className="text-xs font-mono font-bold text-neutral-900 dark:text-neutral-100">
              01. Intentional Motion
            </h5>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Animation is not decoration; it provides tactile feedback, directional cues, and spatial continuity without cluttering the UI.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-notion-border dark:border-notion-darkBorder bg-white/40 dark:bg-neutral-900/40 space-y-1.5">
            <h5 className="text-xs font-mono font-bold text-neutral-900 dark:text-neutral-100">
              02. Whole-Ecosystem Thinking
            </h5>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Every frontend pixel is only as good as the database query backing it. Reliability comes from mastering both ends of the wire.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-notion-border dark:border-notion-darkBorder bg-white/40 dark:bg-neutral-900/40 space-y-1.5">
            <h5 className="text-xs font-mono font-bold text-neutral-900 dark:text-neutral-100">
              03. Performance by Default
            </h5>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Lightning-fast initial loads, zero cumulative layout shifts, and responsive touch feedback on every device.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-notion-border dark:border-notion-darkBorder bg-white/40 dark:bg-neutral-900/40 space-y-1.5">
            <h5 className="text-xs font-mono font-bold text-neutral-900 dark:text-neutral-100">
              04. Continuous Craft
            </h5>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Constantly refining architecture, exploring cutting-edge web APIs, and building maintainable, readable codebases.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
