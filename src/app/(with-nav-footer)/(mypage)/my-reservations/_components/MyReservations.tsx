'use client';

import { useEffect, useRef, useState } from 'react';
import { useInfiniteMyReservations } from '@/lib/hooks/useMyReservation';
import { ReservationWithActivity } from '@/lib/types/myReservation';
import MyReservationCard from './MyReservationCard';
import FilterDropdown from '@/components/FilterDropdown';
import arrowDownIcon from '@/assets/icons/arrow-filter-dropdown.svg';
import Image from 'next/image';
import emptyIcon from '@/assets/icons/empty.svg';
import type { InfiniteData } from '@tanstack/react-query';
import type { GetMyReservationsResponse } from '@/lib/types/myReservation';

const STATUS_LABEL_MAP = {
  pending: '예약 신청',
  confirmed: '예약 승인',
  declined: '예약 거절',
  canceled: '예약 취소',
  completed: '체험 완료',
} as const;

const STATUS_OPTIONS = Object.entries(STATUS_LABEL_MAP).map(([value, label]) => ({
  label,
  value,
}));

type Status = keyof typeof STATUS_LABEL_MAP;

export default function MyReservations() {
  const [status, setStatus] = useState<Status>('pending');

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteMyReservations(status);

  const dataTyped = data as unknown as InfiniteData<GetMyReservationsResponse>;

  const reservations: ReservationWithActivity[] =
    dataTyped?.pages.flatMap((page: GetMyReservationsResponse) => page.reservations) ?? [];

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // 무한 스크롤 옵저버
  useEffect(() => {
    if (!loaderRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const selectedOption = STATUS_OPTIONS.find((opt) => opt.value === status);

  return (
    <section className='w-full space-y-6'>
      {/* 헤더: 제목 + 드롭다운 */}
      <div className='flex items-center justify-between'>
        <h1 className='text-black-200 text-2xl font-bold'>예약 내역</h1>

        <FilterDropdown
          label='예약 상태'
          options={STATUS_OPTIONS}
          selected={selectedOption || null}
          onSelect={(option) => {
            if (option?.value) {
              setStatus(option.value as Status);
            }
          }}
          icon={arrowDownIcon}
          buttonClassName='min-w-[120px] justify-between border border-gray-300 px-4 py-2 rounded-md bg-white'
          dropdownClassName='min-w-[120px] border border-gray-300 bg-white shadow-md mt-2'
          optionClassName='px-4 py-2 text-sm hover:bg-gray-100'
        />
      </div>

      {/* 목록 또는 빈 상태 */}
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

          {/* 무한 스크롤 감지 요소 */}
          <div ref={loaderRef} className='h-10' />
          {isFetchingNextPage && <p className='text-center text-gray-400'>불러오는 중...</p>}
        </>
      )}
    </section>
  );
}
