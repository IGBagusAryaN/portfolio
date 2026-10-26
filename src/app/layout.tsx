import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "I Gede Bagus Arya Negara — Software Engineer & Webmaster",
  description:
    "Portfolio of I Gede Bagus Arya Negara — Software Engineer, Web Master, Database Specialist based in West Jakarta, Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-notion-bg dark:bg-notion-darkBg text-notion-text dark:text-notion-darkText antialiased min-h-screen relative overflow-x-hidden transition-colors duration-300">
        {/* Ambient Canvas Grid & Radial Vignette */}
        <div className="fixed inset-0 bg-grid pointer-events-none z-0 opacity-80" />
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.05),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.03),rgba(0,0,0,0))]" />

        {children}
      </body>
    </html>
  );
}
