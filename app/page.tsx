import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import BootOverlay from "../components/BootOverlay";
import TickerDivider from "../components/TickerDivider";
import CrosshairCursor from "../components/CrosshairCursor";
import AmbientCanvas from "../components/AmbientCanvas";
import ScrollLit from "../components/ScrollLit";
import ScrollReset from "../components/ScrollReset";

export default function Page() {
  return (
    <>
      <BootOverlay />
      <ScrollReset />
      <CrosshairCursor />
      <ScrollLit />
      <div className="bg-fx" aria-hidden="true">
        <AmbientCanvas />
        <div className="beam b1" />
        <div className="beam b2" />
        <div className="sweep" />
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
