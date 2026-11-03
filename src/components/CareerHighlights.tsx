"use client";

import { motion, type Variants } from "framer-motion";
import { Briefcase, Database, Sparkles } from "lucide-react";

interface HighlightItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
}

const HIGHLIGHTS: HighlightItem[] = [
  {
    id: "enterprise",
    title: "Enterprise Systems & Automation",
    description:
      "Mengembangkan sistem software B2B, alur persetujuan (approval workflows) kustom, dan queue workers otomatis menggunakan clean architecture untuk memastikan keandalan sistem skala besar.",
    icon: <Briefcase className="w-5 h-5" />,
    tag: "B2B • Architecture",
  },
  {
    id: "database",
    title: "Database Architecture & Optimization",
    description:
      "Mengelola dan mengoptimalkan database relasional (SQL Server & MySQL). Berpengalaman penuh dalam menulis, melakukan debugging, dan mengoptimalkan T-SQL stored procedures serta views untuk efisiensi operasional.",
    icon: <Database className="w-5 h-5" />,
    tag: "SQL Server • MySQL",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function CareerHighlights() {
  return (
    <section className="space-y-4 pt-2">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold flex items-center gap-2">
          <Sparkles size={14} className="text-neutral-400 dark:text-neutral-500" />
          Career Highlights
        </h2>
        <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
          2 Focus Areas
        </span>
      </div>

      {/* 2-Column Responsive Grid with Framer Motion Stagger Animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-30px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4.5"
      >
        {HIGHLIGHTS.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
            className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white/75 dark:bg-neutral-900/60 backdrop-blur-sm shadow-xs hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-200"
          >
            <div className="space-y-3.5">
              {/* Card Header: Icon & Tag */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/60 flex items-center justify-center text-neutral-700 dark:text-neutral-300 group-hover:scale-105 group-hover:text-neutral-950 dark:group-hover:text-white transition-all duration-200">
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-700/60">
                  {item.tag}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-sm sm:text-base font-semibold font-mono tracking-tight text-neutral-900 dark:text-neutral-100 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed text-justify sm:text-left">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Subtle bottom accent line on hover */}
            <div className="mt-4 pt-3 border-t border-neutral-200/50 dark:border-neutral-800/60 flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
              <span>Production Proven</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-neutral-700 dark:text-neutral-300 font-medium">
                Learn more &rarr;
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
