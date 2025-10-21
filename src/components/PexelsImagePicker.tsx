'use client';

import { useState, useEffect } from 'react';
import { Search, Download, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import pexelsAPI, { PexelsPhoto } from '@/lib/pexels';

interface PexelsImagePickerProps {
  category: string;
  onImageSelect: (imageUrl: string, imageData: PexelsPhoto) => void;
  selectedImages: string[];
  isOpen: boolean;
  onClose: () => void;
}

export default function PexelsImagePicker({
  category,
  onImageSelect,
  selectedImages,
  isOpen,
  onClose,
}: PexelsImagePickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Generate search terms based on category
  const getSearchTerms = () => {
    const terms = pexelsAPI.getCategorySearchTerms(category);
    return terms[Math.floor(Math.random() * terms.length)];
  };

  // Load initial photos when component opens
  useEffect(() => {
    if (isOpen && photos.length === 0) {
      loadPhotos();
    }
  }, [isOpen, category]);

  const loadPhotos = async (searchTerm?: string, pageNum = 1) => {
    setLoading(true);
    setError(null);

    try {
      const query = searchTerm || searchQuery || getSearchTerms();
      const response = await pexelsAPI.searchPhotos(query, pageNum, 20);
      
      if (pageNum === 1) {
        setPhotos(response.photos);
      } else {
        setPhotos(prev => [...prev, ...response.photos]);
      }
      
      setHasMore(response.photos.length === 20);
      setPage(pageNum);
    } catch (err) {
      setError('Failed to load images. Please try again.');
      console.error('Error loading Pexels photos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setPhotos([]);
      setPage(1);
      loadPhotos(searchQuery.trim(), 1);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      loadPhotos(searchQuery, page + 1);
    }
  };

  const handleImageSelect = (photo: PexelsPhoto) => {
    onImageSelect(photo.src.large, photo);
  };

  const isImageSelected = (photo: PexelsPhoto) => {
    return selectedImages.includes(photo.src.large);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Choose Images from Pexels</h2>
              <p className="text-gray-600 mt-1">Search and select images for your catalog</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search for ${category.toLowerCase()} images...`}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                Search
              </button>
            </form>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            {photos.length === 0 && !loading ? (
              <div className="text-center py-12">
                <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No images found. Try a different search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    className="relative group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={photo.src.medium}
                        alt={photo.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                          {isImageSelected(photo) ? (
                            <div className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                              <Download className="w-4 h-4" />
                              Selected
                            </div>
                          ) : (
                            <button
                              onClick={() => handleImageSelect(photo)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              Select
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Photographer credit */}
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded truncate">
                          by {photo.photographer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {hasMore && photos.length > 0 && (
              <div className="text-center mt-6">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Load More'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Images provided by{' '}
                <a
                  href="https://www.pexels.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Pexels
                </a>
              </p>
              <div className="text-sm text-gray-600">
                {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
