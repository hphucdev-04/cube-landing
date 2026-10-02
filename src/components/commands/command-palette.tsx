"use client";

import { useState } from "react";
import { Search, ChevronRight, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandItem {
  command: string;
  alias?: string;
  args?: string;
  category: "Model & Gateway" | "Session & Memory" | "Project & Agent" | "Configuration";
  description: string;
  example: string;
  output: string;
}

const COMMANDS: CommandItem[] = [
  {
    command: "/init",
    category: "Project & Agent",
    description: "Analyze the project and create or update AGENTS.md.",
    example: "/init",
    output: `Analyzing codebase and workspace structure...
  Discovered : Next.js 16 (Turbopack) · TypeScript · Tailwind CSS v4
  Conventions: kebab-case naming · conventional commits
  AGENTS.md   : Created at repository root with 14 verified project rules.`,
  },
  {
    command: "/skills",
    category: "Project & Agent",
    description: "Enable or disable workspace skills dynamically.",
    example: "/skills",
    output: `Active Workspace Skills:
  [x] mastra             - Mastra framework API documentation & lookup
  [x] pi-tui             - Terminal UI differential-rendering framework
  [ ] ponytail           - Minimalist engineering & YAGNI optimization
Use arrow keys to navigate, Space to toggle, Enter to save.`,
  },
  {
    command: "/model",
    args: "<model-id> [--effort <level>]",
    category: "Model & Gateway",
    description: "Select what model and reasoning effort to use.",
    example: "/model claude-3-7-sonnet --effort high",
    output: `Switched active model:
  Model  : claude-3-7-sonnet (Anthropic via OAuth)
  Effort : HIGH (extended multi-step reasoning enabled)
Context preserved across turns.`,
  },
  {
    command: "/gateway",
    category: "Model & Gateway",
    description: "Select an API, OAuth or local gateway strategy.",
    example: "/gateway",
    output: `Select Gateway Strategy:
  ● oauth/anthropic    (Claude Pro - Active · 85% quota)
  ○ oauth/openai       (ChatGPT Plus - Connected)
  ○ api_key/gemini     (Google Gemini Developer API)
  ○ local/ollama       (Air-gapped 100% offline inference)`,
  },
  {
    command: "/effort",
    args: "<none | low | medium | high | max>",
    category: "Model & Gateway",
    description: "Set reasoning effort for the active model.",
    example: "/effort high",
    output: `Reasoning effort updated:
  Active Model : claude-3-7-sonnet
  Effort Level : HIGH (up to 32,000 reasoning tokens)
  Best for     : Complex refactoring, architecture, concurrency`,
  },
  {
    command: "/status",
    alias: "/usage",
    category: "Session & Memory",
    description: "Show session status, context usage and subscription limits.",
    example: "/status",
    output: `Cube Session Status:
  Gateway      : oauth/anthropic (Claude Pro)
  Model        : claude-3-7-sonnet (effort: high)
  Context      : 18,420 / 200,000 tokens (9.2%)
  Subscription : 85% quota remaining (resets in 2h 15m)`,
  },
  {
    command: "/compact",
    category: "Session & Memory",
    description: "Summarize conversation to prevent hitting the context limit.",
    example: "/compact",
    output: `Context compacted successfully:
  Tokens before : 142,500 tokens
  Tokens after  : 18,200 tokens (-87.2%)
  Storage       : LibSQL SQLite session memory`,
  },
  {
    command: "/resume",
    alias: "/threads",
    args: "[thread-id]",
    category: "Session & Memory",
    description: "Switch to a previous conversation thread.",
    example: "/resume fix-auth-race",
    output: `Resumed conversation [fix-auth-race]:
  Thread ID : 4a9f81bc
  Turns     : 14 messages | 3 files modified
  Summary   : Resolving async race condition in OAuth callback`,
  },
  {
    command: "/new",
    category: "Session & Memory",
    description: "Start a new conversation thread with clean context.",
    example: "/new",
    output: `Started new conversation.
Fresh thread initialized. Workspace AGENTS.md rules active.`,
  },
  {
    command: "/fork",
    args: "[title]",
    category: "Session & Memory",
    description: "Fork current conversation into a new branch.",
    example: "/fork test-alternative-orm",
    output: `Forked active conversation:
  Branch  : test-alternative-orm
  Source  : turn 8 of main-thread
Explore alternative architectures without mutating original history.`,
  },
  {
    command: "/reload",
    category: "Project & Agent",
    description: "Reload project instructions and AGENTS.md context.",
    example: "/reload",
    output: `Project context reloaded:
  Root AGENTS.md : 14 rules synchronized
  Skills         : 4 definitions discovered in .cube/skills/`,
  },
  {
    command: "/rename",
    args: "<new-title>",
    category: "Session & Memory",
    description: "Rename current conversation thread.",
    example: "/rename migrate-payment-webhook",
    output: `Renamed thread to: migrate-payment-webhook`,
  },
  {
    command: "/delete",
    args: "[thread-id]",
    category: "Session & Memory",
    description: "Delete a conversation thread from storage.",
    example: "/delete scratch-exploration",
    output: `Deleted thread: scratch-exploration (cleaned from LibSQL memory).`,
  },
  {
    command: "/theme",
    args: "[theme-name]",
    category: "Configuration",
    description: "Select a syntax highlighting and TUI color theme.",
    example: "/theme dracula",
    output: `Syntax highlighting theme set to: dracula`,
  },
  {
    command: "/copy",
    category: "Configuration",
    description: "Copy last assistant response as markdown to clipboard.",
    example: "/copy",
    output: `Copied last assistant response to clipboard (42 lines).`,
  },
  {
    command: "/statusline",
    args: "[fields]",
    category: "Configuration",
    description: "Configure which items appear in the terminal status line.",
    example: "/statusline model, tokens, branch",
    output: `Status line items configured: [model | tokens | branch]`,
  },
  {
    command: "/title",
    args: "[fields]",
    category: "Configuration",
    description: "Configure which items appear in the terminal window title.",
    example: "/title project, model",
    output: `Terminal title configured: [project | model]`,
  },
  {
    command: "/help",
    category: "Configuration",
    description: "Show available commands in your shell.",
    example: "/help",
    output: `Cube Slash Command Catalog:
  /init       /skills     /reload
  /model      /gateway    /effort
  /status     /compact    /resume
  /new        /fork       /rename
  /delete     /theme      /copy
  /statusline /title      /exit`,
  },
  {
    command: "/exit",
    category: "Configuration",
    description: "Exit Cube and return to standard terminal shell.",
    example: "/exit",
    output: `Cube session terminated. Goodbye!`,
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#27272A] bg-[#18181B] text-[#A1A1AA] mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>COMMAND INTERFACE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4 font-sans">
            Command-line precision built for flow
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
                placeholder="Filter commands (/model, /init, /gateway...)"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#27272A] bg-[#18181B] text-xs text-white placeholder:text-[#A1A1AA]/60 focus:outline-none focus:border-white/30 transition-colors font-mono"
              />
            </div>

            {/* Scrollable Command List: shows 6 items by default, scroll for more */}
            <div className="space-y-1.5 max-h-[408px] overflow-y-auto pr-1">
              {filteredCommands.map((item) => {
                const isSelected = selectedCommand.command === item.command;
                return (
                  <button
                    key={item.command}
                    onClick={() => setSelectedCommand(item)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg border transition-colors flex items-center justify-between group cursor-pointer",
                      isSelected
                        ? "border-[#27272A] bg-[#18181B] text-white shadow-sm"
                        : "border-[#27272A]/50 bg-[#18181B]/50 hover:bg-[#18181B] hover:border-[#27272A]"
                    )}
                  >
                    <div className="space-y-0.5 min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "font-mono text-xs font-semibold",
                            isSelected ? "text-white" : "text-white group-hover:text-white"
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
                          ? "text-white translate-x-0.5"
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
                      <Check className="w-3 h-3 text-white" />
                      <span className="text-white text-[11px]">Copied</span>
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
                  <span className="px-2 py-0.5 rounded bg-[#18181B] text-white border border-[#27272A]">
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
                    <span className="text-white font-bold">❯</span>
                    <span className="text-white">{selectedCommand.example}</span>
                  </div>
                </div>

                {/* Command Output Simulated */}
                <div className="space-y-1 text-[#A1A1AA] pt-1">
                  <div className="text-[10px] uppercase tracking-wider text-[#A1A1AA]/60 font-semibold mb-1">
                    Terminal Output:
                  </div>
                  <pre className="text-neutral-300 whitespace-pre-wrap leading-relaxed text-xs pl-2 border-l-2 border-[#27272A]">
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
