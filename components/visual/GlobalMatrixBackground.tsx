"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

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

interface MatrixPageConfig {
  opacity: number;
  densityFactor: number;
  mouseMaxDist: number;
  parallaxFactor: number;
  showLabels: boolean;
}

function getPageConfig(pathname: string): MatrixPageConfig {
  if (pathname === "/") {
    return {
      opacity: 0.5,
      densityFactor: 1.0,
      mouseMaxDist: 150,
      parallaxFactor: 0.18,
      showLabels: true,
    };
  }
  if (pathname === "/explore") {
    return {
      opacity: 0.5,
      densityFactor: 0.8,
      mouseMaxDist: 100,
      parallaxFactor: 0.12,
      showLabels: true,
    };
  }
  if (pathname.startsWith("/explore/")) {
    return {
      opacity: 0.5,
      densityFactor: 0.75,
      mouseMaxDist: 80,
      parallaxFactor: 0.1,
      showLabels: false,
    };
  }
  if (pathname === "/playground") {
    return {
      opacity: 0.5,
      densityFactor: 0.7,
      mouseMaxDist: 60,
      parallaxFactor: 0.08,
      showLabels: false,
    };
  }
  if (pathname === "/collections" || pathname === "/history") {
    return {
      opacity: 0.5,
      densityFactor: 0.75,
      mouseMaxDist: 70,
      parallaxFactor: 0.1,
      showLabels: false,
    };
  }
  return {
    opacity: 0.55,
    densityFactor: 0.75,
    mouseMaxDist: 80,
    parallaxFactor: 0.1,
    showLabels: true,
  };
}

// Light-blue palette constants
const BLUE_LINE = "rgba(186, 213, 236, 0.55)";
const BLUE_NODE_ACTIVE = "#5B9EC9";
const BLUE_NODE_PASSIVE = "#B9D4E8";
const BLUE_LABEL = "#7AADC8";
const BLUE_SCAN = "rgba(147, 197, 228, 0.12)";
const BLUE_CONNECT = "rgba(186, 213, 236, 0.5)";

export const GlobalMatrixBackground: React.FC = () => {
  const pathname = usePathname();
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const scrollYRef = React.useRef(0);
  const currentScrollY = React.useRef(0);
  const mouseRef = React.useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  const config = getPageConfig(pathname || "/");

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let nodes: NodePoint[] = [];

    const isMobile = window.innerWidth < 640;
    const effectiveDensity = isMobile
      ? config.densityFactor * 0.6
      : config.densityFactor;
    const effectiveParallax = isMobile
      ? config.parallaxFactor * 0.5
      : config.parallaxFactor;

    const setupCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      const baseSpacingX = isMobile ? 80 : 58;
      const baseSpacingY = isMobile ? 70 : 52;
      const spacingX = Math.max(45, Math.floor(baseSpacingX / effectiveDensity));
      const spacingY = Math.max(40, Math.floor(baseSpacingY / effectiveDensity));

      const cols = Math.ceil(width / spacingX) + 2;
      const rows = Math.ceil(height / spacingY) + 3;

      nodes = [];
      const labels = [
        "200 OK",
        "GET",
        "POST",
        "JSON",
        "CORS",
        "HTTPS",
        "142ms",
        "AUTH",
        "cURL",
        "201",
        "REST",
        "API",
      ];
      let labelIdx = 0;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const posX = c * spacingX;
          const posY = r * spacingY;

          const isLabeled =
            config.showLabels &&
            (r + c) % 6 === 0 &&
            r > 1 &&
            c > 1 &&
            c < cols - 1;

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

    const handleScroll = () => {
      scrollYRef.current = window.scrollY || window.pageYOffset || 0;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, active: false };
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    let pulseTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      pulseTime += 0.015;

      // Smooth scroll parallax
      currentScrollY.current +=
        (scrollYRef.current - currentScrollY.current) * 0.08;
      const parallaxOffsetY = (currentScrollY.current * effectiveParallax) % 55;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const drawY = node.y - parallaxOffsetY;

        // Pointer repulsion physics
        if (!prefersReducedMotion && mouseRef.current.active) {
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - drawY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = config.mouseMaxDist;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 8;
            const angle = Math.atan2(dy, dx);
            node.vx -= Math.cos(angle) * force * 0.12;
            node.vy -= Math.sin(angle) * force * 0.12;
          }
        }

        // Spring return to origin
        const dxOrigin = node.originX - node.x;
        const dyOrigin = node.originY - node.y;
        node.vx += dxOrigin * 0.04;
        node.vy += dyOrigin * 0.04;

        // Damping
        node.vx *= 0.82;
        node.vy *= 0.82;

        node.x += node.vx;
        node.y += node.vy;

        // Connect adjacent nodes with light-blue lines
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const otherDrawY = other.y - parallaxOffsetY;
          const distSq =
            (node.x - other.x) ** 2 + (drawY - otherDrawY) ** 2;

          if (distSq < 65 * 65) {
            ctx.beginPath();
            ctx.moveTo(node.x, drawY);
            ctx.lineTo(other.x, otherDrawY);
            ctx.strokeStyle = BLUE_CONNECT;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Node dots — light blue
        ctx.beginPath();
        ctx.arc(node.x, drawY, node.active ? 2.2 : 1.3, 0, Math.PI * 2);
        ctx.fillStyle = node.active ? BLUE_NODE_ACTIVE : BLUE_NODE_PASSIVE;
        ctx.fill();

        // Technical labels — muted blue
        if (node.label && node.active && config.showLabels) {
          ctx.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
          ctx.fillStyle = BLUE_LABEL;
          ctx.fillText(node.label, node.x + 5, drawY - 4);
        }
      }

      // Background grid lines
      ctx.lineWidth = 0.4;
      ctx.strokeStyle = BLUE_LINE;
      // Horizontal guide lines derived from node rows
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        // Only draw on leftmost column nodes
        if (node.originX === nodes[0]?.originX || node.originX < 5) {
          const drawY = node.y - parallaxOffsetY;
          ctx.beginPath();
          ctx.moveTo(0, drawY);
          ctx.lineTo(width, drawY);
          ctx.stroke();
        }
      }

      // Subtle horizontal scan pulse — light blue
      if (!prefersReducedMotion) {
        const scanY = (Math.sin(pulseTime) * 0.5 + 0.5) * height;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(width, scanY);
        ctx.strokeStyle = BLUE_SCAN;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [config]);

  return (
    <div
      aria-hidden="true"
      style={{ opacity: config.opacity }}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700 ease-out select-none"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
