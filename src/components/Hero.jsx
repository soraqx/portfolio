import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
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
    <section id="home" className="min-h-screen flex items-center justify-center grid-bg pt-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-accent text-sm mb-4">
            // TODO: Replace with your greeting
          </p>
          <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold mb-4 glitch-hover">
            {/* TODO: Replace with your name */}
            Your Name
          </h1>
          <p className="font-mono text-xl sm:text-2xl text-text-secondary mb-8 h-8">
            {text}<span className="animate-pulse">|</span>
          </p>
          <p className="text-text-secondary max-w-lg mx-auto mb-8">
            {/* TODO: Replace with your bio */}
            Building digital experiences with code. Edit this text to add your own bio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="px-6 py-3 bg-accent text-bg-primary font-mono font-medium rounded-lg hover:opacity-80 transition-opacity"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-accent text-accent font-mono font-medium rounded-lg hover:bg-accent/10 transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
