'use client';

import FeaturedCollectionItem from '@/components/pages/marketPlace/FeaturedCollectionItem';
import { collectionMockUpData } from '@/constants';

export default function FeaturedCollections() {
  return (
    <div className='w-full h-full mt-14 pb-14'>
      <div className='text-[44px] font-medium text-white'>
        Featured Collections
      </div>
      <div className='grid grid-cols-[repeat(auto-fit,_minmax(545px,_1fr))] gap-8 mt-8w-full mt-8'>
        {collectionMockUpData.map((item, index) => (
          <div className='mt-12' key={index}>
            <img src='marketPlace/image2.jpg' className='w-full h-[434px]' alt='Background' />
            <div className='mt-5 text-white'>
              <FeaturedCollectionItem
                collection={item}
                button='See Collection'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
