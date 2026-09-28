import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import type { Category, Product } from '../data/categories';
import { CatalogCard } from './CatalogCard';
import { CARD_SIZES } from '../data/categories';

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
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 py-12">
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
              className="w-9 h-9 inline-flex items-center justify-center rounded-sm hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Category Info */}
          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-16 max-w-3xl"
          >
            <h1 className="editorial-heading text-[clamp(2.5rem,5vw,4rem)] mb-6">{category.name}</h1>
            <p className="text-[15px] leading-[1.8] opacity-80">{category.description}</p>
          </motion.div>

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
              className="btn"
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
        className="group bg-light-card dark:bg-dark-card rounded-xl overflow-hidden border border-light-border dark:border-dark-border flex flex-col h-full"
      >
        <div className="relative h-72 bg-light-border dark:bg-dark-border overflow-hidden">
          <img
            src={product.image.src}
            srcSet={product.image.srcSet}
            sizes={CARD_SIZES}
            width={product.image.width}
            height={product.image.height}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-[15px] font-semibold mb-1">{product.name}</h3>
          <p className="text-xs opacity-70 mb-4 flex-1">{product.description}</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onInquire}
            className="btn w-full h-11"
          >
            Send Inquiry
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};
