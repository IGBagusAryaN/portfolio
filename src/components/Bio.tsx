"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const P1_TEXT =
  "As a Software Engineer and Webmaster at PT Sinar Metrindo Perkasa, I specialize in JavaScript and TypeScript, leveraging modern technologies to create seamless user experiences and ensure robust site architecture. In my daily operations, I work extensively with SQL Server and MySQL to manage, query, and optimize data, bridging dynamic frontend interfaces with reliable backend systems.";

const P2_TEXT =
  "Through my professional experience, I bring hands-on expertise in web development, UI/UX enhancement, and performance optimization. My dual role allows me to apply deep full-stack knowledge to oversee how web applications function as a complete ecosystem. My goal is to continuously improve, ensuring that every project I architect and maintain meets the highest standards of quality and usability.";

export default function Bio() {
  const containerRef = useRef<HTMLElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggers: ScrollTrigger[] = [];

    // Fade out scroll cue when scrolling starts
    if (scrollCueRef.current) {
      const cueTw = gsap.to(scrollCueRef.current, {
        opacity: 0,
        y: 10,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "top top",
          scrub: true,
        },
      });
      if (cueTw.scrollTrigger) triggers.push(cueTw.scrollTrigger);
    }

    // Paragraph 1 Word Illumination
    if (p1Ref.current) {
      const p1Words = p1Ref.current.querySelectorAll<HTMLSpanElement>(".bio-word");
      const tw1 = gsap.to(p1Words, {
        opacity: 1,
        stagger: 0.02,
        ease: "none",
        scrollTrigger: {
          trigger: p1Ref.current,
          start: "top 80%",
          end: "bottom 55%",
          scrub: 0.5,
        },
      });
      if (tw1.scrollTrigger) triggers.push(tw1.scrollTrigger);
    }

    // Paragraph 2 Word Illumination
    if (p2Ref.current) {
      const p2Words = p2Ref.current.querySelectorAll<HTMLSpanElement>(".bio-word");
      const tw2 = gsap.to(p2Words, {
        opacity: 1,
        stagger: 0.02,
        ease: "none",
        scrollTrigger: {
          trigger: p2Ref.current,
          start: "top 80%",
          end: "bottom 50%",
          scrub: 0.5,
        },
      });
      if (tw2.scrollTrigger) triggers.push(tw2.scrollTrigger);
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const renderWords = (text: string) => {
    return text.split(/\s+/).map((word, i) => (
      <span
        key={i}
        className="bio-word inline-block mr-[0.28em] opacity-25 text-neutral-900 dark:text-neutral-100 transition-opacity duration-150 select-text"
      >
        {word}
      </span>
    ));
  };

  return (
    <section ref={containerRef} id="about" className="space-y-3.5 sm:space-y-4 scroll-mt-20">
      {/* Intro Headline */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-mono">
          <span>Helloo, i'm arya</span>
          <span
            className="inline-block animate-wave cursor-pointer hover:scale-125 transition-transform"
            role="img"
            aria-label="waving hand"
          >
            👋
          </span>
        </div>

        {/* Subtle Animated Scroll Cue */}
        <div
          ref={scrollCueRef}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 dark:text-neutral-500 animate-pulse"
        >
          <span>Scroll to read</span>
          <svg className="w-3.5 h-3.5 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Paragraphs with ScrollTrigger Line/Word Illuminating Reveal */}
      <div className="space-y-3.5 text-base sm:text-lg leading-relaxed font-normal">
        <p ref={p1Ref} className="text-justify sm:text-left select-text">
          {renderWords(P1_TEXT)}
        </p>

        <p ref={p2Ref} className="text-justify sm:text-left select-text">
          {renderWords(P2_TEXT)}
        </p>
      </div>
    </section>
  );
}
