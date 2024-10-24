'use client';
import { useMemo } from 'react';
import { parseMedia } from '@/utils';
import { getCachedImage } from '@/utils/getCachedImages';

interface Prop {
  media: string;
  base_uri: string;
  sm_preview?: boolean;
  preview?: boolean;
  children?: React.ReactNode;
}

export default function NftViewer({
  preview,
  sm_preview,
  media,
  base_uri,
  children,
}: Prop) {
  const { mediaUrl } = parseMedia(media, base_uri);
  const imageUrl = useMemo(() => {
    return mediaUrl ? getCachedImage(mediaUrl, true) : '';
  }, [mediaUrl]);

  return (
    <div className={`cursor-pointer
      ${preview || sm_preview ? (sm_preview ? 'w-full max-w-[650px]' : 'w-full') : 'w-full max-w-sm mx-auto'}`}>
      <div
        className={`${preview || sm_preview ? (preview ? 'p-[5%]' : 'p-[6%]') : 'p-[4%]'}`}
        style={{
          backgroundImage: 'url(marketPlace/background.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {mediaUrl ? (
          <img
            src={imageUrl}
            className={`w-full h-auto object-contain
              ${preview || sm_preview
                ? preview
                  ? 'max-h-[60vh]'
                  : 'max-h-[50vh]'
                : 'max-h-[40vh]'}`}
            alt=""
            loading="lazy"
          />
        ) : (
          <div className="w-full h-64 flex justify-center items-center">
            No Nft Media Available
          </div>
        )}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}