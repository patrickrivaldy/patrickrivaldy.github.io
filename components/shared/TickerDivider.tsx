// Pita data berjalan: 2 sekuen identik selebar viewport → loop -50% selalu mulus.
import LiquidFill from "./LiquidFill";
export default function TickerDivider({
  items = [
    "OBSIDIAN TELEMETRY",
    "SYS_OK",
    "0x3F2A // 0x9C1D",
    "LAT 0.2MS",
    "GHOST//RUN V.4.0",
    "SCROLL LINK STABLE",
    "-6.2 // 106.8",
    "ALL SECTORS CLEAR",
  ],
}: {
  items?: string[];
}) {
  return (
    <div className="ticker" aria-hidden="true">
      <LiquidFill />
      <div className="ticker-track t-micro">
        {[0, 1].map((half) => (
          <div key={half} className="ticker-seq" aria-hidden={half === 1}>
            {items.map((t) => (
              <span key={t} className="ticker-item">
                <span className="ticker-sep">+</span> {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
