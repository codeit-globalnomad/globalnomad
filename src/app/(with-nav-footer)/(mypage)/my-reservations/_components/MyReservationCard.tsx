'use client';

import { useState } from 'react';
import Image from 'next/image';
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
      <div className='mb-6 w-full max-w-[792px] min-w-[344px] rounded-2xl shadow-md hover:bg-gray-100'>
        <div className='flex'>
          {/* 이미지 */}
          <div className='relative aspect-[1/1] w-[128px] md:w-[156px] lg:w-[204px]'>
            <Image
              src={activity.bannerImageUrl}
              alt={activity.title}
              fill
              sizes='(max-width: 768px) 128px, (max-width: 1024px) 156px, 204px'
              className='absolute rounded-tl-2xl rounded-bl-2xl object-cover'
            />
          </div>

          {/* 텍스트 영역 */}
          <div className='flex w-full flex-col px-[24px] py-[10px] md:py-[14px]'>
            <div className='flex flex-col gap-1 leading-normal'>
              <p className={`text-lg font-bold ${statusColorClass}`}>{statusLabel}</p>
              <h3 className='text-black-200 md:text-2lg overflow-hidden text-lg font-bold text-ellipsis whitespace-nowrap lg:text-2xl'>
                {activity.title}
              </h3>
              <p className='text-black-200 md:text-md lg:text-2lg font-regular text-xs'>{formattedDate}</p>
            </div>

            <div className='mt-2 flex flex-row flex-wrap items-center justify-between gap-2'>
              <p className='text-black-200 text-md font-medium md:text-xl'>₩ {totalPrice.toLocaleString()}</p>

              {status === 'pending' && (
                <Button
                  variant='outline'
                  onClick={() => setIsCancelModalOpen(true)}
                  className='!w-fit px-4 py-2 text-xs font-bold md:text-sm'
                >
                  예약 취소
                </Button>
              )}

              {status === 'completed' && !reviewSubmitted && (
                <Button
                  variant='default'
                  onClick={() => setIsReviewModalOpen(true)}
                  className='!w-fit px-4 py-2 text-xs font-bold md:text-sm'
                >
                  후기 작성
                </Button>
              )}

              {status === 'completed' && reviewSubmitted && (
                <span className='text-xs font-bold text-green-100 md:text-sm'>후기 작성 완료</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
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
