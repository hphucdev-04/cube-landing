"use client";

import {
  Monitor,
  Zap,
  Bot,
  Compass,
  ShieldCheck,
  Lock,
  ArrowUpRight,
} from "lucide-react";

const FEATURES = [
  {
    icon: Monitor,
    title: "Flicker-Free Terminal Experience",
    badge: "Native Performance",
    color: "from-[#00F0FF]/20 to-transparent",
    border: "group-hover:border-[#00F0FF]/50",
    iconColor: "text-[#00F0FF]",
    description:
      "Engineered with differential-rendering technology for zero flicker, instant input response, rich syntax highlighting, and responsive layout splits inside your favorite shell.",
  },
  {
    icon: Zap,
    title: "Bring Your Own AI Subscriptions",
    badge: "Zero Token Markup",
    color: "from-[#A855F7]/20 to-transparent",
    border: "group-hover:border-[#A855F7]/50",
    iconColor: "text-[#A855F7]",
    description:
      "Sign in directly with your existing Claude Pro, ChatGPT Plus, or Grok accounts via OAuth. Or plug in any of 15+ API keys, or run 100% offline with local Ollama models.",
  },
  {
    icon: Bot,
    title: "Autonomous Multi-Turn Execution",
    badge: "Agentic Loop",
    color: "from-[#10B981]/20 to-transparent",
    border: "group-hover:border-[#10B981]/50",
    iconColor: "text-[#10B981]",
    description:
      "Cube plans, reads files, runs build commands, analyzes test failures, and writes code autonomously with full human-in-the-loop approval at every sensitive step.",
  },
  {
    icon: Compass,
    title: "Instant Codebase Context",
    badge: "AGENTS.md Discovery",
    color: "from-[#F59E0B]/20 to-transparent",
    border: "group-hover:border-[#F59E0B]/50",
    iconColor: "text-[#F59E0B]",
    description:
      "Automatically discovers architecture guidelines and repository conventions from AGENTS.md across directory trees. No manual prompt copying required.",
  },
  {
    icon: ShieldCheck,
    title: "Safe, Reversible Code Mutations",
    badge: "Atomic Disk Writes",
    color: "from-[#00F0FF]/20 to-transparent",
    border: "group-hover:border-[#00F0FF]/50",
    iconColor: "text-[#00F0FF]",
    description:
      "Every change is inspected via clear diff previews before execution. Atomic file persistence guarantees zero half-written edits or corrupted workspaces.",
  },
  {
    icon: Lock,
    title: "100% Local & Privacy-First",
    badge: "Zero Data Retention",
    color: "from-[#10B981]/20 to-transparent",
    border: "group-hover:border-[#10B981]/50",
    iconColor: "text-[#10B981]",
    description:
      "Your credentials, chat history, and memory databases stay locked on your machine (~/.cube). Network calls stream directly to provider endpoints without middleman servers.",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-300 mb-4">
          <Zap className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          Everything You Need to Code at Warp Speed
        </h2>
        <p className="mt-4 text-base sm:text-lg text-gray-400">
          Built from the ground up to eliminate friction between terminal commands,
          reasoning models, and your codebase.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className={`group relative rounded-2xl p-6 sm:p-8 bg-[#0F1117]/80 border border-white/[0.08] ${feat.border} hover:bg-[#131620] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl`}
            >
              {/* Gradient card background */}
              <div
                className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${feat.color} blur-2xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`}
              />

              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center ${feat.iconColor} group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-300">
                    {feat.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-[#00F0FF] transition-colors">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              {/* Bottom subtle link indicator */}
              <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-gray-500 group-hover:text-gray-300 transition-colors">
                <span>Learn more</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
