"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Cube3DNavigatorProps {
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  features: {
    id: string;
    label: string;
    faceName: string;
  }[];
}

// Target 3D rotation angles for each face
const FACE_ROTATIONS = [
  { x: -18, y: 25 },   // 0: Front  (Gateway)
  { x: -18, y: -65 },  // 1: Right  (Skill)
  { x: -80, y: 25 },   // 2: Top    (HITL)
  { x: -18, y: 115 },  // 3: Left   (Q&A)
  { x: 75, y: 25 },    // 4: Bottom (MCP)
  { x: -18, y: 205 },  // 5: Back   (Subagent)
];

function getShortestAngle(current: number, target: number): number {
  const diff = ((target - current + 180) % 360 + 360) % 360 - 180;
  return current + diff;
}

const FACE_NAMES = ["FRONT", "RIGHT", "TOP", "LEFT", "BOTTOM", "BACK"];
const FACE_SHORT = ["GATEWAY", "SKILL", "HITL", "Q&A", "MCP", "SUBAGENT"];
const FACE_CAPABILITIES = [
  "Multi-gateway model routing & OAuth",
  "Hierarchical AGENTS.md rule discovery",
  "Human-in-the-loop bash confirmation",
  "Interactive shell-native clarification",
  "Model Context Protocol integrations",
  "Parallel subagent task delegation",
];

export function Cube3DNavigator({
  activeIndex,
  onSelectIndex,
  features,
}: Cube3DNavigatorProps) {
  const [rotation, setRotation] = useState(() => FACE_ROTATIONS[activeIndex] || FACE_ROTATIONS[0]);

  useEffect(() => {
    const target = FACE_ROTATIONS[activeIndex];
    if (target) {
      setRotation((prev) => ({
        x: getShortestAngle(prev.x, target.x),
        y: getShortestAngle(prev.y, target.y),
      }));
    }
  }, [activeIndex]);

  const cubeSize = 72; // px
  const half = cubeSize / 2; // 36px

  return (
    <div className="flex items-center justify-between gap-4 p-3.5 rounded-[10px] bg-[#18181B] border border-[#27272A] mb-4 shadow-lg select-none">
      {/* 3D Isometric Rotating Cube */}
      <div className="flex items-center gap-5">
        <div
          className="relative w-20 h-20 flex items-center justify-center shrink-0"
          style={{ perspective: "600px" }}
        >
          <div
            className="relative w-[72px] h-[72px]"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              willChange: "transform",
            }}
          >
            {/* Front: Gateway */}
            <div
              onClick={() => onSelectIndex(0)}
              className={cn(
                "absolute inset-0 rounded border flex flex-col items-center justify-center text-[10px] font-mono cursor-pointer transition-all duration-300",
                activeIndex === 0
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] font-bold scale-105"
                  : "bg-[#0D0D0F]/80 text-[#A1A1AA] border-[#27272A] hover:border-white/40"
              )}
              style={{
                transform: `translateZ(${half}px)`,
              }}
            >
              <span>GW</span>
            </div>

            {/* Back: Subagent */}
            <div
              onClick={() => onSelectIndex(5)}
              className={cn(
                "absolute inset-0 rounded border flex flex-col items-center justify-center text-[10px] font-mono cursor-pointer transition-all duration-300",
                activeIndex === 5
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] font-bold scale-105"
                  : "bg-[#0D0D0F]/80 text-[#A1A1AA] border-[#27272A] hover:border-white/40"
              )}
              style={{
                transform: `rotateY(180deg) translateZ(${half}px)`,
              }}
            >
              <span>SUB</span>
            </div>

            {/* Right: Skill */}
            <div
              onClick={() => onSelectIndex(1)}
              className={cn(
                "absolute inset-0 rounded border flex flex-col items-center justify-center text-[10px] font-mono cursor-pointer transition-all duration-300",
                activeIndex === 1
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] font-bold scale-105"
                  : "bg-[#0D0D0F]/80 text-[#A1A1AA] border-[#27272A] hover:border-white/40"
              )}
              style={{
                transform: `rotateY(90deg) translateZ(${half}px)`,
              }}
            >
              <span>SKILL</span>
            </div>

            {/* Left: Q&A */}
            <div
              onClick={() => onSelectIndex(3)}
              className={cn(
                "absolute inset-0 rounded border flex flex-col items-center justify-center text-[10px] font-mono cursor-pointer transition-all duration-300",
                activeIndex === 3
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] font-bold scale-105"
                  : "bg-[#0D0D0F]/80 text-[#A1A1AA] border-[#27272A] hover:border-white/40"
              )}
              style={{
                transform: `rotateY(-90deg) translateZ(${half}px)`,
              }}
            >
              <span>Q&A</span>
            </div>

            {/* Top: HITL */}
            <div
              onClick={() => onSelectIndex(2)}
              className={cn(
                "absolute inset-0 rounded border flex flex-col items-center justify-center text-[10px] font-mono cursor-pointer transition-all duration-300",
                activeIndex === 2
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] font-bold scale-105"
                  : "bg-[#0D0D0F]/80 text-[#A1A1AA] border-[#27272A] hover:border-white/40"
              )}
              style={{
                transform: `rotateX(90deg) translateZ(${half}px)`,
              }}
            >
              <span>HITL</span>
            </div>

            {/* Bottom: MCP */}
            <div
              onClick={() => onSelectIndex(4)}
              className={cn(
                "absolute inset-0 rounded border flex flex-col items-center justify-center text-[10px] font-mono cursor-pointer transition-all duration-300",
                activeIndex === 4
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] font-bold scale-105"
                  : "bg-[#0D0D0F]/80 text-[#A1A1AA] border-[#27272A] hover:border-white/40"
              )}
              style={{
                transform: `rotateX(-90deg) translateZ(${half}px)`,
              }}
            >
              <span>MCP</span>
            </div>
          </div>
        </div>

        {/* Current Face Active Indicator */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white text-black font-semibold">
              FACE {activeIndex + 1}/6 · {FACE_NAMES[activeIndex]}
            </span>
          </div>
          <div className="text-sm font-semibold text-white font-mono tracking-tight">
            {FACE_SHORT[activeIndex]}
          </div>
          <p className="text-[11px] text-[#A1A1AA] font-mono">
            {FACE_CAPABILITIES[activeIndex] || "Core runtime capability"}
          </p>
        </div>
      </div>

      {/* Quick Facet Navigation Chips */}
      <div className="hidden sm:grid grid-cols-3 gap-1.5 shrink-0">
        {features.map((feat, fIdx) => {
          const isCurrent = activeIndex === fIdx;
          return (
            <button
              key={feat.id}
              onClick={() => onSelectIndex(fIdx)}
              className={cn(
                "px-2 py-1 rounded text-[11px] font-mono transition-colors text-center cursor-pointer border",
                isCurrent
                  ? "bg-white text-black border-white font-semibold"
                  : "bg-[#0D0D0F] text-[#A1A1AA] border-[#27272A] hover:text-white hover:border-white/30"
              )}
            >
              {feat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
