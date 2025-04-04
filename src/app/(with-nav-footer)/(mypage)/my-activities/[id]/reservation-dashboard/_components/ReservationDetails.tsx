'use client';

import Button from '@/components/Button';
import { useUpdateReservationStatus } from '@/lib/hooks/useMyActivities';
import { useRouter } from 'next/navigation';

type Props = {
  status: 'pending' | 'confirmed' | 'declined';
  nickname: string;
  headCount: number;
  activityId: number;
  reservationId: number;
  hasError: () => void;
};

export default function ReservationDetails({
  status,
  nickname,
  headCount,
  activityId,
  reservationId,
  hasError,
}: Props) {
  const { mutate: updateReservationStatus } = useUpdateReservationStatus();
  const router = useRouter();

  const handleStatusChange = (newStatus: 'confirmed' | 'declined') => {
    updateReservationStatus(
      {
        activityId,
        reservationId,
        status: newStatus,
      },
      {
        onSuccess: () => {
          router.refresh();
        },
        onError: () => {
          hasError();
        },
      },
    );
  };

  return (
    <div className='w-full rounded-[4px] border border-gray-300 bg-white px-4 pt-[9px] pb-3 text-gray-800 shadow-sm'>
      <div className='flex gap-[10px] text-[16px] leading-[26px]'>
        <div className='font-semibold'>닉네임</div>
        <span className='text-black-100 font-medium'>{nickname}</span>
      </div>
      <div className='flex gap-[10px] text-[16px] leading-[26px]'>
        <div className='font-semibold'>인원</div>
        <span className='text-black-100 font-medium'>{headCount}</span>
      </div>
      {status === 'pending' && (
        <div className='flex justify-end gap-2'>
          <Button
            type='button'
            variant='default'
            className='h-[38px] w-[82px] rounded-[6px] text-[14px] leading-[24px] font-bold'
            onClick={() => handleStatusChange('confirmed')}
          >
            승인하기
          </Button>
          <Button
            type='button'
            variant='outline'
            className='h-[38px] w-[82px] rounded-[6px] text-[14px] leading-[24px] font-bold'
            onClick={() => handleStatusChange('declined')}
          >
            거절하기
          </Button>
        </div>
      )}
      {status === 'confirmed' && (
        <div className='text-right'>
          <div className='text-orange-10 inline-block rounded-[26px] bg-orange-100 px-[15px] py-[10px] text-[14px] leading-[24px] font-bold'>
            예약 승인
          </div>
        </div>
      )}
      {status === 'declined' && (
        <div className='text-right'>
          <div className='bg-red-10 inline-block rounded-[26px] px-[15px] py-[10px] text-[14px] leading-[24px] font-bold text-red-100'>
            예약 거절
          </div>
        </div>
      )}
    </div>
  );
}
