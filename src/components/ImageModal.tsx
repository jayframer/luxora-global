import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src, alt }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 animate-fadeIn"
      />
      
      <div className="relative max-w-md max-h-[70vh] w-full animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors hover:scale-110 active:scale-90"
        >
          <X className="w-6 h-6" />
        </button>
        
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
    </div>
  );
};
