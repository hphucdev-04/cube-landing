"use client";

import { InstallBox } from "@/components/hero/install-box";
import { Terminal } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="relative border-t border-[#27272A] bg-transparent overflow-hidden">
      {/* Final Pre-Footer Call to Action */}
      <div className="relative max-w-4xl mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#27272A] bg-[#18181B] text-[#A1A1AA] mb-5">
          <span>ZERO PREREQUISITES REQUIRED</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mb-4">
          Elevate your terminal workflow in under 30 seconds.
        </h2>
        <p className="max-w-xl mx-auto text-sm sm:text-base text-[#A1A1AA] mb-8">
          Install the standalone binary with a single PowerShell command. Connect your existing subscriptions or
          run offline with local models immediately.
        </p>

        {/* Re-use InstallBox for final CTA */}
        <div className="max-w-xl mx-auto">
          <InstallBox />
        </div>
      </div>

      {/* Main Footer Links & Copyright */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 border-t border-[#27272A]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[#18181B] border border-[#27272A] flex items-center justify-center text-white">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-sm text-white font-sans">
              Cube
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#18181B] text-[#A1A1AA] border border-[#27272A]">
              v1.0.0
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-5 text-xs text-[#A1A1AA]">
            <a href="#agent" className="hover:text-white transition-colors">
              Agent
            </a>
            <a href="#tui" className="hover:text-white transition-colors">
              TUI
            </a>
            <a href="#themes" className="hover:text-white transition-colors">
              Themes
            </a>
            <a href="#gateways" className="hover:text-white transition-colors">
              Gateways
            </a>
            <a href="#commands" className="hover:text-white transition-colors">
              Commands
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <a
              href="https://github.com/hphucdev-04/cube"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-[#A1A1AA]/60 font-mono">
            <span>MIT Licensed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
