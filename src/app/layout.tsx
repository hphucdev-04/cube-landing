import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cube — Autonomous AI Coding Agent for Your Terminal",
  description:
    "Differential-rendering TUI, multi-gateway model routing (Claude, Grok, Gemini, OpenAI, Ollama), local SQLite memory, and atomic workspace mutations right inside your console.",
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
    title: "Cube — Autonomous AI Coding Agent for Your Terminal",
    description:
      "Differential-rendering TUI, multi-gateway model routing, local SQLite memory, and atomic workspace mutations.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cube — Autonomous AI Coding Agent for Your Terminal",
    description: "The autonomous coding agent built for your terminal.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#08090C] text-[#F3F4F6] font-sans selection:bg-[#00F0FF]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
