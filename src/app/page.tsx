import { CubeVoxelField } from "@/components/visual/cube-voxel-field";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/hero/hero";
import { ScrollShowcase } from "@/components/showcase/scroll-showcase";
import { FeaturesGrid } from "@/components/features/features-grid";
import { CommandPalette } from "@/components/commands/command-palette";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#FFFFFF] flex flex-col selection:bg-white/20 selection:text-white">
      {/* Signature Cube-Voxel Canvas 2D Particle Background (Strictly Grayscale) */}
      <CubeVoxelField />

      {/* Floating Centered Pill Navbar */}
      <Navbar />

      <main className="relative z-10 flex-1">
        {/* Section 1: Full-width Hero with Install one-liner */}
        <Hero />

        {/* Section 2: Core Architecture Capabilities (6 Core Components Agent Harness) */}
        <FeaturesGrid />

        {/* Section 3: Two-column, scroll-synced terminal showcase */}
        <ScrollShowcase />

        {/* Interactive Slash Command Palette */}
        <CommandPalette />

        {/* FAQ Knowledge Base */}
        <FaqAccordion />
      </main>

      {/* Footer & Final Call to Action */}
      <Footer />
    </div>
  );
}
