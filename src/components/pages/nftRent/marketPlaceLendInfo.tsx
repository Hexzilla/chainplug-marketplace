import { useState } from 'react';
import Fees from './fees';
import RentalTime from './rentalTimes';
import { InfoType } from '.';

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

const rentalFees = [
  { name: 'Royalty', amount: 0 },
  { name: 'Market', amount: 0 },
  { name: 'Total', amount: 0 },
];

interface Props {
  info: InfoType;
  setInfo: (info: InfoType) => void;
}

const MarketPlaceLendInfo = ({ info, setInfo }: Props) => {
  const [firstDate, setFirstDate] = useState('wNear');
  const [endDate, setEndDate] = useState('');

  const handleDate = (item: string, type: string) => {
    if (type == rentalTimes[0].title) {
      setFirstDate(item);
    }

    if (type == rentalTimes[1].title) {
      setEndDate(item);
    }
  };

  return (
    <div className='mt-10'>
      {(rentalTimes || []).map((item, index) => (
        <RentalTime data={item} handleDate={handleDate} />
      ))}

      <div className='mt-5'>
        <div
          className='text-[20px] text-white font-[400]'
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          Rent
        </div>
        <div
          className='mt-1 text-[14px] text-[#CCCCCCCC] font-[500]'
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          How much rent the borrower should pay you.
        </div>
        <div className='flex flex-row items-center mt-3 '>
          <select
            id='countries'
            value={info.unit}
            className='bg-white w-[91px] text-[14px] text-black font-[500] pt-2 pb-2'
            onChange={(e) => {
              setInfo({ ...info, unit: e.target.value });
            }}
          >
            <option selected value='wNEAR'>
              wNEAR
            </option>
            <option value='3e2210e1184b45b64c8a434c0a7e7b23cc04ea7eb7a6c3c32520d03d4afcb8af'>
              USD
            </option>
            <option value='usdt.fakes.testnet'>USDT</option>
          </select>
          <input
            type='number'
            id='first_name'
            className='bg-white w-[91px] ml-5 text-black text-sm h-[33px] p-2'
            value={info.price}
            onChange={(e) => {
              setInfo({ ...info, price: Number(e.target.value) });
            }}
          />
        </div>
      </div>
      <div className='mt-5'>
        <div
          className='text-[20px] text-white font-[400]'
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          Fees
        </div>
        {rentalFees.map((item, index) => (
          <Fees item={item} />
        ))}
      </div>
    </div>
  );
};

export default MarketPlaceLendInfo;
