import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Folder, Mail, Wrench, BarChart3, ExternalLink, Github, Linkedin, Twitter, Copy, Check } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import ColorPicker from './components/ColorPicker';
import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import GitHubHeatmap from './components/GitHubHeatmap';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { projects } from './data/projects';
import { techStack } from './data/techStack';
import { socialLinks } from './data/socialLinks';

const tabs = [
  { id: 'projects', label: '📁 PROJECTS', icon: Folder },
  { id: 'contact', label: '📬 CONTACT', icon: Mail },
  { id: 'tech', label: '🛠️ TECH', icon: Wrench },
  { id: 'stats', label: '📊 STATS', icon: BarChart3 },
];

const iconMap = { Github, Linkedin, Twitter, Mail };

const isDev = process.env.NODE_ENV === 'development';

function Dashboard() {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('activeDashboardTab') || 'projects';
    }
    return 'projects';
  });
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const tabRefs = useRef({});
  const contentRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    localStorage.setItem('activeDashboardTab', activeTab);
    if (isDev) console.log(`[Dashboard] Tab switched to: ${activeTab}`);
  }, [activeTab]);

  useEffect(() => {
    if (contentRef.current) {
      const firstInteractive = contentRef.current.querySelector('a, button');
      if (firstInteractive) firstInteractive.focus();
    }
  }, [activeTab]);

  const handleTabKeyDown = (e, tabId, idx) => {
    let newIdx = idx;
    if (e.key === 'ArrowRight') {
      newIdx = (idx + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIdx = (idx - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tabId);
      return;
    } else {
      return;
    }
    e.preventDefault();
    const newTabId = tabs[newIdx].id;
    setActiveTab(newTabId);
    tabRefs.current[newTabId]?.focus();
  };

  const handleCopyEmail = () => {
    const email = socialLinks.find(l => l.icon === 'Mail')?.url.replace('mailto:', '') || 'your@email.com';
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects-grid');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const renderTabContent = () => {
    const isEmpty = projects.length === 0;

    switch (activeTab) {
      case 'projects':
        return (
          <div className="space-y-2">
            {isEmpty ? (
              <div className="text-center py-4 text-text-secondary text-sm font-mono">
                No projects yet. Add some in projects.js
              </div>
            ) : (
              projects.map(project => (
                <a
                  key={project.id}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 bg-bg-tertiary rounded hover:border-accent border border-transparent transition-colors"
                >
                  <span className="text-sm font-mono text-text-primary">{project.title}</span>
                  <ExternalLink className="w-4 h-4 text-text-secondary" />
                </a>
              ))
            )}
            {!isEmpty && (
              <button
                onClick={scrollToProjects}
                className="block text-center text-xs text-accent hover:underline mt-3 font-mono cursor-pointer"
              >
                [ View All Projects ]
              </button>
            )}
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-3">
            {socialLinks.map(link => {
              const Icon = iconMap[link.icon] || Mail;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 bg-bg-tertiary rounded hover:border-accent border border-transparent transition-colors"
                >
                  <Icon className="w-4 h-4 text-accent" />
                  <span className="text-sm text-text-primary">{link.name}</span>
                </a>
              );
            })}
            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-center gap-2 w-full p-2 bg-bg-tertiary rounded hover:border-accent border border-transparent transition-colors font-mono text-sm"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-text-secondary" />}
              <span className="text-text-secondary">{copied ? 'Copied!' : 'Copy Email'}</span>
            </button>
          </div>
        );

      case 'tech':
        return (
          <div className="grid grid-cols-2 gap-2">
            {techStack.map((tech, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-bg-tertiary rounded text-xs">
                <span className="text-accent">●</span>
                <span className="text-text-primary font-mono truncate">{tech.name}</span>
              </div>
            ))}
          </div>
        );

      case 'stats':
        const projectCount = isEmpty ? '00' : String(projects.length).padStart(2, '0');
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-bg-tertiary rounded">
              <span className="text-sm text-text-secondary font-mono">Total Projects</span>
              <span className="text-xl text-accent font-bold">{projectCount}</span>
            </div>
            {isEmpty ? (
              <div className="p-2 bg-bg-tertiary rounded text-center text-text-secondary text-sm font-mono">
                No contribution data yet
              </div>
            ) : (
              <div className="p-2 bg-bg-tertiary rounded">
                <p className="text-xs text-text-secondary font-mono mb-2">Contributions (20w)</p>
                <GitHubHeatmap compact />
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const TabButton = ({ tab, idx, className = '' }) => {
    const Icon = tab.icon;
    return (
      <button
        ref={el => tabRefs.current[tab.id] = el}
        data-tab={tab.id}
        role="tab"
        aria-selected={activeTab === tab.id}
        aria-controls={`tabpanel-${tab.id}`}
        tabIndex={activeTab === tab.id ? 0 : -1}
        onClick={() => setActiveTab(tab.id)}
        onKeyDown={(e) => handleTabKeyDown(e, tab.id, idx)}
        className={`flex items-center gap-1.5 px-3 py-2 font-mono text-xs transition-colors relative whitespace-nowrap outline-none hover:border-accent border border-transparent ${className} ${
          activeTab === tab.id
            ? 'text-accent'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        <Icon className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{tab.label.split(' ')[1]}</span>
        {activeTab === tab.id && (
          <motion.div
            layoutId="activeTab"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </button>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {isMobile ? (
        <div className="fixed bottom-0 left-0 right-0 bg-bg-secondary border-t border-bg-tertiary z-40 px-2 py-1 flex justify-around items-center shadow-lg">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-mono text-accent">DASHBOARD</span>
          </div>
          {tabs.map((tab, idx) => (
            <TabButton key={tab.id} tab={tab} idx={idx} className="py-3" />
          ))}
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-mono text-accent">DASHBOARD</span>
          </div>
          <div className="flex border-b border-bg-tertiary mb-3 overflow-x-auto" role="tablist">
            {tabs.map((tab, idx) => (
              <TabButton key={tab.id} tab={tab} idx={idx} />
            ))}
          </div>
        </>
      )}

      <div 
        ref={contentRef}
        className={`flex-1 overflow-auto ${isMobile ? 'pb-20' : ''}`} 
        role="tabpanel" 
        id={`tabpanel-${activeTab}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function App() {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projectCount = projects.length === 0 ? '00' : String(projects.length).padStart(2, '0');

  return (
    <AnimatePresence mode="wait">
      <div className="h-screen overflow-hidden">
        <div className="scanline-overlay" />
        <CustomCursor />
        
        {/* Terminal-style header */}
        <header className="h-12 bg-bg-secondary border-b border-bg-tertiary flex items-center justify-between px-4">
          {/* Left: Name placeholder */}
          <div className="font-mono text-sm text-accent">
            [YOUR NAME]
          </div>
          
          {/* Center: Projects counter - shows 00 if empty */}
          <div className="font-mono text-sm text-text-secondary">
            PROJECTS: <span className="text-accent">{projectCount}</span>
          </div>
          
          {/* Right: Controls */}
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
        {/* Column widths: ~30% / 40% / 30% balanced distribution */}
        {/* Account for mobile floating tabs with pb-20 on content */}
        <main className={`grid lg:grid-cols-[30%_40%_30%] grid-cols-1 md:grid-cols-2 gap-3 p-3 ${isMobile ? 'overflow-auto' : 'overflow-hidden'} h-[calc(100vh-3rem)]`}>
          
          {/* Column 1: Hero + Tech Stack (30%) */}
          <div className={`flex flex-col gap-3 ${isMobile ? '' : 'overflow-hidden'}`}>
            <section className="flex-1 bg-bg-secondary border border-bg-tertiary rounded-lg p-4 overflow-auto">
              <Hero compact />
            </section>
            <section className="h-[40%] bg-bg-secondary border border-bg-tertiary rounded-lg p-4 overflow-auto">
              <TechStack compact />
            </section>
          </div>

          {/* Column 2: Projects Grid (40%) - id="projects-grid" for View All scroll */}
          <section id="projects-grid" className="hidden md:flex bg-bg-secondary border border-bg-tertiary rounded-lg p-4 overflow-auto">
            <Projects compact />
          </section>

          {/* Column 3: Tabbed Dashboard (30%) */}
          <div className={`hidden lg:flex bg-bg-secondary border border-bg-tertiary rounded-lg p-4 overflow-hidden`}>
            <Dashboard />
          </div>

          {/* Mobile: Additional sections below */}
          {isMobile && (
            <>
              <section className="bg-bg-secondary border border-bg-tertiary rounded-lg p-4 pb-24">
                <Projects compact />
              </section>
              <section className="bg-bg-secondary border border-bg-tertiary rounded-lg p-4">
                <Dashboard />
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
