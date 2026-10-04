"use client";

import { useEffect, useState } from "react";

const LINES = [
  "> MOUNTING /dev/ghost0 ............ OK",
  "> LOADING TELEMETRY MATRIX ........ OK",
  "> CALIBRATING OPTICS .............. OK",
  "> ACCESS GRANTED — WELCOME, OPERATOR",
];

// Splash boot ala Ghostrunner. Cepat (±1,6 dtk), dilewati jika reduced-motion.
export default function BootOverlay() {
  // Selalu true saat render pertama (samakan dengan server) → cegah hydration error.
  const [show, setShow] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(false);
      return;
    }
    // Catatan: scroll body TIDAK dikunci — overlay hanya menutup layar,
    // jadi halaman langsung bisa di-scroll/digeser kapan pun.
    const t1 = setTimeout(() => setDone(true), 1350);
    const t2 = setTimeout(() => setShow(false), 1750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className={`boot${done ? " done" : ""}`} aria-hidden="true">
      <div className="boot-box chamfer">
        <div className="t-micro boot-title">
          <span className="dot pulse" /> GHOST//RUN — SYSTEM BOOT
        </div>
        {LINES.map((l, i) => (
          <div
            key={l}
            className="boot-line"
            style={{ animationDelay: `${0.15 + i * 0.28}s` }}
          >
            {l}
          </div>
        ))}
        <div className="boot-bar">
          <i />
        </div>
      </div>
    </div>
  );
}
