"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ProjectItem {
  id: string;
  tag: string;
  title: string;
  category: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  previewSnippet: string;
}

const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "01",
    tag: "Enterprise System",
    title: "Enterprise ERP & Webmaster Portal",
    category: "Fullstack Architecture",
    company: "PT Sinar Metrindo Perkasa",
    period: "2023 — Present",
    description:
      "Engineered mission-critical web applications bridging SQL Server & MySQL with dynamic frontend interfaces. Automated inventory workflows, real-time telemetry, and reduced operational data latency by 45%.",
    highlights: [
      "SQL Server & MySQL Query Optimization",
      "Dynamic Dashboard & Telemetry Reporting",
      "Robust TypeScript & Enterprise Architecture",
    ],
    tech: ["TypeScript", "Next.js", "SQL Server", "MySQL", "Tailwind CSS", "Express"],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    previewSnippet: `// PT Sinar Metrindo Perkasa — ERP Pipeline
const dataPipeline = await db.query({
  server: "SQL_SERVER_PRIMARY",
  sync: "MYSQL_REPLICA",
  throughput: "REALTIME",
  latency: "<12ms"
});`,
  },
  {
    id: "02",
    tag: "Database Engine",
    title: "High-Performance Query Studio & Sync",
    category: "Database & Backend",
    company: "Data Infrastructure",
    period: "2024",
    description:
      "A centralized data synchronization utility connecting disparate database clusters. Implements automated stored procedure indexing, schema migrations, and high-concurrency read replicas.",
    highlights: [
      "Sub-10ms Indexed Complex Joins",
      "Multi-Engine Sync (SQL Server, MySQL, Postgre)",
      "Automated Health & Integrity Checks",
    ],
    tech: ["TypeScript", "NodeJS", "SQL Server", "MySQL", "PostgreSQL", "PrismaORM", "Docker"],
    githubUrl: "https://github.com",
    previewSnippet: `// High-Speed Multi-DB Sync
export async function syncClusters() {
  const [sqlServer, mySql] = await Promise.all([
    connectSqlServerPool({ max: 20 }),
    connectMySqlPool({ max: 20 })
  ]);
  return reconcileData({ integrity: 1.0 });
}`,
  },
  {
    id: "03",
    tag: "Mobile / Field PWA",
    title: "Field Operations & Telemetry Verification",
    category: "Progressive Web App",
    company: "Field Engineering",
    period: "2023 — 2024",
    description:
      "Progressive offline-first web application enabling on-site engineers to inspect, log telemetry data, and generate instant verification reports directly from mobile browsers with zero signal dependency.",
    highlights: [
      "Offline-first IndexedDB Syncing",
      "Hardware Diagnostic Reporting",
      "Instant PDF Verification Generation",
    ],
    tech: ["React Native", "NextJs", "InertiaJS", "Tailwind", "Laravel", "MySQL"],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    previewSnippet: `// Field Inspection & Sync
const inspection = new TelemetryInspection({
  offlineFirst: true,
  hardwareSync: "BLUETOOTH_LE",
  autoReconcileOnOnline: true
});`,
  },
  {
    id: "04",
    tag: "UI / UX Motion",
    title: "Kinetic Micro-Interaction Component Suite",
    category: "Design System & Motion",
    company: "Creative Frontend",
    period: "2024",
    description:
      "A set of lightweight, accessible, and physics-driven micro-interaction components built with GSAP and React, designed for high-end digital experiences without performance overhead.",
    highlights: [
      "60fps Physics & Elastic Springs",
      "Accessible Kinetic Typography",
      "Zero Layout Shift Animation Core",
    ],
    tech: ["ReactJS", "GSAP 3", "Framer Motion", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    previewSnippet: `// GSAP Kinetic Spring Easing
gsap.to(".interactive-element", {
  scale: 1.08,
  y: -5,
  ease: "elastic.out(1, 0.3)",
  duration: 0.6
});`,
  },
];

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const total = FEATURED_PROJECTS.length;
  const currentProject = FEATURED_PROJECTS[currentIndex];

  const animateSlideChange = useCallback((direction: "next" | "prev", newIdx: number) => {
    if (!cardRef.current) return;

    const fromX = direction === "next" ? 24 : -24;

    gsap.timeline()
      .to(cardRef.current, {
        opacity: 0,
        x: -fromX * 0.7,
        scale: 0.98,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex(newIdx);
          gsap.fromTo(
            cardRef.current,
            { opacity: 0, x: fromX, scale: 0.98 },
            { opacity: 1, x: 0, scale: 1, duration: 0.35, ease: "power2.out" }
          );
        },
      });
  }, []);

  const goToNext = () => {
    const nextIdx = (currentIndex + 1) % total;
    animateSlideChange("next", nextIdx);
  };

  const goToPrev = () => {
    const prevIdx = (currentIndex - 1 + total) % total;
    animateSlideChange("prev", prevIdx);
  };

  // ScrollTrigger Animated Entrance
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  // Update progress bar
  useEffect(() => {
    if (progressLineRef.current) {
      const progressPercent = ((currentIndex + 1) / total) * 100;
      gsap.to(progressLineRef.current, {
        width: `${progressPercent}%`,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [currentIndex, total]);

  return (
    <section
      ref={containerRef}
      id="portfolio"
      className="space-y-6 pt-8 border-t border-notion-border/70 dark:border-notion-darkBorder/70 scroll-mt-24"
    >
      {/* Header with Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-semibold">
              Featured Case Studies & Projects
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-notion-muted dark:text-notion-darkMuted font-mono">
            Interactive GSAP Project Carousel • Explore key architectures
          </p>
        </div>

        {/* Carousel Prev/Next Buttons & Counter */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 font-medium tracking-wider">
            <span className="text-neutral-900 dark:text-neutral-100 font-bold">
              0{currentIndex + 1}
            </span>{" "}
            / 0{total}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={goToPrev}
              aria-label="Previous project"
              className="p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-neutral-900 dark:hover:border-neutral-100 hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              aria-label="Next project"
              className="p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-neutral-900 dark:hover:border-neutral-100 hover:scale-105 active:scale-95 transition-all shadow-sm"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-[2px] bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div ref={progressLineRef} className="h-full bg-neutral-900 dark:bg-white rounded-full transition-all duration-300" />
      </div>

      {/* Main Project Card Carousel Viewport */}
      <div
        ref={cardRef}
        className="rounded-2xl border border-neutral-300/80 dark:border-neutral-700/80 bg-white dark:bg-neutral-900/90 backdrop-blur-sm overflow-hidden shadow-sm transition-all duration-300 hover:border-neutral-400 dark:hover:border-neutral-600"
      >
        {/* Terminal / Browser Top Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-950/40 text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
            <span className="ml-2 text-neutral-600 dark:text-neutral-400">
              project_{currentProject.id.toLowerCase()}.ts
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300">
            {currentProject.tag}
          </span>
        </div>

        {/* Card Content Grid */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-4 border-b border-neutral-200/60 dark:border-neutral-800/60">
            <div>
              <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 block mb-1">
                {currentProject.category} • {currentProject.company}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-mono">
                {currentProject.title}
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 whitespace-nowrap pt-1 sm:pt-0">
              {currentProject.period}
            </span>
          </div>

          {/* Description & Impact */}
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {currentProject.description}
          </p>

          {/* Code Architecture Visual Snippet */}
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-black/60 p-4 font-mono text-xs overflow-x-auto text-neutral-700 dark:text-neutral-300 select-all">
            <pre className="text-[11px] sm:text-xs leading-relaxed font-mono">
              <code>{currentProject.previewSnippet}</code>
            </pre>
          </div>

          {/* Key Architectural Highlights */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold">
              Key Architecture Highlights
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {currentProject.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 p-2 rounded-lg border border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/30 text-xs font-mono text-neutral-700 dark:text-neutral-300"
                >
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Badges & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60">
            <div className="flex flex-wrap gap-1.5">
              {currentProject.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-100 transition-colors text-neutral-700 dark:text-neutral-300"
                >
                  <span>Source</span>
                  <span>↗</span>
                </a>
              )}
              {currentProject.liveUrl && (
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 transition-opacity font-medium"
                >
                  <span>Explore Live</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
