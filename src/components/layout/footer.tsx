"use client";

import { InstallBox } from "@/components/hero/install-box";
import { GithubIcon, CubeLogoIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="relative border-t border-[#2A2622] bg-[#0A0908] overflow-hidden etching-bg">
      {/* Final Pre-Footer Call to Action */}
      <div className="relative max-w-4xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm text-xs font-mono border border-[#2A2622] bg-[#141210] text-[#A8A29E] mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 bg-[#38BDF8]" />
          <span className="font-cinzel tracking-wider text-[#F5F5F4]">FOUNDATION PLINTH</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-[#F5F5F4] tracking-tight mb-3">
          Elevate your terminal workflow in under 30 seconds
        </h2>
        <p className="max-w-xl mx-auto text-sm sm:text-base text-[#A8A29E] mb-8 font-serif">
          Install the standalone binary with a single command. Connect your existing subscriptions or
          run offline with local models immediately.
        </p>

        {/* Re-use InstallBox for final CTA */}
        <div className="max-w-xl mx-auto">
          <InstallBox idPrefix="footer" />
        </div>
      </div>

      {/* Main Footer Links & Copyright */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-20 pt-8 pb-12 border-t border-[#2A2622]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 flex items-center justify-center">
              <CubeLogoIcon className="w-5 h-5" />
            </div>
            <span className="font-cinzel font-bold text-sm text-[#F5F5F4]">
              CUBE
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#141210] text-[#78716C] border border-[#2A2622]">
              v1.0.0 · CARCERI
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-5 text-xs text-[#A8A29E] font-mono">
            <a href="#hero" className="hover:text-[#F5F5F4] transition-colors">
              Architectura
            </a>
            <a href="#harness" className="hover:text-[#F5F5F4] transition-colors">
              Harness
            </a>
            <a href="#demo" className="hover:text-[#F5F5F4] transition-colors">
              Showcase
            </a>
            <a href="#commands" className="hover:text-[#F5F5F4] transition-colors">
              Commands
            </a>
            <a href="#faq" className="hover:text-[#F5F5F4] transition-colors">
              FAQ
            </a>
            <a
              href="https://github.com/hphucdev-04"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#F5F5F4] transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-[#78716C] font-mono">
            <span>MIT Licensed · Inscriptio Architectura</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
