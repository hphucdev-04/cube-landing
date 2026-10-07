import { MotionProvider } from "@/components/layout/motion-provider";
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
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cube.run"),
  title: "Cube — AI Coding Agent for Your Terminal",
  description: "Read and edit code, run commands with approval, and resume sessions with local memory. Choose OAuth, API keys, or Ollama/LM Studio. Add skills and MCP tools.",
  keywords: ["AI coding agent", "terminal coding assistant", "CLI developer tools", "local AI coding", "MCP tools", "AGENTS.md", "Ollama", "LM Studio", "OAuth", "Cube"],
  authors: [{ name: "Cube Team" }],
  alternates: { canonical: "/" },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: "Cube — AI Coding Agent for Your Terminal",
    description: "Read and edit code, run commands with approval, and resume sessions with local memory. Choose OAuth, API keys, or Ollama/LM Studio. Add skills and MCP tools.",
    url: "https://cube.run/", siteName: "Cube", type: "website", locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cube — AI Coding Agent for Your Terminal",
    description: "Read and edit code, run commands with approval, and resume sessions with local memory. Choose OAuth, API keys, or Ollama/LM Studio. Add skills and MCP tools.",
  },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }], shortcut: "/icon.svg", apple: "/icon.svg" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://cube.run/#software",
      "name": "Cube",
      "operatingSystem": "Windows x64, macOS arm64/x64, Linux x64",
      "applicationCategory": "DeveloperApplication",
      "description": "Read and edit code, run commands with approval, and resume sessions with local memory. Choose OAuth, API keys, or Ollama/LM Studio. Add skills and MCP tools.",
      "url": "https://cube.run/",
      "softwareVersion": "0.1.7",
      "featureList": [
        "Terminal coding agent",
        "File editing and patches",
        "Tool approval and workspace permissions",
        "OAuth and API key gateways",
        "Ollama and LM Studio",
        "Local SQLite history and durable memory",
        "Skills and MCP tools",
        "Managed background commands"
      ],
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Organization",
        "name": "Cube Team"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://cube.run/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does the installer work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Run the PowerShell installer on Windows x64, or the shell installer on macOS arm64/x64 and Linux/WSL x64. It downloads a Cube package with a bundled Node.js runtime and verifies its SHA-256 checksum. No separate Node.js installation is needed. On macOS and Linux, you may need to add ~/.local/bin to PATH."
          }
        },
        {
          "@type": "Question",
          "name": "Which accounts and model gateways can I connect?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use /gateway to choose OAuth for Anthropic, OpenAI, xAI, or Google, an API key from one of 15 supported providers, or local Ollama/LM Studio. Then use /model to select a model. Available models, account eligibility, usage limits, and billing depend on the provider."
          }
        },
        {
          "@type": "Question",
          "name": "Where are my data stored and where do prompts go?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cube stores conversation history and memory in local SQLite under ~/.cube/memories, and credentials in ~/.cube/auth.json. Model requests go to your selected provider or local server. Connected MCP servers and network tools can receive data when used. Retention and training policies depend on those services; local storage does not imply zero data retention by a provider."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use local models without cloud inference?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Start Ollama or LM Studio with a downloaded model, run /gateway, select local/ollama or local/lmstudio, then choose a model with /model. Inference uses the configured local server. Installation, update checks, web tools, remote MCP servers, and cloud-backed memory features may still use the network."
          }
        },
        {
          "@type": "Question",
          "name": "How does Cube discover project context and rules?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Launch cube in the directory you want to use as the workspace. Cube loads AGENTS.md there and in .agents, .cube, .claude, and .codex, plus global instructions from ~/.cube/AGENTS.md. It discovers scoped AGENTS.md files as tools explore workspace paths. Manage skills with /skills and refresh instructions and MCP configuration with /reload."
          }
        },
        {
          "@type": "Question",
          "name": "How do tool permissions and updates work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Cube asks for workspace trust on first use. File edits, writes, patches, and shell commands require approval by default; /permissions lets you configure allow, ask, or deny rules, including MCP tools. Installed builds check for updates at startup and offer a verified download and restart. Re-running the installer also updates Cube while preserving ~/.cube data."
          }
        }
      ]
    }
  ]
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
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
