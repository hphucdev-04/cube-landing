"use client";

import { useState } from "react";
import { Check, Copy, Terminal, ShieldCheck } from "lucide-react";

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
    <div id="install" className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#00F0FF]/30 via-[#10B981]/20 to-[#A855F7]/30 blur-xl opacity-60 group-hover:opacity-100 transition-all duration-700" />

        {/* Outer terminal box */}
        <div className="relative rounded-xl bg-[#0F1117]/95 border border-white/[0.12] group-hover:border-[#00F0FF]/50 p-3 sm:p-4 backdrop-blur-2xl shadow-2xl transition-all">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Terminal prompt and command text */}
            <div className="flex items-center gap-2.5 overflow-x-auto py-1 scrollbar-none">
              <span className="text-[#00F0FF] font-mono text-xs font-semibold select-none">
                PS&gt;
              </span>
              <code className="font-mono text-xs sm:text-sm text-gray-200 select-all whitespace-nowrap">
                {command}
              </code>
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className={`shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-medium transition-all ${
                copied
                  ? "bg-[#10B981] text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                  : "bg-white/[0.08] hover:bg-[#00F0FF] text-white hover:text-black border border-white/10 hover:border-transparent hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              }`}
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Copied!</span>
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

      {/* Verification & platform notes */}
      <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-400 font-mono">
        <span className="flex items-center gap-1.5 text-gray-300">
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          <span>SHA-256 Verified Release</span>
        </span>
        <span className="text-gray-600">•</span>
        <span>Windows x64 Native</span>
        <span className="text-gray-600">•</span>
        <span className="text-gray-400">Zero dependencies required (~2s install)</span>
      </div>
    </div>
  );
}
