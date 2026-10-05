"use client";

import dynamic from "next/dynamic";

// Lapisan Liquid Glass (liquid-glass-react) yang menutupi penuh elemen induk.
// Dipasang sebagai child PERTAMA di dalam panel kaca: di bawah konten
// (z-index negatif) dan tidak menerima pointer, sehingga DOM, layout,
// konten, dan perilaku panel tidak berubah sama sekali.
const LiquidGlass = dynamic(() => import("liquid-glass-react"), {
  ssr: false,
});

export default function LiquidFill() {
  return (
    <LiquidGlass
      className="liquid-fill"
      cornerRadius={0}
      padding="0"
      elasticity={0.12}
      displacementScale={50}
      blurAmount={0.08}
      saturation={135}
      aberrationIntensity={1.5}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100%",
        height: "100%",
      }}
    >
      <></>
    </LiquidGlass>
  );
}
