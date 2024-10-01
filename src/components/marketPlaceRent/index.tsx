import ImageViewer from '../ImageViewer';
import MarketPlaceTitle from '../pages/nftRent/marketPlaceTitle';
import MarketPlaceRentInfo from '../marketPlaceRentInfo';
import MarketPlaceRent from '../pages/nftRent/marketPlaceRentItem';
import MarketPlaceLendItem from '../pages/nftRent/marketPlaceLendItem';
import MarketPlaceLendInfo from '../pages/nftRent/marketPlaceLendInfo';
import { useGlobalContext } from '@/hooks/useGlobalContext';

export type MarketPlace = {
  title: string;
  index: string;
  data: string;
};
const marketDetails = [
  { title: 'Lease Start Time', data: '27/08/2024, 08:13:00' },
  { title: 'Lease End Time', data: '27/08/2024, 08:30:00' },
];

interface Props {
  data: any;
  type: string;
  handleBack: () => void;
}

const MarketplaceRent = ({ data, type, handleBack }: Props) => {
  const { selectedItem } = useGlobalContext();
  const handleLend = () => {
    console.log(`handlelend`);
  };

  const handleRent = () => {
    console.log(`handleRent`);
  };

  const handleLendInfo = (firstDate: string, endDate: string) => {
    console.log(`firstDate`, firstDate);
  };
  return (
    <div className='grid justify-items-center items-center w-full mt-32 pl-12 pr-12'>
      <div className='flex flex-row  items-center gap-20 w-[1387px] h-[772px]'>
        <div className='text-white w-[772px] h-full'>
          <ImageViewer
            url='/marketPlace/image1.jpg'
            height='620px'
            width='620px'
          />
        </div>

        <div className='grid content-between h-full'>
          {/* rent */}
          {type == 'rent' && (
            <>
              <MarketPlaceTitle item={selectedItem} />
              <div className='mt-20'>
                <div
                  className='bg-transparent w-full text-[32px] font-[400] text-white'
                  style={{ fontFamily: 'Sora, sans-serif' }}
                >
                  Lease Info
                </div>
                {(marketDetails || []).map((item: any, index: any) => (
                  <MarketPlaceRentInfo item={selectedItem} data={item} />
                ))}
              </div>
              <MarketPlaceRent
                item={selectedItem}
                handleBack={handleBack}
                handleRent={handleRent}
              />
            </>
          )}

          {/* lend */}
          {type == 'lend' && (
            <>
              <MarketPlaceTitle item={selectedItem} title='Lend' />
              <div>
                <MarketPlaceLendInfo handleLendInfo={handleLendInfo} />
              </div>
              <MarketPlaceLendItem
                handleBack={handleBack}
                handleLend={handleLend}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplaceRent;
