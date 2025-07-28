// M-Pesa Sandbox Configuration
export const MPESA_SANDBOX_CONFIG = {
  // Sandbox credentials (replace with your actual sandbox credentials)
  consumerKey: process.env.NEXT_PUBLIC_MPESA_CONSUMER_KEY || '',
  consumerSecret: process.env.NEXT_PUBLIC_MPESA_CONSUMER_SECRET || '',
  
  // Sandbox business shortcode (use 174379 for testing)
  businessShortCode: process.env.NEXT_PUBLIC_MPESA_SHORTCODE || '174379',
  
  // Sandbox passkey (get from Safaricom Developer Portal)
  passkey: process.env.NEXT_PUBLIC_MPESA_PASSKEY || '',
  
  // Sandbox base URL
  baseUrl: 'https://sandbox.safaricom.co.ke',
  
  // Test phone numbers for sandbox (these work in sandbox)
  testPhoneNumbers: [
    '254708374149',
    '254711111111',
    '254722222222'
  ],
  
  // Validation
  isConfigured(): boolean {
    return !!(this.consumerKey && this.consumerSecret && this.passkey);
  },
  
  getConfigStatus() {
    return {
      consumerKey: this.consumerKey ? 'Set' : 'Missing',
      consumerSecret: this.consumerSecret ? 'Set' : 'Missing',
      businessShortCode: this.businessShortCode ? 'Set' : 'Missing',
      passkey: this.passkey ? 'Set' : 'Missing'
    };
  }
};
