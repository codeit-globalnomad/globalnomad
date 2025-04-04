import { Activity } from '@/lib/types/activities';
import Link from 'next/link';
import Image from 'next/image';
import starRating from '@/assets/icons/star-rating.svg';

interface BestActivityItemProps {
  activity: Activity;
}

export default function BestActivityItem({ activity }: BestActivityItemProps) {
  return (
    <Link href={`/activities/${activity.id}`}>
      <article className='relative aspect-[1.03] h-full max-h-[384px] min-h-[186px] w-full max-w-[384px] min-w-[186px] cursor-pointer overflow-hidden rounded-3xl'>
        <Image
          src={activity.bannerImageUrl}
          alt={`${activity.title} 배너 이미지`}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px'
          style={{ transformOrigin: 'center' }}
          className='object-cover transition-transform duration-300 ease-in-out will-change-transform hover:scale-105'
        />
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
        <div className='absolute bottom-0 px-5 pb-[24px] md:pb-[30px]'>
          <div className='flex items-center gap-[5px]'>
            <Image src={starRating} className='h-[14px] w-[14px] md:h-[18px] md:w-[18px]' alt='별점 아이콘' />
            <p className='md:text-md text-sm leading-[14px] font-medium text-white md:leading-[18px] md:font-semibold'>
              {activity.rating.toFixed(1)} ({activity.reviewCount})
            </p>
          </div>
          <div className='text-2lg mt-[6px] line-clamp-2 font-semibold break-keep text-white md:mt-[20px] md:text-3xl md:font-bold'>
            {activity.title}
          </div>
          <div className='mt-[5px] flex items-center gap-[5px] whitespace-nowrap md:mt-[20px]'>
            <div className='text-lg font-semibold text-white md:text-xl md:font-bold'>
              ₩ {activity.price.toLocaleString()}
            </div>
            <div className='text-md font-medium text-gray-700'>/ 인</div>
          </div>
        </div>
      </article>
    </Link>
  );
}
