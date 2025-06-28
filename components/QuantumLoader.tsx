'use client';

import { useEffect } from 'react';

const QuantumLoader = () => {
  useEffect(() => {
    // Only import and register on client side
    const loadQuantum = async () => {
      try {
        const { quantum } = await import('ldrs');
        quantum.register();
      } catch (error) {
        console.warn('Failed to load quantum loader:', error);
      }
    };
    
    loadQuantum();
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
      <l-quantum size="45" speed="1.75" color="white"></l-quantum>
      <p className="text-white text-lg">Loading...</p>
    </div>
  );
};

export default QuantumLoader;