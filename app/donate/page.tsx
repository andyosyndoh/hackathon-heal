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
          <p className="font-inter text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
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
                  <p className="font-inter text-gray-600 text-sm leading-relaxed">
                    {option.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Donation Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto mb-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="h-6 w-6 text-[#056173]" />
              <h3 className="font-acme text-xl font-semibold text-[#056173]">Make a Donation</h3>
            </div>

            {/* Donating type */}
            <div className="mb-6">
              <label className="font-inter block text-sm font-medium text-[#056173] mb-3">Donating type</label>
              <div className="grid grid-cols-2 gap-3">
                <button className="font-acme bg-[#81A9AD] text-white py-2 px-4 rounded text-sm font-medium">
                  One-Time
                </button>
                <button className="font-acme bg-[#81A9AD] text-white py-2 px-4 rounded text-sm font-medium">
                  Monthly
                </button>
              </div>
            </div>

            {/* Donation amount */}
            <div className="mb-6">
              <label className="font-inter block text-sm font-medium text-[#056173] mb-3">Donation amount (USD$)</label>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <button className="font-acme bg-[#056173] text-white py-2 px-4 rounded text-sm font-medium">$26</button>
                <button className="font-acme bg-[#056173] text-white py-2 px-4 rounded text-sm font-medium">$50</button>
                <button className="font-acme bg-[#056173] text-white py-2 px-4 rounded text-sm font-medium relative">
                  $100
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1 rounded">✓</span>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <button className="font-acme bg-[#056173] text-white py-2 px-4 rounded text-sm font-medium">$200</button>
                <button className="font-acme bg-[#056173] text-white py-2 px-4 rounded text-sm font-medium">$800</button>
                <button className="font-acme bg-[#056173] text-white py-2 px-4 rounded text-sm font-medium relative">
                  $1000
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 rounded">274 x 4%</span>
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="text"
                  className="font-inter w-full pl-8 pr-4 py-2 border border-gray-300 rounded bg-gray-50"
                  placeholder=""
                />
              </div>
            </div>

            {/* Donor Information */}
            <div className="mb-6">
              <h4 className="font-acme text-lg font-medium text-[#056173] mb-4">Donor Information</h4>
              <div className="mb-4">
                <label className="font-inter flex items-center gap-2 text-sm text-[#056173]">
                  <input type="checkbox" className="rounded" />
                  Make this donation anonymous
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="font-inter block text-sm font-medium text-[#056173] mb-1">Full Name*</label>
                  <input type="text" className="font-inter w-full py-2 px-3 border border-gray-300 rounded bg-gray-50" />
                </div>
                <div>
                  <label className="font-inter block text-sm font-medium text-[#056173] mb-1">Email Address*</label>
                  <input type="email" className="font-inter w-full py-2 px-3 border border-gray-300 rounded bg-gray-50" />
                </div>
              </div>
              <div>
                <label className="font-inter block text-sm font-medium text-[#056173] mb-1">Phone Number (optional)</label>
                <input type="tel" className="font-inter w-full py-2 px-3 border border-gray-300 rounded bg-gray-50" />
              </div>
            </div>

            {/* Donate Button */}
            <button className="font-acme w-full bg-[#056173] hover:bg-[#0C444B] text-white py-3 px-6 rounded font-medium transition-colors flex items-center justify-center gap-2">
              <Heart className="h-4 w-4" />
              Donate$
            </button>
          </div>

          {/* Other Ways to Help */}
          <div className="mb-8">
            <h2 className="font-acme text-2xl font-semibold text-[#056173] text-center mb-6">Other Ways to Help</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-md text-center">
                <Users className="h-8 w-8 text-[#056173] mx-auto mb-3" />
                <h3 className="font-acme font-semibold text-[#056173] mb-2">Volunteer</h3>
                <p className="font-inter text-sm text-gray-600 mb-4">Join our team of dedicated volunteers</p>
                <button className="font-acme bg-[#056173] text-white px-4 py-2 rounded text-sm hover:bg-[#0C444B] transition-colors">
                  Learn more
                </button>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md text-center">
                <Heart className="h-8 w-8 text-[#056173] mx-auto mb-3" />
                <h3 className="font-acme font-semibold text-[#056173] mb-2">Spread Awareness</h3>
                <p className="font-inter text-sm text-gray-600 mb-4">Share our mission with your network</p>
                <button className="font-acme bg-[#056173] text-white px-4 py-2 rounded text-sm hover:bg-[#0C444B] transition-colors">
                  Our Story
                </button>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md text-center">
                <Shield className="h-8 w-8 text-[#056173] mx-auto mb-3" />
                <h3 className="font-acme font-semibold text-[#056173] mb-2">Corporate Partnership</h3>
                <p className="font-inter text-sm text-gray-600 mb-4">Partner with us to make a bigger impact</p>
                <button className="font-acme bg-[#056173] text-white px-4 py-2 rounded text-sm hover:bg-[#0C444B] transition-colors">
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {/* Secure & trusted */}
          <div className="bg-white rounded-lg p-6 shadow-md max-w-2xl mx-auto text-center">
            <Shield className="h-8 w-8 text-[#056173] mx-auto mb-3" />
            <h3 className="font-acme text-lg font-semibold text-[#056173] mb-3">Secure & trusted</h3>
            <p className="font-inter text-sm text-gray-600 mb-4 leading-relaxed">
              Your is secure and will be used efficiently to support GBV survivors. We are committed to transparency and provide regular updates on how your contributions makes a difference
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="font-inter bg-gray-100 text-[#056173] px-3 py-1 rounded-full text-xs font-medium">
                SSL Secured
              </span>
              <span className="font-inter bg-gray-100 text-[#056173] px-3 py-1 rounded-full text-xs font-medium">
                Transparent Reporting
              </span>
              <span className="font-inter bg-gray-100 text-[#056173] px-3 py-1 rounded-full text-xs font-medium">
                Direct Impact
              </span>
            </div>
          </div>




        </div>
      </main>
    </div>
  );
}