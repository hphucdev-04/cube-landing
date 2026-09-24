"use client";

import { useEffect, useRef, useState } from "react";
import {
  Terminal,
  KeyRound,
  Wrench,
  Hash,
  ShieldCheck,
  Palette,
  GitFork,
  Check,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ShowcaseFeature {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  model: string;
  steps: {
    type: "prompt" | "thought" | "tool" | "choice" | "result" | "info";
    text: string;
    subText?: string;
  }[];
}

const FEATURES: ShowcaseFeature[] = [
  {
    id: "auth",
    badge: "01 · MULTI-MODE AUTH",
    title: "Your Subscriptions. Your Keys. Zero Markup.",
    tagline: "Bring what you already pay for.",
    description:
      "Authenticate directly with your Claude Pro, ChatGPT Plus, or Grok memberships via browser PKCE OAuth 2.0. Plug in any of 15+ developer API keys, or code 100% offline air-gapped with Ollama.",
    model: "claude-3-7-sonnet",
    steps: [
      { type: "prompt", text: "/gateway" },
      {
        type: "choice",
        text: "Select Active Model Gateway:",
        subText:
          "  [1] ● (Active) Subscription OAuth (Claude Pro / Plus / Grok)\n  [2] ○ Developer API Key (15+ Providers)\n  [3] ○ 100% Offline (Ollama / LM Studio)",
      },
      {
        type: "info",
        text: "Authenticating via secure browser PKCE OAuth...",
      },
      {
        type: "result",
        text: "✔ Connected: user@company.com (Claude Pro/Team) — Zero per-token markup",
      },
    ],
  },
  {
    id: "tools",
    badge: "02 · TOOL SYSTEM",
    title: "Mastra-Powered Autonomous Execution",
    tagline: "Autonomous multi-turn agent loop.",
    description:
      "Cube plans, inspects files, runs build commands, analyzes test failures, and applies atomic code edits with full human-in-the-loop tool approval safety.",
    model: "claude-3-7-sonnet",
    steps: [
      {
        type: "prompt",
        text: "Fix upstream timeout race condition in oauth.gateway.ts",
      },
      {
        type: "thought",
        text: "Thought for 2.1s · Analyzing AbortController signal handling & exponential backoff",
      },
      {
        type: "tool",
        text: "❖ fs:read_file",
        subText: "cube-agent/src/gateways/oauth.gateway.ts (lines 140-195)",
      },
      {
        type: "tool",
        text: "❖ fs:atomic_edit",
        subText: "- const TIMEOUT = 5000;\n+ const TIMEOUT = 30000;\n+ const backoff = Math.min(1000 * 2 ** attempt, 10000);",
      },
      {
        type: "result",
        text: "✔ Applied atomic disk write · Verified clean compilation",
      },
    ],
  },
  {
    id: "commands",
    badge: "03 · SLASH COMMANDS",
    title: "Home-Row Keyboard Control",
    tagline: "Instant precision without context switching.",
    description:
      "Switch active models on the fly with /model, manage memory with /compact, fork conversation branches with /fork, or resume previous agent sessions with zero interruption.",
    model: "claude-3-7-sonnet",
    steps: [
      { type: "prompt", text: "/model claude-3-7-sonnet" },
      {
        type: "result",
        text: "✔ Active model: claude-3-7-sonnet-20250219 (Thinking budget: 16k tokens)",
      },
      { type: "prompt", text: "/compact" },
      {
        type: "thought",
        text: "Compacting conversation memory with semantic summarizer...",
      },
      {
        type: "result",
        text: "✔ Tokens before: 138,200 → after: 14,100 (-89.8% memory freed)",
      },
    ],
  },
  {
    id: "approvals",
    badge: "04 · INTERACTIVE Q&A",
    title: "Human-in-the-Loop Safeguards",
    tagline: "Total control over irreversible actions.",
    description:
      "When Cube prepares sensitive file patches or executes potentially destructive shell commands, interactive arrow-key pickers prompt for your explicit approval.",
    model: "claude-3-7-sonnet",
    steps: [
      {
        type: "prompt",
        text: "Deploy database migration to local SQLite store",
      },
      {
        type: "choice",
        text: "? Execute sensitive bash command: 'pnpm db:migrate --force'?",
        subText:
          "  [1] ● (Recommended) Approve and execute command\n  [2] ○ Review generated migration script first\n  [3] ○ Abort action\n\n[↑/↓: navigate • Enter: select]",
      },
      {
        type: "result",
        text: "✔ Approved by developer · Migration 20260924_auth applied successfully",
      },
    ],
  },
  {
    id: "themes",
    badge: "05 · MULTI-THEME TUI",
    title: "WCAG-Audited Terminal Color System",
    tagline: "Differential-rendering with zero flicker.",
    description:
      "Powered by pi-tui for instant redraws and fluid cursor responsiveness. Toggle across 8 built-in developer palettes, each audited for strict WCAG contrast compliance.",
    model: "claude-3-7-sonnet",
    steps: [
      { type: "prompt", text: "/theme" },
      {
        type: "choice",
        text: "Select Terminal Theme:",
        subText:
          "  [1] ● Obsidian (Dark Monochrome)\n  [2] ○ Tokyo Night\n  [3] ○ Catppuccin Mocha\n  [4] ○ High-Contrast Clean",
      },
      {
        type: "result",
        text: "✔ Differential-render pipeline updated · 0ms layout flicker",
      },
    ],
  },
  {
    id: "subagents",
    badge: "06 · SUBAGENT DELEGATION",
    title: "Parallel Agent Workflows",
    tagline: "Spawn dedicated agents for complex refactors.",
    description:
      "Cube divides large architectural tasks into isolated parallel subagents. Parent tasks orchestrate research and test generation concurrently without blocking your session.",
    model: "claude-3-7-sonnet",
    steps: [
      {
        type: "prompt",
        text: "Refactor session store and generate unit tests concurrently",
      },
      {
        type: "info",
        text: "⑂ Spawning 2 parallel subagent worker threads...",
      },
      {
        type: "tool",
        text: "  ┌ Subagent #1 [Refactor]: Updating LibSQL session adapters...",
        subText: "    ✔ Completed in 1.4s (3 files modified)",
      },
      {
        type: "tool",
        text: "  └ Subagent #2 [Test Suite]: Generating 18 unit assertions...",
        subText: "    ✔ Completed in 1.9s (18 passed, 0 failed)",
      },
      {
        type: "result",
        text: "✔ All subagent work merged cleanly into workspace",
      },
    ],
  },
];

export function ScrollShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeFeature = FEATURES[activeIndex];

  // Auto-detect if user has recorded footage in public/
  useEffect(() => {
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

  // Set up IntersectionObserver to sync scroll position with active feature demo
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);



  return (
    <section id="showcase" className="relative border-t border-[#27272A] bg-transparent">
      {/* Section Eyebrow Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#27272A] bg-[#18181B] text-[#A1A1AA] mb-4">
          <span>Interactive Live Showcase</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-medium tracking-tight text-white leading-[1.15]">
          Watch Cube operate in real time.
        </h2>
        <p className="mt-3 text-base text-[#A1A1AA] max-w-xl mx-auto">
          Scroll through core capabilities. The terminal panel updates and replays dynamically
          with every feature.
        </p>
      </div>

      {/* Two-Column Scroll-Synced Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          {/* Left Column: Stacked feature sections (each min-h-[70vh] to 100vh) */}
          <div className="lg:col-span-5 space-y-12 lg:space-y-0">
            {FEATURES.map((feature, idx) => (
              <div
                key={feature.id}
                ref={(el) => {
                  sectionRefs.current[idx] = el;
                }}
                data-index={idx}
                className={cn(
                  "min-h-[50vh] lg:min-h-[75vh] flex flex-col justify-center py-12 transition-opacity duration-300",
                  activeIndex === idx ? "opacity-100" : "opacity-40 hover:opacity-70"
                )}
              >
                <div className="space-y-4">
                  <div className="text-xs font-mono text-[#A1A1AA] tracking-wider">
                    {feature.badge}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs font-mono text-white/70">
                    <span>Feature {idx + 1} of {FEATURES.length}</span>
                    <span className="text-[#27272A]">•</span>
                    <span>Scroll to preview</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Sticky macOS Terminal Panel */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 pb-16">
            <div className="rounded-[10px] border border-[#27272A] bg-[#0D0D0F] shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
              {/* macOS Window Chrome */}
              <div className="px-4 py-3 bg-[#18181B] border-b border-[#27272A] flex items-center justify-between select-none">
                {/* Traffic light dots */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50" />
                </div>

                {/* Path and title bar */}
                <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA] truncate px-2">
                  <Terminal className="w-3.5 h-3.5 text-white shrink-0" />
                  <span className="text-white font-medium truncate">
                    D:\your-project | openai/gpt-6-astra (high)
                  </span>
                </div>

                {/* Right spacer to balance traffic light buttons */}
                <div className="w-12 shrink-0 hidden sm:block" />
              </div>

              {/* Terminal Screen Content (Empty for recording / Live video demo) */}
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
        </div>
      </div>
    </section>
  );
}
