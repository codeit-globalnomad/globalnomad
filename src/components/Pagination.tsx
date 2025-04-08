'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import rightArrow from '@/assets/icons/pagination-right-arrow.svg';

export interface PaginationProps extends VariantProps<typeof paginationVariants> {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  size?: 'small' | 'medium';
}

const paginationVariants = cva(
  'flex items-center justify-center border font-regular transition-colors cursor-pointer disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        small: 'w-[40px] h-[40px] rounded-[10px] text-2lg',
        medium: 'w-[55px] h-[55px] rounded-[15px] text-2lg',
      },
      variant: {
        default: 'bg-white border-green-100 text-green-100 hover:bg-gray-200',
        active: 'bg-green-100 text-white font-medium',
        disabled: 'border-gray-300 text-gray-500 bg-gray-100',
      },
    },
    defaultVariants: {
      size: 'medium',
      variant: 'default',
    },
  },
);

const arrowSizeClasses = {
  small: 'h-[15.27px] w-[15.27px]',
  medium: 'h-[21px] w-[21px]',
};

const Pagination = ({ currentPage, totalPages, onChange, size }: PaginationProps) => {
  const pageGroupSize = 5;
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    const currentGroup = Math.ceil(currentPage / pageGroupSize);
    setStartPage((currentGroup - 1) * pageGroupSize + 1);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
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
      <button
        onClick={currentPage === 1 ? undefined : handlePrevGroup}
        disabled={currentPage === 1}
        aria-label='이전 페이지'
        className={paginationVariants({
          size,
          variant: currentPage === 1 ? 'disabled' : 'default',
        })}
      >
        <div
          className={`flex items-center justify-center ${arrowSizeClasses[size || 'medium']} ${
            currentPage === 1 ? 'opacity-50 grayscale' : ''
          }`}
        >
          <Image
            src={rightArrow}
            alt='이전 페이지로 이동'
            width={size === 'small' ? 5 : 7}
            height={size === 'small' ? 3 : 4}
            style={{
              width: `${size === 'small' ? '15px' : '21px'}`,
              height: `${size === 'small' ? '9px' : '12px'}`,
            }}
            className='-scale-x-100 transform object-contain'
          />
        </div>
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={paginationVariants({
            size,
            variant: currentPage === page ? 'active' : 'default',
          })}
          aria-label={`${page} 페이지`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={currentPage === totalPages ? undefined : handleNextGroup}
        disabled={currentPage === totalPages}
        aria-label='다음 페이지'
        className={paginationVariants({
          size,
          variant: currentPage === totalPages ? 'disabled' : 'default',
        })}
      >
        <div
          className={`flex items-center justify-center ${arrowSizeClasses[size || 'medium']} ${
            currentPage === totalPages ? 'opacity-50 grayscale' : ''
          }`}
        >
          <Image
            src={rightArrow}
            alt='다음 페이지로 이동'
            width={size === 'small' ? 5 : 7}
            height={size === 'small' ? 3 : 4}
            style={{
              width: `${size === 'small' ? '15px' : '21px'}`,
              height: `${size === 'small' ? '9px' : '12px'}`,
            }}
            className='object-contain'
          />
        </div>
      </button>
    </div>
  );
};

export default Pagination;
