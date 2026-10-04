import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Contact from "../components/sections/Contact";
import Footer from "../components/layout/Footer";
import BootOverlay from "../components/layout/BootOverlay";
import TickerDivider from "../components/shared/TickerDivider";
import CrosshairCursor from "../components/effects/CrosshairCursor";
import ShapeGrid from "../components/effects/ShapeGrid";
import ScrollLit from "../components/effects/ScrollLit";
import ScrollReset from "../components/layout/ScrollReset";

export default function Page() {
  return (
    <>
      <BootOverlay />
      <ScrollReset />
      <CrosshairCursor />
      <ScrollLit />
      <div className="bg-fx" aria-hidden="true">
        <ShapeGrid
          direction="diagonal"
          speed={0.5}
          borderColor="rgba(240,242,245,0.08)"
          squareSize={60}
          hoverFillColor="rgba(240,242,245,0.14)"
          shape="square"
          hoverTrailAmount={0}
        />
        <div className="beam b1" />
        <div className="beam b2" />
      </div>
      <Navbar />
      <main>
        <Hero />
        <TickerDivider />
        <Skills />
        <Projects />
        <TickerDivider
          items={[
            "UPLINK STABLE",
            "DEPLOYED",
            "0x77B1 // 0x0FF4",
            "99.99% NOMINAL",
            "GHOST//RUN V.4.0",
            "NO ERRORS",
            "JKT // REMOTE",
            "END OF LINE",
          ]}
        />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
