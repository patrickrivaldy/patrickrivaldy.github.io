"use client";

import { useEffect, useRef, useState } from "react";

// Kursor minimalist ala Ghostrunner: tanda plus + titik tengah.
// Aktif hanya di perangkat pointer presisi (mouse).
// Mode target: saat hover tombol, 4 tangkai menempel ke tepi tombol
// seperti reticle lock-on (snap + lerp per frame, tanpa lib tambahan).
export default function CrosshairCursor() {
  const ref = useRef<HTMLDivElement>(null);
  // Aktif hanya di mouse + layar besar. Render pertama selalu false
  // (samakan dengan server) → cegah hydration error. Dengarkan perubahan
  // (resize/rotasi) supaya kursor mati total saat layar mengecil.
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer:fine) and (min-width:1024px)");
    const apply = () => setFine(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!fine) return;
    const el = ref.current;
    if (!el) return;
    document.body.classList.add("cur-ghost");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;
    let seen = false;
    let frame = 0;
    // Posisi braket sudut (sinkron dengan CSS) + target lock-on.
    const corners: Record<string, HTMLElement | null> = {
      tl: el.querySelector(".cur-c.tl"),
      tr: el.querySelector(".cur-c.tr"),
      br: el.querySelector(".cur-c.br"),
      bl: el.querySelector(".cur-c.bl"),
    };
    const cpos: Record<string, { t: number; l: number }> = {
      tl: { t: -6, l: -6 },
      tr: { t: -6, l: -6 },
      br: { t: -6, l: -6 },
      bl: { t: -6, l: -6 },
    };
    let target: HTMLElement | null = null;
    // Bersihkan lock: copot listener, hapus atribut. Satu-satunya jalan
    // keluar mode target — semua jalur (move, poll, scroll, leave) lewat sini.
    const onTargetLeave = () => clearTarget();
    function clearTarget() {
      if (target) target.removeEventListener("mouseleave", onTargetLeave);
      target = null;
      el?.removeAttribute("data-target");
    }

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        seen = true;
        el.style.opacity = "1";
      }
      const t = (e.target as HTMLElement | null)?.closest?.(
        "a, button, input, textarea, select, [role='button']"
      );
      // Lock-on hanya untuk tombol (bentuk plus tetap, tangkai yang gerak).
      const b = (e.target as HTMLElement | null)?.closest?.(
        "button, a.btn, [role='button']"
      ) as HTMLElement | null;
      // Mode target ganti mode hover (scale box bikin frame meleset).
      if (b) {
        if (target !== b) {
          clearTarget();
          target = b;
          // mouseleave fire walau tanpa mousemove (mis. pas scroll).
          target.addEventListener("mouseleave", onTargetLeave);
        }
        el.setAttribute("data-target", "1");
        el.removeAttribute("data-hover");
      } else {
        clearTarget();
        if (t) el.setAttribute("data-hover", "1");
        else el.removeAttribute("data-hover");
      }
    };
    // Scroll tanpa gerak mouse: cek apakah kursor masih di atas tombol.
    const onScrollCheck = () => {
      if (!target) return;
      const under = document.elementFromPoint(tx, ty);
      const still = (under as HTMLElement | null)?.closest?.(
        "button, a.btn, [role='button']"
      );
      if (still !== target) clearTarget();
    };
    const onDown = () => el.setAttribute("data-down", "1");
    const onUp = () => el.removeAttribute("data-down");
    const onLeave = () => (el.style.opacity = "0");
    const onEnter = () => {
      if (seen) el.style.opacity = "1";
    };
    const loop = () => {
      x += (tx - x) * 0.4;
      y += (ty - y) * 0.4;
      el.style.transform = `translate(${x}px, ${y}px)`;
      // Validasi ulang berkala: mouse diam + scroll / DOM berubah bisa
      // bikin target nyangkut (muter terus) tanpa mousemove baru.
      frame++;
      if (frame % 12 === 0) {
        const under = document.elementFromPoint(tx, ty);
        const b = (under as HTMLElement | null)?.closest?.(
          "button, a.btn, [role='button']"
        ) as HTMLElement | null;
        if (b !== target) {
          clearTarget();
          if (b) {
            target = b;
            target.addEventListener("mouseleave", onTargetLeave);
            el.setAttribute("data-target", "1");
          }
        }
      }
      // Braket nempel ke 4 sudut tombol (frame-nya yang muter, plek contoh).
      if (target && target.isConnected) {
        const r = target.getBoundingClientRect();
        const goal: Record<string, { t: number; l: number }> = {
          tl: { t: r.top - y - 6, l: r.left - x - 6 },
          tr: { t: r.top - y - 6, l: r.right - x - 6 },
          br: { t: r.bottom - y - 6, l: r.right - x - 6 },
          bl: { t: r.bottom - y - 6, l: r.left - x - 6 },
        };
        (Object.keys(corners) as (keyof typeof corners)[]).forEach((k) => {
          const c = corners[k];
          if (!c) return;
          const p = cpos[k];
          const g = goal[k];
          p.t += (g.t - p.t) * 0.25;
          p.l += (g.l - p.l) * 0.25;
          c.style.top = `${p.t}px`;
          c.style.left = `${p.l}px`;
        });
      } else {
        clearTarget();
        (Object.keys(corners) as (keyof typeof corners)[]).forEach((k) => {
          corners[k]?.removeAttribute("style");
        });
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("scroll", onScrollCheck, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      clearTarget();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("scroll", onScrollCheck);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("cur-ghost");
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <div ref={ref} className="cur-cross" aria-hidden="true">
      <span className="cur-box">
        <span className="cur-pt" />
        <span className="cur-pb" />
        <span className="cur-pl" />
        <span className="cur-pr" />
        <span className="cur-dot" />
      </span>
      <span className="cur-frame" aria-hidden="true">
        <span className="cur-c tl" />
        <span className="cur-c tr" />
        <span className="cur-c br" />
        <span className="cur-c bl" />
      </span>
    </div>
  );
}
