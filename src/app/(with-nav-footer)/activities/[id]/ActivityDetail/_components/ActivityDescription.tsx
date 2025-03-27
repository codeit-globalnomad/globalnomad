'use client';

import { useState } from 'react';

export default function ActivityDescription() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

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
          background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 70%, rgb(255, 255, 255) 100%);
          z-index: -1;
          transition:
            height 0.3s ease-out,
            opacity 0.3s ease-out; /* 추가된 opacity */
        }

        /* 버튼 클릭 시 ::before의 높이와 opacity를 변화시켜서 사라지게 */
        button.expanded::before {
          height: 0; /* ::before의 높이를 0으로 설정 */
          opacity: 0; /* opacity를 0으로 설정하여 부드럽게 사라지도록 */
        }

        /* 설명 내용 p 태그의 높이를 상태에 따라 조절 */
        p {
          max-height: ${isExpanded ? '1000px' : '200px'}; /* max-height로 변경 */
          overflow: hidden; /* 내용이 넘치지 않도록 숨기기 */
          transition: height 0.3s ease-out; /* 부드러운 높이 변화를 위한 트랜지션 */
        }
      `}</style>
      <p
        className={`transition-max-height w-full overflow-hidden duration-300 ease-out ${
          isExpanded ? 'max-h-[1000px]' : 'max-h-[200px]'
        }`}
      >
        체험 설명 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용
        내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용체험 설명 내용 내용 내용
        내용 내용 내용 내용 내용 내용
      </p>{' '}
      <div className='relative z-10 mt-[-30px] bg-transparent'>
        <button
          className={`align-center flex w-full cursor-pointer justify-center rounded-[4px] border-1 border-black bg-white px-1 py-[8px] ${isExpanded ? 'expanded' : ''}`}
          onClick={handleToggle}
        >
          {isExpanded ? '간략히 보기' : '더보기'}
        </button>
      </div>
    </>
  );
}
