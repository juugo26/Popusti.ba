'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Catalog } from './CatalogCard';

interface CatalogViewerProps {
  catalog: Catalog | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CatalogViewer({ catalog, isOpen, onClose }: CatalogViewerProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    if (catalog?.pdfUrl) {
      setPdfUrl(catalog.pdfUrl);
    }
  }, [catalog]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    prevArrow: <ChevronLeft className="w-6 h-6 text-white" />,
    nextArrow: <ChevronRight className="w-6 h-6 text-white" />,
    customPaging: (i: number) => (
      <div className={`w-2 h-2 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/50'}`} />
    ),
  };

  const handleDownload = () => {
    if (catalog?.pdfUrl) {
      const link = document.createElement('a');
      link.href = catalog.pdfUrl;
      link.download = `${catalog.store}-${catalog.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!catalog) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{catalog.title}</h2>
                <p className="text-sm text-gray-600">{catalog.store} • {catalog.city}</p>
              </div>
              <div className="flex items-center gap-2">
                {catalog.pdfUrl && (
                  <button
                    onClick={handleDownload}
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    title="Download PDF"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 max-h-[calc(90vh-80px)] overflow-auto">
              {catalog.pdfUrl ? (
                // PDF Viewer
                <div className="w-full h-[600px]">
                  <iframe
                    src={`${catalog.pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                    className="w-full h-full border-0 rounded-lg"
                    title={catalog.title}
                  />
                </div>
              ) : catalog.images && catalog.images.length > 0 ? (
                // Image Gallery
                <div className="relative">
                  <Slider {...sliderSettings} ref={sliderRef}>
                    {catalog.images.map((image, index) => (
                      <div key={index} className="px-2">
                        <div className="relative w-full h-[600px]">
                          <Image
                            src={image}
                            alt={`${catalog.title} - Page ${index + 1}`}
                            fill
                            className="object-contain rounded-lg"
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>
                  
                  {/* Slide Counter */}
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {currentSlide + 1} / {catalog.images.length}
                  </div>
                </div>
              ) : (
                // Fallback - Show cover image
                <div className="flex items-center justify-center h-[400px]">
                  <div className="text-center">
                    <Image
                      src={catalog.coverImage}
                      alt={catalog.title}
                      width={400}
                      height={300}
                      className="rounded-lg shadow-lg"
                    />
                    <p className="mt-4 text-gray-600">No additional content available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>
                  Valid: {new Date(catalog.validFrom).toLocaleDateString('bs-BA')} - {new Date(catalog.validTo).toLocaleDateString('bs-BA')}
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {catalog.category}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
