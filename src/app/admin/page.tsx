'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Store, Tag, Plus, Trash2, LogOut, Upload } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { supabase } from '@/lib/supabase';

interface Store {
  id: string;
  name: string;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  created_at: string;
}

export default function AdminPage() {
  const { signOut } = useAuth();
  const router = useRouter();
  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newStore, setNewStore] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchStores = async () => {
    if (!supabase) return;
    
    const { data, error } = await supabase
      .from('stores')
      .select('*')
      .order('name');

    if (!error && data) {
      setStores(data);
    }
  };

  const fetchCategories = async () => {
    if (!supabase) return;
    
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (!error && data) {
      setCategories(data);
    }
  };

  useEffect(() => {
    fetchStores();
    fetchCategories();
  }, []);

  const addStore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStore.trim() || !supabase) return;

    setLoading(true);
    const { error } = await supabase
      .from('stores')
      .insert([{ name: newStore.trim() }]);

    if (!error) {
      setNewStore('');
      fetchStores();
    }
    setLoading(false);
  };

  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim() || !supabase) return;

    setLoading(true);
    const { error } = await supabase
      .from('categories')
      .insert([{ name: newCategory.trim() }]);

    if (!error) {
      setNewCategory('');
      fetchCategories();
    }
    setLoading(false);
  };

  const deleteStore = async (id: string) => {
    if (!supabase) return;
    
    setLoading(true);
    const { error } = await supabase
      .from('stores')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchStores();
    }
    setLoading(false);
  };

  const deleteCategory = async (id: string) => {
    if (!supabase) return;
    
    setLoading(true);
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchCategories();
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <ProtectedRoute adminOnly>
      <div className="bg-gray-50">
        {/* Admin Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Store className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.push('/upload')}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg font-medium"
                >
                  <Upload className="w-4 h-4" />
                  Dodaj katalog
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Odjavi se
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Stores Management */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Store className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Upravljanje radnjama</h2>
              </div>

              {/* Add Store Form */}
              <form onSubmit={addStore} className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newStore}
                    onChange={(e) => setNewStore(e.target.value)}
                    placeholder="Unesite naziv radnje"
                    className="flex-1 px-4 py-3 border-2 border-gray-400 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-600"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Dodaj
                  </button>
                </div>
              </form>

              {/* Stores List */}
              <div className="space-y-2">
                {stores.map((store) => (
                  <div
                    key={store.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-900 font-medium">{store.name}</span>
                    <button
                      onClick={() => deleteStore(store.id)}
                      disabled={loading}
                      className="text-red-500 hover:text-red-700 disabled:opacity-50 p-1 transition-all duration-200 hover:scale-110"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Categories Management */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Tag className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Upravljanje kategorijama</h2>
              </div>

              {/* Add Category Form */}
              <form onSubmit={addCategory} className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Unesite naziv kategorije"
                    className="flex-1 px-4 py-3 border-2 border-gray-400 bg-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 placeholder-gray-600"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Dodaj
                  </button>
                </div>
              </form>

              {/* Categories List */}
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-900 font-medium">{category.name}</span>
                    <button
                      onClick={() => deleteCategory(category.id)}
                      disabled={loading}
                      className="text-red-500 hover:text-red-700 disabled:opacity-50 p-1 transition-all duration-200 hover:scale-110"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Info Card */}
          <motion.div
            className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Kako funkcioniše admin panel?
            </h3>
            <ul className="text-blue-800 space-y-1 text-sm">
              <li>• Dodajte nove radnje koje će se pojaviti u filterima na početnoj strani</li>
              <li>• Dodajte nove kategorije za bolju organizaciju kataloga</li>
              <li>• Koristite "Dodaj katalog" dugme za upload novih kataloga</li>
              <li>• Sve promjene se automatski sinhronizuju sa početnom stranom</li>
            </ul>
          </motion.div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
