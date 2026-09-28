import React from 'react';
import { motion } from 'framer-motion';
import { useNavClick } from '../context/NavClickContext';

const stepVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
  },
};

export const ProcessSection: React.FC<{ className?: string }> = ({ className }) => {
  const { navClickKeys } = useNavClick();
  const sectionKey = navClickKeys['process'] || 0;

  const steps = [
    {
      num: "01",
      title: "Explore",
      desc: "Browse our categories and find products that fit your retail needs."
    },
    {
      num: "02",
      title: "Send an Inquiry",
      desc: "Tell us what products you're interested in and share your requirements."
    },
    {
      num: "03",
      title: "We Connect & Supply",
      desc: "Our team contacts you, discusses your requirements, and helps arrange the products."
    }
  ];

  return (
    <section id="process" className={`relative py-24 px-6 md:px-12 lg:px-16 bg-light-bg dark:bg-dark-bg overflow-hidden ${className || ''}`}>
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          key={sectionKey}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
          className="mb-14 flex flex-col justify-between gap-6 border-b border-light-border dark:border-dark-border pb-9 md:flex-row md:items-end will-change-transform"
          style={{ transform: 'translateZ(0)' }}
        >
          <div>
            <p className="eyebrow mb-5">04 / Process</p>
            <h2 className="editorial-heading text-[clamp(2.5rem,4.5vw,4.5rem)]">
              How It Works
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-[1.8] opacity-70 md:text-right">
            A simple process from inquiry to wholesale supply.
          </p>
        </motion.div>

        <motion.div
          key={`steps-${sectionKey}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.18 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 relative"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className="relative z-10 border-t border-light-border dark:border-dark-border pt-6"
            >
              <motion.div
                variants={lineVariants}
                className="eyebrow mb-6 will-change-transform"
                style={{ transform: 'translateZ(0)' }}
              >
                {step.num} / 03
              </motion.div>
              <h3 className="editorial-heading text-2xl md:text-[2rem] mb-3">{step.title}</h3>
              <p className="text-[15px] leading-[1.8] opacity-70">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
