import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { socialLinks } from '../data/socialLinks';

const iconMap = { Github, Linkedin, Twitter, Mail };

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-bg-secondary">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-3xl font-bold mb-4"
        >
          Get In Touch
        </motion.h2>
        <p className="text-text-secondary mb-8 max-w-lg mx-auto">
          {/* TODO: Replace with your subtitle */}
          Feel free to reach out for collaborations or just a friendly chat.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((link, index) => {
            const Icon = iconMap[link.icon] || Mail;
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 px-4 py-3 bg-bg-tertiary border border-bg-tertiary rounded-lg hover:border-accent hover:bg-accent/10 transition-all"
              >
                <Icon className="w-5 h-5 text-accent" />
                <span className="text-text-primary">{link.name}</span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
