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
      // Use local fallback in development without Netlify
      if (this.isLocalDev) {
        console.log('🔧 Using local development fallback for M-Pesa');
        return await LocalFallbackAPI.handleMPesaRequest('mpesa-stk-push', {
          phoneNumber, amount, category, message
        });
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
        
        // Check if it's an HTML error page (404, etc.)
        if (errorText.includes('<!DOCTYPE') || errorText.includes('<html>')) {
          console.log('🔧 Netlify function not found, using local fallback');
          return await LocalFallbackAPI.handleMPesaRequest('mpesa-stk-push', {
            phoneNumber, amount, category, message
          });
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
      
      // Fallback to local API if network request fails
      if (this.isLocalDev || error instanceof TypeError) {
        console.log('🔧 Network error, using local fallback');
        return await LocalFallbackAPI.handleMPesaRequest('mpesa-stk-push', {
          phoneNumber, amount, category, message
        });
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
        return await LocalFallbackAPI.handleMPesaRequest('mpesa-query', {
          checkoutRequestId
        });
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
          return await LocalFallbackAPI.handleMPesaRequest('mpesa-query', {
            checkoutRequestId
          });
        }
        throw new Error('Failed to query transaction');
      }

      return await response.json();
    } catch (error) {
      console.error('M-Pesa query error:', error);
      
      if (this.isLocalDev || error instanceof TypeError) {
        return await LocalFallbackAPI.handleMPesaRequest('mpesa-query', {
          checkoutRequestId
        });
      }
      
      throw error;
    }
  }
}

export const mpesaClient = new MPesaClient();
