'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Store, Calendar, MapPin, Clock, Star, Mail, Heart } from 'lucide-react';
import CatalogCard, { Catalog } from '@/components/CatalogCard';
import CatalogViewer from '@/components/CatalogViewer';

// Mock data for demonstration
const mockCatalogs: Catalog[] = [
  {
    id: '1',
    title: 'Nova Akcija - Groceries',
    store: 'Bingo',
    coverImage: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    validFrom: '2024-01-15',
    validTo: '2024-01-22',
    category: 'Namirnice',
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
    category: 'Elektronika',
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
    category: 'Kuća',
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
    category: 'Kozmetika',
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
    category: 'Namirnice',
    city: 'Mostar',
    images: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&h=600&fit=crop'
    ]
  }
];

const stores = ['Sve', 'Bingo', 'Konzum', 'Robot', 'DM', 'Techno Shop'];
const categories = ['Sve', 'Namirnice', 'Elektronika', 'Kuća', 'Kozmetika'];
const cities = ['Sve', 'Sarajevo', 'Mostar', 'Banja Luka', 'Tuzla'];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState('Sve');
  const [selectedCategory, setSelectedCategory] = useState('Sve');
  const [selectedCity, setSelectedCity] = useState('Sve');
  const [selectedCatalog, setSelectedCatalog] = useState<Catalog | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [email, setEmail] = useState('');

  const filteredCatalogs = useMemo(() => {
    return mockCatalogs.filter(catalog => {
      const matchesSearch = catalog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           catalog.store.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStore = selectedStore === 'Sve' || catalog.store === selectedStore;
      const matchesCategory = selectedCategory === 'Sve' || catalog.category === selectedCategory;
      const matchesCity = selectedCity === 'Sve' || catalog.city === selectedCity;

      return matchesSearch && matchesStore && matchesCategory && matchesCity;
    });
  }, [searchTerm, selectedStore, selectedCategory, selectedCity]);

  const latestCatalogs = mockCatalogs.slice(0, 6);
  const expiringSoonCatalogs = mockCatalogs.filter(catalog => {
    const validTo = new Date(catalog.validTo);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((validTo.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 3 && daysUntilExpiry >= 0;
  });

  const handleViewCatalog = (catalog: Catalog) => {
    setSelectedCatalog(catalog);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedCatalog(null);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Hvala vam na pretplati! (Demo mod)');
      setEmail('');
    }
  };

  return (
    <div className="bg-gray-50">

      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Pronađite najbolje akcije u Bosni i Hercegovini
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Otkrijte nevjerovatne kataloške akcije iz vaših omiljenih prodavnica. Uštedite na namirnicama, elektronici, kućnim potrepštinama i još mnogo toga.
          </motion.p>
        </div>
      </motion.section>

      {/* Search and Filter Section */}
      <motion.section 
        className="bg-white py-8 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Pretražite kataloge, prodavnice ili proizvode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-16 py-4 border-2 border-gray-600 bg-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg text-gray-900 placeholder-gray-700 font-medium"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Filter Bar */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Store Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none font-medium text-gray-900"
              >
                {stores.map(store => (
                  <option key={store} value={store}>{store}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none font-medium text-gray-900"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none font-medium text-gray-900"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Latest Catalogs Section */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div 
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <Clock className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Najnoviji katalozi</h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {latestCatalogs.map((catalog, index) => (
              <motion.div
                key={catalog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + (index * 0.1) }}
              >
                <CatalogCard
                  catalog={catalog}
                  onViewCatalog={handleViewCatalog}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Expiring Soon Section */}
        {expiringSoonCatalogs.length > 0 && (
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <motion.div 
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              <Clock className="w-8 h-8 text-red-500" />
              <h2 className="text-3xl font-bold text-gray-900">Uskoro ističe</h2>
              <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full font-medium">
                Manje od 3 dana
              </span>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.0 }}
            >
              {expiringSoonCatalogs.map((catalog, index) => (
                <motion.div
                  key={catalog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.2 + (index * 0.1) }}
                >
                  <CatalogCard
                    catalog={catalog}
                    onViewCatalog={handleViewCatalog}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* All Catalogs Section */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.4 }}
        >
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 2.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Svi katalozi ({filteredCatalogs.length})
            </h2>
          </motion.div>

          {filteredCatalogs.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.8 }}
            >
              {filteredCatalogs.map((catalog, index) => (
                <motion.div
                  key={catalog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 3.0 + (index * 0.05) }}
                >
                  <CatalogCard
                    catalog={catalog}
                    onViewCatalog={handleViewCatalog}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 2.8 }}
            >
              <Store className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Nema pronađenih kataloga</h3>
              <p className="text-gray-600 text-lg">Pokušajte prilagoditi pretragu ili kriterije filtriranja</p>
            </motion.div>
          )}
        </motion.section>

        {/* Newsletter Section */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.2 }}
        >
          <motion.div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 3.4 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 3.6 }}
            >
              <Mail className="w-16 h-16 mx-auto mb-6 text-blue-200" />
              <h2 className="text-3xl font-bold mb-4">Ostanite informisani!</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Pretplatite se da dobijate najnovije kataloge i ekskluzivne akcije direktno u vaš inbox.
              </p>
            </motion.div>
            
            <motion.form 
              onSubmit={handleNewsletterSubmit} 
              className="max-w-md mx-auto flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 3.8 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Unesite vašu email adresu"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-700 bg-white border-2 border-white focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:outline-none focus:border-white font-medium"
                required
              />
              <button
                type="submit"
                className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105 hover:shadow-lg border-2 border-white"
              >
                Pretplati se
              </button>
            </motion.form>
          </motion.div>
        </motion.section>
      </main>


      {/* Catalog Viewer Modal */}
      <CatalogViewer
        catalog={selectedCatalog}
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
      />
    </div>
  );
}