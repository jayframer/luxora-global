import React from 'react';
import { motion } from 'framer-motion';
import { CategoryCard } from './CategoryCard';
import { categories } from '../data/categories';
import { useNavClick } from '../context/NavClickContext';

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
    <section id="products" className={`relative py-24 px-6 md:px-12 lg:px-16 bg-light-bg dark:bg-dark-bg overflow-hidden ${className || ''}`}>
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          key={sectionKey}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] }}
          className="mb-14 flex flex-col justify-between gap-6 border-b border-light-border dark:border-dark-border pb-9 md:flex-row md:items-end"
        >
          <div>
            <p className="eyebrow mb-5">01 / Products</p>
            <h2 className="editorial-heading text-[clamp(2.5rem,4.5vw,4.5rem)]">
              Explore Our Products
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-[1.8] opacity-70 md:text-right">
            Wholesale categories designed around practical retail demand.
          </p>
        </motion.div>

        <motion.div
          key={`cards-${sectionKey}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
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
