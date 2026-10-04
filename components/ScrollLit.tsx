"use client";

import { useEffect } from "react";

// Di semua device: sudut taktis dinyalakan otomatis saat part-nya masuk
// viewport — efek yang sama seperti :hover (penting untuk layar sentuh
// dan laptop touchscreen yang tetap melaporkan hover:hover).
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
        entries.forEach((e) => e.target.classList.toggle("lit", e.isIntersecting)),
      { threshold: 0.2, rootMargin: "-5% 0px -5% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return null;
}
