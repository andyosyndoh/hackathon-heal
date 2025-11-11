"use client";

import React from 'react';

const Map = () => {
  return (
    <div className="w-full h-[500px] bg-gray-100 rounded-lg shadow-lg flex items-center justify-center border">
      <div className="text-center p-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Our Location</h3>
        <p className="text-gray-600 mb-4">Visit us at our office for in-person consultations</p>
        <div className="text-sm text-gray-500">
          <p>123 Mental Health Street</p>
          <p>Wellness City, WC 12345</p>
          <p>Phone: (555) 123-4567</p>
        </div>
      </div>
    </div>
  );
};

export default Map;