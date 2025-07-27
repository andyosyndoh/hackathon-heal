// Local development fallback API
export class LocalFallbackAPI {
  static async handleMPesaRequest(endpoint: string, data: any) {
    console.log(`🔧 Local fallback for ${endpoint}:`, data);
    
    switch (endpoint) {
      case 'mpesa-stk-push':
        return {
          success: true,
          checkoutRequestId: `local-${Date.now()}`,
          merchantRequestId: `merchant-${Date.now()}`,
          message: 'Local development: Mock M-Pesa payment initiated'
        };
        
      case 'mpesa-query':
        return {
          success: true,
          resultCode: '0',
          resultDesc: 'Local development: Mock payment completed',
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