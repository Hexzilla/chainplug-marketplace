import { useEffect, useMemo, useState } from 'react';
import { mbjs, NEAR_NETWORKS } from '@mintbase-js/sdk';
import { MAINNET_CONFIG, TESTNET_CONFIG } from '../config/constants';
import { getListedTokenIds, getOwnedTokenIds } from '../utils/near';
import { useStoreTokens } from './useStoreTokens';
import { ListedToken, OwnedToken, MarketToken } from '@/types/types';
import { useMbWallet } from '@mintbase-js/react';

const accountId = process.env.NEXT_PUBLIC_ACCOUNT_ID;

const useOwnedTokens = () => {
  const [ownedTokens, setOwnedTokens] = useState<OwnedToken[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { activeAccountId } = useMbWallet();

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
    ownedTokens.map((i) => i.nft_token_id)
  );

  useEffect(() => {
    if (accountId && activeAccountId) {
      console.log('accountId', activeAccountId)
      setIsLoading(true);
      getOwnedTokenIds(accountId, activeAccountId)
        .then((tokens) => {
          console.log('~~~~~~~~~~~~~~~~~owned-tokens', tokens);
          setOwnedTokens(tokens);
        })
        .finally(() => setIsLoading(false));
    }
  }, [activeAccountId]);

  const nftTokens: MarketToken[] = useMemo(() => {
    if (!error && !loading && storeTokens) {
      return ownedTokens
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
  }, [ownedTokens, storeTokens, error, loading]);

  return {
    nftTokens,
    marketTokenError: error,
    marketTokenLoading: loading || isLoading,
  };
};

export { useOwnedTokens };
