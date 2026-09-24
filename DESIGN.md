---
version: "cube-landing-final-2026-09-24"
name: "Cube - Engineered in the Terminal"
description: "Landing page for Cube, a TypeScript coding agent CLI with a custom TUI. Full-width hero with install one-liner, followed by a two-column scroll-synced terminal showcase. Signature visual: a dense grayscale cube-voxel noise field (not dots, not color-tinted)."
colors:
  primary: "#FFFFFF"
  secondary: "#050505"
  background: "#050505"
  surface: "#18181B"
  surface-2: "#0D0D0F"
  text-primary: "#FFFFFF"
  text-secondary: "#A1A1AA"
  border: "#27272A"
typography:
  display-lg:
    fontFamily: "Inter"
    fontSize: "64px"
    fontWeight: 500
    lineHeight: "1.04"
  display-md:
    fontFamily: "Inter"
    fontSize: "40px"
    fontWeight: 500
    lineHeight: "1.15"
  body-md:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "1.6"
  terminal-mono:
    fontFamily: "JetBrains Mono"
    fontSize: "13px"
    lineHeight: "1.5"
spacing:
  base: "8px"
  section-gap: "120px"
  card-padding: "24px"
rounded:
  terminal: "10px"
  control: "8px"
  pill: "9999px"
---
# Cube - Engineered in the Terminal

## Page structure (top to bottom)

### 1. Hero — full-width, single column, largest section, NOT sticky/scroll-synced
- Nav bar: pill container, translucent surface, logo + Agent / TUI / Themes / Docs links + Sign in + "Get Started" filled button.
- Small status pill above headline: "Cube v1.0.0 · Engineered in the Terminal".
- Headline (`display-lg`, biggest text on the page): something like "A coding agent that lives where you already work."
- Subhead (`body-md`, `text-secondary`): 1-2 lines referencing real Cube facts — multi-mode auth (API key / subscription / local model), Mastra-based tool system, workspace memory.
- CTA row: primary filled button "Get Started", outline "View on GitHub", ghost "Explore Docs".
- **Install one-liner**: a rounded code chip (`terminal-mono`, `surface-2` background, `border` outline) showing the real install command with a copy icon/button on the right. Small caption row underneath (checksum/verified badge, platform, install time) — mono, `text-secondary`, small.
- Cube-voxel noise field fills the full hero viewport as background (see spec below).

### 2. Feature showcase — starts immediately after hero, two-column, scroll-synced
- Small eyebrow label above this section: "Interactive Live Showcase", `display-md` heading: "Watch Cube operate in real time."
- Layout: left column = stacked feature sections (`min-height: 100vh` each); right column = terminal panel, `position: sticky; top: <navbar height>`, stays pinned for the full scroll length of the left column.
- `IntersectionObserver` (threshold ~0.5) on each left section swaps the terminal's content to that feature's demo, replaying from frame 0 on (re)entry.
- Terminal chrome: traffic-light dots, fake path bar (e.g. `cube — ~/workspace`), small status indicator top-right (e.g. model name).

Feature sections (map to real Cube capabilities):
1. **Multi-mode auth** — quick picker (API key / subscription / local model), selection + checkmark.
2. **Tool system** — prompt typed, "Thought for Ns", tool-call lines stream in (file edit, run command).
3. **Slash commands** — `/model`, `/resume`, `/fork`, `/compact` typed with brief result lines.
4. **Interactive Q&A / approval** — numbered multiple-choice picker (arrow-key hint footer, "Enter: select"), themed to a diff approval or workspace choice.
5. **Multi-theme TUI** — terminal briefly re-skins across 2-3 of Cube's 8 themes.
6. **Subagent delegation** — parent task spawns 2 indented sub-tasks running in parallel, each completing.

Each demo: short loop (2-4s), line-by-line/typed reveal via CSS/JS timing — no video/GIF.

## Signature Visual: Cube-Voxel Noise Field
- **Shape**: tiny isometric cubes (top-face + side-face parallelogram pair), not circles/dots — the one intentional departure that ties the effect to the product name.
- **Color**: strictly grayscale. Brightness ranges from near-white (`text-primary`) down to near-black (`background`) via opacity/lightness only. No color tint (no accent hue) anywhere in the field.
- **Density**: high — packed tight enough (small cube size, near-zero gap in dense zones) that clusters read as solid textured mass, not scattered dots. Halftone/static-noise density, not a starfield.
- **Contrast**: mix bright near-white cubes with dark/transparent gaps directly against `#050505` — must read as crisp black-and-white noise, not a soft low-opacity glow.
- **Distribution**: Perlin/Simplex noise field carving organic cloud-shaped clusters with jagged edges — dense mass in some zones, clean empty background in others. Concentrate clusters at edges/corners; clear a soft mask/fade zone behind the headline and hero content so text stays readable.
- **Coverage**: full-bleed across the entire hero viewport, not a faint strip.
- **Motion**: optional, very slow per-cube drift/rotation only — restrained, secondary to content.
- **Performance**: Canvas 2D only (no WebGL/Three.js), cap particle count for smooth 60fps, pause animation when tab hidden.

## Components
- Buttons: consistent radius language (`control` or `pill` only, never mixed).
- Cards (feature/below-fold, if added): `surface` background, `card-padding`, `rounded.card`.
- Code/terminal chips: `surface-2`, `terminal-mono`, `border` outline.

## Guardrails
- Do not tint the cube field with any accent color — grayscale only.
- Do not let density/opacity drop to a faint, low-contrast wash — must stay visually bold like the reference.
- Terminal panel must stay pinned for the entire feature-showcase scroll length; mobile: stack columns, drop sticky behavior below breakpoint.
- All terminal content swaps driven by real scroll position (IntersectionObserver), not a fixed autoplay timer.
- Use only real Cube facts for copy (Mastra framework, pi-tui, 3 auth modes, 8 themes, AAT subagent pattern, slash commands) — no placeholder/Grok/Nexus copy left in.
- No video/GIF assets anywhere.