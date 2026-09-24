"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import {
  Terminal,
  Cpu,
  CheckCircle2,
  FileCode,
  FolderGit2,
} from "lucide-react";
import { SCENARIOS, type Scenario } from "./scenarios";

export function TerminalSimulator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.25, once: false });

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

        const stepDelay = step.delayMs || 800;
        await new Promise((r) => setTimeout(r, stepDelay));
      }
    };

    timeoutId = setTimeout(() => {
      runScenario();
    }, 250);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [isInView, activeScenarioIndex, scenario]);

  return (
    <div id="showcase" className="w-full max-w-5xl mx-auto">
      {/* Section Subhead */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-xs font-mono text-[#A1A1AA] mb-3">
          <Terminal className="w-3.5 h-3.5 text-white" />
          <span>Interactive Live Showcase</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
          Watch Cube operate in real time.
        </h2>
        <p className="mt-2 text-sm text-[#A1A1AA] max-w-xl mx-auto">
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
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer ${
              activeScenarioIndex === index
                ? "bg-[#18181B] text-white border border-[#27272A] shadow-sm"
                : "bg-[#18181B]/50 text-[#A1A1AA] hover:text-white border border-[#27272A]/50 hover:bg-[#18181B]"
            }`}
          >
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* macOS Terminal Window Container */}
      <div
        ref={containerRef}
        className="relative rounded-xl bg-[#090A0E] border border-[#27272A] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all"
      >
        {/* macOS Title Bar */}
        <div className="px-4 py-3 bg-[#18181B] border-b border-[#27272A] flex items-center justify-between select-none">
          {/* macOS Traffic Light Buttons */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-sm" />
          </div>

          {/* Window Title */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#A1A1AA]">
            <FolderGit2 className="w-3.5 h-3.5 text-white" />
            <span className="text-white font-medium">cube — ~/workspace</span>
          </div>

          {/* Model Status Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#050505] border border-[#27272A] text-[11px] font-mono text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>{scenario.model}</span>
          </div>
        </div>

        {/* Terminal Body Content */}
        <div className="p-4 sm:p-6 font-mono text-xs sm:text-[13px] min-h-[380px] sm:min-h-[440px] flex flex-col gap-4 text-[#FFFFFF] overflow-x-auto leading-relaxed">
          {/* Welcome ASCII Mini Header */}
          <div className="text-[#A1A1AA]/60 text-[11px] select-none">
            [Cube Agent v1.0.0 — Memory: LibSQL SQLite — Session: active]
          </div>

          {/* User Prompt Step */}
          <div className="flex items-start gap-2.5 text-white">
            <span className="text-white select-none font-bold">❯</span>
            <span>
              {displayedInput}
              {isTyping && (
                <span className="inline-block w-2 h-4 ml-1 bg-white animate-pulse align-middle" />
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
                  className="rounded-lg p-3 bg-[#18181B] border border-[#27272A] text-white flex items-start gap-2.5 text-xs"
                >
                  <Cpu className="w-4 h-4 text-[#A1A1AA] shrink-0 mt-0.5 animate-spin" />
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold uppercase tracking-wider text-[10px] text-[#A1A1AA]">
                      Reasoning Stream
                    </span>
                    <span className="text-[#A1A1AA]">{step.content}</span>
                  </div>
                </div>
              );
            }

            if (step.type === "tool-call") {
              return (
                <div
                  key={idx}
                  className="rounded-lg p-3 bg-[#18181B] border border-[#27272A] flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2 text-white text-xs">
                    <span className="font-bold text-[#A1A1AA]">❖</span>
                    <span className="font-semibold">{step.toolName}</span>
                    <span className="text-[#A1A1AA] text-[11px]">
                      {step.content.replace(`${step.toolName} `, "")}
                    </span>
                  </div>

                  {/* Diff preview if present */}
                  {step.diff && (
                    <div className="rounded bg-[#050505] p-2.5 border border-[#27272A] text-xs font-mono space-y-1">
                      <div className="text-[#A1A1AA] text-[11px] mb-1 flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 text-[#A1A1AA]" />
                        <span>{step.diff.file}</span>
                      </div>
                      {step.diff.deletions.map((del, dIdx) => (
                        <div key={dIdx} className="text-neutral-400 bg-white/5 px-1 py-0.5 rounded">
                          {del}
                        </div>
                      ))}
                      {step.diff.additions.map((add, aIdx) => (
                        <div key={aIdx} className="text-white bg-white/10 px-1 py-0.5 rounded font-medium">
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
                <div key={idx} className="text-xs text-[#A1A1AA] pl-4 border-l border-[#27272A] flex items-center gap-2">
                  <span className="text-neutral-500">↳</span>
                  <span>{step.content}</span>
                </div>
              );
            }

            if (step.type === "assistant-text") {
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-[#18181B] border border-[#27272A] text-white text-xs sm:text-sm flex items-start gap-2.5 leading-relaxed whitespace-pre-line"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-white mt-0.5" />
                  <div>{step.content}</div>
                </div>
              );
            }

            if (step.type === "status") {
              return (
                <div key={idx} className="text-xs text-[#A1A1AA] italic bg-[#18181B]/40 p-2 rounded border border-[#27272A]">
                  {step.content}
                </div>
              );
            }

            return null;
          })}

          {/* Idle prompt indicator at end */}
          {currentStepIndex >= scenario.steps.length && (
            <div className="flex items-center gap-2 text-neutral-500 pt-2 border-t border-[#27272A]">
              <span className="text-white font-bold">❯</span>
              <span className="text-xs text-[#A1A1AA]">Awaiting next instruction...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
