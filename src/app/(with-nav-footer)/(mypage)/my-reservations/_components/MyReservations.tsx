'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useInfiniteMyReservations } from '@/lib/hooks/useMyReservation';
import MyReservationCard from './MyReservationCard';
import FilterDropdown from '@/components/FilterDropdown';
import arrowDownIcon from '@/assets/icons/arrow-filter-dropdown.svg';
import emptyIcon from '@/assets/icons/empty.svg';

const STATUS_LABEL_MAP = {
  pending: '예약 신청',
  confirmed: '예약 승인',
  declined: '예약 거절',
  canceled: '예약 취소',
  completed: '체험 완료',
} as const;

type Status = keyof typeof STATUS_LABEL_MAP | undefined; // all 제거, undefined로 사용

const STATUS_OPTIONS = [
  { label: '전체', value: undefined }, // all 제거하고 undefined로 사용
  ...Object.entries(STATUS_LABEL_MAP).map(([value, label]) => ({
    label,
    value,
  })),
];

export default function MyReservations() {
  const [status, setStatus] = useState<Status>(undefined);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteMyReservations(status);

  const reservations = data?.pages.flatMap((page) => page.reservations) ?? [];

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextPage();
    });

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const selectedOption = STATUS_OPTIONS.find((opt) => opt.value === status);

  return (
    <section className='w-full space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-black-200 text-2xl font-bold'>예약 내역</h1>
        <FilterDropdown
          label='필터'
          options={STATUS_OPTIONS}
          selected={selectedOption || null}
          onSelect={(option) => setStatus(option?.value as Status)}
          icon={arrowDownIcon}
          buttonClassName='min-w-[120px] justify-between  px-4 py-2 rounded-xl border border-green-100 font-medium whitespace-nowrap text-green-100'
          dropdownClassName='min-w-[120px] border border-gray-300 bg-white drop-shadow-sm mt-2'
          optionClassName='text-md text-lg px-4 py-2 text-lg font-medium text-gray-900 hover:bg-gray-100'
        />
      </div>

      {isLoading ? (
        <p className='text-center text-gray-400'>불러오는 중...</p>
      ) : reservations.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 text-center'>
          <Image src={emptyIcon} alt='예약 없음 아이콘' width={120} height={120} className='mb-6' />
          <p className='text-lg font-medium text-gray-500'>아직 예약한 체험이 없어요</p>
        </div>
      ) : (
        <>
          <ul className='mx-auto w-full max-w-[680px] space-y-4 px-4'>
            {reservations.map((reservation) => (
              <li key={reservation.id}>
                <MyReservationCard reservation={reservation} />
              </li>
            ))}
          </ul>
          <div ref={loaderRef} className='h-10' />
          {isFetchingNextPage && <p className='text-center text-gray-400'>불러오는 중...</p>}
        </>
      )}
    </section>
  );
}
