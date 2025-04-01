import Image from 'next/image';
import NoData from '@/assets/icons/No-data.svg';

export default function NoReservations() {
  return (
    <div className='rounded-b-[24px] bg-gray-100'>
      <div className='h-[1px] w-full bg-gray-300'></div>
      <div className='flex flex-col items-center gap-4 px-[50px] py-[145px]'>
        <Image src={NoData} width={80} height={80} alt='선택된 시간대에 대한 예약 정보가 없습니다.' />
        <div className='items-center justify-center text-center text-gray-500'>
          선택된 시간대에 대한 예약 정보가 없습니다.
        </div>
      </div>
    </div>
  );
}
