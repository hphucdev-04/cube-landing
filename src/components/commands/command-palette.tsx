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
    <section
      id="commands"
      className="relative border-t border-[#2A2622] bg-[#0A0908] w-full overflow-hidden"
    >
      {/* Etching texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,rgba(255,255,255,0.015) 0px,rgba(255,255,255,0.015) 1px,transparent 1px,transparent 9px),repeating-linear-gradient(-45deg,rgba(255,255,255,0.015) 0px,rgba(255,255,255,0.015) 1px,transparent 1px,transparent 9px)",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-20 sm:py-24">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#2A2622] bg-[#141210] text-xs font-mono mb-4">
            {/* Product accent dot */}
            <span className="w-1.5 h-1.5 bg-[#38BDF8]" />
            <span className="font-cinzel text-[#F5F5F4] tracking-wider">LIBER III · THE SCRIPTORIUM</span>
          </div>
          <h2
            className="font-sans font-semibold tracking-tight text-[#F5F5F4] leading-[1.06] mb-3"
            style={{ fontSize: "clamp(1.8rem,4vw,3rem)" }}
          >
            Architectural Precision Built for Flow
          </h2>
          <p className="text-sm text-[#A8A29E] leading-relaxed font-serif max-w-2xl">
            Keep your fingers on the home row. Instant slash commands give you total authority over models,
            memory compression, and thread branches without interrupting your structural focus.
          </p>
        </div>

        {/* Command Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Command List */}
          <div className="lg:col-span-5 space-y-2.5">
            {/* Filter Search — stone palette */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3E3833]" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter commands (/model, /init, /gateway...)"
                className="w-full pl-9 pr-3 py-2 border border-[#2A2622] bg-[#0D0C0A] text-xs text-[#F5F5F4] placeholder:text-[#3E3833] focus:outline-none focus:border-[#78716C] transition-colors font-mono"
              />
            </div>

            {/* Scrollable Command List */}
            <div className="space-y-1 max-h-[420px] overflow-y-auto pr-1">
              {filteredCommands.map((item) => {
                const isSelected = selectedCommand.command === item.command;
                return (
                  <button
                    key={item.command}
                    onClick={() => setSelectedCommand(item)}
                    className={cn(
                      "w-full text-left px-3 py-2.5 border transition-colors flex items-center justify-between group cursor-pointer",
                      isSelected
                        ? "border-[#78716C] bg-[#141210] text-[#F5F5F4]"
                        : "border-[#2A2622] bg-[#0D0C0A] hover:bg-[#141210] hover:border-[#3E3833]"
                    )}
                  >
                    <div className="space-y-0.5 min-w-0 pr-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={cn(
                            "font-mono text-xs font-semibold",
                            isSelected
                              ? "text-[#38BDF8]"  // active item command text — indicator
                              : "text-[#D6D3D1] group-hover:text-[#38BDF8]"
                          )}
                        >
                          {item.command}
                        </span>
                        {item.alias && (
                          <span className="px-1.5 text-[10px] font-mono border border-[#2A2622] text-[#3E3833]">
                            {item.alias}
                          </span>
                        )}
                        {item.args && (
                          <span className="font-mono text-[10px] text-[#3E3833] truncate hidden sm:inline">
                            {item.args}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#78716C] line-clamp-1 font-mono">{item.description}</p>
                    </div>

                    <ChevronRight
                      className={cn(
                        "w-4 h-4 shrink-0 transition-transform",
                        isSelected
                          ? "text-[#38BDF8] translate-x-0.5"  // active indicator
                          : "text-[#3E3833] group-hover:text-[#78716C]"
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Command Preview Terminal — stone palette */}
          <div className="lg:col-span-7">
            <div className="border border-[#2A2622] bg-[#0D0C0A] overflow-hidden">
              {/* Terminal chrome bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#141210] border-b border-[#2A2622]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#2A2622]" />
                  <span className="w-2 h-2 bg-[#2A2622]" />
                  <span className="w-2 h-2 bg-[#2A2622]" />
                </div>
                <span className="font-mono text-[11px] text-[#3E3833]">
                  cube ~ {selectedCommand.command}
                </span>
                <button
                  onClick={() => copyCommand(selectedCommand.example)}
                  title="Copy command"
                  className="flex items-center gap-1 text-[11px] text-[#78716C] hover:text-[#F5F5F4] px-2 py-1 border border-[#2A2622] hover:border-[#3E3833] transition-colors cursor-pointer font-mono"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#38BDF8]" />
                      <span className="text-[#38BDF8]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal View */}
              <div className="p-5 font-mono text-xs space-y-4">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-2.5 pb-3 border-b border-[#2A2622]">
                  <span className="px-2 py-0.5 border border-[#3E3833] text-[#A8A29E] text-[11px] font-cinzel tracking-wide">
                    {selectedCommand.category}
                  </span>
                  <span className="text-[#78716C] text-[11px]">
                    Syntax:{" "}
                    <code className="text-[#D6D3D1]">
                      {selectedCommand.command} {selectedCommand.args || ""}
                    </code>
                  </span>
                </div>

                {/* Explanation */}
                <p className="text-[#A8A29E] text-xs font-sans leading-relaxed">
                  {selectedCommand.description}
                </p>

                {/* Command Input — prompt cursor = #38BDF8 per DESIGN.md */}
                <div className="p-3 border border-[#2A2622] bg-[#0A0908]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#38BDF8] font-bold">❯</span>
                    <span className="text-[#F5F5F4]">{selectedCommand.example}</span>
                  </div>
                </div>

                {/* Command Output */}
                <div className="space-y-1.5">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#3E3833] font-cinzel">
                    Terminal Output
                  </div>
                  <pre className="text-[#C8C5C2] whitespace-pre-wrap leading-relaxed text-[11px] pl-3 border-l border-[#38BDF8]/30">
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
