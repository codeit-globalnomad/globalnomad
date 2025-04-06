'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import arrowTop from '@/assets/icons/top-arrow.svg';

type ScrollToTopButtonProps = {
  onClick: () => void;
  isSameUser: boolean;
};

export default function ScrollToTopButton({ onClick, isSameUser }: ScrollToTopButtonProps) {
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
        className={`fixed right-5 z-45 cursor-pointer rounded-full border-1 border-gray-300 bg-white p-3 ${
          isSameUser ? 'bottom-[20px]' : 'bottom-[100px] md:bottom-[20px]'
        }`}
        aria-label='상단 이동'
      >
        <Image src={arrowTop} alt='상단이동 아이콘' className='h-[16px] w-[16px]' />
      </button>
    )
  );
}
