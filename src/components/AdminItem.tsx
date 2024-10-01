'use client';

import { AdminMarketToken } from '../types/types';
import NftViewer from './nftViewer';
import ItemInfo from './ItemInfo';

function AdminItem({
  item,
  showAdminDetails,
}: {
  item: AdminMarketToken;
  showAdminDetails: (item: AdminMarketToken) => void;
}): JSX.Element {
  if (!item) {
    return <></>;
  }

  const { base_uri, media, metadata_id, price, title } = item;

  return (
    <div onClick={() => showAdminDetails(item)}>
      <NftViewer base_uri={base_uri} media={media} />
      <div className='mt-5 text-white'>
        <ItemInfo item={item} />
      </div>
    </div>
  );
}

export { AdminItem };
