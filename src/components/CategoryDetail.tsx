import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import type { Category, Product } from '../data/categories';
import { CatalogCard } from './CatalogCard';

interface CategoryDetailProps {
  category: Category | null;
  onClose: () => void;
  onOpenInquiry: (productName?: string) => void;
}

export const CategoryDetail: React.FC<CategoryDetailProps> = ({ category, onClose, onOpenInquiry }) => {
  if (!category) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[60] bg-light-bg dark:bg-dark-bg overflow-y-auto"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <motion.button
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="flex items-center text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Categories
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-full hover:bg-light-border dark:hover:bg-dark-border transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Category Info */}
          <div className="mb-16 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">{category.name}</h1>
            <p className="text-xl opacity-80 leading-relaxed">{category.description}</p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.products.map((product, index) => (
              product.type === 'catalog' ? (
                <CatalogCard
                  key={product.id}
                  product={product}
                  index={index}
                  onBrowse={() => {}}
                />
              ) : (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onInquire={() => onOpenInquiry(product.name)}
                />
              )
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <p className="text-lg opacity-70 mb-6">Need a specific product in this category not listed here?</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenInquiry()}
              className="px-8 py-4 border border-light-text text-light-text hover:bg-light-text hover:text-light-bg dark:border-dark-text dark:text-dark-text dark:hover:bg-dark-text dark:hover:text-dark-bg rounded-full font-medium transition-colors duration-300"
            >
              Send Custom Inquiry
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const ProductCard: React.FC<{ product: Product; index: number; onInquire: () => void }> = ({ product, index, onInquire }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-light-card dark:bg-dark-card rounded-3xl overflow-hidden border border-light-border dark:border-white/50 flex flex-col h-full"
      >
        <div className="relative h-72 bg-light-border dark:bg-dark-border overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-base font-bold mb-1">{product.name}</h3>
          <p className="text-xs opacity-70 mb-4 flex-1">{product.description}</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onInquire}
            className="w-full py-3 border border-light-text text-light-text hover:bg-light-text hover:text-light-bg dark:border-dark-text dark:text-dark-text dark:hover:bg-dark-text dark:hover:text-dark-bg rounded-xl font-medium transition-colors duration-300"
          >
            Send Inquiry
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};
