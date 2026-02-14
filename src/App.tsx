import Hero from "./assets/pages/Hero";
import Navbar from "./assets/pages/Navbar";
import About from "./assets/pages/About";
import Projects from "./assets/pages/Projects";
import Expertise from "./assets/pages/Expertise";
import Testimonials from "./assets/pages/Testimonials";
import Contact from "./assets/pages/Contact";
import Footer from "./assets/pages/Footer";

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#a3e635] selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Projects Section */}
      <Projects />

      {/* Expertise Section */}
      <Expertise />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section */}
      <Contact />

      {/* Footer Section */}
      <Footer />

    </div>
  )
}

export default App