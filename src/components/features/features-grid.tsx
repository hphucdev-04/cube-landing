"use client";

import {
  Monitor,
  Zap,
  Bot,
  Compass,
  ShieldCheck,
  Palette,
  ArrowUpRight,
} from "lucide-react";

const FEATURES = [
  {
    id: "agent",
    icon: Bot,
    title: "Autonomous Agent Engine",
    badge: "Mastra Core",
    description:
      "Cube plans, reads files, runs build commands, analyzes test failures, and writes code iteratively with human-in-the-loop approvals for sensitive bash commands.",
  },
  {
    id: "tui",
    icon: Monitor,
    title: "Differential-Rendering TUI",
    badge: "pi-tui Engine",
    description:
      "Engineered with differential-rendering technology for zero flicker, instant input response, rich syntax highlighting, and clean split panes in any shell.",
  },
  {
    id: "themes",
    icon: Palette,
    title: "WCAG-Audited Themes",
    badge: "Accessible Color",
    description:
      "Carefully audited contrast ratios across multiple developer palettes: Obsidian, Tokyo Night, Catppuccin Mocha, and High-Contrast Monochrome.",
  },
  {
    id: "auth",
    icon: Zap,
    title: "Multi-Mode Authentication",
    badge: "Zero Token Markup",
    description:
      "Sign in with your existing Claude Pro, ChatGPT Plus, or Grok memberships via browser PKCE OAuth, bring developer API keys, or run 100% offline with Ollama.",
  },
  {
    id: "context",
    icon: Compass,
    title: "Instant Codebase Context",
    badge: "AGENTS.md Discovery",
    description:
      "Automatically discovers architecture guidelines and repository conventions from AGENTS.md across directory trees. No manual prompt copying required.",
  },
  {
    id: "safety",
    icon: ShieldCheck,
    title: "Atomic Mutations & Memory",
    badge: "LibSQL Persistence",
    description:
      "Disk writes execute atomically to prevent partial writes. Long-term session memory and conversation threads are backed by local SQLite on your machine.",
  },
];

export function FeaturesGrid() {
  return (
    <section id="agent" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#27272A]">
      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#27272A] bg-[#18181B] text-[#A1A1AA] mb-4">
            <span>CORE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
            Engineered for developers who live in the shell.
          </h2>
          <p className="text-base text-[#A1A1AA] leading-relaxed">
            Every layer of Cube is designed for minimal latency, ergonomic terminal navigation,
            and complete control over your models and data.
          </p>
        </div>

        {/* 6 Feature Cards: surface #18181B, border #27272A, card-padding 24px, radius 8px */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className="group relative rounded-lg border border-[#27272A] bg-[#18181B] p-6 hover:border-white/20 transition-colors flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#050505] border border-[#27272A] flex items-center justify-center text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-[#27272A] bg-[#050505] text-[#A1A1AA]">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-semibold text-white mb-2 font-sans tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Subtle bottom link */}
                <div className="pt-4 mt-4 border-t border-[#27272A]/60 flex items-center justify-between text-xs text-[#A1A1AA]/60 font-mono group-hover:text-white transition-colors">
                  <span>Explore subsystem</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
