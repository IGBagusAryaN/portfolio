"use client";

import { useState } from "react";
import {
  Mail,
  Linkedin,
  Github,
  Instagram,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react";

interface SocialLink {
  name: string;
  handle: string;
  href: string;
  icon: JSX.Element;
  isEmail?: boolean;
}

export default function ContactTab() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "gede.arya.negara@gmail.com";

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SOCIAL_LINKS: SocialLink[] = [
    {
      name: "Email",
      handle: emailAddress,
      href: `mailto:${emailAddress}`,
      isEmail: true,
      icon: <Mail size={18} />,
    },
    {
      name: "Spotify",
      handle: "Music & Playlists",
      href: "https://open.spotify.com",
      icon: (
        <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      handle: "I Gede Bagus Arya Negara",
      href: "https://linkedin.com",
      icon: <Linkedin size={18} />,
    },
    {
      name: "GitHub",
      handle: "@IGBagusAryaN",
      href: "https://github.com",
      icon: <Github size={18} />,
    },
    {
      name: "Instagram",
      handle: "@arya",
      href: "https://instagram.com",
      icon: <Instagram size={18} />,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 font-mono">
          Contact & Socials
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Feel free to reach out or connect through any of the platforms below.
        </p>
      </div>

      {/* Clean Minimalist Buttons List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SOCIAL_LINKS.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target={item.isEmail ? undefined : "_blank"}
            rel={item.isEmail ? undefined : "noopener noreferrer"}
            className="group flex items-center justify-between p-4 rounded-xl border border-neutral-200/90 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/50 hover:bg-neutral-100/90 dark:hover:bg-neutral-800/70 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 cursor-pointer shadow-sm"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-center text-neutral-700 dark:text-neutral-300 shrink-0 group-hover:scale-105 transition-transform duration-200">
                {item.icon}
              </div>
              <div className="min-w-0 text-left">
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 font-mono">
                  {item.name}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate font-mono">
                  {item.handle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pl-3 shrink-0">
              {item.isEmail && (
                <button
                  onClick={handleCopyEmail}
                  title="Copy email address"
                  className="p-1.5 rounded-md text-xs font-mono border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60 text-neutral-600 dark:text-neutral-400 transition-colors"
                >
                  {copied ? (
                    <Check size={14} className="text-emerald-500" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              )}
              <div className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
