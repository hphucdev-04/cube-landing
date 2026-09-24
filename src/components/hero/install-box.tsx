"use client";

import { useState } from "react";
import { Check, Copy, ShieldCheck } from "lucide-react";

export function InstallBox() {
  const [copied, setCopied] = useState(false);
  const command =
    "irm https://pub-3313f2900e0948b5849dc47c989406ab.r2.dev/install.ps1 | iex";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div id="install" className="w-full max-w-xl mx-auto">
      <div className="relative group">
        {/* Outer terminal box */}
        <div className="relative rounded-lg bg-[#18181B] border border-[#27272A] group-hover:border-white/20 p-2.5 sm:p-3 shadow-xl transition-colors">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Terminal prompt and command text */}
            <div className="flex items-center gap-2.5 overflow-x-auto px-2 py-1 scrollbar-none font-mono text-xs sm:text-[13px]">
              <span className="text-white font-semibold select-none">
                PS&gt;
              </span>
              <code className="text-[#FFFFFF] select-all whitespace-nowrap">
                {command}
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
        <span>Windows x64 Native</span>
        <span className="text-[#27272A]">•</span>
        <span>~2s Standalone Install</span>
      </div>
    </div>
  );
}
