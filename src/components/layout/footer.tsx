"use client";

import { InstallBox } from "@/components/hero/install-box";
import { Terminal, Heart, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="relative border-t border-[#1F2430] bg-[#050608] overflow-hidden">
      {/* Background glow for CTA */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#00F0FF]/10 to-transparent blur-[120px] pointer-events-none" />

      {/* Final Pre-Footer Call to Action */}
      <div className="relative max-w-5xl mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF] mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ZERO PREREQUISITES REQUIRED</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
          Elevate Your Terminal Workflow in{" "}
          <span className="bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#10B981] bg-clip-text text-transparent">
            Under 30 Seconds
          </span>
        </h2>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-400 mb-10">
          Install the standalone binary with a single command. Connect your existing subscriptions or
          run offline with local models immediately.
        </p>

        {/* Re-use InstallBox for final CTA */}
        <div className="max-w-xl mx-auto">
          <InstallBox />
        </div>
      </div>

      {/* Main Footer Links & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 border-t border-[#1F2430]/80">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00F0FF] via-[#A855F7] to-[#10B981] p-[1px]">
              <div className="w-full h-full bg-[#08090C] rounded-lg flex items-center justify-center">
                <Terminal className="w-4 h-4 text-[#00F0FF]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base tracking-tight font-mono">CUBE</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20">
                  v0.1.0
                </span>
              </div>
              <p className="text-xs text-neutral-500">Autonomous AI Pair Programmer CLI</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400">
            <a
              href="#features"
              className="hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#gateways"
              className="hover:text-white transition-colors"
            >
              Gateways
            </a>
            <a
              href="#commands"
              className="hover:text-white transition-colors"
            >
              Commands
            </a>
            <a
              href="#faq"
              className="hover:text-white transition-colors"
            >
              FAQ
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-neutral-500 flex items-center gap-1 font-mono">
            <span>Built for developers who live in the terminal.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
