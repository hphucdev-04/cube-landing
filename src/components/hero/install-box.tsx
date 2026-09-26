"use client";

import { useState, useId } from "react";
import { Check, Copy, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { DownloadCounterBadge } from "./download-counter";

interface InstallOption {
  id: "windows" | "linux" | "macos" | "npm";
  label: string;
  prompt: string;
  command: string;
  platform: string;
}

const INSTALL_OPTIONS: InstallOption[] = [
  {
    id: "windows",
    label: "Windows",
    prompt: ">",
    command:
      "irm https://cube-agent.pages.dev/install.ps1 | iex",
    platform: "Windows x64",
  },
  {
    id: "linux",
    label: "Linux",
    prompt: "$",
    command:
      "curl -fsSL https://cube-agent.pages.dev/install.sh | bash",
    platform: "Linux & WSL2",
  },
  {
    id: "macos",
    label: "MacOS",
    prompt: "$",
    command:
      "curl -fsSL https://cube-agent.pages.dev/install.sh | bash",
    platform: "macOS Universal",
  },
  {
    id: "npm",
    label: "npm",
    prompt: "$",
    command: "npm install -g @cube/cli",
    platform: "Node.js >=22",
  },
];

export function InstallBox({ idPrefix }: { idPrefix?: string }) {
  const autoId = useId();
  const prefix = idPrefix || autoId;
  const [activeTab, setActiveTab] = useState<InstallOption["id"]>("windows");
  const [copied, setCopied] = useState(false);

  const activeOption = INSTALL_OPTIONS.find((opt) => opt.id === activeTab)!;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeOption.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div id="install" className="w-full max-w-md sm:max-w-[550px] mx-auto">
      {/* Platform Tabs (Windows, Linux, MacOS, npm) with Smooth Sliding Indicator */}
      <div className="flex items-center justify-center gap-1.5 mb-2.5">
        {INSTALL_OPTIONS.map((opt) => {
          const isSelected = activeTab === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => {
                setActiveTab(opt.id);
                setCopied(false);
              }}
              className={cn(
                "relative px-3.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer select-none",
                isSelected
                  ? "text-black font-semibold"
                  : "text-[#A1A1AA] hover:text-white font-medium"
              )}
            >
              {isSelected && (
                <motion.span
                  layoutId={`${prefix}-activeInstallTab`}
                  className="absolute inset-0 rounded-md bg-white shadow-sm z-0"
                  transition={{ type: "spring", stiffness: 480, damping: 35 }}
                />
              )}
              <span className="relative z-10">{opt.label}</span>
            </button>
          );
        })}
      </div>

      <div className="relative group">
        {/* Outer terminal box (surface-2 #0D0D0F, border #27272A, terminal-mono) */}
        <div className="relative rounded-lg bg-[#0D0D0F] border border-[#27272A] group-hover:border-white/30 p-2 sm:p-2.5 shadow-xl transition-colors">
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            {/* Terminal prompt and command text with smooth crossfade animation */}
            <div className="flex-1 min-w-0 flex items-center gap-2 overflow-x-auto px-1.5 py-0.5 scrollbar-none font-mono text-xs sm:text-[13px]">
              <span className="text-[#A1A1AA] font-semibold select-none shrink-0">
                {activeOption.prompt}
              </span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.code
                  key={`${prefix}-${activeTab}`}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="text-[#FFFFFF] select-all whitespace-nowrap block"
                >
                  {activeOption.command}
                </motion.code>
              </AnimatePresence>
            </div>

            {/* Copy button (radius 8px / control token) */}
            <button
              onClick={handleCopy}
              className={`shrink-0 flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                copied
                  ? "bg-white text-black"
                  : "bg-white/10 hover:bg-white text-white hover:text-black border border-white/10 hover:border-transparent"
              }`}
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
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

      {/* Verification notes with animated platform label and 2s install badge */}
      <div className="mt-3 flex flex-nowrap items-center justify-center gap-x-2.5 sm:gap-x-4 text-[11px] sm:text-xs text-[#A1A1AA] font-mono whitespace-nowrap overflow-x-auto scrollbar-none">
        <span className="flex items-center gap-1.5 text-white shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-white" />
          <span>SHA-256 Verified Release</span>
        </span>
        <span className="text-[#27272A] select-none shrink-0">•</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={`${prefix}-${activeTab}`}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.15 }}
            className="shrink-0"
          >
            {activeOption.platform}
          </motion.span>
        </AnimatePresence>
        <span className="text-[#27272A] select-none shrink-0">•</span>
      </div>

      {/* Live Download / Install Counter Badge */}
      <DownloadCounterBadge />
    </div>
  );
}
