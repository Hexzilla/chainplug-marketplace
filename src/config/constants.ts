import { PeriodType } from '@/types/types';

export const BINANCE_API =
  'https://api.binance.com/api/v3/ticker/price?symbol=NEARUSDT';
export const MED_GAS = '300000000000000';
export const DEFAULT_STORES =
  'membership.mintspace2.testnet,ticket.mintspace2.testnet,coffeeshop.mintspace2.testnet,metro.mintspace2.testnet';
export const DEFAULT_MARKET_ADDRESS = 'market.mintspace2.testnet';
export const DEFAULT_NETWORK = 'testnet';

export const TESTNET_CONFIG = {
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org',
  explorerUrl: 'https://explorer.testnet.near.org',
  market: 'topdev-market-v2.testnet',
  stores: 'topdevstore2.mintspace2.testnet',
  // Change this referral address below to your account to test it out on purchase from other stores you add and see market fees go right to you.
  affiliate: 'unlock.testnet',
  headers: {
    'Content-Type': 'application/json',
  },
  // change this to your website domain and post-transaction page
  callbackUrl:
    typeof window !== 'undefined'
      ? `http://${window?.location.host}/wallet-callback`
      : 'https://testnet.mintbase.xyz/success',
};

export const MAINNET_CONFIG = {
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
  walletUrl: 'https://wallet.mainnet.near.org',
  helperUrl: 'https://helper.mainnet.near.org',
  explorerUrl: 'https://explorer.mainnet.near.org',
  stores:
    'affiliatedirect.mintbase1.near,ff.nekotoken.near,mrbrownproject.near,misfits.tenk.near,x.paras.near',
  market: 'simple.market.mintbase1.near',
  // Change this referral address below to your account to test it out on purchase from other stores you add and see market fees go right to you.
  affiliate: 'buildz.near',
  headers: {
    'Content-Type': 'application/json',
  },
  callbackUrl:
    typeof window !== 'undefined'
      ? `http://${window?.location.host}/wallet-callback`
      : 'https://www.mintbase.xyz/success',
};

export const WalletKeys = {
  AUTH_KEY: process.env.NEXT_PUBLIC_DEVELOPER_KEY || 'anon',
};

export const NETWORK_CONFIG = {
  testnet: 'https://interop-testnet.hasura.app/v1/graphql',
  mainnet: 'https://interop-mainnet.hasura.app/v1/graphql',
};

export const Period: PeriodType[] = [
  { id: 1, name: 'A Quarter' },
  { id: 2, name: 'A Half Year' },
  { id: 3, name: 'An Year' },
];

export const Unit: any = {
  'usdt.fakes.testnet': 'USDT',
  '3e2210e1184b45b64c8a434c0a7e7b23cc04ea7eb7a6c3c32520d03d4afcb8af': 'USDC',
};
