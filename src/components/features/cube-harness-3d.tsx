"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Cpu,
  RotateCw,
  Wrench,
  Layers,
  Database,
  ShieldCheck,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Rotate3d,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface HarnessFaceData {
  id: string;
  faceName: string;
  axis: string;
  index: string;
  title: string;
  role: string;
  badge: string;
  icon: typeof Cpu;
  summary: string;
  specs: string[];
  rotation: { x: number; y: number };
}

export const HARNESS_FACES: HarnessFaceData[] = [
  {
    id: "model",
    faceName: "FRONT",
    axis: "+Z",
    index: "01",
    title: "Model Gateway",
    role: "Inference & Provider Router",
    badge: "Multi-Provider OAuth",
    icon: Cpu,
    summary:
      "Tầng điều phối suy luận thông minh. Trực tiếp kết nối Claude Pro, ChatGPT Plus, Grok qua PKCE OAuth trình duyệt, hỗ trợ mọi API key của nhà phát triển, và chạy 100% offline với Ollama & LM Studio không qua trung gian token.",
    specs: ["OAuth 2.0 PKCE", "Ollama / LM Studio", "Streaming SSE", "Zero Token Markup"],
    rotation: { x: -12, y: 15 },
  },
  {
    id: "loop",
    faceName: "TOP",
    axis: "+Y",
    index: "02",
    title: "Execution Loop",
    role: "Deterministic ReAct Cycle",
    badge: "Mastra Core",
    icon: RotateCw,
    summary:
      "Trục động cơ điều phối vòng lặp tác tử tự trị: Nhận thức (Perceive) → Lập kế hoạch (Plan) → Thực thi công cụ (Act) → Quan sát kết quả (Inspect) → Tự sửa sai (Reflect). Tự vượt qua lỗi compiler và hoàn thành tác vụ phức tạp.",
    specs: ["Deterministic ReAct", "Compiler Error Recovery", "Step Budgeting", "State Recovery"],
    rotation: { x: -65, y: 25 },
  },
  {
    id: "tool",
    faceName: "RIGHT",
    axis: "+X",
    index: "03",
    title: "Workspace Tools",
    role: "Filesystem & Terminal Engine",
    badge: "Sandboxed FS",
    icon: Wrench,
    summary:
      "Bộ công cụ thao tác trực tiếp trên workspace: Tìm kiếm regex tốc độ cao qua grep, đọc/ghi file chính xác, áp dụng diff AST thông minh, và thực thi các câu lệnh bash/terminal với sandbox giới hạn phạm vi thư mục dự án.",
    specs: ["AST Code Patching", "Workspace Grep & Tree", "Sandboxed Bash Exec", "Exit Code Inspection"],
    rotation: { x: -12, y: -75 },
  },
  {
    id: "context",
    faceName: "LEFT",
    axis: "-X",
    index: "04",
    title: "Context Discovery",
    role: "Hierarchical Rule Ingestion",
    badge: "AGENTS.md Scanner",
    icon: Layers,
    summary:
      "Cơ chế tự động phát hiện và tổng hợp ngữ cảnh dự án. Cube tự động duyệt cây thư mục từ vị trí hiện tại ngược lên root để thu thập các file quy ước AGENTS.md, .agents, .cube và nạp vào system prompt một cách chọn lọc, tránh phình token.",
    specs: ["Hierarchical Walk", "AGENTS.md Discovery", "Token Deduplication", "Project Root Sensing"],
    rotation: { x: -12, y: 105 },
  },
  {
    id: "memory",
    faceName: "BOTTOM",
    axis: "-Y",
    index: "05",
    title: "Memory & State",
    role: "Embedded LibSQL SQLite",
    badge: "100% Local DB",
    icon: Database,
    summary:
      "Hệ thống ghi nhớ dài hạn và quản lý luồng hội thoại. Toàn bộ lịch sử trao đổi, checkpoint của thread, và trạng thái tác tử được lưu trữ cục bộ trong cơ sở dữ liệu LibSQL SQLite (~/.cube/memory.db), không rò rỉ dữ liệu lên cloud.",
    specs: ["Embedded LibSQL SQLite", "Thread Checkpointing", "Zero Cloud Leakage", "Instant Session Resume"],
    rotation: { x: 60, y: 25 },
  },
  {
    id: "guardrail",
    faceName: "BACK",
    axis: "-Z",
    index: "06",
    title: "Safety Guardrail",
    role: "HITL & Atomic Integrity",
    badge: "Zero File Corruption",
    icon: ShieldCheck,
    summary:
      "Hàng rào an toàn bảo vệ mã nguồn. Cơ chế Human-in-the-loop (HITL) chặn và yêu cầu xác nhận trước khi chạy lệnh nhạy cảm (rm -rf, git force-push). Mọi thao tác ghi đĩa đều là atomic write để loại bỏ hoàn toàn nguy cơ hỏng file.",
    specs: ["Human-in-the-Loop", "Atomic File Write", "Permission Hierarchy", "Rollback Protection"],
    rotation: { x: -12, y: 195 },
  },
];

interface CubeHarness3DProps {
  activeFaceIndex: number;
  onSelectFace: (index: number) => void;
}

export function CubeHarness3D({
  activeFaceIndex,
  onSelectFace,
}: CubeHarness3DProps) {
  const [isExploded, setIsExploded] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotation, setRotation] = useState({ x: -20, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const animFrameRef = useRef<number | null>(null);

  // Auto-rotation loop
  useEffect(() => {
    if (!autoRotate || isDragging) return;

    let lastTime = performance.now();
    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setRotation((prev) => ({
        x: prev.x,
        y: (prev.y + delta * 14) % 360,
      }));

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [autoRotate, isDragging]);

  // When active face changes from external selection, align view if auto-rotate is off
  const handleFaceSelect = useCallback(
    (index: number) => {
      onSelectFace(index);
      if (!autoRotate) {
        setRotation(HARNESS_FACES[index].rotation);
      }
    },
    [onSelectFace, autoRotate]
  );

  // Mouse / Touch drag to freely inspect 3D solid
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotation.x,
      rotY: rotation.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setRotation({
      x: Math.max(-85, Math.min(85, dragStartRef.current.rotX - dy * 0.4)),
      y: (dragStartRef.current.rotY + dx * 0.4) % 360,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  // Dimensions
  const cubeSize = 136; // px
  const half = cubeSize / 2; // 68px
  const explodeDist = isExploded ? 142 : half;

  return (
    <div className="relative w-full rounded-2xl border border-[#27272A] bg-[#0D0D0F] p-6 lg:p-8 overflow-hidden shadow-2xl">
      {/* Background Grid & Holographic Ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#27272A 1px, transparent 1px), linear-gradient(90deg, #27272A 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top HUD Controls Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#27272A]/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-white">
            <Rotate3d className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold tracking-wider text-white uppercase">
                Interactive 3D Harness
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/10 text-white border border-white/20">
                6 FACETS
              </span>
            </div>
            <p className="text-[11px] text-[#A1A1AA] font-mono">
              Kéo chuột để xoay 360° · Click từng mảnh để soi chi tiết
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Explode / Assemble Toggle */}
          <button
            onClick={() => setIsExploded(!isExploded)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-mono border transition-all flex items-center gap-2 cursor-pointer",
              isExploded
                ? "bg-white text-black border-white font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                : "bg-[#18181B] text-[#A1A1AA] border-[#27272A] hover:text-white hover:border-white/30"
            )}
          >
            {isExploded ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Khối Hợp Nhất</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Bung 6 Mảnh</span>
              </>
            )}
          </button>

          {/* Auto Rotate Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={cn(
              "p-2 rounded-lg text-xs border transition-colors cursor-pointer",
              autoRotate
                ? "bg-[#18181B] text-white border-white/30"
                : "bg-[#18181B] text-[#A1A1AA] border-[#27272A] hover:text-white"
            )}
            title={autoRotate ? "Dừng tự xoay" : "Bật tự xoay 3D"}
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 3D Viewport Stage */}
      <div
        className="relative w-full h-[360px] sm:h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        style={{ perspective: "1000px" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Floating Coordinates Crosshair HUD (Watermark) */}
        <div className="absolute top-4 left-4 font-mono text-[10px] text-[#A1A1AA]/50 space-y-0.5 pointer-events-none">
          <div>ROT_X: {Math.round(rotation.x)}°</div>
          <div>ROT_Y: {Math.round(rotation.y)}°</div>
          <div>STATE: {isExploded ? "EXPLODED_6X" : "SOLID_CORE"}</div>
        </div>

        {/* 3D World Transform Node */}
        <div
          className="relative"
          style={{
            width: `${cubeSize}px`,
            height: `${cubeSize}px`,
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
          }}
        >
          {/* Central Holographic Agent Kernel Core */}
          <div
            className="absolute inset-0 m-auto w-14 h-14 rounded-lg bg-[#050505] border border-white/40 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(0px)",
            }}
          >
            <div className="w-2 h-2 rounded-full bg-white animate-ping mb-1" />
            <span className="text-[9px] font-mono font-bold text-white tracking-widest">
              CORE
            </span>
            <span className="text-[7px] font-mono text-[#A1A1AA]">HARNESS</span>
          </div>

          {/* 3D Orthogonal Laser Rays (Visible in Exploded Mode) */}
          {isExploded && (
            <>
              {/* Z-Axis Rays (Front/Back) */}
              <div
                className="absolute inset-0 m-auto w-0.5 h-0.5 pointer-events-none"
                style={{
                  height: `${explodeDist * 2}px`,
                  transform: "rotateX(90deg) translateY(-50%)",
                  borderLeft: "1px dashed rgba(255,255,255,0.25)",
                }}
              />
              {/* X-Axis Rays (Right/Left) */}
              <div
                className="absolute inset-0 m-auto w-0.5 h-0.5 pointer-events-none"
                style={{
                  width: `${explodeDist * 2}px`,
                  transform: "translateX(-50%)",
                  borderTop: "1px dashed rgba(255,255,255,0.25)",
                }}
              />
              {/* Y-Axis Rays (Top/Bottom) */}
              <div
                className="absolute inset-0 m-auto w-0.5 h-0.5 pointer-events-none"
                style={{
                  height: `${explodeDist * 2}px`,
                  transform: "translateY(-50%)",
                  borderLeft: "1px dashed rgba(255,255,255,0.25)",
                }}
              />
            </>
          )}

          {/* 6 FACES OF THE CUBE */}

          {/* Face 1: FRONT (MODEL) */}
          <FacePanel
            data={HARNESS_FACES[0]}
            isActive={activeFaceIndex === 0}
            transformStyle={`translateZ(${explodeDist + (activeFaceIndex === 0 && isExploded ? 18 : 0)}px)`}
            onClick={() => handleFaceSelect(0)}
          />

          {/* Face 2: TOP (LOOP) */}
          <FacePanel
            data={HARNESS_FACES[1]}
            isActive={activeFaceIndex === 1}
            transformStyle={`rotateX(90deg) translateZ(${explodeDist + (activeFaceIndex === 1 && isExploded ? 18 : 0)}px)`}
            onClick={() => handleFaceSelect(1)}
          />

          {/* Face 3: RIGHT (TOOL) */}
          <FacePanel
            data={HARNESS_FACES[2]}
            isActive={activeFaceIndex === 2}
            transformStyle={`rotateY(90deg) translateZ(${explodeDist + (activeFaceIndex === 2 && isExploded ? 18 : 0)}px)`}
            onClick={() => handleFaceSelect(2)}
          />

          {/* Face 4: LEFT (CONTEXT) */}
          <FacePanel
            data={HARNESS_FACES[3]}
            isActive={activeFaceIndex === 3}
            transformStyle={`rotateY(-90deg) translateZ(${explodeDist + (activeFaceIndex === 3 && isExploded ? 18 : 0)}px)`}
            onClick={() => handleFaceSelect(3)}
          />

          {/* Face 5: BOTTOM (MEMORY) */}
          <FacePanel
            data={HARNESS_FACES[4]}
            isActive={activeFaceIndex === 4}
            transformStyle={`rotateX(-90deg) translateZ(${explodeDist + (activeFaceIndex === 4 && isExploded ? 18 : 0)}px)`}
            onClick={() => handleFaceSelect(4)}
          />

          {/* Face 6: BACK (GUARDRAIL) */}
          <FacePanel
            data={HARNESS_FACES[5]}
            isActive={activeFaceIndex === 5}
            transformStyle={`rotateY(180deg) translateZ(${explodeDist + (activeFaceIndex === 5 && isExploded ? 18 : 0)}px)`}
            onClick={() => handleFaceSelect(5)}
          />
        </div>
      </div>

      {/* Facet Direct Selector Tabs */}
      <div className="relative z-10 pt-4 border-t border-[#27272A]/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {HARNESS_FACES.map((face, idx) => {
          const isSelected = activeFaceIndex === idx;
          const Icon = face.icon;
          return (
            <button
              key={face.id}
              onClick={() => handleFaceSelect(idx)}
              className={cn(
                "p-2.5 rounded-lg border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2 group",
                isSelected
                  ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                  : "bg-[#18181B] text-[#A1A1AA] border-[#27272A] hover:border-white/30 hover:text-white"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-mono font-bold opacity-75">
                  [{face.index}] {face.axis}
                </span>
                <Icon
                  className={cn(
                    "w-3.5 h-3.5 transition-transform group-hover:scale-110",
                    isSelected ? "text-black" : "text-[#A1A1AA] group-hover:text-white"
                  )}
                />
              </div>
              <div>
                <div
                  className={cn(
                    "text-xs font-semibold tracking-tight font-sans",
                    isSelected ? "text-black" : "text-white"
                  )}
                >
                  {face.title}
                </div>
                <div className="text-[10px] font-mono truncate opacity-75">
                  {face.faceName}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Sub-component: 3D Face Fragment Panel
interface FacePanelProps {
  data: HarnessFaceData;
  isActive: boolean;
  transformStyle: string;
  onClick: () => void;
}

function FacePanel({ data, isActive, transformStyle, onClick }: FacePanelProps) {
  const Icon = data.icon;

  return (
    <div
      onClick={onClick}
      className={cn(
        "absolute inset-0 rounded-xl border backdrop-blur-md p-3 flex flex-col justify-between transition-all duration-300 cursor-pointer select-none",
        isActive
          ? "bg-[#18181B]/95 border-white text-white shadow-[0_0_35px_rgba(255,255,255,0.45)] ring-2 ring-white/50 scale-105 z-30"
          : "bg-[#18181B]/80 border-[#27272A] text-[#A1A1AA] hover:border-white/50 hover:bg-[#18181B]/90 hover:text-white z-10"
      )}
      style={{
        transform: transformStyle,
        backfaceVisibility: "visible",
      }}
    >
      {/* Sci-Fi Corner Crosshairs */}
      <span className="absolute top-1 left-1 text-[8px] font-mono text-[#A1A1AA]/50">+</span>
      <span className="absolute top-1 right-1 text-[8px] font-mono text-[#A1A1AA]/50">+</span>
      <span className="absolute bottom-1 left-1 text-[8px] font-mono text-[#A1A1AA]/50">+</span>
      <span className="absolute bottom-1 right-1 text-[8px] font-mono text-[#A1A1AA]/50">+</span>

      {/* Top Header */}
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border",
            isActive
              ? "bg-white text-black border-white"
              : "bg-[#050505] text-[#A1A1AA] border-[#27272A]"
          )}
        >
          {data.index}
        </span>
        <span className="text-[9px] font-mono uppercase tracking-wider text-[#A1A1AA]">
          {data.axis} {data.faceName}
        </span>
      </div>

      {/* Center Icon & Title */}
      <div className="flex flex-col items-center justify-center my-auto text-center gap-1.5">
        <div
          className={cn(
            "w-9 h-9 rounded-lg border flex items-center justify-center transition-transform",
            isActive
              ? "bg-white text-black border-white scale-110 shadow-lg"
              : "bg-[#050505] text-white border-[#27272A]"
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div
          className={cn(
            "text-xs font-bold tracking-tight font-sans leading-tight",
            isActive ? "text-white" : "text-[#D4D4D8]"
          )}
        >
          {data.title}
        </div>
      </div>

      {/* Bottom Status Tag */}
      <div className="flex items-center justify-between text-[8px] font-mono pt-1 border-t border-[#27272A]/50">
        <span className="truncate max-w-[70px] text-[#A1A1AA]">{data.role}</span>
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            isActive ? "bg-white shadow-[0_0_8px_white]" : "bg-[#52525B]"
          )}
        />
      </div>
    </div>
  );
}
