import { Contract, WalletConnection } from 'near-api-js';

export enum TransactionEnum {
  MINT = 'mint',
  TRANSFER = 'transfer',
  BURN = 'burn',
  DEPLOY_STORE = 'deploy-store',
  MAKE_OFFER = 'make-offer',
  REVOKE_MINTER = 'revoke-minter',
  ADD_MINTER = 'add-minter',
  TRANSFER_STORE_OWNERSHIP = 'transfer-store-ownership',
  LIST = 'list',
  TAKE_OFFER = 'take-offer',
  WITHDRAW_OFFER = 'withdraw-offer',
}

export interface TokenDetails {
  price: number;
  tokenId: string;
}

export interface TokenDetailsVariant {
  price: number;
  token: { id: string };
}

export interface TokenDataQuery {
  tokenData: TokenData[];
}
export interface TokenData {
  listings: TokenDetails[] | TokenDetailsVariant[];
  media: string;
  metadata_id: string;
  title: string;
  nft_contract_id: string;
  token_id: string;
  listings_aggregate: { aggregate: { count: number } };
}

export interface TokenListData {
  price: number;
  prices: TokenDetails[];
  amountAvailable: number;
  tokensTotal: number;
  tokenId: string;
  tokenList: TokenDetailsVariant[];
  tokenData: TokenData;
  isTokenListLoading: boolean;
  marketId?: string;
  tokenKey?: string;
  nftContractId?: string;
}

export interface SelectedNft {
  metadataId: string;
}

export type Store = {
  id: string;
  name: string;
};

export type PeriodType = {
  id: number;
  name: string;
};
export type StoreNfts = {
  base_uri: string;
  createdAt: string;
  listed: boolean;
  media: string;
  storeId: string;
  metadataId: string;
  title: string;
};

export interface PriceEl {
  price: number;
}

export interface BuyModalData {
  data: TokenListData;
}

export interface WalletConnect {
  contract: any;
  walletConnection: WalletConnection;
  rentalContractId: any;
  rentalContract: Contract;
}

export interface FeaturedData {
  base_uri: string;
  media: string;
  description: string;
  nft_contract_id: string;
  nft_contract_icon: string;
  nft_contract_name: string;
  owner: string;
  title: string;
  token_id: string;
}

export interface Payout {
  [key: string]: string;
}

export interface ListedToken {
  owner_id: string;
  approval_id: number;
  nft_contract_id: string;
  nft_token_id: string;
  ft_contract_id: string;
  price: string;
  lease_start_ts_nano: number;
  lease_end_ts_nano: number;
  payout: {
    payout: Payout;
  };
}

export interface OwnedToken {
  owner_id: string;
  approval_id: number;
  nft_contract_id: string;
  nft_token_id: string;
  ft_contract_id: string;
  price: string;
  lease_start_ts_nano: number;
  lease_end_ts_nano: number;
  payout: {
    payout: Payout;
  };
}

export interface LeasesToken {
  contract_addr: string;
  token_id: string;
  lender_id: string;
  borrower_id: string;
  ft_contract_addr: string;
  start_ts_nano: number;
  end_ts_nano: number;
  price: string;
  payout: any;
  state: 'Active' | string;
}

export interface MarketToken {
  owner_id: string;
  nft_contract_id: string;
  nft_token_id: string;
  ft_contract_id: string;
  price: string;
  payout: {
    payout: Payout;
  };
  title: string;
  description: string;
  media: string;
  base_uri: string;
  metadata_id: string;
}

export interface AdminMarketToken {
  nft_contract_id: string;
  price?: string | null | number;
  nft_token_id?: string;
  title: string;
  description?: string;
  media: string;
  base_uri: string;
  metadata_id: string;
  approved: boolean;
}
