import { Activity } from '@/lib/types/activities';
import Link from 'next/link';
import Image from 'next/image';
import starRating from '@/assets/icons/star-rating.svg';

interface AllActivityItemProps {
  activity: Activity;
}

export default function AllActivityItem({ activity }: AllActivityItemProps) {
  return (
    <article className='group relative h-auto min-h-[293px] max-w-[348px]'>
      <Link href={`/activities/${activity.id}`}>
        <div className='relative aspect-[1/1] h-auto w-full max-w-[348px] min-w-[160px] cursor-pointer overflow-hidden rounded-3xl'>
          <Image
            src={activity.bannerImageUrl}
            alt={`${activity.title} 배너 이미지`}
            fill
            sizes='(max-width: 768px) 100vw, 348px'
            className='object-cover transition-transform duration-300 ease-in-out will-change-transform group-hover:scale-105'
          />
        </div>
        <div className='mt-[16px] flex gap-1'>
          <Image src={starRating} className='h-[18px] w-[18px]' alt='별점 아이콘' />
          <p className='text-md text-black-100 leading-[18px] font-medium'>{activity.rating.toFixed(1)}</p>
          <p className='text-md leading-[18px] text-gray-700'> ({activity.reviewCount})</p>
        </div>
        <div className='text-black-100 text-2lg mt-[10px] line-clamp-2 h-[52px] font-semibold break-keep md:h-[58px] md:text-2xl'>
          {activity.title}
        </div>
        <div className='text-2lg text-black-100 mt-[5px] flex gap-1 font-semibold md:mt-[15px] md:text-xl'>
          ₩ {activity.price.toLocaleString()}
          <span className='text-lg leading-[26px] font-medium text-gray-700 md:leading-[32px]'>/ 인</span>
        </div>
      </Link>
    </article>
  );
}
