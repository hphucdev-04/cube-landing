"use client";

import { useEffect, useRef } from "react";

interface CubeParticle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  vx: number;
  vy: number;
  shade: number; // Grayscale lightness [0.4 .. 1.0]
  phase: number;
  floatSpeed: number;
  rotSpeed: number;
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
    return (x1 + v * (x2 - x1) + 1) * 0.5;
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

    // Mouse coordinates for gentle interactive reaction
    let mouseX = -9999;
    let mouseY = -9999;
    let targetMouseX = -9999;
    let targetMouseY = -9999;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const onMouseLeave = () => {
      targetMouseX = -9999;
      targetMouseY = -9999;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });

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
      // High density: 2200 - 3200 tiny cubes across viewport
      const targetCount = Math.floor(Math.min(3000, (width * height) / 420));

      const cx = width / 2;
      const cy = height * 0.38;

      let attempts = 0;
      while (particles.length < targetCount && attempts < targetCount * 5) {
        attempts++;
        const x = Math.random() * width;
        const y = Math.random() * height;

        // Radial distance from hero center
        const dx = (x - cx) / (width * 0.48);
        const dy = (y - cy) / (height * 0.42);
        const distFromCenter = Math.sqrt(dx * dx + dy * dy);

        // Noise clustering
        const n = noise2D(x * 0.0022, y * 0.0022);
        const centerSuppression = Math.min(1, Math.max(0, (distFromCenter - 0.28) * 1.8));
        const spawnProb = centerSuppression * (n > 0.4 ? 0.85 : 0.1);

        if (Math.random() < spawnProb) {
          const size = 2.5 + Math.random() * 3.5;
          const shade = 0.45 + Math.random() * 0.55; // [0.45, 1.0]
          const baseAlpha = 0.18 + Math.random() * 0.65;

          particles.push({
            x,
            y,
            originX: x,
            originY: y,
            size,
            shade,
            baseAlpha,
            alpha: baseAlpha,
            // Visibly smooth upward & drifting velocity
            vx: (Math.random() - 0.5) * 0.35,
            vy: -0.15 - Math.random() * 0.35, // Slow rising voxel flow
            phase: Math.random() * Math.PI * 2,
            floatSpeed: 0.001 + Math.random() * 0.002,
            rotSpeed: 0.0015 + Math.random() * 0.003,
          });
        }
      }
    };

    // Draw an isometric cube at (x, y) with strictly grayscale shading
    const drawIsometricCube = (
      x: number,
      y: number,
      s: number,
      alpha: number,
      shade: number,
      lightMod: number
    ) => {
      const cos30 = 0.8660254;
      const sin30 = 0.5;
      const dx = s * cos30;
      const dy = s * sin30;

      // 1. TOP FACE (Crisp near-white / lightest face)
      const topVal = Math.min(255, Math.floor(255 * shade * lightMod));
      ctx.fillStyle = `rgba(${topVal}, ${topVal}, ${topVal}, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(x, y - s);
      ctx.lineTo(x + dx, y - s + dy);
      ctx.lineTo(x, y);
      ctx.lineTo(x - dx, y - s + dy);
      ctx.closePath();
      ctx.fill();

      // 2. LEFT SIDE FACE (Medium gray)
      const leftVal = Math.min(255, Math.floor(180 * shade * lightMod));
      ctx.fillStyle = `rgba(${leftVal}, ${leftVal}, ${leftVal}, ${alpha * 0.85})`;
      ctx.beginPath();
      ctx.moveTo(x - dx, y - s + dy);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + s);
      ctx.lineTo(x - dx, y + dy);
      ctx.closePath();
      ctx.fill();

      // 3. RIGHT SIDE FACE (Darker gray)
      const rightVal = Math.min(255, Math.floor(110 * shade * lightMod));
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

    let lastTime = performance.now();

    const render = (now: number) => {
      if (isHidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      const cx = width / 2;
      const cy = height * 0.38;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Organic Sinusoidal Motion + Vertical Drift
        p.phase += p.floatSpeed * 15;
        p.x += p.vx + Math.sin(p.phase) * 0.35;
        p.y += p.vy + Math.cos(p.phase * 0.8) * 0.2;

        // Wrap around viewport edges seamlessly
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // 2. Interactive mouse repulsion & lighting
        let mouseBoost = 0;
        let repelX = 0;
        let repelY = 0;

        if (mouseX > 0 && mouseY > 0) {
          const mdx = p.x - mouseX;
          const mdy = p.y - mouseY;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          const maxDist = 240; // Bán kính hút mở rộng (240px)

          if (mDist < maxDist) {
            const factor = 1 - mDist / maxDist;
            mouseBoost = factor * 0.65;
            const angle = Math.atan2(mdy, mdx);
            // Lực hút mạnh hơn, gom chụm rõ rệt về phía con trỏ chuột
            const pullForce = Math.pow(factor, 0.75) * 55;
            repelX = -Math.cos(angle) * pullForce;
            repelY = -Math.sin(angle) * pullForce;
          }
        }

        // 3. Fading around hero headline text
        const dx = (p.x - cx) / (width * 0.45);
        const dy = (p.y - cy) / (height * 0.4);
        const centerDist = Math.sqrt(dx * dx + dy * dy);
        const centerMask = Math.min(1, Math.max(0.06, centerDist - 0.22));

        // 4. Subtle living shimmer/pulse
        const shimmer = 0.85 + 0.25 * Math.sin(now * 0.0018 + p.phase);
        const effectiveAlpha = Math.min(1, (p.baseAlpha * shimmer + mouseBoost) * centerMask);
        const lightMod = 1.0 + mouseBoost * 0.6;

        drawIsometricCube(
          p.x + repelX,
          p.y + repelY,
          p.size,
          effectiveAlpha,
          p.shade,
          lightMod
        );
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-90 transition-opacity"
      aria-hidden="true"
    />
  );
}
