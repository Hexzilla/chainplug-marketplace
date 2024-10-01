import { useMbWallet } from '@mintbase-js/react';
import { useEffect, useMemo, useState } from 'react';
import { mbjs, NEAR_NETWORKS } from '@mintbase-js/sdk';
import { MAINNET_CONFIG, TESTNET_CONFIG } from '../config/constants';
import { getListedTokenIds } from '../utils/near';
import { useStoreTokens } from './useStoreTokens';
import { AdminMarketToken, ListedToken } from '@/types/types';
import { useStoreNfts } from './useStoreNfts';

const useAdminMarketToken = () => {
  const [listedTokens, setListedTokens] = useState<ListedToken[]>([]);

  const { activeAccountId } = useMbWallet();
  const { nftsData } = useStoreNfts();

  const stores =
    mbjs.keys?.network === NEAR_NETWORKS.TESTNET
      ? TESTNET_CONFIG.stores
      : MAINNET_CONFIG.stores;

  const defaultStore = process.env.NEXT_PUBLIC_STORES || stores;

  const {
    tokens: storeTokens,
    error,
    loading,
  } = useStoreTokens(
    defaultStore,
    listedTokens.map((i) => i.nft_token_id)
  );

  useEffect(() => {
    if (activeAccountId) {
      getListedTokenIds(activeAccountId, defaultStore).then((tokens) => {
        setListedTokens(tokens);
      });
    }
  }, [activeAccountId]);

  const adminNftTokens: AdminMarketToken[] = useMemo(() => {
    if (!error && !loading && storeTokens && nftsData) {
      return nftsData
        .map((token) => {
          const storeToken = storeTokens.find(
            (s) => s.metadata_id === token.metadata_id
          );

          if (!storeToken) {
            const marketToken = {
              nft_contract_id: token.nft_contract_id,
              // price: token.price,
              title: token.title,
              // description: token.description,
              media: token.media,
              base_uri: token.base_uri,
              metadata_id: token.metadata_id,
              approved: false,
            };
            return marketToken;
          }

          const marketToken = {
            nft_contract_id: token.nft_contract_id,
            nft_token_id: storeToken.token_id,
            title: storeToken.title,
            description: storeToken.description,
            media: storeToken.media,
            base_uri: storeToken.base_uri,
            metadata_id: storeToken.metadata_id,
            approved: true,
          };
          return marketToken;
        })
        .filter((i) => !!i);
    }
    return [] as AdminMarketToken[];
  }, [nftsData, storeTokens, error, loading]);

  return {
    adminNftTokens,
    adminMarketTokenError: error,
    adminMarketTokenLoading: loading,
  };
};

export { useAdminMarketToken };
