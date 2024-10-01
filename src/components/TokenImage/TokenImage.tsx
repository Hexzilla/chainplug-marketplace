'use client';

import { parseMedia } from '@/utils';
import { getCachedImage } from '@/utils/getCachedImages';
import './styles.css';
import { useMemo } from 'react';

interface Prop {
  media: string;
  baseUri: string;
}

export default function TokenImage({ media, baseUri }: Prop) {
  const { mediaUrl } = parseMedia(media, baseUri);

  const imageSrc = useMemo(() => {
    return mediaUrl ? getCachedImage(mediaUrl, true) : '';
  }, [mediaUrl]);

  return (
    <div className="tokenBg">
      {mediaUrl ? (
        <img className="tokenImg" src={imageSrc} alt="" loading="lazy" />
      ) : (
        <div className="w-full h-64 flex justify-center items-center">
          No Nft Media Available
        </div>
      )}
    </div>
  );
}
