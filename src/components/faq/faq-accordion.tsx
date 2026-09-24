"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How does the 1-click installer work?",
    answer:
      "Our installer script runs directly in PowerShell on Windows (or curl/bash on macOS & Linux). It detects your system architecture, downloads the standalone self-contained Cube binary into your user home directory, and configures your PATH. No Node.js runtime, build tools, or administrator privileges are required.",
  },
  {
    question: "Can I really use my existing Claude Pro or ChatGPT Plus subscription?",
    answer:
      "Yes! With Cube's OAuth gateway, you authenticate once in your default browser via secure PKCE OAuth 2.0. Cube directly consumes your monthly subscription quota without charging any token markups, monthly subscription fees, or proxy surcharges.",
  },
  {
    question: "Is my proprietary source code sent to Cube servers or used for training?",
    answer:
      "No. Cube operates on a strictly Zero Data Retention (ZDR) local-first philosophy. Cube does not operate any intermediate proxy servers. All prompt requests go directly from your local terminal to the model provider (Anthropic, OpenAI, or your local Ollama server). Your session database, credentials, and conversation history are stored entirely in LibSQL on your local disk at `~/.cube`.",
  },
  {
    question: "Can I run Cube completely offline without an internet connection?",
    answer:
      "Yes. Cube has first-class integration with local inference engines like Ollama, LM Studio, and vLLM. Simply select `/gateway local ollama` and Cube will interact with your local GPU or Apple Silicon neural engine with zero outbound internet network calls.",
  },
  {
    question: "How does Cube discover project context and rules?",
    answer:
      "Cube's WorkspaceManager automatically scans your current directory and walks up parent folders to identify Git roots and locate `AGENTS.md` (or `.agents/`, `.cube/`, `.claude/`) instruction files. These architectural guidelines, coding styles, and safety rules are injected into the agent's context window automatically.",
  },
  {
    question: "How do updates work?",
    answer:
      "Cube comes with a built-in instantaneous updater. Running `cube update` or re-running the 1-click installer pulls the newest binary in under 2 seconds without wiping your existing configuration, credentials, or session history.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-28 px-4 sm:px-6 lg:px-8 border-t border-[#1F2430]">
      <div className="relative max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF] mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>KNOWLEDGE BASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#00F0FF] to-[#10B981] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-400">
            Everything you need to know about architecture, data privacy, and getting started.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  "rounded-2xl border transition-all duration-200 overflow-hidden",
                  isOpen
                    ? "border-[#00F0FF]/40 bg-[#0D1117] shadow-lg shadow-black/20"
                    : "border-[#1F2430] bg-[#0D1117]/60 hover:border-[#2D333B]"
                )}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-semibold text-white">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center border transition-all shrink-0",
                      isOpen
                        ? "border-[#00F0FF]/50 bg-[#00F0FF]/10 text-[#00F0FF] rotate-180"
                        : "border-[#1F2430] bg-[#161B22] text-neutral-400"
                    )}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-neutral-300 leading-relaxed border-t border-[#1F2430]/60 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
