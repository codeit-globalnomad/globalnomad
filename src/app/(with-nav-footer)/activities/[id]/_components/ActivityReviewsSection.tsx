import { useRef } from 'react';
import Image from 'next/image';
import starRating from '@/assets/icons/star-rating.svg';
import ActivityReviews from './ActivityReviews';

export default function ReviewsSection() {
  const reviewsRef = useRef<HTMLDivElement>(null);
  return (
    <div id='reviews' ref={reviewsRef}>
      <div className='pt-[40px] md:pt-[50px]'></div>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <h3 className='text-2lg font-bold md:text-xl'>체험 후기 000개</h3>
          <div className='flex gap-1'>
            <Image src={starRating} alt='별점 아이콘' />
            <span className='md:text-2lg text-lg'>매우 만족</span>
          </div>
        </div>
        <ActivityReviews />
      </div>
    </div>
  );
}
