"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="kontak">
      <div className="wrap contact-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="sec-tag">// Mulai kerjasama // Bagian 05</div>
          <h2 className="glitch-sm" data-text="Hubungi saya & mari berkolaborasi">Hubungi saya &amp; mari berkolaborasi</h2>
          <p style={{ color: "var(--telemetry)" }}>
            Tertarik diskusi peluang kerja, proyek web interaktif standar tinggi,
            atau konsultasi arsitektur? Kirim pesan via formulir.
          </p>
          <div style={{ paddingTop: ".5rem" }}>
            {/* GANTI: email, ketersediaan, waktu respon */}
            <div className="info-row chamfer">
              <span className="t-micro" style={{ color: "var(--wireframe)" }}>
                EMAIL LANGSUNG:
              </span>
              <a className="t-sm" style={{ color: "var(--emitter)", fontWeight: 700 }} href="mailto:halo@namaanda.id">
                halo@namaanda.id
              </a>
            </div>
            <div className="info-row chamfer">
              <span className="t-micro" style={{ color: "var(--wireframe)" }}>
                KETERSEDIAAN:
              </span>
              <span className="t-sm" style={{ color: "var(--emitter)" }}>
                Terbuka Kontrak Q2 / Q3 2026
              </span>
            </div>
            <div className="info-row chamfer">
              <span className="t-micro" style={{ color: "var(--wireframe)" }}>
                WAKTU RESPON:
              </span>
              <span className="t-sm" style={{ color: "var(--emitter)" }}>
                &lt; 24 JAM KERJA
              </span>
            </div>
          </div>
        </div>
        <Reveal>
          <div className="terminal chamfer">
            <div className="term-head">
              <span>■ ■ ■ &nbsp; contact_form.tsx</span>
              <span>ENKRIPSI: TLS 1.3 // HTTPS</span>
            </div>
            {sent ? (
              <p className="t-sm" style={{ color: "var(--emitter)", padding: "2rem 0" }}>
                &gt; TRANSMISI BERHASIL // Pesan terkirim. Saya membalas maksimal
                24 jam kerja.
              </p>
            ) : (
              <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="field">
                  <label>
                    <span>01 // Nama lengkap</span>
                    <span>WAJIB DIISI</span>
                  </label>
                  <input required type="text" placeholder="cth. Alex Pratama / PT Teknologi..." />
                </div>
                <div className="field">
                  <label>
                    <span>02 // Alamat email</span>
                    <span>WAJIB DIISI</span>
                  </label>
                  <input required type="email" placeholder="nama@perusahaan.com" />
                </div>
                <div className="field">
                  <label>
                    <span>03 // Pesan / detail proyek</span>
                    <span>DESKRIPSI PROYEK</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Jelaskan kebutuhan proyek, target waktu, atau kebutuhan arsitektur..."
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    flexWrap: "wrap",
                    paddingTop: "1.2rem",
                  }}
                >
                  <span className="t-micro" style={{ color: "var(--wireframe)" }}>
                    [ Pesan terkirim langsung ke inbox pengembang ]
                  </span>
                  <button className="btn btn-big chamfer-btn" type="submit">
                    <span>KIRIM PESAN</span>
                    <span>➤</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
