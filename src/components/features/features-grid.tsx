"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  RotateCw,
  Wrench,
  Layers,
  Brain,
  Activity,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";

interface HarnessBay {
  id: string;
  roman: string;
  code: string;
  name: string;
  archType: string;
  icon: typeof RotateCw;
  capability: string;
  bgAsset: string;
  bgFocus: string;
  conceptSummary: string;
  specs: string[];
}

const HARNESS_BAYS: HarnessBay[] = [
  {
    id: "loop",
    roman: "01 // AGENT LOOP",
    code: "01",
    name: "The Agent Loop",
    archType: "Core Reasoning & Execution Cycle",
    icon: RotateCw,
    capability: "Autonomous Observe → Plan → Act",
    bgAsset: "/assets/ascii-magic-6.png",
    bgFocus: "object-center",
    conceptSummary:
      "The perpetual cycle at the heart of Cube: observe the terminal environment, plan tool calls, execute actions on filesystem and shell, inspect feedback — then recurse until the task reaches verified correctness.",
    specs: ["Observe-Plan-Act", "AST Feedback", "Cycle Detection", "Live Reasoning"],
  },
  {
    id: "context",
    roman: "02 // CONTEXT",
    code: "02",
    name: "Context Management",
    archType: "Attention Budget & Rule Ingestion",
    icon: Layers,
    capability: "AGENTS.md Discovery & Context Compaction",
    bgAsset: "/assets/ascii-magic-4.png",
    bgFocus: "object-center",
    conceptSummary:
      "Crawls parent folders to automatically discover AGENTS.md rules, repository conventions, and custom skills. Surgical token pruning and compaction preserve attention budget across massive monorepos.",
    specs: ["AGENTS.md Discovery", "Tree Traversal", "Token Pruning", "Monorepo Scoping"],
  },
  {
    id: "tools",
    roman: "03 // TOOLS & SANDBOX",
    code: "03",
    name: "Tools & Sandboxed Execution",
    archType: "Sandboxed IO & Shell Engine",
    icon: Wrench,
    capability: "Surgical Disk & Shell Process Isolation",
    bgAsset: "/assets/ascii-magic-5.png",
    bgFocus: "object-center",
    conceptSummary:
      "Connects model reasoning to real filesystem mutations and shell commands. Surgical line-targeted diffs replace full-file overwrites, while process sandboxing enforces strict execution boundaries and timeout gates.",
    specs: ["Line Diffs", "Process Sandboxing", "Mastra SDK", "Timeout Gates"],
  },
  {
    id: "memory",
    roman: "04 // STATE & MEMORY",
    code: "04",
    name: "State & Memory System",
    archType: "SQLite Local State & Memory",
    icon: Brain,
    capability: "Cross-Turn State & Local Continuity",
    bgAsset: "/assets/ascii-magic-3.png",
    bgFocus: "object-center",
    conceptSummary:
      "Retains engineering decisions, repository conventions, and session state locally across turns and restarts. Fork or resume any conversation thread with full AST and file change continuity — no cloud dependency.",
    specs: ["Local SQLite State", "Session Forking", "Zero Cloud Storage", "Continuity"],
  },
  {
    id: "guardrails",
    roman: "05 // GUARDRAILS & SAFETY",
    code: "05",
    name: "Guardrails, Safety & HITL",
    archType: "Diff Engine & Verification Gates",
    icon: ShieldCheck,
    capability: "Explicit Confirmation & Reversible Diffs",
    bgAsset: "/assets/ascii-magic-1.png",
    bgFocus: "object-top",
    conceptSummary:
      "Prevents destructive actions. Colorized unified diffs show exactly what lines change before any write occurs. Manual confirmation gates guard disk deletions, migrations, and git resets.",
    specs: ["Unified Color Diff", "Human Confirmation", "Atomic Commit", "Rollback Snapshots"],
  },
  {
    id: "orchestration",
    roman: "06 // ORCHESTRATION",
    code: "06",
    name: "Orchestration & Delegation",
    archType: "Parallel Subagent Dispatcher",
    icon: Activity,
    capability: "Concurrent Subtasks & Workers",
    bgAsset: "/assets/ascii-magic-2.png",
    bgFocus: "object-center",
    conceptSummary:
      "Spawns long-running builds, test suites, and subagents in the background so the primary CLI loop remains responsive. Independent sub-problems run concurrently in isolated sandboxes.",
    specs: ["Subagent Orchestration", "Async Workers", "Non-Blocking TUI", "Status Signals"],
  },
];

/** A single full-screen subsystem card.
 *  Uses sticky stacking cards: each card pins at top-0, and subsequent cards
 *  slide up from below and overlay over the previous card, while the card underneath
 *  recedes subtly in scale and darkness.
 */
function SubsystemCard({
  bay,
  index,
  total,
}: {
  bay: HarnessBay;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = bay.icon;
  const isEven = index % 2 === 0;
  const isLast = index === total - 1;

  // Track scroll while this chamber is active at top of viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // When next chamber slides over:
  // scale down subtly (1 -> 0.94) and fade in dark shadow veil (0 -> 0.55)
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.94]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : 0.55]);

  return (
    <div
      ref={ref}
      style={{ zIndex: 10 + index }}
      className={cn(
        "sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[#0A0908]",
        index > 0 && "border-t border-[#3E3833]/80 shadow-[0_-30px_70px_rgba(0,0,0,0.98),0_-10px_25px_rgba(0,0,0,0.85)]"
      )}
      aria-label={`${bay.roman}: ${bay.name}`}
    >
      {/* Top hairline highlight for incoming architectural card */}
      {index > 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#78716C]/60 to-transparent z-20"
        />
      )}

      {/* Receding depth wrapper (scales down as card underneath) */}
      <motion.div
        style={{ scale }}
        className="relative w-full h-full flex items-center origin-top will-change-transform"
      >
        {/* ── FULL-BLEED PIRANESI BACKDROP ────────────────────────────
            The artwork IS the architectural space. Not an image in a box.
            ──────────────────────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 select-none"
        >
          <Image
            src={bay.bgAsset}
            alt=""
            fill
            sizes="100vw"
            priority={index === 0}
            className={`object-cover contrast-[1.15] brightness-[0.6] ${bay.bgFocus}`}
          />
          {/* Chiaroscuro: heavy stone shadow on inscription side, open view on the far side */}
          {isEven ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0908]/96 via-[#0A0908]/55 to-[#0A0908]/15" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A0908]/65 via-transparent to-[#0A0908]/80" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-l from-[#0A0908]/96 via-[#0A0908]/55 to-[#0A0908]/15" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A0908]/65 via-transparent to-[#0A0908]/80" />
            </>
          )}
        </div>

        {/* ── DATUM LINES — stone mortar hairlines, no cyan ──────── */}
        <div aria-hidden="true" className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute left-0 right-0 h-px bg-[#3E3833]/25" style={{ top: "33%" }} />
          <div className="absolute left-0 right-0 h-px bg-[#2A2622]/30" style={{ top: "66%" }} />
          <div
            className="absolute top-0 bottom-0 w-px bg-[#3E3833]/20"
            style={{ left: isEven ? "55%" : "45%" }}
          />
        </div>

        {/* ── CONTENT: INSCRIPTION ON STONE ───────────────────────── */}
        <div
          className={`relative z-10 w-full flex ${isEven ? "justify-start" : "justify-end"} px-6 sm:px-12 md:px-20 lg:px-28`}
        >
          <div className={`max-w-[min(42rem,52vw)] w-full ${isEven ? "" : "text-right"}`}>

            {/* Giant dim stone ordinal — Piranesi scale, limestone tone */}
            <div
              aria-hidden="true"
              className="font-cinzel font-bold text-[#F5F5F4]/[0.05] leading-none select-none mb-0 -mt-4"
              style={{ fontSize: "clamp(7rem,18vw,14rem)" }}
            >
              {bay.code}
            </div>

            {/* Pier label — carved above the numeral */}
            <div className={`-mt-[3rem] sm:-mt-[4rem] lg:-mt-[5.5rem] relative z-10 ${isEven ? "" : "flex flex-col items-end"}`}>

              {/* Roman label + arch type */}
              <div className={`flex items-center gap-3 mb-3 ${isEven ? "" : "flex-row-reverse"}`}>
                <div className="flex items-center justify-center w-7 h-7 border border-[#3E3833] bg-[#0A0908]/70 backdrop-blur-sm">
                  <Icon className="w-3.5 h-3.5 text-[#A8A29E]" />
                </div>
                <div>
                  <span className="font-cinzel text-[11px] font-bold text-[#D6D3D1] tracking-[0.2em]">
                    {bay.roman}
                  </span>
                  <span className="font-mono text-[10px] text-[#3E3833] ml-2">
                    {bay.archType}
                  </span>
                </div>
              </div>

              {/* Name — monumental limestone inscription */}
              <h3
                className="font-sans font-semibold text-[#F5F5F4] leading-[1.05] mb-3"
                style={{ fontSize: "clamp(1.6rem,3.8vw,3rem)" }}
              >
                {bay.name}
              </h3>

              {/* Capability — surveyor's note in mono, muted stone */}
              <div className={`font-mono text-[11px] text-[#78716C] mb-4 tracking-wide ${isEven ? "" : "text-right"}`}>
                ├── {bay.capability}
              </div>

              {/* Summary — etched parchment text */}
              <p className={`text-[#A8A29E] font-serif leading-relaxed mb-5 text-sm sm:text-[0.95rem] ${isEven ? "" : "text-right"}`}>
                {bay.conceptSummary}
              </p>

              {/* Spec tags — stone-tone mortar borders, no cyan */}
              <div className={`flex flex-wrap gap-1.5 ${isEven ? "" : "justify-end"}`}>
                {bay.specs.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-mono px-2 py-0.5 border border-[#3E3833]/60 text-[#78716C] bg-[#0A0908]/60 backdrop-blur-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── SUBSYSTEM INDEX CALIPER — clear of left sidebar (w-16 = 64px) ── */}
        <div
          aria-hidden="true"
          className="absolute bottom-4 left-6 sm:left-10 md:left-20 lg:left-24 z-10 font-mono text-[10px] text-[#3E3833] flex items-center gap-2"
        >
          <span className="w-4 h-px bg-[#3E3833]/60" />
          <span>SUBSYSTEM 0{index + 1} // 06</span>
          <span className="w-4 h-px bg-[#3E3833]/60" />
        </div>

        {/* ── SCROLL CUE — clear of right sidebar (w-16 = 64px) ──── */}
        {index < total - 1 && (
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-5 right-6 sm:right-10 md:right-20 lg:right-24 z-10 flex flex-col items-center gap-1 pointer-events-none"
          >
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#78716C]">NEXT SUBSYSTEM</span>
            <div className="w-px h-5 bg-gradient-to-b from-[#78716C]/40 to-transparent" />
          </motion.div>
        )}

        {/* Subterranean darkness veil: recedes into shadow as next card slides on top */}
        <motion.div
          style={{ opacity: veilOpacity }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 bg-[#0A0908]"
        />
      </motion.div>
    </div>
  );
}

export function FeaturesGrid() {
  return (
    <section id="harness" className="relative w-full bg-[#0A0908]">

      {/* ── SECTION HEADER — entablature frieze ─────────────────── */}
      <div className="relative w-full border-t border-b border-[#2A2622] bg-[#0A0908] px-6 sm:px-12 md:px-20 py-10 overflow-hidden">
        {/* Etching crosshatch */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,rgba(255,255,255,0.015) 0px,rgba(255,255,255,0.015) 1px,transparent 1px,transparent 9px),repeating-linear-gradient(-45deg,rgba(255,255,255,0.015) 0px,rgba(255,255,255,0.015) 1px,transparent 1px,transparent 9px)",
          }}
        />

        <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-7xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141210] border border-[#2A2622] text-xs font-mono mb-4">
              {/* #38BDF8 only for the active-indicator dot — product accent */}
              <span className="w-1.5 h-1.5 bg-[#38BDF8]" />
              <span className="font-cinzel tracking-wider text-[#F5F5F4]">
                SYSTEM HARNESS // 6 RUNTIME PILLARS
              </span>
            </div>
            <h2
              className="font-sans font-semibold tracking-tight text-[#F5F5F4] leading-[1.06]"
              style={{ fontSize: "clamp(1.8rem,4.5vw,3.5rem)" }}
            >
              The Harness Engineering
            </h2>
            <p className="mt-2 text-sm text-[#A8A29E] max-w-2xl font-serif">
              Six runtime subsystems engineered to give the agent surgical precision across large production codebases.
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-end gap-1">
            <div className="text-xs font-mono text-[#A8A29E]">6 // RUNTIME SUBSYSTEMS</div>
            <div className="text-[10px] font-mono text-[#3E3833]">AUTONOMOUS AGENT HARNESS</div>
          </div>
        </div>
      </div>

      {/* ── 6 FULL-SCREEN SUBSYSTEM CARDS (STACKING DECK) ─────────── */}
      <div className="relative">
        {HARNESS_BAYS.map((bay, index) => (
          <SubsystemCard
            key={bay.id}
            bay={bay}
            index={index}
            total={HARNESS_BAYS.length}
          />
        ))}
      </div>

      {/* ── SECTION FOOTER — epigraph ────────────────────────────── */}
      <div className="relative z-20 border-t border-[#2A2622] bg-[#0A0908] px-6 sm:px-12 md:px-20 py-10 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,rgba(255,255,255,0.015) 0px,rgba(255,255,255,0.015) 1px,transparent 1px,transparent 9px),repeating-linear-gradient(-45deg,rgba(255,255,255,0.015) 0px,rgba(255,255,255,0.015) 1px,transparent 1px,transparent 9px)",
          }}
        />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5 max-w-7xl">
          <p className="text-sm text-[#A8A29E] font-serif leading-relaxed max-w-2xl">
            Production codebases are complex networks of interdependent modules, tests, and legacy dependencies.
            Cube applies deterministic AST traversal, local state continuity, and atomic transactions to
            safely inspect and mutate code without collateral regression.
          </p>
          <a
            href="#demo"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 border border-[#3E3833] hover:border-[#78716C] text-xs font-mono text-[#A8A29E] hover:text-[#F5F5F4] transition-colors"
          >
            <span>See Live Terminal Demos</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
