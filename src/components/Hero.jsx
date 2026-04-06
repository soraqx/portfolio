import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero({ compact = false }) {
  const [text, setText] = useState('');
  const fullText = 'Full Stack Developer';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full flex items-center">
      <div className={`${compact ? 'w-full' : 'max-w-[1200px]'} mx-auto px-2 text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-mono text-accent text-xs mb-2">
            // TODO: Replace with your greeting
          </p>
          <h1 className={`font-mono font-bold mb-2 glitch-hover ${compact ? 'text-2xl' : 'text-4xl sm:text-5xl md:text-6xl'}`}>
            {/* TODO: Replace with your name */}
            Your Name
          </h1>
          <p className={`font-mono text-text-secondary mb-3 h-5 ${compact ? 'text-sm' : 'text-xl sm:text-2xl'}`}>
            {text}<span className="animate-pulse">|</span>
          </p>
          <p className={`text-text-secondary mx-auto mb-3 ${compact ? 'text-xs max-w-sm line-clamp-2' : 'text-base max-w-lg'}`}>
            {/* TODO: Replace with your bio */}
            Building digital experiences with code. Edit this text to add your own bio.
          </p>
          <div className={`flex gap-2 justify-center ${compact ? 'flex-row' : 'flex-col sm:flex-row'}`}>
            <a
              href="#projects"
              className={`bg-accent text-bg-primary font-mono font-medium rounded hover:opacity-80 transition-opacity ${compact ? 'px-3 py-1.5 text-xs' : 'px-6 py-3'}`}
            >
              View Projects
            </a>
            <a
              href="#contact"
              className={`border border-accent text-accent font-mono font-medium rounded hover:bg-accent/10 transition-colors ${compact ? 'px-3 py-1.5 text-xs' : 'px-6 py-3'}`}
            >
              Get In Touch
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
