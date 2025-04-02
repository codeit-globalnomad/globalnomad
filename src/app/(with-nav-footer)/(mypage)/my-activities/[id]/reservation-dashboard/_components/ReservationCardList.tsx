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
};

export default function ReservationCardList({ status, activityId, reservations, scheduleId }: Props) {
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
    <div className='custom-scrollbar h-[340px] overflow-y-auto'>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

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
          <div className='flex flex-col items-center gap-4 px-[50px] py-[95px]'>
            <Image src={NoData} width={80} height={80} alt='예약된 데이터가 없습니다.' />
            <div className='items-center justify-center text-center text-gray-500'>예약된 데이터가 없습니다.</div>
          </div>
        )}

        {isLoading && <p>로딩 중...</p>}

        {hasMore && <div ref={observerRef} className='h-[120px]' />}
      </div>
    </div>
  );
}
