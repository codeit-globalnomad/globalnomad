import Image from 'next/image';
import NoData from '@/assets/icons/No-data.svg';

type Props = {
  isLoading: boolean;
};

export default function NoReservations({ isLoading }: Props) {
  if (isLoading) {
    return (
      <div className='flex h-full w-full items-center justify-center bg-gray-100'>
        <div className='spinner-border h-7 w-7 animate-spin rounded-full border-4 border-solid border-green-100 border-t-transparent'></div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      <Image src={NoData} width={80} height={80} alt='신청된 예약이 없습니다.' />
      <div className='text-center text-gray-500'>신청된 예약이 없습니다.</div>
    </div>
  );
}
