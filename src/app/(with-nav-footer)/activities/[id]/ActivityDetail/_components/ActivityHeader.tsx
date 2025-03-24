import Image from 'next/image';
import starRating from '@/assets/icons/star-rating.svg';
import marker from '@/assets/icons/marker.svg';
// import Dropdown from "@/components/Dropdown";
// import Modal from "@/components/Modal"

export default function ActivityHeader() {
  return (
    <div className='flex flex-col gap-2'>
      <span className='text-md font-regular opacity-75'>카테고리명</span>
      <div className='flex justify-between'>
        <h1 className='w-[80%] text-2xl font-bold md:text-3xl'>체험 제목</h1>
        {/* 공유하기 <Modal /> */}
        {/* 더보기 <Dropdown /> */}
      </div>
      <div className='align-center flex flex-row gap-4'>
        {/* Rating */}
        <div className='font-regular text-md flex gap-1 md:text-lg'>
          <Image src={starRating} alt='별점 아이콘' />
          <span>평균 별점</span>
          <span>(후기 개수)</span>
        </div>
        {/* Address */}
        <div className='text-md font-regular flex gap-1 md:text-lg'>
          <Image src={marker} alt='지도 마커 아이콘' />
          <span className='opacity-75'>주소</span>
        </div>
      </div>
    </div>
  );
}
