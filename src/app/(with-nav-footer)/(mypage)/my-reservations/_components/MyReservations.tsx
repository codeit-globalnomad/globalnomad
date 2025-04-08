'use client';

import { useEffect, useRef, useState } from 'react';
import { useInfiniteMyReservations } from '@/lib/hooks/useMyReservation';
import Empty from '@/components/Empty';
import MyReservationCard from './MyReservationCard';
import FilterDropdown from '@/components/FilterDropdown';
import arrowDownIcon from '@/assets/icons/arrow-filter-dropdown.svg';
import LoadingSpinner from '@/components/LoadingSpinner';
import RetryError from '@/components/RetryError';

const STATUS_LABEL_MAP = {
  pending: '예약 신청',
  confirmed: '예약 승인',
  declined: '예약 거절',
  canceled: '예약 취소',
  completed: '체험 완료',
} as const;

type Status = keyof typeof STATUS_LABEL_MAP | undefined;

const STATUS_OPTIONS = [
  { label: '전체', value: undefined },
  ...Object.entries(STATUS_LABEL_MAP).map(([value, label]) => ({
    label,
    value,
  })),
];

export default function MyReservations() {
  const [status, setStatus] = useState<Status>(undefined);
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, isError, refetch } =
    useInfiniteMyReservations(status);
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

  const selectedOption =
    status === undefined ? { label: '필터', value: undefined } : STATUS_OPTIONS.find((opt) => opt.value === status);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <RetryError onRetry={refetch} className='py-10' />;

  return (
    <section>
      <div className='flex items-center justify-between'>
        <h1 className='text-black-200 text-2xl font-bold'>예약 내역</h1>
        <FilterDropdown
          label={selectedOption?.label ?? '필터'}
          options={STATUS_OPTIONS}
          selected={selectedOption || null}
          onSelect={(option) => setStatus(option?.value as Status)}
          icon={arrowDownIcon}
          buttonClassName='min-w-[120px] justify-between  px-4 py-2 rounded-xl border border-green-100 font-medium whitespace-nowrap text-green-100'
          dropdownClassName='min-w-[120px] border border-gray-300 bg-white drop-shadow-sm rounded-xl'
          optionClassName='text-md px-4 py-2'
        />
      </div>

      {reservations.length === 0 ? (
        <Empty>아직 예약한 체험이 없어요.</Empty>
      ) : (
        <>
          {reservations.map((reservation) => (
            <MyReservationCard key={reservation.id} reservation={reservation} />
          ))}
          <div ref={loaderRef} className='h-[1px]' />
          {isFetchingNextPage && <p className='text-center text-gray-400'>불러오는 중...</p>}
        </>
      )}
    </section>
  );
}
