'use client';

import { useState } from 'react';
import { Zap } from 'lucide-react';

export function FloatingBoltLogo() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50">
      <div 
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-90 transition-opacity duration-200">
            Powered by Bolt
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
        
        {/* Logo Container */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer flex items-center justify-center group">
          {/* Replace this section with your actual logo */}
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-sm flex items-center justify-center">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-md"></div>
        </div>
      </div>
    </div>
  );
}