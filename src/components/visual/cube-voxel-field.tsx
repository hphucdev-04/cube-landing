"use client";

import { useEffect, useRef } from "react";

interface CubeParticle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  vx: number;
  vy: number;
  shade: number; // Grayscale lightness multiplier [0.4 .. 1.0]
}

// Lightweight 2D Perlin-like noise generator
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
      // High density: packed tight enough that clusters read as solid textured mass
      // Target: 2400 - 3600 tiny cubes across viewport
      const targetCount = Math.floor(Math.min(3200, (width * height) / 380));

      const cx = width / 2;
      const cy = height * 0.38; // Center of hero headline

      let attempts = 0;
      while (particles.length < targetCount && attempts < targetCount * 5) {
        attempts++;
        const x = Math.random() * width;
        const y = Math.random() * height;

        // Radial distance from hero headline center
        const dx = (x - cx) / (width * 0.48);
        const dy = (y - cy) / (height * 0.42);
        const distFromCenter = Math.sqrt(dx * dx + dy * dy);

        // Noise field for organic cloud clusters with jagged edges
        const n = noise2D(x * 0.0022, y * 0.0022);

        // Clear a soft mask/fade zone behind headline & hero content
        const centerSuppression = Math.min(1, Math.max(0, (distFromCenter - 0.28) * 1.8));

        // Thresholding for tight, dense clusters
        const spawnProb = centerSuppression * (n > 0.42 ? 0.85 : 0.08);

        if (Math.random() < spawnProb) {
          // Tiny isometric cubes (2.5px - 5.5px)
          const size = 2.5 + Math.random() * 3.0;

          // Strictly grayscale brightness: mix bright near-white with mid-tone grays
          const shade = 0.5 + Math.random() * 0.5; // [0.5, 1.0]

          // High contrast: opacity ranges up to 0.75 for crisp black-and-white static noise
          const baseAlpha = 0.15 + Math.random() * 0.65;

          particles.push({
            x,
            y,
            size,
            shade,
            baseAlpha,
            alpha: baseAlpha,
            vx: (Math.random() - 0.5) * 0.08,
            vy: (Math.random() - 0.5) * 0.06,
          });
        }
      }
    };

    // Draw an isometric cube at (x, y) with strictly grayscale shading
    const drawIsometricCube = (x: number, y: number, s: number, alpha: number, shade: number) => {
      const cos30 = 0.8660254;
      const sin30 = 0.5;
      const dx = s * cos30;
      const dy = s * sin30;

      // 1. TOP FACE (Lightest: near-white / crisp grayscale)
      const topVal = Math.min(255, Math.floor(255 * shade));
      ctx.fillStyle = `rgba(${topVal}, ${topVal}, ${topVal}, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(x, y - s);
      ctx.lineTo(x + dx, y - s + dy);
      ctx.lineTo(x, y);
      ctx.lineTo(x - dx, y - s + dy);
      ctx.closePath();
      ctx.fill();

      // 2. LEFT SIDE FACE (Medium gray)
      const leftVal = Math.floor(180 * shade);
      ctx.fillStyle = `rgba(${leftVal}, ${leftVal}, ${leftVal}, ${alpha * 0.85})`;
      ctx.beginPath();
      ctx.moveTo(x - dx, y - s + dy);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + s);
      ctx.lineTo(x - dx, y + dy);
      ctx.closePath();
      ctx.fill();

      // 3. RIGHT SIDE FACE (Darker gray)
      const rightVal = Math.floor(110 * shade);
      ctx.fillStyle = `rgba(${rightVal}, ${rightVal}, ${rightVal}, ${alpha * 0.65})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + dx, y - s + dy);
      ctx.lineTo(x + dx, y + dy);
      ctx.lineTo(x, y + s);
      ctx.closePath();
      ctx.fill();
    };

    let isHidden = false;
    const onVisibilityChange = () => {
      isHidden = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const render = () => {
      if (isHidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.38;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Extremely slow drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Attenuate slightly if drifting into headline center
        const dx = (p.x - cx) / (width * 0.45);
        const dy = (p.y - cy) / (height * 0.4);
        const centerDist = Math.sqrt(dx * dx + dy * dy);
        const centerMask = Math.min(1, Math.max(0.05, centerDist - 0.22));

        const effectiveAlpha = p.baseAlpha * centerMask;

        drawIsometricCube(p.x, p.y, p.size, effectiveAlpha, p.shade);
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
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
