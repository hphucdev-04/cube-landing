"use client";

import { Sparkles, Terminal, ArrowDown } from "lucide-react";
import { InstallBox } from "./install-box";

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient background glow & grid lines */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#00F0FF]/15 via-[#A855F7]/10 to-transparent blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />

      <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-[#00F0FF]/25 shadow-[0_0_15px_rgba(0,240,255,0.15)] mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span className="text-xs font-mono font-medium text-gray-200">
            Cube v1.0.0 Released
          </span>
          <span className="text-gray-500">•</span>
          <span className="text-xs font-mono text-[#00F0FF]">
            Zero Data Retention
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl mb-6">
          The Autonomous Coding Agent Built for Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#10B981] to-[#A855F7]">
            Terminal.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-gray-400 max-w-2xl font-normal leading-relaxed mb-10">
          Differential-rendering TUI, multi-gateway model routing (Claude, Grok,
          Gemini, OpenAI, Ollama), local SQLite memory, and atomic workspace
          mutations — engineered for speed.
        </p>

        {/* One-Liner Install Widget */}
        <InstallBox />

        {/* Scroll indicator */}
        <div className="mt-14 flex flex-col items-center gap-2 text-xs font-mono text-gray-500">
          <span>Explore Live Showcase</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#00F0FF]/70" />
        </div>
      </div>
    </section>
  );
}
