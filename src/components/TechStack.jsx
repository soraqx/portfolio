import { motion } from 'framer-motion';
import { Code, Server, Palette, GitBranch, Box } from 'lucide-react';
import { techStack } from '../data/techStack';

const iconMap = { Code, Server, Palette, GitBranch, Box };

export default function TechStack() {
  return (
    <section id="tech" className="py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-3xl font-bold text-center mb-4"
        >
          Tech Stack
        </motion.h2>
        <p className="text-text-secondary text-center mb-12">
          {/* TODO: Replace with your subtitle */}
          Technologies I work with
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech, index) => {
            const Icon = iconMap[tech.icon] || Code;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-bg-secondary border border-bg-tertiary rounded-full hover:border-accent transition-colors"
              >
                <Icon className="w-4 h-4 text-accent" />
                <span className="text-sm text-text-primary">{tech.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
