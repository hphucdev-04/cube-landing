"use client";

import { useEffect, useState } from "react";
import { CubeVoxelField } from "@/components/visual/cube-voxel-field";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/hero/hero";
import { ScrollShowcase } from "@/components/showcase/scroll-showcase";
import { FeaturesGrid } from "@/components/features/features-grid";
import { CommandPalette } from "@/components/commands/command-palette";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#0A0908] text-[#F5F5F4] flex flex-col selection:bg-[#38BDF8]/30 selection:text-white overflow-x-clip">
      {/* Background Architectural Etching & Particles */}
      <CubeVoxelField />

      {/* LEFT MARGIN: Full-Height Progress Ruler (Edge-to-Edge) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 bottom-0 z-40 w-12 sm:w-16 hidden md:flex flex-col justify-between py-20 px-2 border-r border-[#2A2622]/80 bg-[#0A0908]/75 backdrop-blur-sm select-none"
      >
        <div className="font-mono text-[9px] text-[#3E3833] tracking-widest rotate-180 [writing-mode:vertical-rl]">
          CUBE RUNTIME PROGRESS
        </div>

        {/* Dynamic Progress Indicator */}
        <div className="flex flex-col items-center gap-1 font-mono text-[10px] text-[#F5F5F4]">
          <span className="w-1.5 h-1.5 bg-[#38BDF8]" />
          <span className="text-[#38BDF8] font-bold">{Math.round(scrollProgress * 100)}%</span>
        </div>

        <div className="font-mono text-[9px] text-[#3E3833] tracking-widest rotate-180 [writing-mode:vertical-rl]">
          AUTONOMOUS ENGINE // 1:1
        </div>
      </div>

      {/* RIGHT MARGIN: Full-Height Blueprint Datum Ruler */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-0 bottom-0 z-40 w-12 sm:w-16 hidden md:flex flex-col justify-between py-20 px-2 border-l border-[#2A2622]/80 bg-[#0A0908]/75 backdrop-blur-sm select-none"
      >
        <div className="font-mono text-[9px] text-[#3E3833] tracking-widest [writing-mode:vertical-rl]">
          AST TRAVERSAL MATRIX
        </div>

        <div className="flex flex-col items-center gap-1 font-mono text-[10px] text-[#3E3833]">
          <span>┼</span>
          <span>AXIS 00°</span>
        </div>

        <div className="font-mono text-[9px] text-[#3E3833] tracking-widest [writing-mode:vertical-rl]">
          CUBE PRECISION CLI
        </div>
      </div>

      {/* Top Floating Navbar */}
      <Navbar />

      {/* MAIN CANVAS */}
      <div className="relative z-10 flex-1 w-full">
        <main className="w-full">
          {/* Section 1: Hero */}
          <Hero />

          {/* Section 2: The 6 Runtime Subsystems (The Harness) */}
          <FeaturesGrid />

          {/* Section 3: Live Terminal Showcase */}
          <ScrollShowcase />

          {/* Section 4: Slash Commands & Developer TUI */}
          <CommandPalette />

          {/* Section 5: Documentation & FAQ */}
          <FaqAccordion />
        </main>
      </div>

      {/* Installation & Setup Footer */}
      <Footer />
    </div>
  );
}
