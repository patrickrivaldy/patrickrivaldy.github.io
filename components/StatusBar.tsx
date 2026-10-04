"use client";

import { useEffect, useState } from "react";

const SECTORS = ["tentang", "keahlian", "proyek", "pengalaman", "kontak"];

export default function StatusBar() {
  const [label, setLabel] = useState("SECTOR: TENTANG // SCROLL 0%");
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const tick = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.round((h.scrollTop / max) * 100) : 0;
      let cur = SECTORS[0];
      for (const s of SECTORS) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top < 200) cur = s;
      }
      setLabel(`SECTOR: ${cur.toUpperCase()} // SCROLL ${p}%`);
      setClock(new Date().toLocaleTimeString("id-ID", { hour12: false }));
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    const t = setInterval(tick, 1000);
    return () => {
      window.removeEventListener("scroll", tick);
      clearInterval(t);
    };
  }, []);

  return (
    <div className="statusbar">
      <div className="wrap">
        <span>{label}</span>
        <span>
          BRANCH: MAIN ● CLEAN // UTF-8 // {clock}
        </span>
      </div>
    </div>
  );
}
