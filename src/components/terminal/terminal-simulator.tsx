"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, FolderGit2 } from "lucide-react";

export function TerminalSimulator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    // Check if recorded footage is available in public/
    const checkVideo = async () => {
      try {
        const res = await fetch("/hero-demo.mp4", { method: "HEAD" });
        if (res.ok) {
          setVideoSrc("/hero-demo.mp4");
          return;
        }
      } catch {}

      try {
        const res2 = await fetch("/demo.mp4", { method: "HEAD" });
        if (res2.ok) {
          setVideoSrc("/demo.mp4");
        }
      } catch {}
    };

    checkVideo();
  }, []);

  return (
    <div id="showcase" className="w-full max-w-5xl mx-auto">
      {/* Section Subhead */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-xs font-mono text-[#A1A1AA] mb-3">
          <Terminal className="w-3.5 h-3.5 text-white" />
          <span>Interactive Live Showcase</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
          Watch Cube operate in real time.
        </h2>
        <p className="mt-2 text-sm text-[#A1A1AA] max-w-xl mx-auto">
          Autonomously inspects files, reasons through diffs, and commits atomic
          code changes directly inside your terminal.
        </p>
      </div>

      {/* macOS Terminal Window Container */}
      <div
        ref={containerRef}
        className="relative rounded-xl bg-[#090A0E] border border-[#27272A] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all"
      >
        {/* macOS Title Bar */}
        <div className="px-4 py-3 bg-[#18181B] border-b border-[#27272A] flex items-center justify-between select-none">
          {/* macOS Traffic Light Buttons */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-sm" />
          </div>

          {/* Window Title */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] truncate px-2">
            <FolderGit2 className="w-3.5 h-3.5 text-white shrink-0" />
            <span className="text-white font-medium truncate">
              D:\your-project | openai/gpt-6-astra (high)
            </span>
          </div>

          {/* Right spacer to balance traffic light buttons */}
          <div className="w-12 shrink-0 hidden sm:block" />
        </div>

        {/* Terminal Body Content (Empty for recording / Live video player) */}
        <div className="relative min-h-[380px] sm:min-h-[460px] bg-[#090A0E] flex flex-col justify-start overflow-hidden">
          {videoSrc ? (
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="p-6 font-mono text-[13px] text-white flex items-center gap-2">
              <span className="text-white select-none font-bold">❯</span>
              <span className="w-2 h-4 bg-white animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
