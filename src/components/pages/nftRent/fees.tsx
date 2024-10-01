interface Props {
  item: any;
}
const Fees = ({ item }: Props) => {
  return (
    <div className='flex justify-between w-[248px] border-b-[2px] border-b-white border-b-solid'>
      <div
        className='mt-1 text-[14px] text-[#CCCCCCCC] font-[500]'
        style={{ fontFamily: 'Sora, sans-serif' }}
      >
        {item.name}
      </div>
      <div
        className='mt-1 text-[14px] text-[#CCCCCCCC] font-[500]'
        style={{ fontFamily: 'Sora, sans-serif' }}
      >
        {item.amount} wNEAR
      </div>
    </div>
  );
};
export default Fees;
