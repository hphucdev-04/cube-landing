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
    id: "oauth", title: "Account OAuth", badge: "4 Providers", icon: Shield,
    tagline: "Sign in with a supported provider account.",
    description: "Choose Anthropic, OpenAI, xAI, or Google from /gateway and follow the provider sign-in flow. Model availability, account eligibility, and usage limits depend on the provider.",
    codeSnippet: `/gateway
# Choose oauth/anthropic in the gateway picker
# Complete provider sign-in
/model
# Choose an available model`,
    perks: ["Browser-based provider sign-in", "Access-token refresh", "Credentials stored locally in ~/.cube/auth.json", "Switch gateways and models interactively"],
    providers: [
      { name: "Anthropic", model: "Available Claude models", status: "Supported", detail: "Provider account and limits apply" },
      { name: "OpenAI", model: "Available account models", status: "Supported", detail: "Provider account and limits apply" },
      { name: "xAI", model: "Available Grok models", status: "Supported", detail: "Provider account and limits apply" },
      { name: "Google", model: "Available Gemini models", status: "Supported", detail: "Provider account and limits apply" },
    ],
  },
  {
    id: "api", title: "Direct API Keys", badge: "15 Providers", icon: KeyRound,
    tagline: "Bring your own provider API key.",
    description: "Connect API keys from 15 configured providers, including OpenAI, Anthropic, Google, OpenRouter, DeepSeek, and Groq. Credentials persist locally in ~/.cube/auth.json; provider billing applies.",
    codeSnippet: `/gateway
# Choose api_key/openrouter and enter your API key
/model
# Select a model from the provider catalog`,
    perks: ["15 supported API key providers", "Model and reasoning controls where supported", "Local credential persistence", "Provider catalogs available through /model"],
    providers: [
      { name: "OpenRouter", model: "Models from its provider catalog", status: "Supported", detail: "Provider billing applies" },
      { name: "Anthropic API", model: "Available Claude models", status: "Supported", detail: "Developer API key" },
      { name: "OpenAI API", model: "Models from its provider catalog", status: "Supported", detail: "Developer API key" },
      { name: "DeepSeek", model: "Models from its provider catalog", status: "Supported", detail: "Developer API key" },
    ],
  },
  {
    id: "local", title: "Local Model Servers", badge: "Ollama & LM Studio", icon: Laptop,
    tagline: "Use models served on your own machine.",
    description: "Connect to Ollama or LM Studio at a configurable local URL. Download a model and start the server first. Local inference avoids a cloud model endpoint; updates, web tools, or remote MCP services may still use the network.",
    codeSnippet: `/gateway
# Choose local/ollama or local/lmstudio
/model
# Select a model available on your local server`,
    perks: ["Ollama model discovery", "LM Studio model discovery", "Configurable gateway base URLs", "Local conversation history and memory"],
    providers: [
      { name: "Ollama", model: "Downloaded models from /api/tags", status: "Supported", detail: "http://127.0.0.1:11434" },
      { name: "LM Studio", model: "Models served by your local instance", status: "Supported", detail: "http://127.0.0.1:1234/v1" },
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
            Your Accounts. Your Keys. Your Local Models.
          </h2>
          <p className="text-base text-[#A1A1AA] leading-relaxed">
            Connect a supported account, bring a provider API key,
            or use a model served by Ollama or LM Studio.
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
                    <span className="font-mono text-[11px]">Provider-dependent latency</span>
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
