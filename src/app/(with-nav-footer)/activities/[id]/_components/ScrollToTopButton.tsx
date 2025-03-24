'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import arrowTop from '@/assets/icons/top-arrow.svg';

type ScrollToTopButtonProps = {
  onClick: () => void;
};

export default function ScrollToTopButton({ onClick }: ScrollToTopButtonProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    showButton && (
      <button
        onClick={onClick}
        className='fixed right-5 bottom-[70px] z-70 cursor-pointer rounded-full border-1 border-gray-200 bg-white p-3 md:bottom-5'
      >
        <Image src={arrowTop} alt='상단으로 이동' className='h-[16px] w-[16px]' />
      </button>
    )
  );
}
