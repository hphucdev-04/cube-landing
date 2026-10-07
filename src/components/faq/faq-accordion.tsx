"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
    <section
      id="faq"
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

      <div className="relative max-w-4xl mx-auto w-full px-6 sm:px-10 py-20 sm:py-24">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-mono border border-[#2A2622] bg-[#141210] mb-4">
            {/* Product accent dot — per DESIGN.md */}
            <span className="w-1.5 h-1.5 bg-[#38BDF8]" />
            <span className="font-cinzel text-[#F5F5F4] tracking-wider">DOCUMENTATION &amp; FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#F5F5F4] mb-2 font-sans">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#A8A29E] font-serif">
            Local privacy, subscriptions, model gateways, and getting started.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-2.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  "border transition-colors overflow-hidden",
                  isOpen
                    ? "border-[#3E3833] bg-[#0D0C0A]"
                    : "border-[#2A2622] bg-[#0A0908] hover:border-[#3E3833]"
                )}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-medium text-[#F5F5F4]">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "w-5 h-5 flex items-center justify-center border transition-all shrink-0",
                      isOpen
                        ? "border-[#78716C] bg-[#141210] text-[#A8A29E] rotate-180"
                        : "border-[#2A2622] bg-[#0A0908] text-[#3E3833]"
                    )}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
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
                      <div className="px-5 pb-5 text-xs sm:text-sm text-[#A8A29E] leading-relaxed border-t border-[#2A2622] pt-3 font-serif">
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
