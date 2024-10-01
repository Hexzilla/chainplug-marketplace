'use client';

interface Props {
  preview?: boolean;
  sm_preview?: boolean;
}

export default function LoadingItem({ preview, sm_preview }: Props) {
  const padding = preview ? 65 : sm_preview ? 75 : 45;
  const imageWidth = preview ? 713 : sm_preview ? 500 : 400;
  const imageHeight = preview ? 457 : sm_preview ? 470 : 400;

  const totalWidth = imageWidth + padding * 2;
  const totalHeight = imageHeight + padding * 2;

  return (
    <div
      className='bg-slate-900 animate-pulse rounded-xl shadow-xl'
      style={{ width: `${totalWidth}px`, height: `${totalHeight}px` }}
    />
  );
}
