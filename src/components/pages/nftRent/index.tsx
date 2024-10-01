'use client';

import ImageViewer from '@/components/ImageViewer';
import MarketPlaceRentInfo from '@/components/marketPlaceRentInfo';
import MarketPlaceRent from '@/components/pages/nftRent/marketPlaceRentItem';
import MarketPlaceTitle from '@/components/pages/nftRent/marketPlaceTitle';
import MarketPlaceLendInfo from './marketPlaceLendInfo';
import MarketPlaceLendItem from './marketPlaceLendItem';
import { useGlobalContext } from '@/hooks/useGlobalContext';
import NftViewer from '@/components/nftViewer';
import { useRouter } from 'next/navigation';
import { useMbWallet } from '@mintbase-js/react';
import { approveNft, rentNft } from '@/utils/near';
import { AdminMarketToken, MarketToken } from '@/types/types';
import { useState } from 'react';
import { useTokenIdByMetadataId } from '@/hooks/useTokenIdByMetadataId';

export type MarketPlace = {
  title: string;
  data: string;
};
const marketDetails = [
  { title: 'Lease Start Time', data: '27/08/2024, 08:13:00' },
  { title: 'Lease End Time', data: '27/08/2024, 08:30:00' },
];

export interface InfoType {
  unit: string;
  price: number;
}

export default function NFTRent() {
  const router = useRouter();
  const { isRent, selectedItem } = useGlobalContext();
  const { selector } = useMbWallet();
  const [info, setInfo] = useState<InfoType>({
    unit: 'usdt.fakes.testnet',
    price: 1,
  });
  const { tokenInfo } = useTokenIdByMetadataId(selectedItem?.metadata_id);

  const handleBack = () => {
    router.push('/nft-details');
  };
  const handleLend = async () => {
    const wallet = await selector.wallet();
    if (wallet && tokenInfo) {
      await approveNft(wallet, selectedItem as AdminMarketToken, tokenInfo!);
    }
  };

  const handleRent = async () => {
    const wallet = await selector.wallet();
    if (wallet && selectedItem) {
      await rentNft(wallet, selectedItem as MarketToken);
    }
  };

  return (
    <div className='grid sm:grid-cols-1 lg:grid-cols-2 align-items-center gap-20 px-10 h-full sm:mt-32 lg:mt-0'>
      <div className='flex items-center justify-center text-white h-full'>
        <NftViewer
          media={selectedItem?.media}
          base_uri={selectedItem?.base_uri}
          sm_preview
        />
      </div>

      <div className='flex flex-col justify-center sm:items-center lg:items-start h-full'>
        {isRent ? (
          <>
            <MarketPlaceTitle item={selectedItem as MarketToken} />
            <div className='mt-10'>
              <div
                className='bg-transparent w-full text-[32px] font-[400] text-white'
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                Lease Info
              </div>
              {(marketDetails || []).map((item: any, index: any) => (
                <MarketPlaceRentInfo item={selectedItem} data={item} />
              ))}
            </div>
            <div className='w-[222px] mt-5'>
              <div
                className='text-[20px] text-white font-[500]'
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                Price
              </div>
              <div
                className='text-[32px] text-white font-[500]'
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                {selectedItem.price}
              </div>
            </div>
            <MarketPlaceRent
              item={selectedItem as MarketToken}
              handleBack={handleBack}
              handleRent={handleRent}
            />
          </>
        ) : (
          <>
            <MarketPlaceTitle item={selectedItem as MarketToken} title='Lend' />
            <div>
              <MarketPlaceLendInfo info={info} setInfo={setInfo} />
            </div>
            <MarketPlaceLendItem
              handleBack={handleBack}
              handleLend={handleLend}
            />
          </>
        )}
      </div>
    </div>
  );
}
