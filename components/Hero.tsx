"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Typewriter from "./Typewriter";

function useHudCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    // Palet mengikuti tema aktif (dark / light) via CSS vars.
    const pal = { bg: "#0d0f14", rgb: "240,242,245" };
    const syncPal = () => {
      try {
        const cs = getComputedStyle(document.documentElement);
        const bg = cs.getPropertyValue("--panel").trim();
        const rgb = cs.getPropertyValue("--em-rgb").trim();
        if (bg) pal.bg = bg;
        if (rgb) pal.rgb = rgb;
      } catch {
        /* abaikan */
      }
    };
    syncPal();
    window.addEventListener("themechange", syncPal);

    const draw = () => {
      const w = (cv.width = cv.clientWidth);
      const h = (cv.height = cv.clientHeight);
      ctx.fillStyle = pal.bg;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = `rgba(${pal.rgb},.06)`;
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 32) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("themechange", syncPal);
    };
  }, []);

  return ref;
}

const METRICS = [
  { label: "LATENSI EKSEKUSI", value: "< 0.18 MS", w: "96%" },
  { label: "TINGKAT KEANDALAN", value: "99.99 %", w: "99%" },
  { label: "APLIKASI & REPO", value: "40+ PROYEK", w: "88%" },
  { label: "PENGALAMAN", value: "10+ TAHUN", w: "100%" },
];

export default function Hero() {
  const canvasRef = useHudCanvas();
  const [fps, setFps] = useState(120);

  useEffect(() => {
    const t = setInterval(
      () => setFps(114 + Math.round(Math.random() * 10)),
      1500
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section id="tentang">
      <div className="wrap hero-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div className="badges">
            <span className="chip chamfer">
              <span className="dot pulse" />
              STATUS: SIAP KOLABORASI
            </span>
            <span className="chip">
              LOKASI: JAKARTA, ID / <b style={{ color: "var(--emitter)" }}>NODE_ACTIVE</b>
            </span>
          </div>
          <div>
            <span className="t-sm hero-overline">
              <b style={{ color: "var(--emitter)" }}>&gt;</b>{" "}
              <Typewriter text="[ PENGEMBANG KREATIF & ARSITEK SISTEM ]" />
            </span>
            {/* GANTI: headline utama kamu */}
            <h1 className="grad glitch" data-text="Menghadirkan sistem berperforma tinggi dengan ketepatan dan presisi.">
              Menghadirkan sistem berperforma tinggi dengan ketepatan dan presisi.
            </h1>
          </div>
          {/* GANTI: deskripsi singkat kamu */}
          <p className="lead">
            Senior Software Engineer &amp; Creative Technologist yang berfokus
            membangun grafis web interaktif (WebGL/WebGPU), arsitektur sistem
            latensi rendah, serta antarmuka digital modern yang cepat dan teruji.
          </p>
          <div className="cta-row">
            <a className="btn btn-big chamfer-btn" href="#proyek">
              <span>&gt;_</span>
              <span>LIHAT PROYEK PILIHAN</span>
              <span>→</span>
            </a>
            <Link className="btn btn-ghost chamfer-btn btn-dl" href="/cv" title="Buka halaman CV siap cetak / simpan PDF">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1v9.2M4.5 6.8L8 10.3l3.5-3.5M2 12.5h12V15H2v-2.5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square"/>
              </svg>
              <span>UNDUH RESUME / CV</span>
            </Link>
          </div>
          <div className="metrics">
            {METRICS.map((m) => (
              <div key={m.label} className="metric chamfer">
                <span className="t-micro" style={{ color: "var(--wireframe)" }}>
                  {m.label}
                </span>
                <span className="t-lg">{m.value}</span>
                <span className="bar">
                  <i style={{ width: m.w }} />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="viewfinder chamfer">
          <div className="vf-bar">
            <span style={{ display: "flex", gap: ".4rem", alignItems: "center", color: "var(--emitter)" }}>
              <span className="dot" />
              TARGET: CREATIVE_DEV
            </span>
            <span>FRAMEWORK: WEBGPU // THREEJS</span>
          </div>
          <div className="vf-stage chamfer">
            <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
            <div className="vf-scrim" />
            <div className="vf-scan" />
            <svg
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", color: "var(--emitter)" }}
              viewBox="0 0 400 500"
              fill="none"
              aria-hidden="true"
            >
              <g className="radar-spin" style={{ transformOrigin: "200px 230px" }}>
                <circle cx="200" cy="230" r="120" stroke="currentColor" strokeOpacity=".35" strokeDasharray="6 8" />
              </g>
              <circle cx="200" cy="230" r="150" stroke="currentColor" strokeOpacity=".18" />
              <line x1="200" y1="60" x2="200" y2="180" stroke="currentColor" strokeOpacity=".5" strokeWidth="1.5" />
              <line x1="200" y1="280" x2="200" y2="400" stroke="currentColor" strokeOpacity=".5" strokeWidth="1.5" />
              <line x1="40" y1="230" x2="150" y2="230" stroke="currentColor" strokeOpacity=".5" strokeWidth="1.5" />
              <line x1="250" y1="230" x2="360" y2="230" stroke="currentColor" strokeOpacity=".5" strokeWidth="1.5" />
              <circle cx="200" cy="230" r="4" fill="currentColor" opacity=".9" />
              <text x="212" y="220" fill="currentColor" fontFamily="var(--font-mono), monospace" fontSize="9" letterSpacing="1">
                STATUS: COMPILED
              </text>
              <text x="212" y="245" fill="currentColor" fontFamily="var(--font-mono), monospace" fontSize="9" opacity=".75">
                FPS: {fps} // STABLE
              </text>
            </svg>
            <div className="vf-tag chamfer">
              <span style={{ display: "flex", flexDirection: "column" }}>
                <span className="t-micro" style={{ color: "var(--telemetry)" }}>
                  STATUS BUILD:
                </span>
                <span className="t-lg">&gt; COMPILED // STABLE</span>
              </span>
              <span className="t-micro" style={{ display: "flex", gap: ".4rem", alignItems: "center" }}>
                <span className="dot pulse" />
                TERVERIFIKASI
              </span>
            </div>
          </div>
          <div className="vf-bar">
            <span>PORT: 8080 // HTTPS</span>
            <span>ARCH: X86_64</span>
            <span style={{ color: "var(--emitter)", fontWeight: 700 }}>[AKTIF]</span>
          </div>
        </div>
      </div>
    </section>
  );
}
