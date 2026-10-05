import Reveal from "../shared/Reveal";
import LiquidFill from "../shared/LiquidFill";

// GANTI: riwayat karirmu di array ini
const MILES = [
  {
    period: "2021 — SEKARANG",
    status: "// AKTIF",
    loc: "Jakarta & Remote",
    now: true,
    title: "Lead Graphics & Frontend Architect",
    org: "@ SYNTHETICS LAB",
    desc: "Memimpin tim frontend dan grafis spasial, migrasi engine interaktif ke WebGPU, merancang antarmuka untuk jutaan pengguna global.",
    tags: ["[ WebGPU & 3D ]", "[ Manajemen Tim ]", "[ Telemetri Real-time ]"],
  },
  {
    period: "2017 — 2021",
    status: "// SELESAI",
    loc: "Jakarta, ID",
    now: false,
    title: "Senior 3D Web & Frontend Engineer",
    org: "@ APEX DIGITAL",
    desc: "Komponen visual 3D enterprise, optimasi pipeline GLSL shader, pangkas waktu muat aset hingga 60%.",
    tags: ["[ Optimasi Shader ]", "[ React & Three.js ]", "[ Sistem Komponen ]"],
  },
  {
    period: "2013 — 2017",
    status: "// SELESAI",
    loc: "Bandung, ID",
    now: false,
    title: "Core Software & Web Engineer",
    org: "@ VANGUARD TECH",
    desc: "Backend latensi rendah Go + Node.js, dasbor pemantauan performa real-time via WebSockets.",
    tags: ["[ Microservices Go ]", "[ WebSockets ]", "[ Database Terdistribusi ]"],
  },
];

export default function Experience() {
  return (
    <section id="pengalaman">
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div className="sec-head">
          <div>
            <div className="sec-tag">// Rekam jejak profesional // Bagian 04</div>
            <h2 className="glitch-sm" data-text="Pengalaman kerja & histori karir">Pengalaman kerja &amp; histori karir</h2>
          </div>
          <div className="t-sm" style={{ color: "var(--telemetry)" }}>
            PERIODE AKTIF: 2013 — SEKARANG // LEVEL SENIOR
          </div>
        </div>
        <div>
          {MILES.map((m) => (
            <Reveal key={m.period}>
              <div className={`mile chamfer${m.now ? " now" : ""}`}>
                <LiquidFill />
                <div>
                  <span className="date-chip chamfer">{m.period}</span>
                  <br />
                  <small style={{ display: "block", paddingTop: ".5rem" }}>{m.status}</small>
                  <br />
                  <small>{m.loc}</small>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: ".5rem", flexWrap: "wrap" }}>
                    <h3>{m.title}</h3>
                    <small>{m.org}</small>
                  </div>
                  <p style={{ color: "var(--telemetry)", padding: ".5rem 0" }}>{m.desc}</p>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    {m.tags.map((t) => (
                      <small key={t}>{t}</small>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
