import { motion } from 'framer-motion';
import { Code, Server, Palette, GitBranch, Box } from 'lucide-react';
import { techStack } from '../data/techStack';

const iconMap = { Code, Server, Palette, GitBranch, Box };

export default function TechStack({ compact = false }) {
  return (
    <div className="h-full flex flex-col">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`font-mono font-bold text-center ${compact ? 'text-sm mb-1' : 'text-3xl mb-4'}`}
      >
        Tech Stack
      </motion.h2>
      <p className={`text-text-secondary text-center ${compact ? 'text-xs mb-2' : 'mb-12'}`}>
        Technologies I work with
      </p>
      <div className={`flex flex-wrap justify-center gap-1.5 overflow-auto ${compact ? 'py-1' : 'gap-3'}`}>
        {techStack.map((tech, index) => {
          const Icon = iconMap[tech.icon] || Code;
          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              className={`flex items-center gap-1.5 px-2 py-1 bg-bg-secondary border border-bg-tertiary rounded-full hover:border-accent transition-colors ${compact ? 'text-[10px]' : ''}`}
            >
              <Icon className={`text-accent ${compact ? 'w-3 h-3' : 'w-4 h-4'}`} />
              <span className={compact ? 'text-xs' : 'text-sm'}>{tech.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
