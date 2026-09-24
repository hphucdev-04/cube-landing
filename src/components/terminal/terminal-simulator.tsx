"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import {
  Terminal,
  Cpu,
  CheckCircle2,
  FileCode,
  FolderGit2,
  Sparkles,
} from "lucide-react";
import { SCENARIOS, type Scenario } from "./scenarios";

export function TerminalSimulator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: false });

  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [displayedInput, setDisplayedInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scenario = SCENARIOS[activeScenarioIndex];

  // Auto-play / replay when entering / leaving viewport
  useEffect(() => {
    if (!isInView) {
      // Reset when scrolled out of view
      setCurrentStepIndex(0);
      setDisplayedInput("");
      setIsTyping(false);
      return;
    }

    // When scrolled into view: start executing steps
    let isCancelled = false;
    let timeoutId: NodeJS.Timeout;

    const runScenario = async () => {
      setCurrentStepIndex(0);
      setDisplayedInput("");

      for (let i = 0; i < scenario.steps.length; i++) {
        if (isCancelled) break;
        const step = scenario.steps[i];

        if (step.type === "user-input") {
          setIsTyping(true);
          setDisplayedInput("");
          const text = step.content;
          for (let c = 0; c <= text.length; c++) {
            if (isCancelled) break;
            setDisplayedInput(text.slice(0, c));
            await new Promise((r) => setTimeout(r, 22));
          }
          setIsTyping(false);
          await new Promise((r) => setTimeout(r, 400));
        }

        if (isCancelled) break;
        setCurrentStepIndex(i + 1);
        await new Promise((r) => {
          timeoutId = setTimeout(r, step.delayMs);
        });
      }
    };

    runScenario();

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [isInView, activeScenarioIndex, scenario]);

  return (
    <section id="terminal" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-300 mb-3">
          <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>Interactive Live Showcase</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Watch Cube Operate in Real Time
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-400 max-w-xl mx-auto">
          Autonomously inspects files, reasons through diffs, and commits atomic
          code changes directly inside your terminal.
        </p>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {SCENARIOS.map((item, index) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveScenarioIndex(index);
              setCurrentStepIndex(0);
              setDisplayedInput("");
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
              activeScenarioIndex === index
                ? "bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                : "bg-white/[0.03] text-gray-400 hover:text-gray-200 border border-white/[0.06] hover:bg-white/[0.06]"
            }`}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* macOS Terminal Window Container */}
      <div
        ref={containerRef}
        className="relative rounded-2xl bg-[#090A0F]/95 border border-white/[0.12] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,240,255,0.06)] overflow-hidden backdrop-blur-2xl transition-all"
      >
        {/* macOS Title Bar */}
        <div className="px-4 py-3 bg-[#0F1117]/90 border-b border-white/[0.08] flex items-center justify-between select-none">
          {/* macOS Traffic Light Buttons */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-sm" />
          </div>

          {/* Window Title */}
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <FolderGit2 className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="text-gray-300 font-medium">cube — ~/workspace</span>
          </div>

          {/* Model Status Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>{scenario.model}</span>
          </div>
        </div>

        {/* Terminal Body Content */}
        <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm min-h-[360px] sm:min-h-[420px] flex flex-col gap-4 text-gray-300 overflow-x-auto leading-relaxed">
          {/* Welcome ASCII Mini Header */}
          <div className="text-gray-600 text-[11px] select-none">
            [Cube Agent v1.0.0 — Memory: LibSQL SQLite — Session: active]
          </div>

          {/* User Prompt Step */}
          <div className="flex items-start gap-2.5 text-white">
            <span className="text-[#00F0FF] select-none font-bold">❯</span>
            <span>
              {displayedInput}
              {isTyping && (
                <span className="inline-block w-2 h-4 ml-1 bg-[#00F0FF] animate-pulse align-middle" />
              )}
            </span>
          </div>

          {/* Streamed Steps */}
          {scenario.steps.slice(0, currentStepIndex).map((step, idx) => {
            if (step.type === "user-input") return null;

            if (step.type === "reasoning") {
              return (
                <div
                  key={idx}
                  className="rounded-lg p-3 bg-[#F59E0B]/10 border border-[#F59E0B]/25 text-[#F59E0B] flex items-start gap-2.5 text-xs"
                >
                  <Cpu className="w-4 h-4 shrink-0 mt-0.5 animate-spin" />
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold uppercase tracking-wider text-[10px]">
                      Reasoning Stream
                    </span>
                    <span className="text-gray-200">{step.content}</span>
                  </div>
                </div>
              );
            }

            if (step.type === "tool-call") {
              return (
                <div
                  key={idx}
                  className="rounded-lg p-3 bg-white/[0.03] border border-white/[0.08] flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2 text-[#00F0FF] text-xs">
                    <span className="font-bold">❖</span>
                    <span className="font-semibold">{step.toolName}</span>
                    <span className="text-gray-400 text-[11px]">
                      {step.content.replace(`${step.toolName} `, "")}
                    </span>
                  </div>

                  {/* Diff preview if present */}
                  {step.diff && (
                    <div className="rounded bg-black/50 p-2.5 border border-white/[0.06] text-xs font-mono space-y-1">
                      <div className="text-gray-400 text-[11px] mb-1 flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5" />
                        <span>{step.diff.file}</span>
                      </div>
                      {step.diff.deletions.map((del, dIdx) => (
                        <div key={dIdx} className="text-red-400 bg-red-950/30 px-1 py-0.5 rounded">
                          {del}
                        </div>
                      ))}
                      {step.diff.additions.map((add, aIdx) => (
                        <div key={aIdx} className="text-emerald-400 bg-emerald-950/30 px-1 py-0.5 rounded">
                          {add}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (step.type === "tool-result") {
              return (
                <div key={idx} className="text-xs text-gray-400 pl-4 border-l border-white/10 flex items-center gap-2">
                  <span className="text-gray-500">↳</span>
                  <span>{step.content}</span>
                </div>
              );
            }

            if (step.type === "assistant-text") {
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/25 text-emerald-300 text-xs sm:text-sm flex items-start gap-2.5 leading-relaxed whitespace-pre-line"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <div>{step.content}</div>
                </div>
              );
            }

            if (step.type === "status") {
              return (
                <div key={idx} className="text-xs text-gray-400 italic bg-white/[0.02] p-2 rounded border border-white/5">
                  {step.content}
                </div>
              );
            }

            return null;
          })}

          {/* Idle prompt indicator at end */}
          {currentStepIndex >= scenario.steps.length && (
            <div className="flex items-center gap-2 text-gray-500 pt-2 border-t border-white/[0.06]">
              <span className="text-gray-600 font-bold">❯</span>
              <span className="text-xs text-gray-500">Awaiting next instruction...</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
