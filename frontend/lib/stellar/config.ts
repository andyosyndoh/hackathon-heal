import { Networks, Server } from '@stellar/stellar-sdk';

export const STELLAR_CONFIG = {
  // Use testnet for development, mainnet for production
  network: process.env.NODE_ENV === 'production' ? Networks.PUBLIC : Networks.TESTNET,
  horizonUrl: process.env.NODE_ENV === 'production' 
    ? 'https://horizon.stellar.org' 
    : 'https://horizon-testnet.stellar.org',
  
  // HEAL platform accounts
  treasuryAccount: process.env.NEXT_PUBLIC_STELLAR_TREASURY_ACCOUNT || '',
  anchorDomain: process.env.NEXT_PUBLIC_STELLAR_ANCHOR_DOMAIN || 'heal.stellar.org',
  
  // Supported assets
  supportedAssets: {
    XLM: { code: 'XLM', issuer: null }, // Native Stellar Lumens
    USDC: { 
      code: 'USDC', 
      issuer: 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN' // Circle USDC on Stellar
    },
    EURC: {
      code: 'EURC',
      issuer: 'GDHU6WRG4IEQXM5NZ4BMPKOXHW76MZM4Y2IEMFDVXBSDP6SJY4ITNPP2' // Circle EURC on Stellar
    }
  },
  
  // Donation categories
  donationCategories: [
    { id: 'mental-health', name: 'Mental Health Services', icon: '🧠' },
    { id: 'operations', name: 'Operation Costs', icon: '⚙️' },
    { id: 'ai-training', name: 'AI-Therapy Training', icon: '🤖' },
    { id: 'crisis-support', name: 'Crisis Support', icon: '🆘' },
    { id: 'research', name: 'Mental Health Research', icon: '🔬' }
  ]
};

export const stellarServer = new Server(STELLAR_CONFIG.horizonUrl);