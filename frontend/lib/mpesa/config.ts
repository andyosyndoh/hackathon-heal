export const MPESA_CONFIG = {
  // M-Pesa API endpoints
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://api.safaricom.co.ke' 
    : 'https://sandbox.safaricom.co.ke',
  
  // M-Pesa credentials
  consumerKey: process.env.NEXT_PUBLIC_MPESA_CONSUMER_KEY || '',
  consumerSecret: process.env.NEXT_PUBLIC_MPESA_CONSUMER_SECRET || '',
  businessShortCode: process.env.NEXT_PUBLIC_MPESA_SHORTCODE || '174379',
  passkey: process.env.NEXT_PUBLIC_MPESA_PASSKEY || '',
  
  // Callback URLs
  callbackUrl: process.env.NEXT_PUBLIC_MPESA_CALLBACK_URL || 'https://your-domain.com/api/mpesa/callback',
  
  // Payment categories for mental health
  paymentCategories: [
    { id: 'mental-health', name: 'Mental Health Services', code: 'MH001' },
    { id: 'crisis-support', name: 'Crisis Support', code: 'CS002' },
    { id: 'ai-training', name: 'AI Therapy Training', code: 'AT003' },
    { id: 'research', name: 'Mental Health Research', code: 'MR004' },
    { id: 'operations', name: 'Operations', code: 'OP005' }
  ]
};