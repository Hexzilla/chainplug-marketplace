'use client';

import NftViewer from '@/components/nftViewer';
import ItemInfo from '@/components/ItemInfo';
import { AdminMarketToken, MarketToken } from '@/types/types';
import TokenImage from '@/components/TokenImage/TokenImage';

interface Props {
  token?: MarketToken | AdminMarketToken;
  showDetails: (nft?: MarketToken | AdminMarketToken) => void;
}

export default function SeeDetails({ token, showDetails }: Props) {
  const description = 'This NFT has no descrition.';

  return (
    <div className='flex sm:flex-col lg:flex-row items-center gap-10'>
      <div className='text-white h-[587px] flex justify-center items-center'>
        {token && (
          <TokenImage
            media={token.media}
            baseUri={token.base_uri}
          />
        )}
      </div>
      <div className='grid text-white h-full content-center ml-5'>
        {token && <ItemInfo item={token} />}
        <div>
          <div
            className='text-base mt-5 '
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            {token?.description || description}
          </div>
          <button
            className='bg-white w-[154px] h-[28px] mt-5 font-medium text-base text-black'
            onClick={() => showDetails(token)}
          >
            See details
          </button>
        </div>
      </div>
    </div>
  );
}
