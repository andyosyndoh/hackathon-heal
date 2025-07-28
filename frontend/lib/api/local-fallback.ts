import { MPESA_SANDBOX_CONFIG } from '../mpesa/sandbox-config';

// Local development fallback API that uses Netlify Functions for M-Pesa
export class LocalFallbackAPI {
  
  static async handleMPesaRequest(endpoint: string, data: any) {
    console.log(`🔧 Local fallback using Netlify Functions for ${endpoint}:`, data);
    console.log('🔧 M-Pesa Config Status:', MPESA_SANDBOX_CONFIG.getConfigStatus());
    
    try {
      switch (endpoint) {
        case 'mpesa-stk-push':
          return await this.callNetlifyFunction('mpesa-stk-push', data);
          
        case 'mpesa-query':
          return await this.callNetlifyFunction('mpesa-query', data);
          
        case 'mpesa-auth':
          return await this.callNetlifyFunction('mpesa-auth', {});
          
        default:
          throw new Error(`Unknown endpoint: ${endpoint}`);
      }
    } catch (error) {
      console.error(`🔧 Netlify Function call failed for ${endpoint}:`, error);
      console.log('🔧 Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      // Return mock response as ultimate fallback
      return this.getMockResponse(endpoint, data);
    }
  }

  private static async callNetlifyFunction(functionName: string, data: any) {
    const isLocalDev = process.env.NODE_ENV === 'development';
    const baseUrl = isLocalDev 
      ? 'http://localhost:8888/.netlify/functions' 
      : '/.netlify/functions';
    
    const url = `${baseUrl}/${functionName}`;
    console.log(`🔧 Calling Netlify Function: ${url}`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`🔧 Netlify Function Error:`, errorText);
      throw new Error(`Function call failed: ${response.status} - ${errorText}`);
    }

    return await response.json();
  }

  private static getMockResponse(endpoint: string, data: any) {
    console.log(`🔧 Using mock response for ${endpoint} as ultimate fallback`);
    
    switch (endpoint) {
      case 'mpesa-stk-push':
        return {
          success: true,
          checkoutRequestId: `mock-${Date.now()}`,
          merchantRequestId: `merchant-${Date.now()}`,
          message: 'Mock: M-Pesa payment initiated (Netlify Functions unavailable)',
          customerMessage: 'Please check your phone for M-Pesa prompt (Mock)'
        };
        
      case 'mpesa-query':
        return {
          success: true,
          resultCode: '0',
          resultDesc: 'Mock: Payment completed (Netlify Functions unavailable)',
          checkoutRequestId: data.checkoutRequestId
        };
        
      case 'mpesa-auth':
        return {
          access_token: 'mock-token-' + Date.now(),
          expires_in: 3600
        };
        
      default:
        throw new Error(`Unknown endpoint: ${endpoint}`);
    }
  }
}
