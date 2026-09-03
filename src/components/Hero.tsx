import React, { useCallback } from 'react';
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
      <div
        key={sectionKey}
        className="max-w-5xl mx-auto px-6 md:px-12 w-full text-center z-10 mb-20 gpu-accelerated"
      >
        <div className="z-10">
            <div className="mb-8 hero-logo-reveal" style={{ animationDelay: '0.1s' }}>
              <img 
                src={theme === 'dark' ? logoDark : logo} 
                alt="Luxora Global" 
                className="h-36 w-auto mx-auto object-contain"
              />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6 text-light-text dark:text-dark-text gpu-accelerated">
              <span className="hero-line-reveal">
                <span style={{ animationDelay: '0.2s' }}>Wholesale Products</span>
              </span>
              <br />
              <span className="hero-line-reveal">
                <span style={{ animationDelay: '0.35s' }}>Built for Retailers.</span>
              </span>
            </h1>

            <p
              className="text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed text-light-text dark:text-dark-text animate-fadeUp"
              style={{ animationDelay: '0.5s' }}
            >
              Practical wholesale products across biodegradable packaging, kitchenware, and automotive — with simple inquiry-based sourcing.
            </p>

            <div
              className="flex flex-wrap justify-center gap-4 animate-fadeUp"
              style={{ animationDelay: '0.65s' }}
            >
              <a
                href="#products"
                onClick={scrollToProducts}
                className="px-8 py-4 bg-white text-light-text border border-light-text hover:bg-light-text hover:text-white dark:bg-dark-bg dark:text-dark-text dark:border-dark-text dark:hover:bg-dark-text dark:hover:text-dark-bg rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Explore Products
              </a>
            </div>
          </div>
      </div>
    </section>
  );
};
