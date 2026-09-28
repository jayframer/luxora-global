import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavClick } from '../context/NavClickContext';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.optimized.png';
import logoDark from '../assets/logo-dark.optimized.png';

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
    <section id="home" className={`relative min-h-screen flex flex-col justify-center pt-32 pb-16 overflow-hidden bg-light-bg dark:bg-dark-bg ${className || ''}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 dark:opacity-25 pointer-events-none"
        style={{ backgroundImage: "url('/images/hero_bg2.png')" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-transparent dark:bg-black/10 pointer-events-none"
      />
      <motion.div
        key={sectionKey}
        initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
        className="relative z-10 max-w-[1600px] mx-auto w-full px-6 md:px-12 lg:px-16 will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="z-10">
            <motion.img
              src={theme === 'dark' ? logoDark : logo}
              alt="Luxora Global"
              width={theme === 'dark' ? 276 : 261}
              height={221}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="h-32 w-auto mb-10 object-contain"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.45, delay: 0.02 }}
            />

            <motion.h1
              initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.55, delay: 0.04, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
              className="editorial-heading max-w-[860px] text-[clamp(2.8rem,6.5vw,5.8rem)] mb-6 text-light-text dark:text-dark-text will-change-transform"
              style={{ transform: 'translateZ(0)' }}
            >
              Wholesale Products
              <br />
              Built for Retailers.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
              className="text-[15px] leading-[1.8] mb-10 max-w-[440px] text-light-text dark:text-dark-text"
            >
              Practical wholesale products across biodegradable packaging, kitchenware, and automotive — with simple inquiry-based sourcing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.45, delay: 0.12, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-8"
            >
              <motion.a
                href="#products"
                onClick={scrollToProducts}
                className="btn"
              >
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>
      </motion.div>
    </section>
  );
};
