'use client';

import { useMemo } from 'react';
import { parseMedia } from '@/utils';
import { getCachedImage } from '@/utils/getCachedImages';

interface Prop {
  media: string;
  base_uri: string;
  sm_preview?: boolean;
  preview?: boolean;
}

export default function NftViewer({
  preview,
  sm_preview,
  media,
  base_uri,
}: Prop) {
  const { mediaUrl } = parseMedia(media, base_uri);

  const imageUrl = useMemo(() => {
    return mediaUrl ? getCachedImage(mediaUrl, true) : '';
  }, [mediaUrl]);

  return (
    <div
      style={{
        backgroundImage: 'url(marketPlace/background.png)',
        backgroundSize: 'cover',
        width: preview || sm_preview ? (sm_preview ? '650px' : '') : '470px',
        backgroundRepeat: 'no-repeat',
        padding:
          preview || sm_preview ? (preview ? '65px' : '75px') : '45px 35px',
        cursor: 'pointer',
      }}
    >
      {mediaUrl ? (
        <img
          src={imageUrl}
          style={
            preview || sm_preview
              ? preview
                ? { width: '713px', height: '457px' }
                : { width: '500px', height: '470px' }
              : { width: '400px', height: '400px' }
          }
          alt=""
          loading="lazy"
        />
      ) : (
        <div className="w-full h-64 flex justify-center items-center">
          No Nft Media Available
        </div>
      )}
    </div>
  );
}
