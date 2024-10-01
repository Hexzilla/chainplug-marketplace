'use client';
import { AdminMarketToken, MarketToken } from '@/types/types';
import { createContext, useMemo, useState } from 'react';

interface GlobalContextType {
  selectedItem: MarketToken | AdminMarketToken;
  setSelectedItem: (item: MarketToken | AdminMarketToken) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isRent: boolean;
  setIsRent: (rent: boolean) => void;
}

export const GlobalContext = createContext<GlobalContextType>(
  {} as GlobalContextType
);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<
    MarketToken | AdminMarketToken
  >({} as MarketToken | AdminMarketToken);
  const [loading, setLoading] = useState<boolean>(false);
  const [isRent, setIsRent] = useState<boolean>(false);
  const memoizedContextValue = useMemo(
    () => ({
      selectedItem,
      loading,
      isRent,
      setIsRent,
      setSelectedItem,
      setLoading,
    }),
    [selectedItem, loading, isRent, setIsRent, setSelectedItem, setLoading]
  );
  return (
    <GlobalContext.Provider value={memoizedContextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
