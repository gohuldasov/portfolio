import { useState } from "react";
import Hero from "./assets/pages/Hero";
import Navbar from "./assets/pages/Navbar";
import About from "./assets/pages/About";
import Projects from "./assets/pages/Projects";
import Expertise from "./assets/pages/Expertise";
import Experience from "./assets/pages/Experience";
import Awards from "./assets/pages/Awards";
import Testimonials from "./assets/pages/Testimonials";
import Contact from "./assets/pages/Contact";
import Footer from "./assets/pages/Footer";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import IntroOverlay from "./components/IntroOverlay";

const App = () => {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="min-h-screen bg-transparent text-white font-sans selection:bg-[#8b5cf6] selection:text-white">
      <CustomCursor />

      {/* Anime intro — shown until user scrolls/clicks */}
      {!introComplete && (
        <IntroOverlay onComplete={() => setIntroComplete(true)} />
      )}

      {/* Main site — always mounted so GSAP / ScrollTrigger initialises */}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: "opacity 0.5s ease 0.1s",
          pointerEvents: introComplete ? "auto" : "none"
        }}
      >
        <Navbar />
        <ScrollProgress />
        <Hero />
        <About />
        <Projects />
        <Expertise />
        <Experience />
        <Awards />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default App