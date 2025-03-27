'use client';

import Image from 'next/image';
import { ReservationWithActivity } from '@/lib/types/myReservation';

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
  const { activity, status, date, startTime, endTime, headCount, totalPrice, reviewSubmitted } = reservation;

  const statusLabel = STATUS_LABEL_MAP[status];
  const statusColorClass = STATUS_COLOR_MAP[status];
  const formattedDate = `${date} · ${startTime} - ${endTime} · ${headCount}명`;

  return (
    <div className='flex w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
      {/* 썸네일 */}
      <div className='h-[204px] w-[204px] flex-shrink-0 overflow-hidden rounded-l-lg'>
        <Image
          src={activity.bannerImageUrl}
          alt={activity.title}
          width={204}
          height={204}
          className='h-full w-full object-cover'
        />
      </div>

      {/* 텍스트 정보 */}
      <div className='flex flex-1 flex-col justify-between px-6 py-4'>
        <div className='flex flex-col gap-4'>
          <p className={`text-lg font-bold ${statusColorClass}`}>{statusLabel}</p>
          <h3 className='text-black-200 text-xl font-bold'>{activity.title}</h3>
          <p className='text-2lg text-black-200 font-regular'>{formattedDate}</p>
        </div>

        <div className='flex items-end justify-between'>
          <p className='text-black-200 text-2xl font-medium'>₩{totalPrice.toLocaleString()}</p>

          {/* 버튼 영역 */}
          {status === 'pending' && (
            <button
              className='border-black-200 text-black-200 rounded-md border px-3 py-2 text-lg font-bold hover:bg-gray-300'
              // TODO: 예약 취소 모달 연결 예정
            >
              예약 취소
            </button>
          )}

          {status === 'completed' && !reviewSubmitted && (
            <button
              className='bg-black-200 rounded-md px-3 py-2 text-lg font-bold text-white hover:bg-gray-900'
              // TODO: 후기 작성 모달 연결 예정
            >
              후기 작성
            </button>
          )}

          {status === 'completed' && reviewSubmitted && (
            <span className='text-lg font-bold text-gray-400'>후기 작성 완료</span>
          )}
        </div>
      </div>
    </div>
  );
}
