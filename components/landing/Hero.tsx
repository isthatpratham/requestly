"use client";

import * as React from "react";
import Link from "next/link";

/* ── Inline canvas: hero-scoped matrix ──────────────────────────────── */
const HeroCanvas: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf: number;
    let w = 0;
    let h = 0;
    type Pt = { x: number; y: number; ox: number; oy: number; vx: number; vy: number };
    let pts: Pt[] = [];
    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      const sp = 68;
      pts = [];
      for (let ry = 0; ry < Math.ceil(h / sp) + 2; ry++) {
        for (let cx = 0; cx < Math.ceil(w / sp) + 2; cx++) {
          pts.push({ x: cx * sp, y: ry * sp, ox: cx * sp, oy: ry * sp, vx: 0, vy: 0 });
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; };
    canvas.addEventListener("mousemove", onMove, { passive: true });
    canvas.addEventListener("mouseleave", onLeave);

    const isDark = () => document.documentElement.classList.contains("dark");

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      const dark = isDark();
      const lineColor = dark ? "rgba(80,80,75,0.35)" : "rgba(190,185,175,0.45)";
      const dotColor  = dark ? "rgba(100,98,90,0.5)"  : "rgba(160,155,145,0.6)";

      for (const pt of pts) {
        if (!prefersReduced && mouse.active) {
          const dx = mouse.x - pt.x;
          const dy = mouse.y - pt.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            const force = (1 - dist / 120) * 6;
            const angle = Math.atan2(dy, dx);
            pt.vx -= Math.cos(angle) * force * 0.14;
            pt.vy -= Math.sin(angle) * force * 0.14;
          }
        }
        pt.vx += (pt.ox - pt.x) * 0.035;
        pt.vy += (pt.oy - pt.y) * 0.035;
        pt.vx *= 0.78;
        pt.vy *= 0.78;
        pt.x += pt.vx;
        pt.y += pt.vy;
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          if (dx * dx + dy * dy < 72 * 72) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(pts[i].x, pts[i].y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      }

      if (!prefersReduced) raf = requestAnimationFrame(frame);
    };

    frame();
    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-auto select-none"
    />
  );
};

/* ── Hero ───────────────────────────────────────────────────────────── */
export const Hero: React.FC = () => {
  return (
    <section
      className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden border-b border-border-default"
      style={{ paddingTop: "80px" }}
    >
      {/* Environmental canvas background */}
      <div className="absolute inset-0 opacity-100" aria-hidden>
        <HeroCanvas />
      </div>

      {/* Gradient veil so text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 40%, var(--bg-primary) 100%)",
        }}
        aria-hidden
      />

      {/* Content — Centered Layout */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-10 py-20 flex flex-col items-center text-center">

        {/* Primary Headline — Strictly 2 Lines */}
        <h1
          className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.12] tracking-[-0.02em] animate-fade-up delay-100 mb-6 max-w-none w-full"
        >
          <span className="block text-brand-black sm:whitespace-nowrap">
            Discover, Test and Ship
          </span>
          <span className="block text-accent-blue sm:whitespace-nowrap">
            with Public APIs
          </span>
        </h1>

        {/* Dataset Attribution / Credits Paragraph */}
        <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-2xl animate-fade-up delay-200 mb-10">
          Built upon the open-source API catalog maintained by{" "}
          <a
            href="https://github.com/public-apis/public-apis"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-black underline underline-offset-4 hover:text-accent-blue font-mono transition-colors"
          >
            public-apis/public-apis
          </a>
          . All catalog data, trademarks, and endpoints belong solely to their respective owners and original authors.
        </p>

        {/* Single CTA Button with Breathing Effect & Fixed Hover Contrast */}
        <div className="flex items-center justify-center animate-fade-up delay-300">
          <Link
            href="/playground"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-xs bg-brand-black text-brand-white text-sm font-mono font-medium tracking-tight border border-brand-black shadow-md hover:opacity-85 active:opacity-100 animate-breathe transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-blue"
          >
            Open Playground →
          </Link>
        </div>

        {/* Technical metadata strip */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-text-muted animate-fade-up delay-400">
          {[
            { val: "1,670+", label: "catalog APIs" },
            { val: "GET/POST/PUT/PATCH/DELETE", label: "methods" },
            { val: "0", label: "account required" },
            { val: "cURL · JS · Python", label: "codegen" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className="text-brand-black font-semibold">{item.val}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-fade-in delay-400" aria-hidden>
        <span className="text-[10px] font-mono tracking-widest uppercase text-text-disabled">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-border-default to-transparent" />
      </div>
    </section>
  );
};
