import { useState, useCallback } from 'react';
import { NavClickProvider } from './context/NavClickContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductsSection } from './components/ProductsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { ProcessSection } from './components/ProcessSection';
import { InquiryCTA } from './components/InquiryCTA';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { CategoryDetail } from './components/CategoryDetail';
import { RevealSection } from './components/RevealSection';
import { categories } from './data/categories';
import type { Category } from './data/categories';

function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryContext, setInquiryContext] = useState({ category: '', product: '' });
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [productsAnimKey, setProductsAnimKey] = useState(0);

  const openInquiry = useCallback((category = '', product = '') => {
    setInquiryContext({ category, product });
    setInquiryModalOpen(true);
  }, []);

  const handleCategorySelect = useCallback((categoryId: string) => {
    const category = categories.find(c => c.id === categoryId) || null;
    setSelectedCategory(category);
  }, []);

  const handleOpenInquiryFromDetail = useCallback((productName?: string) => {
    if (selectedCategory) {
      openInquiry(selectedCategory.name, productName);
    } else {
      openInquiry();
    }
  }, [selectedCategory, openInquiry]);

  const handleCloseCategory = useCallback(() => setSelectedCategory(null), []);
  const handleCloseInquiry = useCallback(() => setInquiryModalOpen(false), []);
  const handleOpenInquiryFromContact = useCallback(() => openInquiry(), [openInquiry]);

  return (
    <NavClickProvider>
      <div className="min-h-screen">
        <Navbar />
        <Hero onExploreProducts={() => setProductsAnimKey(k => k + 1)} className="content-auto" />
        <RevealSection key={productsAnimKey} delay={0.1}>
          <ProductsSection onCategorySelect={handleCategorySelect} className="content-auto" />
        </RevealSection>
        <RevealSection delay={0.15}>
          <WhyChooseUs className="content-auto" />
        </RevealSection>
        <RevealSection delay={0.1} direction="left">
          <AboutSection className="content-auto" />
        </RevealSection>
        <RevealSection delay={0.1}>
          <ProcessSection className="content-auto" />
        </RevealSection>
        <RevealSection delay={0.1} direction="none">
          <InquiryCTA className="content-auto" />
        </RevealSection>
        <RevealSection delay={0.1} direction="right">
          <ContactSection onOpenInquiry={handleOpenInquiryFromContact} className="content-auto" />
        </RevealSection>
        <RevealSection delay={0.1}>
          <Footer className="content-auto" />
        </RevealSection>

        <CategoryDetail
          category={selectedCategory}
          onClose={handleCloseCategory}
          onOpenInquiry={handleOpenInquiryFromDetail}
        />

        <InquiryModal
          isOpen={inquiryModalOpen}
          onClose={handleCloseInquiry}
          initialCategory={inquiryContext.category}
          initialProduct={inquiryContext.product}
        />
      </div>
    </NavClickProvider>
  );
}

export default App;
