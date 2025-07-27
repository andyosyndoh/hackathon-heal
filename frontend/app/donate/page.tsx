'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import DonationModal from '@/components/DonationModal';
import { Heart, Shield, Eye, Globe, Smartphone, Wallet } from 'lucide-react';

export default function DonatePage() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('mental-health');

  const handleDonateClick = (category: string) => {
    setSelectedCategory(category);
    setIsDonationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Support Mental Health
            <span className="text-blue-600"> Worldwide</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Make transparent cryptocurrency donations to support mental health initiatives. 
            Every contribution helps provide therapy, crisis support, and AI-powered mental health tools.
          </p>
          
          {/* Payment Methods */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Wallet className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">Stellar</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Smartphone className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">M-Pesa</span>
            </div>
          </div>

          <button
            onClick={() => handleDonateClick('mental-health')}
            className="heal-button text-lg px-8 py-4"
          >
            <Heart className="h-5 w-5 mr-2" />
            Donate Now
          </button>
        </div>

        {/* Donation Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              id: 'mental-health',
              title: 'Mental Health Services',
              description: 'Direct therapy sessions and counseling support',
              raised: '$45,230',
              progress: 75,
              icon: Heart
            },
            {
              id: 'crisis-support',
              title: 'Crisis Support',
              description: '24/7 emergency mental health intervention',
              raised: '$32,150',
              progress: 65,
              icon: Shield
            },
            {
              id: 'ai-training',
              title: 'AI Therapy Training',
              description: 'Improving AI models for better mental health support',
              raised: '$28,900',
              progress: 58,
              icon: Globe
            }
          ].map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{category.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Raised: {category.raised}</span>
                    <span>{category.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.progress}%` }}
                    />
                  </div>
                </div>
                
                <button
                  onClick={() => handleDonateClick(category.id)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Donate to {category.title}
                </button>
              </div>
            );
          })}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="p-3 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Transparent</h3>
            <p className="text-gray-600">All donations are recorded on the Stellar blockchain for complete transparency</p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Eye className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Your Impact</h3>
            <p className="text-gray-600">See exactly how your donations are being used to help people worldwide</p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Reach</h3>
            <p className="text-gray-600">Support mental health initiatives across different countries and communities</p>
          </div>
        </div>
      </div>

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        category={selectedCategory}
      />
    </div>
  );
}
