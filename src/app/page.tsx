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
    <div className="min-h-screen bg-[#08090C] text-neutral-100 flex flex-col selection:bg-[#00F0FF]/30 selection:text-[#00F0FF]">
      {/* Top Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Live macOS Terminal Simulation Showcase */}
        <section id="demo" className="px-4 sm:px-6 lg:px-8 pb-24 -mt-4">
          <TerminalSimulator />
        </section>

        {/* High-Level Capability Highlights */}
        <FeaturesGrid />

        {/* Multi-Gateway Model Matrix (OAuth, API Keys, Local Ollama) */}
        <GatewaySection />

        {/* Interactive Slash Command Palette */}
        <CommandPalette />

        {/* FAQ Section */}
        <FaqAccordion />
      </main>

      {/* Footer & Final Call to Action */}
      <Footer />
    </div>
  );
}
