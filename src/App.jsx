import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ThemeToggle from './components/ThemeToggle';
import ColorPicker from './components/ColorPicker';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import GitHubHeatmap from './components/GitHubHeatmap';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="h-screen overflow-hidden">
        <div className="scanline-overlay" />
        <CustomCursor />
        
        {/* Terminal-style header */}
        <header className="h-10 bg-bg-secondary border-b border-bg-tertiary flex items-center justify-between px-4">
          <div className="font-mono text-sm text-text-secondary">
            <span className="text-accent">user@portfolio</span>:~$
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="p-1.5 rounded hover:bg-bg-tertiary transition-colors"
              aria-label="Color palette"
            >
              <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </button>
            <ThemeToggle />
          </div>
        </header>

        {showColorPicker && (
          <div className="absolute right-4 top-14 z-50">
            <ColorPicker onClose={() => setShowColorPicker(false)} />
          </div>
        )}

        {/* Main grid layout */}
        <main className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-3 ${isMobile ? 'overflow-auto' : 'overflow-hidden'} h-[calc(100vh-10rem)]`}>
          
          {/* Column 1: Hero + Tech Stack */}
          <div className={`flex flex-col gap-3 ${isMobile ? '' : 'overflow-hidden'}`}>
            <section className="flex-1 bg-bg-secondary border border-bg-tertiary rounded-lg p-4 overflow-auto">
              <Hero compact />
            </section>
            <section className="h-[40%] bg-bg-secondary border border-bg-tertiary rounded-lg p-4 overflow-auto">
              <TechStack compact />
            </section>
          </div>

          {/* Column 2: Projects (hidden on mobile, shown on md+) */}
          <section className="hidden md:flex bg-bg-secondary border border-bg-tertiary rounded-lg p-4 overflow-auto">
            <Projects compact />
          </section>

          {/* Column 3: GitHub + Contact (hidden on mobile, shown on lg+) */}
          <div className="hidden lg:flex flex-col gap-3 overflow-hidden">
            <section className="flex-1 bg-bg-secondary border border-bg-tertiary rounded-lg p-4 overflow-auto">
              <GitHubHeatmap compact />
            </section>
            <section className="h-[45%] bg-bg-secondary border border-bg-tertiary rounded-lg p-4 overflow-auto">
              <Contact compact />
            </section>
          </div>

          {/* Mobile: Additional sections below */}
          {isMobile && (
            <>
              <section className="bg-bg-secondary border border-bg-tertiary rounded-lg p-4">
                <Projects compact />
              </section>
              <section className="bg-bg-secondary border border-bg-tertiary rounded-lg p-4">
                <GitHubHeatmap compact />
              </section>
              <section className="bg-bg-secondary border border-bg-tertiary rounded-lg p-4">
                <Contact compact />
              </section>
            </>
          )}
        </main>

        {/* Footer */}
        <Footer compact />
      </div>
    </AnimatePresence>
  );
}

export default App;
