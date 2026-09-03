import React from 'react';
import { motion } from 'framer-motion';
import { useNavClick } from '../context/NavClickContext';
import { BackgroundIcons, processIcons } from './BackgroundIcons';

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
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
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
    <section id="process" className={`relative py-24 px-6 md:px-12 bg-light-bg dark:bg-dark-bg overflow-hidden ${className || ''}`}>
      <BackgroundIcons icons={processIcons} />
      <div className="max-w-7xl mx-auto">
        <motion.div
          key={sectionKey}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
          className="mb-16 will-change-transform"
          style={{ transform: 'translateZ(0)' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-lg opacity-70">
            A simple process from inquiry to wholesale supply.
          </p>
        </motion.div>

        <motion.div
          key={`steps-${sectionKey}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.18 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 relative"
        >
          <motion.div
            variants={lineVariants}
            className="hidden md:block absolute top-8 left-0 w-full h-[1px] bg-light-border dark:bg-dark-border z-0"
          />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className="relative z-10"
            >
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.18 + 0.3, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
                className="w-16 h-16 rounded-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border flex items-center justify-center text-xl font-bold mb-6 will-change-transform"
                style={{ transform: 'translateZ(0)' }}
              >
                {step.num}
              </motion.div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
