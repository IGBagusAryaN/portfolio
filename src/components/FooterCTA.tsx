"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;

    gsap.to(e.currentTarget, {
      x,
      y,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleBtnMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const handleContactClick = () => {
    if (btnRef.current) {
      gsap.timeline()
        .to(btnRef.current, { scale: 0.94, duration: 0.12 })
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
        className="scroll-mt-24 pt-6 border-t border-notion-border/70 dark:border-notion-darkBorder/70"
      >
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl border border-notion-border dark:border-notion-darkBorder bg-gradient-to-b from-white/90 to-neutral-50/50 dark:from-neutral-900/80 dark:to-neutral-950/60 p-8 sm:p-12 shadow-sm"
        >
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="space-y-3 max-w-md">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-semibold">
                Get In Touch
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-mono">
                What I've Been Up To
              </h3>
              <p className="text-sm sm:text-base text-notion-muted dark:text-notion-darkMuted leading-relaxed">
                I'm looking for collaboration in Frontend Development! Let's connect!
              </p>

              {/* Contact Button triggering Tab Switch to Contact */}
              <div className="pt-2">
                <button
                  ref={btnRef}
                  onClick={handleContactClick}
                  onMouseMove={handleBtnMouseMove}
                  onMouseLeave={handleBtnMouseLeave}
                  className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full text-xs sm:text-sm font-mono font-medium text-white dark:text-neutral-900 bg-neutral-900 dark:bg-white overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  {/* Sweeping overlay on hover */}
                  <span className="absolute inset-0 bg-neutral-800 dark:bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />

                  {/* Rolling Text Container */}
                  <span className="relative z-10 btn-roll-container h-[18px]">
                    <span className="btn-roll-inner">
                      <span>Contact me</span>
                      <span>Go to Contact ↗</span>
                    </span>
                  </span>

                  {/* Arrow Icon */}
                  <svg
                    className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
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
        className="scroll-mt-24 pt-4 border-t border-notion-border/70 dark:border-notion-darkBorder/70 text-xs font-mono text-neutral-400 dark:text-neutral-500 flex flex-col sm:flex-row justify-between items-center gap-4 pb-12"
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
