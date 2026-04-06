import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Palette, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import ColorPicker from './ColorPicker';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Tech', href: '#tech' },
    { name: 'Projects', href: '#projects' },
    { name: 'GitHub', href: '#github' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-secondary/80 backdrop-blur-md border-b border-bg-tertiary">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="font-mono text-xl font-bold text-accent glitch-hover">
            Portfolio
          </a>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-text-secondary hover:text-accent transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <ThemeToggle />
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors"
              aria-label="Color palette"
            >
              <Palette className="w-5 h-5 text-text-secondary hover:text-accent" />
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors"
            >
              <Palette className="w-5 h-5 text-text-secondary" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors"
            >
              <span className="text-text-secondary">{isMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showColorPicker && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-4 top-16 md:right-auto md:left-1/2 md:-translate-x-1/2"
          >
            <ColorPicker onClose={() => setShowColorPicker(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-secondary border-t border-bg-tertiary"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-text-secondary hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
