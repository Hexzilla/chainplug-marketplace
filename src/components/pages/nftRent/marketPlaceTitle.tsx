import { MarketToken } from '@/types/types';

interface Props {
  item: MarketToken;
  title?: string;
}
const MarketPlaceTitle = ({ item, title }: Props) => {
  return (
    <div>
      <div
        className='bg-transparent w-full text-[20px] font-[400] text-white'
        style={{ fontFamily: 'Sora, sans-serif' }}
      >
        {title || 'Rent NFT'}
      </div>

      <div
        className='bg-transparent w-full text-[44px] text-white mt-5'
        style={{ fontFamily: 'Sora, sans-serif' }}
      >
        {item.title ?? 'This NFT has no title'}
      </div>
      <div
        className='text-[20px] text-[#CCCCCCCC] font-[400]'
        style={{ fontFamily: 'Sora, sans-serif' }}
      >
        See NFT details
      </div>
    </div>
  );
};
export default MarketPlaceTitle;
