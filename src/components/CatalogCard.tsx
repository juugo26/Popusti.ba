'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Store, Eye, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export interface Catalog {
  id: string;
  title: string;
  store: string;
  coverImage: string;
  validFrom: string;
  validTo: string;
  category: string;
  city: string;
  pdfUrl?: string;
  images?: string[];
}

interface CatalogCardProps {
  catalog: Catalog;
  onViewCatalog: (catalog: Catalog) => void;
}

export default function CatalogCard({ catalog, onViewCatalog }: CatalogCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}. ${month}. ${year}.`;
  };

  const isExpiringSoon = () => {
    const validTo = new Date(catalog.validTo);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((validTo.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 3 && daysUntilExpiry >= 0;
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onViewCatalog(catalog)}
    >
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-200">
        {!imageError ? (
          <Image
            src={catalog.coverImage}
            alt={catalog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
            <div className="text-center">
              <ImageIcon className="w-12 h-12 text-blue-400 mx-auto mb-2" />
              <p className="text-blue-600 text-sm font-medium">{catalog.store}</p>
            </div>
          </div>
        )}
        {isExpiringSoon() && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Uskoro ističe
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Eye className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Store Name */}
        <div className="flex items-center gap-2 mb-2">
          <Store className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-600">{catalog.store}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {catalog.title}
        </h3>

        {/* Validity Period */}
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {formatDate(catalog.validFrom)} - {formatDate(catalog.validTo)}
          </span>
        </div>

        {/* Category and City */}
        <div className="flex gap-2 mb-4">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {catalog.category}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
            {catalog.city}
          </span>
        </div>

        {/* View Button */}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group/btn"
          onClick={(e) => {
            e.stopPropagation();
            onViewCatalog(catalog);
          }}
        >
          <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
          Pogledaj katalog
        </button>
      </div>
    </motion.div>
  );
}
