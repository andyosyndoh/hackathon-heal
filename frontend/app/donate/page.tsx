'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wallet, Heart, Globe, Shield, TrendingUp, QrCode } from 'lucide-react';
import { StellarWallet } from '@/lib/stellar/wallet';
import { STELLAR_CONFIG } from '@/lib/stellar/config';
import QRCode from 'react-qr-code';

export default function DonatePage() {
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('XLM');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [donationMessage, setDonationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [donationResult, setDonationResult] = useState<any>(null);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    const isAvailable = await StellarWallet.isFreighterAvailable();
    if (isAvailable) {
      const publicKey = await StellarWallet.connectWallet();
      setConnectedWallet(publicKey);
    }
  };

  const connectWallet = async () => {
    setIsLoading(true);
    const publicKey = await StellarWallet.connectWallet();
    setConnectedWallet(publicKey);
    setIsLoading(false);
  };

  const handleDonation = async () => {
    if (!connectedWallet || !donationAmount || !selectedCategory) return;

    setIsLoading(true);
    const asset = STELLAR_CONFIG.supportedAssets[selectedAsset as keyof typeof STELLAR_CONFIG.supportedAssets];
    
    const result = await StellarWallet.createDonation({
      donorPublicKey: connectedWallet,
      amount: donationAmount,
      asset,
      category: selectedCategory,
      message: donationMessage
    });

    setDonationResult(result);
    setIsLoading(false);

    if (result.success) {
      // Reset form
      setDonationAmount('');
      setDonationMessage('');
      setSelectedCategory('');
    }
  };

  const generateQRPayment = () => {
    const asset = STELLAR_CONFIG.supportedAssets[selectedAsset as keyof typeof STELLAR_CONFIG.supportedAssets];
    const qrData = `web+stellar:pay?destination=${STELLAR_CONFIG.treasuryAccount}&amount=${donationAmount}&asset_code=${asset.code}&asset_issuer=${asset.issuer || ''}&memo=${selectedCategory}`;
    return qrData;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support Mental Health with Transparent Donations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make a difference with blockchain-powered transparency. Track your impact and see exactly how your donation helps mental health initiatives worldwide.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">$125K</div>
              <div className="text-sm text-gray-600">Total Raised</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">2,847</div>
              <div className="text-sm text-gray-600">Lives Impacted</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Transparent</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">1,234</div>
              <div className="text-sm text-gray-600">Donors</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donation Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Make a Donation
              </CardTitle>
              <CardDescription>
                Support mental health initiatives with cryptocurrency donations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Wallet Connection */}
              {!connectedWallet ? (
                <Button 
                  onClick={connectWallet} 
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Connecting...' : 'Connect Stellar Wallet'}
                </Button>
              ) : (
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Connected: {connectedWallet.substring(0, 8)}...{connectedWallet.substring(-8)}
                  </AlertDescription>
                </Alert>
              )}

              {connectedWallet && (
                <>
                  {/* Donation Category */}
                  <div className="space-y-2">
                    <Label>Choose a cause to support</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {STELLAR_CONFIG.donationCategories.map((category) => (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "outline"}
                          onClick={() => setSelectedCategory(category.id)}
                          className="justify-start"
                        >
                          <span className="mr-2">{category.icon}</span>
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Amount and Asset */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Currency</Label>
                      <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="XLM">XLM (Stellar Lumens)</SelectItem>
                          <SelectItem value="USDC">USDC (USD Coin)</SelectItem>
                          <SelectItem value="EURC">EURC (Euro Coin)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Share why you're supporting mental health..."
                      value={donationMessage}
                      onChange={(e) => setDonationMessage(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* Donation Methods */}
                  <Tabs defaultValue="wallet" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="wallet">Wallet</TabsTrigger>
                      <TabsTrigger value="qr">QR Code</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="wallet" className="space-y-4">
                      <Button
                        onClick={handleDonation}
                        disabled={!donationAmount || !selectedCategory || isLoading}
                        className="w-full"
                      >
                        {isLoading ? 'Processing...' : `Donate ${donationAmount} ${selectedAsset}`}
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="qr" className="space-y-4">
                      {donationAmount && selectedCategory && (
                        <div className="text-center space-y-4">
                          <QRCode
                            value={generateQRPayment()}
                            size={200}
                            className="mx-auto"
                          />
                          <p className="text-sm text-gray-600">
                            Scan with Lobstr or any Stellar wallet
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>

                  {/* Result */}
                  {donationResult && (
                    <Alert className={donationResult.success ? "border-green-500" : "border-red-500"}>
                      <AlertDescription>
                        {donationResult.success ? (
                          <>
                            ✅ Donation successful! 
                            <a 
                              href={`https://stellar.expert/explorer/public/tx/${donationResult.hash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline ml-1"
                            >
                              View transaction
                            </a>
                          </>
                        ) : (
                          `❌ Donation failed: ${donationResult.error}`
                        )}
                      </AlertDescription>
                    </Alert>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Impact Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Track Your Impact</CardTitle>
              <CardDescription>
                See how donations are making a difference
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Funding Progress */}
              {STELLAR_CONFIG.donationCategories.map((category, index) => (
                <div key={category.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium flex items-center gap-2">
                      {category.icon} {category.name}
                    </span>
                    <Badge variant="secondary">
                      ${(Math.random() * 50000).toFixed(0)}
                    </Badge>
                  </div>
                  <Progress value={Math.random() * 100} className="h-2" />
                </div>
              ))}

              {/* Recent Donations */}
              <div className="space-y-4">
                <h4 className="font-semibold">Recent Donations</h4>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">Anonymous Donor</div>
                        <div className="text-sm text-gray-600">Mental Health Services</div>
                      </div>
                      <Badge>
                        {(Math.random() * 1000).toFixed(0)} XLM
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}