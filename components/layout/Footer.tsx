"use client";

import LiquidFill from "../shared/LiquidFill";

const NAV = [
  { href: "/#tentang", label: "01 // TENTANG" },
  { href: "/#keahlian", label: "02 // KEAHLIAN" },
  { href: "/#proyek", label: "03 // PROYEK" },
  { href: "/#pengalaman", label: "04 // PENGALAMAN" },
  { href: "/#kontak", label: "05 // KONTAK" },
];

const SOCIAL = [
  { href: "https://github.com", label: "[ GITHUB ]" },
  { href: "https://linkedin.com", label: "[ LINKEDIN ]" },
  { href: "https://x.com", label: "[ X / TWITTER ]" },
];

export default function Footer() {
  return (
    <footer className="foot">
      <LiquidFill />
      <div className="foot-ghost" aria-hidden="true">
        GHOST//RUN
      </div>
      <div className="wrap foot-grid">
        {/* Kolom 1 — identitas */}
        <div className="foot-brand">
          <div className="t-sm foot-id">
            <span className="dot pulse" />
            <span>ANDA DEV // SENIOR CREATIVE TECHNOLOGIST</span>
          </div>
          <p className="t-sm foot-desc">
            Grafis web 3D canggih, sistem latensi rendah, infrastruktur
            komputasi modern.
          </p>
          <div className="chip chamfer foot-status">
            <span className="dot pulse" />
            SYS NOMINAL // ALL SECTORS CLEAR
          </div>
        </div>

        {/* Kolom 2 — navigasi */}
        <nav className="foot-col" aria-label="Navigasi footer">
          <div className="t-micro foot-col-title">NAV_INDEX //</div>
          {NAV.map((l) => (
            <a key={l.href} className="foot-link" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Kolom 3 — transmisi */}
        <div className="foot-col">
          <div className="t-micro foot-col-title">UPLINK //</div>
          {/* GANTI: tautan sosialmu */}
          {SOCIAL.map((l) => (
            <a
              key={l.label}
              className="foot-link"
              href={l.href}
              target="_blank"
              rel="noreferrer"
            >
              {l.label}
            </a>
          ))}
          <button
            className="foot-link foot-btn"
            onClick={() => alert("Terminal interaktif segera hadir.")}
          >
            [ TERMINAL ]
          </button>
          <a className="foot-link foot-mail" href="mailto:halo@namaanda.id">
            halo@namaanda.id
          </a>
        </div>
      </div>

      <div className="wrap">
        <div className="foot-rule" aria-hidden="true" />
        <div className="foot-bot">
          <span>© 2026 ANDA DEV — SELURUH HAK CIPTA DILINDUNGI.</span>
          <span className="foot-telemetry">
            STATUS: 0 ERRORS <i>//</i> RUNTIME: 99.999%
          </span>
        </div>
      </div>
    </footer>
  );
}
