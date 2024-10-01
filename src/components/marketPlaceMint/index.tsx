import Fees from '../pages/nftRent/fees';
import RentalTime from '../pages/nftRent/rentalTimes';
import Document from './document';
import FileUpload from './fileUpload';
import Texts from './text';

const rentalTimes = [
  {
    title: 'Lease Start Time',
    description: 'When do you want to start renting your NFT',
  },
  {
    title: 'Lease End Time',
    description: 'When do you want to start renting your NFT',
  },
];

const Forecasted = [
  { name: '3 months', amount: 0 },
  { name: '6 months', amount: 0 },
  { name: 'Custom range', amount: 0 },
  { name: 'Total', amount: 0 },
];

const MarketPlaceMint = () => {
  return (
    <div className='flex flex-row gap-20 w-[1387px] h-[772px]'>
      <FileUpload />
      <div>
        <Texts text='Data/Document Upload' size={32} />
        <div className='mt-[45px]'>
          <Texts text='Document Name' size={16} />
          <input name='document' className='w-[772px] h-[32px] mt-2' />
          <Document text='Description' />
          <Document text='Comment' />
          <div className='flex flex-row gap-10'>
            {(rentalTimes || []).map((item: any, index: any) => (
              <RentalTime data={item} width={366} handleDate={() => {}} />
            ))}
          </div>

          <div className='grid grid-cols-2 mt-10'>
            <div>
              <Texts text='Forecasted Revenues' size={32} />
              {Forecasted.map((item, index) => (
                <Fees item={item} />
              ))}
            </div>
            <div className='flex justify-end items-end'>
              <button className='bg-white w-[154px] h-[46px] mr-0 mb-0'>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPlaceMint;
