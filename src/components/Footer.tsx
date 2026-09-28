import React from 'react';

export const Footer: React.FC<{ className?: string }> = React.memo(({ className }) => {
  return (
    <footer className={`py-10 px-6 md:px-12 lg:px-16 border-t border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg ${className || ''}`}>
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-[17px] font-semibold tracking-tight">Luxora Global</span>
          <span className="text-[13px] opacity-60">Wholesale products for modern retailers.</span>
        </div>

        <div className="flex flex-wrap gap-6">
          {['Home', 'Products', 'About', 'Process', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[12px] font-medium uppercase tracking-[0.12em] opacity-70 hover:opacity-100 transition-opacity"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="text-[13px] opacity-60">
          © 2026 Luxora Global. All rights reserved.
        </div>
      </div>
    </footer>
  );
});
