"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    "question": "How does the installer work?",
    "answer": "Run the PowerShell installer on Windows x64, or the shell installer on macOS arm64/x64 and Linux/WSL x64. It downloads a Cube package with a bundled Node.js runtime and verifies its SHA-256 checksum. No separate Node.js installation is needed. On macOS and Linux, you may need to add ~/.local/bin to PATH."
  },
  {
    "question": "Which accounts and model gateways can I connect?",
    "answer": "Use /gateway to choose OAuth for Anthropic, OpenAI, xAI, or Google, an API key from one of 15 supported providers, or local Ollama/LM Studio. Then use /model to select a model. Available models, account eligibility, usage limits, and billing depend on the provider."
  },
  {
    "question": "Where are my data stored and where do prompts go?",
    "answer": "Cube stores conversation history and memory in local SQLite under ~/.cube/memories, and credentials in ~/.cube/auth.json. Model requests go to your selected provider or local server. Connected MCP servers and network tools can receive data when used. Retention and training policies depend on those services; local storage does not imply zero data retention by a provider."
  },
  {
    "question": "Can I use local models without cloud inference?",
    "answer": "Yes. Start Ollama or LM Studio with a downloaded model, run /gateway, select local/ollama or local/lmstudio, then choose a model with /model. Inference uses the configured local server. Installation, update checks, web tools, remote MCP servers, and cloud-backed memory features may still use the network."
  },
  {
    "question": "How does Cube discover project context and rules?",
    "answer": "Launch cube in the directory you want to use as the workspace. Cube loads AGENTS.md there and in .agents, .cube, .claude, and .codex, plus global instructions from ~/.cube/AGENTS.md. It discovers scoped AGENTS.md files as tools explore workspace paths. Manage skills with /skills and refresh instructions and MCP configuration with /reload."
  },
  {
    "question": "How do tool permissions and updates work?",
    "answer": "Cube asks for workspace trust on first use. File edits, writes, patches, and shell commands require approval by default; /permissions lets you configure allow, ask, or deny rules, including MCP tools. Installed builds check for updates at startup and offer a verified download and restart. Re-running the installer also updates Cube while preserving ~/.cube data."
  }
];

export function FaqAccordion() {
  const reducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      style={{ zIndex: 30 }}
      className="relative min-h-[70svh] w-full flex flex-col justify-center border-t border-[#3E3833]/80 bg-[#0A0908] overflow-hidden px-6 sm:px-12 md:px-20 lg:px-24 py-24 lg:py-28 shadow-[0_-30px_70px_rgba(0,0,0,0.98),0_-10px_25px_rgba(0,0,0,0.85)]"
    >
      {/* Top hairline highlight for incoming architectural card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#78716C]/60 to-transparent z-30"
      />

      {/* Receding depth wrapper: scales down as Footer slides over */}
      <div
        className="relative w-full flex flex-col justify-center"
      >

      {/* ── AUTHENTIC PIRANESI ARCHITECTURAL DRAFTING BACKGROUND (CODE-ONLY) ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        {/* Ambient technical cyan glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(56,189,248,0.04),transparent_75%)]" />

        {/* Fine Acid Crosshatch Etching Texture (Microscopic 45°/-45° crosshatch per DESIGN.md .etching-bg) */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.032) 0px, rgba(255, 255, 255, 0.032) 1px, transparent 1px, transparent 7px), repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.032) 0px, rgba(255, 255, 255, 0.032) 1px, transparent 1px, transparent 7px)",
          }}
        />

        {/* Architectural Surveyor Blueprint Grid with Crosshairs (Pure SVG, 0 image assets) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="faqArchitectGrid" width="64" height="64" patternUnits="userSpaceOnUse">
              {/* Subtle grid lines */}
              <path
                d="M 64 0 L 0 0 0 64"
                fill="none"
                stroke="#3E3833"
                strokeWidth="0.5"
                strokeDasharray="2 4"
                opacity="0.45"
              />
              {/* Surveyor crosshair at intersection (┼) */}
              <path
                d="M -3 0 L 3 0 M 0 -3 L 0 3"
                stroke="#78716C"
                strokeWidth="0.75"
                opacity="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#faqArchitectGrid)" />
        </svg>

        {/* Edge Chiaroscuro Transitions: softens into stone floor and ceiling */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0A0908] via-[#0A0908]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A0908] via-[#0A0908]/70 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-mono border border-[#2A2622] bg-[#141210]/90 mb-3 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-[#38BDF8]" />
            <span className="font-cinzel text-[#F5F5F4] tracking-wider">
              DOCUMENTATION &amp; FAQ
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#F5F5F4] mb-2 font-sans">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#A8A29E] font-serif max-w-xl mx-auto">
            Installation, model gateways, local data, permissions, and updates.
          </p>
        </div>

        {/* Accordion List — 2 columns on desktop to fit screen height perfectly */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  "border transition-colors overflow-hidden",
                  isOpen
                    ? "border-[#3E3833] bg-[#0D0C0A]"
                    : "border-[#2A2622] bg-[#0A0908]/90 hover:border-[#3E3833]"
                )}
              >
                <button
                  id={`faq-question-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => toggle(index)}
                  className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-medium text-[#F5F5F4] leading-snug">
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
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: reducedMotion ? 0 : 0.24, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: reducedMotion ? 0 : 0.18, delay: reducedMotion ? 0 : 0.04 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: reducedMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: reducedMotion ? 0 : 0.12 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-4 text-sm text-[#D6D3D1] leading-relaxed border-t border-[#2A2622] pt-3 font-serif">
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
      </div>

    </section>
  );
}
