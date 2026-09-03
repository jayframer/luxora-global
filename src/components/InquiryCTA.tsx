import React from 'react';

export const InquiryCTA: React.FC<{ className?: string }> = React.memo(({ className }) => {
  return (
    <section className={`py-24 px-6 md:px-12 bg-light-card text-light-text dark:bg-dark-card dark:text-dark-text ${className || ''}`}>
      <div className="max-w-4xl mx-auto text-center animate-fadeUp">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Looking for wholesale products?
        </h2>
        <p className="text-xl opacity-80 mb-10 max-w-2xl mx-auto">
          Tell us what you need and let's start a conversation.
        </p>
        <a
          href="#contact"
          className="inline-block px-8 py-4 border border-light-text text-light-text hover:bg-light-text hover:text-light-card dark:border-dark-text dark:text-dark-text dark:hover:bg-dark-text dark:hover:text-dark-card rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Send an Inquiry
        </a>
      </div>
    </section>
  );
});
