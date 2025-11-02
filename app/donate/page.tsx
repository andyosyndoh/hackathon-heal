'use client';

import { useState } from 'react';
import { Heart, Users, Shield, Target } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function DonatePage() {
  console.log('Donate page is loading!');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  const donationOptions = [
    {
      amount: 30,
      icon: Heart,
      title: '$30',
      description: 'Provide emergency support for survivors',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      amount: 10,
      icon: Heart,
      title: '$10',
      description: 'Provide emergency support for survivors',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      amount: 30,
      icon: Shield,
      title: '$30',
      description: 'Provide emergency support for survivors',
      color: 'bg-green-100 text-green-600'
    },
    {
      amount: 60,
      icon: Users,
      title: '$60',
      description: 'Establish new support group in one community',
      color: 'bg-teal-100 text-teal-600'
    },
    {
      amount: 500,
      icon: Heart,
      title: '$500',
      description: 'Provide emergency support for survivors',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      amount: 1000,
      icon: Target,
      title: '$1000',
      description: 'Provide emergency support for survivors',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="font-acme text-4xl md:text-5xl font-bold text-[#056173] mb-6">
            Support Our Mission
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Your donation helps us provide life-saving support, resources and advocacy for GBV 
            survivors across Kenya
          </p>
        </div>

        {/* Our Impact Section */}
        <div className="text-center mb-12">
          <h2 className="font-acme text-3xl font-bold text-[#056173] mb-8">
            Our Impact
          </h2>
          
          {/* Donation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {donationOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedAmount(option.amount)}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                    selectedAmount === option.amount 
                      ? 'border-[#056173] ring-2 ring-[#056173]/20' 
                      : 'border-transparent hover:border-[#81A9AD]'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full ${option.color} flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-acme text-2xl font-bold text-[#056173] mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {option.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Custom Amount */}
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-md mx-auto mb-8">
            <h3 className="font-acme text-xl font-bold text-[#056173] mb-4">
              Custom Amount
            </h3>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">$</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                placeholder="Enter amount"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#056173] focus:border-transparent text-lg"
              />
            </div>
          </div>

          {/* Donation Button */}
          <button
            disabled={!selectedAmount && !customAmount}
            className={`font-acme text-lg px-8 py-4 rounded-full transition-all duration-300 ${
              selectedAmount || customAmount
                ? 'bg-[#056173] hover:bg-[#0C444B] text-white shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Donate {selectedAmount ? `$${selectedAmount}` : customAmount ? `$${customAmount}` : 'Now'}
          </button>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mt-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-600" />
              <span>100% Goes to Survivors</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span>Trusted by 10,000+ Donors</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}