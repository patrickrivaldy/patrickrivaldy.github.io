"use client";

import { useEffect, useRef, useState } from "react";

// Kursor minimalist ala Ghostrunner: tanda plus + titik tengah.
// Aktif hanya di perangkat pointer presisi (mouse).
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
      if (t) el.setAttribute("data-hover", "1");
      else el.removeAttribute("data-hover");
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
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
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
    </div>
  );
}
