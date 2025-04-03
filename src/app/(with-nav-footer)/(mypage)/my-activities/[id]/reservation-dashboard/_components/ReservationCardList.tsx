'use client';

import ReservationDetails from './ReservationDetails';
import Image from 'next/image';
import NoData from '@/assets/icons/No-data.svg';
import { useEffect, useRef, useState } from 'react';
import { useReservations } from '@/lib/hooks/useMyActivities';

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
};

export default function ReservationCardList({ status, activityId, reservations, scheduleId, isSmallScreen }: Props) {
  const [currentReservations, setCurrentReservations] = useState(reservations);
  const [cursorId, setCursorId] = useState<number | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data: moreReservations, isLoading } = useReservations(activityId, {
    cursorId,
    status,
    scheduleId,
    size: 3,
  });

  useEffect(() => {
    if (!moreReservations?.reservations?.length) {
      setHasMore(false);
      return;
    }

    setCurrentReservations((prev) => {
      const existingIds = new Set(prev.map((r) => r.id));
      const newReservations = moreReservations.reservations.filter((r) => !existingIds.has(r.id));
      return [...prev, ...newReservations];
    });

    setCursorId((prev) => {
      const lastId = moreReservations.reservations.at(-1)?.id;
      return lastId !== prev ? lastId : prev;
    });
  }, [moreReservations]);

  useEffect(() => {
    setCurrentReservations(reservations);
    setCursorId(undefined);
    setHasMore(true);
  }, [status, scheduleId, reservations]);

  useEffect(() => {
    if (!reservations.length || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCursorId((prev) => {
            const lastId = currentReservations.at(-1)?.id;
            return lastId !== prev ? lastId : prev;
          });
        }
      },
      { rootMargin: '100px', threshold: 0.5 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, isLoading, reservations.length, currentReservations]);

  return (
    <div className={`${isSmallScreen ? 'h-[500px]' : 'h-[340px]'} custom-scrollbar relative overflow-y-auto`}>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {isLoading ? (
        <div className='flex h-full items-center justify-center bg-gray-100'>
          <div className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='spinner-border h-7 w-7 animate-spin rounded-full border-4 border-solid border-green-100 border-t-transparent'></div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-[14px]'>
          {currentReservations.length > 0 ? (
            currentReservations.map((info) => (
              <ReservationDetails
                key={info.id}
                status={status}
                nickname={info.nickname}
                headCount={info.headCount}
                activityId={activityId}
                reservationId={info.id}
              />
            ))
          ) : (
            <div className={`${isSmallScreen ? 'h-[500px]' : 'h-[340px]'} flex items-center justify-center`}>
              <div className='flex flex-col items-center gap-3'>
                <Image src={NoData} width={80} height={80} alt='예약된 데이터가 없습니다.' />
                <div className='text-center text-gray-500'>예약된 데이터가 없습니다.</div>
              </div>
            </div>
          )}
          {hasMore && <div ref={observerRef} className='h-[120px]' />}
        </div>
      )}
    </div>
  );
}
