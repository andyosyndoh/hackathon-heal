'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import DonationModal from '@/components/DonationModal';
import { Heart, Shield, Eye, Globe, Smartphone, Wallet, Users, DollarSign, Target, TrendingUp, Calendar, MapPin, Gift, Handshake, Share2 } from 'lucide-react';

export default function DonatePage() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('mental-health');
  const [donationType, setDonationType] = useState('one-time');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    anonymous: false
  });

  const handleDonateClick = (category: string) => {
    setSelectedCategory(category);
    setIsDonationModalOpen(true);
  };

  const impactStats = [
    { value: '2.5K', label: 'People helped through our programs', color: 'text-blue-600' },
    { value: '97%', label: 'Positive feedback from our services', color: 'text-green-600' },
    { value: '24/7', label: 'Crisis support availability', color: 'text-purple-600' }
  ];

  const donationImpacts = [
    { amount: '$25', impact: 'Provides 1 hour of crisis counseling', raised: '$12,450', target: '$15,000' },
    { amount: '$50', impact: 'Funds therapy session for someone in need', raised: '$28,900', target: '$35,000' },
    { amount: '$100', impact: 'Supports AI training for better mental health tools', raised: '$45,230', target: '$50,000' }
  ];

  const recentDonations = [
    { donor: 'Sarah M.', amount: '$50', cause: 'Mental Health Support', time: '2 hours ago' },
    { donor: 'Anonymous', amount: '$25', cause: 'Crisis Support', time: '4 hours ago' },
    { donor: 'John D.', amount: '$100', cause: 'AI Training', time: '6 hours ago' },
    { donor: 'Maria L.', amount: '$75', cause: 'Mental Health Support', time: '8 hours ago' },
    { donor: 'Anonymous', amount: '$30', cause: 'Crisis Support', time: '12 hours ago' }
  ];

  const quickAmounts = ['$25', '$50', '$75', '$100'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Support Our Mission
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your donation helps us provide life-saving support, resources and advocacy for GBV survivors across Kenya
          </p>
        </div>

        {/* Impact Stats */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Donation Form */}
          <div className="space-y-6">
            {/* Make a Donation Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Heart className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Make a Donation</h2>
              </div>

              {/* Donation Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Donation Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDonationType('one-time')}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      donationType === 'one-time'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    One-time
                  </button>
                  <button
                    onClick={() => setDonationType('monthly')}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      donationType === 'monthly'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Donation Amount */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Donation amount (USD$)
                </label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        selectedAmount === amount
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="$ Custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount('');
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Donor Information */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Donor Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={donorInfo.anonymous}
                      onChange={(e) => setDonorInfo({...donorInfo, anonymous: e.target.checked})}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="anonymous" className="text-sm text-gray-600">
                      Make this donation anonymous
                    </label>
                  </div>
                  
                  {!donorInfo.anonymous && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="First Name"
                          value={donorInfo.firstName}
                          onChange={(e) => setDonorInfo({...donorInfo, firstName: e.target.value})}
                          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={donorInfo.lastName}
                          onChange={(e) => setDonorInfo({...donorInfo, lastName: e.target.value})}
                          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={donorInfo.email}
                        onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </>
                  )}
                </div>
              </div>

              {/* News/Updates Subscription */}
              <div className="mb-6">
                <textarea
                  placeholder="News/Updates (optional)"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Donate Button */}
              <button
                onClick={() => handleDonateClick('mental-health')}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Heart className="h-5 w-5" />
                Donate ${customAmount || selectedAmount.replace('$', '') || '0'}
              </button>
            </div>
          </div>

          {/* Right Column - Impact Tracking */}
          <div className="space-y-6">
            {/* Track Your Impact */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Track Your Impact</h2>
              
              <div className="space-y-4">
                {donationImpacts.map((item, index) => {
                  const progress = (parseInt(item.raised.replace(/[$,]/g, '')) / parseInt(item.target.replace(/[$,]/g, ''))) * 100;
                  
                  return (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{item.impact}</div>
                          <div className="text-sm text-gray-600">{item.amount}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{item.raised}</div>
                          <div className="text-xs text-gray-500">of {item.target}</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Donations */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Donations</h3>
              <div className="space-y-3">
                {recentDonations.map((donation, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                      <div className="font-medium text-gray-900">{donation.donor}</div>
                      <div className="text-sm text-gray-600">{donation.cause}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">{donation.amount}</div>
                      <div className="text-xs text-gray-500">{donation.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Other Ways to Help */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Other Ways to Help</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Share our mission</h3>
              <p className="text-gray-600 text-sm mb-4">Help us reach more people by sharing our mission on social media</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Share
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Volunteer with us</h3>
              <p className="text-gray-600 text-sm mb-4">Join our team of volunteers and make a direct impact in your community</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                Volunteer
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Corporate partnerships</h3>
              <p className="text-gray-600 text-sm mb-4">Partner with us to create lasting change in mental health support</p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                Partner
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-lg p-6 max-w-4xl mx-auto">
            <Shield className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <p className="text-sm text-gray-700">
              Your donation is safe and will be used efficiently to support GBV survivors. We are 
              committed to transparency and will provide regular updates on how your contribution makes a difference.
            </p>
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
