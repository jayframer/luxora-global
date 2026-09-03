import React from 'react';
import { categories } from '../data/categories';
import { useNavClick } from '../context/NavClickContext';
import { BackgroundIcons, contactIcons } from './BackgroundIcons';

interface ContactSectionProps {
  onOpenInquiry: () => void;
}

export const ContactSection: React.FC<ContactSectionProps & { className?: string }> = ({ onOpenInquiry, className }) => {
  const { navClickKeys } = useNavClick();
  const sectionKey = navClickKeys['contact'] || 0;

  const infoItems = [
    { label: 'Company', content: <p className="text-xl">Luxora Global</p> },
    { label: 'Email', content: <a href="mailto:luxoraglobalinfo@gmail.com" className="text-xl hover:opacity-70 transition-opacity">luxoraglobalinfo@gmail.com</a> },
    { label: 'Address', content: <p className="text-xl">Rajkot, Gujarat, India</p> },
  ];

  return (
    <section id="contact" className={`relative py-24 px-6 md:px-12 bg-light-card dark:bg-dark-card border-y border-light-border dark:border-dark-border overflow-hidden ${className || ''}`}>
      <BackgroundIcons icons={contactIcons} />
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div
            key={sectionKey}
            className="animate-fadeUp gpu-accelerated"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Let's Work Together
            </h2>
            <p className="text-lg opacity-70 mb-12 max-w-md text-balance">
              Have a wholesale requirement? Get in touch with Luxora Global.
            </p>

            <div className="space-y-8">
              {infoItems.map((item, i) => (
                <div
                  key={item.label}
                  className="animate-fadeUp"
                  style={{ animationDelay: `${i * 100 + 300}ms` }}
                >
                  <h3 className="text-sm font-bold opacity-50 uppercase tracking-wider mb-2">{item.label}</h3>
                  {item.content}
                </div>
              ))}
            </div>
            
            <button
              onClick={onOpenInquiry}
              className="mt-12 px-8 py-4 border border-light-text text-light-text hover:bg-light-text hover:text-light-bg dark:border-dark-text dark:text-dark-text dark:hover:bg-dark-text dark:hover:text-dark-bg rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Send an Inquiry
            </button>
          </div>

          <div
            key={`list-${sectionKey}`}
            className="flex flex-col justify-center animate-fadeUp gpu-accelerated"
            style={{ animationDelay: '180ms' }}
          >
            <div className="bg-light-bg dark:bg-dark-bg p-8 rounded-3xl border border-light-border dark:border-dark-border">
              <h3 className="text-xl font-bold mb-6">Product Categories</h3>
              <ul className="space-y-4">
                {categories.map((cat, i) => (
                  <li
                    key={cat.id}
                    className="flex items-center animate-fadeUp"
                    style={{ animationDelay: `${i * 100 + 500}ms` }}
                  >
                    <span className="w-2 h-2 rounded-full bg-light-text dark:bg-dark-text opacity-50 mr-3"></span>
                    <span className="opacity-80">{cat.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
