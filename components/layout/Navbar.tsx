"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#tentang", label: "01 // Tentang" },
  { href: "#keahlian", label: "02 // Keahlian" },
  { href: "#proyek", label: "03 // Proyek" },
  { href: "#pengalaman", label: "04 // Pengalaman" },
  { href: "#kontak", label: "05 // Kontak" },
];

const SECTORS = ["tentang", "keahlian", "proyek", "pengalaman", "kontak"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#tentang");
  const [prog, setProg] = useState(0);
  // Label indikator seksi aktif (tampil di mode burger, update ikut scroll).
  const curIdx = Math.max(
    0,
    LINKS.findIndex((l) => l.href === active)
  );
  const curLabel = `${String(curIdx + 1).padStart(2, "0")}/05 · ${LINKS[curIdx].label
    .split("// ")[1]
    .toUpperCase()}`;
  // Kunci scrollspy sesaat setelah klik: biar active tidak lompat-lompat
  // melewati seksi perantara saat smooth-scroll berjalan.
  const lock = useRef(0);
  // Hysteresis scrollspy: seksi pemenang sementara + hitungan frame
  // beruntun — cegah menu kedip di perbatasan section.
  const seenRef = useRef(SECTORS[0]);
  const streakRef = useRef(0);

  useEffect(() => {
    let ticking = false;
    let lastProg = -1;
    const onScroll = () => {
      // Pengaman lapis 2: halaman kegeser sedikit saja (mis. habis
      // pencet link navigasi) → dropdown mobile pasti ketutup.
      setOpen(false);
      // Throttle via rAF: scroll bisa menembak puluhan event per frame,
      // cukup sinkronkan state sekali per frame biar scroll tidak patah.
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const p = max > 0 ? Math.round((h.scrollTop / max) * 100) : 0;
        if (p !== lastProg) {
          lastProg = p;
          setProg(p);
        }
        if (Date.now() < lock.current) return;
        // Scrollspy: samakan menu aktif dengan seksi yang sedang terlihat
        // (seksi terakhir yang top-nya < 200px). Pindah aktif hanya bila
        // seksi baru bertahan 4 frame beruntun (hysteresis).
        let cur = SECTORS[0];
        for (const s of SECTORS) {
          const el = document.getElementById(s);
          if (el && el.getBoundingClientRect().top < 200) cur = s;
        }
        if (cur === seenRef.current) {
          streakRef.current += 1;
        } else {
          seenRef.current = cur;
          streakRef.current = 1;
        }
        if (streakRef.current >= 4) {
          setActive((prev) => (prev === `#${cur}` ? prev : `#${cur}`));
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="strip">
      <div className="nav">
        <div className="wrap">
          <nav
            className={`menu ${open ? "open" : ""}`}
            onClick={(e) => {
              // Pengaman lapis 1: tap apa pun di dalam menu yang kena link
              // pasti menutup dropdown (cadangan kalau handler link lolos).
              if ((e.target as HTMLElement).closest("a")) setOpen(false);
            }}
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={active === l.href ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(l.href);
                  setOpen(false);
                  lock.current = Date.now() + 1000;
                  document
                    .querySelector(l.href)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div style={{ display: "flex", gap: ".8rem", alignItems: "center" }}>
            <button
              className="burger"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "[×]" : "[=]"}
            </button>
            <span className="nav-current" aria-live="polite" title="Seksi aktif">
              <span className="dot pulse" />
              <span key={active} className="nav-current-key">
                {curLabel}
              </span>
            </span>
          </div>
        </div>
      </div>
      {/* Bilah progres scroll ala HUD */}
      <span className="scrollprog" style={{ width: `${prog}%` }} aria-hidden="true" />
    </header>
  );
}
