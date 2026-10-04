"use client";

import { useEffect } from "react";

// Di semua device: sudut taktis dinyalakan otomatis saat part-nya masuk
// viewport — efek yang sama seperti :hover (penting untuk layar sentuh
// dan laptop touchscreen yang tetap melaporkan hover:hover).
// Sengaja nyala permanen (tidak toggle mati) agar tidak kedip redup-terang
// saat elemen goyang di batas threshold observer.
const SEL =
  ".card,.proj,.mile,.terminal,.metric,.p-stat,.info-row,.viewfinder,.vf-tag,.p-visual";

export default function ScrollLit() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(SEL));
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("lit"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("lit");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return null;
}
