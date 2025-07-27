'use client';

import { useState } from 'react';
import { X, Heart, Smartphone, Wallet, CreditCard } from 'lucide-react';
import { StellarWallet } from '@/lib/stellar/wallet';
import { mpesaClient } from '@/lib/mpesa/client';
import { STELLAR_CONFIG } from '@/lib/stellar/config';
import { MPESA_CONFIG } from '@/lib/mpesa/config';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

type PaymentMethod = 'stellar' | 'mpesa' | 'card';

export default function DonationModal({ isOpen, onClose, category = 'mental-health' }: DonationModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stellar');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState('XLM');

  const quickAmounts = ['10', '25', '50', '100', '250', '500'];

  const handleConnectWallet = async () => {
    try {
      const publicKey = await StellarWallet.connectWallet();
      if (publicKey) {
        setWalletConnected(true);
      }
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  const handleStellarDonation = async () => {
    if (!walletConnected) {
      await handleConnectWallet();
      return;
    }

    setIsProcessing(true);
    try {
      const publicKey = await StellarWallet.connectWallet();
      if (!publicKey) throw new Error('Wallet not connected');

      const asset = STELLAR_CONFIG.supportedAssets[selectedAsset as keyof typeof STELLAR_CONFIG.supportedAssets];
      
      const result = await StellarWallet.createDonation({
        donorPublicKey: publicKey,
        amount,
        asset,
        category,
        message
      });

      if (result.success) {
        alert(`Donation successful! Transaction hash: ${result.hash}`);
        onClose();
      } else {
        alert(`Donation failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Stellar donation failed:', error);
      alert('Donation failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMpesaDonation = async () => {
    if (!phoneNumber || !amount) {
      alert('Please enter phone number and amount');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await mpesaClient.initiateStkPush({
        phoneNumber: phoneNumber.replace(/^0/, '254'), // Convert to international format
        amount: parseInt(amount),
        category,
        message
      });

      if (result.success) {
        alert('Please check your phone for M-Pesa prompt');
        // You could implement polling here to check transaction status
      } else {
        alert(`Payment failed: ${result.message}`);
      }
    } catch (error) {
      console.error('M-Pesa donation failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'stellar') {
      await handleStellarDonation();
    } else if (paymentMethod === 'mpesa') {
      await handleMpesaDonation();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              Make a Donation
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Method Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('stellar')}
                  className={`p-3 border rounded-lg flex items-center gap-2 ${
                    paymentMethod === 'stellar' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Wallet className="h-5 w-5" />
                  Stellar
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mpesa')}
                  className={`p-3 border rounded-lg flex items-center gap-2 ${
                    paymentMethod === 'mpesa' 
                      ? 'border-green-500 bg-green-50 text-green-700' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Smartphone className="h-5 w-5" />
                  M-Pesa
                </button>
              </div>
            </div>

            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Amount {paymentMethod === 'mpesa' ? '(KES)' : `(${selectedAsset})`}
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() => setAmount(quickAmount)}
                    className={`p-2 border rounded text-sm ${
                      amount === quickAmount 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {paymentMethod === 'mpesa' ? 'KES' : selectedAsset} {quickAmount}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter custom amount"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Stellar-specific fields */}
            {paymentMethod === 'stellar' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Asset
                </label>
                <select
                  value={selectedAsset}
                  onChange={(e) => setSelectedAsset(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.keys(STELLAR_CONFIG.supportedAssets).map((asset) => (
                    <option key={asset} value={asset}>{asset}</option>
                  ))}
                </select>
              </div>
            )}

            {/* M-Pesa-specific fields */}
            {paymentMethod === 'mpesa' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="0712345678"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Category
              </label>
              <select
                value={category}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled
              >
                {STELLAR_CONFIG.donationCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a message of support..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  <Heart className="h-5 w-5" />
                  {paymentMethod === 'stellar' && !walletConnected ? 'Connect Wallet' : 'Donate Now'}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}