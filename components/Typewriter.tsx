"use client";

import { useEffect, useState } from "react";

// Efek ketik ala terminal + kursor blok berkedip. Menghormati prefers-reduced-motion.
export default function Typewriter({
  text,
  speed = 34,
  className = "",
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(text.length);
      return;
    }
    if (n >= text.length) return;
    const t = setTimeout(() => setN((v) => v + 1), speed);
    return () => clearTimeout(t);
  }, [n, text, speed]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, n)}</span>
      <span className="tw-cursor" aria-hidden="true">
        ▊
      </span>
    </span>
  );
}
