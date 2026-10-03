"use client";

import { useState } from "react";
import { FileText, Terminal, Monitor } from "lucide-react";
import { InstallBox } from "./install-box";
import { GithubIcon } from "@/components/ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Hero() {
  const [screenMode, setScreenMode] = useState<"cli" | "desktop">("cli");

  return (
    <section id="hero" className="relative min-h-screen lg:h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-16 pb-6">
      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center w-full">
        {/* Release / Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] mb-4 sm:mb-5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-xs font-mono font-medium text-white">
            Cube v1.0.0
          </span>
          <span className="text-[#27272A]">•</span>
          <span className="text-xs font-mono text-[#A1A1AA]">
            Engineered in the Terminal
          </span>
        </div>

        {/* Headline: display-lg (Inter 500, lineHeight 1.04) */}
        <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-medium tracking-tight text-white leading-[1.06] max-w-3xl mb-3.5">
          A coding agent that lives where you already work
        </h1>

        {/* Subhead: body-md (Inter 400, lineHeight 1.5) */}
        <p className="text-sm sm:text-base text-[#A1A1AA] max-w-2xl font-normal leading-[1.5] mb-5 sm:mb-6">
          Differential-rendering TUI, multi-mode authentication (Claude Pro, ChatGPT Plus, 15+ API keys, or offline Ollama), workspace memory, and atomic code mutations.
        </p>

        {/* Two-Button CTA Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-5 sm:mb-6">
          <a
            href="https://github.com/hphucdev-04"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#18181B] border border-[#27272A] hover:border-white/30 text-white font-medium text-xs sm:text-sm transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5 text-[#A1A1AA]" />
            <span>View on GitHub</span>
          </a>

          <a
            href="#docs"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#18181B] border border-[#27272A] hover:border-white/30 text-[#A1A1AA] hover:text-white font-medium text-xs sm:text-sm transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Explore Docs</span>
          </a>
        </div>

        {/* 2-Screen Switcher: CLI vs Desktop */}
        <div className="relative z-20 flex items-center justify-center p-1 rounded-full bg-[#18181B] border border-[#27272A] mb-4 shadow-sm">
          <button
            type="button"
            onClick={() => setScreenMode("cli")}
            className={cn(
              "relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-colors select-none cursor-pointer",
              screenMode === "cli"
                ? "text-black font-semibold"
                : "text-[#A1A1AA] hover:text-white"
            )}
          >
            {screenMode === "cli" && (
              <motion.span
                layoutId="heroScreenSelector"
                className="absolute inset-0 rounded-full bg-white shadow-sm z-0"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <Terminal className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">CLI</span>
          </button>

          <button
            type="button"
            onClick={() => setScreenMode("desktop")}
            className={cn(
              "relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-colors select-none cursor-pointer",
              screenMode === "desktop"
                ? "text-black font-semibold"
                : "text-[#A1A1AA] hover:text-white"
            )}
          >
            {screenMode === "desktop" && (
              <motion.span
                layoutId="heroScreenSelector"
                className="absolute inset-0 rounded-full bg-white shadow-sm z-0"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <Monitor className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">Desktop</span>
            <span
              className={cn(
                "relative z-10 px-1.5 py-0.2 rounded text-[10px] font-mono uppercase tracking-wider font-semibold transition-colors",
                screenMode === "desktop"
                  ? "bg-black/15 text-black"
                  : "bg-white/10 text-white/90 border border-white/15"
              )}
            >
              Coming Soon
            </span>
          </button>
        </div>

        {/* Active Screen Display (CLI or Desktop) */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {screenMode === "cli" ? (
              <motion.div
                key="cli-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full"
              >
                {/* Instant Install Command Box (CLI as currently) */}
                <InstallBox idPrefix="hero" />
              </motion.div>
            ) : (
              <motion.div
                key="desktop-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full"
              >
                {/* Desktop Screen: Compact Coming Soon Box (No fake frame) */}
                <div className="w-full max-w-[550px] mx-auto py-7 px-6 rounded-xl bg-[#0D0D0F] border border-[#27272A] flex flex-col items-center justify-center text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-amber-300 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>Coming Soon</span>
                  </div>
                  <h3 className="text-base font-medium text-white mb-1">Cube Desktop</h3>
                  <p className="text-xs font-mono text-[#A1A1AA]">
                    Native desktop application is currently in development.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
