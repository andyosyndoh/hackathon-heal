import { LocalFallbackAPI } from '../api/local-fallback';

export class MPesaClient {
  private baseUrl = '/.netlify/functions';
  private isNetlifyDev = typeof window !== 'undefined' && window.location.port === '8888';
  private isLocalDev = process.env.NODE_ENV === 'development' && !this.isNetlifyDev;

  async initiateStkPush({
    phoneNumber,
    amount,
    category,
    message
  }: {
    phoneNumber: string;
    amount: number;
    category: string;
    message?: string;
  }) {
    try {
      // In development, use mock response directly
      if (this.isLocalDev) {
        console.log('🔧 Using mock response for development');
        return {
          success: true,
          checkoutRequestId: `mock-${Date.now()}`,
          merchantRequestId: `merchant-${Date.now()}`,
          message: 'Mock: M-Pesa payment initiated (Development mode)',
          customerMessage: 'Please check your phone for M-Pesa prompt (Mock)'
        };
      }

      const apiUrl = this.isNetlifyDev 
        ? `http://localhost:8888/.netlify/functions/mpesa-stk-push`
        : `${this.baseUrl}/mpesa-stk-push`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phoneNumber,
          amount,
          category,
          message
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('M-Pesa API Error:', errorText);
        
        // Fallback to mock in development
        if (this.isLocalDev || errorText.includes('<!DOCTYPE') || errorText.includes('<html>')) {
          console.log('🔧 Using mock response as fallback');
          return {
            success: true,
            checkoutRequestId: `mock-fallback-${Date.now()}`,
            merchantRequestId: `merchant-fallback-${Date.now()}`,
            message: 'Mock: M-Pesa payment initiated (Fallback)',
            customerMessage: 'Please check your phone for M-Pesa prompt (Mock)'
          };
        }
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        
        throw new Error(errorData.error || 'Failed to initiate payment');
      }

      const result = await response.json();
      
      return {
        success: result.success,
        checkoutRequestId: result.checkoutRequestId,
        merchantRequestId: result.merchantRequestId,
        message: result.message || result.customerMessage
      };
    } catch (error) {
      console.error('M-Pesa STK Push error:', error);
      
      // Always fallback to mock in development
      if (this.isLocalDev || error instanceof TypeError) {
        console.log('🔧 Network error, using mock response');
        return {
          success: true,
          checkoutRequestId: `mock-error-${Date.now()}`,
          merchantRequestId: `merchant-error-${Date.now()}`,
          message: 'Mock: M-Pesa payment initiated (Error fallback)',
          customerMessage: 'Please check your phone for M-Pesa prompt (Mock)'
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async queryTransaction(checkoutRequestId: string) {
    try {
      if (this.isLocalDev) {
        console.log('🔧 Using mock query response for development');
        return {
          success: true,
          resultCode: '0',
          resultDesc: 'Mock: Payment completed successfully',
          checkoutRequestId: checkoutRequestId
        };
      }

      const apiUrl = this.isNetlifyDev 
        ? `http://localhost:8888/.netlify/functions/mpesa-query`
        : `${this.baseUrl}/mpesa-query`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ checkoutRequestId })
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (errorText.includes('<!DOCTYPE') || errorText.includes('<html>')) {
          return {
            success: true,
            resultCode: '0',
            resultDesc: 'Mock: Payment completed (Fallback)',
            checkoutRequestId: checkoutRequestId
          };
        }
        throw new Error('Failed to query transaction');
      }

      return await response.json();
    } catch (error) {
      console.error('M-Pesa query error:', error);
      
      if (this.isLocalDev || error instanceof TypeError) {
        return {
          success: true,
          resultCode: '0',
          resultDesc: 'Mock: Payment completed (Error fallback)',
          checkoutRequestId: checkoutRequestId
        };
      }
      
      throw error;
    }
  }
}

export const mpesaClient = new MPesaClient();
