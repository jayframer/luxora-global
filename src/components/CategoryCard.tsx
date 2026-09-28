import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Category } from '../data/categories';
import { CARD_SIZES } from '../data/categories';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = React.memo(({ category, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="product-card group cursor-pointer flex flex-col bg-light-card dark:bg-dark-card rounded-xl overflow-hidden border border-light-border dark:border-dark-border transition-all duration-300 h-full"
      onClick={onClick}
    >
      <div className="relative h-56 shrink-0 overflow-hidden bg-light-border dark:bg-dark-border">
        <img
          src={category.image.src}
          srcSet={category.image.srcSet}
          sizes={CARD_SIZES}
          width={category.image.width}
          height={category.image.height}
          alt={category.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
      </div>

      <div className="p-7 md:p-8 flex flex-col flex-1">
        <h3 className="editorial-heading text-2xl md:text-[1.9rem] mb-3">{category.name}</h3>
        <p className="text-[15px] leading-[1.8] opacity-70 flex-1 mb-8">
          {category.description}
        </p>

        <div className="link-cta mt-auto self-start text-light-text dark:text-dark-text">
          <span>Explore Category</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
});
