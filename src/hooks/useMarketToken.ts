import { useEffect, useMemo, useState } from 'react';
import { mbjs, NEAR_NETWORKS } from '@mintbase-js/sdk';
import { MAINNET_CONFIG, TESTNET_CONFIG } from '../config/constants';
import { getListedTokenIds } from '../utils/near';
import { useStoreTokens } from './useStoreTokens';
import { ListedToken, MarketToken } from '@/types/types';

const accountId = process.env.NEXT_PUBLIC_ACCOUNT_ID;

const useMarketToken = () => {
  const [listedTokens, setListedTokens] = useState<ListedToken[]>([]);
  const [getListLoading, setGetListLoading] = useState(false);

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
    if (accountId) {
      setGetListLoading(true);
      getListedTokenIds(accountId, defaultStore)
        .then((tokens) => {
          setListedTokens(tokens.filter(t => !invalidTokenIds.includes(t.nft_token_id)));
        })
        .finally(() => setGetListLoading(false));
    }
  }, []);

  const nftTokens: MarketToken[] = useMemo(() => {
    if (!error && !loading && storeTokens) {
      return listedTokens
        .map((token) => {
          const storeToken = storeTokens.find(
            (i) => i.token_id === token.nft_token_id
          );
          if (!storeToken) {
            return null;
          }

          const marketToken: MarketToken = {
            owner_id: token.owner_id,
            nft_contract_id: token.nft_contract_id,
            nft_token_id: token.nft_token_id,
            ft_contract_id: token.ft_contract_id,
            price: token.price,
            payout: token.payout,
            title: storeToken.title,
            description: storeToken.description,
            media: storeToken.media,
            base_uri: storeToken.base_uri,
            metadata_id: storeToken.metadata_id,
          };
          return marketToken;
        })
        .filter((i) => !!i);
    }
    return [] as MarketToken[];
  }, [listedTokens, storeTokens, error, loading]);

  return {
    nftTokens,
    marketTokenError: error,
    marketTokenLoading: loading || getListLoading,
  };
};

const invalidTokenIds = ['1',];

export { useMarketToken };
