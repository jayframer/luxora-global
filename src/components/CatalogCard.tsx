import React from 'react';
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

export const CatalogCard: React.FC<CatalogCardProps> = ({ product, index }) => {
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
    <div
      className="bg-light-card dark:bg-dark-card rounded-3xl overflow-hidden border border-light-border dark:border-white/50 flex flex-col items-center justify-center h-full p-6 animate-fadeUp"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex-1 flex flex-col items-center justify-center">
        <h3 className="text-3xl font-bold mb-6 text-center">{product.name}</h3>
        <p className="text-lg opacity-70 text-center">{product.description}</p>
      </div>
      <div className="w-full">
        <button
          onClick={handleDownload}
          className="w-full py-4 px-6 border border-light-text text-light-text hover:bg-light-text hover:text-light-bg dark:border-dark-text dark:text-dark-text dark:hover:bg-dark-text dark:hover:text-dark-bg rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 text-base hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download className="w-4 h-4" />
          Download Catalog
        </button>
      </div>
    </div>
  );
};
