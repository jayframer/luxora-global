import React from 'react';
import { useNavClick } from '../context/NavClickContext';
import { BackgroundIcons, processIcons } from './BackgroundIcons';

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
        <div
          key={sectionKey}
          className="mb-16 animate-fadeUp gpu-accelerated"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-lg opacity-70">
            A simple process from inquiry to wholesale supply.
          </p>
        </div>

        <div
          key={`steps-${sectionKey}`}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 relative"
        >
          <div
            className="hidden md:block absolute top-8 left-0 w-full h-[1px] bg-light-border dark:bg-dark-border z-0 animate-fadeIn"
            style={{ animationDelay: '300ms' }}
          />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 animate-fadeUp"
              style={{ animationDelay: `${index * 180 + 300}ms` }}
            >
              <div
                className="w-16 h-16 rounded-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border flex items-center justify-center text-xl font-bold mb-6 gpu-accelerated animate-scaleIn"
                style={{ animationDelay: `${index * 180 + 300}ms` }}
              >
                {step.num}
              </div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
