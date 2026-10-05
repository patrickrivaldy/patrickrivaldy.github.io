import Reveal from "../shared/Reveal";
import LiquidFill from "../shared/LiquidFill";

const SKILLS = [
  {
    idx: "[ 01 // GRAFIS & FRONTEND 3D ]",
    icon: "◈",
    title: "WebGL, WebGPU & Grafis Interaktif",
    desc: "Visual web 3D dinamis, shader GLSL custom, animasi terakselerasi GPU, pengalaman 60+ FPS.",
    metaLabel: "TARGET RENDER",
    metaValue: "60+ FPS // GPU",
    tags: ["Three.js", "WebGPU", "GLSL Shaders", "Next.js / React", "Tailwind"],
  },
  {
    idx: "[ 02 // BACKEND & DISTRIBUSI ]",
    icon: "▦",
    title: "Arsitektur Backend & Engine Kecepatan Tinggi",
    desc: "Pipeline real-time, microservices konkurensi tinggi, memori efisien, streaming instan.",
    metaLabel: "LATENSI P99",
    metaValue: "< 0.22 MS DELTA",
    tags: ["Go", "Rust", "Node.js", "WebSockets", "gRPC", "PostgreSQL"],
  },
  {
    idx: "[ 03 // CLOUD & INFRA ]",
    icon: "⬡",
    title: "Infrastruktur Cloud & DevOps",
    desc: "Orkestrasi Kubernetes, CI/CD zero-downtime, pemantauan produksi real-time.",
    metaLabel: "KAPASITAS",
    metaValue: "1.4 TBPS CLOUD",
    tags: ["Docker", "Kubernetes", "Terraform", "Cloudflare", "CI/CD"],
  },
];

export default function Skills() {
  return (
    <section id="keahlian">
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div className="sec-head">
          <div>
            <div className="sec-tag">// Spesifikasi teknologi // Bagian 02</div>
            <h2 className="glitch-sm" data-text="Keahlian utama & stack pengembang">Keahlian utama &amp; stack pengembang</h2>
          </div>
          <p className="t-sm" style={{ color: "var(--telemetry)", maxWidth: "22rem" }}>
            Kombinasi grafis interaktif, backend terdistribusi, dan otomasi cloud.
          </p>
        </div>
        <div className="grid3">
          {SKILLS.map((s) => (
            <Reveal key={s.idx}>
              <div className="card chamfer" style={{ height: "100%" }}>
                <LiquidFill />
                <div style={{ display: "flex", flexDirection: "column", gap: ".8rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="idx">{s.idx}</span>
                    <span style={{ color: "var(--telemetry)" }}>{s.icon}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p style={{ color: "var(--telemetry)" }}>{s.desc}</p>
                  <div className="mini chamfer">
                    <span style={{ display: "flex", flexDirection: "column" }}>
                      <span className="t-micro" style={{ color: "var(--wireframe)" }}>
                        {s.metaLabel}
                      </span>
                      <span className="t-sm" style={{ color: "var(--emitter)" }}>
                        {s.metaValue}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="tags">
                  {s.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
