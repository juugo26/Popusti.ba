'use client';

import { useState, useEffect } from 'react';
import { supabase, CatalogData } from '@/lib/supabase';
import { Catalog } from '@/components/CatalogCard';

export function useCatalogs() {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const convertToCatalog = (data: CatalogData): Catalog => ({
    id: data.id!,
    title: data.title,
    store: data.store,
    coverImage: data.cover_image_url || '',
    validFrom: data.valid_from,
    validTo: data.valid_to,
    category: data.category,
    city: data.city,
    pdfUrl: data.pdf_url,
    images: data.image_urls,
  });

  const fetchCatalogs = async () => {
    try {
      setLoading(true);
      setError(null);

      // If Supabase is not configured, use mock data
      if (!supabase) {
        // Import mock data for demo purposes
        const mockCatalogs = [
          {
            id: '1',
            title: 'Nova Akcija - Groceries',
            store: 'Bingo',
            coverImage: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            validFrom: '2024-01-15',
            validTo: '2024-01-22',
            category: 'Groceries',
            city: 'Sarajevo',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          },
          {
            id: '2',
            title: 'Electronics Sale',
            store: 'Konzum',
            coverImage: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            validFrom: '2024-01-16',
            validTo: '2024-01-25',
            category: 'Electronics',
            city: 'Mostar',
            images: [
              'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop',
              'https://images.unsplash.com/photo-1511707171631-9ed2a9a2b5d9?w=800&h=600&fit=crop',
              'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop'
            ]
          },
          {
            id: '3',
            title: 'Home & Beauty Week',
            store: 'Robot',
            coverImage: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            validFrom: '2024-01-14',
            validTo: '2024-01-20',
            category: 'Home',
            city: 'Banja Luka',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          },
          {
            id: '4',
            title: 'Auto Parts Special',
            store: 'DM',
            coverImage: 'https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            validFrom: '2024-01-18',
            validTo: '2024-01-28',
            category: 'Auto',
            city: 'Tuzla',
            images: [
              'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop',
              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
            ]
          },
          {
            id: '5',
            title: 'Beauty Essentials',
            store: 'Bingo',
            coverImage: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            validFrom: '2024-01-20',
            validTo: '2024-01-23',
            category: 'Beauty',
            city: 'Sarajevo',
            pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
          },
          {
            id: '6',
            title: 'Fresh Produce Week',
            store: 'Konzum',
            coverImage: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
            validFrom: '2024-01-22',
            validTo: '2024-01-29',
            category: 'Groceries',
            city: 'Mostar',
            images: [
              'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop',
              'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&h=600&fit=crop'
            ]
          }
        ];
        setCatalogs(mockCatalogs);
        return;
      }

      const { data, error } = await supabase
        .from('catalogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const convertedCatalogs = data?.map(convertToCatalog) || [];
      setCatalogs(convertedCatalogs);
    } catch (err) {
      console.error('Error fetching catalogs:', err);
      setError('Failed to load catalogs');
    } finally {
      setLoading(false);
    }
  };

  const getLatestCatalogs = (limit: number = 6): Catalog[] => {
    return catalogs.slice(0, limit);
  };

  const getExpiringSoonCatalogs = (days: number = 3): Catalog[] => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));

    return catalogs.filter(catalog => {
      const validTo = new Date(catalog.validTo);
      return validTo >= today && validTo <= futureDate;
    });
  };

  const getFeaturedCatalogs = (): Catalog[] => {
    return catalogs.filter(catalog => {
      // For now, we'll use a simple check - in real app, this would be based on is_featured field
      return catalog.store === 'Bingo' || catalog.store === 'Konzum';
    });
  };

  useEffect(() => {
    fetchCatalogs();
  }, []);

  return {
    catalogs,
    loading,
    error,
    refetch: fetchCatalogs,
    getLatestCatalogs,
    getExpiringSoonCatalogs,
    getFeaturedCatalogs,
  };
}
