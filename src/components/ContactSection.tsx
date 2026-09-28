import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '../data/categories';
import { useNavClick } from '../context/NavClickContext';

interface ContactSectionProps {
  onOpenInquiry: () => void;
  onCategorySelect?: (categoryId: string) => void;
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

export const ContactSection: React.FC<ContactSectionProps & { className?: string }> = ({ onOpenInquiry, onCategorySelect, className }) => {
  const { navClickKeys } = useNavClick();
  const sectionKey = navClickKeys['contact'] || 0;

  return (
    <section id="contact" className={`relative py-24 px-6 md:px-12 lg:px-16 bg-light-card dark:bg-dark-card border-y border-light-border dark:border-dark-border overflow-hidden ${className || ''}`}>
      <div className="max-w-[1600px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            key={sectionKey}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
            className=""
          >
            <p className="eyebrow mb-5">06 / Contact</p>
            <h2 className="editorial-heading text-[clamp(2.5rem,5vw,4.5rem)] mb-6">
              Let's Work Together
            </h2>
            <p className="text-[15px] leading-[1.8] opacity-70 mb-12 max-w-md text-balance">
              Have a wholesale requirement? Get in touch with Luxora Global.
            </p>

            <div className="space-y-8">
              {[
                { label: 'Company', content: <p className="text-lg">Luxora Global</p> },
                { label: 'Email', content: <a href="mailto:luxoraglobalinfo@gmail.com" className="text-lg hover:opacity-70 transition-opacity break-all">luxoraglobalinfo@gmail.com</a> },
                { label: 'Address', content: <p className="text-lg">Rajkot, Gujarat, India</p> },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  variants={infoVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="border-t border-light-border dark:border-dark-border pt-4"
                >
                  <h3 className="eyebrow mb-2">{item.label}</h3>
                  {item.content}
                </motion.div>
              ))}
            </div>
            
            <motion.button
              whileHover={{ y: -1 }}
              onClick={onOpenInquiry}
              className="btn mt-12"
            >
              Send an Inquiry
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <motion.div
            key={`list-${sectionKey}`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
            className="flex flex-col justify-center"
          >
            <div className="bg-light-bg dark:bg-dark-bg p-8 rounded-xl border border-light-border dark:border-dark-border">
              <h3 className="editorial-heading text-2xl mb-6">Product Categories</h3>
              <ul className="space-y-4">
                {categories.map((cat, i) => (
                  <motion.li
                    key={cat.id}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.5, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
                    className="border-b border-light-border/60 dark:border-dark-border/60 pb-3 last:border-0"
                  >
                    <button
                      type="button"
                      onClick={() => onCategorySelect?.(cat.id)}
                      className="group flex w-full items-center gap-3 text-left cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-light-text dark:bg-dark-text opacity-50 transition-opacity group-hover:opacity-100"></span>
                      <span className="opacity-80 text-[15px] transition-opacity group-hover:opacity-100">{cat.name}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-70 group-hover:translate-x-0" />
                    </button>
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
