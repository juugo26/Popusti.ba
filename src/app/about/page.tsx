'use client';

import { motion } from 'framer-motion';
import { Users, Target, Heart, Store } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            O nama
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            popusti.ba je vaša destinacija za pronalaženje najboljih kataloških akcija 
            u Bosni i Hercegovini. Povezujemo vas sa najnovijim ponudama iz vaših omiljenih prodavnica.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div 
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Target className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Naša misija</h2>
            </motion.div>
            <motion.p 
              className="text-gray-700 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Naša misija je da olakšamo pronalaženje najboljih akcija i popusta u vašoj lokalnoj zajednici. 
              Verujemo da svako zaslužuje pristup kvalitetnim proizvodima po pristupačnim cenama. 
              Kroz našu platformu, pomažemo vam da uštedite novac dok istovremeno podržavate lokalne biznise.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-900 text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Naše vrednosti
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Store,
                iconColor: "text-blue-600",
                bgColor: "bg-blue-100",
                title: "Transparentnost",
                description: "Pružamo jasne i tačne informacije o svim akcijama i katalogima."
              },
              {
                icon: Users,
                iconColor: "text-green-600",
                bgColor: "bg-green-100",
                title: "Zajednica",
                description: "Gradimo zajednicu koja dijeli informacije o najboljim akcijama."
              },
              {
                icon: Heart,
                iconColor: "text-red-600",
                bgColor: "bg-red-100",
                title: "Strast",
                description: "Strastveno radimo na tome da vam pružimo najbolje iskustvo."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + (index * 0.2) }}
              >
                <motion.div 
                  className={`w-16 h-16 ${value.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.6 + (index * 0.2) }}
                >
                  <value.icon className={`w-8 h-8 ${value.iconColor}`} />
                </motion.div>
                <motion.h3 
                  className="text-xl font-semibold text-gray-900 mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.8 + (index * 0.2) }}
                >
                  {value.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.0 + (index * 0.2) }}
                >
                  {value.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Naš tim</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Naš tim se sastoji od strastvenih pojedinaca koji veruju u snagu lokalne zajednice 
              i žele da pruže najbolje moguće iskustvo našim korisnicima.
            </p>
            <p className="text-gray-600">
              Kontinuirano radimo na poboljšanju naše platforme i dodavanju novih funkcionalnosti 
              koje će vam pomoći da pronađete najbolje akcije u vašoj okolini.
            </p>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Pridružite se našoj zajednici!</h2>
            <p className="text-xl text-blue-100 mb-6">
              Otkrijte najbolje akcije u vašoj okolini i uštedite novac na svakodnevnim kupovinama.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Počnite pretragu
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
