'use client';

import ReservationDetails from './ReservationDetails';
import Image from 'next/image';
import NoData from '@/assets/icons/No-data.svg';
import { useEffect, useRef, useState } from 'react';
import { getReservations } from '@/lib/apis/myActivities';

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
  reservations: initialReservations,
  scheduleId,
  isSmallScreen,
  firstCursorId,
  statusPatchError,
}: Props) {
  const cursorIdRef = useRef<number | undefined>(firstCursorId);
  const [currentReservations, setCurrentReservations] = useState(initialReservations);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const fetchReservations = async () => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);
    try {
      const data = await getReservations(activityId, {
        cursorId: cursorIdRef.current,
        status,
        scheduleId,
        size: 3,
      });

      if (!data?.reservations?.length) {
        setHasMore(false);
        return;
      }

      setCurrentReservations((prev) => {
        const existingIds = new Set(prev.map((r) => r.id));
        return [...prev, ...data.reservations.filter((r) => !existingIds.has(r.id))];
      });

      cursorIdRef.current = data.reservations.at(-1)?.id;
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    cursorIdRef.current = firstCursorId;
    setCurrentReservations(initialReservations);
    setHasMore(true);
  }, [initialReservations, firstCursorId]);

  useEffect(() => {
    if (!observerRef.current || !hasMore || isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchReservations();
      },
      { rootMargin: '100px', threshold: 0.1 },
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, isFetching]);

  useEffect(() => {
    if (cursorIdRef.current !== undefined) return;
    setCurrentReservations([]);
    cursorIdRef.current = undefined;
    setHasMore(true);
    fetchReservations();
  }, [status, activityId, scheduleId]);

  return (
    <div
      className={`${isSmallScreen ? (currentReservations.length > 0 ? 'h-[300px] min-h-[250px]' : 'h-auto') : currentReservations.length > 0 ? 'h-[340px]' : 'h-auto'} custom-scrollbar relative overflow-y-auto`}
    >
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {currentReservations.length > 0 ? (
        <div className='flex flex-col gap-[14px]'>
          {currentReservations.map((info) => (
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
          {isFetching && (
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-4'>
              <div className='spinner-border h-7 w-7 animate-spin rounded-full border-4 border-solid border-green-100 border-t-transparent'></div>
            </div>
          )}
          {hasMore && <div ref={observerRef} />}
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
