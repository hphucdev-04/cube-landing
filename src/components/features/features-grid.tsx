"use client";

import { useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { CubeHarness3D, HARNESS_FACES } from "./cube-harness-3d";

export function FeaturesGrid() {
  const [activeFaceIndex, setActiveFaceIndex] = useState(0);

  return (
    <section id="agent" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-[#27272A] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#27272A] bg-[#18181B] text-[#A1A1AA] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>CORE ARCHITECTURE // 6-FACE AGENT HARNESS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-5 font-sans">
            The 6 Faces of the Cube Harness.
          </h2>
          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
            Mỗi mặt của khối Cube đại diện cho một phân hệ trọng yếu trong kiến trúc Agent Harness:{" "}
            <span className="text-white font-medium">Model, Loop, Tool, Context, Memory và Guardrail</span>.
            Khối hình học vững chắc hợp nhất 6 mảnh ghép thành một tác tử lập trình tự trị đáng tin cậy.
          </p>
        </div>

        {/* 3D Exploded Cube Interactive Visual Stage */}
        <div className="mb-14">
          <CubeHarness3D
            activeFaceIndex={activeFaceIndex}
            onSelectFace={(index) => setActiveFaceIndex(index)}
          />
        </div>

        {/* 6 Harness Cards Grid: Model, Loop, Tool, Context, Memory, Guardrail */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {HARNESS_FACES.map((face, index) => {
            const Icon = face.icon;
            const isActive = activeFaceIndex === index;

            return (
              <div
                key={face.id}
                id={face.id}
                onClick={() => setActiveFaceIndex(index)}
                className={cn(
                  "group relative rounded-xl border p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer",
                  isActive
                    ? "bg-[#18181B] border-white shadow-[0_0_30px_rgba(255,255,255,0.08)] ring-1 ring-white/30"
                    : "bg-[#18181B]/80 border-[#27272A] hover:border-white/30 hover:bg-[#18181B]"
                )}
              >
                <div>
                  {/* Top Bar: Icon + Face Tag & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={cn(
                        "w-11 h-11 rounded-lg border flex items-center justify-center transition-colors",
                        isActive
                          ? "bg-white text-black border-white shadow-md"
                          : "bg-[#050505] border-[#27272A] text-white group-hover:border-white/40"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#27272A] bg-[#050505] text-[#A1A1AA]">
                        FACE {face.index} · {face.faceName}
                      </span>
                    </div>
                  </div>

                  {/* Role & Title */}
                  <div className="mb-3">
                    <div className="text-[11px] font-mono text-[#A1A1AA] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span>{face.role}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-ping" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-white font-sans tracking-tight">
                      {face.title}
                    </h3>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-[#A1A1AA] leading-relaxed mb-5">
                    {face.summary}
                  </p>
                </div>

                <div>
                  {/* Tech Specs Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-4 mb-4 border-t border-[#27272A]/70">
                    {face.specs.map((spec) => (
                      <span
                        key={spec}
                        className={cn(
                          "text-[10px] font-mono px-2 py-0.5 rounded border transition-colors",
                          isActive
                            ? "bg-[#050505] text-white border-white/20"
                            : "bg-[#050505]/70 text-[#A1A1AA] border-[#27272A]"
                        )}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Inspection Link */}
                  <div
                    className={cn(
                      "flex items-center justify-between text-xs font-mono pt-3 border-t border-[#27272A]/50 transition-colors",
                      isActive
                        ? "text-white font-semibold"
                        : "text-[#A1A1AA]/70 group-hover:text-white"
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      {isActive ? (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-white" />
                          <span>Mặt đang chọn trên 3D Cube</span>
                        </>
                      ) : (
                        <span>Chọn mặt [{face.index}] trên 3D</span>
                      )}
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "w-4 h-4 transition-transform",
                        isActive
                          ? "translate-x-0.5 -translate-y-0.5 text-white"
                          : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      )}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
