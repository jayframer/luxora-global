import React from 'react';
import { Globe, Truck, ShieldCheck, Package } from 'lucide-react';
import { useNavClick } from '../context/NavClickContext';
import { BackgroundIcons, aboutIcons } from './BackgroundIcons';

const features = [
  { icon: Globe, title: 'Global Sourcing', description: 'Connecting retailers with suppliers worldwide.' },
  { icon: Truck, title: 'Fast Logistics', description: 'Reliable shipping to your doorstep.' },
  { icon: ShieldCheck, title: 'Verified Quality', description: 'Trusted products from vetted manufacturers.' },
  { icon: Package, title: 'Wide Range', description: 'Packaging, kitchenware, automotive & more.' },
];

export const AboutSection: React.FC<{ className?: string }> = ({ className }) => {
  const { navClickKeys } = useNavClick();
  const sectionKey = navClickKeys['about'] || 0;

  return (
    <section id="about" className={`relative py-24 px-6 md:px-12 bg-light-card dark:bg-dark-card border-y border-light-border dark:border-dark-border overflow-hidden ${className || ''}`}>
      <BackgroundIcons icons={aboutIcons} />
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div key={sectionKey} className="animate-fadeUp">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-8">
            We make wholesale sourcing simpler.
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 animate-fadeUp"
                style={{ animationDelay: `${200 + i * 100}ms` }}
              >
                <div className="p-3 rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border">
                  <feature.icon className="w-6 h-6 text-light-text dark:text-dark-text" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm opacity-70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div
          key={`text-${sectionKey}`}
          className="space-y-6 text-lg opacity-80 leading-relaxed animate-fadeUp"
          style={{ animationDelay: '180ms' }}
        >
          <p>
            Luxora Global connects retailers with practical wholesale products across biodegradable products, kitchenware, and automotive categories.
          </p>
          <p>
            Our goal is simple: make product discovery and wholesale communication easier for retailers. Instead of complicated purchasing systems, we focus on understanding retailer requirements, connecting them with suitable products, and helping move the conversation from inquiry to supply.
          </p>
        </div>
      </div>
    </section>
  );
};
