import React from 'react';
import { motion } from 'framer-motion';
import { CategoryCard } from './CategoryCard';
import { categories } from '../data/categories';
import { useNavClick } from '../context/NavClickContext';
import { BackgroundIcons, productsIcons } from './BackgroundIcons';

interface ProductsSectionProps {
  onCategorySelect: (categoryId: string) => void;
  className?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  },
};

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onCategorySelect, className }) => {
  const { navClickKeys } = useNavClick();
  const sectionKey = navClickKeys['products'] || 0;

  return (
    <section id="products" className={`relative py-24 px-6 md:px-12 bg-light-bg dark:bg-dark-bg overflow-hidden ${className || ''}`}>
      <BackgroundIcons icons={productsIcons} />
      <div className="max-w-7xl mx-auto">
        <motion.div
          key={sectionKey}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
          className="mb-16 will-change-transform"
          style={{ transform: 'translateZ(0)' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Explore Our Products
          </h2>
          <p className="text-lg opacity-70 max-w-2xl">
            Wholesale categories designed around practical retail demand.
          </p>
        </motion.div>

        <motion.div
          key={`cards-${sectionKey}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={cardVariants} className="h-full">
              <CategoryCard
                category={category}
                onClick={() => onCategorySelect(category.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
