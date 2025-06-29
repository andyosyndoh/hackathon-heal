'use client';

import { useState } from 'react';
import { Zap } from 'lucide-react';

export function FloatingBoltLogo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open('https://bolt.new/', '_blank')}
    >
      {/* Logo Container */}
      <div className={`
        relative w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 
        rounded-full shadow-lg hover:shadow-xl transition-all duration-300 
        flex items-center justify-center
        ${isHovered ? 'scale-110 shadow-2xl' : 'scale-100'}
      `}>
        {/* With your actual logo */}
        <img
          src="/images/black-logo.png"
          alt="Bolt Logo"
          className="w-19 h-19 object-contain"
        />

        {/* Glow Effect */}
        <div className={`
          absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 
          rounded-full transition-opacity duration-300
          ${isHovered ? 'opacity-20 scale-150' : 'opacity-0 scale-100'}
        `} />
      </div>

      {/* Tooltip */}
      <div className={`
        absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
        px-3 py-1 bg-gray-900 text-white text-sm rounded-lg
        whitespace-nowrap transition-all duration-200
        ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}>
        Powered by Bolt
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
}