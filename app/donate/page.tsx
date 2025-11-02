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
    <div className="min-h-screen bg-[#FEF5E3]">
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

        {/* Impact Preview */}
        <div className="text-center mb-8">
          <h2 className="font-acme text-2xl font-bold text-[#056173] mb-4">
            Your Impact
          </h2>
          <p className="font-inter text-gray-600 mb-6">See how your donation makes a difference</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
            <div className="bg-white rounded-lg p-4 shadow-md border-2 border-transparent hover:border-[#056173] hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
              <div className="w-10 h-10 bg-[#81A9AD] rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-[#056173] transition-colors">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-acme text-lg font-bold text-[#056173] group-hover:text-[#0C444B]">$30</h3>
              <p className="font-inter text-xs text-gray-600">Emergency support</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md border-2 border-transparent hover:border-[#056173] hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
              <div className="w-10 h-10 bg-[#81A9AD] rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-[#056173] transition-colors">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-acme text-lg font-bold text-[#056173] group-hover:text-[#0C444B]">$100</h3>
              <p className="font-inter text-xs text-gray-600">Support group setup</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md border-2 border-transparent hover:border-[#056173] hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
              <div className="w-10 h-10 bg-[#81A9AD] rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-[#056173] transition-colors">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-acme text-lg font-bold text-[#056173] group-hover:text-[#0C444B]">$500</h3>
              <p className="font-inter text-xs text-gray-600">Comprehensive care</p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-[#EFE6D1] rounded-2xl p-8 max-w-4xl mx-auto mb-8">
            <h2 className="font-acme text-2xl font-bold text-[#056173] mb-6">Payment Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-6 text-center border-2 border-transparent hover:border-[#056173] hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                <div className="w-12 h-12 bg-[#81A9AD] rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#056173] transition-colors">
                  <div className="w-8 h-6 bg-white rounded border-2 border-gray-300"></div>
                </div>
                <h3 className="font-acme font-semibold text-[#056173] mb-2 group-hover:text-[#0C444B]">Credit/Debit Card</h3>
                <p className="font-inter text-sm text-gray-600">Secure payment via card</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center border-2 border-transparent hover:border-[#056173] hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                <div className="w-12 h-12 bg-[#81A9AD] rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#056173] transition-colors">
                  <div className="w-6 h-10 bg-white rounded border-2 border-gray-300"></div>
                </div>
                <h3 className="font-acme font-semibold text-[#056173] mb-2 group-hover:text-[#0C444B]">Mobile Money</h3>
                <p className="font-inter text-sm text-gray-600">MTN, Airtel, Vodafone</p>
              </div>
              <div className="bg-white rounded-lg p-6 text-center border-2 border-transparent hover:border-[#056173] hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group">
                <div className="w-12 h-12 bg-[#81A9AD] rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#056173] transition-colors">
                  <div className="w-8 h-6 bg-white rounded border-2 border-gray-300 relative">
                    <div className="absolute inset-1 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <h3 className="font-acme font-semibold text-[#056173] mb-2 group-hover:text-[#0C444B]">Bank Transfer</h3>
                <p className="font-inter text-sm text-gray-600">Direct bank deposit</p>
              </div>
            </div>
          </div>

          {/* Donation Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto mb-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="h-6 w-6 text-[#056173]" />
              <h3 className="font-acme text-xl font-semibold text-[#056173]">Make a Donation</h3>
            </div>

            {/* Donation amount */}
            <div className="mb-6">
              <label className="font-inter block text-sm font-medium text-[#056173] mb-3">Choose your donation amount</label>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button className="font-acme bg-[#056173] hover:bg-[#0C444B] text-white py-2 px-4 rounded text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
                  One-Time
                </button>
                <button className="font-acme bg-[#EFE6D1] hover:bg-[#056173] hover:text-white text-[#056173] py-2 px-4 rounded text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
                  Monthly
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <button className="font-acme bg-[#81A9AD] hover:bg-[#056173] text-white py-3 px-4 rounded text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">$26</button>
                <button className="font-acme bg-[#81A9AD] hover:bg-[#056173] text-white py-3 px-4 rounded text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">$50</button>
                <button className="font-acme bg-[#056173] hover:bg-[#0C444B] text-white py-3 px-4 rounded text-sm font-medium relative transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
                  $100
                  <span className="absolute -top-2 -right-2 bg-[#81A9AD] text-white text-xs px-1 rounded">Popular</span>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <button className="font-acme bg-[#81A9AD] hover:bg-[#056173] text-white py-3 px-4 rounded text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">$200</button>
                <button className="font-acme bg-[#81A9AD] hover:bg-[#056173] text-white py-3 px-4 rounded text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">$500</button>
                <button className="font-acme bg-[#81A9AD] hover:bg-[#056173] text-white py-3 px-4 rounded text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">$1000</button>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-inter">$</span>
                <input
                  type="number"
                  className="font-inter w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#056173] focus:border-transparent"
                  placeholder="Enter custom amount"
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
            <button className="font-acme w-full bg-[#056173] hover:bg-[#0C444B] text-white py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-lg">
              <Heart className="h-5 w-5" />
              Complete Donation
            </button>
          </div>

          {/* Other Ways to Help */}
          <div className="mt-12 mb-8">
            <h2 className="font-acme text-xl font-semibold text-[#056173] text-center mb-4">Other Ways to Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <button className="bg-white rounded-lg p-4 shadow-md text-center border-2 border-transparent hover:border-[#056173] hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="w-8 h-8 bg-[#81A9AD] rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-[#056173] transition-colors">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-acme font-semibold text-[#056173] text-sm group-hover:text-[#0C444B]">Volunteer</h3>
              </button>
              <button className="bg-white rounded-lg p-4 shadow-md text-center border-2 border-transparent hover:border-[#056173] hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="w-8 h-8 bg-[#81A9AD] rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-[#056173] transition-colors">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-acme font-semibold text-[#056173] text-sm group-hover:text-[#0C444B]">Share Story</h3>
              </button>
              <button className="bg-white rounded-lg p-4 shadow-md text-center border-2 border-transparent hover:border-[#056173] hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <div className="w-8 h-8 bg-[#81A9AD] rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-[#056173] transition-colors">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-acme font-semibold text-[#056173] text-sm group-hover:text-[#0C444B]">Partner</h3>
              </button>
            </div>
          </div>



          {/* Trust Section */}
          <div className="bg-white rounded-lg p-4 shadow-md max-w-xl mx-auto text-center border-2 border-transparent hover:border-[#81A9AD] hover:shadow-lg transition-all duration-300">
            <div className="flex justify-center items-center gap-6 mb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#056173]" />
                <span className="font-inter text-xs text-gray-600">SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-[#056173]" />
                <span className="font-inter text-xs text-gray-600">100% Impact</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#056173]" />
                <span className="font-inter text-xs text-gray-600">10k+ Donors</span>
              </div>
            </div>
            <p className="font-inter text-xs text-gray-500">
              Your donation is secure and goes directly to supporting GBV survivors
            </p>
          </div>




        </div>
      </main>
    </div>
  );
}