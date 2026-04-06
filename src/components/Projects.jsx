import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-bg-secondary">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-3xl font-bold text-center mb-4"
        >
          Projects
        </motion.h2>
        <p className="text-text-secondary text-center mb-12">
          {/* TODO: Replace with your subtitle */}
          Some of my recent work
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-bg-tertiary border border-bg-tertiary rounded-xl p-6 hover:scale-[1.02] hover:shadow-[0_0_30px_var(--accent-glow)] transition-all duration-300"
            >
              <div className="w-32 h-32 mx-auto mb-4 bg-bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-text-secondary text-sm">// TODO: Add project image</span>
              </div>
              <h3 className="font-mono text-lg font-bold mb-2">{project.title}</h3>
              <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-bg-secondary text-text-secondary rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a
                  href={project.demoUrl}
                  className="flex items-center gap-1 text-sm text-accent hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  className="flex items-center gap-1 text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
