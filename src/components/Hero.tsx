import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavClick } from '../context/NavClickContext';
import { BackgroundIcons, heroIcons } from './BackgroundIcons';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.png';
import logoDark from '../assets/logo-dark.png';

export const Hero: React.FC<{ onExploreProducts: () => void; className?: string }> = ({ onExploreProducts, className }) => {
  const { navClickKeys } = useNavClick();
  const { theme } = useTheme();
  const sectionKey = navClickKeys['home'] || 0;

  const scrollToProducts = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onExploreProducts();
    setTimeout(() => {
      const el = document.getElementById('products');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }, [onExploreProducts]);

  return (
    <section id="home" className={`relative min-h-screen flex flex-col items-center pt-32 pb-0 overflow-hidden bg-light-bg dark:bg-dark-bg ${className || ''}`}>
      <BackgroundIcons icons={heroIcons} />
      <motion.div
        key={sectionKey}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
        className="max-w-5xl mx-auto px-6 md:px-12 w-full text-center z-10 mb-20 will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="z-10">
            <motion.img 
              src={theme === 'dark' ? logoDark : logo} 
              alt="Luxora Global" 
              className="h-36 w-auto mx-auto mb-8 object-contain"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6 text-light-text dark:text-dark-text will-change-transform"
              style={{ transform: 'translateZ(0)' }}
            >
              Wholesale Products
              <br />
              Built for Retailers.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed text-light-text dark:text-dark-text"
            >
              Practical wholesale products across biodegradable packaging, kitchenware, and automotive — with simple inquiry-based sourcing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#products"
                onClick={scrollToProducts}
                className="px-8 py-4 bg-white text-light-text border border-light-text hover:bg-light-text hover:text-white dark:bg-dark-bg dark:text-dark-text dark:border-dark-text dark:hover:bg-dark-text dark:hover:text-dark-bg rounded-full font-medium transition-colors duration-300"
              >
                Explore Products
              </motion.a>
            </motion.div>
          </div>
      </motion.div>
    </section>
  );
};
