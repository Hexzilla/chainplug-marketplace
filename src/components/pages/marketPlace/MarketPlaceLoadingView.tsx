'use client';

import LoadingItem from '@/components/LoadingItem';

export default function MarketPlaceLoadingView() {
  const products = Array.from(Array(6).keys());
  return (
    <div>
      <div className='mt-32'>
        <LoadingItem preview />
      </div>
      <div className='grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] md:justify-items-center lg:justify-items-start gap-20 mt-32'>
        {products.map((product) => (
          <LoadingItem key={product} />
        ))}
      </div>
    </div>
  );
}
