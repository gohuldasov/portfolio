import Hero from "./assets/pages/Hero";
import About from "./assets/pages/About";
import Projects from "./assets/pages/Projects";
import Expertise from "./assets/pages/Expertise";
import Experience from "./assets/pages/Experience";
import Education from "./assets/pages/Education";
import Awards from "./assets/pages/Awards";
import Testimonials from "./assets/pages/Testimonials";
import Contact from "./assets/pages/Contact";
import Footer from "./assets/pages/Footer";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import MathBackgroundOverlay from "./components/MathBackgroundOverlay";

const App = () => {
  return (
    <div
      className="relative min-h-screen text-[var(--text)] selection:bg-[var(--primary)] selection:text-white"
      style={{ backgroundColor: "var(--background)" }}
    >
      <MathBackgroundOverlay />
      <CustomCursor />
      <ScrollProgress />
      <Hero />
      <About />
      <Projects />
      <Expertise />
      <Experience />
      <Education />
      <Awards />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;