import { useEffect, useMemo, useState } from 'react';
import { mbjs, NEAR_NETWORKS } from '@mintbase-js/sdk';
import { MAINNET_CONFIG, TESTNET_CONFIG } from '../config/constants';
import { getBorrowedTokenIds } from '../utils/near';
import { useStoreTokens } from './useStoreTokens';
import { LeasesToken, MarketToken } from '@/types/types';
import { useMbWallet } from '@mintbase-js/react';

const accountId = process.env.NEXT_PUBLIC_ACCOUNT_ID;

const useBorrowedTokens = () => {
  const [borrowedTokens, setBorrowedTokens] = useState<LeasesToken[]>([]);
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
    borrowedTokens.map((i) => i.token_id)
  );

  useEffect(() => {
    if (accountId && activeAccountId) {
      setIsLoading(true);
      getBorrowedTokenIds(accountId, activeAccountId)
        .then((tokens) => {
          console.log('~~~~~~~~~~~~~~~~~owned-tokens', tokens);
          const leasesTokens = tokens.map(t => t[1])
          console.log('~~~~~~~~~~~~~~~~~leasesTokens', leasesTokens);
          setBorrowedTokens(leasesTokens);
        })
        .finally(() => setIsLoading(false));
    }
  }, [activeAccountId]);

  const resultTokens: MarketToken[] = useMemo(() => {
    if (!error && !loading && storeTokens) {
      return borrowedTokens
        .map((token) => {
          const storeToken = storeTokens.find((i) => i.token_id === token.token_id);
          if (!storeToken) {
            return null;
          }

          const marketToken: MarketToken = {
            owner_id: token.borrower_id,
            nft_contract_id: token.contract_addr,
            nft_token_id: token.token_id,
            ft_contract_id: token.ft_contract_addr,
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
    return [];
  }, [borrowedTokens, storeTokens, error, loading]);
  console.log('resultTokens', resultTokens)

  return {
    borrowedTokens: resultTokens,
    loading: loading || isLoading,
  };
};

export { useBorrowedTokens };
