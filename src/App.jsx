import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import GitHubHeatmap from './components/GitHubHeatmap';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <AnimatePresence mode="wait">
      <div className="min-h-screen">
        <div className="scanline-overlay" />
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <TechStack />
          <Projects />
          <GitHubHeatmap />
          <Contact />
        </main>
        <Footer />
      </div>
    </AnimatePresence>
  );
}

export default App;
