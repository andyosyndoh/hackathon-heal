import { 
  Keypair, 
  Asset, 
  Operation, 
  TransactionBuilder, 
  BASE_FEE,
  Memo
} from '@stellar/stellar-sdk';
import { isConnected, getPublicKey, signTransaction } from '@stellar/freighter-api';
import { stellarServer, STELLAR_CONFIG } from './config';

export class StellarWallet {
  static async isFreighterAvailable(): Promise<boolean> {
    try {
      return await isConnected();
    } catch {
      return false;
    }
  }

  static async connectWallet(): Promise<string | null> {
    try {
      if (await this.isFreighterAvailable()) {
        return await getPublicKey();
      }
      throw new Error('Freighter wallet not available');
    } catch (error) {
      console.error('Wallet connection failed:', error);
      return null;
    }
  }

  static async createDonation({
    donorPublicKey,
    amount,
    asset,
    category,
    message
  }: {
    donorPublicKey: string;
    amount: string;
    asset: { code: string; issuer: string | null };
    category: string;
    message?: string;
  }) {
    try {
      const donorAccount = await stellarServer.loadAccount(donorPublicKey);
      const treasuryAccount = STELLAR_CONFIG.treasuryAccount;

      // Create asset
      const donationAsset = asset.issuer 
        ? new Asset(asset.code, asset.issuer)
        : Asset.native();

      // Create memo with donation metadata
      const donationMemo = JSON.stringify({
        category,
        message: message || '',
        timestamp: Date.now(),
        platform: 'HEAL'
      });

      // Build transaction
      const transaction = new TransactionBuilder(donorAccount, {
        fee: BASE_FEE,
        networkPassphrase: STELLAR_CONFIG.network
      })
        .addOperation(Operation.payment({
          destination: treasuryAccount,
          asset: donationAsset,
          amount: amount
        }))
        .addMemo(Memo.text(donationMemo.substring(0, 28))) // Stellar memo limit
        .setTimeout(300)
        .build();

      // Sign with Freighter
      const signedTransaction = await signTransaction(transaction.toXDR(), {
        networkPassphrase: STELLAR_CONFIG.network
      });

      // Submit transaction
      const result = await stellarServer.submitTransaction(signedTransaction);
      
      return {
        success: true,
        hash: result.hash,
        ledger: result.ledger
      };
    } catch (error) {
      console.error('Donation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  static async getDonationHistory(publicKey: string) {
    try {
      const payments = await stellarServer
        .payments()
        .forAccount(publicKey)
        .order('desc')
        .limit(50)
        .call();

      return payments.records
        .filter(payment => 
          payment.type === 'payment' && 
          payment.to === STELLAR_CONFIG.treasuryAccount
        )
        .map(payment => ({
          id: payment.id,
          amount: payment.amount,
          asset: payment.asset_code || 'XLM',
          hash: payment.transaction_hash,
          createdAt: payment.created_at,
          memo: payment.transaction?.memo
        }));
    } catch (error) {
      console.error('Failed to fetch donation history:', error);
      return [];
    }
  }
}