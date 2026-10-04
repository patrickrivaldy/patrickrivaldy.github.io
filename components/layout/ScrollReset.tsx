"use client";

import { useEffect } from "react";

// Reload / buka ulang halaman selalu mulai dari paling atas,
// bukan melanjutkan posisi scroll sebelumnya (bawaan browser).
export default function ScrollReset() {
  useEffect(() => {
    try {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    } catch {
      /* abaikan */
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);
  return null;
}
