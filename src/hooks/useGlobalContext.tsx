import { GlobalContext } from '@/components/context/globalContext';
import { useContext } from 'react';

export const useGlobalContext = () => {
  const globalContext = useContext(GlobalContext);

  if (!globalContext)
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider'
    );
  return globalContext;
};
