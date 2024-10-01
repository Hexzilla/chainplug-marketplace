import { useMetadataByMetadataId } from '../../hooks/useMetadatabyMetadataId';
import { RentModalInfo } from './RentModalInfo';
import { RentModalTemplate } from './RentModalTemplate';
import { LoadingSaleCard } from './LoadingSaleCard';
import { MarketToken } from '@/types/types';

function RentModal({
  closeModal,
  item,
}: {
  closeModal: () => void;
  item: MarketToken;
}): JSX.Element {
  const { metadata_id } = item;

  const modalInfo = useMetadataByMetadataId({ metadataId: metadata_id });

  if (modalInfo?.isTokenListLoading) {
    return (
      <RentModalTemplate closeModal={closeModal}>
        <LoadingSaleCard />
      </RentModalTemplate>
    );
  }

  return (
    <RentModalTemplate closeModal={closeModal}>
      <RentModalInfo data={modalInfo} nft={item} />
    </RentModalTemplate>
  );
}

export default RentModal;
