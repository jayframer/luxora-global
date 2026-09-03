import React, { useState, useEffect, useCallback } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavClick } from '../context/NavClickContext';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.png';
import logoDark from '../assets/logo-dark.png';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Products', href: '#products' },
  { name: 'About', href: '#about' },
  { name: 'Process', href: '#process' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const { triggerNavClick } = useNavClick();
  const { theme } = useTheme();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  useEffect(() => {
    const ids = ['home', 'products', 'about', 'process', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(href);
    const sectionId = href.replace('#', '');
    triggerNavClick(sectionId);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [triggerNavClick]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-light-bg/90 dark:bg-dark-bg/90 border-b border-light-border/50 dark:border-dark-border/50 shadow-[0_4px_16px_rgba(0,0,0,0.06)] py-2'
        : 'bg-transparent py-3'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-5">
          <img src={theme === 'dark' ? logoDark : logo} alt="Luxora Global Logo" style={{ height: '60px', width: '60px' }} className="object-contain" />
          <span className="text-lg font-bold uppercase">Luxora Global</span>
        </a>

        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`nav-link text-sm font-medium opacity-80 hover:opacity-100 transition-opacity ${activeSection === link.href ? 'nav-link--active' : ''}`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="text-sm font-medium border border-light-text text-light-text hover:bg-light-text hover:text-light-bg dark:border-dark-text dark:text-dark-text dark:hover:bg-dark-text dark:hover:text-dark-bg px-5 py-2 rounded-full transition-colors duration-300"
            >
              Send Inquiry
            </motion.a>
          </div>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-light-bg dark:bg-dark-bg border-b border-light-border dark:border-dark-border shadow-lg md:hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-medium py-2 border-b border-light-border/50 dark:border-dark-border/50 last:border-0"
                >
                  {link.name}
                </a>
              ))}
              <motion.a
                whileTap={{ scale: 0.95 }}
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="text-center text-sm font-medium border border-light-text text-light-text hover:bg-light-text hover:text-light-bg dark:border-dark-text dark:text-dark-text dark:hover:bg-dark-text dark:hover:text-dark-bg px-5 py-3 rounded-full mt-4 transition-colors duration-300"
              >
                Send Inquiry
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
