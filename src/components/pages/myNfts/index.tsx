'use client';
import { Item } from '@/components/Item';
import { useBorrowedTokens } from '@/hooks/useBorrowedTokens';
import { MarketToken } from '@/types/types';

export default function MyNFTs() {
  const { borrowedTokens, loading } = useBorrowedTokens();

  const showDetails = (item?: MarketToken) => {
    if (item) {
      localStorage.setItem('selectedToken', JSON.stringify(item));
    }
  };

  return (
    <>
      {(borrowedTokens || []).map((token: MarketToken) => (
        <Item key={token.nft_token_id} item={token} showDetails={showDetails} />
      ))}
    </>
  );
}
