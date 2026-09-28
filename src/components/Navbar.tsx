import React, { useState, useEffect, useCallback } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavClick } from '../context/NavClickContext';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/logo.optimized.png';
import logoDark from '../assets/logo-dark.optimized.png';

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
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled
        ? 'bg-light-bg/70 dark:bg-dark-bg/70 border-light-border/60 dark:border-dark-border/60 backdrop-blur-xl'
        : 'bg-light-bg/30 dark:bg-dark-bg/30 border-transparent backdrop-blur-lg'
        }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 h-[78px] flex justify-between items-center relative">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-3 shrink-0">
          <img
            src={theme === 'dark' ? logoDark : logo}
            alt="Luxora Global Logo"
            width={theme === 'dark' ? 276 : 261}
            height={221}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            style={{ height: '66px', width: '66px' }}
            className="object-contain"
          />
          <span className="text-[15px] sm:text-[17px] font-semibold tracking-tight leading-none">Luxora Global</span>
        </a>

        <div className="hidden md:flex items-center justify-center flex-1 mx-8 gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`nav-link text-[12px] font-medium opacity-80 hover:opacity-100 transition-opacity ${activeSection === link.href ? 'nav-link--active' : ''}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <motion.a
            whileHover={{ y: -1 }}
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn"
          >
            Send Inquiry
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </div>

        <div className="md:hidden flex items-center gap-2 shrink-0">
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
            <div className="flex flex-col px-6 py-4 gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[15px] font-medium py-2 border-b border-light-border/50 dark:border-dark-border/50 last:border-0"
                >
                  {link.name}
                </a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn mt-3"
              >
                Send Inquiry
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
