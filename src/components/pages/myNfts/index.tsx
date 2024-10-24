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
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
      {(borrowedTokens || []).map((token: MarketToken) => (
        <Item key={token.nft_token_id} item={token} showDetails={showDetails} />
      ))}
    </div>
  );
}
