import { Activity } from '@/lib/types/activities';
import Image from 'next/image';
import starRating from '@/assets/icons/star-rating.svg';
import Link from 'next/link';

interface AllActivityItemProps {
  activity: Activity;
}

export default function AllActivityItem({ activity }: AllActivityItemProps) {
  return (
    <div className='relative h-auto min-h-[293px] max-w-[348px]'>
      <div className='relative aspect-[1/1] h-auto w-full max-w-[348px] min-w-[160px] cursor-pointer overflow-hidden rounded-3xl'>
        <Link href={`/activities/${activity.id}`}>
          <Image
            fill
            src={activity.bannerImageUrl}
            className='object-cover transition-transform duration-300 ease-in-out will-change-transform hover:scale-105'
            alt={`${activity.title} 배너 이미지`}
          />
        </Link>
      </div>
      <div className='mt-[16px] flex gap-1'>
        <Image src={starRating} width={20} height={20} alt='별점' />
        <p className='text-md text-black-100 font-medium'>{activity.rating.toFixed(1)}</p>
        <p className='text-md text-gray-700'> ({activity.reviewCount})</p>
      </div>
      <div className='text-black-100 text-2lg mt-[10px] line-clamp-2 h-[52px] font-semibold break-keep md:h-[58px] md:text-2xl'>
        {activity.title}
      </div>
      <div className='text-2lg text-black-100 mt-[5px] flex gap-1 font-bold md:mt-[15px] md:text-2xl'>
        ₩ {activity.price.toLocaleString()}
        <span className='text-lg font-medium text-gray-900 md:text-xl'>/ 인</span>
      </div>
    </div>
  );
}
