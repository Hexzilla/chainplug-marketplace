interface Props {
  handleBack: () => void;
  handleLend: () => void;
}
const MarketPlaceLendItem = ({ handleBack, handleLend }: Props) => {
  return (
    <div className='my-5 z-50'>
      <button
        className='bg-white w-[253px] h-[46px] text-[24px] text-base font-[500] text-black'
        onClick={handleLend}
      >
        Submit
      </button>
      <button
        className='bg-transparent border border-[2px] border-white w-[165px] h-[46px] text-[24px] font-[500] ml-10 text-base text-white'
        onClick={handleBack}
      >
        Go Back
      </button>
    </div>
  );
};

export default MarketPlaceLendItem;
