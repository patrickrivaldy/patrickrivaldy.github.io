"use client";

import { useEffect, useRef } from "react";

// Latar partikel global: titik + garis penghubung ala HUD,
// memenuhi viewport di belakang konten. Ringan: pause saat tab
// disembunyikan, hormati prefers-reduced-motion, sadar DPR.
export default function AmbientCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let rgb = "240,242,245";
    const syncPal = () => {
      try {
        const v = getComputedStyle(document.documentElement)
          .getPropertyValue("--em-rgb")
          .trim();
        if (v) rgb = v;
      } catch {
        /* abaikan */
      }
    };
    syncPal();
    window.addEventListener("themechange", syncPal);

    type P = { x: number; y: number; vx: number; vy: number };
    let pts: P[] = [];
    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = Math.floor(w * dpr);
      cv.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(35, Math.min(90, Math.floor((w * h) / 22000)));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const LINK = 130;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${rgb},${(0.16 * (1 - d / LINK)).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = `rgba(${rgb},.7)`;
      for (const p of pts) ctx.fillRect(p.x, p.y, 1.6, 1.6);
    };

    let raf = 0;
    if (reduced) {
      draw();
    } else {
      const loop = () => {
        if (!document.hidden) draw();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("themechange", syncPal);
    };
  }, []);

  return <canvas ref={ref} className="ambient" aria-hidden="true" />;
}
