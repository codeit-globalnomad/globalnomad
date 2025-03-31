'use client';

import ReservationDetails from './ReservationDetails';
import Image from 'next/image';
import NoData from '@/assets/icons/No-data.svg';

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
  reservations: Reservation[];
};

export default function ReservationCardList({ status, reservations }: Props) {
  console.log(reservations);

  return (
    <div className='flex flex-col gap-[14px]'>
      {reservations && reservations.length > 0 ? (
        reservations.map((info) => (
          <ReservationDetails key={info.id} status={status} nickname={info.nickname} headCount={info.headCount} />
        ))
      ) : (
        <div className='flex flex-col items-center gap-4 px-[50px] py-[95px]'>
          <Image src={NoData} width={80} height={80} alt='예약된 데이터가 없습니다.' />
          <div className='items-center justify-center text-center text-gray-500'>예약된 데이터가 없습니다.</div>
        </div>
      )}
    </div>
  );
}
