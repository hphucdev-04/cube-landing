import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Cinzel } from "next/font/google";
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

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cube.run"),
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
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Cube — Coding Agent, Engineered in the Terminal",
    description:
      "A coding agent that lives where you already work. Multi-gateway model routing, local LibSQL memory, and atomic workspace mutations.",
    url: "https://cube.run",
    siteName: "Cube",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cube — Coding Agent, Engineered in the Terminal",
    description: "A coding agent that lives where you already work.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Cube",
      "operatingSystem": "Windows, MacOS, Linux",
      "applicationCategory": "DeveloperApplication",
      "description":
        "A TypeScript coding agent CLI with a custom differential-rendering TUI, multi-mode authentication, tool system, and workspace memory.",
      "url": "https://cube.run",
      "softwareVersion": "1.0.0",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
      },
      "author": {
        "@type": "Organization",
        "name": "Cube Team",
      },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does the 1-click installer work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Our installer script runs directly in PowerShell on Windows (or curl/bash on macOS & Linux). It detects your system architecture, downloads the standalone self-contained Cube binary into your user home directory, and configures your PATH. No Node.js runtime, build tools, or administrator privileges are required.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I really use my existing Claude Pro or ChatGPT Plus subscription?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. With Cube's OAuth gateway, you authenticate once in your default browser via secure PKCE OAuth 2.0. Cube directly consumes your monthly subscription quota without charging any token markups, monthly subscription fees, or proxy surcharges.",
          },
        },
        {
          "@type": "Question",
          "name": "Is my proprietary source code sent to Cube servers or used for training?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "No. Cube operates on a strictly Zero Data Retention (ZDR) local-first philosophy. Cube does not operate any intermediate proxy servers. All prompt requests go directly from your local terminal to the model provider (Anthropic, OpenAI, or your local Ollama server). Your session database, credentials, and conversation history are stored entirely in LibSQL on your local disk at ~/.cube.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I run Cube completely offline without an internet connection?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Cube has first-class integration with local inference engines like Ollama, LM Studio, and vLLM. Simply select `/gateway local ollama` and Cube will interact with your local GPU or Apple Silicon neural engine with zero outbound network calls.",
          },
        },
        {
          "@type": "Question",
          "name": "How does Cube discover project context and rules?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Cube's WorkspaceManager automatically scans your current directory and walks up parent folders to identify Git roots and locate AGENTS.md (or .agents/, .cube/, .claude/) instruction files. These architectural guidelines, coding styles, and safety rules are injected into the agent's context window automatically.",
          },
        },
        {
          "@type": "Question",
          "name": "How do updates work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Cube comes with a built-in instantaneous updater. Running `cube update` or re-running the 1-click installer pulls the newest binary in under 2 seconds without wiping your existing configuration, credentials, or session history.",
          },
        },
      ],
    },
  ],
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
      className={`${inter.variable} ${jetbrainsMono.variable} ${cinzel.variable} h-full antialiased dark scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-[#0A0908] text-[#F5F5F4] font-sans selection:bg-[#38BDF8]/30 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
