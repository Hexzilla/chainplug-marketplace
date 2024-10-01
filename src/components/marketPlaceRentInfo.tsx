import { AdminMarketToken, MarketToken } from '@/types/types';
import { MarketPlace } from './marketPlaceRent';
import { useTokenIdByMetadataId } from '@/hooks/useTokenIdByMetadataId';

interface Props {
  item: MarketToken | AdminMarketToken;
  data: MarketPlace;
}
const MarketPlaceRentInfo = ({ item, data }: Props) => {
  const isAdminAccount = item?.nft_contract_id === process.env.NEXT_PUBLIC_AFFILIATE_ACCOUNT;
  const tokenId = useTokenIdByMetadataId(item?.metadata_id);

  return (
    <div className='mt-4'>
      <div
        className='text-[20px] text-[#CCCCCCCC] font-[400]'
        style={{ fontFamily: 'Sora, sans-serif' }}
      >
        {data.title}
      </div>
      <div
        className='text-[20px] text-white font-[500]'
        style={{ fontFamily: 'Sora, sans-serif' }}
      >
        {data.title !== 'Contract Name'
          ? isAdminAccount && data.title !== 'Token Id'
            ? tokenId
            : item[data.index]
          : data.data}
        {/* {data.data} */}
      </div>
    </div>
  );
};

export default MarketPlaceRentInfo;
