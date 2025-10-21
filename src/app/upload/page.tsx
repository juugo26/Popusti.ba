'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Upload, FileText, Image, Calendar, Store, Tag, MapPin, CheckCircle, ArrowLeft, Search, X } from 'lucide-react';
import { supabase, CatalogData } from '@/lib/supabase';
import ProtectedRoute from '@/components/ProtectedRoute';
import PexelsImagePicker from '@/components/PexelsImagePicker';
import { PexelsPhoto } from '@/lib/pexels';

const catalogSchema = z.object({
  storeName: z.string().min(1, 'Store name is required'),
  title: z.string().min(1, 'Catalog title is required'),
  category: z.string().min(1, 'Category is required'),
  city: z.string().min(1, 'City is required'),
  validFrom: z.string().min(1, 'Valid from date is required'),
  validTo: z.string().min(1, 'Valid to date is required'),
});

type CatalogFormData = z.infer<typeof catalogSchema>;

const categories = ['Groceries', 'Electronics', 'Home', 'Cosmetics'];
const cities = ['Sarajevo', 'Mostar', 'Banja Luka', 'Tuzla'];

export default function UploadPage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPexelsPicker, setShowPexelsPicker] = useState(false);
  const [pexelsImages, setPexelsImages] = useState<{url: string, data: PexelsPhoto}[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CatalogFormData>({
    resolver: zodResolver(catalogSchema)
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handlePexelsImageSelect = (imageUrl: string, imageData: PexelsPhoto) => {
    setPexelsImages(prev => [...prev, { url: imageUrl, data: imageData }]);
  };

  const removePexelsImage = (index: number) => {
    setPexelsImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (files: File[]): Promise<string[]> => {
    if (!supabase) {
      throw new Error('Supabase is not configured');
    }

    const uploadPromises = files.map(async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `catalogs/${fileName}`;

      const { error } = await supabase!.storage
        .from('catalog-files')
        .upload(filePath, file);

      if (error) throw error;

      const { data } = supabase!.storage
        .from('catalog-files')
        .getPublicUrl(filePath);

      return data.publicUrl;
    });

    return Promise.all(uploadPromises);
  };

  const onSubmit = async (data: CatalogFormData) => {
    if (files.length === 0 && pexelsImages.length === 0) {
      alert('Please select at least one file or image to upload');
      return;
    }

    if (!supabase) {
      alert('Supabase is not configured. Please set up your environment variables to enable file uploads.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Upload files to Supabase storage
      const uploadedUrls = await uploadFiles(files);
      setUploadProgress(50);

      // Separate PDF and image URLs
      const pdfUrls = uploadedUrls.filter(url => url.toLowerCase().includes('.pdf'));
      const imageUrls = uploadedUrls.filter(url => !url.toLowerCase().includes('.pdf'));
      
      // Add Pexels images to the image URLs
      const allImageUrls = [...imageUrls, ...pexelsImages.map(img => img.url)];

      // Create catalog record
      const catalogData: CatalogData = {
        title: data.title,
        store: data.storeName,
        category: data.category,
        city: data.city,
        valid_from: data.validFrom,
        valid_to: data.validTo,
        cover_image_url: allImageUrls[0] || uploadedUrls[0],
        pdf_url: pdfUrls[0] || undefined,
        image_urls: allImageUrls.length > 0 ? allImageUrls : undefined,
      };

      const { error } = await supabase!
        .from('catalogs')
        .insert([catalogData]);

      if (error) throw error;

      setUploadProgress(100);
      setShowSuccess(true);
      
      // Reset form and redirect after success
        setTimeout(() => {
          reset();
          setFiles([]);
          setPexelsImages([]);
          setIsUploading(false);
          setUploadProgress(0);
          setShowSuccess(false);
          router.push('/admin');
        }, 2000);

    } catch (error) {
      console.error('Error uploading catalog:', error);
      alert('Error uploading catalog. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <ProtectedRoute adminOnly>
      <div className="bg-gray-50">
        <div className="py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Nazad
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Dodaj novi katalog</h1>
          <p className="text-gray-600 mt-2">Dodajte novi katalog na platformu</p>
        </div>

        {/* Success Notification */}
        {showSuccess && (
          <motion.div
            className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <h3 className="text-green-800 font-semibold">Upload Successful!</h3>
              <p className="text-green-700 text-sm">Your catalog has been uploaded and will appear on the homepage shortly.</p>
            </div>
          </motion.div>
        )}

        {/* Upload Form Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Basic Information</h2>
              
              {/* Store Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Name *
                </label>
                <div className="relative">
                  <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    {...register('storeName')}
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter store name"
                  />
                </div>
                {errors.storeName && (
                  <p className="mt-1 text-sm text-red-600">{errors.storeName.message}</p>
                )}
              </div>

              {/* Catalog Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catalog Title *
                </label>
                <input
                  {...register('title')}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter catalog title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              {/* Category and City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      {...register('category')}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      {...register('city')}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select city</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                  )}
                </div>
              </div>

              {/* Validity Period */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valid From *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...register('validFrom')}
                      type="date"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {errors.validFrom && (
                    <p className="mt-1 text-sm text-red-600">{errors.validFrom.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valid To *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...register('validTo')}
                      type="date"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {errors.validTo && (
                    <p className="mt-1 text-sm text-red-600">{errors.validTo.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">File Upload</h2>
              
              {/* Pexels Image Search Button */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowPexelsPicker(true)}
                  disabled={isUploading}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Search className="w-4 h-4" />
                  Search Pexels Images
                </button>
                <div className="text-sm text-gray-600 flex items-center">
                  {pexelsImages.length > 0 && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {pexelsImages.length} image{pexelsImages.length !== 1 ? 's' : ''} selected
                    </span>
                  )}
                </div>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.webp"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  disabled={isUploading}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Click to upload files
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF or images (JPG, PNG, WebP) - Multiple files allowed
                    </p>
                  </div>
                </label>
              </div>

              {/* Pexels Images Preview */}
              {pexelsImages.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">Selected Pexels Images:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {pexelsImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={img.url}
                            alt={img.data.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removePexelsImage(index)}
                          disabled={isUploading}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs disabled:opacity-50 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          by {img.data.photographer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Uploaded Files Preview */}
              {files.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">Selected Files:</h3>
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {file.type.includes('pdf') ? (
                          <FileText className="w-5 h-5 text-red-500" />
                        ) : (
                          <Image className="w-5 h-5 text-blue-500" />
                        )}
                        <div>
                          <span className="text-sm font-medium text-gray-900">{file.name}</span>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        disabled={isUploading}
                        className="text-red-500 hover:text-red-700 disabled:opacity-50 p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => router.back()}
                disabled={isUploading}
                className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading || (files.length === 0 && pexelsImages.length === 0)}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none font-medium flex items-center gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Uploaduje se...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Dodaj katalog
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
          </div>
        </div>
        
        {/* Pexels Image Picker Modal */}
        <PexelsImagePicker
          category={watch('category') || 'store'}
          onImageSelect={handlePexelsImageSelect}
          selectedImages={pexelsImages.map(img => img.url)}
          isOpen={showPexelsPicker}
          onClose={() => setShowPexelsPicker(false)}
        />
      </div>
    </ProtectedRoute>
  );
}
