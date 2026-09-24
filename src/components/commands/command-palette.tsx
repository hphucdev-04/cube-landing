"use client";

import { useState } from "react";
import { Terminal, Search, ChevronRight, Hash, Copy, Check } from "lucide-react";
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
    <section id="commands" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-[#27272A]">
      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#27272A] bg-[#18181B] text-[#5EEAD4] mb-4">
            <Hash className="w-3.5 h-3.5" />
            <span>COMMAND INTERFACE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
            Command-Line Precision. Built for Flow.
          </h2>
          <p className="text-base text-[#A1A1AA] leading-relaxed">
            Keep your fingers on home row. Instant slash commands give you total control over models,
            memory compression, and thread branches without interrupting your work.
          </p>
        </div>

        {/* Command Explorer Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Command List */}
          <div className="lg:col-span-5 space-y-3">
            {/* Filter Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter commands (/model, /gateway...)"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#27272A] bg-[#18181B] text-xs text-white placeholder:text-[#A1A1AA]/60 focus:outline-none focus:border-[#5EEAD4]/60 transition-colors font-mono"
              />
            </div>

            {/* List */}
            <div className="space-y-1.5">
              {filteredCommands.map((item) => {
                const isSelected = selectedCommand.command === item.command;
                return (
                  <button
                    key={item.command}
                    onClick={() => setSelectedCommand(item)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg border transition-colors flex items-center justify-between group cursor-pointer",
                      isSelected
                        ? "border-[#5EEAD4]/50 bg-[#18181B]"
                        : "border-[#27272A] bg-[#18181B]/50 hover:bg-[#18181B] hover:border-[#27272A]"
                    )}
                  >
                    <div className="space-y-0.5 min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "font-mono text-xs font-semibold",
                            isSelected ? "text-[#5EEAD4]" : "text-white group-hover:text-[#5EEAD4]"
                          )}
                        >
                          {item.command}
                        </span>
                        {item.alias && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono border border-[#27272A] bg-[#050505] text-[#A1A1AA]">
                            {item.alias}
                          </span>
                        )}
                        {item.args && (
                          <span className="font-mono text-[11px] text-[#A1A1AA] truncate hidden sm:inline">
                            {item.args}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#A1A1AA] line-clamp-1">{item.description}</p>
                    </div>

                    <ChevronRight
                      className={cn(
                        "w-4 h-4 shrink-0 transition-transform",
                        isSelected
                          ? "text-[#5EEAD4] translate-x-0.5"
                          : "text-[#A1A1AA]/40 group-hover:text-white"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Interactive Command Preview Terminal */}
          <div className="lg:col-span-7">
            <div className="rounded-lg border border-[#27272A] bg-[#050505] overflow-hidden shadow-xl">
              {/* macOS window chrome */}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#18181B] border-b border-[#27272A]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#A1A1AA]">
                    cube ~ {selectedCommand.command}
                  </span>
                </div>
                <button
                  onClick={() => copyCommand(selectedCommand.example)}
                  title="Copy command"
                  className="flex items-center gap-1 text-xs text-[#A1A1AA] hover:text-white px-2 py-1 rounded bg-[#050505] border border-[#27272A] hover:border-white/30 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#5EEAD4]" />
                      <span className="text-[#5EEAD4] text-[11px]">Copied</span>
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
              <div className="p-5 font-mono text-xs sm:text-[13px] space-y-3.5">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 text-xs pb-3 border-b border-[#27272A]">
                  <span className="px-2 py-0.5 rounded bg-[#18181B] text-[#5EEAD4] border border-[#27272A]">
                    {selectedCommand.category}
                  </span>
                  <span className="text-[#A1A1AA]">
                    Syntax:{" "}
                    <code className="text-white">
                      {selectedCommand.command} {selectedCommand.args || ""}
                    </code>
                  </span>
                </div>

                {/* Explanation */}
                <p className="text-neutral-300 text-xs sm:text-sm font-sans leading-relaxed">
                  {selectedCommand.description}
                </p>

                {/* Command Input Simulated */}
                <div className="p-2.5 rounded bg-[#18181B] border border-[#27272A]">
                  <div className="flex items-center gap-2 text-[#A1A1AA]">
                    <span className="text-[#5EEAD4] font-bold">❯</span>
                    <span className="text-white">{selectedCommand.example}</span>
                  </div>
                </div>

                {/* Command Output Simulated */}
                <div className="space-y-1 text-[#A1A1AA] pt-1">
                  <div className="text-[10px] uppercase tracking-wider text-[#A1A1AA]/60 font-semibold mb-1">
                    Terminal Output:
                  </div>
                  <pre className="text-neutral-300 whitespace-pre-wrap leading-relaxed text-xs pl-2 border-l-2 border-[#5EEAD4]/40">
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
