import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../data/categories';
import { useNavClick } from '../context/NavClickContext';
import { BackgroundIcons, contactIcons } from './BackgroundIcons';

interface ContactSectionProps {
  onOpenInquiry: () => void;
}

const infoVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1 + 0.3,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  }),
};

export const ContactSection: React.FC<ContactSectionProps & { className?: string }> = ({ onOpenInquiry, className }) => {
  const { navClickKeys } = useNavClick();
  const sectionKey = navClickKeys['contact'] || 0;

  return (
    <section id="contact" className={`relative py-24 px-6 md:px-12 bg-light-card dark:bg-dark-card border-y border-light-border dark:border-dark-border overflow-hidden ${className || ''}`}>
      <BackgroundIcons icons={contactIcons} />
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            key={sectionKey}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
            className="will-change-transform"
            style={{ transform: 'translateZ(0)' }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Let's Work Together
            </h2>
            <p className="text-lg opacity-70 mb-12 max-w-md text-balance">
              Have a wholesale requirement? Get in touch with Luxora Global.
            </p>

            <div className="space-y-8">
              {[
                { label: 'Company', content: <p className="text-xl">Luxora Global</p> },
                { label: 'Email', content: <a href="mailto:luxoraglobalinfo@gmail.com" className="text-xl hover:opacity-70 transition-opacity">luxoraglobalinfo@gmail.com</a> },
                { label: 'Address', content: <p className="text-xl">Rajkot, Gujarat, India</p> },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  variants={infoVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <h3 className="text-sm font-bold opacity-50 uppercase tracking-wider mb-2">{item.label}</h3>
                  {item.content}
                </motion.div>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenInquiry}
              className="mt-12 px-8 py-4 border border-light-text text-light-text hover:bg-light-text hover:text-light-bg dark:border-dark-text dark:text-dark-text dark:hover:bg-dark-text dark:hover:text-dark-bg rounded-full font-medium transition-colors duration-300"
            >
              Send an Inquiry
            </motion.button>
          </motion.div>

          <motion.div
            key={`list-${sectionKey}`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
            className="flex flex-col justify-center will-change-transform"
            style={{ transform: 'translateZ(0)' }}
          >
            <div className="bg-light-bg dark:bg-dark-bg p-8 rounded-3xl border border-light-border dark:border-dark-border">
              <h3 className="text-xl font-bold mb-6">Product Categories</h3>
              <ul className="space-y-4">
                {categories.map((cat, i) => (
                  <motion.li
                    key={cat.id}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.5, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
                    className="flex items-center"
                  >
                    <span className="w-2 h-2 rounded-full bg-light-text dark:bg-dark-text opacity-50 mr-3"></span>
                    <span className="opacity-80">{cat.name}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
