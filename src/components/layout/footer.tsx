"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check } from "lucide-react";
import { GithubIcon, CubeLogoIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Core capabilities array. Add any new capability label here anytime.
const SHIP_LABELS: string[] = [
  "gateway",
  "memory",
  "terminal execution",
  "subagent",
  "mcp",
  "background task",
  "skill",
  "AGENTS.md",
  "Theming",
];

interface CompactPlatform {
  id: "windows" | "macos" | "linux" | "npm";
  label: string;
  prompt: string;
  command: string;
}

const COMPACT_PLATFORMS: CompactPlatform[] = [
  {
    id: "windows",
    label: "Windows",
    prompt: ">",
    command: "irm https://cube-agent.pages.dev/install.ps1 | iex",
  },
  {
    id: "macos",
    label: "macOS",
    prompt: "$",
    command: "curl -fsSL https://cube-agent.pages.dev/install.sh | bash",
  },
  {
    id: "linux",
    label: "Linux",
    prompt: "$",
    command: "curl -fsSL https://cube-agent.pages.dev/install.sh | bash",
  },
  {
    id: "npm",
    label: "npm",
    prompt: "$",
    command: "npm install -g @cube-harness/cli",
  },
];

export function Footer() {
  const [activePlatform, setActivePlatform] = useState<CompactPlatform["id"]>("windows");
  const [copied, setCopied] = useState(false);

  const activeOpt = COMPACT_PLATFORMS.find((p) => p.id === activePlatform)!;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeOpt.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <footer
      id="ship"
      className="relative min-h-screen lg:h-screen w-full flex flex-col justify-between border-t border-[#2A2622] bg-[#0A0908] overflow-hidden px-6 sm:px-12 md:px-20 lg:px-24 py-8 lg:py-12"
    >
      {/* ── FULL-BLEED PIRANESI BACKDROP (ascii-magic-8.png) ────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        <Image
          src="/assets/ascii-magic-8.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center contrast-[1.18] brightness-[0.70]"
        />
        {/* Chiaroscuro: dark stone shadow on inscription side, open view on far side */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0908]/96 via-[#0A0908]/65 to-[#0A0908]/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0908]/80 via-transparent to-[#0A0908]/90" />
      </div>

      {/* ── UPPER PART: Everything you need to ship + Labels ────────── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto pt-2 lg:pt-4">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141210]/90 border border-[#2A2622] text-xs font-mono mb-3 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 bg-[#38BDF8]" />
          <span className="font-cinzel tracking-wider text-[#F5F5F4]">
            CAPABILITIES // FULL RUNTIME MATRIX
          </span>
        </div>

        {/* Monumental Headline */}
        <h2
          className="font-sans font-semibold tracking-tight text-[#F5F5F4] leading-[1.08] mb-5"
          style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)" }}
        >
          Everything you need to ship
        </h2>

        {/* Minimalist Feature Badges — Sharp Architectural Rectangles (No rounded corners) */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 max-w-3xl">
          {SHIP_LABELS.map((label) => (
            <div
              key={label}
              className="px-3 py-1.5 border border-[#2A2622] hover:border-[#38BDF8]/60 bg-[#0D0C0A]/90 backdrop-blur-sm transition-colors flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 bg-[#38BDF8]" />
              <span className="font-mono text-xs sm:text-[13px] text-[#D6D3D1] tracking-wide">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── LOWER PART: Try it in your terminal (Left) + Compact Install (Right) ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto my-auto py-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-12">
          {/* Left: Try it in your terminal */}
          <div className="max-w-md">
            <h3 className="text-xl sm:text-2xl font-sans font-semibold text-[#F5F5F4] tracking-tight mb-1.5">
              Try it in your terminal
            </h3>
            <p className="text-xs sm:text-sm text-[#A8A29E] font-serif leading-relaxed">
              One command to install. Works with any codebase, any language, right now.
            </p>
          </div>

          {/* Right: Compact Install Box (Sharp rectangular borders, identical to hero style) */}
          <div className="w-full lg:max-w-xl">
            {/* Platform Selector Tabs */}
            <div className="flex items-center gap-1 mb-2">
              {COMPACT_PLATFORMS.map((p) => {
                const isSelected = activePlatform === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setActivePlatform(p.id);
                      setCopied(false);
                    }}
                    className={cn(
                      "relative px-3.5 py-1 text-xs font-mono transition-colors cursor-pointer select-none",
                      isSelected
                        ? "text-[#0A0908] font-semibold"
                        : "text-[#78716C] hover:text-[#D6D3D1] font-medium"
                    )}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="footerCompactActiveInstallTab"
                        className="absolute inset-0 bg-[#38BDF8] z-0"
                        transition={{ type: "spring", stiffness: 480, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10 pointer-events-none">{p.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Single-line Install Command Bar */}
            <div className="bg-[#0D0C0A] border border-[#2A2622] hover:border-[#3E3833] p-2 sm:p-2.5 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 px-1.5 py-0.5 font-mono text-xs sm:text-[13px] whitespace-nowrap overflow-x-auto scrollbar-none min-w-0">
                  <span className="text-[#38BDF8] font-semibold select-none shrink-0">
                    {activeOpt.prompt}
                  </span>
                  <code className="text-[#F5F5F4] select-all whitespace-nowrap shrink-0 block">
                    {activeOpt.command}
                  </code>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className={cn(
                    "shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium transition-all cursor-pointer select-none",
                    copied
                      ? "bg-[#38BDF8] text-[#0A0908]"
                      : "bg-[#141210] hover:bg-[#38BDF8] text-[#A8A29E] hover:text-[#0A0908] border border-[#2A2622] hover:border-transparent"
                  )}
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM EDGE: Hairline Footer Bar ─────────────────────── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto pt-4 border-t border-[#2A2622]/60">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#78716C]">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 flex items-center justify-center">
              <CubeLogoIcon className="w-4 h-4" />
            </div>
            <span className="font-cinzel font-bold text-xs text-[#F5F5F4]">
              CUBE
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#141210] text-[#78716C] border border-[#2A2622]">
              0.1.4
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-5 text-xs text-[#A8A29E]">
            <a href="#hero" className="hover:text-[#F5F5F4] transition-colors">
              Overview
            </a>
            <a href="#harness" className="hover:text-[#F5F5F4] transition-colors">
              Harness
            </a>
            <a href="#demo" className="hover:text-[#F5F5F4] transition-colors">
              Showcase
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

          {/* Contact / Copyright */}
          <div className="text-[11px] text-[#78716C]">
            <span>phuc.ph24012004@gmail.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
