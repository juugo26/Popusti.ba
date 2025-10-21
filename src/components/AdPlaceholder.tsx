'use client';

import { motion } from 'framer-motion';

interface AdPlaceholderProps {
  type: 'sidebar' | 'grid' | 'mobile-banner' | 'featured';
  className?: string;
}

export default function AdPlaceholder({ type, className = '' }: AdPlaceholderProps) {
  const getAdDimensions = () => {
    switch (type) {
      case 'sidebar':
        return { width: 300, height: 250, text: '300x250 Sidebar Ad' };
      case 'grid':
        return { width: 728, height: 90, text: '728x90 Leaderboard' };
      case 'mobile-banner':
        return { width: 320, height: 50, text: '320x50 Mobile Banner' };
      case 'featured':
        return { width: 728, height: 90, text: '728x90 Featured Ad' };
      default:
        return { width: 300, height: 250, text: 'Ad Space' };
    }
  };

  const dimensions = getAdDimensions();

  return (
    <motion.div
      className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 ${className}`}
      style={{ 
        width: type === 'sidebar' ? '100%' : `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        minHeight: type === 'mobile-banner' ? '50px' : undefined
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <div className="text-sm font-medium mb-1">Advertisement</div>
        <div className="text-xs">{dimensions.text}</div>
        <div className="text-xs mt-1">
          {dimensions.width} × {dimensions.height}
        </div>
      </div>
    </motion.div>
  );
}
