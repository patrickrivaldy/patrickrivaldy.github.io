"use client";

import Link from "next/link";
import BootOverlay from "../../components/layout/BootOverlay";
import ScrollReset from "../../components/layout/ScrollReset";
import LiquidFill from "../../components/shared/LiquidFill";

// GANTI: isi dengan data aslimu. Halaman ini siap cetak → "Simpan sebagai PDF".
export default function CVPage() {
  return (
    <div className="cv-sheet">
      <BootOverlay />
      <ScrollReset />
      <div className="wrap cv-inner">
        <div className="cv-actions print-hide">
          <Link className="btn btn-ghost chamfer-btn" href="/">
            ← KEMBALI
          </Link>
          <button
            className="btn btn-big chamfer-btn"
            onClick={() => window.print()}
          >
            <span>CETAK / SIMPAN PDF</span>
          </button>
        </div>

        <div className="cv-paper chamfer">
          <LiquidFill />
          <div className="cv-head">
            <div>
              <div className="t-micro" style={{ color: "var(--telemetry)" }}>
                CURRICULUM VITAE // REV_04
              </div>
              <h2>ANDA DEV</h2>
              <div className="t-sm" style={{ color: "var(--telemetry)" }}>
                SENIOR SOFTWARE ENGINEER &amp; CREATIVE TECHNOLOGIST
              </div>
            </div>
            <div className="t-sm cv-contact">
              <span>halo@namaanda.id</span>
              <span>JAKARTA, ID // REMOTE</span>
              <span>github.com/anda-dev</span>
            </div>
          </div>

          <div className="cv-sec">
            <div className="t-sm cv-sec-title">[ 01 // RINGKASAN ]</div>
            <p>
              Senior Software Engineer dengan 10+ tahun pengalaman membangun
              grafis web interaktif (WebGL/WebGPU), sistem backend latensi
              rendah, dan infrastruktur cloud modern untuk jutaan pengguna.
            </p>
          </div>

          <div className="cv-sec">
            <div className="t-sm cv-sec-title">[ 02 // KEAHLIAN ]</div>
            <p>
              <b>Frontend &amp; 3D:</b> Three.js, WebGPU, GLSL, Next.js/React,
              Tailwind CSS
              <br />
              <b>Backend:</b> Go, Rust, Node.js, WebSockets, gRPC, PostgreSQL
              <br />
              <b>Infra:</b> Docker, Kubernetes, Terraform, Cloudflare, CI/CD
            </p>
          </div>

          <div className="cv-sec">
            <div className="t-sm cv-sec-title">[ 03 // PENGALAMAN ]</div>
            <p>
              <b>2021 — SEKARANG · Lead Graphics &amp; Frontend Architect @
              SYNTHETICS LAB</b>
              <br />
              Memimpin tim frontend &amp; grafis spasial; migrasi engine ke
              WebGPU untuk jutaan pengguna global.
            </p>
            <p>
              <b>2017 — 2021 · Senior 3D Web &amp; Frontend Engineer @ APEX
              DIGITAL</b>
              <br />
              Visual 3D enterprise; optimasi shader; pangkas waktu muat aset 60%.
            </p>
            <p>
              <b>2013 — 2017 · Core Software &amp; Web Engineer @ VANGUARD
              TECH</b>
              <br />
              Backend latensi rendah Go + Node.js; dasbor real-time WebSockets.
            </p>
          </div>

          <div className="cv-sec">
            <div className="t-sm cv-sec-title">[ 04 // PROYEK PILIHAN ]</div>
            <p>
              <b>Visualisasi Data Spasial 3D (2024)</b> — 2,4jt partikel GPU,
              60 FPS, WebSockets.
              <br />
              <b>Mesin Transaksi Low-Latency (2023)</b> — 420K ops/detik,
              P99 &lt; 0,12ms, Rust+WASM.
              <br />
              <b>Simulasi Multi-Agent WebGPU (2022)</b> — 8.192 agen,
              compute 1,4ms.
            </p>
          </div>

          <div className="cv-foot t-micro">
            DOC_SYS: CV-ANDA-DEV // CETAK VIA BROWSER → SIMPAN SEBAGAI PDF //
            STATUS: VERIFIED
          </div>
        </div>
      </div>
    </div>
  );
}
