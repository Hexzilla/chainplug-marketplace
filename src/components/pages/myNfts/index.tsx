'use client';
import { useOwnedTokens } from '@/hooks/useOwnedTokens';
import { useMemo } from 'react';

export default function MyNFTs() {
  const { nftTokens, marketTokenLoading, marketTokenError } = useOwnedTokens();

  return (
    <>My NFT</>
  )
};
