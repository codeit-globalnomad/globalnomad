'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import arrowTop from '@/assets/icons/top-arrow.svg';

type ScrollToTopButtonProps = {
  onClick: () => void;
  isSameUser: boolean;
  isLoggedIn: boolean;
};

export default function ScrollToTopButton({ onClick, isSameUser, isLoggedIn }: ScrollToTopButtonProps) {
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
          isLoggedIn === false ? 'bottom-24 md:bottom-5' : isSameUser ? 'bottom-5' : 'bottom-24.5 md:bottom-5'
        }`}
        aria-label='상단 이동'
      >
        <Image src={arrowTop} className='h-[16px] w-[16px]' alt='상단이동 아이콘' />
      </button>
    )
  );
}
