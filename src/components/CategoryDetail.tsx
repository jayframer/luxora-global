import React from 'react';
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
    <div className="fixed inset-0 z-[60] bg-light-bg dark:bg-dark-bg overflow-y-auto animate-slideUp">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={onClose}
            className="flex items-center text-sm font-medium opacity-70 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Categories
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-light-border dark:hover:bg-dark-border transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-16 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">{category.name}</h1>
          <p className="text-xl opacity-80 leading-relaxed">{category.description}</p>
        </div>

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
          <button
            onClick={() => onOpenInquiry()}
            className="px-8 py-4 border border-light-text text-light-text hover:bg-light-text hover:text-light-bg dark:border-dark-text dark:text-dark-text dark:hover:bg-dark-text dark:hover:text-dark-bg rounded-full font-medium transition-colors duration-300"
          >
            Send Custom Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product; index: number; onInquire: () => void }> = ({ product, index, onInquire }) => {
  return (
    <div
      className="bg-light-card dark:bg-dark-card rounded-3xl overflow-hidden border border-light-border dark:border-white/50 flex flex-col h-full animate-fadeUp"
      style={{ animationDelay: `${index * 60}ms` }}
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
        <button
          onClick={onInquire}
          className="w-full py-3 border border-light-text text-light-text hover:bg-light-text hover:text-light-bg dark:border-dark-text dark:text-dark-text dark:hover:bg-dark-text dark:hover:text-dark-bg rounded-xl font-medium transition-colors duration-300"
        >
          Send Inquiry
        </button>
      </div>
    </div>
  );
};
