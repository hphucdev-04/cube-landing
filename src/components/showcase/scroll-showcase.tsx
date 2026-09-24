"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "lucide-react";
import { Cube3DNavigator } from "./cube-navigator-3d";
import { cn } from "@/lib/utils";

interface ShowcaseFeature {
  id: string;
  label: string;
  faceName: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
}

const FEATURES: ShowcaseFeature[] = [
  {
    id: "gateway",
    label: "Gateway",
    faceName: "FRONT",
    badge: "01 · FRONT FACE: GATEWAY",
    title: "Multi-Gateway Model Matrix",
    tagline: "Your subscriptions. Your keys. Zero lock-in.",
    description:
      "Connect directly to Claude Pro, ChatGPT Plus, or Grok memberships via browser PKCE OAuth 2.0 with zero token markup. Plug in any of 15+ developer API keys, or run 100% offline with local Ollama models.",
    bullets: [
      "PKCE OAuth for Claude Pro / ChatGPT Plus / Grok",
      "15+ Developer API providers with unified fallback routing",
      "100% Air-gapped offline inference via Ollama & LM Studio",
    ],
  },
  {
    id: "skill",
    label: "Skill",
    faceName: "RIGHT",
    badge: "02 · RIGHT FACE: SKILL",
    title: "Workspace Skill & Rule Discovery",
    tagline: "Architectural context right where you code.",
    description:
      "Cube crawls project directories and walks up parent folders to automatically discover AGENTS.md rules, repository guidelines, and custom skill scripts. Injected into every turn with zero prompt copy-pasting.",
    bullets: [
      "Automatic AGENTS.md rule discovery across parent trees",
      "Dynamic skill loading with isolated execution runtimes",
      "Zero prompt maintenance across multiple monorepos",
    ],
  },
  {
    id: "hitl",
    label: "HITL",
    faceName: "TOP",
    badge: "03 · TOP FACE: HITL",
    title: "Human-in-the-Loop Safeguards",
    tagline: "Absolute developer authority.",
    description:
      "No silent overwrites or rogue actions. Before applying atomic disk modifications or running potentially destructive terminal commands, Cube prompts for explicit developer confirmation with full unified diff previews.",
    bullets: [
      "Human confirmation required for sensitive bash commands",
      "Side-by-side colorized unified diff previews before write",
      "One-key rollback and atomic disk commit guarantees",
    ],
  },
  {
    id: "qa",
    label: "Q&A",
    faceName: "LEFT",
    badge: "04 · LEFT FACE: Q&A",
    title: "Interactive Intent Clarification",
    tagline: "Resolve ambiguity before writing code.",
    description:
      "When requirements are underspecified or architectural tradeoffs arise, Cube presents keyboard-driven multiple-choice questions right in your shell to lock down exact implementation specs.",
    bullets: [
      "Interactive arrow-key multiple choice in terminal TUI",
      "Clarify underspecified requirements early in planning",
      "Instant architectural alignment without endless chat loops",
    ],
  },
  {
    id: "mcp",
    label: "MCP",
    faceName: "BOTTOM",
    badge: "05 · BOTTOM FACE: MCP",
    title: "Model Context Protocol Foundation",
    tagline: "Universal tool & data interoperability.",
    description:
      "Built-in Model Context Protocol (MCP) client architecture. Seamlessly connect external tool servers, database inspectors, browser automation runtimes, and proprietary enterprise endpoints through open standards.",
    bullets: [
      "Universal MCP client supporting stdio and SSE transports",
      "Connect databases, GitHub, browser automation, and APIs",
      "Community server ecosystem with zero custom adapter code",
    ],
  },
  {
    id: "subagent",
    label: "Subagent",
    faceName: "BACK",
    badge: "06 · BACK FACE: SUBAGENT",
    title: "Parallel Subagent Task Delegation",
    tagline: "Orchestrate autonomous worker teams.",
    description:
      "Deconstruct massive refactoring projects into isolated parallel subagent workers. Subagents conduct deep codebase exploration, write tests, and apply scoped edits concurrently without blocking your main prompt loop.",
    bullets: [
      "Spawn background worker subagents with isolated context",
      "Parallel codebase exploration, refactoring, and test writing",
      "Automatic dependency resolution and unified pull review",
    ],
  },
];

export function ScrollShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        threshold: 0.25,
      }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSelectFacet = (index: number) => {
    setActiveIndex(index);
    const targetEl = sectionRefs.current[index];
    if (targetEl) {
      targetEl.scrollIntoView({
        behavior: "smooth",
        block: index === FEATURES.length - 1 ? "start" : "center",
      });
    }
  };

  return (
    <section id="showcase" className="relative border-t border-[#27272A] bg-transparent">
      {/* Section Eyebrow Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#27272A] bg-[#18181B] text-[#A1A1AA] mb-4">
          <span>6 FACETS OF CUBE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-medium tracking-tight text-white leading-[1.15]">
          Watch Cube operate in real time.
        </h2>
        <p className="mt-3 text-base text-[#A1A1AA] max-w-xl mx-auto">
          6 core architectural pillars, 6 faces of the cube. The 3D cube navigator rotates and locks onto each facet as you scroll.
        </p>
      </div>

      {/* Two-Column Scroll-Synced Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          {/* Left Column: Stacked feature sections */}
          <div className="lg:col-span-5 space-y-12 lg:space-y-0">
            {FEATURES.map((feature, idx) => {
              const isLast = idx === FEATURES.length - 1;
              return (
                <div
                  key={feature.id}
                  ref={(el) => {
                    sectionRefs.current[idx] = el;
                  }}
                  data-index={idx}
                  className={cn(
                    "transition-opacity duration-300 scroll-mt-28",
                    isLast
                      ? "min-h-[70vh] lg:min-h-[120vh] flex flex-col justify-start pt-12 lg:pt-24 pb-16 lg:pb-[60vh]"
                      : "min-h-[50vh] lg:min-h-[75vh] flex flex-col justify-center py-12",
                    activeIndex === idx ? "opacity-100" : "opacity-35 hover:opacity-60"
                  )}
                >
                  <div className="space-y-4">
                    <div className="text-xs font-mono text-white/70 tracking-wider">
                      {feature.badge}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight leading-snug">
                      {feature.title}
                    </h3>
                    <div className="text-sm font-mono text-[#A1A1AA]">
                      {feature.tagline}
                    </div>
                    <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Bullet points */}
                    <ul className="space-y-2 pt-2">
                      {feature.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="text-xs font-mono text-white/90 flex items-start gap-2">
                          <span className="text-white select-none">›</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#A1A1AA]/60">
                      <span>Facet {idx + 1} of 6</span>
                      <span className="text-[#27272A]">•</span>
                      <span>Cube Face: {feature.faceName}</span>
                    </div>

                    {isLast && (
                      <div className="pt-4 border-t border-[#27272A]/50 flex items-center gap-2 text-xs font-mono text-[#A1A1AA]/50">
                        <span>All 6 facets unlocked</span>
                        <span className="text-[#27272A]">•</span>
                        <span>Scroll down for Core Architecture ↓</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky 3D Cube Navigator + macOS Terminal Panel */}
          <div className="lg:col-span-7 lg:sticky lg:top-20 pb-16">
            {/* Concept 1: 3D Isometric Wireframe Cube Navigator */}
            <Cube3DNavigator
              activeIndex={activeIndex}
              onSelectIndex={handleSelectFacet}
              features={FEATURES.map((f) => ({
                id: f.id,
                label: f.label,
                faceName: f.faceName,
              }))}
            />

            {/* macOS Terminal Window Container */}
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
