"use client";

import { useState } from "react";
import { KeyRound, Shield, Laptop, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type GatewayType = "oauth" | "api" | "local";

interface GatewayCategory {
  id: GatewayType;
  title: string;
  badge: string;
  icon: typeof KeyRound;
  tagline: string;
  description: string;
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
    badge: "Zero Token Markup",
    icon: Shield,
    tagline: "Use your existing AI subscriptions. Zero extra token costs.",
    description:
      "Authenticate directly with your personal or team account via secure browser PKCE OAuth. Consume your monthly quota directly with zero middleman markup.",
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
    <section id="gateways" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#27272A]">
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#27272A] bg-[#18181B] text-[#A1A1AA] mb-4">
            <span>MODEL ROUTING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
            Your Subscriptions. Your Keys. Zero Lock-In.
          </h2>
          <p className="text-base text-[#A1A1AA] leading-relaxed">
            Never pay a 2x token markup. Sign in with your existing memberships,
            switch provider keys on the fly, or code completely offline.
          </p>
        </div>

        {/* Tab Controls (radius 8px / control token) */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {GATEWAY_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer",
                  isSelected
                    ? "border-[#27272A] bg-[#18181B] text-white shadow-sm"
                    : "border-[#27272A]/50 bg-[#18181B]/50 text-[#A1A1AA] hover:text-white hover:bg-[#18181B]"
                )}
              >
                <Icon className={cn("w-4 h-4", isSelected ? "text-white" : "text-[#A1A1AA]")} />
                <span>{cat.title}</span>
                <span
                  className={cn(
                    "px-1.5 py-0.5 text-[11px] font-mono rounded border",
                    isSelected
                      ? "border-[#27272A] bg-[#050505] text-white"
                      : "border-[#27272A] bg-[#050505] text-[#A1A1AA]"
                  )}
                >
                  {cat.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display (radius 8px, surface #18181B, border #27272A) */}
        <div className="rounded-lg border border-[#27272A] p-6 sm:p-8 bg-[#18181B]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Details & Perks */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA]">
                  GATEWAY: {active.title}
                </div>
                <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                  {active.tagline}
                </h3>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">
                  {active.description}
                </p>
              </div>

              {/* Provider Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {active.providers.map((provider) => (
                  <div
                    key={provider.name}
                    className="p-3 rounded-lg border border-[#27272A] bg-[#050505]/70"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-white">{provider.name}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#A1A1AA]">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        {provider.status}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-300 font-mono truncate">{provider.model}</div>
                    <div className="text-[11px] text-[#A1A1AA] mt-1">{provider.detail}</div>
                  </div>
                ))}
              </div>

              {/* Bullet perks */}
              <ul className="space-y-2 pt-1">
                {active.perks.map((perk, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-white" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Terminal Snippet Preview */}
            <div className="lg:col-span-5">
              <div className="rounded-lg border border-[#27272A] bg-[#050505] overflow-hidden shadow-xl">
                {/* macOS chrome bar */}
                <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#18181B] border-b border-[#27272A]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <span className="text-xs font-mono text-[#A1A1AA]">cube ~ switch-gateway</span>
                  <div className="w-8" />
                </div>

                {/* Terminal Content */}
                <div className="p-4 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-neutral-300">
                  <div className="flex items-center gap-2 text-neutral-500 mb-2 text-xs">
                    <span>$</span>
                    <span className="text-neutral-400">cube</span>
                  </div>
                  <pre className="text-neutral-300 whitespace-pre-wrap">
                    {active.codeSnippet}
                  </pre>
                  <div className="mt-3 pt-3 border-t border-[#27272A] flex items-center justify-between text-xs text-neutral-500">
                    <span className="text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
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
