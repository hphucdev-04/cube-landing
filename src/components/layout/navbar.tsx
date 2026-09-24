"use client";

import { useState } from "react";
import Link from "next/link";
import { Terminal, Menu, X, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-5 z-50 w-full px-4 sm:px-6 pointer-events-none">
      <div className="max-w-4xl mx-auto flex items-center justify-between sm:justify-center">
        {/* Floating Centered Pill Navbar */}
        <div className="w-full sm:w-auto pointer-events-auto flex items-center justify-between sm:gap-6 px-4 py-2 rounded-full bg-[#18181B]/85 backdrop-blur-xl border border-[#27272A] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group pr-2 sm:pr-0">
            <div className="w-6 h-6 rounded-md bg-[#27272A] border border-white/10 flex items-center justify-center text-[#5EEAD4] group-hover:border-[#5EEAD4]/50 transition-colors">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white font-sans">
              Cube
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 text-[13px] text-[#A1A1AA]">
            <span className="text-[#27272A] select-none">·</span>
            <Link
              href="#agent"
              className="hover:text-white transition-colors"
            >
              Agent
            </Link>
            <span className="text-[#27272A] select-none">·</span>
            <Link
              href="#tui"
              className="hover:text-white transition-colors"
            >
              TUI
            </Link>
            <span className="text-[#27272A] select-none">·</span>
            <Link
              href="#themes"
              className="hover:text-white transition-colors"
            >
              Themes
            </Link>
            <span className="text-[#27272A] select-none">·</span>
            <Link
              href="#docs"
              className="hover:text-white transition-colors"
            >
              Docs
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3 pl-2">
            <span className="text-[#27272A] select-none">·</span>
            <a
              href="https://github.com/hphucdev-04/cube"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#A1A1AA] hover:text-white transition-colors flex items-center gap-1.5 px-2 py-1"
            >
              <span>GitHub</span>
            </a>

            <a
              href="#signin"
              className="text-[13px] text-[#A1A1AA] hover:text-white transition-colors px-2 py-1"
            >
              Sign in
            </a>

            <a
              href="#install"
              className="px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-[#5EEAD4] text-xs font-medium transition-colors shadow-sm"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <a
              href="#install"
              className="px-3 py-1 rounded-full bg-white text-black hover:bg-[#5EEAD4] text-xs font-medium"
            >
              Get Started
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#A1A1AA] hover:text-white"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-2 max-w-sm mx-auto pointer-events-auto rounded-2xl bg-[#18181B]/95 backdrop-blur-xl border border-[#27272A] p-4 flex flex-col gap-3 text-sm shadow-2xl">
          <Link
            href="#agent"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#A1A1AA] hover:text-white py-1"
          >
            Agent
          </Link>
          <Link
            href="#tui"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#A1A1AA] hover:text-white py-1"
          >
            TUI
          </Link>
          <Link
            href="#themes"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#A1A1AA] hover:text-white py-1"
          >
            Themes
          </Link>
          <Link
            href="#docs"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#A1A1AA] hover:text-white py-1"
          >
            Docs
          </Link>
          <div className="pt-2 border-t border-[#27272A] flex items-center justify-between">
            <a
              href="https://github.com/hphucdev-04/cube"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A1A1AA] hover:text-white flex items-center gap-1.5"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a href="#signin" className="text-[#A1A1AA] hover:text-white">
              Sign in
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
