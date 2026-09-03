import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Category } from '../data/categories';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = React.memo(({ category, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="product-card group cursor-pointer flex flex-col bg-light-card dark:bg-dark-card rounded-3xl overflow-hidden border border-light-border dark:border-dark-border hover:border-light-text dark:hover:border-dark-text hover:border-[2.5px] transition-all duration-300 h-full"
      onClick={onClick}
    >
      <div className="relative h-56 shrink-0 overflow-hidden bg-light-border dark:bg-dark-border">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      
      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-2xl font-bold mb-3">{category.name}</h3>
        <p className="text-sm opacity-70 leading-relaxed flex-1 mb-8">
          {category.description}
        </p>
        
        <div className="flex items-center text-sm font-medium mt-auto">
          <span className="mr-2 border-b border-transparent group-hover:border-current transition-colors">
            Explore Category
          </span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
});
