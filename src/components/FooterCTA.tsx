"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Rocket from "./Rocket";

interface FooterCTAProps {
  onNavigateToContact?: () => void;
}

export default function FooterCTA({ onNavigateToContact }: FooterCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Scroll Animations: Card Reveal & Rocket Scroll Parallax
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggers: ScrollTrigger[] = [];

    // Card entrance on scroll
    if (cardRef.current && sectionRef.current) {
      const tw = gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      if (tw.scrollTrigger) triggers.push(tw.scrollTrigger);
    }

    // Rocket Scroll Parallax (floats upward as you scroll past)
    if (sectionRef.current) {
      const rocketTw = gsap.to("#rocket-wrapper", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      if (rocketTw.scrollTrigger) triggers.push(rocketTw.scrollTrigger);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    const rocket = sectionRef.current.querySelector("#rocket-wrapper");
    if (rocket) {
      gsap.to(rocket, {
        x: relX * 28,
        y: relY * 22,
        rotation: relX * 8,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!sectionRef.current) return;
    const rocket = sectionRef.current.querySelector("#rocket-wrapper");
    if (rocket) {
      gsap.to(rocket, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.4)",
      });
    }
  };

  const handleContactClick = () => {
    if (btnRef.current) {
      gsap
        .timeline()
        .to(btnRef.current, { scale: 0.95, duration: 0.1 })
        .to(btnRef.current, { scale: 1, duration: 0.2, ease: "power2.out" })
        .call(() => {
          if (onNavigateToContact) {
            onNavigateToContact();
          }
        });
    } else if (onNavigateToContact) {
      onNavigateToContact();
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* 4. FOOTER / CTA SECTION */}
      <section
        id="contact"
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="scroll-mt-24 pt-6 border-t border-neutral-200/80 dark:border-neutral-800"
      >
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white/75 dark:bg-neutral-900/60 backdrop-blur-sm p-8 sm:p-12 shadow-xs transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
        >
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="space-y-3 max-w-md">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-semibold">
                Get In Touch
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-mono">
                What I've Been Up To
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                I'm looking for collaboration in Frontend Development! Let's connect!
              </p>

              {/* Clean & Elevated Contact Button */}
              <div className="pt-2">
                <button
                  ref={btnRef}
                  onClick={handleContactClick}
                  className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-mono font-semibold text-white dark:text-neutral-900 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-neutral-950/15 dark:hover:shadow-white/10 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  {/* Specular Shimmer Sweep on Hover */}
                  <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none" />

                  {/* Pulsing Active Radar Indicator */}
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>

                  {/* Clean Text Label */}
                  <span className="relative z-10 select-none">Contact me</span>

                  {/* Smooth Sliding Arrow */}
                  <ArrowUpRight
                    size={15}
                    className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                  />
                </button>
              </div>
            </div>

            {/* Parallax Rocket */}
            <div className="self-center sm:self-auto flex items-center justify-center p-4">
              <Rocket />
            </div>
          </div>
        </div>
      </section>

      {/* Others Section */}
      <section
        id="others"
        className="scroll-mt-24 pt-4 border-t border-neutral-200/80 dark:border-neutral-800 text-xs font-mono text-neutral-400 dark:text-neutral-500 flex flex-col sm:flex-row justify-between items-center gap-4 pb-12"
      >
        <div>
          <span>
            © {currentYear} I Gede Bagus Arya Negara. Built with Next.js, Tailwind & GSAP.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="mailto:gede.arya.negara@gmail.com"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Email
          </a>
          <span>•</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </section>
    </>
  );
}
