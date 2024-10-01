import { useMbWallet } from '@mintbase-js/react';
import {
  EIconName,
  EState,
  MbAmountInput,
  MbButton,
  MbDropdownMenu,
  MbIcon,
  MbInfoCard,
  MbMenuWrapper,
  MbTab,
  MbText,
} from 'mintbase-ui';

/*
Rent Modal Info:
The component that handles the NFT Rent Information
*/

import { useState } from 'react';
import { useNearPrice } from '../../hooks/useNearPrice';
import { MarketToken, PeriodType, TokenListData } from '../../types/types';
import { Period, Unit } from '@/config/constants';
import { rentNft } from '@/utils/near';

interface Props {
  data: Partial<TokenListData>;
  nft: MarketToken;
}

function AvailableNftComponent({ data, nft }: Props): JSX.Element {
  const { amountAvailable, tokensTotal, isTokenListLoading } = data;
  const message = `${amountAvailable} of ${tokensTotal} Available`;
  const { price, ft_contract_id } = nft;

  const { selector, isConnected, connect } = useMbWallet();
  const [currentPrice, setCurrentPrice] = useState(Number(price));
  const [amount, setAmount] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(Period[0].name);

  const nearPrice = useNearPrice();

  const items = Period?.map((p: PeriodType) => ({
    content: <span>{p.name}</span>,
    onClick: () => setSelectedPeriod(p.name),
  }));

  const handleRent = async () => {
    const wallet = await selector.wallet();
    if (wallet) {
      await rentNft(wallet, nft);
    }
  };

  const setNewPrice = (val: string) => {
    const value = Number(val);

    setAmount(value);
    setCurrentPrice(price ? Number(price) * value : 0);
  };

  return isConnected && !isTokenListLoading ? (
    <div className='mt-2'>
      <div className='my-4 flex justify-between'>
        <MbText className='text-gray-700 mb-2'>Period</MbText>
        <MbMenuWrapper setIsOpen={setMenuOpen}>
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            onKeyDown={() => setMenuOpen(!menuOpen)}
            role='button'
            tabIndex={-1}
          >
            <MbTab
              label={
                <div className='flex space-x-8 items-center'>
                  <span>{selectedPeriod}</span>
                  <div className='pointer-events-none'>
                    <MbIcon
                      name={
                        menuOpen
                          ? EIconName.ARROW_DROP_UP
                          : EIconName.ARROW_DROP_DOWN
                      }
                      size='16px'
                      color='blue-300'
                      darkColor='blue-100'
                    />
                  </div>
                </div>
              }
              isSmall
            />
          </div>
          <MbDropdownMenu
            items={items || []}
            isOpen={menuOpen}
            className='mt-2'
          />
        </MbMenuWrapper>
      </div>
      <div className='bg-gray-50 py-4 text-center'>
        <MbText className='p-med-90 text-gray-700'>
          <span className='p-med-130 text-black'>{message}</span>
        </MbText>
      </div>
      <div className='py-2'>
        <div className='mb-8'>
          <MbInfoCard
            boxInfo={{
              description: `${currentPrice?.toFixed(2)} ${
                Unit[ft_contract_id!]
              }`,
              title: 'Price',
              lowerLeftText: `~ ${(
                Number(nearPrice) * Number(currentPrice)
              ).toFixed(2)} USD`,
            }}
          />
          <div className='mt-4'>
            <MbText className='text-gray-700 mb-2'>Quantity</MbText>
            <MbAmountInput
              maxAmount={Math.min(amountAvailable || 0, 1)}
              onValueChange={(e) => {
                setNewPrice(e);
              }}
              disabled={amountAvailable === 1}
            />
          </div>
        </div>
        <div className='text-center'>
          <MbButton label='Rent' state={EState.ACTIVE} onClick={handleRent} />
        </div>
      </div>
    </div>
  ) : (
    <MbButton onClick={connect} label='Connect to Wallet' />
  );
}

export function RentModalInfo({ data, nft }: Props): JSX.Element {
  if (!(nft?.price && Number(nft?.price) > 0)) {
    return (
      <div className='mt-2'>
        <div className='bg-gray-50 py-4 text-center'>
          <MbText className='p-med-90 text-gray-700'>
            <span className='p-med-130 text-black'>NFT Not Available</span>
          </MbText>
        </div>
      </div>
    );
  }

  return <AvailableNftComponent data={data} nft={nft} />;
}
