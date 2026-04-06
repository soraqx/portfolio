import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { socialLinks } from '../data/socialLinks';

const iconMap = { Github, Linkedin, Twitter, Mail };

export default function Contact({ compact = false }) {
  return (
    <div className="h-full flex flex-col">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`font-mono font-bold text-center ${compact ? 'text-sm mb-1' : 'text-3xl mb-4'}`}
      >
        Get In Touch
      </motion.h2>
      <p className={`text-text-secondary text-center ${compact ? 'text-xs mb-2 line-clamp-1' : 'mb-8 max-w-lg mx-auto'}`}>
        Feel free to reach out for collaborations or just a friendly chat.
      </p>

      <div className={`flex flex-wrap justify-center gap-1 ${compact ? '' : 'gap-4'}`}>
        {socialLinks.map((link, index) => {
          const Icon = iconMap[link.icon] || Mail;
          return (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center gap-1.5 bg-bg-tertiary border border-bg-tertiary rounded hover:border-accent hover:bg-accent/10 transition-all ${compact ? 'px-2 py-1 text-xs' : 'px-4 py-3'}`}
            >
              <Icon className={`text-accent ${compact ? 'w-3 h-3' : 'w-5 h-5'}`} />
              <span className="text-text-primary">{link.name}</span>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
