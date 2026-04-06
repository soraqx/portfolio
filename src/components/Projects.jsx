import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/projects';

export default function Projects({ compact = false }) {
  return (
    <div className="h-full flex flex-col">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`font-mono font-bold text-center ${compact ? 'text-sm mb-1' : 'text-3xl mb-4'}`}
      >
        Projects
      </motion.h2>
      <p className={`text-text-secondary text-center ${compact ? 'text-xs mb-2' : 'mb-12'}`}>
        Some of my recent work
      </p>
      <div className={`grid gap-2 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={`bg-bg-tertiary border border-bg-tertiary rounded-lg hover:scale-[1.02] hover:shadow-[0_0_15px_var(--accent-glow)] transition-all duration-300 ${compact ? 'p-3' : 'p-6'}`}
          >
            <h3 className={`font-mono font-bold mb-1 ${compact ? 'text-sm' : 'text-lg'}`}>{project.title}</h3>
            <p className={`text-text-secondary text-text-secondary mb-2 ${compact ? 'text-[10px] line-clamp-1' : 'text-sm line-clamp-2'}`}>
              {project.description}
            </p>
            <div className={`flex flex-wrap gap-1 mb-1`}>
              {project.tags.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className={`px-1.5 py-0.5 text-[10px] bg-bg-secondary text-text-secondary rounded`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className={`flex gap-2 ${compact ? 'mt-1' : 'mt-2'}`}>
              <a
                href={project.demoUrl}
                className={`flex items-center gap-1 text-accent hover:underline ${compact ? 'text-[10px]' : 'text-sm'}`}
              >
                <ExternalLink className={compact ? 'w-3 h-3' : 'w-4 h-4'} />
              </a>
              <a
                href={project.githubUrl}
                className={`flex items-center gap-1 text-text-secondary hover:text-accent transition-colors ${compact ? 'text-[10px]' : 'text-sm'}`}
              >
                <Github className={compact ? 'w-3 h-3' : 'w-4 h-4'} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
