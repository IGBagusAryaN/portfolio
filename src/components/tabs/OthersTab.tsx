"use client";

import { useState, useEffect, useMemo } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  Calendar,
  Sparkles,
} from "lucide-react";

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption?: string;
  category: "Workspace" | "Travel & Street" | "Tech & Gear" | "Daily";
  aspect: string; // Tailwind aspect-ratio class to create variable organic heights
  location?: string;
  date?: string;
}

// Curated photo collection with variable aspect ratios (tall, wide, square, cinematic)
// You can easily add your own photos by placing them in /public and adding an entry here!
const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "photo-1",
    src: "/arya-avatar.jpeg",
    title: "I Gede Bagus Arya Negara",
    caption: "Software Engineer & Webmaster based in West Jakarta.",
    category: "Daily",
    aspect: "aspect-[3/4]",
    location: "Jakarta, Indonesia",
    date: "2024",
  },
  {
    id: "photo-2",
    src: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80",
    title: "Minimalist Workspace",
    caption: "Clean desk setup with natural walnut finish and ambient lighting.",
    category: "Workspace",
    aspect: "aspect-[16/10]",
    location: "Studio",
    date: "2024",
  },
  {
    id: "photo-3",
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    title: "Late Night Code Session",
    caption: "Architecting backend microservices and TypeScript interfaces.",
    category: "Tech & Gear",
    aspect: "aspect-[4/5]",
    location: "Jakarta",
    date: "2024",
  },
  {
    id: "photo-4",
    src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    title: "Cyberpunk Metropolis",
    caption: "Neon reflections and rainy urban horizon through the lens.",
    category: "Travel & Street",
    aspect: "aspect-[9/14]",
    location: "Shinjuku, Tokyo",
    date: "2023",
  },
  {
    id: "photo-5",
    src: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
    title: "Dual Display Ergonomics",
    caption: "High productivity dual-screen arrangement for frontend layout testing.",
    category: "Workspace",
    aspect: "aspect-square",
    location: "Home Office",
    date: "2024",
  },
  {
    id: "photo-6",
    src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    title: "Morning Pour-over & Notes",
    caption: "Planning architecture sprints accompanied by single-origin Ethiopian coffee.",
    category: "Daily",
    aspect: "aspect-[4/3]",
    location: "Coffee Lab",
    date: "2024",
  },
  {
    id: "photo-7",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    title: "Silicon Core Hardware",
    caption: "Precision printed circuit motherboard circuitry and microcontrollers.",
    category: "Tech & Gear",
    aspect: "aspect-[16/11]",
    location: "Hardware Bench",
    date: "2023",
  },
  {
    id: "photo-8",
    src: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    title: "Tokyo Tower Twilight",
    caption: "Sunset hour catching orange luminescence over the capital skyline.",
    category: "Travel & Street",
    aspect: "aspect-[3/4]",
    location: "Roppongi",
    date: "2023",
  },
  {
    id: "photo-9",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    title: "Architectural Symmetry",
    caption: "Minimal geometric concrete atrium and diffused overhead skylights.",
    category: "Travel & Street",
    aspect: "aspect-[16/10]",
    location: "Civic Center",
    date: "2024",
  },
  {
    id: "photo-10",
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    title: "Mechanical Keeb & Retro Setup",
    caption: "Custom tactile switches with dye-sub PBT keycaps and coiled aviator cable.",
    category: "Tech & Gear",
    aspect: "aspect-square",
    location: "Desk",
    date: "2024",
  },
  {
    id: "photo-11",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    title: "Focused Flow State",
    caption: "Deploying production builds with Next.js and SQL database migrations.",
    category: "Workspace",
    aspect: "aspect-[4/5]",
    location: "Studio",
    date: "2024",
  },
  {
    id: "photo-12",
    src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
    title: "Neon Alley Reflections",
    caption: "Drizzle washing over asphalt in a tranquil alleyway.",
    category: "Travel & Street",
    aspect: "aspect-[9/16]",
    location: "Ginza",
    date: "2023",
  },
];

const CATEGORIES = ["All", "Workspace", "Travel & Street", "Tech & Gear", "Daily"] as const;

export default function OthersTab() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "All") return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Keyboard navigation for Lightbox (ESC, Left, Right)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;

      if (e.key === "Escape") {
        setSelectedPhotoIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex((prev) =>
          prev === null ? null : (prev - 1 + filteredPhotos.length) % filteredPhotos.length
        );
      } else if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredPhotos.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos.length]);

  const activePhoto =
    selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Description */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-mono">
              Gallery & Moments
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
              Visual glimpses into engineering workspaces, tech gears, travels, and everyday inspirations.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{filteredPhotos.length} captures</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedPhotoIndex(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer whitespace-nowrap outline-none ${
                  isActive
                    ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-sm"
                    : "bg-neutral-100/80 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/70 dark:hover:bg-neutral-700/60"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry Columns Gallery Grid - Variable Widths & Heights Packed Seamlessly */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {filteredPhotos.map((photo, idx) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhotoIndex(idx)}
            className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/70 transition-all duration-300 cursor-pointer"
          >
            {/* Variable Aspect Image Container */}
            <div className={`relative w-full ${photo.aspect} overflow-hidden bg-neutral-200 dark:bg-neutral-800`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Top Category Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-medium tracking-wide border border-white/10 shadow-sm">
                  {photo.category}
                </span>
              </div>

              {/* Top Right Expand Icon Button */}
              <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/10 shadow-sm">
                  <Maximize2 size={12} />
                </div>
              </div>

              {/* Bottom Vignette & Title Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <p className="text-sm font-semibold tracking-tight text-white line-clamp-1">
                  {photo.title}
                </p>
                {photo.location && (
                  <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-300 mt-0.5">
                    <MapPin size={11} className="shrink-0" />
                    <span>{photo.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Helpful Hint on adding own photos */}
      <div className="p-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700/80 bg-neutral-50/50 dark:bg-neutral-900/30 flex items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
        <Sparkles size={16} className="text-amber-500 shrink-0" />
        <span>
          Foto-foto di atas otomatis menyesuaikan rasio tinggi dan lebarnya tanpa celah. Kamu bisa menambahkan foto pribadimu kapan saja di dalam file <code className="text-neutral-800 dark:text-neutral-200">OthersTab.tsx</code>.
        </span>
      </div>

      {/* Full-Screen Interactive Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            aria-label="Close Lightbox"
            className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer outline-none focus:outline-none"
          >
            <X size={20} />
          </button>

          {/* Previous Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhotoIndex(
                (selectedPhotoIndex! - 1 + filteredPhotos.length) % filteredPhotos.length
              );
            }}
            aria-label="Previous Photo"
            className="absolute left-4 sm:left-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer outline-none focus:outline-none"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhotoIndex(
                (selectedPhotoIndex! + 1) % filteredPhotos.length
              );
            }}
            aria-label="Next Photo"
            className="absolute right-4 sm:right-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer outline-none focus:outline-none"
          >
            <ChevronRight size={22} />
          </button>

          {/* Image & Detail Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[88vh] flex flex-col items-center justify-center space-y-3"
          >
            <div className="relative overflow-hidden rounded-2xl max-h-[75vh] shadow-2xl border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl"
              />
            </div>

            {/* Photo Info Bar */}
            <div className="text-center space-y-1 max-w-xl text-white px-4">
              <h3 className="text-base sm:text-lg font-semibold tracking-tight">
                {activePhoto.title}
              </h3>
              {activePhoto.caption && (
                <p className="text-xs sm:text-sm text-neutral-300">
                  {activePhoto.caption}
                </p>
              )}
              <div className="flex items-center justify-center gap-3 text-[11px] font-mono text-neutral-400 pt-1">
                {activePhoto.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={11} />
                    {activePhoto.location}
                  </span>
                )}
                {activePhoto.date && (
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {activePhoto.date}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px]">
                  {activePhoto.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
