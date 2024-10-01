import React from "react";

const MenuBottom = React.memo(() => {
  return (
    <div className='absolute z-10 left-8 right-0 bottom-[25px] bg-transparent'>
      <div className='bg-[#111111] grid content-center text-white text-center w-[90px] h-[50px] [clip-path:polygon(0_0,_80%_0,_100%_100%,_0_100%)]'>
        <div className='text-white text-center text-lg mr-4'>NEWS</div>
      </div>
    </div>
  );
});

export default MenuBottom;
