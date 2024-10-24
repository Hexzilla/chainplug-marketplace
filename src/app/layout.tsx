'use client';

import '@near-wallet-selector/modal-ui/styles.css';
import { Inter } from 'next/font/google';
import '../styles.css';
import './globals.css';

import { MintbaseWalletContextProvider } from '@mintbase-js/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { mbjs } from '@mintbase-js/sdk';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import MenuTop from '@/components/MenuTop';
import MenuCenter from '@/components/MenuCenter';
import MenuBottom from '@/components/MenuBottom';
import { GlobalProvider } from '@/components/context/globalContext';

const inter = Inter({ subsets: ['latin'] });

export const isDev = process.env.NEXT_PUBLIC_ENV === 'dev';

export const getCallbackUrl = () => {
  let callbackUrl = '';

  if (typeof window !== 'undefined') {
    callbackUrl =
      isDev || window?.location?.host.includes('localhost')
        ? `http://${window?.location.host}`
        : `}`;
  }

  return callbackUrl;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  mbjs.config({
    network: process.env.NEXT_PUBLIC_NETWORK || 'testnet',
  });

  const MintbaseWalletSetup = {
    contractAddress: process.env.NEXT_PUBLIC_STORES,
    network: process.env.NEXT_PUBLIC_NETWORK,
    callbackUrl: getCallbackUrl(),
  };

  const mintbaseClient = new ApolloClient({
    uri: 'https://interop-mainnet.hasura.app/v1/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={mintbaseClient}>
      <QueryClientProvider client={queryClient}>
        <MintbaseWalletContextProvider {...MintbaseWalletSetup}>
          <GlobalProvider>
            <html lang='en'>
              <body
                className={inter.className}
                style={{ backgroundColor: '#111111' }}
              >
                <main className='min-h-screen'>
                  <div className='relative w-full h-screen p-8 bg-[#111111] overflow-x-hidden'>
                    <MenuTop />
                    <div className='w-full h-full bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-[#1E70F5] to-[#031126] border-l-2 border-t-2 border-r-2 border-[#4E4E4E] overflow-auto custom-scrollbar px-[50px] md:pt-[100px] lg:pt-[150px] pt-[80px] md:pt-[90px] lg:pt-[100px]'>
                      {children}
                    </div>
                    <MenuCenter />
                    <MenuBottom />
                  </div>
                </main>
              </body>
            </html>
          </GlobalProvider>
        </MintbaseWalletContextProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}
