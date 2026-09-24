"use client";

import { Sparkles, ArrowRight, FileText } from "lucide-react";
import { InstallBox } from "./install-box";
import { GithubIcon } from "@/components/ui/icons";

export function Hero() {
  return (
    <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Release / Status Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4] animate-pulse" />
          <span className="text-xs font-mono font-medium text-[#A1A1AA]">
            Cube v1.0.0
          </span>
          <span className="text-[#27272A]">•</span>
          <span className="text-xs font-mono text-[#5EEAD4]">
            Engineered in the Terminal
          </span>
        </div>

        {/* Headline: display-lg (Inter 500, 64px, lineHeight 1.04) */}
        <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-medium tracking-tight text-white leading-[1.04] max-w-3xl mb-6">
          A coding agent that lives where you already work.
        </h1>

        {/* Subhead: body-md (Inter 400, 16px, lineHeight 1.6) */}
        <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl font-normal leading-[1.6] mb-10">
          Differential-rendering TUI, multi-mode authentication (Claude Pro, ChatGPT Plus, 15+ API keys, or offline Ollama), workspace memory, and atomic code mutations.
        </p>

        {/* Two-Button CTA Row */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <a
            href="#install"
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white text-black hover:bg-[#5EEAD4] font-medium text-sm transition-colors shadow-lg cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="https://github.com/hphucdev-04/cube"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#18181B] border border-[#27272A] hover:border-white/30 text-white font-medium text-sm transition-colors"
          >
            <GithubIcon className="w-4 h-4 text-[#A1A1AA]" />
            <span>View on GitHub</span>
          </a>

          <a
            href="#docs"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#18181B] border border-[#27272A] hover:border-white/30 text-[#A1A1AA] hover:text-white font-medium text-sm transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Explore Docs</span>
          </a>
        </div>

        {/* Instant Install Command Box */}
        <InstallBox />
      </div>
    </section>
  );
}
