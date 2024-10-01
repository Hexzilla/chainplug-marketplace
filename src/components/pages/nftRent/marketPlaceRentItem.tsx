import { MarketToken } from '@/types/types';

interface Props {
  item: MarketToken;
  handleBack: () => void;
  handleRent: () => void;
}
const MarketPlaceRent = ({ item, handleBack, handleRent }: Props) => {
  return (
    <div className='mt-10 z-50'>
      <button
        className='bg-white w-[253px] h-[46px] my-10 text-[24px] text-base font-[500] text-black'
        onClick={handleRent}
      >
        Accept and Pay
      </button>
      <button
        className='bg-transparent border border-[2px] border-white w-[165px] h-[46px] my-10 text-[24px] font-[500] ml-10 text-base text-white'
        onClick={handleBack}
      >
        Go Back
      </button>
    </div>
  );
};

export default MarketPlaceRent;
