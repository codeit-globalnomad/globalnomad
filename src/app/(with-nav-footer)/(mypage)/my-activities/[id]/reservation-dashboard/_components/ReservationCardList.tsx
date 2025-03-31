'use client';

import { useReservations } from '@/lib/hooks/useMyActivities';
import ReservationDetails from './ReservationDetails';
import Image from 'next/image';
import NoData from '@/assets/icons/No-data.svg';

type Props = {
  type: 'pending' | 'confirmed' | 'declined';
  scheduleId: number;
  activityId: number;
};

export default function ReservationCardList({ type, scheduleId, activityId }: Props) {
  const { data } = useReservations(activityId, {
    scheduleId: scheduleId,
    status: type,
  });

  const reservations = data?.reservations;

  return (
    <div className='flex flex-col gap-[14px]'>
      {reservations && reservations.length > 0 ? (
        reservations.map((info) => (
          <ReservationDetails key={info.id} type={type} nickname={info.nickname} headCount={info.headCount} />
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
