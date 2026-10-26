"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Tool {
  name: string;
  icon: React.ReactNode;
}

const TOOLS: Tool[] = [
  {
    name: "TypeScript",
    icon: (
      <svg className="w-3.5 h-3.5 text-blue-500 fill-current" viewBox="0 0 24 24">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM12.65 10.97h3.19v1.884h-1.18v6.784h-2.01v-6.784h-1.18V10.97h1.18zm4.33 2.12c.57-.38 1.34-.63 2.22-.63 1.63 0 2.61.85 2.61 2.3v.13c-.34-.1-.76-.17-1.28-.17-1.32 0-2.48.53-2.48 1.83 0 1.05.77 1.74 1.84 1.74.96 0 1.66-.46 2.05-1.07v.94h1.83V14.7c0-2.22-1.42-3.41-3.69-3.41-1.23 0-2.27.34-2.88.75l-.22.15.01-.01.99 1.49z" />
      </svg>
    ),
  },
  {
    name: "Docker",
    icon: (
      <svg className="w-3.5 h-3.5 text-sky-500 fill-current" viewBox="0 0 24 24">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186zm5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185M23.79 11.23c-.417-.29-1.343-.448-2.302-.27-1.127.21-1.895.962-2.316 2.01a6.837 6.837 0 00-2.42-.45c-.322 0-.64.027-.954.077a7.666 7.666 0 00-.814.156c-.053-.01-.106-.02-.16-.028H.927a.927.927 0 00-.927.927 9.873 9.873 0 004.996 8.56 14.887 14.887 0 007.697 2.1c8.118 0 11.26-6.16 11.26-9.845 0-.46-.037-.91-.108-1.345.545-.36 1.05-.884.945-1.892z" />
      </svg>
    ),
  },
  {
    name: "Express",
    icon: <span className="text-[10px] font-bold tracking-tighter border border-current px-1 py-0.2 rounded">EX</span>,
  },
  {
    name: "NodeJS",
    icon: (
      <svg className="w-3.5 h-3.5 text-emerald-600 fill-current" viewBox="0 0 24 24">
        <path d="M12 0l10.392 6v12L12 24l-10.392-6V6L12 0zm0 2.215L3.6 7.062v9.692L12 21.57l8.4-4.816V7.062L12 2.215z" />
      </svg>
    ),
  },
  {
    name: "ReactJS",
    icon: (
      <svg className="w-3.5 h-3.5 text-cyan-500 fill-current animate-[spin_10s_linear_infinite]" viewBox="0 0 24 24">
        <path d="M12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm0-7.5c-4.418 0-8 2.015-8 4.5 0 1.157.777 2.222 2.083 3.032A9.458 9.458 0 014 12c0 .878.293 1.706.815 2.43C3.218 15.26 2 16.55 2 18c0 2.485 3.582 4.5 8 4.5s8-2.015 8-4.5c0-1.45-1.218-2.74-2.815-3.57.522-.724.815-1.552.815-2.43 0-.9-.307-1.748-.842-2.489C19.245 8.71 20 7.64 20 6.5c0-2.485-3.582-4.5-8-4.5zM12 3.5c3.314 0 6 1.343 6 3 0 .54-.288 1.05-.795 1.503-.996-.704-2.28-1.258-3.753-1.603A12.784 12.784 0 0012 6.25c-.496 0-.98.05-1.452.15-1.473.345-2.757.899-3.753 1.603C6.288 7.55 6 7.04 6 6.5c0-1.657 2.686-3 6-3z" />
      </svg>
    ),
  },
  {
    name: "ViteJS",
    icon: (
      <svg className="w-3.5 h-3.5 text-purple-500 fill-current" viewBox="0 0 24 24">
        <path d="M23.003 4.027a.9.9 0 00-.814-.548H15.93a.9.9 0 00-.86.634l-3.082 9.774-2.2-4.636a.9.9 0 00-.81-.515H1.815a.9.9 0 00-.814 1.282l9.013 18.026a.9.9 0 001.61 0l11.379-18.03a.9.9 0 000-1.002v.015z" />
      </svg>
    ),
  },
  {
    name: "NextJs",
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.836 17.587l-6.38-8.23v8.23H9.728V6.413h1.728l6.38 8.23V6.413h1.728v11.174h-1.728z" />
      </svg>
    ),
  },
  {
    name: "InertiaJS",
    icon: (
      <svg className="w-3.5 h-3.5 text-violet-500 fill-current" viewBox="0 0 24 24">
        <path d="M3.2 5.6h5.6l8.8 8.8-5.6 5.6-8.8-8.8V5.6zm12 0h5.6v5.6l-2.8 2.8-5.6-5.6 2.8-2.8z" />
      </svg>
    ),
  },
  {
    name: "React Native",
    icon: (
      <svg className="w-3.5 h-3.5 text-blue-400 fill-current" viewBox="0 0 24 24">
        <path d="M12 9a3 3 0 100 6 3 3 0 000-6zm0-7c-5 0-9 2.5-9 5.5 0 1.5 1 2.8 2.6 3.8C4.6 12 4 13 4 14.2c0 3 4 5.8 9 5.8s9-2.8 9-5.8c0-1.2-.6-2.2-1.6-2.9C21 10.3 22 9 22 7.5 22 4.5 17 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "Postgre",
    icon: (
      <svg className="w-3.5 h-3.5 text-sky-700 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V11h3v5.5zm1.5-7.5H9.5V7.5C9.5 6.67 10.17 6 11 6h2c.83 0 1.5.67 1.5 1.5V9z" />
      </svg>
    ),
  },
  {
    name: "ChakraUI",
    icon: (
      <svg className="w-3.5 h-3.5 text-teal-400 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.8 17.5l-4.5-4.5 1.4-1.4 3.1 3.1 7.6-7.6 1.4 1.4-9 9z" />
      </svg>
    ),
  },
  {
    name: "PrismaORM",
    icon: (
      <svg className="w-3.5 h-3.5 text-teal-600 fill-current" viewBox="0 0 24 24">
        <path d="M21.56 18.25L13.78 1.48a1.98 1.98 0 0 0-3.57 0L2.44 18.25a2 2 0 0 0 1.78 2.82h15.56a2 2 0 0 0 1.78-2.82zM12 4.67l6.6 14.4H5.4L12 4.67z" />
      </svg>
    ),
  },
  {
    name: "Laravel",
    icon: (
      <svg className="w-3.5 h-3.5 text-red-500 fill-current" viewBox="0 0 24 24">
        <path d="M21.6 6.8l-8.5-4.9a2.3 2.3 0 00-2.3 0L2.4 6.8a2.3 2.3 0 00-1.1 2v9.8a2.3 2.3 0 001.1 2l8.5 4.9c.7.4 1.5.4 2.3 0l8.5-4.9a2.3 2.3 0 001.1-2V8.8a2.3 2.3 0 00-1.2-2zM12 3.6l7.8 4.5L12 12.6 4.2 8.1 12 3.6z" />
      </svg>
    ),
  },
  {
    name: "Tailwind",
    icon: (
      <svg className="w-3.5 h-3.5 text-teal-400 fill-current" viewBox="0 0 24 24">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: "Javascript",
    icon: (
      <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.621-1.554-1.288 0-.437.368-.782 1.012-.782.713 0 1.242.276 1.656.782.161.207.391.276.575.161l1.54-1.012c.161-.115.207-.322.092-.506-.851-1.356-2.184-1.885-3.862-1.885-2.161 0-3.678 1.356-3.678 3.333 0 1.747 1.127 2.69 3.035 3.425.828.322 1.54.667 1.54 1.333 0 .529-.483.897-1.31.897-.989 0-1.678-.46-2.115-1.127-.115-.184-.322-.253-.529-.161l-1.678 1.035c-.161.092-.207.322-.092.483 1.035 1.701 2.506 2.345 4.345 2.345 2.575 0 3.977-1.425 3.977-3.46v-.046zm-9.379-7.149H10.15v7.241c0 1.54-.782 2.115-2.046 2.115-.621 0-1.218-.138-1.586-.345-.161-.092-.23-.276-.207-.46l.414-1.632c.046-.184.207-.299.391-.253.253.092.575.184.92.184.437 0 .69-.23.69-.759V11.127H6.223c-.23 0-.414-.184-.414-.414V9.31c0-.23.184-.414.414-.414h6.432c.23 0 .414.184.414.414v1.403c0 .23-.184.414-.414.414z" />
      </svg>
    ),
  },
  {
    name: "PHP",
    icon: (
      <svg className="w-3.5 h-3.5 text-indigo-400 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-5 13H5V9h2.5c1.4 0 2.5 1.1 2.5 2.5S8.9 14 7.5 14H7v1zm2-3.5c0-.6-.4-1-1-1H7v2h1c.6 0 1-.4 1-1zm8.5 3.5h-2V9h2.5c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5h-.5v1zm2-3.5c0-.6-.4-1-1-1h-1v2h1c.6 0 1-.4 1-1z" />
      </svg>
    ),
  },
  {
    name: "HTML",
    icon: (
      <svg className="w-3.5 h-3.5 text-orange-500 fill-current" viewBox="0 0 24 24">
        <path d="M12 17.5L6.5 16l-1-12h13l-1 12-5.5 1.5z" />
      </svg>
    ),
  },
  {
    name: "CSS",
    icon: (
      <svg className="w-3.5 h-3.5 text-blue-500 fill-current" viewBox="0 0 24 24">
        <path d="M4 2l1.5 17L12 22l6.5-3L20 2H4zm13.3 5.4H8.4l.2 2.3h8.3l-.6 6.3-4.3 1.2-4.3-1.2-.3-3.1h2.3l.1 1.4 2.2.6 2.2-.6.2-2.3H8l-.7-6.9h10.2l-.2 2.3z" />
      </svg>
    ),
  },
  {
    name: "Alpine.js",
    icon: (
      <svg className="w-3.5 h-3.5 text-sky-400 fill-current" viewBox="0 0 24 24">
        <path d="M24 12l-5.657 5.657-5.657-5.657L18.343 6.343 24 12zm-12 0L6.343 17.657.686 12 6.343 6.343 12 12z" />
      </svg>
    ),
  },
  {
    name: "Framer Motion",
    icon: (
      <svg className="w-3.5 h-3.5 text-pink-500 fill-current" viewBox="0 0 24 24">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    ),
  },
  {
    name: "mySQL",
    icon: (
      <svg className="w-3.5 h-3.5 text-amber-600 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zm0 3c4.41 0 8 1.34 8 2s-3.59 2-8 2-8-1.34-8-2 3.59-2 8-2zm8 12.5c0 .66-3.59 2-8 2s-8-1.34-8-2v-2.15c2.14 1.33 5.09 2.15 8 2.15s5.86-.82 8-2.15v2.15z" />
      </svg>
    ),
  },
  {
    name: "Bootstrap",
    icon: (
      <svg className="w-3.5 h-3.5 text-purple-600 fill-current" viewBox="0 0 24 24">
        <path d="M18.8 6.4c-1.1-.9-2.7-1.4-4.8-1.4H8v14h6.3c2.1 0 3.7-.5 4.8-1.4 1.1-.9 1.7-2.3 1.7-4 0-1.2-.3-2.2-1-3 .7-.8 1-1.8 1-3.1 0-1.8-.6-3.1-1.7-4.1zM11.5 8h2.3c.9 0 1.6.2 2 .6.4.4.6 1 .6 1.7 0 .7-.2 1.3-.6 1.7-.4.4-1.1.6-2 .6h-2.3V8zm3 9.4h-3v-4.8h3c1 0 1.8.2 2.3.7.5.5.7 1.1.7 1.8 0 .8-.2 1.4-.7 1.8-.5.3-1.3.5-2.3.5z" />
      </svg>
    ),
  },
  {
    name: "Shadcn UI",
    icon: <span className="text-xs font-bold leading-none">/</span>,
  },
  {
    name: "Material UI",
    icon: (
      <svg className="w-3.5 h-3.5 text-blue-600 fill-current" viewBox="0 0 24 24">
        <path d="M0 2.475v10.39l3 1.733V7.67l6 3.465 6-3.465v6.928l3-1.733V2.475L12 5.94 0 2.475zM12 12.88l-6 3.465 3 1.732 3-1.732 3 1.732 3-1.732-6-3.465zM6 18.077l6 3.465 6-3.465-3-1.732-3 1.732-3-1.732-3 1.732z" />
      </svg>
    ),
  },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const validPills = pillsRef.current.filter(Boolean) as HTMLDivElement[];

    // Dynamic ScrollTrigger Stagger Entrance
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      onEnter: () => {
        gsap.fromTo(
          validPills,
          { opacity: 0, y: 20, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.02,
            ease: "back.out(1.2)",
          }
        );
      },
      once: true,
    });

    // Subtle gentle floating drift for organic feel
    const floatTweens: gsap.core.Tween[] = [];
    validPills.forEach((pill, idx) => {
      const distance = 2 + (idx % 3);
      const duration = 2.2 + (idx % 4) * 0.4;
      const tw = gsap.to(pill, {
        y: `-=${distance}`,
        duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: (idx % 5) * 0.15,
      });
      floatTweens.push(tw);
    });

    return () => {
      trigger.kill();
      floatTweens.forEach((tw) => tw.kill());
    };
  }, []);

  const handleMouseEnter = (pill: HTMLDivElement) => {
    gsap.to(pill, {
      scale: 1.08,
      y: -5,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const handleMouseLeave = (pill: HTMLDivElement) => {
    gsap.to(pill, {
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <section id="skills" className="space-y-3.5 pt-4 border-t border-notion-border/70 dark:border-notion-darkBorder/70">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400 font-semibold flex items-center gap-2">
          <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          Tools that I have used
        </h2>
        <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 hidden sm:inline">
          {TOOLS.length} Technologies
        </span>
      </div>

      {/* Structured Clean Grid Layout (Original Style with Animations) */}
      <div ref={containerRef} className="flex flex-wrap gap-2.5 sm:gap-3">
        {TOOLS.map((tool, idx) => (
          <div
            key={tool.name}
            ref={(el) => {
              pillsRef.current[idx] = el;
            }}
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            className="tech-pill flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm text-xs font-mono text-neutral-800 dark:text-neutral-200 shadow-sm transition-colors hover:border-neutral-950 dark:hover:border-white cursor-pointer select-none"
          >
            <span className="flex-shrink-0">{tool.icon}</span>
            <span className="font-medium">{tool.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
