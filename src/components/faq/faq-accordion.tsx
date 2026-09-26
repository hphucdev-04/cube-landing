"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
      "Yes. With Cube's OAuth gateway, you authenticate once in your default browser via secure PKCE OAuth 2.0. Cube directly consumes your monthly subscription quota without charging any token markups, monthly subscription fees, or proxy surcharges.",
  },
  {
    question: "Is my proprietary source code sent to Cube servers or used for training?",
    answer:
      "No. Cube operates on a strictly Zero Data Retention (ZDR) local-first philosophy. Cube does not operate any intermediate proxy servers. All prompt requests go directly from your local terminal to the model provider (Anthropic, OpenAI, or your local Ollama server). Your session database, credentials, and conversation history are stored entirely in LibSQL on your local disk at ~/.cube.",
  },
  {
    question: "Can I run Cube completely offline without an internet connection?",
    answer:
      "Yes. Cube has first-class integration with local inference engines like Ollama, LM Studio, and vLLM. Simply select `/gateway local ollama` and Cube will interact with your local GPU or Apple Silicon neural engine with zero outbound network calls.",
  },
  {
    question: "How does Cube discover project context and rules?",
    answer:
      "Cube's WorkspaceManager automatically scans your current directory and walks up parent folders to identify Git roots and locate AGENTS.md (or .agents/, .cube/, .claude/) instruction files. These architectural guidelines, coding styles, and safety rules are injected into the agent's context window automatically.",
  },
  {
    question: "How do updates work?",
    answer:
      "Cube comes with a built-in instantaneous updater. Running `cube update` or re-running the 1-click installer pulls the newest binary in under 2 seconds without wiping your existing configuration, credentials, or session history.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative min-h-[88vh] flex flex-col justify-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-[#27272A]">
      <div className="relative max-w-3xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#27272A] bg-[#18181B] text-[#A1A1AA] mb-2.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>KNOWLEDGE BASE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-1.5 font-sans">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA]">
            Architecture, data privacy, subscriptions, and getting started.
          </p>
        </div>

        {/* Accordion List (radius 8px / card token) */}
        <div className="space-y-2">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  "rounded-lg border transition-colors overflow-hidden",
                  isOpen
                    ? "border-white/20 bg-[#18181B]"
                    : "border-[#27272A] bg-[#18181B]/50 hover:border-[#27272A] hover:bg-[#18181B]"
                )}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-medium text-white">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "w-5 h-5 rounded-md flex items-center justify-center border transition-transform shrink-0",
                      isOpen
                        ? "border-white/20 bg-[#050505] text-white rotate-180"
                        : "border-[#27272A] bg-[#050505] text-[#A1A1AA]"
                    )}
                  >
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.18, delay: 0.04 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.12 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-4 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed border-t border-[#27272A]/60 pt-2.5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
