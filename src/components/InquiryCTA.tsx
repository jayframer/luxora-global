import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const InquiryCTA: React.FC<{ className?: string }> = React.memo(({ className }) => {
  return (
    <section className={`py-24 px-6 md:px-12 lg:px-16 bg-light-card text-light-text dark:bg-dark-card dark:text-dark-text border-y border-light-border dark:border-dark-border ${className || ''}`}>
      <div className="max-w-[1600px] mx-auto flex flex-col justify-between gap-10 md:flex-row md:items-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="eyebrow mb-5">05 / Inquiry</p>
          <h2 className="editorial-heading text-[clamp(2.5rem,5vw,4.5rem)]">
            Looking for wholesale products?
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-start gap-7 md:items-end"
        >
          <p className="text-[15px] leading-[1.8] opacity-70 max-w-sm">
            Tell us what you need and let's start a conversation.
          </p>
          <motion.a
            href="#contact"
            className="btn btn--light"
          >
            Send an Inquiry
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
});
