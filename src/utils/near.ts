import * as nearAPI from 'near-api-js';
import {
  execute,
  GAS,
  mbjs,
  NEAR_NETWORKS,
  TransactionSuccessEnum,
} from '@mintbase-js/sdk';
import { AdminMarketToken, ListedToken, MarketToken } from '@/types/types';
import { Wallet } from '@mintbase-js/react';
import { MAINNET_CONFIG, TESTNET_CONFIG } from '../config/constants';

export const MarketPlaceContractId = process.env
  .NEXT_PUBLIC_MARKETPLACE_ACCOUNT as string;
export const RentalContractId = process.env
  .NEXT_PUBLIC_RENTAL_ACCOUNT as string;

export const getConfig = () => {
  return mbjs.keys?.network === NEAR_NETWORKS.TESTNET
    ? TESTNET_CONFIG
    : MAINNET_CONFIG;
};

export const createAccount = async (activeAccountId: string) => {
  const config = getConfig();
  const nearConnection = await nearAPI.connect(config);
  if (nearConnection) {
    return nearConnection.account(activeAccountId);
  }

  return null;
};

export const createMarketContract = async (account: nearAPI.Account) => {
  return new nearAPI.Contract(account, MarketPlaceContractId, {
    viewMethods: ['list_listings_by_nft_contract_id', 'list_listings_by_owner_id'],
    changeMethods: [],
  });
};

export const getListedTokenIds = async (
  accountId: string,
  store: string
): Promise<ListedToken[]> => {
  const account = await createAccount(accountId);
  if (account) {
    const contract: any = await createMarketContract(account);
    return await contract['list_listings_by_nft_contract_id']({
      nft_contract_id: store,
    });
  }
  return [];
};

export const getOwnedTokenIds = async (
  accountId: string,
  ownerId: string
): Promise<ListedToken[]> => {
  const account = await createAccount(accountId);
  if (account) {
    const contract: any = await createMarketContract(account);
    return await contract['list_listings_by_owner_id']({
      owner_id: ownerId,
    });
  }
  return [];
};

export const approveNft = async (
  wallet: Wallet,
  token: AdminMarketToken,
  token_id: string
) => {
  const config = getConfig();

  const nft_approve = {
    contractAddress: config.stores,
    methodName: 'nft_approve',
    args: {
      token_id: token_id,
      account_id: config.market,
      msg: JSON.stringify({
        // ft_contract_id: token.ft_contract_id,
        ft_contract_id: 'usdt.fakes.testnet',
        price: '1',
        lease_start_ts_nano: '0',
        lease_end_ts_nano: '0',
      }),
    },
    deposit: '1000000000000000000000',
    gas: GAS,
  };

  await execute({ wallet }, nft_approve);
};

export const rentNft = async (wallet: Wallet, token: MarketToken) => {
  const config = getConfig();
  const callbackUrl = 'http://localhost:3000/callback/nftrent';

  const callBackArgs = {
    contractId: token.nft_contract_id,
    tokenId: token.nft_token_id,
  };

  const callbackArgs = {
    args: callBackArgs,
    type: TransactionSuccessEnum.TRANSFER,
  };

  const ft_transfer_call = {
    contractAddress: token.ft_contract_id,
    methodName: 'ft_transfer_call',
    args: {
      receiver_id: config.market,
      amount: token.price,
      msg: JSON.stringify({
        listing_id: [token.nft_contract_id, token.nft_token_id],
      }),
    },
    deposit: '1',
    gas: GAS,
  };

  await execute({ wallet, callbackUrl, callbackArgs }, ft_transfer_call);
};
