import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { categories } from '../data/categories';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  initialProduct?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialCategory = '',
  initialProduct = ''
}) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    category: initialCategory,
    product: initialProduct,
    quantity: '',
    message: ''
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        category: initialCategory,
        product: initialProduct,
        quantity: '',
        message: ''
      });
      setStatus('idle');
      setErrorMessage('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialCategory, initialProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const data = await response.json().catch(() => null);
        setErrorMessage(data?.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setErrorMessage('Unable to connect to server. Please check your connection and try again.');
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-light-card dark:bg-dark-card rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          <div className="flex justify-between items-center p-6 border-b border-light-border dark:border-dark-border">
            <h2 className="text-2xl font-bold">Send an Inquiry</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-full hover:bg-light-border dark:hover:bg-dark-border transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Inquiry received</h3>
                <p className="text-lg opacity-70 mb-8">
                  Thank you for your inquiry. Our team will contact you shortly.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-8 py-3 border border-light-text text-light-text hover:bg-light-text hover:text-light-bg dark:border-dark-text dark:text-dark-text dark:hover:bg-dark-text dark:hover:text-dark-bg rounded-full font-medium transition-colors duration-300"
                >
                  Close
                </motion.button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium opacity-80 mb-2">Full Name *</label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium opacity-80 mb-2">Company / Store Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium opacity-80 mb-2">Email *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium opacity-80 mb-2">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium opacity-80 mb-2">Product Category *</label>
                    <select
                      required
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all appearance-none"
                    >
                      <option value="" disabled>Select a category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium opacity-80 mb-2">Estimated Quantity</label>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 500 units"
                      className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium opacity-80 mb-2">Product / Requirement *</label>
                  <input
                    required
                    type="text"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    placeholder="Specific product or general requirement"
                    className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium opacity-80 mb-2">Message *</label>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all resize-none"
                  ></textarea>
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-medium">{errorMessage || 'Something went wrong. Please try again.'}</p>
                )}

                <div className="pt-4 border-t border-light-border dark:border-dark-border flex justify-end">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 mr-4 font-medium opacity-70 hover:opacity-100 transition-opacity"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-8 py-3 border border-light-text text-light-text hover:bg-light-text hover:text-light-bg dark:border-dark-text dark:text-dark-text dark:hover:bg-dark-text dark:hover:text-dark-bg rounded-full font-medium transition-colors duration-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-light-text dark:disabled:hover:bg-transparent dark:disabled:hover:text-dark-text"
                  >
                    {status === 'loading' ? 'Sending...' : 'Submit Inquiry'}
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
