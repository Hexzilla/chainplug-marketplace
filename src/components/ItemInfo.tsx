interface Props {
  item: any;
  button?: string;
}
const ItemInfo = ({ item }: Props) => {
  return (
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
        className='bg-transparent text-2xl mt-5'
        style={{ fontFamily: 'Sora, sans-serif' }}
      >
        {item?.title || 'This NFT has no title'}
      </div>
      <div className='flex flex-row mt-5 items-center'>
        <img
          src={item.nft_contract_icon || 'marketPlace/user.png'}
          className='w-[16px] h-[16px] rounded-full'
        />
        <div
          className='ml-2 text-sm'
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          {item.nft_contract_name}
        </div>
      </div>
    </div>
  );
};

export default ItemInfo;
