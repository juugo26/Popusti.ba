'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store, Menu, X, Upload } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

  const navigation = [
    { name: 'Početna', href: '/' },
    { name: 'Katalozi', href: '/catalogs' },
    { name: 'Izdvojeno', href: '/izdvojeno', accent: true },
    { name: 'O nama', href: '/about' },
    { name: 'Kontakt', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">popusti.ba</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-all duration-200 relative group ${
                  isActive(item.href)
                    ? (item.accent ? 'text-amber-600' : 'text-blue-600')
                    : (item.accent ? 'text-amber-600/90 hover:text-amber-600' : 'text-gray-700 hover:text-blue-600')
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full ${
                    item.accent ? 'bg-amber-500' : 'bg-blue-600'
                  } ${isActive(item.href) ? 'w-full' : ''}`}
                />
              </Link>
            ))}
          </nav>

          {/* Admin Panel Button - Only for authenticated users */}
          {user && (
            <div className="hidden md:flex items-center gap-4">
              <Link 
                href="/admin"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg font-medium"
              >
                <Upload className="w-4 h-4" />
                Admin Panel
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="px-4 py-4 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? (item.accent ? 'text-amber-600' : 'text-blue-600')
                      : (item.accent ? 'text-amber-600/90 hover:text-amber-600' : 'text-gray-700 hover:text-blue-600')
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {user && (
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 font-medium"
                >
                  Admin Panel
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
