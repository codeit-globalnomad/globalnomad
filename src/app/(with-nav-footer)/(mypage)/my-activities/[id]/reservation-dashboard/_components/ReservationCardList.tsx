'use client';

import ReservationDetails from './ReservationDetails';
import Image from 'next/image';
import NoData from '@/assets/icons/No-data.svg';
import { useCallback } from 'react';
import { useInfiniteTimeSlotReservations } from '@/lib/hooks/useMyActivities';

type Reservation = {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  status: 'pending' | 'confirmed' | 'declined';
  activityId: number;
  reservations: Reservation[];
  scheduleId: number;
  isSmallScreen: boolean;
  firstCursorId: number | undefined;
  statusPatchError: () => void;
};

export default function ReservationCardList({
  status,
  activityId,
  scheduleId,
  isSmallScreen,
  statusPatchError,
}: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteTimeSlotReservations(
    activityId,
    { status, scheduleId },
    scheduleId !== undefined && !isNaN(scheduleId),
  );

  const observerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !hasNextPage) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        { rootMargin: '100px', threshold: 0.1 },
      );

      observer.observe(node);
      return () => observer.disconnect();
    },
    [hasNextPage, fetchNextPage],
  );

  const allReservations = data?.pages.flatMap((page) => page.reservations) ?? [];

  return (
    <div
      className={`${isSmallScreen ? (allReservations.length > 0 ? 'h-[300px] min-h-[250px]' : 'h-auto') : allReservations.length > 0 ? 'h-[340px]' : 'h-auto'} custom-scrollbar relative overflow-y-auto`}
    >
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {allReservations.length > 0 ? (
        <div className='flex flex-col gap-[14px]'>
          {allReservations.map((info) => (
            <ReservationDetails
              key={info.id}
              status={status}
              nickname={info.nickname}
              headCount={info.headCount}
              activityId={activityId}
              reservationId={info.id}
              hasError={statusPatchError}
            />
          ))}
          {isFetchingNextPage && (
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-4'>
              <div className='spinner-border h-7 w-7 animate-spin rounded-full border-4 border-solid border-green-100 border-t-transparent'></div>
            </div>
          )}
          <div ref={hasNextPage ? observerRef : null} />
        </div>
      ) : (
        <div className={`${isSmallScreen ? 'h-[300px]' : 'h-[340px]'} flex items-center justify-center`}>
          <div className='flex flex-col items-center gap-3'>
            <Image src={NoData} width={80} height={80} alt='신청된 예약이 없습니다.' />
            <div className='text-center text-gray-500'>신청된 예약이 없습니다.</div>
          </div>
        </div>
      )}
    </div>
  );
}
