import { useMetadataByMetadataId } from '../../hooks/useMetadatabyMetadataId';
import { MarketToken, SelectedNft } from '../../types/types';
import { BuyModalInfo } from './BuyModalInfo';
import { BuyModalTemplate } from './BuyModalTemplate';
import { LoadingSaleCard } from './LoadingSaleCard';

function BuyModal({
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
      <BuyModalTemplate closeModal={closeModal}>
        <LoadingSaleCard />
      </BuyModalTemplate>
    );
  }

  return (
    <BuyModalTemplate closeModal={closeModal}>
      <BuyModalInfo data={modalInfo} />
    </BuyModalTemplate>
  );
}

export default BuyModal;
