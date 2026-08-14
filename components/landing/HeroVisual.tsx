"use client";

import * as React from "react";

interface NodePoint {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  label?: string;
  active?: boolean;
}

export const HeroVisual: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const mouseRef = React.useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let nodes: NodePoint[] = [];

    const setupCanvas = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Generate grid nodes
      const spacingX = Math.max(50, Math.floor(width / 16));
      const spacingY = Math.max(45, Math.floor(height / 8));
      const cols = Math.ceil(width / spacingX) + 1;
      const rows = Math.ceil(height / spacingY) + 1;

      nodes = [];
      const labels = ["200 OK", "GET", "POST", "JSON", "CORS", "HTTPS", "142ms", "AUTH", "cURL", "201", "REST"];
      let labelIdx = 0;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const posX = c * spacingX;
          const posY = r * spacingY;

          // Assign labels randomly to some interior nodes
          const isLabeled = (r + c) % 5 === 0 && r > 1 && c > 2 && c < cols - 2;

          nodes.push({
            x: posX,
            y: posY,
            originX: posX,
            originY: posY,
            vx: 0,
            vy: 0,
            label: isLabeled ? labels[labelIdx++ % labels.length] : undefined,
            active: isLabeled,
          });
        }
      }
    };

    setupCanvas();

    const handleResize = () => {
      setupCanvas();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };

    window.addEventListener("resize", handleResize);
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    let pulseTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      pulseTime += 0.02;

      // Draw subtle background grid lines
      ctx.strokeStyle = "#E5E5E5";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Interaction calculations
        if (!prefersReducedMotion && mouseRef.current.active) {
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140;

          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 12;
            const angle = Math.atan2(dy, dx);
            node.vx -= Math.cos(angle) * force * 0.15;
            node.vy -= Math.sin(angle) * force * 0.15;
          }
        }

        // Return to origin (spring mechanics)
        const dxOrigin = node.originX - node.x;
        const dyOrigin = node.originY - node.y;
        node.vx += dxOrigin * 0.05;
        node.vy += dyOrigin * 0.05;

        // Damping
        node.vx *= 0.82;
        node.vy *= 0.82;

        node.x += node.vx;
        node.y += node.vy;

        // Connect adjacent nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const distSq = (node.x - other.x) ** 2 + (node.y - other.y) ** 2;

          if (distSq < 70 * 70) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = "rgba(229, 229, 229, 0.7)";
            ctx.stroke();
          }
        }

        // Draw node points
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.active ? 2.5 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = node.active ? "#171717" : "#A3A3A3";
        ctx.fill();

        // Render node labels if present
        if (node.label && node.active) {
          ctx.font = '10px ui-monospace, SFMono-Regular, Menlo, monospace';
          ctx.fillStyle = '#525252';
          ctx.fillText(node.label, node.x + 6, node.y - 4);
        }
      }

      // Draw subtle pulsing scan line
      if (!prefersReducedMotion) {
        const scanY = (Math.sin(pulseTime) * 0.5 + 0.5) * height;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(width, scanY);
        ctx.strokeStyle = "rgba(23, 23, 23, 0.06)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[320px] sm:h-[400px] md:h-[480px] rounded-sm border border-border-default bg-background-elevated overflow-hidden select-none ${className || ""}`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Subtle overlay watermark */}
      <div className="absolute bottom-3 right-4 pointer-events-none text-[10px] font-mono text-text-disabled tracking-wider uppercase">
        REQUESTLY // INTERACTIVE MATRIX
      </div>
    </div>
  );
};
