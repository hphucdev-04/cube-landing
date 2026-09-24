"use client";

import { useState } from "react";
import { KeyRound, Shield, Laptop, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type GatewayType = "oauth" | "api" | "local";

interface GatewayCategory {
  id: GatewayType;
  title: string;
  badge: string;
  icon: typeof KeyRound;
  tagline: string;
  description: string;
  accent: string;
  borderAccent: string;
  bgGlow: string;
  providers: {
    name: string;
    model: string;
    status: string;
    detail: string;
  }[];
  codeSnippet: string;
  perks: string[];
}

const GATEWAY_CATEGORIES: GatewayCategory[] = [
  {
    id: "oauth",
    title: "Subscription OAuth",
    badge: "Most Popular",
    icon: Shield,
    tagline: "Use your existing AI subscriptions. Zero extra token costs.",
    description:
      "Authenticate directly with your personal or team account via secure browser PKCE OAuth. Consume your monthly quota directly with zero middleman markup.",
    accent: "text-[#00F0FF]",
    borderAccent: "border-[#00F0FF]/40",
    bgGlow: "from-[#00F0FF]/15 via-transparent to-transparent",
    codeSnippet: `/gateway oauth anthropic
# Browser opens secure PKCE OAuth callback
# Signed in as: user@company.com (Claude Pro/Team)
# Active Model: claude-3-7-sonnet-20250219`,
    perks: [
      "Zero per-token markups or hidden fees",
      "Official browser PKCE OAuth 2.0 flow",
      "Auto-refreshing access tokens in secure local storage",
      "Seamless switching between work and personal accounts",
    ],
    providers: [
      { name: "Anthropic", model: "Claude 3.7 Sonnet & 3.5 Haiku", status: "Active", detail: "Pro / Team / Enterprise" },
      { name: "OpenAI", model: "GPT-4.5, o3-mini & GPT-4o", status: "Active", detail: "Plus / Pro / Team" },
      { name: "xAI Grok", model: "Grok 2 / Grok 3 Beta", status: "Active", detail: "SuperGrok / Premium" },
      { name: "Google Gemini", model: "Gemini 2.0 Flash & Pro", status: "Active", detail: "Google One AI Premium" },
    ],
  },
  {
    id: "api",
    title: "Direct API Keys",
    badge: "15+ Providers",
    icon: KeyRound,
    tagline: "Pay-as-you-go keys from any major model foundry.",
    description:
      "Bring your developer API keys directly from Anthropic, OpenAI, OpenRouter, DeepSeek, Groq, Cerebras, and more. Keys are encrypted at rest on your machine.",
    accent: "text-[#A855F7]",
    borderAccent: "border-[#A855F7]/40",
    bgGlow: "from-[#A855F7]/15 via-transparent to-transparent",
    codeSnippet: `/gateway api openrouter
# Stored encrypted key in ~/.cube/auth.json
# Active Model: deepseek/deepseek-r1
# Speed: 180 tokens/sec | Cost: $0.55/M tokens`,
    perks: [
      "Compatible with 15+ API providers and unified proxies",
      "Custom temperature, top_p, and max_tokens overrides",
      "AES-256 local encrypted credential persistence",
      "Instant fallbacks when provider rate limits are hit",
    ],
    providers: [
      { name: "OpenRouter", model: "DeepSeek R1, Llama 3.3, Qwen 2.5", status: "Active", detail: "Pay-as-you-go" },
      { name: "Anthropic API", model: "Claude 3.7 Sonnet (Thinking)", status: "Active", detail: "Tier 1-4 developer key" },
      { name: "OpenAI API", model: "o1, o3-mini, GPT-4o", status: "Active", detail: "Direct developer billing" },
      { name: "DeepSeek Direct", model: "DeepSeek-V3 & R1 Reasoning", status: "Active", detail: "Direct API endpoint" },
    ],
  },
  {
    id: "local",
    title: "100% Local & Offline",
    badge: "Zero Data Leakage",
    icon: Laptop,
    tagline: "Run entirely offline on your local GPU. Zero telemetry.",
    description:
      "Connect seamlessly to Ollama, LM Studio, or custom vLLM servers running on your workstation. No internet connection required. Absolute data sovereign privacy.",
    accent: "text-[#10B981]",
    borderAccent: "border-[#10B981]/40",
    bgGlow: "from-[#10B981]/15 via-transparent to-transparent",
    codeSnippet: `/gateway local ollama
# Detected local Ollama instance on http://localhost:11434
# Active Model: qwen2.5-coder:32b-instruct-q8_0
# Offline mode: Zero outbound network packets`,
    perks: [
      "100% offline air-gapped coding support",
      "Zero telemetry, zero external network requests",
      "Native support for Ollama, LM Studio, and OpenAI-compatible endpoints",
      "Optimal for strict corporate compliance and proprietary code",
    ],
    providers: [
      { name: "Ollama", model: "qwen2.5-coder:32b, llama3.3:70b", status: "Active", detail: "http://localhost:11434" },
      { name: "LM Studio", model: "DeepSeek-R1-Distill-Qwen, Mistral", status: "Active", detail: "http://localhost:1234/v1" },
      { name: "vLLM / Custom", model: "Custom fine-tunes & internal models", status: "Active", detail: "Self-hosted private inference" },
      { name: "Local Llama.cpp", model: "GGUF quantized weights", status: "Active", detail: "Direct hardware acceleration" },
    ],
  },
];

export function GatewaySection() {
  const [activeTab, setActiveTab] = useState<GatewayType>("oauth");
  const active = GATEWAY_CATEGORIES.find((cat) => cat.id === activeTab)!;

  return (
    <section id="gateways" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-[#1F2430]">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#00F0FF]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UNMATCHED FREEDOM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            Your Subscriptions. Your Keys.{" "}
            <span className="bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#10B981] bg-clip-text text-transparent">
              Zero Lock-In.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-400">
            Never pay a 2x token markup again. Sign in directly with your existing AI memberships,
            switch provider keys on the fly, or code completely offline on airplane mode.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {GATEWAY_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "flex items-center gap-3 px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer",
                  isSelected
                    ? `${cat.borderAccent} bg-[#161B22] text-white shadow-lg shadow-black/40`
                    : "border-[#1F2430] bg-[#0D1117]/80 text-neutral-400 hover:text-white hover:border-[#2D333B]"
                )}
              >
                <Icon className={cn("w-4 h-4", isSelected ? cat.accent : "text-neutral-500")} />
                <span>{cat.title}</span>
                <span
                  className={cn(
                    "px-2 py-0.5 text-xs font-mono rounded-md border",
                    isSelected
                      ? "border-current/30 bg-white/5 text-white"
                      : "border-neutral-800 bg-neutral-900/60 text-neutral-500"
                  )}
                >
                  {cat.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div
          className={cn(
            "relative rounded-2xl border p-6 sm:p-8 lg:p-10 bg-[#0D1117]/90 backdrop-blur-xl transition-all duration-300",
            active.borderAccent
          )}
        >
          {/* Subtle gradient wash */}
          <div
            className={cn(
              "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-50 pointer-events-none",
              active.bgGlow
            )}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Details & Perks */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold">
                  <span className={active.accent}>● GATEWAY TYPE:</span>
                  <span className="text-white">{active.title}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {active.tagline}
                </h3>
                <p className="text-neutral-400 leading-relaxed text-sm sm:text-base">
                  {active.description}
                </p>
              </div>

              {/* Provider Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {active.providers.map((provider) => (
                  <div
                    key={provider.name}
                    className="p-3.5 rounded-xl border border-[#1F2430] bg-[#161B22]/70 hover:border-[#2D333B] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-white">{provider.name}</span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#10B981]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        {provider.status}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-300 font-mono truncate">{provider.model}</div>
                    <div className="text-[11px] text-neutral-500 mt-1">{provider.detail}</div>
                  </div>
                ))}
              </div>

              {/* Bullet perks */}
              <ul className="space-y-2.5 pt-2">
                {active.perks.map((perk, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                    <CheckCircle className={cn("w-4 h-4 shrink-0 mt-0.5", active.accent)} />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Terminal Snippet Preview */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-[#1F2430] bg-[#08090C] overflow-hidden shadow-2xl">
                {/* macOS chrome bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#111318] border-b border-[#1F2430]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <span className="text-xs font-mono text-neutral-400">cube ~ switch-gateway</span>
                  <div className="w-12" />
                </div>

                {/* Terminal Content */}
                <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-neutral-300">
                  <div className="flex items-center gap-2 text-neutral-500 mb-3 text-xs">
                    <span>$</span>
                    <span className="text-neutral-400">cube</span>
                  </div>
                  <pre className="text-neutral-300 whitespace-pre-wrap">
                    {active.codeSnippet}
                  </pre>
                  <div className="mt-4 pt-4 border-t border-[#1F2430] flex items-center justify-between text-xs text-neutral-500">
                    <span className="text-[#10B981] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                      Session Ready
                    </span>
                    <span className="font-mono text-[11px]">latency: ~12ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
