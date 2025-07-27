import { MPESA_CONFIG } from './config';

export class MPesaClient {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const auth = btoa(`${MPESA_CONFIG.consumerKey}:${MPESA_CONFIG.consumerSecret}`);
    
    try {
      const response = await fetch(`${MPESA_CONFIG.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.access_token) {
        this.accessToken = data.access_token;
        this.tokenExpiry = Date.now() + (parseInt(data.expires_in) * 1000);
        return this.accessToken;
      }
      
      throw new Error('Failed to get M-Pesa access token');
    } catch (error) {
      console.error('M-Pesa auth error:', error);
      throw error;
    }
  }

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
      const accessToken = await this.getAccessToken();
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
      const password = btoa(`${MPESA_CONFIG.businessShortCode}${MPESA_CONFIG.passkey}${timestamp}`);

      const payload = {
        BusinessShortCode: MPESA_CONFIG.businessShortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: MPESA_CONFIG.businessShortCode,
        PhoneNumber: phoneNumber,
        CallBackURL: MPESA_CONFIG.callbackUrl,
        AccountReference: `HEAL-${category.toUpperCase()}`,
        TransactionDesc: message || `Donation for ${category}`
      };

      const response = await fetch(`${MPESA_CONFIG.baseUrl}/mpesa/stkpush/v1/processrequest`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      return {
        success: result.ResponseCode === '0',
        checkoutRequestId: result.CheckoutRequestID,
        merchantRequestId: result.MerchantRequestID,
        message: result.ResponseDescription
      };
    } catch (error) {
      console.error('M-Pesa STK Push error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async queryTransaction(checkoutRequestId: string) {
    try {
      const accessToken = await this.getAccessToken();
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
      const password = btoa(`${MPESA_CONFIG.businessShortCode}${MPESA_CONFIG.passkey}${timestamp}`);

      const payload = {
        BusinessShortCode: MPESA_CONFIG.businessShortCode,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId
      };

      const response = await fetch(`${MPESA_CONFIG.baseUrl}/mpesa/stkpushquery/v1/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      return await response.json();
    } catch (error) {
      console.error('M-Pesa query error:', error);
      throw error;
    }
  }
}

export const mpesaClient = new MPesaClient();