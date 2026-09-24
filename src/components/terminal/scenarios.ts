export interface ScenarioStep {
  type: "user-input" | "reasoning" | "tool-call" | "tool-result" | "assistant-text" | "status";
  content: string;
  delayMs: number;
  toolName?: string;
  diff?: {
    file: string;
    additions: string[];
    deletions: string[];
  };
}

export interface Scenario {
  id: string;
  label: string;
  model: string;
  steps: ScenarioStep[];
}

export const SCENARIOS: Scenario[] = [
  {
    id: "fix-bug",
    label: "Autonomous Bug Fix",
    model: "grok-4.7",
    steps: [
      {
        type: "user-input",
        content: "Fix the upstream gateway timeout and add exponential backoff in oauth.gateway.ts",
        delayMs: 1200,
      },
      {
        type: "reasoning",
        content: "Inspecting oauth gateway retry parameters. Need to verify AbortSignal handling and backoff intervals...",
        delayMs: 2000,
      },
      {
        type: "tool-call",
        toolName: "read_file",
        content: "read_file path: 'cube-agent/src/gateways/oauth.gateway.ts'",
        delayMs: 1000,
      },
      {
        type: "tool-result",
        toolName: "read_file",
        content: "Read 332 lines from oauth.gateway.ts (lines 150-180 contain timeout options)",
        delayMs: 800,
      },
      {
        type: "tool-call",
        toolName: "edit_file",
        content: "edit_file path: 'cube-agent/src/gateways/oauth.gateway.ts'",
        delayMs: 1200,
        diff: {
          file: "cube-agent/src/gateways/oauth.gateway.ts",
          deletions: ["- const TIMEOUT_MS = 5000;"],
          additions: [
            "+ const TIMEOUT_MS = 30000;",
            "+ const backoff = Math.min(1000 * Math.pow(2, attempt), 10000);",
          ],
        },
      },
      {
        type: "tool-result",
        toolName: "edit_file",
        content: "Successfully modified oauth.gateway.ts (atomic write committed)",
        delayMs: 900,
      },
      {
        type: "assistant-text",
        content:
          "✔ Fixed upstream gateway timeout by increasing the deadline to 30s and adding jittered exponential backoff for failed network calls.",
        delayMs: 1000,
      },
    ],
  },
  {
    id: "multi-gateway",
    label: "Switching Gateways & Models",
    model: "claude-3-7-sonnet",
    steps: [
      {
        type: "user-input",
        content: "/gateway",
        delayMs: 1000,
      },
      {
        type: "status",
        content: "Loading gateway choices: [OAuth: Anthropic, xAI, OpenAI, Google] [API Key: 15+ providers] [Local: Ollama]",
        delayMs: 1200,
      },
      {
        type: "user-input",
        content: "/model anthropic/claude-3-7-sonnet --effort high",
        delayMs: 1200,
      },
      {
        type: "assistant-text",
        content: "✔ Model switched to 'anthropic/claude-3-7-sonnet' with high reasoning effort (thinking budget: 24,576 tokens).",
        delayMs: 1000,
      },
    ],
  },
  {
    id: "context-discovery",
    label: "Automatic AGENTS.md Context",
    model: "gemini-2.5-flash",
    steps: [
      {
        type: "user-input",
        content: "What are the rules and conventions for running package tests?",
        delayMs: 1200,
      },
      {
        type: "reasoning",
        content: "Scanning workspace root. Located D:\\cube\\AGENTS.md with monorepo testing conventions...",
        delayMs: 1800,
      },
      {
        type: "assistant-text",
        content:
          "According to your AGENTS.md:\n- Run all package tests: `pnpm build && pnpm test`\n- Run single package: `pnpm --filter @cube/<pkg> test`\n- Tests run with `tsx --test --test-isolation=none tests/**/*.test.ts`.",
        delayMs: 1200,
      },
    ],
  },
];
