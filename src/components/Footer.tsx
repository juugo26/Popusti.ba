'use client';

import { motion } from 'framer-motion';
import { Store, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer 
      className="bg-gray-900 text-white py-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold">popusti.ba</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Vaša destinacija za najbolje kataloške akcije u Bosni i Hercegovini.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Brzi linkovi</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">O nama</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">Kontakt</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Politika privatnosti</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Povezujte se</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Facebook</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Instagram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Twitter</a></li>
              </ul>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-400 text-sm">
            © 2025 Muhamed Jugo - Sva prava zadržana
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1 mt-4 md:mt-0">
            Napravljeno sa <Heart className="w-4 h-4 text-red-500" /> u BiH
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
