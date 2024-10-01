'use client';

import MarketPlaceRentInfo from '@/components/marketPlaceRentInfo';
import NftViewer from '@/components/nftViewer';
import { NFTDetails } from '@/constants';
import { useGlobalContext } from '@/hooks/useGlobalContext';
import { useRouter } from 'next/navigation';
import { MarketPlace } from '../nftRent';
import { useMbWallet } from '@mintbase-js/react';
import { useEffect } from 'react';

export type NFTDetail = {
  title: string;
  data: string;
};

interface Props {
  handleRent: (type: string) => void;
  data: MarketPlace;
}

export default function MarketPlaceDetailsPage() {
  const router = useRouter();
  const { selectedItem, setIsRent } = useGlobalContext();
  const { activeAccountId } = useMbWallet();
  const isAdminAccount =
    activeAccountId === process.env.NEXT_PUBLIC_AFFILIATE_ACCOUNT;

  const handleRent = (isRent: boolean) => {
    setIsRent(isRent);
    router.push('/nft-rent');
  };

  return (
    <div className='grid sm:grid-cols-1 lg:grid-cols-2 align-items-center gap-20 h-full px-10 sm:mt-32 lg:mt-0'>
      <div className='flex items-center justify-center text-white h-full'>
        <NftViewer
          media={selectedItem?.media}
          base_uri={selectedItem?.base_uri}
          sm_preview
        />
      </div>

      <div className='flex flex-col justify-center sm:items-center lg:items-start h-full'>
        <div>
          <div
            className='w-[83px] h-[26px] bg-transparent border-[1px] border-white rounded-full text-sm'
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            <div
              className='text-white text-center mt-[2px]'
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Category
            </div>
          </div>

          <div
            className='bg-transparent w-full text-[44px] text-white mt-10'
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            {selectedItem.title}
          </div>

          <div className='mt-10'>
            {(NFTDetails || []).map((item, index) => (
              <MarketPlaceRentInfo
                key={index}
                item={selectedItem}
                data={item}
              />
            ))}
          </div>
          <div className='z-50 my-5'>
            {!isAdminAccount ? (
              <button
                className='bg-white w-[122px] h-[46px] text-[24px] text-base font-[500] text-black'
                onClick={() => handleRent(true)}
              >
                Rent
              </button>
            ) : (
              <button
                className='bg-transparent border border-[2px] border-white w-[122px] h-[46px] text-[24px] font-[500] text-base text-white'
                onClick={() => handleRent(false)}
              >
                Lend
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
