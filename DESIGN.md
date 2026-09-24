---
version: "cube-landing-2026-09-24"
name: "Cube - Coding Agent, Engineered in the Terminal"
description: "Landing page for Cube, a TypeScript coding agent CLI with a custom TUI. Dark, developer-tool aesthetic with a cube-voxel particle field as the signature visual motif."
colors:
  primary: "#FFFFFF"
  secondary: "#050505"
  accent: "#5EEAD4"
  background: "#050505"
  surface: "#18181B"
  text-primary: "#FFFFFF"
  text-secondary: "#A1A1AA"
  border: "#27272A"
typography:
  display-lg:
    fontFamily: "Inter"
    fontSize: "64px"
    fontWeight: 500
    lineHeight: "1.04"
    letterSpacing: "0"
  body-md:
    fontFamily: "Inter"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "1.6"
  label-md:
    fontFamily: "JetBrains Mono"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "1.2"
spacing:
  base: "8px"
  gap: "16px"
  card-padding: "24px"
  section-padding: "80px"
rounded:
  card: "8px"
  control: "8px"
  pill: "9999px"
components:
  card:
    background: "surface token, subtle border, soft shadow"
    radius: "card radius token"
  button:
    background: "primary or accent for main CTA"
    radius: "control or pill depending on placement"
---
# Cube - Coding Agent, Engineered in the Terminal

## Overview
Landing page for Cube: a TypeScript monorepo coding agent CLI (packages: cube-agent, cube-cli, cube-tui, cube-workspace), built on the Mastra framework, with a custom terminal UI (pi-tui) featuring a multi-theme, WCAG-audited color system. Audience: developers evaluating a coding agent CLI.

Nav: Cube · Agent · TUI · Themes · Docs · Sign in · Get Started
Hero: "Engineered in the terminal." / "A coding agent that lives where you already work."
Sub: brief line on multi-mode auth (API key / subscription / local model), tool system, workspace memory.
CTA: primary "Get Started" (install command), secondary "View on GitHub" or "Explore Docs".

## Signature Visual: Cube-Voxel Field (replaces generic dot/noise background)
Instead of a plain dot-particle cloud, render the background as a **field of tiny isometric cubes** — a direct nod to the product name:
- Canvas 2D, not WebGL. Each particle is a small parallelogram-pair (top face + side face) forming a mini isometric cube, not a circle.
- Distribute density using a noise field (Perlin/Simplex) so cubes cluster into organic "cloud" shapes at the edges, same silhouette/composition as the reference image (denser at corners, fading toward the hero text).
- Shading: top face slightly lighter, side face slightly darker, both derived from `accent` (#5EEAD4) at low opacity (5–15%) against the `background` (#050505) — keep it subtle, secondary to the interface, not decorative noise.
- Optional idle motion: very slow per-cube drift/rotation (few px, long duration) — restrained, not attention-grabbing. Must stay performant (target 1000–3000 cubes max, requestAnimationFrame, pause when tab hidden).
- Mask/fade the field so it reads as atmosphere behind the nav and hero card, never competing with text contrast.

## Layout & Composition
Preserve the reference HTML's first-viewport rhythm: centered nav bar (pill-shaped, translucent surface), large centered headline + subhead, two-button CTA row, full-bleed cube-voxel field behind everything. Keep max-width containers and the same section spacing scale (section-padding: 80px).

## Components
- Nav: pill container, surface background, subtle border, primary "Get Started" button filled, "Sign in" as ghost/text link.
- CTA buttons: primary filled white/accent, secondary outline — same radius language throughout (control/pill only, no mixed radii).
- Optional below-fold: feature cards (auth modes, tool system, theme picker preview) using surface + card-padding + card radius.

## Guardrails
- Do not use circular dot particles — cubes/voxels only; this is the one required departure from the reference template.
- Do not flatten into a generic SaaS card grid.
- Keep the cube field secondary/atmospheric — never higher contrast than the headline text.
- No WebGL/Three.js dependency; canvas 2D only, must stay lightweight.
- Keep dark mode only unless explicitly asked to add a light theme.