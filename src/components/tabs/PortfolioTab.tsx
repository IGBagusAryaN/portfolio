"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

interface Project {
  id: string;
  title: string;
  category: string;
  role: string;
  company: string;
  period: string;
  shortDescription: string;
  fullOverview: string;
  challenges: string[];
  metrics: { label: string; value: string }[];
  tech: string[];
  link?: string;
  github?: string;
}

const PROJECTS: Project[] = [
  {
    id: "simetri-erp",
    title: "Enterprise Web Ecosystem & ERP Portal",
    category: "Fullstack Architecture & Systems",
    role: "Lead Webmaster & Fullstack Engineer",
    company: "PT Sinar Metrindo Perkasa",
    period: "2023 — Present",
    shortDescription:
      "Architected dynamic frontend interfaces integrated with high-throughput SQL Server and MySQL database pipelines. Streamlined real-time operational workflows, automated reporting, and optimized page load times by 40%.",
    fullOverview:
      "At PT Sinar Metrindo Perkasa, I architected the core web application ecosystem and digital operations portal. The project involved integrating legacy SQL Server industrial data pipelines with dynamic, user-friendly frontend interfaces to streamline day-to-day manufacturing, inventory tracking, and telemetry monitoring across departments.",
    challenges: [
      "Interfacing complex SQL Server stored procedures and table schemas with real-time MySQL web databases.",
      "Building responsive, high-throughput interfaces that operate reliably across high-traffic factory kiosks and executive workstations.",
      "Eliminating performance bottlenecks with intelligent client-side caching, data pagination, and payload compression.",
    ],
    metrics: [
      { label: "Page Load Speed", value: "+40%" },
      { label: "Pipeline Latency", value: "<15ms" },
      { label: "System Availability", value: "99.9%" },
    ],
    tech: ["TypeScript", "Next.js", "SQL Server", "MySQL", "Tailwind CSS", "Express"],
    link: "https://github.com",
    github: "https://github.com",
  },
];

export default function PortfolioTab() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const listViewRef = useRef<HTMLDivElement>(null);
  const detailViewRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const selectedProject = PROJECTS.find((p) => p.id === selectedProjectId) || null;

  // Handle browser back button (history popstate)
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.projectId) {
        setSelectedProjectId(e.state.projectId);
      } else {
        setSelectedProjectId(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Keyboard shortcut: ESC to go back to list
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProjectId) {
        handleBackToList();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProjectId]);

  const isFirstMountRef = useRef(true);

  // Entrance animation for List View (when returning from detail)
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }

    if (!selectedProjectId && listViewRef.current) {
      gsap.fromTo(
        listViewRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [selectedProjectId]);

  // Entrance animation when entering Detail View
  useEffect(() => {
    if (selectedProjectId && detailViewRef.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      gsap.fromTo(
        detailViewRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [selectedProjectId]);

  const handleSelectProject = (project: Project) => {
    if (listViewRef.current) {
      gsap.to(listViewRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          setSelectedProjectId(project.id);
          window.history.pushState({ projectId: project.id }, "", `#${project.id}`);
        },
      });
    } else {
      setSelectedProjectId(project.id);
      window.history.pushState({ projectId: project.id }, "", `#${project.id}`);
    }
  };

  const handleBackToList = useCallback(() => {
    if (detailViewRef.current) {
      gsap.to(detailViewRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          setSelectedProjectId(null);
          window.history.pushState({}, "", window.location.pathname);
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
      });
    } else {
      setSelectedProjectId(null);
      window.history.pushState({}, "", window.location.pathname);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  /* ========================================================
   * SEAMLESS, PERFECTLY-FITTED PREVIEW MOCKUP
   * ======================================================== */
  const renderERPPreview = (isDetail = false) => {
    return (
      <div
        className={`w-full ${
          isDetail ? "min-h-[280px] sm:min-h-[340px] p-6 sm:p-7" : "h-full min-h-[220px] p-5 sm:p-6"
        } bg-[#0a0b0d] text-neutral-300 font-mono flex flex-col justify-between select-none relative overflow-hidden`}
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Window Bar */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            <span className="text-neutral-400 ml-2 text-xs font-mono">simetri-portal.internal</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-400 font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>99.9% LIVE</span>
          </div>
        </div>

        {/* Middle Database Cluster Telemetry Grid */}
        <div className="grid grid-cols-3 gap-3 my-auto py-3 relative z-10">
          <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-semibold">Primary DB</span>
            <span className="font-bold text-neutral-100 text-xs sm:text-sm block mt-0.5">SQL Server</span>
            <span className="text-[10px] text-emerald-400 block mt-1 font-mono">Online</span>
          </div>
          <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-semibold">Web Replica</span>
            <span className="font-bold text-neutral-100 text-xs sm:text-sm block mt-0.5">MySQL</span>
            <span className="text-[10px] text-blue-400 block mt-1 font-mono">Sync 0.2s</span>
          </div>
          <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800">
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-semibold">Avg Latency</span>
            <span className="font-bold text-emerald-400 text-xs sm:text-sm block mt-0.5">&lt; 12ms</span>
            <span className="text-[10px] text-neutral-400 block mt-1 font-mono">-40% Boost</span>
          </div>
        </div>

        {/* Bottom Realtime Activity Frequency Bars */}
        <div className="pt-3 border-t border-neutral-800/70 flex items-center justify-between text-xs relative z-10">
          <div className="flex items-end gap-1.5 h-7 flex-1 max-w-[220px]">
            {[35, 60, 45, 80, 65, 95, 75, 90, 85, 100, 70, 88].map((val, i) => (
              <div
                key={i}
                style={{ height: `${val}%` }}
                className="flex-1 bg-gradient-to-t from-emerald-950 via-emerald-600/70 to-emerald-400 rounded-t-sm"
              />
            ))}
          </div>
          <span className="text-[10px] text-neutral-400 font-mono tracking-tight">
            14.8k ops/sec
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* ========================================================
       * VIEW 1: FULL DETAIL VIEW (REPLACES ENTIRE PROJECT VIEW)
       * ======================================================== */}
      {selectedProject ? (
        <div ref={detailViewRef} className="space-y-8 animate-fadeIn">
          {/* Top Back Navigation Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-200 dark:border-neutral-800">
            <button
              onClick={handleBackToList}
              className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-mono font-medium text-neutral-900 dark:text-neutral-100 transition-all active:scale-95 shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer outline-none"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1 font-bold">←</span>
              <span>Back to all projects</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 dark:text-neutral-500">
              <button
                onClick={handleBackToList}
                className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors cursor-pointer outline-none"
              >
                Portfolio
              </button>
              <span>/</span>
              <span className="text-neutral-900 dark:text-neutral-100 font-semibold truncate max-w-[240px]">
                {selectedProject.title}
              </span>
            </div>
          </div>

          {/* Project Title & Metadata */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                {selectedProject.category}
              </span>
              <span className="text-xs text-neutral-400">•</span>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-medium">
                {selectedProject.company}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono text-neutral-900 dark:text-neutral-100 tracking-tight">
              {selectedProject.title}
            </h1>

            <p className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400">
              Role: <strong className="text-neutral-800 dark:text-neutral-200">{selectedProject.role}</strong> ({selectedProject.period})
            </p>
          </div>

          {/* High-Res Showcase Mockup */}
          <div className="rounded-2xl overflow-hidden border border-neutral-300/80 dark:border-neutral-800 shadow-md">
            {renderERPPreview(true)}
          </div>

          {/* Key Project Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {selectedProject.metrics.map((m, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 text-center space-y-1 shadow-sm"
              >
                <span className="text-2xl sm:text-3xl font-bold font-mono text-neutral-900 dark:text-neutral-100 block">
                  {m.value}
                </span>
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Architectural Overview */}
          <div className="space-y-3 pt-5 border-t border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold">
              Architectural Overview & Impact
            </h3>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed text-justify sm:text-left">
              {selectedProject.fullOverview}
            </p>
          </div>

          {/* Technical Challenges Addressed */}
          <div className="space-y-3 pt-5 border-t border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold">
              Key Technical Challenges Addressed
            </h3>
            <ul className="space-y-2.5">
              {selectedProject.challenges.map((c, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 text-xs sm:text-sm font-mono text-neutral-700 dark:text-neutral-300"
                >
                  <span className="text-emerald-500 font-bold text-sm shrink-0">✓</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Badges */}
          <div className="space-y-3 pt-5 border-t border-neutral-200 dark:border-neutral-800">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-mono border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Actions Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <button
              onClick={handleBackToList}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-mono font-medium transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer outline-none"
            >
              <span className="font-bold">←</span>
              <span>Back to all projects</span>
            </button>

            <div className="w-full sm:w-auto flex items-center gap-3 text-xs font-mono">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none text-center px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-300"
                >
                  View Source ↗
                </a>
              )}
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none text-center px-5 py-2.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:opacity-90 transition-opacity"
                >
                  Explore Live ↗
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================
         * VIEW 2: SINGLE FEATURED PROJECT (LANDSCAPE & CLEAN)
         * ======================================================== */
        <div ref={listViewRef} className="space-y-6 animate-fadeIn">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-mono">
              Featured Works & Systems
            </h2>
            <p className="text-sm text-notion-muted dark:text-notion-darkMuted leading-relaxed max-w-xl">
              A showcase of enterprise architectures, full-stack systems, and database engineering. Click to view the full case study.
            </p>
          </div>

          {/* Single Landscape Card - Seamless & No Harsh Hover Outline */}
          <div
            ref={cardRef}
            onClick={() => handleSelectProject(PROJECTS[0])}
            className="group relative rounded-2xl border border-neutral-200/90 dark:border-neutral-800/90 bg-white dark:bg-neutral-900/90 backdrop-blur-sm overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer outline-none focus:outline-none"
          >
            {/* Left Side: Seamless Integrated Preview (No Cluttered Grey Margin) */}
            <div className="w-full md:w-[48%] lg:w-[46%] shrink-0 border-b md:border-b-0 md:border-r border-neutral-200/90 dark:border-neutral-800/90 overflow-hidden">
              {renderERPPreview(false)}
            </div>

            {/* Right Side: Project Content */}
            <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 dark:text-neutral-500">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{PROJECTS[0].category}</span>
                  <span>{PROJECTS[0].period}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white transition-colors font-mono">
                  {PROJECTS[0].title}
                </h3>

                <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                  Role: <span className="text-neutral-700 dark:text-neutral-300">{PROJECTS[0].role}</span>
                </p>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {PROJECTS[0].shortDescription}
                </p>
              </div>

              {/* Bottom Row: Tech Stack Pills & Detail CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {PROJECTS[0].tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                  {PROJECTS[0].tech.length > 4 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-neutral-400">
                      +{PROJECTS[0].tech.length - 4}
                    </span>
                  )}
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-900 dark:text-white group-hover:translate-x-1.5 transition-transform shrink-0 ml-3">
                  <span>Detail</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
