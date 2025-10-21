'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert('Hvala vam na poruci! Odgovorićemo vam uskoro.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-gray-50">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Kontaktirajte nas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Imate pitanja ili predloge? Rado ćemo čuti od vas! 
            Naš tim je uvek spreman da vam pomogne.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pošaljite nam poruku</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ime i prezime *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-400 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-600"
                    placeholder="Unesite vaše ime"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email adresa *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-400 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-600"
                    placeholder="Unesite vašu email adresu"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tema *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-400 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-600"
                  placeholder="O čemu se radi?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Poruka *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-400 bg-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-600"
                  placeholder="Opišite vašu poruku..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Šalje se...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Pošaljite poruku
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Kontakt informacije</h2>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    iconColor: "text-blue-600",
                    bgColor: "bg-blue-100",
                    title: "Email",
                    details: ["info@popusti.ba", "support@popusti.ba"]
                  },
                  {
                    icon: Phone,
                    iconColor: "text-green-600",
                    bgColor: "bg-green-100",
                    title: "Telefon",
                    details: ["+387 33 123 456", "+387 61 123 456"]
                  },
                  {
                    icon: MapPin,
                    iconColor: "text-red-600",
                    bgColor: "bg-red-100",
                    title: "Adresa",
                    details: ["Sarajevo, Bosna i Hercegovina", "71000 Sarajevo"]
                  }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.title}
                    className="flex items-start gap-4 hover:scale-105 transition-all duration-300 cursor-pointer group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.2) }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div 
                      className={`w-12 h-12 ${contact.bgColor} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ scale: 1.1 }}
                    >
                      <contact.icon className={`w-6 h-6 ${contact.iconColor}`} />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + (index * 0.2) }}
                    >
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                        {contact.title}
                      </h3>
                      {contact.details.map((detail, detailIndex) => (
                        <motion.p 
                          key={detailIndex}
                          className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: 0.7 + (index * 0.2) + (detailIndex * 0.1) }}
                        >
                          {detail}
                        </motion.p>
                      ))}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Često postavljana pitanja</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Kako mogu dodati svoju radnju?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Kontaktirajte nas putem email-a ili forme iznad sa detaljima o vašoj radnji.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Kada se ažuriraju katalozi?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Katalozi se ažuriraju svakodnevno kako biste uvek imali najnovije informacije.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Da li je korišćenje besplatno?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Da, naša platforma je potpuno besplatna za sve korisnike.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
