import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Cube — Coding Agent, Engineered in the Terminal",
  description:
    "A TypeScript coding agent CLI with a custom TUI, multi-mode authentication, tool system, and workspace memory.",
  keywords: [
    "AI coding agent",
    "terminal UI",
    "CLI",
    "developer tools",
    "Mastra",
    "pi-tui",
    "Claude",
    "Grok",
    "OpenAI",
    "Ollama",
  ],
  authors: [{ name: "Cube Team" }],
  openGraph: {
    title: "Cube — Coding Agent, Engineered in the Terminal",
    description:
      "A coding agent that lives where you already work. Multi-gateway model routing, local LibSQL memory, and atomic workspace mutations.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cube — Coding Agent, Engineered in the Terminal",
    description: "A coding agent that lives where you already work.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#050505] text-[#FFFFFF] font-sans selection:bg-white/20 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
