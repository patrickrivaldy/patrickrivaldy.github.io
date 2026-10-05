import Reveal from "../shared/Reveal";
import LiquidFill from "../shared/LiquidFill";

type Project = {
  code: string;
  year: string;
  tag: string;
  overlay: string;
  title: string;
  desc: string;
  stats: { label: string; value: string }[];
  tags: string[];
  scene: React.ReactNode;
};

// GANTI: 3 objek di bawah dengan proyek aslimu (judul, deskripsi, metrik, tag)
const PROJECTS: Project[] = [
  {
    code: "PROJ-SURVEILLANCE",
    year: "2024",
    tag: "// PROJ_SURVEILLANCE_v3.2",
    overlay: "RENDER: 2.4JT PARTIKEL GPU",
    title: "Visualisasi data spasial 3D & telemetri real-time",
    desc: "Platform pemantauan interaktif yang merender jutaan partikel spasial dinamis via WebGL dengan latensi sub-detik.",
    stats: [
      { label: "FRAME", value: "60 FPS" },
      { label: "MEMORI", value: "RINGAN" },
      { label: "PROTOKOL", value: "WEBSOCKET" },
    ],
    tags: ["Three.js", "WGSL", "WebSockets"],
    scene: (
      <svg className="scene" style={{ color: "var(--emitter)" }} viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="225" className="th-stage" />
        <g stroke="#4E535A" strokeWidth=".7" opacity=".8">
          <path d="M0 180 L60 140 L120 150 L180 90 L240 110 L300 50 L400 70" fill="none" />
          <path d="M0 190 L80 160 L160 165 L240 120 L320 90 L400 100" fill="none" opacity=".5" />
        </g>
        <g fill="currentColor" opacity=".85">
          <circle cx="60" cy="140" r="2" />
          <circle cx="180" cy="90" r="2.5" />
          <circle cx="300" cy="50" r="2" />
        </g>
        <g fontFamily="var(--font-mono), monospace" fontSize="8" fill="#9BA1A6">
          <text x="12" y="20">GRID.SPATIAL // 2.4M PTS</text>
          <text x="12" y="212">LAT: -6.2 LON: 106.8</text>
        </g>
      </svg>
    ),
  },
  {
    code: "ENGINE-LOWLATENCY",
    year: "2023",
    tag: "// ENGINE_LOWLATENCY",
    overlay: "THROUGHPUT: 420K OPS/SEC",
    title: "Mesin transaksi & order-matching kecepatan tinggi",
    desc: "Arsitektur transaksi deterministik dengan WebAssembly dan ring buffer untuk analitik keuangan langsung.",
    stats: [
      { label: "KAPASITAS", value: "420K OPS" },
      { label: "LATENSI P99", value: "< 0.12 MS" },
      { label: "AKURASI", value: "100%" },
    ],
    tags: ["Rust Core", "WASM", "Ring Buffers"],
    scene: (
      <svg className="scene" style={{ color: "var(--emitter)" }} viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="225" className="th-stage" />
        <g stroke="currentColor" strokeWidth="1" opacity=".9">
          <path d="M10 200 L60 120 L110 140 L170 60 L230 90 L290 30 L350 50 L390 20" fill="none" />
        </g>
        <g stroke="#4E535A">
          <line x1="0" y1="180" x2="400" y2="180" />
          <line x1="0" y1="140" x2="400" y2="140" opacity=".5" />
        </g>
        <g fontFamily="var(--font-mono), monospace" fontSize="8" fill="#9BA1A6">
          <text x="12" y="20">ENGINE.MATCH // 420K OPS</text>
          <text x="12" y="212">P99 &lt; 0.12MS</text>
        </g>
      </svg>
    ),
  },
  {
    code: "NEURAL-SWARM",
    year: "2022",
    tag: "// NEURAL_SWARM",
    overlay: "NODES: 8,192 AGEN AKTIF",
    title: "Simulasi kawanan multi-agent berbasis WebGPU",
    desc: "Lingkungan simulasi agen otonom berskala besar di browser untuk koordinasi dinamis dan optimasi partikel.",
    stats: [
      { label: "KAWANAN", value: "8,192 Agen" },
      { label: "HITUNG", value: "1.4 MS" },
      { label: "SINKRON", value: "99.9%" },
    ],
    tags: ["WebGPU Compute", "GLSL", "Terdistribusi"],
    scene: (
      <svg className="scene" style={{ color: "var(--emitter)" }} viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="225" className="th-stage" />
        <g fill="currentColor">
          <circle cx="80" cy="120" r="1.6" opacity=".9" />
          <circle cx="160" cy="130" r="1.8" />
          <circle cx="240" cy="120" r="2" />
          <circle cx="320" cy="130" r="1.7" />
        </g>
        <g stroke="#4E535A" opacity=".6">
          <line x1="80" y1="120" x2="160" y2="130" />
          <line x1="160" y1="130" x2="240" y2="120" />
          <line x1="240" y1="120" x2="320" y2="130" />
        </g>
        <g fontFamily="var(--font-mono), monospace" fontSize="8" fill="#9BA1A6">
          <text x="12" y="20">SWARM.SIM // 8192 AGENTS</text>
          <text x="12" y="212">COMPUTE: 1.4MS // WEBGPU</text>
        </g>
      </svg>
    ),
  },
];

export default function Projects() {
  return (
    <section id="proyek">
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div className="sec-head">
          <div>
            <div className="sec-tag">// Daftar karya // Bagian 03</div>
            <h2 className="glitch-sm" data-text="Proyek unggulan & studi kasus">Proyek unggulan &amp; studi kasus</h2>
          </div>
          <div className="t-sm" style={{ color: "var(--telemetry)" }}>
            STATUS: ARSIP PRODUKSI / <b style={{ color: "var(--emitter)" }}>[ 3 PROYEK AKTIF ]</b>
          </div>
        </div>
        <div>
          {PROJECTS.map((p) => (
            <Reveal key={p.code}>
              <article className="proj chamfer">
                <LiquidFill />
                <div className="p-visual chamfer">
                  {p.scene}
                  <div className="scan" />
                  <div className="p-overlay-top">
                    <span className="dot pulse" />
                    {p.tag}
                  </div>
                  <div className="p-overlay-bot">{p.overlay}</div>
                </div>
                <div className="p-body">
                  <div className="p-meta">
                    <span>[ KODE: {p.code} ]</span>
                    <b>DIPUBLIKASIKAN // {p.year}</b>
                  </div>
                  <h3 style={{ textTransform: "uppercase" }}>{p.title}</h3>
                  <p style={{ color: "var(--telemetry)" }}>{p.desc}</p>
                  <div className="p-stats">
                    {p.stats.map((s) => (
                      <div key={s.label} className="p-stat">
                        <LiquidFill />
                        <span className="t-micro" style={{ color: "var(--wireframe)" }}>
                          {s.label}
                        </span>
                        <br />
                        <span className="t-sm" style={{ color: "var(--emitter)" }}>
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="p-foot">
                    <div className="tags" style={{ padding: 0 }}>
                      {p.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <a className="btn btn-big chamfer-btn" href="#kontak">
                      <span>LIHAT DETAIL PROYEK</span>
                      <span>➤</span>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
