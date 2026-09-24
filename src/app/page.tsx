import { CubeVoxelField } from "@/components/visual/cube-voxel-field";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/hero/hero";
import { TerminalSimulator } from "@/components/terminal/terminal-simulator";
import { FeaturesGrid } from "@/components/features/features-grid";
import { GatewaySection } from "@/components/gateways/gateway-section";
import { CommandPalette } from "@/components/commands/command-palette";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#FFFFFF] flex flex-col selection:bg-[#5EEAD4]/25 selection:text-[#5EEAD4]">
      {/* Signature Cube-Voxel Canvas 2D Particle Background */}
      <CubeVoxelField />

      {/* Floating Centered Pill Navbar */}
      <Navbar />

      <main className="relative z-10 flex-1">
        {/* First-Viewport Hero */}
        <Hero />

        {/* Live macOS Terminal Simulation Showcase */}
        <section id="terminal" className="px-4 sm:px-6 lg:px-8 pb-20">
          <TerminalSimulator />
        </section>

        {/* Core Architecture Capabilities (Agent, TUI, Themes, Safety) */}
        <FeaturesGrid />

        {/* Model Routing Matrix (OAuth, API Keys, Local Ollama) */}
        <GatewaySection />

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
