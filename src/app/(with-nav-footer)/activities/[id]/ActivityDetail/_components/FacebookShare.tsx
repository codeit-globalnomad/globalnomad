'use client';

import Image from 'next/image';
import facebook from '@/assets/icons/share-facebook.svg';

type FacebookShareProps = {
  currentUrl: string;
  title: string;
  address: string;
};

export const FacebookShare = ({ currentUrl, title, address }: FacebookShareProps) => {
  const shareText = `${title}\n📍 ${address}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareText)}`;

  const shareFacebook = () => {
    window.open(facebookUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button onClick={shareFacebook} className='cursor-pointer' aria-label='페이스북 공유'>
      <Image src={facebook} width={50} height={50} alt='페이스북 아이콘' />
    </button>
  );
};
