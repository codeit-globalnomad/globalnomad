'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import arrow from '@/assets/icons/arrow-filter-dropdown2.svg';

type ActivityDescriptionProps = {
  description: string;
};

export default function ActivityDescription({ description }: ActivityDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const contentRef = useRef<HTMLParagraphElement>(null);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [description]);

  return (
    <>
      <style jsx>{`
        button::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100px;
          background: linear-gradient(rgba(250, 250, 250, 0) 0%, rgb(250, 250, 250) 60%, rgb(250, 250, 250) 100%);
          z-index: -1;
          transition:
            height 0.3s ease-out,
            opacity 0.3s ease-out;
        }
        button.expanded::before {
          height: 0;
          opacity: 0;
        }
      `}</style>
      <p
        ref={contentRef}
        className={`overflow-hidden text-lg text-[17px] leading-[1.5] font-light transition-all duration-300 ease-out`}
        style={{
          height: isExpanded ? `${contentHeight}px` : '100px',
          marginBottom: isExpanded ? '50px' : '0',
        }}
      >
        {description}
      </p>
      <div className='relative z-10 mt-[-20px] bg-transparent'>
        <button
          className={`align-center flex w-full cursor-pointer justify-center rounded-[4px] border-1 border-black px-1 py-[8px] ${isExpanded ? 'expanded' : ''}`}
          onClick={handleToggle}
        >
          <span>{isExpanded ? '간략히 보기' : '더보기'}</span>
          <Image src={arrow} className={`ml-2 ${isExpanded ? 'rotate-180' : ''}`} alt='아래 위 버튼 화살표 아이콘' />
        </button>
      </div>
    </>
  );
}
