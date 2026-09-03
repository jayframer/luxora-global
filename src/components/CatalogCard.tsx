import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

interface CatalogCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    catalogUrl?: string;
  };
  index: number;
  onBrowse: () => void;
}

export const CatalogCard: React.FC<CatalogCardProps> = ({ product, index, onBrowse }) => {
  const handleDownload = () => {
    const url = product.catalogUrl || '/catalog/industrial-components-catalog.pdf';
    const fileName = url.split('/').pop() || 'catalog.pdf';
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-light-card dark:bg-dark-card rounded-3xl overflow-hidden border border-light-border dark:border-white/50 flex flex-col items-center justify-center h-full p-6"
    >
      <div className="flex-1 flex flex-col items-center justify-center">
        <h3 className="text-3xl font-bold mb-6 text-center">{product.name}</h3>
        <p className="text-lg opacity-70 text-center">{product.description}</p>
      </div>
      <div className="w-full">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownload}
          className="w-full py-4 px-6 border border-light-text text-light-text hover:bg-light-text hover:text-light-bg dark:border-dark-text dark:text-dark-text dark:hover:bg-dark-text dark:hover:text-dark-bg rounded-xl font-medium transition-colors duration-300 flex items-center justify-center gap-2 text-base"
        >
          <Download className="w-4 h-4" />
          Download Catalog
        </motion.button>
      </div>
    </motion.div>
  );
};
