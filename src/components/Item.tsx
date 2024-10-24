'use client';

import { MarketToken } from '@/types/types';
import ItemInfo from './ItemInfo';
import NftViewer from './nftViewer';

function Item({
  item,
  showDetails,
}: {
  item: MarketToken;
  showDetails: (item: MarketToken) => void;
}): JSX.Element {
  if (!item) {
    return <></>;
  }

  const { base_uri, media, price, title, ft_contract_id } = item;

  return (
    <div onClick={() => showDetails(item)}>
      <NftViewer base_uri={base_uri} media={media}>
        <div className='mt-5 text-white'>
          <ItemInfo item={item} />
        </div>
      </NftViewer>

    </div>
  );
}

function LoadingItem(): JSX.Element {
  const products = Array.from(Array(12).keys());

  return (
    <>
      {products.map((productKey) => (
        <div key={productKey} className='flex items-center justify-center '>
          <div className='w-[501px] h-[501px] bg-slate-900 animate-pulse rounded-xl shadow-xl' />
        </div>
      ))}
    </>
  );
}

export { Item, LoadingItem };
