"use client";

import { useEffect, useRef } from "react";

interface CubeParticle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  vx: number;
  vy: number;
  phase: number;
  rotSpeed: number;
}

// Lightweight 2D Perlin-like noise implementation for organic clustering
function createNoise2D() {
  const perm = new Uint8Array(512);
  for (let i = 0; i < 256; i++) perm[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }
  for (let i = 0; i < 256; i++) perm[i + 256] = perm[i];

  function grad(hash: number, x: number, y: number) {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  return function (x: number, y: number) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);

    const u = xf * xf * xf * (xf * (xf * 6 - 15) + 10);
    const v = yf * yf * yf * (yf * (yf * 6 - 15) + 10);

    const g00 = grad(perm[X + perm[Y]], xf, yf);
    const g10 = grad(perm[X + 1 + perm[Y]], xf - 1, yf);
    const g01 = grad(perm[X + perm[Y + 1]], xf, yf - 1);
    const g11 = grad(perm[X + 1 + perm[Y + 1]], xf - 1, yf - 1);

    const x1 = g00 + u * (g10 - g00);
    const x2 = g01 + u * (g11 - g01);
    return (x1 + v * (x2 - x1) + 1) * 0.5; // [0, 1]
  };
}

export function CubeVoxelField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: CubeParticle[] = [];
    const noise2D = createNoise2D();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Target: 1200 - 1800 cubes for high performance
      const particleCount = Math.floor(Math.min(1600, (width * height) / 800));

      const cx = width / 2;
      const cy = height * 0.38; // Center of hero text

      let attempts = 0;
      while (particles.length < particleCount && attempts < particleCount * 4) {
        attempts++;
        const x = Math.random() * width;
        const y = Math.random() * height;

        // Density field: denser at corners & edges, fading toward hero center
        const dx = (x - cx) / (width * 0.5);
        const dy = (y - cy) / (height * 0.5);
        const distFromCenter = Math.sqrt(dx * dx + dy * dy);

        // Noise value for organic cloud silhouettes
        const n = noise2D(x * 0.0018, y * 0.0018);

        // Combined probability: suppressed at center (< 0.4), boosted at edges & high noise
        const centerSuppression = Math.min(1, Math.max(0, (distFromCenter - 0.25) * 1.6));
        const spawnProb = centerSuppression * (0.3 + 0.7 * n);

        if (Math.random() < spawnProb) {
          const size = 3 + Math.random() * 4.5; // 3px - 7.5px isometric cube
          const baseAlpha = 0.06 + Math.random() * 0.12; // 6% - 18% opacity

          particles.push({
            x,
            y,
            baseX: x,
            baseY: y,
            size,
            baseAlpha,
            alpha: baseAlpha,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.12,
            phase: Math.random() * Math.PI * 2,
            rotSpeed: 0.0008 + Math.random() * 0.0015,
          });
        }
      }
    };

    // Draw an isometric cube at (x, y) with size s and given opacity
    const drawIsometricCube = (x: number, y: number, s: number, alpha: number) => {
      // Isometric projection angles (30 degrees)
      const cos30 = 0.8660254; // Math.cos(Math.PI / 6)
      const sin30 = 0.5; // Math.sin(Math.PI / 6)

      const dx = s * cos30;
      const dy = s * sin30;

      // Center point: (x, y)
      // Top vertex: (x, y - s)
      // Top-right: (x + dx, y - s + dy)
      // Top-left: (x - dx, y - s + dy)
      // Bottom: (x, y + s)
      // Bottom-right: (x + dx, y + dy)
      // Bottom-left: (x - dx, y + dy)

      // 1. TOP FACE (Lightest face: accent #5EEAD4 with higher alpha)
      ctx.fillStyle = `rgba(94, 234, 212, ${alpha * 1.35})`;
      ctx.beginPath();
      ctx.moveTo(x, y - s);
      ctx.lineTo(x + dx, y - s + dy);
      ctx.lineTo(x, y);
      ctx.lineTo(x - dx, y - s + dy);
      ctx.closePath();
      ctx.fill();

      // 2. LEFT SIDE FACE (Medium shade: accent #5EEAD4 standard alpha)
      ctx.fillStyle = `rgba(94, 234, 212, ${alpha * 0.85})`;
      ctx.beginPath();
      ctx.moveTo(x - dx, y - s + dy);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + s);
      ctx.lineTo(x - dx, y + dy);
      ctx.closePath();
      ctx.fill();

      // 3. RIGHT SIDE FACE (Darker shade: accent #5EEAD4 lower alpha)
      ctx.fillStyle = `rgba(45, 140, 126, ${alpha * 0.65})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + dx, y - s + dy);
      ctx.lineTo(x + dx, y + dy);
      ctx.lineTo(x, y + s);
      ctx.closePath();
      ctx.fill();
    };

    let lastTime = performance.now();
    let isHidden = false;

    const onVisibilityChange = () => {
      isHidden = document.hidden;
      if (!isHidden) {
        lastTime = performance.now();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const render = (time: number) => {
      if (isHidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.38;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Subtle floating drift
        p.phase += p.rotSpeed * 12;
        p.x += p.vx + Math.sin(p.phase) * 0.08;
        p.y += p.vy + Math.cos(p.phase) * 0.06;

        // Wrap edges smoothly
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Dynamic fading toward hero text
        const dx = (p.x - cx) / (width * 0.45);
        const dy = (p.y - cy) / (height * 0.45);
        const centerDist = Math.sqrt(dx * dx + dy * dy);
        const centerAtten = Math.min(1, Math.max(0.08, centerDist - 0.2));

        const currentAlpha = p.baseAlpha * centerAtten;

        drawIsometricCube(p.x, p.y, p.size, currentAlpha);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
