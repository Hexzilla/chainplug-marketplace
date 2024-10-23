'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Item } from '@/components/Item';
import { useAdminMarketToken } from '@/hooks/useAdminMarketToken';
import { useMarketToken } from '@/hooks/useMarketToken';
import SeeDetails from './SeeDetails';
import FeaturedCollections from './FeaturedCollections';
import { useMbWallet } from '@mintbase-js/react';
import { AdminMarketToken, MarketToken } from '@/types/types';
import { AdminItem } from '@/components/AdminItem';
import LoadingItem from '@/components/LoadingItem';
import MarketPlaceLoadingView from './MarketPlaceLoadingView';

export default function LandingPage() {
  const router = useRouter();
  const { nftTokens, marketTokenLoading, marketTokenError } = useMarketToken();
  const { adminNftTokens, adminMarketTokenLoading, adminMarketTokenError } = useAdminMarketToken();
  const { activeAccountId } = useMbWallet(); 
  const isAdminAccount = activeAccountId === process.env.NEXT_PUBLIC_AFFILIATE_ACCOUNT;

  const showDetails = (item?: MarketToken | AdminMarketToken) => {
    if (item) {
      localStorage.setItem('selectedToken', JSON.stringify(item));
      router.push(`/nft-details/${item.nft_token_id}`);
    }
  };

  const mainToken = useMemo(() => {
    const tokens = isAdminAccount ? adminNftTokens : nftTokens;
    if (tokens?.length) {
      const token = tokens.find(x => x.nft_token_id == "15");
      if (token) {
        return token;
      }
      const index = Math.floor(Math.random() * tokens.length);
      return tokens[index];
    }
  }, [isAdminAccount, nftTokens, adminNftTokens]);

  if (
    !nftTokens.length ||
    !adminNftTokens.length ||
    marketTokenLoading ||
    adminMarketTokenLoading
  ) {
    return <MarketPlaceLoadingView />;
  }

  return (
    <div className="w-full mt-32">
      <SeeDetails
        token={mainToken}
        showDetails={showDetails}
      />
      <div className="w-full h-full mt-14">
        <div className="text-[44px] font-medium text-white">Featured Items</div>
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] md:justify-items-center lg:justify-items-start gap-20 mt-8">
          {!isAdminAccount
            ? nftTokens?.map((nft: MarketToken) => (
                <Item
                  key={nft.metadata_id}
                  item={nft}
                  showDetails={showDetails}
                />
              ))
            : adminNftTokens?.map((nft: AdminMarketToken) => (
                <AdminItem
                  key={nft.metadata_id}
                  item={nft}
                  showAdminDetails={showDetails}
                />
              ))}
        </div>
      </div>
      <FeaturedCollections />
    </div>
  );
}
