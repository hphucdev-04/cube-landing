"use client";

import { useState } from "react";
import { Check, Copy, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface InstallOption {
  id: "windown" | "linux" | "macos" | "npm";
  label: string;
  prompt: string;
  command: string;
  platform: string;
}

const INSTALL_OPTIONS: InstallOption[] = [
  {
    id: "windown",
    label: "Windown",
    prompt: ">",
    command:
      "irm https://pub-3313f2900e0948b5849dc47c989406ab.r2.dev/install.ps1 | iex",
    platform: "Windows x64 Native",
  },
  {
    id: "linux",
    label: "Linux",
    prompt: "$",
    command:
      "curl -fsSL https://pub-3313f2900e0948b5849dc47c989406ab.r2.dev/install.sh | bash",
    platform: "Linux / WSL2 (x86_64 / arm64)",
  },
  {
    id: "macos",
    label: "MacOS",
    prompt: "$",
    command:
      "curl -fsSL https://pub-3313f2900e0948b5849dc47c989406ab.r2.dev/install.sh | bash",
    platform: "Apple Silicon & Intel",
  },
  {
    id: "npm",
    label: "npm",
    prompt: "$",
    command: "npm install -g @cube/cli",
    platform: "Node.js >= 22.13.0",
  },
];

export function InstallBox() {
  const [activeTab, setActiveTab] = useState<InstallOption["id"]>("windown");
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
    <div id="install" className="w-full max-w-xl mx-auto">
      {/* Platform Tabs (Windown, Linux, MacOS, npm) */}
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
                "px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer",
                isSelected
                  ? "bg-[#18181B] text-white border border-[#27272A] shadow-sm font-semibold"
                  : "text-[#A1A1AA] hover:text-white border border-transparent hover:bg-[#18181B]/40"
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <div className="relative group">
        {/* Outer terminal box (surface-2 #0D0D0F, border #27272A, terminal-mono) */}
        <div className="relative rounded-lg bg-[#0D0D0F] border border-[#27272A] group-hover:border-white/30 p-2.5 sm:p-3 shadow-xl transition-colors">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Terminal prompt and command text */}
            <div className="flex items-center gap-2.5 overflow-x-auto px-2 py-1 scrollbar-none font-mono text-xs sm:text-[13px]">
              <span className="text-[#A1A1AA] font-semibold select-none">
                {activeOption.prompt}
              </span>
              <code className="text-[#FFFFFF] select-all whitespace-nowrap">
                {activeOption.command}
              </code>
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

      {/* Verification notes */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[#A1A1AA] font-mono">
        <span className="flex items-center gap-1.5 text-white">
          <ShieldCheck className="w-3.5 h-3.5 text-white" />
          <span>SHA-256 Verified Release</span>
        </span>
        <span className="text-[#27272A]">•</span>
        <span>{activeOption.platform}</span>
        <span className="text-[#27272A]">•</span>
        <span>~2s Standalone Install</span>
      </div>
    </div>
  );
}
