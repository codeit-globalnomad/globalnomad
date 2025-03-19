'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

// 화살표 이미지
import rightArrow from '@/assets/icons/pagination-right-arrow.svg';

export interface PaginationProps extends VariantProps<typeof paginationVariants> {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  size?: 'sm' | 'md';
}

const paginationVariants = cva(
  'flex items-center justify-center border font-regular transition-colors cursor-pointer disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'w-[40px] h-[40px] rounded-[10px] text-2lg', // 작은 버튼 (40px x 40px)
        md: 'w-[55px] h-[55px] rounded-[15px] text-2lg', // 기본 버튼 (55px x 55px)
      },
      variant: {
        default: 'bg-white border-green-100 text-green-100 hover:bg-gray-200',
        active: 'bg-green-100 text-white font-medium',
        disabled: 'border-gray-300 text-gray-500 bg-gray-100',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);

// 화살표 크기 변수 설정
const arrowSizeClasses = {
  sm: 'h-[15.27px] w-[15.27px]',
  md: 'h-[21px] w-[21px]',
};

const Pagination = ({ currentPage, totalPages, onChange, size }: PaginationProps) => {
  const pageGroupSize = 5;
  const [startPage, setStartPage] = useState(1);

  // `currentPage`가 변경될 때 `startPage` 업데이트 (비활성화 유지 문제 해결)
  useEffect(() => {
    const currentGroup = Math.ceil(currentPage / pageGroupSize);
    setStartPage((currentGroup - 1) * pageGroupSize + 1);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; //음수 및 초과 페이지 이동 방지
    onChange(page);
  };

  const handlePrevGroup = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextGroup = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const pageNumbers = Array.from(
    { length: Math.min(pageGroupSize, totalPages - startPage + 1) },
    (_, i) => startPage + i,
  );

  return (
    <div className='flex items-center gap-2'>
      {/*  Prev Button  */}
      <button
        onClick={currentPage === 1 ? undefined : handlePrevGroup}
        disabled={currentPage === 1}
        aria-label='이전 페이지'
        className={paginationVariants({
          // 기존 variants 사용
          size,
          variant: currentPage === 1 ? 'disabled' : 'default',
        })}
      >
        <div
          className={`flex items-center justify-center ${arrowSizeClasses[size || 'md']} ${
            // 변수 사용
            currentPage === 1 ? 'opacity-50 grayscale' : ''
          }`} // 비활성화 시 그레이스케일 + 투명도 적용
        >
          <Image
            src={rightArrow} // 오른쪽 화살표를 반전해서 왼쪽 화살표로 사용
            alt='이전 페이지로 이동'
            width={size === 'sm' ? 5 : 7}
            height={size === 'sm' ? 3 : 4}
            className='scale-x-[-1] transform object-contain'
          />
        </div>
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={paginationVariants({
            size,
            variant: currentPage === page ? 'active' : 'default',
          })}
          aria-label={`${page} 페이지`} //각 페이지 번호 버튼에 aria-label 추가
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={currentPage === totalPages ? undefined : handleNextGroup}
        disabled={currentPage === totalPages}
        aria-label='다음 페이지'
        className={paginationVariants({
          // 기존 variants 사용
          size,
          variant: currentPage === totalPages ? 'disabled' : 'default',
        })}
      >
        <div
          className={`flex items-center justify-center ${arrowSizeClasses[size || 'md']} ${
            currentPage === totalPages ? 'opacity-50 grayscale' : ''
          }`} // 비활성화 시 그레이스케일 + 투명도 적용
        >
          <Image
            src={rightArrow} // 기본 오른쪽 화살표 그대로 사용
            alt='다음 페이지로 이동'
            width={size === 'sm' ? 5 : 7}
            height={size === 'sm' ? 3 : 4}
            className='object-contain'
          />
        </div>
      </button>
    </div>
  );
};

export default Pagination;
