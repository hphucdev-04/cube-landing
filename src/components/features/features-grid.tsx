"use client";

import { useState, useRef } from "react";
import {
  RotateCw,
  Wrench,
  Layers,
  Brain,
  Activity,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface HarnessComponent {
  id: string;
  code: string;       // LOOP, TOOL, CONTEXT, MEMORY, BACKGROUND, GUARDRAIL
  name: string;       // Loop, Tool, Context, Memory, Background, Guardrail
  icon: typeof RotateCw;
  capability: string;
  conceptSummary: string;
  highlights: {
    title: string;
    description: string;
  }[];
  specs: string[];
}

export const HARNESS_COMPONENTS: HarnessComponent[] = [
  {
    id: "loop",
    code: "LOOP",
    name: "Loop",
    icon: RotateCw,
    capability: "Iterative Decision Cycle",
    conceptSummary:
      "The central execution runtime. An agent harness runs a continuous loop that observes the environment, plans an action, executes it, and evaluates the result — repeating until the task is done.",
    highlights: [
      {
        title: "Feedback-Driven Self-Correction",
        description: "Reads back errors, test failures, and diagnostics from the environment and adjusts course automatically, instead of guessing blind.",
      },
      {
        title: "Bounded Execution",
        description: "Enforces turn limits and cycle detection so the agent can't loop forever or burn through resources on a stuck task.",
      },
      {
        title: "Live Progress Streaming",
        description: "Surfaces reasoning and actions as they happen, so you can follow along in real time instead of waiting on a black box.",
      },
    ],
    specs: ["Observe-Plan-Act-Evaluate", "Self-Correction", "Cycle Guardrails", "Real-Time Streaming"],
  },
  {
    id: "tool",
    code: "TOOL",
    name: "Tool",
    icon: Wrench,
    capability: "Environment Grounding",
    conceptSummary:
      "Connects model reasoning to the real system it's working in. A harness gives the agent controlled ways to read and change files, run commands, and reach external services.",
    highlights: [
      {
        title: "Precise File Operations",
        description: "Makes targeted, structured edits to files rather than blind rewrites, so changes stay predictable and reviewable.",
      },
      {
        title: "Command Execution",
        description: "Runs shell commands and captures their output, so the agent can build, test, and verify its own work.",
      },
      {
        title: "External Integrations",
        description: "Connects to outside tools and services through standard protocols, extending what the agent can do beyond the local machine.",
      },
    ],
    specs: ["File Editing", "Command Execution", "Protocol Integrations", "Sandboxing"],
  },
  {
    id: "context",
    code: "CONTEXT",
    name: "Context",
    icon: Layers,
    capability: "Attention Management",
    conceptSummary:
      "Curates what the model actually sees. A harness discovers relevant project conventions, pulls in the right guidance for the task at hand, and trims anything that would just waste attention.",
    highlights: [
      {
        title: "Project Convention Discovery",
        description: "Finds and applies house rules and conventions already defined in the project, so output matches how the codebase actually works.",
      },
      {
        title: "Noise Reduction",
        description: "Compresses long logs and repetitive history so the model's attention stays on what matters, not what already happened.",
      },
      {
        title: "Task-Relevant Guidance",
        description: "Brings in the right knowledge for the current file or framework, rather than relying on one-size-fits-all instructions.",
      },
    ],
    specs: ["Convention Discovery", "Context Compression", "Relevant Guidance", "Overflow Prevention"],
  },
  {
    id: "memory",
    code: "MEMORY",
    name: "Memory",
    icon: Brain,
    capability: "Persistent State & Continuity",
    conceptSummary:
      "Gives the agent a memory that survives beyond a single session. A harness retains project context, preferences, and history so you don't start from zero every time.",
    highlights: [
      {
        title: "Durable State",
        description: "Keeps track of what's been done and decided across sessions, not just within one conversation.",
      },
      {
        title: "Session Branching & Resumption",
        description: "Lets you pause, resume, or fork a line of work to try a different approach without losing the original.",
      },
      {
        title: "Local-First Storage",
        description: "Stores session and project state on your own machine by default, keeping history under your control.",
      },
    ],
    specs: ["Durable State", "Session Branching", "Local-First Storage", "Cross-Session Continuity"],
  },
  {
    id: "background",
    code: "BACKGROUND",
    name: "Background",
    icon: Activity,
    capability: "Non-Blocking Task Execution",
    conceptSummary:
      "Runs slow, heavy work off to the side. A harness offloads builds, test suites, and other long tasks into the background so the main conversation never freezes waiting on them.",
    highlights: [
      {
        title: "Detached Long-Running Tasks",
        description: "Kicks off builds, tests, or servers in the background while you keep working or chatting.",
      },
      {
        title: "Automatic Wakeup",
        description: "Picks the conversation back up automatically once a background task finishes or fails, with the full result in hand.",
      },
      {
        title: "Parallel Delegation",
        description: "Splits complex work across multiple sub-tasks running at once, instead of doing everything one step at a time.",
      },
    ],
    specs: ["Non-Blocking Execution", "Task Detachment", "Automatic Wakeup", "Parallel Delegation"],
  },
  {
    id: "guardrail",
    code: "GUARDRAIL",
    name: "Guardrail",
    icon: ShieldCheck,
    capability: "Safety & Human-in-the-Loop",
    conceptSummary:
      "A safety layer that keeps a human in control. A harness flags risky actions, shows exactly what will change, and waits for explicit approval before anything destructive happens.",
    highlights: [
      {
        title: "Approval Before Risk",
        description: "Pauses and asks for confirmation before running commands or changes that could cause real damage.",
      },
      {
        title: "Transparent Diffs",
        description: "Shows exactly what will change, line by line, before any edit is committed.",
      },
      {
        title: "Hazard Detection",
        description: "Watches for dangerous patterns — like exposing secrets or irreversible commands — and steps in before they run.",
      },
    ],
    specs: ["Human Confirmation", "Diff Previews", "Hazard Detection", "Safe Rollback"],
  },
];

// Target 3D rotation angles for each face
const FACE_ROTATIONS = [
  { x: -18, y: 25 },   // 0: Front  (Loop)
  { x: -18, y: -65 },  // 1: Right  (Tool)
  { x: -80, y: 25 },   // 2: Top    (Context)
  { x: -18, y: 115 },  // 3: Left   (Memory)
  { x: 75, y: 25 },    // 4: Bottom (Background)
  { x: -18, y: 205 },  // 5: Back   (Guardrail)
];

function getShortestAngle(current: number, target: number): number {
  const diff = ((target - current + 180) % 360 + 360) % 360 - 180;
  return current + diff;
}

export function FeaturesGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [rotation, setRotation] = useState({ x: -18, y: 25 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const dragDistance = useRef(0);
  const baseRotation = useRef({ x: -18, y: 25 });

  const activeComponent = HARNESS_COMPONENTS[activeIndex];
  const ActiveIcon = activeComponent.icon;

  const cubeSize = 170; // px
  const half = cubeSize / 2; // 85px

  const rotateToFace = (index: number) => {
    const target = FACE_ROTATIONS[index];
    setRotation((prev) => ({
      x: getShortestAngle(prev.x, target.x),
      y: getShortestAngle(prev.y, target.y),
    }));
  };

  const handleFaceClick = (index: number) => {
    if (dragDistance.current > 6) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    rotateToFace(index);
  };

  const handlePrev = () => {
    setDirection(-1);
    const prevIndex = (activeIndex - 1 + HARNESS_COMPONENTS.length) % HARNESS_COMPONENTS.length;
    setActiveIndex(prevIndex);
    rotateToFace(prevIndex);
  };

  const handleNext = () => {
    setDirection(1);
    const nextIndex = (activeIndex + 1) % HARNESS_COMPONENTS.length;
    setActiveIndex(nextIndex);
    rotateToFace(nextIndex);
  };

  // Mouse drag handlers for free 3D rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    dragDistance.current = 0;
    baseRotation.current = { ...rotation };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    dragDistance.current = Math.sqrt(dx * dx + dy * dy);

    setRotation({
      x: Math.max(-85, Math.min(85, baseRotation.current.x - dy * 0.45)),
      y: baseRotation.current.y + dx * 0.45,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    dragDistance.current = 0;
    baseRotation.current = { ...rotation };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStart.current.x;
    const dy = e.touches[0].clientY - dragStart.current.y;
    dragDistance.current = Math.sqrt(dx * dx + dy * dy);

    setRotation({
      x: Math.max(-85, Math.min(85, baseRotation.current.x - dy * 0.45)),
      y: baseRotation.current.y + dx * 0.45,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const faces = [
    {
      idx: 0,
      name: "LOOP",
      component: HARNESS_COMPONENTS[0],
      transform: `translateZ(${half}px)`,
    },
    {
      idx: 1,
      name: "TOOL",
      component: HARNESS_COMPONENTS[1],
      transform: `rotateY(90deg) translateZ(${half}px)`,
    },
    {
      idx: 2,
      name: "CONTEXT",
      component: HARNESS_COMPONENTS[2],
      transform: `rotateX(90deg) translateZ(${half}px)`,
    },
    {
      idx: 3,
      name: "MEMORY",
      component: HARNESS_COMPONENTS[3],
      transform: `rotateY(-90deg) translateZ(${half}px)`,
    },
    {
      idx: 4,
      name: "BACKGROUND",
      component: HARNESS_COMPONENTS[4],
      transform: `rotateX(-90deg) translateZ(${half}px)`,
    },
    {
      idx: 5,
      name: "GUARDRAIL",
      component: HARNESS_COMPONENTS[5],
      transform: `rotateY(180deg) translateZ(${half}px)`,
    },
  ];

  return (
    <section
      id="harness"
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#27272A] bg-transparent overflow-hidden"
    >
      <span id="agent" className="sr-only" />
      <div className="relative max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-6 lg:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#27272A] bg-[#18181B] text-[#A1A1AA] mb-3 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>STANDARDIZED AGENT HARNESS SPECIFICATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white mb-2 font-sans sm:whitespace-nowrap">
            The 6 Pillars of the Agent Harness
          </h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-2xl mx-auto font-normal leading-relaxed">
            The operational runtime scaffolding that elevates raw intelligence into an autonomous software engineer.
          </p>
        </div>

        {/* 2-Column Interactive Harness Showcase: Free-Floating 3D Cube (Left) + Detail Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Direct Clickable Free-Floating 3D Cube (No Card Wrapper, No Chevrons) */}
          <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={cn(
              "lg:col-span-5 relative w-full h-[280px] sm:h-[320px] flex items-center justify-center select-none",
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
          >
            {/* Luminous ambient radial gradient behind the floating cube */}
            <div
              className="absolute inset-0 pointer-events-none m-auto"
              style={{
                width: "250px",
                height: "250px",
                background: "radial-gradient(circle at center, rgba(255,255,255,0.06) 0%, transparent 65%)",
              }}
            />

            {/* 3D Cube Container */}
            <div
              className="relative flex items-center justify-center"
              style={{ perspective: "1000px" }}
            >
              <div
                className="relative"
                style={{
                  width: `${cubeSize}px`,
                  height: `${cubeSize}px`,
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transition: isDragging ? "none" : "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                  willChange: "transform",
                }}
              >
                  {/* 6 Clickable Faces of the Cube */}
                  {faces.map((face) => {
                    const isSelected = activeIndex === face.idx;
                    const Icon = face.component.icon;

                    return (
                      <div
                        key={face.idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFaceClick(face.idx);
                        }}
                        className={cn(
                          "absolute inset-0 rounded-2xl flex flex-col items-center justify-between p-4 select-none cursor-pointer transition-all duration-300",
                          isSelected
                            ? "border-2 border-white shadow-[0_0_28px_rgba(255,255,255,0.45),inset_0_0_15px_rgba(255,255,255,0.06)] bg-[#18181B] text-white z-20"
                            : "border border-[#27272A] bg-[#101012]/95 text-[#A1A1AA] hover:border-white/50 hover:text-white hover:bg-[#18181B] z-10"
                        )}
                        style={{
                          transform: face.transform,
                          transformStyle: "preserve-3d",
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                        }}
                      >
                        <div className="w-full flex items-center justify-between">
                          <div
                            className={cn(
                              "w-7 h-7 rounded-lg flex items-center justify-center border transition-colors",
                              isSelected
                                ? "bg-white text-black border-white shadow-sm"
                                : "bg-[#09090B] border-[#27272A] text-white"
                            )}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span
                            className={cn(
                              "text-[9px] font-mono px-1.5 py-0.5 rounded border transition-colors",
                              isSelected
                                ? "border-white/40 bg-white/10 text-white font-semibold"
                                : "border-white/10 bg-white/5 text-[#A1A1AA]"
                            )}
                          >
                            0{face.idx + 1}
                          </span>
                        </div>

                        <div className="text-center my-auto">
                          <div className={cn(
                            "text-sm font-bold font-mono tracking-wider transition-colors",
                            isSelected ? "text-white" : "text-[#D4D4D8]"
                          )}>
                            {face.name}
                          </div>
                          <div
                            className={cn(
                              "text-[10px] font-mono mt-0.5 line-clamp-1 transition-colors",
                              isSelected ? "text-[#D4D4D8]" : "text-[#71717A]"
                            )}
                          >
                            {face.component.name}
                          </div>
                        </div>

                        <div
                          className={cn(
                            "w-full pt-1.5 border-t text-[9px] font-mono flex items-center justify-between transition-colors",
                            isSelected
                              ? "border-white/20 text-[#A1A1AA]"
                              : "border-[#27272A]/70 text-[#71717A]"
                          )}
                        >
                          <span>COMPONENT</span>
                          <span className={isSelected ? "font-bold text-white" : "text-[#71717A]"}>
                            {isSelected ? "ACTIVE" : "STANDBY"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          {/* Right Column: Dynamic Detail Card (Fits 100vh screen perfectly) */}
          <div className="lg:col-span-7 rounded-2xl border border-[#27272A] bg-[#18181B] p-5 sm:p-6 shadow-2xl relative overflow-hidden">
            {/* Card Top Bar */}
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3.5 mb-3.5">
              <div className="flex-1 overflow-hidden pr-2">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -direction * 12 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shadow-md shrink-0">
                      <ActiveIcon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-mono font-semibold tracking-wider text-white block">
                        {`Pillar 0${activeIndex + 1} · ${activeComponent.code}`}
                      </span>
                      <div className="text-[11px] font-mono text-[#A1A1AA] truncate">
                        {activeComponent.capability}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous component"
                  className="w-7 h-7 rounded-lg border border-[#27272A] bg-[#09090B] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] hover:bg-[#18181B] active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="text-xs font-mono text-[#A1A1AA] min-w-[48px] h-6 flex items-center justify-center overflow-hidden select-none font-medium">
                  <AnimatePresence mode="wait" custom={direction} initial={false}>
                    <motion.span
                      key={activeIndex}
                      custom={direction}
                      initial={{ opacity: 0, y: direction * 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -direction * 6 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                    >
                      {`0${activeIndex + 1} / 06`}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next component"
                  className="w-7 h-7 rounded-lg border border-[#27272A] bg-[#09090B] text-[#A1A1AA] hover:text-white hover:border-[#3F3F46] hover:bg-[#18181B] active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title, Concept & Technical Highlights with Smooth Slide Animation */}
            <div className="relative min-h-[250px] sm:min-h-[240px]">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 16 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Title & Concept */}
                  <div className="mb-3">
                    <h3 className="text-xl font-semibold text-white tracking-tight font-sans mb-1">
                      {activeComponent.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D4D4D8] leading-relaxed">
                      {activeComponent.conceptSummary}
                    </p>
                  </div>

                  {/* 3 Technical Highlights */}
                  <div className="space-y-2 mb-3.5">
                    {activeComponent.highlights.map((h) => (
                      <div
                        key={h.title}
                        className="p-2.5 rounded-xl border border-[#27272A]/80 bg-[#101012]/70 flex items-start gap-2.5"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
                        <div className="text-xs leading-relaxed">
                          <span className="font-semibold text-white mr-1.5">{h.title}:</span>
                          <span className="text-[#A1A1AA]">{h.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Technical Specification Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#27272A]/70">
                    {activeComponent.specs.map((spec) => (
                      <span
                        key={spec}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md border border-[#27272A] bg-[#09090B] text-[#D4D4D8]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
