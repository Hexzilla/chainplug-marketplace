import React from "react";

const MenuCenter = React.memo(() => {
  return (
    <div className='absolute z-10 bottom-1/3 left-8 bg-transparent w-[25px]'>
      <div className='bg-[#111111] border-t-2 border-r-2 border-b-2 border-[#4E4E4E] w-[20px] h-[350px] flex items-center justify-center'>
        <div className='text-white text-center w-[350px] text-xs font-sans [writing-mode:vertical-lr]'>
          ©2024 Chainplug / Privacy Policy / Terms and Conditions
        </div>
      </div>
    </div>
  );
});

export default MenuCenter;
