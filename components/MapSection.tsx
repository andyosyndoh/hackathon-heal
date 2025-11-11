"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues
const DynamicMap = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">Loading map...</div>
});

const Map = () => {
  return <DynamicMap />;
};

export default Map;