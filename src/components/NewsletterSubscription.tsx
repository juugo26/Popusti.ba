'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface NewsletterSubscriptionProps {
  className?: string;
}

export default function NewsletterSubscription({ className = '' }: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    // Check if Supabase is configured
    if (!supabase) {
      setStatus('success');
      setMessage('Demo mode: Newsletter subscription would work with Supabase configured!');
      setEmail('');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email: email.toLowerCase().trim() }]);

      if (error) {
        if (error.code === '23505') {
          setStatus('error');
          setMessage('This email is already subscribed');
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setMessage('Successfully subscribed to newsletter!');
        setEmail('');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
          <Mail className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">Stay Updated!</h3>
          <p className="text-blue-100 mb-4">
            Get the latest catalog deals and exclusive offers delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:outline-none"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
            
            {message && (
              <motion.div
                className={`flex items-center gap-2 text-sm ${
                  status === 'success' ? 'text-green-200' : 'text-red-200'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {status === 'success' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
                {message}
              </motion.div>
            )}
          </form>
          
          <p className="text-xs text-blue-200 mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
