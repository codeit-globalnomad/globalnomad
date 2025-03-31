'use client';

import Button from '@/components/Button';

type Props = {
  type: 'pending' | 'confirmed' | 'declined';
  nickname: string;
  headCount: number;
};

export default function ReservationDetails({ type, nickname, headCount }: Props) {
  return (
    <div className='w-full rounded-[4px] border border-gray-300 bg-white px-4 pt-[9px] pb-3 shadow-sm'>
      <div className='flex gap-[10px] text-[16px] leading-[26px]'>
        <div className='font-semibold text-gray-800'>닉네임</div>
        <span className='text-black-100 font-medium'>{nickname}</span>
      </div>
      <div className='flex gap-[10px] text-[16px] leading-[26px]'>
        <div className='font-semibold text-gray-800'>인원</div>
        <span className='text-black-100 font-medium'>{headCount}</span>
      </div>
      {type === 'pending' && (
        <div className='flex justify-end gap-2'>
          <Button
            type='button'
            variant='default'
            className='h-[38px] w-[82px] rounded-[6px] text-[14px] leading-[24px] font-bold'
          >
            승인하기
          </Button>
          <Button
            type='button'
            variant='outline'
            className='h-[38px] w-[82px] rounded-[6px] text-[14px] leading-[24px] font-bold'
          >
            거절하기
          </Button>
        </div>
      )}
      {type === 'confirmed' && (
        <div className='text-right'>
          <div className='text-orange-10 inline-block rounded-[26px] bg-orange-100 px-[15px] py-[10px] text-[14px] leading-[24px] font-bold'>
            예약 승인
          </div>
        </div>
      )}
      {type === 'declined' && (
        <div className='text-right'>
          <div className='bg-red-10 inline-block rounded-[26px] px-[15px] py-[10px] text-[14px] leading-[24px] font-bold text-red-100'>
            예약 거절
          </div>
        </div>
      )}
    </div>
  );
}
