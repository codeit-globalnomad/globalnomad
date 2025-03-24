import marker from '@/assets/icons/marker.svg';
import Image from 'next/image';
export default function ActivityLocation() {
  return (
    <>
      <div className='h-[300px] rounded-[12px] bg-gray-50 md:h-[310px] lg:h-[450px]'></div>
      <div className='md:text-2lg flex gap-1 text-lg'>
        <Image src={marker} alt='지도 마커 아이콘' />
        <span className='font-regular flex gap-1 opacity-75'>주소</span>
        <button className='text-blue-100 underline'>복사</button>
      </div>
    </>
  );
}
