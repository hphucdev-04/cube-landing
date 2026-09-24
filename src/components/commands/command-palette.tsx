"use client";

import { useState } from "react";
import { Terminal, Search, ChevronRight, Hash, Sparkles, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandItem {
  command: string;
  alias?: string;
  args?: string;
  category: "Model & Gateway" | "Session & Memory" | "Agent Control";
  description: string;
  example: string;
  output: string;
}

const COMMANDS: CommandItem[] = [
  {
    command: "/model",
    alias: "/m",
    args: "[model_name]",
    category: "Model & Gateway",
    description: "Switch the active reasoning model instantly without restarting your agent session.",
    example: "/model claude-3-7-sonnet",
    output: `Switched active model:
  From : claude-3-5-sonnet-20241022
  To   : claude-3-7-sonnet-20250219 (Thinking enabled)
Context preserved across 8 turns.`,
  },
  {
    command: "/gateway",
    alias: "/g",
    args: "<oauth | api | local> [provider]",
    category: "Model & Gateway",
    description: "Toggle between browser PKCE OAuth, developer API keys, and local offline Ollama.",
    example: "/gateway oauth anthropic",
    output: `Gateway switched to [oauth/anthropic]:
  Account : user@company.com (Claude Pro)
  Token   : refreshed valid until 2026-09-30
  Quota   : 85% remaining this billing cycle`,
  },
  {
    command: "/effort",
    args: "<low | medium | high | max>",
    category: "Model & Gateway",
    description: "Adjust the extended thinking and reasoning budget allocated for complex tasks.",
    example: "/effort high",
    output: `Thinking effort updated:
  Effort level : HIGH (up to 32,000 reasoning tokens)
  Best for     : Complex refactoring, concurrency bugs, algorithmic design`,
  },
  {
    command: "/thread",
    alias: "/t",
    args: "[new | list | switch <id>]",
    category: "Session & Memory",
    description: "Branch your conversation into isolated work streams or resume earlier agent sessions.",
    example: "/thread switch fix-auth-race",
    output: `Active thread changed to [fix-auth-race]:
  Created : 2 hours ago
  Summary : Debugging async race condition in PKCE callback
  Turns   : 14 messages | 3 files modified`,
  },
  {
    command: "/compact",
    category: "Session & Memory",
    description: "Compress conversation history using semantic summarization to liberate token context.",
    example: "/compact",
    output: `Memory compacted successfully:
  Tokens before : 142,500 tokens
  Tokens after  : 18,200 tokens (-87.2%)
  Summary saved to LibSQL long-term session store.`,
  },
  {
    command: "/status",
    category: "Agent Control",
    description: "Inspect active project root, detected AGENTS.md rules, token consumption, and permissions.",
    example: "/status",
    output: `Cube Session Status:
  Root        : D:\\projects\\payments-service
  Rules       : 3 AGENTS.md files active
  Gateway     : OAuth / Anthropic (Claude 3.7 Sonnet)
  Tools       : fs:read, fs:write, bash:exec (with confirmation)
  Session Age : 42m 18s`,
  },
];

export function CommandPalette() {
  const [selectedCommand, setSelectedCommand] = useState<CommandItem>(COMMANDS[0]);
  const [copied, setCopied] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const filteredCommands = COMMANDS.filter(
    (c) =>
      c.command.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="commands" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-[#1F2430]">
      {/* Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-[#A855F7]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#A855F7]/30 bg-[#A855F7]/10 text-[#A855F7] mb-4">
            <Hash className="w-3.5 h-3.5" />
            <span>COMMAND INTERFACE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            Command-Line Precision.{" "}
            <span className="bg-gradient-to-r from-[#A855F7] to-[#00F0FF] bg-clip-text text-transparent">
              Built for Flow.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-400">
            Keep your fingers on home row. Instant slash commands give you total control over models,
            memory compression, and thread branches without interrupting your workflow.
          </p>
        </div>

        {/* Command Explorer Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Command List */}
          <div className="lg:col-span-5 space-y-4">
            {/* Filter Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter commands (/model, /gateway...)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#1F2430] bg-[#0D1117] text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-[#A855F7]/50 focus:ring-1 focus:ring-[#A855F7]/30 transition-all font-mono"
              />
            </div>

            {/* List */}
            <div className="space-y-2">
              {filteredCommands.map((item) => {
                const isSelected = selectedCommand.command === item.command;
                return (
                  <button
                    key={item.command}
                    onClick={() => setSelectedCommand(item)}
                    className={cn(
                      "w-full text-left p-3.5 rounded-xl border transition-all duration-150 flex items-center justify-between group cursor-pointer",
                      isSelected
                        ? "border-[#A855F7]/50 bg-[#161B22] shadow-lg shadow-black/30"
                        : "border-[#1F2430] bg-[#0D1117]/60 hover:bg-[#161B22]/60 hover:border-[#2D333B]"
                    )}
                  >
                    <div className="space-y-1 min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "font-mono text-sm font-semibold",
                            isSelected ? "text-[#A855F7]" : "text-white group-hover:text-[#A855F7]"
                          )}
                        >
                          {item.command}
                        </span>
                        {item.alias && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono border border-neutral-800 bg-neutral-900 text-neutral-400">
                            {item.alias}
                          </span>
                        )}
                        {item.args && (
                          <span className="font-mono text-xs text-neutral-500 truncate hidden sm:inline">
                            {item.args}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-1">{item.description}</p>
                    </div>

                    <ChevronRight
                      className={cn(
                        "w-4 h-4 shrink-0 transition-transform",
                        isSelected
                          ? "text-[#A855F7] translate-x-1"
                          : "text-neutral-600 group-hover:text-neutral-400"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Interactive Command Preview Terminal */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#1F2430] bg-[#08090C] overflow-hidden shadow-2xl">
              {/* macOS window chrome */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#111318] border-b border-[#1F2430]">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-neutral-400">
                    cube ~ {selectedCommand.command}
                  </span>
                </div>
                <button
                  onClick={() => copyCommand(selectedCommand.example)}
                  title="Copy command"
                  className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2 py-1 rounded bg-[#161B22] border border-[#1F2430] hover:border-neutral-600 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#10B981]" />
                      <span className="text-[#10B981] text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal View */}
              <div className="p-6 font-mono text-xs sm:text-sm space-y-4">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 text-xs pb-4 border-b border-[#1F2430]">
                  <span className="px-2 py-0.5 rounded bg-[#A855F7]/10 text-[#A855F7] border border-[#A855F7]/30">
                    {selectedCommand.category}
                  </span>
                  <span className="text-neutral-500">
                    Syntax:{" "}
                    <code className="text-neutral-300">
                      {selectedCommand.command} {selectedCommand.args || ""}
                    </code>
                  </span>
                </div>

                {/* Explanation */}
                <p className="text-neutral-300 text-sm font-sans leading-relaxed">
                  {selectedCommand.description}
                </p>

                {/* Command Input Simulated */}
                <div className="p-3 rounded-lg bg-[#0D1117] border border-[#1F2430] space-y-2">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <span className="text-[#00F0FF]">$</span>
                    <span className="text-white font-semibold">{selectedCommand.example}</span>
                  </div>
                </div>

                {/* Command Output Simulated */}
                <div className="space-y-1 text-neutral-400 pt-1">
                  <div className="text-[11px] uppercase tracking-wider text-neutral-600 font-bold mb-2">
                    Terminal Output:
                  </div>
                  <pre className="text-neutral-300 whitespace-pre-wrap leading-relaxed text-xs sm:text-sm pl-2 border-l-2 border-[#A855F7]/40">
                    {selectedCommand.output}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
