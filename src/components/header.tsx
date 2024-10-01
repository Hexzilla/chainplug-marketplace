'use client';
import { useMbWallet } from '@mintbase-js/react';
import { MbButton } from 'mintbase-ui';
import Link from 'next/link';

const Header = () => {
  const { isConnected, connect, activeAccountId, disconnect } = useMbWallet();

  const buttonLabel = isConnected
    ? `Sign Out ${activeAccountId}`
    : ' Connect NEAR Wallet';

  const buttonAction = isConnected ? disconnect : connect;

  return (
    <div className='bg-transparent pb-4 pl-4 ml-8 sticky top-0 z-30'>
      <MbButton onClick={buttonAction} label={buttonLabel} />
    </div>
  );
};

export default Header;
