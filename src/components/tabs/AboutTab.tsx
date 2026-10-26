"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  FileText,
  ArrowDownToLine,
  ExternalLink,
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
} from "lucide-react";

export default function AboutTab() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35 }
      ).fromTo(
        ".timeline-item",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, stagger: 0.08, duration: 0.35 },
        "-=0.15"
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="space-y-10 sm:space-y-12">
      {/* Intro */}
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-mono">
          About Me
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed text-justify sm:text-left">
          I am a Software Engineer, Webmaster, and Database Specialist currently based in West Jakarta, Indonesia. With a dual focus on engineering dynamic frontends and robust data infrastructure, I build web applications designed for longevity, performance, and delightful user experiences.
        </p>

        {/* Simple & Clean CV Download Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:px-4 sm:py-3 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-200/60 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/60 flex items-center justify-center text-neutral-700 dark:text-neutral-300 shrink-0">
              <FileText size={16} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-mono font-semibold text-neutral-900 dark:text-neutral-100">
                Curriculum Vitae
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-neutral-200/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-300/70 dark:border-neutral-700">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-pulse" />
                Updated 2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/cv-arya.pdf"
              download="CV_I_Gede_Bagus_Arya_Negara.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-mono font-semibold hover:opacity-90 active:scale-95 transition-all shadow-xs"
              title="Download CV PDF"
            >
              <ArrowDownToLine size={13} />
              <span>Download CV</span>
            </a>
            <a
              href="/cv-arya.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-400 active:scale-95 transition-all"
              title="Preview CV in new tab"
            >
              <span>Preview</span>
              <ExternalLink size={11} className="opacity-70" />
            </a>
          </div>
        </div>
      </div>

      {/* Work & Freelance Experience */}
      <div className="space-y-6 pt-4 border-t border-notion-border/70 dark:border-notion-darkBorder/70">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase size={14} className="text-neutral-500 dark:text-neutral-400" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold">
              Work & Freelance Experience
            </h3>
          </div>
          <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
            2022 — Present
          </span>
        </div>

        <div className="pl-1">
          {/* Item 1: Full-time (Simetri) */}
          <div className="timeline-item group relative pl-7 pb-8">
            {/* Connecting Line Downward to Item 2 */}
            <div className="absolute left-[4px] top-[12px] bottom-0 w-[2px] bg-neutral-300 dark:bg-neutral-700" />

            {/* Top Node Circle (Placed right at the top tip of the line) */}
            <div className="absolute left-0 top-[7px] z-10 flex h-2.5 w-2.5 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 dark:bg-neutral-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-800 dark:bg-neutral-200 ring-2 ring-white dark:ring-neutral-950" />
            </div>

            <div className="p-3 -m-3 rounded-xl transition-all duration-200 group-hover:bg-neutral-100/60 dark:group-hover:bg-neutral-800/40 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                    Software Engineer & Webmaster
                  </h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                    Full-time
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 shrink-0">
                  2023 — Present
                </span>
              </div>

              <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <MapPin size={12} className="text-neutral-400 shrink-0" />
                <span>PT Sinar Metrindo Perkasa (Simetri) • West Jakarta</span>
              </p>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed pt-0.5">
                Architecting core web applications, internal enterprise tools, and telemetry monitoring portals. Managing, querying, and optimizing high-throughput SQL Server and MySQL database clusters to support mission-critical manufacturing operations, bridging legacy data pipelines with reactive, high-speed frontend dashboards.
              </p>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {["TypeScript", "Next.js", "SQL Server", "MySQL", "Tailwind CSS", "Express"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700/60 transition-transform duration-150 hover:scale-105 hover:border-neutral-400 dark:hover:border-neutral-500 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Item 2: Freelance (Self-Employed) */}
          <div className="timeline-item group relative pl-7 pb-2">
            {/* Connecting Line Upward from Item 1 (Ends right at this circle) */}
            <div className="absolute left-[4px] top-0 h-[12px] w-[2px] bg-neutral-300 dark:bg-neutral-700" />

            {/* Bottom Node Circle (Placed right at the end of the line) */}
            <div className="absolute left-0 top-[7px] z-10 flex h-2.5 w-2.5 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 dark:bg-neutral-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-800 dark:bg-neutral-200 ring-2 ring-white dark:ring-neutral-950" />
            </div>

            <div className="p-3 -m-3 rounded-xl transition-all duration-200 group-hover:bg-neutral-100/60 dark:group-hover:bg-neutral-800/40 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                    Freelance Software Engineer & Web Developer
                  </h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                    Freelance / Contract
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 shrink-0">
                  2022 — Present
                </span>
              </div>

              <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <MapPin size={12} className="text-neutral-400 shrink-0" />
                <span>Self-Employed / Client Projects • Remote & Hybrid</span>
              </p>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed pt-0.5">
                Delivering end-to-end web applications, custom management systems, company profiles, and database solutions for businesses and individual clients. Handling the full development lifecycle from discovery, database schema modeling, and API architecture to responsive UI implementation and cloud deployment.
              </p>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {["React", "Laravel", "Node.js", "PostgreSQL", "PHP", "Tailwind CSS", "REST API"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700/60 transition-transform duration-150 hover:scale-105 hover:border-neutral-400 dark:hover:border-neutral-500 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education & Bootcamp */}
      <div className="space-y-6 pt-4 border-t border-notion-border/70 dark:border-notion-darkBorder/70">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap size={15} className="text-neutral-500 dark:text-neutral-400" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold">
              Education & Bootcamp
            </h3>
          </div>
          <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
            Academic & Training
          </span>
        </div>

        <div className="pl-1">
          {/* Item 1: INSTIKI */}
          <div className="timeline-item group relative pl-7 pb-8">
            {/* Connecting Line Downward to Item 2 */}
            <div className="absolute left-[4px] top-[12px] bottom-0 w-[2px] bg-neutral-300 dark:bg-neutral-700" />

            {/* Top Node Circle (Placed right at the top tip of the line) */}
            <div className="absolute left-0 top-[7px] z-10 flex h-2.5 w-2.5 items-center justify-center">
              <span className="inline-flex rounded-full h-2.5 w-2.5 border-2 border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-950 group-hover:border-neutral-800 dark:group-hover:border-neutral-200 transition-colors" />
            </div>

            <div className="p-3 -m-3 rounded-xl transition-all duration-200 group-hover:bg-neutral-100/60 dark:group-hover:bg-neutral-800/40 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                    Bachelor of Informatics Engineering (S.Kom)
                  </h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                    Graduated
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 shrink-0">
                  INSTIKI
                </span>
              </div>

              <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <MapPin size={12} className="text-neutral-400 shrink-0" />
                <span>INSTIKI (Institut Bisnis dan Teknologi Indonesia) • Denpasar, Bali</span>
              </p>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed pt-0.5">
                Studied core software engineering principles, algorithm design, relational database systems, computer network architecture, and modern web application development.
              </p>

              {/* Skills/Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {["Software Engineering", "Database Systems", "Algorithms", "Network Architecture"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700/60 transition-transform duration-150 hover:scale-105 hover:border-neutral-400 dark:hover:border-neutral-500 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Item 2: Bootcamp */}
          <div className="timeline-item group relative pl-7 pb-2">
            {/* Connecting Line Upward from Item 1 (Ends right at this circle) */}
            <div className="absolute left-[4px] top-0 h-[12px] w-[2px] bg-neutral-300 dark:bg-neutral-700" />

            {/* Bottom Node Circle (Placed right at the end of the line) */}
            <div className="absolute left-0 top-[7px] z-10 flex h-2.5 w-2.5 items-center justify-center">
              <span className="inline-flex rounded-full h-2.5 w-2.5 border-2 border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-950 group-hover:border-neutral-800 dark:group-hover:border-neutral-200 transition-colors" />
            </div>

            <div className="p-3 -m-3 rounded-xl transition-all duration-200 group-hover:bg-neutral-100/60 dark:group-hover:bg-neutral-800/40 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                    Fullstack Web Development Bootcamp
                  </h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                    Certified
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 shrink-0">
                  Intensive Program
                </span>
              </div>

              <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                <Calendar size={12} className="text-neutral-400 shrink-0" />
                <span>Intensive Full-Stack Engineering Program • Industry Certified</span>
              </p>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed pt-0.5">
                Completed intensive, project-based training covering modern web application development, React ecosystem, RESTful API design, database modeling, and production deployment workflows.
              </p>

              {/* Skills/Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1.5">
                {["Modern React", "Node.js & Express", "Database Modeling", "Git & CI/CD"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700/60 transition-transform duration-150 hover:scale-105 hover:border-neutral-400 dark:hover:border-neutral-500 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
