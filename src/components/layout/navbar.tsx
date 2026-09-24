"use client";

import { useState } from "react";
import Link from "next/link";
import { Terminal, Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#08090C]/80 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-[#00F0FF]/20 to-[#10B981]/20 border border-[#00F0FF]/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.2)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all">
            <Terminal className="w-5 h-5 text-[#00F0FF] group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-lg tracking-wider text-white">
              CUBE
            </span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-[#00F0FF] border border-[#00F0FF]/20">
              v1.0.0
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link
            href="#features"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            Features
          </Link>
          <Link
            href="#terminal"
            className="hover:text-white transition-colors"
          >
            Showcase
          </Link>
          <Link
            href="#gateways"
            className="hover:text-white transition-colors"
          >
            Gateways
          </Link>
          <Link
            href="#commands"
            className="hover:text-white transition-colors"
          >
            Commands
          </Link>
          <Link
            href="#faq"
            className="hover:text-white transition-colors"
          >
            FAQ
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/hphucdev-04/cube"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-xs font-mono text-gray-300 transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href="#install"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#00F0FF] hover:bg-[#00F0FF]/90 text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]"
          >
            <span>Install CLI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 border-t border-white/[0.06] bg-[#08090C]/95 backdrop-blur-xl flex flex-col gap-4 text-sm font-medium">
          <Link
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-300 hover:text-[#00F0FF]"
          >
            Features
          </Link>
          <Link
            href="#terminal"
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-300 hover:text-[#00F0FF]"
          >
            Showcase
          </Link>
          <Link
            href="#gateways"
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-300 hover:text-[#00F0FF]"
          >
            Gateways
          </Link>
          <Link
            href="#commands"
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-300 hover:text-[#00F0FF]"
          >
            Commands
          </Link>
          <Link
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-300 hover:text-[#00F0FF]"
          >
            FAQ
          </Link>
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#install"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-[#00F0FF] text-black font-semibold text-xs"
            >
              Install Cube
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
