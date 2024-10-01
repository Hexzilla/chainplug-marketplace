import React from 'react';
import Link from 'next/link';
import Header from './header';

const MenuTop = React.memo(() => {
  return (
    <div className='absolute z-10 top-[32px] bg-transparent w-full'>
      <div className='flex justify-between w-full h-[55px]'>
        <div className='relative w-[230px] h-full'>
          <div className='absolute inset-0 bg-[#4E4E4E] [clip-path:polygon(0_0,_100%_0,_85%_100%,_0_100%)]'></div>
          <div className='relative bg-[#111111] grid content-center w-[229px] h-[calc(100%-1px)] [clip-path:polygon(0_0,_100%_0,_85%_100%,_0_100%)]'>
            <div className='text-white text-center text-3xl mr-6 cursor-pointer'>
              <Link href="/">CHAINPLUG</Link>
            </div>
          </div>
        </div>

        <div className='relative w-[450px] h-full sm:hidden lg:block'>
          <div className='absolute inset-0 bg-[#4E4E4E] [clip-path:polygon(0_0,_100%_0,_90%_100%,_10%_100%)]'></div>
          <div className='relative bg-[#111111] grid content-center w-[450px] h-[calc(100%-1px)] [clip-path:polygon(0.3%_0,_99.7%_0,_89.7%_100%,_10.3%_100%)]'>
            <div className='flex px-4 py-3 w-[359px] rounded-md overflow-hidden max-w-md mx-auto font-[sans-serif] bg-transparent'>
              <input
                type='text'
                placeholder='Search items, collections and creators'
                className='w-full outline-none bg-transparent text-white text-base'
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 192.904 192.904'
                width='24px'
                className='fill-white'
              >
                <path d='m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z'></path>
              </svg>
            </div>
          </div>
        </div>

        <div className='relative w-[280px] h-full mr-16'>
          <div className='absolute inset-0 bg-[#4E4E4E] [clip-path:polygon(0_0,_100%_0,_100%_100%,_10%_100%)]'></div>
          <div className='relative bg-[#111111] grid content-center w-[290px] h-[calc(100%-1px)] [clip-path:polygon(0.5%_0,_100%_0,_100%_100%,_10.5%_100%)]'>
            {/* <button className="border-0 text-white text-lg ml-6">GO BACK TO MOTHERSHIP</button> */}
            <Header />
          </div>
        </div>
      </div>
    </div>
  );
});

export default MenuTop;
