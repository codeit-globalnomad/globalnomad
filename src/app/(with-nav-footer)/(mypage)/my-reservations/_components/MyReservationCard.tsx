'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ReservationWithActivity } from '@/lib/types/myReservation';
import CancelReservationModal from './CancelReservationModal';
import WriteReviewModal from './WriteReviewModal';
import Button from '@/components/Button';

const STATUS_LABEL_MAP = {
  pending: '예약 신청',
  confirmed: '예약 승인',
  declined: '예약 거절',
  canceled: '예약 취소',
  completed: '체험 완료',
} as const;

const STATUS_COLOR_MAP = {
  pending: 'text-blue-50',
  confirmed: 'text-orange-10',
  declined: 'text-red-100',
  canceled: 'text-gray-800',
  completed: 'text-gray-800',
} as const;

type MyReservationCardProps = {
  reservation: ReservationWithActivity;
};

export default function MyReservationCard({ reservation }: MyReservationCardProps) {
  const {
    activity,
    status,
    date,
    startTime,
    endTime,
    headCount,
    totalPrice,
    reviewSubmitted,
    id: reservationId,
  } = reservation;

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const statusLabel = STATUS_LABEL_MAP[status];
  const statusColorClass = STATUS_COLOR_MAP[status];
  const formattedDate = `${date} · ${startTime} - ${endTime} · ${headCount}명`;

  return (
    <>
      <Link href={`/activities/${activity.id}`}>
        <div className='mt-[24px] mb-[24px] flex h-[136px] w-full max-w-full min-w-[344px] cursor-pointer rounded-2xl bg-white shadow-md hover:bg-gray-100 md:h-[156px]'>
          <div className='relative aspect-[1/1] h-[136px] w-[136px] md:h-[156px] md:w-[156px]'>
            <Image
              src={activity.bannerImageUrl}
              alt={`${activity.title} 배너 이미지`}
              fill
              sizes='(min-width: 1024px) 204px, (min-width: 768px) 156px, 128px'
              className='absolute rounded-tl-2xl rounded-bl-2xl object-cover'
            />
          </div>
          <div className='flex w-full flex-col px-[24px] py-[10px] md:py-[14px]'>
            <div className='flex flex-col gap-1 leading-normal'>
              <p className={`text-md font-bold ${statusColorClass}`}>{statusLabel}</p>
              <h3 className='text-black-200 text-2lg line-clamp-1 overflow-hidden font-bold break-keep text-ellipsis md:text-xl'>
                {activity.title}
              </h3>
              <p className='text-black-200 md:text-md font-regular line-clamp-1 text-sm break-keep'>{formattedDate}</p>
            </div>
            <div className='flex flex-wrap items-center justify-between'>
              <p className='md:text-2lg text-lg leading-[36px] font-medium text-gray-900'>
                ₩ {totalPrice.toLocaleString()}
              </p>
              {status === 'pending' && (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsCancelModalOpen(true);
                  }}
                >
                  <Button
                    variant='outline'
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsCancelModalOpen(true);
                    }}
                    className='!w-fit px-2 py-1 text-xs font-bold md:px-4 md:py-2 md:text-sm'
                  >
                    예약 취소
                  </Button>
                </div>
              )}
              {status === 'completed' && !reviewSubmitted && (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsReviewModalOpen(true);
                  }}
                >
                  <Button className='!w-fit px-2 py-1 text-xs font-bold md:px-4 md:py-2 md:text-sm'>후기 작성</Button>
                </div>
              )}
              {status === 'completed' && reviewSubmitted && (
                <span className='text-xs font-bold text-green-100 md:text-sm'>후기 작성 완료</span>
              )}
            </div>
          </div>
        </div>
      </Link>
      <CancelReservationModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        reservationId={reservationId}
        onCancel={() => setIsCancelModalOpen(false)}
      />
      <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        reservation={reservation}
      />
    </>
  );
}
